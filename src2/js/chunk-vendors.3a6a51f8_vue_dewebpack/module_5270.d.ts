/**
 * Core request dispatcher module.
 * Handles request preparation, adapter execution, and response transformation.
 */

import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * Checks if the request has been cancelled via a cancel token.
 * Throws an error if cancellation was requested.
 * 
 * @param config - The Axios request configuration object
 * @throws {Cancel} If the request has been cancelled
 */
declare function throwIfCancellationRequested(config: AxiosRequestConfig): void;

/**
 * Dispatches an HTTP request using the configured adapter.
 * 
 * This function:
 * 1. Validates the request hasn't been cancelled
 * 2. Normalizes and merges request headers
 * 3. Transforms request data
 * 4. Executes the request via the adapter
 * 5. Transforms response data
 * 6. Handles cancellation during request execution
 * 
 * @param config - The complete Axios request configuration
 * @returns A promise that resolves with the transformed response or rejects with an error
 * 
 * @example
 *