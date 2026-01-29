import { Session } from './Session';
import { Signal } from './Signal';
import { EntityTransactionType } from './EntityTransactionType';
import { Logger } from './Logger';

interface RequestConstructor<T = unknown> {
  new (...args: unknown[]): Request<T>;
  prototype: Request<T> & { type?: string };
}

interface Request<T = unknown> {
  type?: string;
  mgr?: Manager;
  args?: unknown[];
  activate(): void;
}

interface SessionOptions {
  maxUndoStep?: number;
  undoRedo?: boolean;
  toRequestFilter?: (request: Request) => boolean;
}

interface SessionHandle {
  commit(options?: CommitOptions): boolean;
  abort(): boolean;
  end(): boolean;
  toRequest(): Request | undefined;
}

interface CommitOptions {
  mergeRequest?: boolean;
}

interface TransactionOptions {
  [key: string]: unknown;
}

interface SignalData<T = unknown> {
  request: Request<T>;
}

interface BlockedSignal {
  signal: Signal<unknown>;
  data: unknown;
}

interface RequestStack {
  undo: Request[];
  redo: Request[];
}

type RequestParamAdapter = (params: unknown[]) => unknown[];

export class Manager {
  private static readonly logger = log.logger('HSCore.Transaction.Manager');

  private _enabled: boolean = true;
  private _blocked: boolean = false;
  private _suppressed: boolean = false;
  private _undoStepCount: number = 25;
  private _reqByType: Map<string, RequestConstructor> = new Map();
  private _reqParamAdapterByType: Map<string, RequestParamAdapter> = new Map();
  private _enableBlockSignals: boolean = false;
  private _blockedSignals: BlockedSignal[] = [];
  
  private _defaultSession!: Session;
  private _activeSession!: Session;
  private _sessionStack!: Session[];
  private _undoRedoSessionStack!: Session[];

  public readonly signalAborting: Signal<SignalData>;
  public readonly signalAborted: Signal<SignalData>;
  public readonly signalCommitting: Signal<SignalData>;
  public readonly signalCommitted: Signal<SignalData>;
  public readonly signalUndoRedoStateChanged: Signal<void>;
  public readonly signalUndoing: Signal<SignalData>;
  public readonly signalUndone: Signal<SignalData>;
  public readonly signalRedoing: Signal<SignalData>;
  public readonly signalRedone: Signal<SignalData>;
  public readonly signalCreated: Signal<SignalData>;

  constructor() {
    this.signalAborting = new Signal(this);
    this.signalAborted = new Signal(this);
    this.signalCommitting = new Signal(this);
    this.signalCommitted = new Signal(this);
    this.signalUndoRedoStateChanged = new Signal(this);
    this.signalUndoing = new Signal(this);
    this.signalUndone = new Signal(this);
    this.signalRedoing = new Signal(this);
    this.signalRedone = new Signal(this);
    this.signalCreated = new Signal(this);

    this.clear(false);
    Signal.addGlobalDispatchCondition(this.signalDispatchCondition.bind(this));
  }

  get maxUndoStep(): number {
    return this._undoStepCount;
  }

  get suppressed(): boolean {
    return this._suppressed;
  }

  set suppressed(value: boolean) {
    this._suppressed = value;
  }

  get activeRequest(): Request | undefined {
    return this._activeSession?.activeRequest;
  }

  getLatestCommittedRequest(): Request | undefined {
    return this._defaultSession.peekNextUndoRequest();
  }

  getLatestCommittedSessionRequest(): Request | undefined {
    return this._activeSession.peekNextUndoRequest();
  }

  clear(dispatchSignal: boolean = true): void {
    const session = new Session(this);
    this._defaultSession = session;
    this._activeSession = session;
    this._sessionStack = [session];
    this._undoRedoSessionStack = [session];
    
    if (dispatchSignal) {
      this.signalUndoRedoStateChanged.dispatch();
    }
  }

  reset(): void {
    this._getUndoRedoSession()?.reset();
    this.signalUndoRedoStateChanged.dispatch();
  }

  register(
    type: string | Array<[string, RequestConstructor, RequestParamAdapter?]>,
    constructor?: RequestConstructor,
    paramAdapter?: RequestParamAdapter
  ): this {
    return this._register(type, constructor, paramAdapter);
  }

  registerNgm(
    type: string | Array<[string, RequestConstructor, RequestParamAdapter?]>,
    constructor?: RequestConstructor,
    paramAdapter?: RequestParamAdapter
  ): this {
    Logger.console.error('registerNgm is deprecated, use register instead!');
    return this.register(type, constructor, paramAdapter);
  }

  private _register(
    type: string | Array<[string, RequestConstructor, RequestParamAdapter?]>,
    constructor?: RequestConstructor,
    paramAdapter?: RequestParamAdapter
  ): this {
    if (Array.isArray(type)) {
      type.forEach((entry) => {
        this.register(...entry);
      });
    } else if (constructor) {
      constructor.prototype.type = type;
      this._reqByType.set(type, constructor);
      if (paramAdapter) {
        this._reqParamAdapterByType.set(type, paramAdapter);
      }
    }
    return this;
  }

  createRequest<T = unknown>(
    typeOrConstructor: string | RequestConstructor<T>,
    args: unknown[] = [],
    dispatchCreatedSignal: boolean = true
  ): Request<T> | undefined {
    let requestType: string | undefined;
    let constructor: RequestConstructor<T> | undefined;

    if (typeof typeOrConstructor === 'string') {
      requestType = typeOrConstructor;
      constructor = this.getReqByType(typeOrConstructor) as RequestConstructor<T>;
      
      if (!constructor) {
        return undefined;
      }

      const adapter = this._reqParamAdapterByType.get(requestType);
      if (adapter) {
        args = adapter(args);
      }
    } else {
      constructor = typeOrConstructor;
    }

    const request = Reflect.construct(constructor, args) as Request<T>;
    
    if (requestType) {
      request.type = requestType;
    }
    
    request.mgr = this;
    request.args = args;

    if (this._activeSession) {
      this._activeSession.activeRequest = request;
    }

    request.activate();

    if (dispatchCreatedSignal) {
      this.signalCreated.dispatch({ request });
    }

    return request;
  }

  getReqByType(type: string): RequestConstructor | undefined {
    return this._reqByType.get(type);
  }

  abort(request: Request | undefined): void {
    if (!request) {
      return;
    }

    const session = this._activeSession;
    this.signalAborting.dispatch({ request });
    session.abort(request);
    this.signalAborted.dispatch({ request });
  }

  commit(request: Request | undefined, skipUndo: boolean = false): boolean {
    if (!request) {
      return false;
    }

    if (!this._enabled) {
      this._activeSession.activeRequest = undefined;
    }

    const session = this._activeSession;
    this.signalCommitting.dispatch({ request });
    
    const result = session.commit(request, skipUndo);
    
    this.signalCommitted.dispatch({ request });

    if (session === this._getUndoRedoSession()) {
      this.signalUndoRedoStateChanged.dispatch();
    }

    return result;
  }

  async commitAsync(request: Request | undefined, skipUndo: boolean = false): Promise<boolean> {
    if (!request) {
      return false;
    }

    if (!this._enabled) {
      this._activeSession.activeRequest = undefined;
    }

    const session = this._activeSession;
    this.signalCommitting.dispatch({ request });
    
    const result = await session.commitAsync(request, skipUndo);
    
    this.signalCommitted.dispatch({ request });

    if (session === this._getUndoRedoSession()) {
      this.signalUndoRedoStateChanged.dispatch();
    }

    return result;
  }

  transact(
    entity: unknown,
    description: string = '',
    transactionType: EntityTransactionType = EntityTransactionType.Modification,
    options: TransactionOptions = {}
  ): void {
    if (!this._suppressed) {
      this._activeSession.transact(entity, description, transactionType, options);
    }
  }

  startBlockSignals(): void {
    this._enableBlockSignals = true;
  }

  stopBlockSignals(): void {
    this._enableBlockSignals = false;
  }

  blockSignal(signal: Signal<unknown>, data: unknown): boolean {
    if (!this._enableBlockSignals) {
      return false;
    }

    this._blockedSignals.push({ signal, data });
    return true;
  }

  clearBlockedSignals(): void {
    this._blockedSignals.forEach(({ signal, data }) => {
      signal?.dispatch(data);
    });
    this._blockedSignals = [];
  }

  startSession(options: SessionOptions = {}): SessionHandle {
    const session = new Session(this, {
      maxUndoStep: options.maxUndoStep,
      toRequestFilter: options.toRequestFilter
    });

    if (this._enabled) {
      this._activeSession = session;
      this._sessionStack.push(session);

      if (options.undoRedo !== false) {
        this._undoRedoSessionStack.push(session);
        this.signalUndoRedoStateChanged.dispatch();
      }
    }

    return {
      commit: (commitOptions: CommitOptions = {}): boolean => {
        if (!this._enabled || this._activeSession !== session) {
          return false;
        }
        this._commitSession(commitOptions.mergeRequest);
        return true;
      },
      abort: (): boolean => {
        if (!this._enabled || this._activeSession !== session) {
          return false;
        }
        this._abortSession();
        return true;
      },
      end: (): boolean => {
        if (!this._enabled || this._activeSession !== session) {
          return false;
        }
        this._endSession();
        return true;
      },
      toRequest: (): Request | undefined => {
        if (this._activeSession === session) {
          return this._activeSession.toRequest();
        }
        return undefined;
      }
    };
  }

  private _commitSession(mergeRequest?: boolean): void {
    if (this.getSessionCount() === 1) {
      Manager.logger.warning('commitSession when there is only default session in place');
      return;
    }

    if (mergeRequest !== false) {
      const request = this._activeSession.toRequest();
      this._terminateActiveSession();
      if (request) {
        this.commit(request);
      }
    } else {
      const requests = this._activeSession.toRequests();
      this._terminateActiveSession();
      requests.forEach((request) => {
        this.commit(request);
      });
    }
  }

  private _abortSession(): void {
    if (this.getSessionCount() === 1) {
      Manager.logger.warning('endSession when there is only default session in place');
      return;
    }

    const session = this._activeSession;
    while (session.canUndo()) {
      const request = session.peekNextUndoRequest();
      this.signalUndoing.dispatch({ request });
      session.undo();
      this.signalUndone.dispatch({ request });
    }

    this._terminateActiveSession(session);
  }

  private _endSession(): void {
    if (this.getSessionCount() === 1) {
      Manager.logger.warning('endSession when there is only default session in place');
      return;
    }

    this._terminateActiveSession();
  }

  private _terminateActiveSession(session?: Session): void {
    if (this.getSessionCount() === 1) {
      Manager.logger.warning('endSession when there is only default session in place');
      return;
    }

    if (session && this._activeSession !== session) {
      return;
    }

    const currentSession = this._activeSession;
    this._sessionStack.pop();
    this._activeSession = _.last(this._sessionStack)!;

    if (currentSession === this._getUndoRedoSession()) {
      this._undoRedoSessionStack.pop();
      this.signalUndoRedoStateChanged.dispatch();
    }
  }

  canUndo(): boolean {
    return this._enabled && !this._blocked && (this._getUndoRedoSession()?.canUndo() ?? false);
  }

  canRedo(): boolean {
    return this._enabled && !this._blocked && (this._getUndoRedoSession()?.canRedo() ?? false);
  }

  undo(): void {
    if (!this.canUndo()) {
      return;
    }

    this._prepareUndoRedo();

    const session = this._activeSession;
    const request = session.peekNextUndoRequest();
    
    this.signalUndoing.dispatch({ request });
    session.undo();
    this.signalUndone.dispatch({ request });
    this.signalUndoRedoStateChanged.dispatch();
  }

  redo(): void {
    if (!this.canRedo()) {
      return;
    }

    this._prepareUndoRedo();

    const session = this._activeSession;
    const request = session.peekNextRedoRequest();
    
    this.signalRedoing.dispatch({ request });
    session.redo();
    this.signalRedone.dispatch({ request });
    this.signalUndoRedoStateChanged.dispatch();
  }

  getSessionCount(): number {
    return this._sessionStack.length;
  }

  private _prepareUndoRedo(): void {
    const undoRedoSession = this._getUndoRedoSession();
    while (undoRedoSession !== this._activeSession) {
      this._abortSession();
    }
  }

  private _getUndoRedoSession(): Session | undefined {
    return _.last(this._undoRedoSessionStack);
  }

  enable(): void {
    if (!this._enabled) {
      this._enabled = true;
      this._undoStepCount = 25;
    }
  }

  disable(): void {
    if (this._enabled) {
      this._enabled = false;
      this._undoStepCount = 0;
      this.clear();
    }
  }

  blockUndoRedo(): void {
    if (!this._blocked) {
      this._blocked = true;
      this.signalUndoRedoStateChanged.dispatch();
    }
  }

  unblockUndoRedo(): void {
    if (this._blocked) {
      this._blocked = false;
      this.signalUndoRedoStateChanged.dispatch();
    }
  }

  signalDispatchCondition(signal: Signal<unknown>, data: unknown): boolean {
    return !this.blockSignal(signal, data);
  }

  getRequestStack(includeActiveRequest?: boolean): RequestStack[] | undefined {
    try {
      return this._sessionStack.map((session) => ({
        undo: session.getUndoStack(includeActiveRequest),
        redo: session.getRedoStack(includeActiveRequest)
      }));
    } catch (error) {
      Logger.console.warn(
        `Cannot get request stacks: ${error instanceof Error ? error.message : error}`
      );
      return undefined;
    }
  }
}