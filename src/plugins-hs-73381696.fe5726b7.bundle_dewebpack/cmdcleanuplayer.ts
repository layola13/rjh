interface Layer {
  // Define layer properties based on your application context
  [key: string]: unknown;
}

interface TransactionRequest {
  [key: string]: unknown;
}

interface SelectionManager {
  unselectAll(): void;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandContext {
  selectionManager: SelectionManager;
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: CommandContext;
  protected mgr!: CommandManager;

  abstract onExecute(): void;
  abstract onCleanup(): void;
  abstract canUndoRedo(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

declare namespace HSFPConstants {
  enum RequestType {
    CleanupLayer = 'CleanupLayer'
  }
  
  enum LogGroupTypes {
    WallOperation = 'WallOperation'
  }
}

declare namespace HSApp {
  namespace Cmd {
    export { Command };
  }
}

export class CmdCleanupLayer extends Command {
  private layer: Layer;
  private _request?: TransactionRequest;

  constructor(layer: Layer) {
    super();
    this.layer = layer;
  }

  onExecute(): void {
    this.context.selectionManager.unselectAll();
    this._request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.CleanupLayer,
      [this.layer]
    );
    this.context.transManager.commit(this._request);
    this.mgr.complete(this);
  }

  onCleanup(): void {
    // No cleanup operations needed
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return '删除设计中所有墙体';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}