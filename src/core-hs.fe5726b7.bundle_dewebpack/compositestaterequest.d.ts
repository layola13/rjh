/**
 * Composite state request that manages multiple sub-requests
 * @module CompositeStateRequest
 */

import { StateRequest } from './StateRequest';

/**
 * A composite state request that executes multiple sub-requests sequentially.
 * Extends the base StateRequest class to provide batching capabilities.
 * 
 * @template T - The result type of the state request
 */
export declare class CompositeStateRequest<T = unknown> extends StateRequest<T> {
    /**
     * Array of sub-requests to be executed
     * @private
     */
    private _subRequests: StateRequest<T>[];

    /**
     * The currently executing sub-request
     * @private
     */
    private _activeRequest?: StateRequest<T>;

    /**
     * Creates a new CompositeStateRequest
     * @param subRequests - Initial array of sub-requests to execute (default: [])
     */
    constructor(subRequests?: StateRequest<T>[]);

    /**
     * Appends a new sub-request to the execution queue
     * @param request - The state request to append
     * @returns The current CompositeStateRequest instance for chaining
     */
    append(request: StateRequest<T>): this;

    /**
     * Gets the currently active (executing) sub-request
     * @returns The active state request, or undefined if none is executing
     */
    getActiveRequest(): StateRequest<T> | undefined;

    /**
     * Synchronously commits all uncommitted sub-requests in sequence.
     * Executes each sub-request's commit() method and returns the result of the last request.
     * 
     * @returns The result of the last sub-request, or undefined if no sub-requests exist
     */
    protected onCommit(): T | undefined;

    /**
     * Asynchronously commits all uncommitted sub-requests in sequence.
     * Awaits each sub-request's commitAsync() method and returns the result of the last request.
     * 
     * @returns Promise that resolves to the result of the last sub-request, or undefined if no sub-requests exist
     */
    protected onCommitAsync(): Promise<T | undefined>;

    /**
     * Gets the array of all sub-requests
     * @readonly
     */
    get subRequests(): readonly StateRequest<T>[];
}