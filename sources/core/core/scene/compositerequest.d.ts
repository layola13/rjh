/**
 * CompositeRequest Module
 * 
 * Provides a composite pattern implementation for managing multiple sub-requests
 * that can be committed, undone, and redone as a single transaction.
 */

import { Request } from './Request';

/**
 * CompositeRequest class that manages multiple sub-requests as a single operation.
 * 
 * This class extends the base Request class and implements the composite pattern
 * to handle multiple requests atomically. It supports both synchronous and
 * asynchronous commit operations, as well as undo/redo functionality.
 * 
 * @template T - The result type of the composite request
 */
export declare class CompositeRequest<T = unknown> extends Request<T> {
  /**
   * Array of sub-requests managed by this composite request
   */
  private _subRequests: Request[];

  /**
   * The currently active sub-request being processed
   */
  private _activeRequest?: Request;

  /**
   * Creates a new CompositeRequest instance
   * 
   * @param subRequests - Initial array of sub-requests to manage (default: empty array)
   */
  constructor(subRequests?: Request[]);

  /**
   * Appends a new sub-request to the composite request
   * 
   * @param request - The sub-request to append
   * @returns The current CompositeRequest instance for method chaining
   */
  append(request: Request): this;

  /**
   * Gets the currently active sub-request being processed
   * 
   * @returns The active sub-request or undefined if no request is currently active
   */
  getActiveRequest(): Request | undefined;

  /**
   * Commits all uncommitted sub-requests synchronously
   * 
   * Iterates through all sub-requests and commits any that haven't been
   * committed yet. Returns the result of the last sub-request if available.
   * 
   * @returns The result of the last sub-request, or undefined
   */
  protected onCommit(): T | undefined;

  /**
   * Commits all uncommitted sub-requests asynchronously
   * 
   * Sequentially commits each uncommitted sub-request, waiting for each
   * to complete before proceeding to the next. Returns the result of the
   * last sub-request if available.
   * 
   * @returns Promise resolving to the result of the last sub-request, or undefined
   */
  protected onCommitAsync(): Promise<T | undefined>;

  /**
   * Undoes all sub-requests in reverse order
   * 
   * Iterates through sub-requests from last to first and calls undo on each,
   * effectively reversing all operations performed by the composite request.
   */
  protected onUndo(): void;

  /**
   * Redoes all sub-requests in forward order
   * 
   * Iterates through all sub-requests and calls redo on each,
   * reapplying all operations that were previously undone.
   */
  protected onRedo(): void;

  /**
   * Gets the array of sub-requests managed by this composite request
   * 
   * @returns Read-only array of sub-requests
   */
  get subRequests(): readonly Request[];
}