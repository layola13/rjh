interface SessionOptions {
  maxUndoStep?: number;
  toRequestFilter?: (request: TransactionRequest) => boolean;
}

interface TransactionRequest {
  isCommitted: boolean;
  canTransact(): boolean;
  getActiveRequest?(): TransactionRequest | undefined;
  transact(
    callback: unknown,
    description: string,
    type: EntityTransactionType,
    options: Record<string, unknown>
  ): void;
  commit(): unknown;
  commitAsync(): Promise<unknown>;
  undo(): void;
  redo(): void;
  abort(): void;
  compose(other: TransactionRequest): boolean;
}

interface BatchRequest extends TransactionRequest {
  subRequests: TransactionRequest[];
  filterRequests(filter: (request: TransactionRequest) => boolean): void;
}

interface TransactionManager {
  maxUndoStep: number;
  createRequest(
    type: string,
    requests: TransactionRequest[][]
  ): TransactionRequest;
}

enum EntityTransactionType {
  Modification = 'Modification',
}

export class Session {
  private _undoStack: TransactionRequest[] = [];
  private _redoStack: TransactionRequest[] = [];
  private _activeRequest?: TransactionRequest;
  private readonly _transMgr: TransactionManager;
  private readonly _maxUndoStep?: number;
  private readonly _toRequestFilter?: (request: TransactionRequest) => boolean;

  constructor(
    transactionManager: TransactionManager,
    options?: SessionOptions
  ) {
    this._transMgr = transactionManager;
    this._maxUndoStep = options?.maxUndoStep;
    this._toRequestFilter = options?.toRequestFilter;
  }

  get activeRequest(): TransactionRequest | undefined {
    return this._activeRequest;
  }

  set activeRequest(request: TransactionRequest | undefined) {
    this._activeRequest = request;
  }

  canUndo(): boolean {
    return this._undoStack.length > 0;
  }

  canRedo(): boolean {
    return this._redoStack.length > 0;
  }

  peekNextUndoRequest(): TransactionRequest | undefined {
    return this._undoStack[this._undoStack.length - 1];
  }

  peekNextRedoRequest(): TransactionRequest | undefined {
    return this._redoStack[this._redoStack.length - 1];
  }

  undo(): void {
    const request = this._undoStack.pop();
    if (!request) return;

    const previousActiveRequest = this._activeRequest;
    this._activeRequest = request;
    request.undo();
    this._activeRequest = previousActiveRequest;
    this._redoStack.push(request);
  }

  redo(): void {
    const request = this._redoStack.pop();
    if (!request) return;

    const previousActiveRequest = this._activeRequest;
    this._activeRequest = request;
    request.redo();
    this._activeRequest = previousActiveRequest;
    this._undoStack.push(request);
  }

  abort(request: TransactionRequest): void {
    request.abort();
    this._activeRequest = undefined;
  }

  postCommit(request: TransactionRequest, merge: boolean = false): void {
    if (merge) {
      const lastRequest = this._undoStack.pop();
      if (lastRequest) {
        request = this.composeRequests([lastRequest, request]);
      }
    }

    const maxUndoStep = this._maxUndoStep ?? this._transMgr.maxUndoStep;
    
    if (this._undoStack.length >= maxUndoStep) {
      this._undoStack.shift();
    }

    if (maxUndoStep !== 0) {
      this._undoStack.push(request);
    }

    this._redoStack.length = 0;
    this._activeRequest = undefined;
  }

  commit(request: TransactionRequest, merge: boolean = false): unknown {
    let result: unknown;
    
    if (!request.isCommitted) {
      result = request.commit();
    }

    this.postCommit(request, merge);
    return result;
  }

  async commitAsync(
    request: TransactionRequest,
    merge: boolean = false
  ): Promise<unknown> {
    let result: unknown;

    if (!request.isCommitted) {
      result = await request.commitAsync();
    }

    this.postCommit(request, merge);
    return result;
  }

  transact(
    callback: unknown,
    description: string = '',
    type: EntityTransactionType = EntityTransactionType.Modification,
    options: Record<string, unknown> = {}
  ): void {
    let currentRequest = this._activeRequest;

    if (currentRequest && typeof currentRequest.getActiveRequest === 'function') {
      currentRequest = currentRequest.getActiveRequest();
    }

    if (currentRequest?.canTransact()) {
      currentRequest.transact(callback, description, type, options);
    }
  }

  toRequest(): TransactionRequest | null {
    let composedRequest: TransactionRequest | null = null;
    const requests = this.toRequests();

    switch (requests.length) {
      case 0:
        break;
      case 1:
        composedRequest = requests[0];
        break;
      default:
        composedRequest = this.composeRequests(requests);
    }

    return composedRequest;
  }

  toRequests(): TransactionRequest[] {
    if (!this._toRequestFilter) {
      return this._undoStack;
    }

    return this._undoStack.filter((request) => {
      if (this.isBatchRequest(request)) {
        request.filterRequests(this._toRequestFilter!);
        if (request.subRequests.length === 0) {
          return false;
        }
      }
      return this._toRequestFilter!(request);
    });
  }

  composeRequests(requests: TransactionRequest[]): TransactionRequest {
    const transactionManager = this._transMgr;

    return requests.reduce((accumulated, current) => {
      if (accumulated.compose(current)) {
        return accumulated;
      }

      return transactionManager.createRequest('Batch', [[accumulated, current]]);
    });
  }

  reset(): void {
    this._undoStack = [];
    this._redoStack = [];
    this._activeRequest = undefined;
  }

  getUndoStack<T>(mapper: (request: TransactionRequest) => T): T[] {
    return this._undoStack.map(mapper);
  }

  getRedoStack<T>(mapper: (request: TransactionRequest) => T): T[] {
    return this._redoStack.map(mapper);
  }

  private isBatchRequest(request: TransactionRequest): request is BatchRequest {
    return 'subRequests' in request && 'filterRequests' in request;
  }
}