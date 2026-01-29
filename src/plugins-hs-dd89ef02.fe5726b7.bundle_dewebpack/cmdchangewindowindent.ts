interface Window {
  buildPartsInfo(): void;
}

interface TransactionSession {
  commit(): void;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): unknown;
  commit(request: unknown, immediate: boolean): void;
  startSession(options: { undoRedo: boolean }): TransactionSession;
}

interface Context {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: Context;
  protected mgr!: CommandManager;
  
  abstract onExecute(): void;
  abstract onReceive(event: string, data: unknown): void;
}

interface SliderDragMoveData {
  value: number;
}

interface SliderDragEndData {
  value?: number;
}

type SliderEventData = SliderDragMoveData | SliderDragEndData;

export class CmdChangeWindowIndent extends Command {
  private readonly _windows: Window[];
  private readonly _indent: number;
  private _session!: TransactionSession;

  constructor(windows: Window[], indent: number) {
    super();
    this._windows = windows;
    this._indent = indent;
  }

  private _setIndent(indent: number): void {
    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.ChangeWindowIndent,
      [this._windows, indent]
    );
    this.context.transManager.commit(request, true);
  }

  onExecute(): void {
    this._session = this.context.transManager.startSession({
      undoRedo: false
    });
  }

  onReceive(event: string, data: SliderEventData): void {
    switch (event) {
      case "sliderdragmove":
        this._setIndent((data as SliderDragMoveData).value);
        break;
      case "sliderdragend":
        this._session.commit();
        this._windows.forEach((window) => window.buildPartsInfo());
        this.mgr.complete(this);
        break;
    }
  }
}