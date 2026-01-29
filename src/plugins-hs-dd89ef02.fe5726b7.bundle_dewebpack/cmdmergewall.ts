import { HSApp } from './HSApp';
import { HSConstants } from './HSConstants';
import { MergeWall } from './MergeWall';

interface Wall {
  // Define wall properties based on your domain model
}

interface GizmoManager {
  addGizmo(gizmo: MergeWall): void;
  removeGizmo(gizmo: MergeWall): void;
}

interface DisplayLayers {
  temp: unknown;
}

interface View2D {
  context: unknown;
  gizmoManager: GizmoManager;
  displayLayers: DisplayLayers;
}

interface HotkeyManager {
  registerHotkey(key: string, callback: () => void, type: string): void;
  unregisterHotkey(key: string, callback: () => void): void;
}

interface App {
  getActive2DView(): View2D;
  hotkey: HotkeyManager;
}

interface CursorStatus {
  setCurrentStatus(cursor: string): void;
}

interface TransactionRequest {
  // Define transaction request properties
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandContext {
  app: App;
  transManager: TransactionManager;
  cursorStatus: CursorStatus;
}

interface CommandManager {
  cancel(): void;
}

interface MergeWallParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

/**
 * Command for merging walls in the 2D view
 */
export class CmdMergeWall extends HSApp.Cmd.Command {
  private _wall: Wall;
  private _gizmo?: MergeWall;
  private _app: App;
  protected context!: CommandContext;
  protected mgr!: CommandManager;
  protected type!: string;

  constructor(wall: Wall) {
    super();
    this._wall = wall;
    this._app = HSApp.App.getApp();
  }

  /**
   * Creates and initializes the merge wall gizmo
   */
  createGizmo(): void {
    const view2D = this.context.app.getActive2DView();
    const gizmoManager = view2D.gizmoManager;
    
    this._gizmo = new MergeWall(
      view2D.context,
      view2D.displayLayers.temp,
      this,
      this._wall
    );
    
    gizmoManager.addGizmo(this._gizmo);
  }

  /**
   * Destroys and cleans up the merge wall gizmo
   */
  destroyGizmo(): void {
    if (this._gizmo) {
      this.context.app.getActive2DView().gizmoManager.removeGizmo(this._gizmo);
      this._gizmo.clear();
      this._gizmo = undefined;
    }
  }

  onExecute(): void {
    if (!this._wall) {
      this.mgr?.cancel();
      return;
    }

    this.createGizmo();
    this._app.hotkey.registerHotkey('esc', this.onESC.bind(this), this.type);
    this._updateViewCursor(`cursor: url(${HSConstants.Resources.svgs.merge_wall}) 0 0, auto;`);
  }

  onReceive(event: string, data: { wall: Wall }): boolean {
    if (event !== 'gizmo.mergewall') {
      return super.onReceive?.(event, data) ?? false;
    }

    this._mergeWall(data.wall);
    return true;
  }

  onCleanup(): void {
    this.destroyGizmo();
    this._app.hotkey.unregisterHotkey('esc', this.onESC);
    this._updateViewCursor(HSApp.View.CursorEnum.default);
  }

  onESC(): void {
    this.mgr.cancel();
  }

  private _mergeWall(targetWall: Wall): void {
    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.MergeWall,
      [this._wall, targetWall]
    );
    transManager.commit(request);
  }

  private _updateViewCursor(cursorStyle: string): void {
    const view2D = this._app.getActive2DView();
    if (view2D) {
      view2D.context.cursorStatus.setCurrentStatus(cursorStyle);
    }
  }

  isInteractive(): boolean {
    return true;
  }

  getCurrentParams(): MergeWallParams {
    return {
      activeSection: HSFPConstants.LogGroupTypes.WallOperation,
      activeSectionName: '墙体操作',
      clicksRatio: {
        id: 'mergeWall',
        name: '连接墙'
      }
    };
  }

  getDescription(): string {
    return '连接墙体';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}