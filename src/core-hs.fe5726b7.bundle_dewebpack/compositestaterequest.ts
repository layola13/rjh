import { StateRequest } from './StateRequest';

/**
 * A composite state request that manages multiple sub-requests.
 * Executes sub-requests sequentially, stopping at the first uncommitted request.
 */
export class CompositeStateRequest extends StateRequest {
  private _subRequests: StateRequest[];
  private _activeRequest?: StateRequest;

  constructor(subRequests: StateRequest[] = []) {
    super();
    this._subRequests = subRequests;
  }

  /**
   * Appends a new sub-request to the composite request.
   * @param request - The state request to append
   * @returns This instance for method chaining
   */
  append(request: StateRequest): this {
    this._subRequests.push(request);
    return this;
  }

  /**
   * Gets the currently active sub-request being processed.
   * @returns The active request or undefined if none is active
   */
  getActiveRequest(): StateRequest | undefined {
    return this._activeRequest;
  }

  /**
   * Synchronously commits all uncommitted sub-requests in sequence.
   * @returns The result of the last sub-request, if any
   */
  onCommit(): unknown {
    this._subRequests.forEach((request) => {
      if (!request.isCommitted) {
        this._activeRequest = request;
        request.commit();
        this._activeRequest = undefined;
      }
    });

    const lastRequest = this._subRequests[this._subRequests.length - 1];
    super.onCommit();
    
    return lastRequest?.result;
  }

  /**
   * Asynchronously commits all uncommitted sub-requests in sequence.
   * @returns Promise resolving to the result of the last sub-request, if any
   */
  async onCommitAsync(): Promise<unknown> {
    for (let i = 0; i < this._subRequests.length; i++) {
      const request = this._subRequests[i];
      if (request.isCommitted) {
        return;
      }
      this._activeRequest = request;
      await request.commitAsync();
      this._activeRequest = undefined;
    }

    const lastRequest = this._subRequests[this._subRequests.length - 1];
    await super.onCommitAsync();
    
    return lastRequest?.result;
  }

  /**
   * Gets the array of sub-requests.
   */
  get subRequests(): StateRequest[] {
    return this._subRequests;
  }
}