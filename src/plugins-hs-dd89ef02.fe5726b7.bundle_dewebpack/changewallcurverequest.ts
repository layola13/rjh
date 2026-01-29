import * as THREE from 'three';
import { HSCore } from '../core';
import { HSApp } from '../app';
import { HSFPConstants } from '../constants';
import { VectorUtils } from '../utils/VectorUtils';
import { ArcUtils } from '../utils/ArcUtils';

interface ContentPositionInfo {
  param: number;
  pointAxis: CurvePointAxis;
}

interface CurvePointAxis {
  uPoint: THREE.Vector3 | THREE.Vector2;
  uTangent: THREE.Vector3 | THREE.Vector2;
}

type THREECurve = THREE.ArcCurve | THREE.LineCurve3;

export class ChangeWallCurveRequest extends HSApp.Request.LayerStructureEditRequest {
  public wall: HSCore.Model.Wall;
  public curve: THREE.Curve<THREE.Vector3>;
  public contentInfoMap: Map<HSCore.Model.Opening | HSCore.Model.Content, ContentPositionInfo>;
  public dirtyAreas: THREE.Box3[];
  
  private _preLayerSlabInfo: unknown;

  constructor(wall: HSCore.Model.Wall, curve: THREE.Curve<THREE.Vector3>) {
    const parent = wall.getUniqueParent();
    super(parent);

    this.wall = wall;
    this.curve = curve;
    this.contentInfoMap = new Map();
    this._preLayerSlabInfo = HSCore.Util.Slab.getLayerSlabAutoRegions(parent);
    this._storeOpeningPosition();
    this.dirtyAreas = [];

    const wallGeometry = HSCore.Util.Wall.unshelveredWallGeometry(wall);
    if (wallGeometry) {
      this.dirtyAreas.push(wallGeometry);
    }
  }

  public setCurve(curve: THREE.Curve<THREE.Vector3>): void {
    this.curve = curve;
  }

  public doRequest(): void {
    this.wall.curve = this.curve;

    const wallGeometry = HSCore.Util.Wall.unshelveredWallGeometry(this.wall);
    if (wallGeometry) {
      this.dirtyAreas.push(wallGeometry);
    }

    let connectedWalls = HSCore.Util.Wall.findConnectedWalls([this.wall], true);
    connectedWalls = connectedWalls.filter((wall) => !!wall.getUniqueParent());

    HSCore.Util.Wall.cleanUpInvalidWalls(connectedWalls);

    const associationManager = HSApp.App.getApp().associationManager;
    HSCore.Util.Wall.getWallsPoints(connectedWalls).forEach((point) => {
      associationManager.updateAssociation(point);
    });

    connectedWalls.forEach((wall) => wall.dirtyGeometry());
    HSCore.Util.Wall.updateWallsFaces(connectedWalls);

    const parent = this.wall.getUniqueParent();
    HSCore.Util.Layer.dirtyLayerSlabFaces(parent, this.dirtyAreas);
    HSCore.Util.Slab.updateLayersSlabAfterWallChanged(parent, this._preLayerSlabInfo);

    this._restoreOpeningPosition();
    this._dirtyFaceOfOpening();

    super.doRequest([]);
  }

  private _storeOpeningPosition(): void {
    const wall = this.wall;
    const openings = Object.values(wall.openings);
    const wallCurve = HSCore.Util.Wall.toTHREECurve(wall);

    openings.forEach((opening) => {
      if (!opening.instanceOf(HSCore.Constants.ModelClass.NgParametricWindowHole)) {
        const position = VectorUtils.toTHREEVector3(opening);
        position.z = 0;

        const parameter = this._getCurveParameter(wallCurve, position);
        const pointAxis = this._getCurvePointAxis(wallCurve, parameter);

        this.contentInfoMap.set(opening, {
          param: parameter,
          pointAxis: pointAxis
        });
      }
    });

    Object.values(wall.contents).forEach((content) => {
      const position = VectorUtils.toTHREEVector3(content);
      position.z = 0;

      const parameter = this._getCurveParameter(wallCurve, position);
      const pointAxis = this._getCurvePointAxis(wallCurve, parameter);

      this.contentInfoMap.set(content, {
        param: parameter,
        pointAxis: pointAxis
      });
    });
  }

  private _restoreOpeningPosition(): void {
    const wall = this.wall;
    if (!wall) {
      return;
    }

    wall.refreshBoundInternal();
    const wallCurve = HSCore.Util.Wall.toTHREECurve(wall);

    this.contentInfoMap.forEach((info, entity) => {
      const newPointAxis = this._getCurvePointAxis(wallCurve, info.param);
      const transformMatrix = this._calculateTransformMatrix(info.pointAxis, newPointAxis);
      
      const newPosition = new THREE.Vector2(entity.x, entity.y).applyMatrix3(transformMatrix);
      entity.x = newPosition.x;
      entity.y = newPosition.y;

      HSCore.Util.Content.autoFitToWall(wall, entity);
      entity.assignTo(wall);

      if (entity instanceof HSCore.Model.POrdinaryWindow || entity instanceof HSCore.Model.BayWindow) {
        entity.buildPartsInfo();
      }
    });
  }

  private _calculateTransformMatrix(fromAxis: CurvePointAxis, toAxis: CurvePointAxis): THREE.Matrix3 {
    const createMatrix = (axis: CurvePointAxis): THREE.Matrix3 => {
      const point = axis.uPoint;
      const tangent = axis.uTangent;
      const normal = new THREE.Vector2(-(tangent as THREE.Vector2).y, (tangent as THREE.Vector2).x);
      
      const matrix = new THREE.Matrix3();
      matrix.set(
        (point as THREE.Vector2).x, (point as THREE.Vector2).y, 1,
        (tangent as THREE.Vector2).x, (tangent as THREE.Vector2).y, 0,
        normal.x, normal.y, 0
      );
      matrix.transpose();
      
      return matrix;
    };

    const fromMatrix = createMatrix(fromAxis);
    const toMatrix = createMatrix(toAxis);
    const inverseFromMatrix = new THREE.Matrix3().getInverse(fromMatrix);
    
    return new THREE.Matrix3().multiplyMatrices(toMatrix, inverseFromMatrix);
  }

  private _getCurveParameter(curve: THREECurve, point: THREE.Vector3): number {
    if (curve instanceof THREE.ArcCurve) {
      return ArcUtils.getParameter(curve, point);
    }
    return curve.closestPointToPointParameter(point);
  }

  private _getCurvePointAxis(curve: THREECurve, parameter: number): CurvePointAxis {
    let point: THREE.Vector3 | THREE.Vector2;
    let tangent: THREE.Vector3 | THREE.Vector2;

    if (curve instanceof THREE.ArcCurve) {
      point = curve.getPoint(parameter);
      tangent = curve.getTangent(parameter);
    } else {
      point = new THREE.Vector3();
      curve.at(parameter, point);
      tangent = new THREE.Vector3()
        .subVectors((curve as THREE.LineCurve3).end, (curve as THREE.LineCurve3).start)
        .normalize();
    }

    return {
      uPoint: point,
      uTangent: tangent
    };
  }

  private _dirtyModifiedWalls(): void {
    let connectedWalls = HSCore.Util.Wall.findConnectedWalls([this.wall], true);
    connectedWalls = connectedWalls.filter((wall) => !!wall.getUniqueParent());
    
    connectedWalls.forEach((wall) => {
      wall.dirtyGeometry();
    });
  }

  private _dirtyFaceOfOpening(): void {
    for (const key in this.wall.openings) {
      const opening = this.wall.openings[key];
      
      if (opening instanceof HSCore.Model.Opening) {
        opening.forEachFace((face) => {
          face.dirtyGeometry();
        });
      }
    }
  }

  public onUndo(): void {
    super.onUndo([]);
    this._dirtyModifiedWalls();
  }

  public onRedo(): void {
    super.onRedo([]);
    this._dirtyModifiedWalls();
  }

  public getDescription(): string {
    return '弧形墙操作';
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}