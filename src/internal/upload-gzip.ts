import * as fs from 'fs'
import * as zlib from 'zlib'
import {promisify} from 'util'
const stat = promisify(fs.stat)

/**
 * Creates a Gzip compressed file of an original file at the provided temporary filepath location
 * @param {string} originalFilePath filepath of whatever will be compressed. The original file will be unmodified
 * @param {string} tempFilePath the location of where the Gzip file will be created
 * @returns the size of gzip file that gets created
 */
export async function createGZipFileOnDisk(
  originalFilePath: string,
  tempFilePath: string
): Promise<number> {
  return new Promise(async (resolve, reject) => {
    const inputFile = await fs.promises.open(
      originalFilePath,
      fs.constants.O_RDONLY | fs.constants.O_SYMLINK
    )
    const inputStream = fs.createReadStream('', {
      fd: inputFile
    })
    const gzip = zlib.createGzip()
    const outputStream = fs.createWriteStream(tempFilePath)
    inputStream.pipe(gzip).pipe(outputStream)
    outputStream.on('finish', async () => {
      // wait for stream to finish before calculating the size which is needed as part of the Content-Length header when starting an upload
      const size = (await stat(tempFilePath)).size
      resolve(size)
    })
    outputStream.on('error', error => {
      // eslint-disable-next-line no-console
      console.log(error)
      reject
    })
  })
}

/**
 * Creates a GZip file in memory using a buffer. Should be used for smaller files to reduce disk I/O
 * @param originalFilePath the path to the original file that is being GZipped
 * @returns a buffer with the GZip file
 */
export async function createGZipFileInBuffer(
  originalFilePath: string
): Promise<Buffer> {
  return new Promise(async resolve => {
    const inputFile = await fs.promises.open(
      originalFilePath,
      fs.constants.O_RDONLY | fs.constants.O_SYMLINK
    )
    const inputStream = fs.createReadStream('', {
      fd: inputFile
    })
    const gzip = zlib.createGzip()
    inputStream.pipe(gzip)
    // read stream into buffer, using experimental async iterators see https://github.com/nodejs/readable-stream/issues/403#issuecomment-479069043
    const chunks = []
    for await (const chunk of gzip) {
      chunks.push(chunk)
    }
    resolve(Buffer.concat(chunks))
  })
}
