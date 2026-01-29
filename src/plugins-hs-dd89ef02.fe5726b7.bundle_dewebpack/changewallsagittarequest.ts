interface CurvePointAxis {
  uPoint: THREE.Vector2 | THREE.Vector3;
  uTangent: THREE.Vector2 | THREE.Vector3;
}

interface ContentInfo {
  param: number;
  pointAxis: CurvePointAxis;
}

interface CenterRadius {
  center: THREE.Vector3;
  radius: number;
}

export class ChangeWallSagittaRequest extends HSApp.Request.LayerStructureEditRequest {
  private entity: HSCore.Model.Wall;
  private sagitta: number;
  private contentInfoMap: Map<HSCore.Model.Entity, ContentInfo>;
  private wall: HSCore.Model.Wall;
  private _preLayerSlabInfo: unknown;

  constructor(wall: HSCore.Model.Wall, sagitta: number) {
    const parent = wall.getUniqueParent();
    super(parent);
    
    this.entity = wall;
    this.sagitta = sagitta;
    this.contentInfoMap = new Map();
    this.wall = wall;
    this._preLayerSlabInfo = HSCore.Util.Slab.getLayerSlabAutoRegions(parent);
  }

  doRequest(): void {
    if (this.wall.curve instanceof HSCore.Model.Geom.ArcCurve) {
      this._storeOpeningPosition();
      
      const fromVector = GeLib.VectorUtils.toTHREEVector3(this.wall.from);
      const toVector = GeLib.VectorUtils.toTHREEVector3(this.wall.to);
      const centerRadius: CenterRadius = GeLib.ArcUtils.getCenterRadiusBySagitta(
        fromVector,
        toVector,
        this.sagitta
      );
      
      this.wall.changeToArcWall(centerRadius.center, this.wall.curve.clockwise);
      
      let connectedWalls = HSCore.Util.Wall.findConnectedWalls([this.wall], true);
      connectedWalls = connectedWalls.filter((wall: HSCore.Model.Wall) => !!wall.getUniqueParent());
      
      HSCore.Util.Wall.cleanUpInvalidWalls(connectedWalls);
      
      const associationManager = HSApp.App.getApp().associationManager;
      HSCore.Util.Wall.getWallsPoints(connectedWalls).forEach((point: unknown) => {
        associationManager.updateAssociation(point);
      });
      
      connectedWalls.forEach((wall: HSCore.Model.Wall) => wall.dirtyGeometry());
      
      HSCore.Util.Wall.updateWallsFaces(connectedWalls);
      
      const parent = this.wall.getUniqueParent();
      HSCore.Util.Slab.updateLayersSlabAfterWallChanged(parent, this._preLayerSlabInfo);
      
      this._restoreOpeningPosition();
      
      super.doRequest([]);
    }
  }

  private _storeOpeningPosition(): void {
    const wall = this.entity;
    const openings = Object.values(wall.openings);
    const curve = HSCore.Util.Wall.toTHREECurve(wall);
    
    openings.forEach((opening: HSCore.Model.Entity) => {
      if (!opening.instanceOf(HSConstants.ModelClass.NgParametricWindowHole)) {
        const position = GeLib.VectorUtils.toTHREEVector3(opening);
        position.z = 0;
        
        const parameter = this._getCurveParameter(curve, position);
        const pointAxis = this._getCurvePointAxis(curve, parameter);
        
        this.contentInfoMap.set(opening, {
          param: parameter,
          pointAxis: pointAxis
        });
      }
    });
    
    Object.values(wall.contents).forEach((content: HSCore.Model.Entity) => {
      const position = GeLib.VectorUtils.toTHREEVector3(content);
      position.z = 0;
      
      const parameter = this._getCurveParameter(curve, position);
      const pointAxis = this._getCurvePointAxis(curve, parameter);
      
      this.contentInfoMap.set(content, {
        param: parameter,
        pointAxis: pointAxis
      });
    });
  }

  private _restoreOpeningPosition(): void {
    const wall = this.entity;
    if (!wall) return;
    
    wall.refreshBoundInternal();
    const curve = HSCore.Util.Wall.toTHREECurve(wall);
    
    this.contentInfoMap.forEach((info: ContentInfo, entity: HSCore.Model.Entity) => {
      const newPointAxis = this._getCurvePointAxis(curve, info.param);
      const transformMatrix = this._computeTransformMatrix(info.pointAxis, newPointAxis);
      
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

  private _computeTransformMatrix(fromAxis: CurvePointAxis, toAxis: CurvePointAxis): THREE.Matrix3 {
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

  private _getCurveParameter(curve: THREE.Curve<THREE.Vector3> | THREE.ArcCurve, point: THREE.Vector3): number {
    if (curve instanceof THREE.ArcCurve) {
      return GeLib.ArcUtils.getParameter(curve, point);
    }
    return curve.closestPointToPointParameter(point);
  }

  private _getCurvePointAxis(curve: THREE.Curve<THREE.Vector3> | THREE.ArcCurve, parameter: number): CurvePointAxis {
    let point: THREE.Vector3 | THREE.Vector2;
    let tangent: THREE.Vector3 | THREE.Vector2;
    
    if (curve instanceof THREE.ArcCurve) {
      point = curve.getPoint(parameter);
      tangent = curve.getTangent(parameter);
    } else {
      point = new THREE.Vector3();
      curve.at(parameter, point);
      tangent = new THREE.Vector3().subVectors(curve.end, curve.start).normalize();
    }
    
    return {
      uPoint: point,
      uTangent: tangent
    };
  }

  onUndo(): void {
    super.onUndo([]);
    this._dirtyModifiedWalls();
  }

  onRedo(): void {
    super.onRedo([]);
    this._dirtyModifiedWalls();
  }

  private _dirtyModifiedWalls(): void {
    let connectedWalls = HSCore.Util.Wall.findConnectedWalls([this.entity], true);
    connectedWalls = connectedWalls.filter((wall: HSCore.Model.Wall) => !!wall.getUniqueParent());
    
    connectedWalls.forEach((wall: HSCore.Model.Wall) => {
      wall.dirtyGeometry();
    });
  }
}