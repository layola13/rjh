/**
 * HTTP response status validator and resolver
 * Resolves or rejects a promise based on the response status validation
 */

/**
 * HTTP response configuration interface
 */
interface ResponseConfig {
  /** Optional custom status validation function */
  validateStatus?: (status: number) => boolean;
  /** Additional config properties */
  [key: string]: unknown;
}

/**
 * HTTP response interface
 */
interface HttpResponse {
  /** HTTP status code */
  status: number;
  /** Response configuration */
  config: ResponseConfig;
  /** Original HTTP request object */
  request: unknown;
  /** Additional response properties */
  [key: string]: unknown;
}

/**
 * Promise resolve function type
 */
type ResolveFunction = (response: HttpResponse) => void;

/**
 * Promise reject function type
 */
type RejectFunction = (error: Error) => void;

/**
 * Error factory function type
 */
type CreateErrorFunction = (
  message: string,
  config: ResponseConfig,
  code: string | null,
  request: unknown,
  response: HttpResponse
) => Error;

/**
 * Settles a promise based on HTTP response status validation.
 * If validateStatus is defined and returns true, resolves the promise.
 * Otherwise, rejects with an error indicating the failed status code.
 *
 * @param resolve - Promise resolve callback
 * @param reject - Promise reject callback
 * @param response - HTTP response object to validate
 */
declare function settle(
  resolve: ResolveFunction,
  reject: RejectFunction,
  response: HttpResponse
): void;

export = settle;