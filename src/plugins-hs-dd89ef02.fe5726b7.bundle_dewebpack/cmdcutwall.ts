import { HSApp } from './HSApp';
import { HSConstants } from './HSConstants';
import { MathAlg, Polygon, Loop } from './MathAlg';
import { CutWall as CutWallGizmo } from './CutWall';
import { HSFPConstants } from './HSFPConstants';

interface Position {
  x: number;
  y: number;
}

interface Opening {
  x: number;
  y: number;
  XSize: number;
}

interface ParametricOpening {
  pathSegments: any[];
}

interface Wall {
  openings: Record<string, Opening>;
  parametricOpenings: Map<string, ParametricOpening>;
  curve: {
    getProjectedPtBy(point: Position): { distanceTo(pos: Position): number };
  };
}

interface GizmoParam {
  position: Position;
  selectNewWall: boolean;
}

interface ClickEvent {
  event: {
    button: number;
  };
}

interface GizmoCutWallEvent {
  position: Position;
  selectNewWall: boolean;
}

interface MessagePayload {
  position?: Position;
  selectNewWall?: boolean;
  event?: { button: number };
}

interface LiveHintOptions {
  status: number;
  canclose: boolean;
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const LiveHint: {
  statusEnum: {
    warning: number;
  };
  show(message: string, duration: number, callback?: () => void, options?: LiveHintOptions): void;
};

export class CmdCutWall extends HSApp.Cmd.Command {
  private _wall: Wall;
  private _gizmo?: CutWallGizmo;
  private _app: any;

  constructor(wall: Wall) {
    super();
    this._wall = wall;
    this._gizmo = undefined;
    this._app = HSApp.App.getApp();
  }

  private createGizmo(): void {
    const view = this.context.app.getActive2DView();
    const gizmoManager = view.gizmoManager;
    this._gizmo = new CutWallGizmo(view.context, view.displayLayers.temp, this);
    gizmoManager.addGizmo(this._gizmo);
  }

  private destroyGizmo(): void {
    if (this._gizmo) {
      this.context.app.getActive2DView().gizmoManager.removeGizmo(this._gizmo);
      this._gizmo.clear();
      this._gizmo = undefined;
    }
  }

  onExecute(): void {
    this.createGizmo();
    this._app.hotkey.registerHotkey("esc", this.onESC.bind(this), this.type);
    this._updateViewCursor(`cursor: url(${HSConstants.Resources.svgs.cut_wall}) 0 0, auto;`);
  }

  onReceive(message: string, payload: MessagePayload): boolean {
    let shouldPropagate = true;

    switch (message) {
      case "gizmo.cutwall":
        this._cutWall(payload.position!, payload.selectNewWall!);
        break;

      case "click":
        if (payload.event?.button === 0) {
          if (this._gizmo) {
            const params = this._gizmo.getParam();
            if (params) {
              this._cutWall(params.position, params.selectNewWall);
              this._gizmo.refreshWallData();
            }
          }
          return false;
        }
        if (payload.event?.button === 2) {
          this.onESC();
          return false;
        }
        break;

      default:
        shouldPropagate = super.onReceive(message, payload);
    }

    return shouldPropagate;
  }

  onCleanup(): void {
    this.destroyGizmo();
    this._app.hotkey.unregisterHotkey("esc", this.onESC);
    this._updateViewCursor(HSApp.View.CursorEnum.default);
  }

  private _cutWall(position: Position, selectNewWall: boolean): void {
    const hasConflictingOpening = Object.values(this._wall.openings).some((opening) => {
      const projectedPoint = this._wall.curve.getProjectedPtBy({ x: opening.x, y: opening.y });
      return projectedPoint.distanceTo(position) < opening.XSize / 2;
    });

    const hasConflictingParametricOpening = Array.from(this._wall.parametricOpenings.values()).some((opening) => {
      const polygon = new Polygon(new Loop(opening.pathSegments));
      return MathAlg.PositionJudge.ptToPolygon(position, polygon) !== MathAlg.PtLoopPositonType.OUT;
    });

    if (hasConflictingOpening || hasConflictingParametricOpening) {
      const warningMessage = ResourceManager.getString("livehint_split_wall_warning");
      const options: LiveHintOptions = {
        status: LiveHint.statusEnum.warning,
        canclose: true
      };
      LiveHint.show(warningMessage, 4500, undefined, options);
    } else {
      const transManager = this.context.transManager;
      const request = transManager.createRequest(HSFPConstants.RequestType.CutWall, [this._wall, position]);
      const newWall = transManager.commit(request);

      if (selectNewWall) {
        const selectionManager = HSApp.Selection.Manager;
        selectionManager.unselectAll(false);

        if (!newWall) {
          this.mgr.cancel(this);
          return;
        }

        selectionManager.select(newWall, {});
        this._wall = newWall;
      }
    }
  }

  private _updateViewCursor(cursorStyle: string): void {
    const view = this._app.getActive2DView();
    if (view) {
      view.context.cursorStatus.setCurrentStatus(cursorStyle);
    }
  }

  get wall(): Wall {
    return this._wall;
  }

  onESC(): void {
    this.mgr.cancel();
  }

  isInteractive(): boolean {
    return true;
  }

  getCurrentParams(): {
    activeSection: string;
    activeSectionName: string;
    clicksRatio: { id: string; name: string };
  } {
    return {
      activeSection: HSFPConstants.LogGroupTypes.WallOperation,
      activeSectionName: "墙体操作",
      clicksRatio: {
        id: "cutWall",
        name: "拆分墙"
      }
    };
  }

  getDescription(): string {
    return "切割墙体";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}