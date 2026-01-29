import { MovePoint } from './path/to/MovePoint';
import { WallDimension } from './path/to/WallDimension';
import { WallEditHook } from './path/to/WallEditHook';

interface MoveWallPointOptions {
  wall: HSCore.Model.Wall;
  pointType: HSCore.Model.JointPointType;
  moveRule: unknown;
  showGizmo?: boolean;
  position?: [number, number];
  dragPoint: boolean;
}

interface Position {
  x: number;
  y: number;
}

interface TransactionSession {
  commit(): void;
  abort(): void;
}

interface TransactionRequest {
  receive(event: string, data: unknown): void;
}

interface GizmoMouseMoveEvent {
  snap: boolean;
}

export class CmdMoveNGWallPoint extends HSApp.Cmd.Command {
  private wall: HSCore.Model.Wall;
  private pointType: HSCore.Model.JointPointType;
  private moveRule: unknown;
  private showGizmo: boolean;
  private moveBeginPosition: Position;
  private mouseBeginPosition?: Position;
  private layer: unknown;
  private gizmo?: MovePoint;
  private dragPoint: boolean;
  private _session?: TransactionSession;
  private _request?: TransactionRequest | null;

  constructor(options: MoveWallPointOptions) {
    super();

    this.wall = options.wall;
    this.pointType = options.pointType;
    this.moveRule = options.moveRule;
    this.showGizmo = options.showGizmo ?? true;
    this.dragPoint = options.dragPoint;

    this.moveBeginPosition = {
      x: this.point.x,
      y: this.point.y
    };

    if (options.position) {
      this.mouseBeginPosition = {
        x: options.position[0],
        y: options.position[1]
      };
    }

    const floorplan = HSApp.App.getApp().floorplan;
    this.layer = floorplan.scene.activeLayer;
    this.gizmo = undefined;

    options.wall.setFlagOn(HSCore.Model.WallFlagEnum.dragOn);
    this.point.setFlagOn(HSCore.Model.PointFlagEnum.dragOn, true);

    if (options.dragPoint) {
      HSApp.App.getApp().selectionManager.unselectAll();
      HSApp.App.getApp().selectionManager.select(this.point);
    }
  }

  private get point(): HSCore.Model.Point {
    if (this.pointType === HSCore.Model.JointPointType.from) {
      return this.wall.fromPoint;
    } else if (this.pointType === HSCore.Model.JointPointType.to) {
      return this.wall.toPoint;
    } else {
      return this.wall.midPoint;
    }
  }

  private createGizmo(): void {
    const activeView = this.context.app.getActive2DView();
    const gizmoManager = activeView.gizmoManager;
    this.gizmo = new MovePoint(activeView.context, activeView.displayLayers.temp, this);
    gizmoManager.addGizmo(this.gizmo);
  }

  private destroyGizmo(): void {
    if (this.gizmo) {
      this.context.app.getActive2DView().gizmoManager.removeGizmo(this.gizmo);
      this.gizmo.cleanup();
      this.gizmo = undefined;
    }
  }

  onExecute(): void {
    this._session = this.context.transManager.startSession();
    this._request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.MoveTGWallPoint,
      [this.wall, this.pointType, this.dragPoint]
    );

    if (this.showGizmo) {
      this.createGizmo();
    }

    this.context.app
      .getActive2DView()
      .gizmoManager.getTypeGizmo(WallDimension)
      .forEach((gizmo: WallDimension) => gizmo.setVisible(false));
  }

  onCleanup(): void {
    this.destroyGizmo();

    if (this._request) {
      this.context.transManager.abort(this._request);
      this._request = null;
    }

    this.wall.setFlagOff(HSCore.Model.WallFlagEnum.dragOn);
    this.point.setFlagOff(HSCore.Model.PointFlagEnum.dragOn, true);
    this.point.setFlagOff(HSCore.Model.PointFlagEnum.snap);
    this.point.dirty();

    this.context.app
      .getActive2DView()
      .gizmoManager.getTypeGizmo(WallDimension)
      .forEach((gizmo: WallDimension) => gizmo.setVisible(true));
  }

  onReceive(event: string, data: unknown): unknown {
    const EPSILON = 1e-6;
    const CLOSE_THRESHOLD = 0.001;

    switch (event) {
      case 'gizmo.mousemove': {
        const mouseMoveData = data as GizmoMouseMoveEvent;
        if (mouseMoveData.snap) {
          this.point.setFlagOn(HSCore.Model.PointFlagEnum.snap);
        } else {
          this.point.setFlagOff(HSCore.Model.PointFlagEnum.snap);
        }
        this._request?.receive('gizmo.mousemove', data);
        break;
      }

      case 'gizmo.mouseup': {
        const isSameAsBegin = HSCore.Util.Math.isSamePoint(
          this.point,
          this.moveBeginPosition,
          EPSILON
        );

        let oppositePoint: HSCore.Model.Point | undefined;
        if (this.pointType === HSCore.Model.JointPointType.from) {
          oppositePoint = this.wall.toPoint;
        } else if (this.pointType === HSCore.Model.JointPointType.to) {
          oppositePoint = this.wall.fromPoint;
        }

        const isSameAsOpposite = oppositePoint
          ? HSCore.Util.Math.isSamePoint(this.point, oppositePoint, CLOSE_THRESHOLD)
          : false;

        if (isSameAsBegin || isSameAsOpposite) {
          if (this._request) {
            this.context.transManager.abort(this._request);
            this._request = null;
          }
          this._session?.abort();
          this.mgr.cancel();
        } else {
          const changedWalls = this.context.transManager.commit(this._request!);
          HSApp.Util.LoggerUtil.actionTrackStart(
            'start.executeWallEditHook',
            '改变墙体的联动操作开始',
            false
          );

          const cmdManager = this.context.app.cmdManager;
          cmdManager.freezeProcess();

          WallEditHook.getInstance()
            .onWallEditComplete({ changedWalls })
            .then(() => {
              cmdManager.unfreezeProcess();
              this._session?.commit();
              this._request = null;
              this.mgr.complete();
              HSApp.Util.LoggerUtil.actionTrackEnd(
                'end.executeWallEditHook',
                '改变墙体的联动操作结束',
                false
              );
            })
            .catch((error: Error) => {
              cmdManager.unfreezeProcess();
              HSApp.App.getApp().errorLogger.push('WallEditHook on failure', {
                errorStack: error.stack,
                description: 'WallEditHook on failure',
                errorInfo: {
                  info: error,
                  path: {
                    file: 'homestyler-tools-web/web/plugin/walledit/command/cmdmovewallpoint.js',
                    functionName: 'onReceive()'
                  }
                }
              });
            });
        }
        break;
      }

      default:
        return super.onReceive?.(event, data);
    }
  }

  getCurrentParams(): {
    activeSection: string;
    activeSectionName: string;
    clicksRatio: { id: string; name: string };
  } {
    return {
      activeSection: HSFPConstants.LogGroupTypes.WallOperation,
      activeSectionName: '墙体操作',
      clicksRatio: {
        id: 'moveWallPoint',
        name: '拖动墙体端点'
      }
    };
  }

  isInteractive(): boolean {
    return true;
  }

  getDescription(): string {
    return '通过墙体连接点移动墙体';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}