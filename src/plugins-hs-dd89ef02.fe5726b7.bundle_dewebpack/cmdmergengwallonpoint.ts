interface Point {
  // 根据实际Point类型定义补充属性
  x?: number;
  y?: number;
  [key: string]: unknown;
}

interface Request {
  // 根据实际Request类型定义补充属性
  [key: string]: unknown;
}

interface TransactionManager {
  createRequest(type: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface Context {
  transManager: TransactionManager;
}

interface SelectionManager {
  selected(): unknown[];
  unselect(item: unknown): void;
}

interface Scene {
  activeLayer: unknown;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
  selectionManager: SelectionManager;
}

interface AppContainer {
  getApp(): App;
}

interface CommandManager {
  complete(command: Command): void;
}

declare const HSApp: {
  App: AppContainer;
  Cmd: {
    Command: new () => Command;
  };
};

declare const HSFPConstants: {
  RequestType: {
    MergeWallOnPoint: string;
  };
  LogGroupTypes: {
    WallOperation: string;
  };
};

abstract class Command {
  protected context!: Context;
  protected mgr!: CommandManager;
  abstract onExecute(): void;
  abstract onCleanup(): void;
  abstract isInteractive(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

export class CmdMergeNGWallOnPoint extends Command {
  private point: Point;
  private _request?: Request;

  constructor(point: Point) {
    super();
    this.point = point;
  }

  onExecute(): void {
    const app = HSApp.App.getApp();
    const transManager = this.context.transManager;
    
    this._request = transManager.createRequest(
      HSFPConstants.RequestType.MergeWallOnPoint,
      [this.point, app.floorplan.scene.activeLayer]
    );
    
    transManager.commit(this._request);

    const selectedItems = app.selectionManager.selected();
    if (selectedItems.length !== 0 && selectedItems.indexOf(this.point) !== -1) {
      app.selectionManager.unselect(this.point);
    }
    
    this.mgr.complete(this);
  }

  onCleanup(): void {
    // Cleanup logic if needed
  }

  isInteractive(): boolean {
    return true;
  }

  getDescription(): string {
    return "连接墙体";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}