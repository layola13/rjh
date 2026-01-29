import { CabinetBase } from './CabinetBase';
import { SVGParser, Vector2, Vector3, Line2d, Polygon, Loop, Coordinate3, CurveUtil, MathAlg } from './MathLibrary';
import { alg } from './GeometryAlgorithms';
import { RoomUtil } from './RoomUtil';
import { Util } from './MaterialUtil';
import { segment3dToPoints, pointsToLine3ds } from './CurveUtils';

interface DSweepModel {
  profile?: string;
  profileTransform?: any;
  profileRefYDir?: [number, number, number] | null;
  paths: Array<Curve3d>;
  modelCutPlanes: Array<Plane>;
  material: MaterialDefinition;
  ID: string;
  isFlagOn(flag: number): boolean;
}

interface Curve3d {
  getStartPt(): Vector3;
  getEndPt(): Vector3;
  getStartTangent(): Vector3;
  getLength(): number;
  isLine3d(): boolean;
  isParallelTo(other: Curve3d): boolean;
}

interface Plane {
  // Plane definition
}

interface MaterialDefinition {
  offsetX?: number;
  offsetY?: number;
  flipX?: boolean;
  flipY?: boolean;
  tileSize_x?: number;
  tileSize_y?: number;
  rotation?: number;
}

interface FlatMesh {
  vertices: number[];
  normals: number[];
  uvs: number[];
  faces: number[];
}

interface GraphicsData {
  objects: GraphicsObject[];
  meshDefs: MeshDefinition[];
}

interface GraphicsObject {
  entityId: string;
  type: string;
  visible: boolean;
  position: Float32Array;
  rotation: Float32Array;
  scale: Float32Array;
  customAttrs: {
    roomType: string;
    roomArea: number;
    type: string;
  };
  material?: any;
  seekId?: string;
  mesh?: string;
  graphicsPath?: string;
}

interface MeshDefinition {
  meshKey: string;
  vertexPositions: Float32Array;
  vertexNormals: Float32Array;
  vertexUVs: Float32Array;
  vertexCount: number;
  faceIndices: Uint32Array;
  indexCount: number;
}

export class DSweep extends CabinetBase {
  private _flatMesh?: FlatMesh;

  get modelDSweep(): DSweepModel {
    return this.entity as DSweepModel;
  }

  onUpdate(): void {
    if (!this.modelDSweep.profile) {
      return;
    }

    const polyCurve = SVGParser.stringToPolyCurves(this.modelDSweep.profile)[0];
    const allCurves = polyCurve.getAllCurves();
    const firstCurve = allCurves[0];
    const lastCurve = allCurves[allCurves.length - 1];

    const DISTANCE_TOLERANCE = 0.001;

    if (firstCurve.getStartPt().distanceTo(lastCurve.getEndPt()) > DISTANCE_TOLERANCE) {
      const closingPoints = [
        lastCurve.getEndPt(),
        new Vector2(0, 0),
        firstCurve.getStartPt()
      ];

      if (closingPoints[0].distanceTo(closingPoints[1]) < DISTANCE_TOLERANCE || 
          closingPoints[1].distanceTo(closingPoints[2]) < DISTANCE_TOLERANCE) {
        closingPoints.splice(1, 1);
      }

      for (let i = 0; i < closingPoints.length - 1; i++) {
        polyCurve.addCurve(new Line2d(closingPoints[i], closingPoints[i + 1]));
      }
    }

    if (this.modelDSweep.profileTransform) {
      polyCurve.transform(this.modelDSweep.profileTransform);
    }

    const sweepPaths = this.modelDSweep.paths[0] || [];
    if (sweepPaths.length === 0) {
      return;
    }

    let sweepBody;
    const startTangent = sweepPaths[0].getStartTangent().normalize();

    if (this.modelDSweep.profileRefYDir) {
      const refYDirection = new Vector3(this.modelDSweep.profileRefYDir);
      const xDirection = refYDirection.cross(startTangent);
      const coordinate = new Coordinate3(sweepPaths[0].getStartPt(), xDirection, refYDirection);
      const pathPoints = segment3dToPoints(sweepPaths);
      const pathLines = pointsToLine3ds(pathPoints);
      sweepBody = alg.BodyBuilder.sweep(coordinate, new Polygon(new Loop(polyCurve.getAllCurves())), pathLines);
    } else {
      const firstPath = sweepPaths[0];
      const allPathsParallel = sweepPaths.length > 1 && 
        firstPath.isLine3d() && 
        sweepPaths.slice(1).every(path => path.isLine3d() && path.isParallelTo(firstPath));

      let upDirection = sweepPaths.length === 1 || allPathsParallel
        ? new Vector3(0, 0, 1)
        : CurveUtil.getDzByCurves(sweepPaths).reverse();

      if (upDirection.isParallel(new Vector3(0, 0, 1))) {
        upDirection = new Vector3(0, 0, 1);
      }

      const xDirection = startTangent.cross(upDirection);
      const coordinate = new Coordinate3(sweepPaths[0].getStartPt(), xDirection, upDirection);

      if (sweepPaths.length === 1 && sweepPaths[0].getLength() < DISTANCE_TOLERANCE) {
        return;
      }

      const pathPoints = segment3dToPoints(sweepPaths);
      const pathLines = pointsToLine3ds(pathPoints);
      const profileLoop = new Loop(polyCurve.getAllCurves());
      const copiedCurves = profileLoop.copyAllCurves();

      const hasInvalidCurves = copiedCurves.some(curve => 
        curve.isLine2d() && curve.getDirection().equals(Vector2.O()) ||
        copiedCurves.every(otherCurve => {
          const positionType = MathAlg.PositionJudge.curveCurveOverlap(curve.extendDouble(1000), otherCurve);
          return positionType === MathAlg.CurveCuvePositonType.OVERLAP || 
                 positionType === MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP;
        })
      );

      if (hasInvalidCurves) {
        return;
      }

      sweepBody = alg.BodyBuilder.sweep(coordinate, new Polygon(profileLoop), pathLines);
    }

    const faceMeshes = sweepBody.getFaces().map(face => 
      MathAlg.MeshUtil.toFlatMesh(face.tessellate().mesh)
    );
    this._flatMesh = MathAlg.MeshUtil.merge(...faceMeshes);

    const cutPlaneCount = this.modelDSweep.modelCutPlanes.length;
    for (let i = 0; i < cutPlaneCount; i++) {
      this._flatMesh = MathAlg.MeshUtil.clip(this._flatMesh, this.modelDSweep.modelCutPlanes[i], false);
    }
  }

  toGraphicsData(): GraphicsData {
    const graphicsData: GraphicsData = {
      objects: [],
      meshDefs: []
    };

    if (!this._flatMesh) {
      return graphicsData;
    }

    const entity = this.entity;
    if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden) || 
        entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
      return graphicsData;
    }

    const transformMatrix = HSCore.Util.Matrix3DHandler.getMatrix4(entity);
    const position = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);
    transformMatrix.decompose(position, rotation, scale);

    const hostRoom = this.getHostRoom(entity);

    const graphicsObject: GraphicsObject = {
      entityId: entity.ID,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: true,
      position: new Float32Array([position.x, position.y, position.z]),
      rotation: new Float32Array([rotation.x, rotation.y, rotation.z, rotation.w]),
      scale: new Float32Array([1, 1, 1]),
      customAttrs: {
        roomType: hostRoom ? `${hostRoom.roomType || 'none'}-${hostRoom.ID}` : 'none',
        roomArea: hostRoom ? RoomUtil.getArea(hostRoom) : 0,
        type: 'Cabinet'
      }
    };

    const meshKey = THREE.Math.generateUUID();
    const meshDefinition: MeshDefinition = {
      meshKey,
      vertexPositions: new Float32Array(this._flatMesh.vertices),
      vertexNormals: new Float32Array(this._flatMesh.normals),
      vertexUVs: new Float32Array(this._flatMesh.uvs),
      vertexCount: this._flatMesh.vertices.length / 3,
      faceIndices: new Uint32Array(this._flatMesh.faces),
      indexCount: this._flatMesh.faces.length
    };

    const meshObject = Object.assign({
      material: this._getSweepMaterial(),
      seekId: '',
      mesh: meshKey,
      graphicsPath: `${this.entity.ID}/${meshKey}`
    }, graphicsObject);

    graphicsData.meshDefs.push(meshDefinition);
    graphicsData.objects.push(meshObject);

    return graphicsData;
  }

  private _getSweepMaterial(): any {
    const material = this.entity.material;
    const offsetX = material.offsetX || 0;
    const offsetY = material.offsetY || 0;
    const translationMatrix = new THREE.Matrix3().translate(offsetX, offsetY);

    const flipX = material.flipX ? -1 : 1;
    const flipY = material.flipY ? -1 : 1;
    const scaleX = flipX / (material.tileSize_x || 1);
    const scaleY = flipY / (material.tileSize_y || 1);
    const scaleMatrix = new THREE.Matrix3().scale(scaleX, scaleY);

    const rotationRadians = THREE.Math.degToRad(material.rotation || 0);
    const rotationMatrix = new THREE.Matrix3().rotate(rotationRadians);

    const scaleRotationMatrix = new THREE.Matrix3().multiplyMatrices(scaleMatrix, rotationMatrix);
    const uvTransformMatrix = new THREE.Matrix3().multiplyMatrices(translationMatrix, scaleRotationMatrix);

    let materialObject = Util.getMaterialObject(material);
    materialObject = Util.setGraphicMaterialParam(materialObject, material, this.entity, false, false);
    materialObject.diffuseMapUvTransform = uvTransformMatrix;
    materialObject.normalMapUvTransform = new THREE.Matrix3();

    return materialObject;
  }
}