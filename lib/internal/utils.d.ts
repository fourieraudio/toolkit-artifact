/// <reference types="node" />
import { HttpClient } from '@actions/http-client';
import { IHeaders, IHttpClientResponse } from '@actions/http-client/interfaces';
import { IncomingHttpHeaders } from 'http';
/**
 * Returns a retry time in milliseconds that exponentially gets larger
 * depending on the amount of retries that have been attempted
 */
export declare function getExponentialRetryTimeInMilliseconds(retryCount: number): number;
/**
 * Parses a env variable that is a number
 */
export declare function parseEnvNumber(key: string): number | undefined;
/**
 * Various utility functions to help with the necessary API calls
 */
export declare function getApiVersion(): string;
export declare function isSuccessStatusCode(statusCode?: number): boolean;
export declare function isForbiddenStatusCode(statusCode?: number): boolean;
export declare function isRetryableStatusCode(statusCode: number | undefined): boolean;
export declare function isThrottledStatusCode(statusCode?: number): boolean;
/**
 * Attempts to get the retry-after value from a set of http headers. The retry time
 * is originally denoted in seconds, so if present, it is converted to milliseconds
 * @param headers all the headers received when making an http call
 */
export declare function tryGetRetryAfterValueTimeInMilliseconds(headers: IncomingHttpHeaders): number | undefined;
export declare function getContentRange(start: number, end: number, total: number): string;
/**
 * Sets all the necessary headers when downloading an artifact
 * @param {string} contentType the type of content being uploaded
 * @param {boolean} isKeepAlive is the same connection being used to make multiple calls
 * @param {boolean} acceptGzip can we accept a gzip encoded response
 * @param {string} acceptType the type of content that we can accept
 * @returns appropriate headers to make a specific http call during artifact download
 */
export declare function getDownloadHeaders(contentType: string, isKeepAlive?: boolean, acceptGzip?: boolean): IHeaders;
/**
 * Sets all the necessary headers when uploading an artifact
 * @param {string} contentType the type of content being uploaded
 * @param {boolean} isKeepAlive is the same connection being used to make multiple calls
 * @param {boolean} isGzip is the connection being used to upload GZip compressed content
 * @param {number} uncompressedLength the original size of the content if something is being uploaded that has been compressed
 * @param {number} contentLength the length of the content that is being uploaded
 * @param {string} contentRange the range of the content that is being uploaded
 * @returns appropriate headers to make a specific http call during artifact upload
 */
export declare function getUploadHeaders(contentType: string, isKeepAlive?: boolean, isGzip?: boolean, uncompressedLength?: number, contentLength?: number, contentRange?: string): IHeaders;
export declare function createHttpClient(userAgent: string): HttpClient;
export declare function getArtifactUrl(): string;
/**
 * Uh oh! Something might have gone wrong during either upload or download. The IHtttpClientResponse object contains information
 * about the http call that was made by the actions http client. This information might be useful to display for diagnostic purposes, but
 * this entire object is really big and most of the information is not really useful. This function takes the response object and displays only
 * the information that we want.
 *
 * Certain information such as the TLSSocket and the Readable state are not really useful for diagnostic purposes so they can be avoided.
 * Other information such as the headers, the response code and message might be useful, so this is displayed.
 */
export declare function displayHttpDiagnostics(response: IHttpClientResponse): void;
/**
 * Scans the name of the artifact to make sure there are no illegal characters
 */
export declare function checkArtifactName(name: string): void;
/**
 * Scans the name of the filePath used to make sure there are no illegal characters
 */
export declare function checkArtifactFilePath(path: string): void;
export declare function createDirectoriesForArtifact(directories: string[]): Promise<void>;
export declare function createEmptyFilesForArtifact(emptyFilesToCreate: string[]): Promise<void>;
export declare function getFileSize(filePath: string): Promise<number>;
export declare function rmFile(filePath: string): Promise<void>;
export declare function getProperRetention(retentionInput: number, retentionSetting: string | undefined): number;
export declare function sleep(milliseconds: number): Promise<void>;
