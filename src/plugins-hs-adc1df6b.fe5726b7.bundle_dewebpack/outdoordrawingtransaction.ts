interface InternalSession {
  abort(): void;
  commit(): void;
  end(): void;
}

interface TransactionManager {
  startSession(options: SessionOptions): InternalSession;
  canUndo(): boolean;
}

interface SessionOptions {
  maxUndoStep: number;
  toRequestFilter: (request: unknown) => boolean;
}

interface AppInstance {
  transManager: TransactionManager;
}

declare namespace HSApp {
  class App {
    static getApp(): AppInstance;
  }
}

export class OutdoorDrawingTransaction {
  private _internalSession?: InternalSession;

  /**
   * Starts a new drawing transaction session
   */
  public enter(): void {
    const app = HSApp.App.getApp();
    this._internalSession = app.transManager.startSession({
      maxUndoStep: 100,
      toRequestFilter: this._sessionToRequestFilter.bind(this)
    });
  }

  /**
   * Aborts the current session and starts a new one
   */
  public recover(): void {
    this._internalSession?.abort();
    this.enter();
  }

  /**
   * Aborts the current transaction session
   */
  public abort(): void {
    this._internalSession?.abort();
  }

  /**
   * Exits the transaction, committing if there are undo steps available
   */
  public exit(): void {
    const app = HSApp.App.getApp();
    if (app.transManager.canUndo()) {
      this._internalSession!.commit();
    } else {
      this._internalSession!.end();
    }
    this._internalSession = undefined;
  }

  /**
   * Filter function for session requests
   * @param request - The request to filter
   * @returns Always returns true
   */
  private _sessionToRequestFilter(request: unknown): boolean {
    return true;
  }
}