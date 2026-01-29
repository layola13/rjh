import { HSApp } from './HSApp';
import { HSConstants } from './HSConstants';
import { AlignWall } from './AlignWall';

interface AlignWallParams {
  offset: number;
  wall: any;
}

interface CurrentParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

export class CmdAlignWall extends HSApp.Cmd.Command {
  private _wall: any;
  private _gizmo?: AlignWall;
  private _app: any;

  constructor(wall: any) {
    super();
    this._wall = wall;
    this._gizmo = undefined;
    this._app = undefined;
    this._app = HSApp.App.getApp();
  }

  createGizmo(): void {
    const activeView = this.context.app.getActive2DView();
    const gizmoManager = activeView.gizmoManager;
    this._gizmo = new AlignWall(
      activeView.context,
      activeView.displayLayers.temp,
      this,
      this._wall
    );
    gizmoManager.addGizmo(this._gizmo);
  }

  destroyGizmo(): void {
    if (this._gizmo) {
      this.context.app.getActive2DView().gizmoManager.removeGizmo(this._gizmo);
      this._gizmo.clear();
      this._gizmo = undefined;
    }
  }

  onExecute(): void {
    this.createGizmo();
    this._app.hotkey.registerHotkey('esc', this.onESC.bind(this), this.type);
    this._updateViewCursor(
      `cursor: url(${HSConstants.Resources.svgs.align_wall}) 0 0, auto;`
    );
  }

  onReceive(eventType: string, params: AlignWallParams): boolean {
    if (eventType !== 'gizmo.alignwall') {
      return super.onReceive(eventType, params);
    }

    this._alignWall(params.offset, params.wall);
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

  private _alignWall(offset: number, targetWall: any): void {
    const transManager = this.context.transManager;
    const session = transManager.startSession();
    const moveRequest = this.context.transManager.createRequest(
      HSFPConstants.RequestType.MoveTGWall,
      [this._wall]
    );

    moveRequest.receive('move', { offset });
    transManager.commit(moveRequest);

    if (targetWall) {
      const mergeRequest = transManager.createRequest(
        HSFPConstants.RequestType.MergeWall,
        [this._wall, targetWall]
      );
      transManager.commit(mergeRequest);
    }

    session.commit();
  }

  private _updateViewCursor(cursorStyle: string): void {
    const activeView = this._app.getActive2DView();
    if (activeView) {
      activeView.context.cursorStatus.setCurrentStatus(cursorStyle);
    }
  }

  isInteractive(): boolean {
    return true;
  }

  getCurrentParams(): CurrentParams {
    return {
      activeSection: HSFPConstants.LogGroupTypes.WallOperation,
      activeSectionName: '墙体操作',
      clicksRatio: {
        id: 'alignWall',
        name: '对齐墙'
      }
    };
  }

  getDescription(): string {
    return '对齐墙体';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}