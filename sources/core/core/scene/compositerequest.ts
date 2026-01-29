import { Request } from './Request';

class CompositeRequest<T = unknown> extends Request<T> {
  private _subRequests: Request<unknown>[];
  private _activeRequest?: Request<unknown>;

  constructor(subRequests: Request<unknown>[] = []) {
    super();
    this._subRequests = subRequests;
  }

  append(request: Request<unknown>): this {
    this._subRequests.push(request);
    return this;
  }

  getActiveRequest(): Request<unknown> | undefined {
    return this._activeRequest;
  }

  protected onCommit(): T | undefined {
    this._subRequests.forEach((request) => {
      if (!request.isCommitted) {
        this._activeRequest = request;
        request.commit();
        this._activeRequest = undefined;
      }
    });

    const lastRequest = this._subRequests[this._subRequests.length - 1];
    if (lastRequest) {
      return lastRequest.result as T;
    }
    return undefined;
  }

  protected async onCommitAsync(): Promise<T | undefined> {
    for (let i = 0; i < this._subRequests.length; i++) {
      const request = this._subRequests[i];
      if (request.isCommitted) {
        return undefined;
      }
      this._activeRequest = request;
      await request.commitAsync();
      this._activeRequest = undefined;
    }

    const lastRequest = this._subRequests[this._subRequests.length - 1];
    if (lastRequest) {
      return lastRequest.result as T;
    }
    return undefined;
  }

  protected onUndo(): void {
    for (let i = this._subRequests.length - 1; i >= 0; i--) {
      const request = this._subRequests[i];
      this._activeRequest = request;
      request.undo();
      this._activeRequest = undefined;
    }
  }

  protected onRedo(): void {
    this._subRequests.forEach((request) => {
      this._activeRequest = request;
      request.redo();
      this._activeRequest = undefined;
    });
  }

  get subRequests(): readonly Request<unknown>[] {
    return this._subRequests;
  }
}

export { CompositeRequest };