import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import Vector2 from './Vector2';
import Vector3 from './Vector3';
import Matrix3 from './Matrix3';
import Line2d from './Line2d';
import { EN_PROPERTY_PANEL_ITEM_TYPE } from './PropertyPanelTypes';

interface GizmoTypeInfo {
  gripInfo: GripInfo;
  Dir: [number, number];
  EditFlag: string;
}

interface GripInfo {
  eId: string;
  refParam?: string;
  needUpdatePosition: boolean;
  point: { x: number; y: number };
}

interface CommandOptions {
  startPos: [number, number];
  gizmoType: GizmoTypeInfo;
}

interface PropertyNode {
  value: number;
  type: EN_PROPERTY_PANEL_ITEM_TYPE;
  minMax?: [number, number | undefined];
}

interface ReceiveData {
  mousePos?: [number, number];
  node?: PropertyNode;
  newValue?: number;
}

interface ArcWallSDKResult {
  newValue: number;
  newPos: Vector2;
}

interface FaceInfo {
  curve: Curve;
}

interface Face {
  faceInfo: FaceInfo;
}

interface Curve {
  getProjectedPtBy(point: Vector2): Vector2 | undefined;
  containsProjectedPt(point: Vector2): boolean;
  containsPoint(point: Vector2): boolean;
  getStartPt(): Vector2;
  getEndPt(): Vector2;
  getStartTangent(): Vector2;
  getTangentAt(param: number): Vector2;
  getParamAt(point: Vector2): number;
  getPtAt(param: number): Vector2;
  getRange(): Range;
  reversed(): Curve;
  clone(): Curve;
  setRange(range: Range): Curve;
}

interface Range {
  length: number;
  clone(): Range;
  set(start: number, end: number): Range;
  intersected(other: Range): Range[];
  clamp(value: number): number;
}

interface WallInfo {
  outerWallSide?: string;
}

interface Wall extends HSCore.Model.Wall {
  wallInfo?: WallInfo;
  faces: { left: Record<string, Face>; right: Record<string, Face> };
  leftFaces: Record<string, Face>;
  rightFaces: Record<string, Face>;
  curve: Curve;
  jointCurve: Curve;
  isArcWall(): boolean;
}

interface View2DData {
  gripInfos?: GripInfo[];
}

export default class EditParametricOpeningCommand extends HSApp.Cmd.Command {
  private readonly _curMousePosVec2: Vector2;
  private _originPosVec2?: Vector2;
  private _gizmoDir?: Vector2;
  private _needMove: boolean;
  private _openingStartPos?: Vector2;
  private _node?: PropertyNode;
  private _initVal: number;
  private readonly _parametricOpening: HSCore.Model.ParametricOpening;
  private _request: HSApp.TransManager.Request;
  private readonly _app: HSApp.App;
  private _activeGrip?: GripInfo;
  private readonly _snapHelper: HSCore.Util.OpeningSnapHelper;

  constructor(parametricOpening: HSCore.Model.ParametricOpening, options?: CommandOptions) {
    super();

    this._curMousePosVec2 = new Vector2();
    this._originPosVec2 = undefined;
    this._gizmoDir = undefined;
    this._needMove = false;
    this._openingStartPos = undefined;
    this._node = undefined;
    this._initVal = 0;
    this._parametricOpening = parametricOpening;
    this._request = undefined;
    this._app = HSApp.App.getApp();
    this._activeGrip = undefined;
    this._snapHelper = new HSCore.Util.OpeningSnapHelper(parametricOpening, undefined, true);

    if (options) {
      this._needMove = options.gizmoType.gripInfo.needUpdatePosition;

      if (this._needMove) {
        this._originPosVec2 = new Vector2(parametricOpening.x, parametricOpening.y);
      } else {
        this._originPosVec2 = new Vector2(options.startPos[0], options.startPos[1]);
      }

      const rotationRadians = -Math.PI * parametricOpening.rotation / 180;
      this._gizmoDir = new Vector2(options.gizmoType.Dir).rotate(new Vector2(0, 0), rotationRadians).normalize();
      this._activeGrip = options.gizmoType.gripInfo;
      this._openingStartPos = new Vector2(parametricOpening.x, parametricOpening.y);
      this._node = parametricOpening.getPropertiesNode(options.gizmoType.EditFlag);

      if (this._node) {
        this._initVal = this._node.value;
      }
    }

    this._request = this._app.transManager.createRequest(
      HSFPConstants.RequestType.EditParametricOpening,
      [this._parametricOpening]
    );
  }

  private _calcArcWallSDKParams = (mousePos: [number, number]): ArcWallSDKResult | undefined => {
    const host = this._parametricOpening.getHost();

    if (!(host instanceof HSCore.Model.Wall) || !host.isArcWall()) {
      return undefined;
    }

    const view2DData = this._parametricOpening.get2DViewData();
    if (!view2DData) {
      return undefined;
    }

    const wall = host as Wall;
    const outerSide = wall.wallInfo?.outerWallSide;
    const targetSide = outerSide === 'left' ? 'right' : 'left';
    const faces = Object.values(wall.faces[targetSide]);

    const matrix2D = this._parametricOpening.get2DMatrix();
    const matrix3 = new Matrix3().fromArray(matrix2D.toArray());

    const oppositeGrip = view2DData.gripInfos?.find(
      (grip) => grip.eId !== this._activeGrip?.eId && grip.refParam === this._activeGrip?.refParam
    );

    if (faces.length === 0 || !oppositeGrip) {
      return undefined;
    }

    const oppositePoint = new Vector2(oppositeGrip.point.x / 1000, oppositeGrip.point.y / 1000).transformed(matrix3);
    const currentPoint = new Vector2(mousePos[0], mousePos[1]);

    const projectedOppositePoint = faces[0].faceInfo.curve?.getProjectedPtBy(oppositePoint);
    const projectedCurrentPoint = faces[0].faceInfo.curve?.getProjectedPtBy(currentPoint);

    if (!projectedOppositePoint || !projectedCurrentPoint) {
      return undefined;
    }

    const distance = new Line2d(projectedOppositePoint, projectedCurrentPoint).getLength() * 1000;
    const midPoint = projectedOppositePoint.added(
      projectedCurrentPoint.subtracted(projectedOppositePoint).multiplied(0.5)
    );
    const newPosition = wall.curve.getProjectedPtBy(midPoint);

    return {
      newValue: distance,
      newPos: newPosition
    };
  };

  private _commitRequest(): void {
    this._app.transManager.commit(this._request);
    this._app.cmdManager.complete(this);

    if (this._parametricOpening instanceof HSCore.Model.ParametricDoor) {
      this._parametricOpening.getRefreshFloors().forEach((floor) => floor.dirtyGeometry());
    }
  }

  private _validate(showHint: boolean = false): void {
    const overlapObjects = HSApp.Util.Layer.calcOverlapObject(this._parametricOpening);
    const overWallObjects = HSApp.Util.Layer.calcOverWallObject(this._parametricOpening);
    const allObjects = new Map([...overlapObjects, ...overWallObjects]);
    const { update, recover } = HSApp.Util.Layer.patchOverlapObejct(allObjects);

    update.forEach((obj) => {
      if (obj instanceof HSCore.Model.Opening || obj instanceof HSCore.Model.ParametricOpening) {
        obj.signalValidityChanged.dispatch(true);

        if (showHint && this._parametricOpening !== obj) {
          const message = ResourceManager.getString('plugin_parametricopening_opening_valid').replace(
            '%name',
            obj.metadata.name
          );
          const HINT_DURATION = 3000;
          LiveHint.show(message, HINT_DURATION, () => LiveHint.hide(), { canclose: true });
        }
      }
    });

    recover.forEach((obj) => {
      if (obj instanceof HSCore.Model.Opening || obj instanceof HSCore.Model.ParametricOpening) {
        obj.signalValidityChanged.dispatch(false);
      }
    });
  }

  public onExecute(): void {
    // Intentionally empty
  }

  public onReceive(eventType: string, data: ReceiveData): boolean {
    switch (eventType) {
      case 'onBoolInputDataChange':
        this._request.receive(eventType, data);
        this._commitRequest();
        break;

      case 'changebegin':
        break;

      case 'changing':
        this._validate();
        this._request.receive(eventType, data);
        break;

      case 'changeend':
      case 'Reset':
      case 'rotationchangeend':
      case 'ResetIncludeRotate':
        this._request.receive(eventType, data);
        this._commitRequest();
        this._validate();
        return true;

      case 'dragMove':
      case 'dragEnd':
        let mousePos = data.mousePos;

        if (this._parametricOpening.relatedWalls.length === 1) {
          const fittedPos = this.fitMouseToFace(mousePos);
          if (!fittedPos) {
            return true;
          }
          mousePos = fittedPos;
        }

        if (this._originPosVec2 && this._curMousePosVec2) {
          this._curMousePosVec2.resetFromArray(mousePos).subtract(this._originPosVec2);
        }

        let dragDistance = 0;
        if (this._gizmoDir && this._curMousePosVec2) {
          dragDistance = this._gizmoDir.dot(this._curMousePosVec2);
        }

        if (dragDistance === 0) {
          return true;
        }

        const MILLIMETERS_PER_METER = 1000;
        let newValue = this._initVal + MILLIMETERS_PER_METER * dragDistance;

        if (this._needMove) {
          newValue = this._initVal / 2 + MILLIMETERS_PER_METER * dragDistance;
        }

        const sizeLimitUnlocked = this.context.app.designMetadata.get('sizeLimitUnlock');
        let newOpeningPosition: Vector2 | undefined;

        if (
          this._node &&
          (this._node.type === EN_PROPERTY_PANEL_ITEM_TYPE.FLOAT ||
            this._node.type === EN_PROPERTY_PANEL_ITEM_TYPE.INTEGER)
        ) {
          if (!sizeLimitUnlocked && Array.isArray(this._node.minMax)) {
            const [minValue, maxValue] = this._node.minMax;

            if (minValue > newValue) {
              const excess = minValue - newValue;
              newValue = minValue;
              dragDistance -= excess / MILLIMETERS_PER_METER;
            } else if (maxValue && maxValue < newValue) {
              const excess = newValue - maxValue;
              newValue = maxValue;
              dragDistance -= excess / MILLIMETERS_PER_METER;
            }
          }
        }

        const requestData: ReceiveData = {
          node: this._node,
          newValue: newValue
        };

        if (this._parametricOpening.getWallType() === 'A') {
          const arcWallParams = this._calcArcWallSDKParams(mousePos);
          if (arcWallParams) {
            requestData.newValue = arcWallParams.newValue;
            newOpeningPosition = arcWallParams.newPos;
          }
        }

        this._request.receive(eventType, requestData);

        if (this._needMove && this._openingStartPos && this._gizmoDir) {
          if (newOpeningPosition) {
            this._parametricOpening.x = newOpeningPosition.x;
            this._parametricOpening.y = newOpeningPosition.y;
            this._snapHelper.snapToWall();
          } else {
            const offset = this._gizmoDir.normalized().multiply((dragDistance - this._initVal / 2000) / 2);
            this._parametricOpening.x = this._openingStartPos.x + offset.x;
            this._parametricOpening.y = this._openingStartPos.y + offset.y;
          }
        }

        this._validate();

        if (eventType === 'dragEnd') {
          this._commitRequest();
        }

        return true;

      default:
        return super.onReceive(eventType, data);
    }

    return false;
  }

  public onComplete(success: boolean): void {
    this._validate(true);
  }

  private fitMouseToFace(mousePos?: [number, number]): [number, number] | null {
    if (!mousePos) {
      return null;
    }

    const host = this._parametricOpening.getHost() as Wall;
    const mousePosVec = new Vector2(mousePos[0], mousePos[1]);
    const openingPos = new Vector2(this._parametricOpening.x, this._parametricOpening.y);

    const leftFace = Object.values(host.leftFaces).find((face) =>
      face.faceInfo.curve.containsProjectedPt(openingPos)
    );

    const rightFace = Object.values(host.rightFaces).find((face) =>
      face.faceInfo.curve.containsProjectedPt(openingPos)
    );

    if (!leftFace || !rightFace) {
      return mousePos;
    }

    const jointCurve = host.jointCurve;
    let leftCurve = leftFace.faceInfo.curve;
    const leftStartTangent = jointCurve.getTangentAt(jointCurve.getParamAt(leftCurve.getStartPt()));

    if (leftStartTangent.dot(leftCurve.getStartTangent()) < 0) {
      leftCurve = leftCurve.reversed();
    }

    let rightCurve = rightFace.faceInfo.curve;
    const rightStartTangent = jointCurve.getTangentAt(jointCurve.getParamAt(rightCurve.getStartPt()));

    if (rightStartTangent.dot(rightCurve.getStartTangent()) < 0) {
      rightCurve = rightCurve.reversed();
    }

    const leftRange = jointCurve
      .getRange()
      .clone()
      .set(jointCurve.getParamAt(leftCurve.getStartPt()), jointCurve.getParamAt(leftCurve.getEndPt()));

    const rightRange = jointCurve
      .getRange()
      .clone()
      .set(jointCurve.getParamAt(rightCurve.getStartPt()), jointCurve.getParamAt(rightCurve.getEndPt()));

    const intersectedRanges = leftRange.intersected(rightRange);

    if (intersectedRanges.length === 0) {
      return mousePos;
    }

    const validCurve = jointCurve.clone().setRange(intersectedRanges[0]);

    if (!validCurve.containsPoint(validCurve.getProjectedPtBy(mousePosVec))) {
      const param = validCurve.getParamAt(mousePosVec);
      const clampedParam = validCurve.getRange().clamp(param);
      const clampedPoint = validCurve.getPtAt(clampedParam);
      return [clampedPoint.x, clampedPoint.y];
    }

    return mousePos;
  }
}