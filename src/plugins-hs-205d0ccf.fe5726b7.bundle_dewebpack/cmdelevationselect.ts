import { Line2d, Vector2 } from './geometry';
import { HSCore } from './core';
import { HSApp } from './app';
import { Triangle } from './gizmo';

interface WallFaceInfo {
  wall: HSCore.Model.Wall;
  seg: Line2d;
  isLeft: boolean;
}

interface DetectedInfo extends WallFaceInfo {
  distance: number;
  face: HSCore.Model.WallFace;
}

type SelectFaceConfirmCallback = (face: HSCore.Model.WallFace) => void;

export class CmdElevationSelect extends HSApp.Cmd.Command {
  private _selectFaceConfirmCb: SelectFaceConfirmCallback | undefined;
  private _wallFaceInfo: Map<HSCore.Model.WallFace, WallFaceInfo>;
  private _detectedInfo: DetectedInfo | undefined;
  private _app: HSApp.Application;
  private _thresholdNum: number;
  private _gizmo: Triangle | undefined;

  constructor(selectFaceConfirmCb?: SelectFaceConfirmCallback) {
    super();
    this._selectFaceConfirmCb = selectFaceConfirmCb;
    this._wallFaceInfo = new Map<HSCore.Model.WallFace, WallFaceInfo>();
    this._detectedInfo = undefined;
    this._app = HSApp.App.getApp();
    this._thresholdNum = this._app.getActive2DView().screenLengthToModel(20);
    this._gizmo = undefined;

    const active2DView = this._app.getActive2DView();
    if (active2DView.context) {
      active2DView.context.onResized();
    }
  }

  onExecute(): void {
    const active3DView = this._app.getActive3DView();
    const canCreateEntity = active3DView.context?.auxOptions?.canCreateEntity;

    this._app.floorplan.forEachActiveWall((wall: HSCore.Model.Wall) => {
      if (wall.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) {
        return;
      }

      if (canCreateEntity && !canCreateEntity(wall)) {
        return;
      }

      const leftFace = Object.values(wall.leftFaces)[0];
      const rightFace = Object.values(wall.rightFaces)[0];

      if (wall.isArcWall()) {
        return;
      }

      const centerLine = new Line2d(wall.from, wall.to);

      if (leftFace) {
        const leftSeg = HSCore.Util.TgWall.makeByOffseted(centerLine, -wall.width / 2);
        this._wallFaceInfo.set(leftFace, {
          wall,
          seg: leftSeg,
          isLeft: true
        });
      }

      if (rightFace) {
        const rightSeg = HSCore.Util.TgWall.makeByOffseted(centerLine, wall.width / 2);
        this._wallFaceInfo.set(rightFace, {
          wall,
          seg: rightSeg,
          isLeft: false
        });
      }
    });

    if (this._app.userTrackLogger) {
      this._app.userTrackLogger.push('switchView', {
        argInfo: {
          param: '切换立面'
        },
        clicksRatio: {
          id: 'switchView',
          name: '视图切换'
        },
        description: '切换立面'
      });
    }
  }

  onReceive(event: HSDevice.MouseEvents, eventData: HSDevice.MouseEventData): boolean {
    switch (event) {
      case HSDevice.MouseEvents.Move:
        return this._detectClosetFace(eventData);

      case HSDevice.MouseEvents.Click:
        if (this._detectedInfo) {
          if (this._selectFaceConfirmCb) {
            this._selectFaceConfirmCb(this._detectedInfo.face);
          }

          const active3DView = this._app.getActive3DView();
          this._app.selectionManager.unselectAll();
          this._app.selectionManager.select(this._detectedInfo.face);
          active3DView.switchCameraByType(
            HSApp.Environment.CommonEnvironment.viewMode2CameraType(
              HSApp.View.ViewModeEnum.Elevation
            )
          );
        }
        return true;

      case HSDevice.MouseEvents.Out:
        const toElement = eventData.event.toElement;
        if (toElement && this._app.getActive2DView().domElement.contains(toElement)) {
          return true;
        }
        if (this._app.viewMode3D !== HSApp.View.ViewModeEnum.Elevation || this._app.is2DViewActive()) {
          return true;
        }
        this.mgr.complete();
        return false;

      default:
        return false;
    }
  }

  onCleanup(): void {
    this._destroyGizmo();

    if (this._detectedInfo) {
      this._detectedInfo.wall.setFlagOff(HSCore.Model.WallFlagEnum.hoverOn, true);
    }

    this._wallFaceInfo.clear();
  }

  private _detectClosetFace(eventData: HSDevice.MouseEventData): boolean {
    const mousePosition = new Vector2(eventData.position);
    const candidates: DetectedInfo[] = [];

    this._wallFaceInfo.forEach((faceInfo: WallFaceInfo, face: HSCore.Model.WallFace) => {
      const param = faceInfo.seg.getParamAt(mousePosition);
      const range = faceInfo.seg.getRange();

      if (param < range.min || param > range.max) {
        return;
      }

      const projectedPt = faceInfo.seg.getProjectedPtBy(mousePosition);
      const distance = projectedPt.distanceTo(mousePosition);

      candidates.push({
        ...faceInfo,
        distance,
        face
      });
    });

    candidates.sort((a, b) => a.distance - b.distance);

    const closestCandidate = candidates[0];

    if (closestCandidate && closestCandidate.distance < this._thresholdNum) {
      if (this._detectedInfo && this._detectedInfo.face === closestCandidate.face) {
        return true;
      }

      if (this._detectedInfo) {
        this._detectedInfo.wall.setFlagOff(HSCore.Model.WallFlagEnum.hoverOn, true);
        this._destroyGizmo();
      }

      closestCandidate.wall.setFlagOn(HSCore.Model.WallFlagEnum.hoverOn, true);
      this._detectedInfo = closestCandidate;

      const midPt = this._detectedInfo.seg.getMidPt();
      const tangent = this._detectedInfo.seg.getTangentAt(this._detectedInfo.seg.getParamAt(midPt));
      const normal = new Line2d({ x: 0, y: 0 }, tangent, [0, 1]).getLeftNormal();
      const offset = normal.multiplied(this._app.getActive2DView().screenLengthToModel(10));

      if (this._detectedInfo.isLeft) {
        normal.reverse();
      } else {
        offset.reverse();
      }

      const gizmoPosition = midPt.add(offset);
      const gizmoRotation = Math.atan2(normal.y, normal.x);
      this._createGizmo(gizmoPosition, gizmoRotation);

      return true;
    }

    if (this._detectedInfo) {
      this._detectedInfo.wall.setFlagOff(HSCore.Model.WallFlagEnum.hoverOn, true);
    }

    this._destroyGizmo();
    this._detectedInfo = undefined;

    return false;
  }

  private _createGizmo(position: Vector2, rotation: number): void {
    const active2DView = this._app.getActive2DView();
    const gizmoManager = active2DView.gizmoManager;

    this._gizmo = new Triangle(active2DView.context, active2DView.displayLayers.temp, {
      width: active2DView.screenLengthToModel(12),
      height: active2DView.screenLengthToModel(22),
      position,
      rotation
    });

    gizmoManager.addGizmo(this._gizmo);
  }

  private _destroyGizmo(): void {
    if (!this._gizmo) {
      return;
    }

    this._app.getActive2DView().gizmoManager.removeGizmo(this._gizmo);
    this._gizmo.cleanup();
    this._gizmo = undefined;
  }

  getDescription(): string {
    return '立面图操作';
  }

  isInteractive(): boolean {
    return true;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ViewOperation;
  }
}