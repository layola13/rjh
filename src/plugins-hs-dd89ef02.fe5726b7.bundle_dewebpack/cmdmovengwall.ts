import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { HSConstants } from './HSConstants';
import { HSDevice } from './HSDevice';
import { MoveWall } from './MoveWall';
import { WallEditHook } from './WallEditHook';
import { PerformanceLogCategory, PerformanceOperationTypes } from './PerformanceLog';
import { showCeilingGeoChangeDiag } from './CeilingDialog';

interface Position {
  x: number;
  y: number;
}

interface ConstraintLine {
  x: number;
  y: number;
}

interface ConstraintInfo {
  connectedWalls: HSCore.Model.Wall[];
  associatedWall: HSCore.Model.NgWall | undefined;
  isNeedSplitPoint: boolean;
  isNeedCreateWall: boolean;
  constraintLine: ConstraintLine[] | undefined;
}

interface ExecuteOptions {
  position?: Position | number[];
}

interface ReceiveData {
  offset?: { x: number; y: number };
  position?: Position;
  keyCode?: number;
}

export class CmdMoveNGWall extends HSApp.Cmd.Command {
  private wall: HSCore.Model.Wall;
  private position: Position;
  private gizmo?: MoveWall;
  private hasShowDlg: boolean = false;
  private _request?: any;
  private _session?: any;
  private moveBeginPosition?: Position;
  private _fromPointConstraint?: ConstraintInfo;
  private _toPointConstraint?: ConstraintInfo;
  private readonly _perfLog: any;

  constructor(wall: HSCore.Model.Wall, position: Position) {
    super(wall);
    
    this.wall = wall;
    this.position = position;
    this._perfLog = log.logger(PerformanceLogCategory.Operation);
    
    assert(this.wall, "unknown wall!");
    
    wall.setFlagOn(HSCore.Model.WallFlagEnum.dragOn);
  }

  private createGizmo(): void {
    const view2D = this.context.app.getActive2DView();
    const gizmoManager = view2D.gizmoManager;
    
    this.gizmo = new MoveWall(view2D.context, view2D.displayLayers.temp, this, this.position);
    gizmoManager.addGizmo(this.gizmo);
  }

  onExecute(options: ExecuteOptions): void {
    const mixPaintUtil = HSApp.PaintPluginHelper.Util.MixPaintUtil;
    
    if (mixPaintUtil && !mixPaintUtil.disconnectFaceGroupWithPrompt([this.wall], undefined, this._executeCmd.bind(this), options)) {
      return;
    }
    
    this._executeCmd(options);
  }

  private _executeCmd(options: ExecuteOptions): void {
    if (!this.wall) {
      return;
    }
    
    this._session = this.context.transManager.startSession();
    this._computeConstraints();
    
    if (!this.canMove()) {
      return;
    }
    
    this._request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.MoveTGWall,
      [this.wall]
    );
    
    if (options?.position) {
      this.moveBeginPosition = {
        x: Array.isArray(options.position) ? options.position[0] : options.position.x,
        y: Array.isArray(options.position) ? options.position[1] : options.position.y
      };
    } else {
      console.assert(false, "MoveWall Command should have the Model position for beginning moving");
      this.moveBeginPosition = this.wall.middle;
    }
    
    const selectionManager = this.context.app.selectionManager;
    
    if (!HSApp.Util.Selection.hasOnlySelected(this.wall)) {
      selectionManager.unselectAll(false);
      selectionManager.select(this.wall, undefined, false);
    }
    
    if (this.showGizmo) {
      this.createGizmo();
    }
  }

  private _calConstraintLine(point: Position, walls: HSCore.Model.Wall[]): ConstraintLine[] {
    let minAngleDiff: number | undefined;
    let bestWall: HSCore.Model.Wall | undefined;
    
    walls.forEach(wall => {
      const angle = HSCore.Util.Math.lineLineAngle(wall.from, wall.to, this.wall.from, this.wall.to);
      
      if (angle >= 20) {
        const angleDiff = Math.abs(angle - 90);
        
        if (!minAngleDiff || angleDiff < minAngleDiff) {
          bestWall = wall;
          minAngleDiff = angleDiff;
        }
      }
    });
    
    if (bestWall) {
      return [
        { x: bestWall.from.x, y: bestWall.from.y },
        { x: bestWall.to.x, y: bestWall.to.y }
      ];
    } else {
      const perpendicular = new HSCore.Util.Math.Vec2(
        this.wall.from.x - this.wall.to.x,
        this.wall.from.y - this.wall.to.y
      ).rotate(HSCore.Util.Math.toRadians(90));
      
      return [
        { x: point.x, y: point.y },
        { x: perpendicular.x + point.x, y: perpendicular.y + point.y }
      ];
    }
  }

  getConstraintInfo(point: Position): ConstraintInfo {
    const parentWalls = HSCore.Util.Point.getParentWalls(point).filter(
      wall => wall !== this.wall
    );
    
    let associatedWall: HSCore.Model.NgWall | undefined;
    const associatedEntity = HSApp.App.getApp().associationManager.getEntityByTarget(point);
    
    if (associatedEntity?.instanceOf(HSConstants.ModelClass.NgWall)) {
      associatedWall = associatedEntity as HSCore.Model.NgWall;
    }
    
    let isNeedSplitPoint = false;
    let isNeedCreateWall = false;
    let constraintLine: ConstraintLine[];
    
    if (associatedWall) {
      constraintLine = [
        { x: associatedWall.from.x, y: associatedWall.from.y },
        { x: associatedWall.to.x, y: associatedWall.to.y }
      ];
      
      if (parentWalls.length > 0) {
        isNeedSplitPoint = true;
      }
    } else {
      const perpendicular = new HSCore.Util.Math.Vec2(
        this.wall.from.x - this.wall.to.x,
        this.wall.from.y - this.wall.to.y
      ).rotate(HSCore.Util.Math.toRadians(90));
      
      if (parentWalls.length === 2) {
        if (HSCore.Util.Math.isParallel(parentWalls[0].from, parentWalls[0].to, parentWalls[1].from, parentWalls[1].to)) {
          constraintLine = [
            { x: parentWalls[0].from.x, y: parentWalls[0].from.y },
            { x: parentWalls[0].to.x, y: parentWalls[0].to.y }
          ];
        } else {
          constraintLine = this._calConstraintLine(point, parentWalls);
          isNeedCreateWall = true;
        }
      } else if (parentWalls.length === 1) {
        const angle = HSCore.Util.Math.lineLineAngle(
          parentWalls[0].from,
          parentWalls[0].to,
          this.wall.from,
          this.wall.to
        );
        
        if (angle < 20) {
          constraintLine = [
            { x: point.x, y: point.y },
            { x: perpendicular.x + point.x, y: perpendicular.y + point.y }
          ];
          isNeedCreateWall = true;
        } else {
          constraintLine = [
            { x: parentWalls[0].from.x, y: parentWalls[0].from.y },
            { x: parentWalls[0].to.x, y: parentWalls[0].to.y }
          ];
        }
      } else {
        if (parentWalls.length > 2) {
          isNeedCreateWall = true;
        }
        constraintLine = this._calConstraintLine(point, parentWalls);
      }
    }
    
    return {
      connectedWalls: parentWalls,
      associatedWall,
      isNeedSplitPoint,
      isNeedCreateWall,
      constraintLine
    };
  }

  canMove(): boolean {
    if (this._fromPointConstraint && !this._fromPointConstraint.constraintLine) {
      return false;
    }
    
    if (this._toPointConstraint && !this._toPointConstraint.constraintLine) {
      return false;
    }
    
    return true;
  }

  private _computeConstraints(): void {
    const fromConstraint = this.getConstraintInfo(this.wall.from);
    const toConstraint = this.getConstraintInfo(this.wall.to);
    
    const hasConstraint = (info: ConstraintInfo): boolean => {
      return info.connectedWalls.length > 0 || !!info.associatedWall;
    };
    
    if (hasConstraint(fromConstraint) || hasConstraint(toConstraint)) {
      this._fromPointConstraint = fromConstraint;
      this._toPointConstraint = toConstraint;
    }
  }

  private _onComplete(): void {
    if (!this._request) {
      return;
    }
    
    this._perfLog.time(PerformanceOperationTypes.WallMoveCompleted);
    
    const changedWalls = this.context.transManager.commit(this._request);
    
    HSApp.Util.LoggerUtil.actionTrackStart(
      "start.executeWallEditHook",
      "改变墙体的联动操作开始",
      false
    );
    
    const cmdManager = this.context.app.cmdManager;
    cmdManager.freezeProcess();
    
    WallEditHook.getInstance()
      .onWallEditComplete({ changedWalls })
      .then(() => {
        cmdManager.unfreezeProcess();
        
        this._session?.commit();
        this.mgr.complete();
        
        if (HSApp.App.getApp().appSettings.isSingleRoomMode) {
          const singleRoomPlugin = HSApp.App.getApp().pluginManager.getPlugin(
            HSFPConstants.PluginType.SingleRoom
          );
          singleRoomPlugin.cancelSingleRoom();
          HSDevice.Mouse.mouseAux2d?.reset();
        }
        
        this._perfLog.timeEnd(PerformanceOperationTypes.WallMoveCompleted, true);
        
        HSApp.Util.LoggerUtil.actionTrackEnd(
          "end.executeWallEditHook",
          "改变墙体的联动操作结束",
          false
        );
      })
      .catch((error: Error) => {
        cmdManager.unfreezeProcess();
        
        HSApp.App.getApp().errorLogger.push("WallEditHook on failure", {
          errorStack: error.stack,
          description: "WallEditHook on failure",
          errorInfo: {
            info: error,
            path: {
              file: "homestyler-tools-web/web/plugin/walledit/command/cmdmovewall.js",
              functionName: "_onComplete()"
            }
          }
        });
      });
  }

  private _onCancel(): void {
    if (this._request) {
      this.context.transManager.abort(this._request);
      this._request = undefined;
    }
    
    this._session?.abort();
    this.mgr.cancel();
  }

  onCleanup(): void {
    if (this.gizmo) {
      this.gizmo.cleanup();
      this.context.app.getActive2DView().gizmoManager.removeGizmo(this.gizmo);
    }
    
    this.wall.setFlagOff(HSCore.Model.WallFlagEnum.dragOn);
  }

  onReceive(event: string, data: ReceiveData): boolean {
    switch (event) {
      case "gizmo.mousedown":
        return false;
        
      case "gizmo.mousemove":
        return !!this._request?.receive("move", { offset: data.offset });
        
      case "gizmo.mouseup":
      case "dragend":
        if (!this.moveBeginPosition) {
          return false;
        }
        
        const isSamePosition = data.position && 
          HSCore.Util.Math.isSamePoint(this.moveBeginPosition, data.position);
        
        if (isSamePosition || !this._request.isChangedWallsValid()) {
          this._onCancel();
        } else {
          this._handleCeilingGeoChanged();
        }
        
        return true;
        
      case "move":
        return !!this._request?.receive("move", { offset: data.offset });
        
      case "keydown":
        const isEscOrTab = data.keyCode === 27 || data.keyCode === 9;
        
        if (isEscOrTab) {
          this._onCancel();
          return true;
        }
        
        return false;
        
      default:
        log("move wall command: " + event);
        return super.onReceive(event, data);
    }
  }

  canUndoRedo(): boolean {
    return false;
  }

  private _handleCeilingGeoChanged(): void {
    const geometryManager = HSApp.App.getApp().geometryManager;
    const roomsInfo = geometryManager.getWallRoomsInfo(this.wall);
    
    let hasCeilingDivide = false;
    
    roomsInfo.forEach(roomInfo => {
      if (roomInfo.ceilingFace?.divideInfo && roomInfo.ceilingFace.divideInfo.length > 0) {
        hasCeilingDivide = true;
      }
    });
    
    if (hasCeilingDivide) {
      if (!this.hasShowDlg) {
        showCeilingGeoChangeDiag((result: number) => {
          if (result === 0) {
            this._onComplete();
            
            geometryManager.getWallRoomsInfo(this.wall).forEach(roomInfo => {
              if (roomInfo.ceilingFace?.divideInfo) {
                roomInfo.ceilingFace.divideInfo = undefined;
              }
            });
          } else {
            this._onCancel();
          }
          
          this.context.app.selectionManager.unselectAll();
        });
        
        this.hasShowDlg = true;
      }
    } else {
      this._onComplete();
    }
  }

  getCurrentParams(): any {
    return {
      activeSection: HSFPConstants.LogGroupTypes.WallOperation,
      activeSectionName: "墙体操作",
      clicksRatio: {
        id: "moveWall",
        name: "拖动墙体位置"
      }
    };
  }

  getDescription(): string {
    return "移动墙体";
  }

  isInteractive(): boolean {
    return true;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }

  canSuspend(): boolean {
    return true;
  }
}