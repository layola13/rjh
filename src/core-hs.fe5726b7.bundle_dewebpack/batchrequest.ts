import { Request } from './Request';

interface ComposeSpec {
  type: string;
  data: Request[];
}

class BatchRequest extends Request {
  private _subRequests: Request[];
  private _activeRequest?: Request;

  constructor(subRequests: Request[] = []) {
    super();
    this._subRequests = subRequests;
  }

  getActiveRequest(): Request | undefined {
    return this._activeRequest;
  }

  onCommit(): unknown {
    const lastRequest = this._subRequests[this._subRequests.length - 1];
    if (lastRequest) {
      return lastRequest.result;
    }
    return undefined;
  }

  onUndo(): void {
    for (let i = this._subRequests.length - 1; i >= 0; i--) {
      const request = this._subRequests[i];
      this._activeRequest = request;
      request.undo();
      this._activeRequest = undefined;
    }
  }

  onRedo(): void {
    this._subRequests.forEach((request: Request) => {
      this._activeRequest = request;
      request.redo();
      this._activeRequest = undefined;
    });
  }

  getComposeSpec(): ComposeSpec {
    return {
      type: HSConstants.RequestType.Batch,
      data: this._subRequests
    };
  }

  onCompose(composeSpec: ComposeSpec, newRequest?: Request): boolean {
    if (composeSpec.type === HSConstants.RequestType.Batch) {
      const batchData = composeSpec.data;
      this.compose(batchData[0]);
      this._subRequests = this._subRequests.concat(batchData.slice(1));
    } else {
      const lastRequest = this._subRequests[this._subRequests.length - 1];
      if (!newRequest || (lastRequest && lastRequest.onCompose(composeSpec)) || !lastRequest) {
        // Do nothing if newRequest is undefined or composition succeeded
      } else {
        this._subRequests.push(newRequest);
      }
    }
    return true;
  }

  get subRequests(): Request[] {
    return this._subRequests;
  }

  filterRequests(predicate: (request: Request) => boolean): void {
    this._subRequests = this._subRequests.filter(predicate);
  }
}

export { BatchRequest };