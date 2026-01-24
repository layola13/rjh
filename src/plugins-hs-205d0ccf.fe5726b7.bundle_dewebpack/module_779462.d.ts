/**
 * WebSocket token retrieval module
 * Provides functionality to obtain WebSocket authentication tokens from the message center
 */

/**
 * Response structure from the MTOP API
 */
interface MtopResponse<T = unknown> {
  /** Return status array, first element indicates success/failure */
  ret: string[];
  /** Response payload data */
  data?: T;
}

/**
 * WebSocket token data structure
 */
interface WebsocketTokenData {
  /** Authentication token for WebSocket connection */
  token: string;
  /** Token expiration timestamp */
  expireTime?: number;
  [key: string]: unknown;
}

/**
 * Retrieves a WebSocket authentication token from the MTOP Message Center.
 * 
 * @returns A promise that resolves with the token data if successful, or rejects with the error response
 * @throws {MtopResponse} Rejects if the API call fails or returns a non-SUCCESS status
 * 
 * @example
 *