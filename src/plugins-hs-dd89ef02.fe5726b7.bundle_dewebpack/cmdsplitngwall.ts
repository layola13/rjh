interface Context {
  transManager: TransactionManager;
  selectionManager: SelectionManager;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): SplitWallRequest | null;
  commit(request: SplitWallRequest | null): void;
}

interface SelectionManager {
  unselectAll(): void;
  select(point: unknown): void;
}

interface SplitWallRequest {
  splitPoint?: unknown;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: Context;
  protected mgr!: CommandManager;
  
  abstract onExecute(): void;
  abstract canUndoRedo(): boolean;
  abstract isInteractive(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

export class CmdSplitNGWall extends Command {
  private wall: unknown;
  private _request: SplitWallRequest | null = null;

  constructor(wall: unknown) {
    super();
    assert(wall);
    this.wall = wall;
  }

  onExecute(): void {
    const { transManager, selectionManager } = this.context;
    
    this._request = transManager.createRequest(
      HSFPConstants.RequestType.SplitNGWall,
      [this.wall]
    );
    
    transManager.commit(this._request);
    
    if (this._request?.splitPoint) {
      selectionManager.unselectAll();
      selectionManager.select(this._request.splitPoint);
    }
    
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }

  isInteractive(): boolean {
    return true;
  }

  getDescription(): string {
    return "拆分墙体";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}