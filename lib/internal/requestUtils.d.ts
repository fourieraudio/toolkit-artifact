import { IHttpClientResponse } from '@actions/http-client/interfaces';
export declare function retry(name: string, operation: () => Promise<IHttpClientResponse>, customErrorMessages: Map<number, string>, maxAttempts: number): Promise<IHttpClientResponse>;
export declare function retryHttpClientRequest<T>(name: string, method: () => Promise<IHttpClientResponse>, customErrorMessages?: Map<number, string>, maxAttempts?: number): Promise<IHttpClientResponse>;
