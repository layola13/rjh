/**
 * BatchRequest module - Manages multiple sub-requests as a single batch operation
 * Provides undo/redo functionality for grouped requests
 */

import { Request } from './Request';

/**
 * Request type constants
 */
declare const enum RequestType {
  Batch = 'Batch'
}

/**
 * Specification for composing requests
 */
export interface ComposeSpec<T = any> {
  /** Type of the request */
  type: RequestType;
  /** Data payload for the request */
  data: T;
}

/**
 * BatchRequest - A composite request that manages multiple sub-requests as a single unit.
 * Supports composition, undo, and redo operations across all contained requests.
 * 
 * @extends Request
 * @example
 *