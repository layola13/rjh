import { BaseObject } from './BaseObject';
import { TransUtil } from './TransUtil';
import { Face } from './Face';
import { FaceGeometry } from './FaceGeometry';
import { DHoleProvider } from './DHoleProvider';
import * as THREE from 'three';

interface ClipAidCSG {
  csg: THREE.Mesh;
  box: THREE.Box3;
}

interface ClipAidCSGsResult {
  csgs: ClipAidCSG[];
  node: THREE.Object3D;
}

interface ExtrudeOptions {
  amount: number;
  bevelEnabled: boolean;
}

interface Pocket {
  XSize: number;
}

interface Entity extends THREE.Object3D {
  id: string;
  XScale: number;
  z: number;
  ZSize: number;
  getPocket(): Pocket | null;
  forEachChild?(callback: (child: unknown) => void, context: unknown): void;
}

interface Context {
  // Add context properties as needed
}

/**
 * DHole class - Represents a hole geometry in the 3D scene
 */
export class DHole extends BaseObject {
  private _dataProvider: DHoleProvider;
  private _matrixLocal?: THREE.Matrix4;
  private _clipAidCSGs?: ClipAidCSGsResult;
  protected childNodes?: Map<string, FaceGeometry>;

  constructor(entity: Entity, context: Context, options: unknown) {
    super(entity, context, options);
    
    this._dataProvider = new DHoleProvider(this.entity);
    
    entity.forEachChild?.((child: unknown) => {
      if (child instanceof Face) {
        this.createFaceObject(child);
      }
    }, this);
    
    this.updateMatrix();
    this.updateWorldMatrix(true);
  }

  onUpdate(delta: number): void {
    this.updateMatrix();
    this.updateWorldMatrix(true);
  }

  updateMatrix(): void {
    this._matrixLocal = HSCore.Util.Matrix3DHandler.getMatrix4WithAnimationMat(
      this.entity,
      true
    );
    TransUtil.convertMatrixUnit(this._matrixLocal, undefined);
  }

  createFaceObject(face: Face): void {
    const faceGeometry = new FaceGeometry(
      face,
      this.context,
      this,
      this._dataProvider,
      undefined
    );
    
    this.childNodes?.set(face.id, faceGeometry);
  }

  getClipAidCSGs(): ClipAidCSGsResult | undefined {
    if (!this._clipAidCSGs) {
      this._clipAidCSGs = this._createClipAidCSGs();
    }
    return this._clipAidCSGs;
  }

  private _createClipAidCSGs(): ClipAidCSGsResult | undefined {
    const entity = this.entity as Entity;
    const pocket = entity.getPocket();
    const offsetAmount = pocket ? pocket.XSize / entity.XScale : 0;

    let profilePoints = HSCore.Util.ProfileParser.parseOpeningProfile(entity);
    
    if (!profilePoints || profilePoints.length === 0) {
      return undefined;
    }

    if (offsetAmount) {
      profilePoints = HSCore.Util.Collision.OffsetPolygon([profilePoints], offsetAmount)[0];
    }

    let minY: number | undefined;
    let maxY: number | undefined;
    
    profilePoints.forEach((point: { x: number; y: number }) => {
      if (minY === undefined) {
        minY = point.y;
        maxY = point.y;
      } else {
        minY = Math.min(point.y, minY);
        maxY = Math.max(point.y, maxY!);
      }
    });

    const isNearZero = HSCore.Util.Math.nearlyEquals(entity.z, 0);
    const EPSILON = 0.001;

    const adjustedPoints = profilePoints.map((point: { x: number; y: number }) => {
      if (isNearZero && HSCore.Util.Math.nearlyEquals(point.y, maxY!)) {
        return new THREE.Vector2(point.x, point.y + EPSILON);
      }
      if (isNearZero && HSCore.Util.Math.nearlyEquals(point.y, minY!)) {
        return new THREE.Vector2(point.x, point.y - EPSILON);
      }
      return new THREE.Vector2(point.x, point.y);
    });

    const extrudeSettings: ExtrudeOptions = {
      amount: 2,
      bevelEnabled: false
    };

    const shape = new THREE.Shape(adjustedPoints);
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.25
    });

    const mesh = new THREE.Mesh(geometry, material);

    const position = new THREE.Vector3(0, 0, -extrudeSettings.amount / 2);
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);
    const transformMatrix = new THREE.Matrix4().compose(position, quaternion, scale);

    const meshGeometry = mesh.geometry;
    if (meshGeometry instanceof THREE.Geometry) {
      meshGeometry.vertices = meshGeometry.vertices.map((vertex: THREE.Vector3) =>
        vertex.applyMatrix4(transformMatrix)
      );
    }

    const contentNode = HSCore.Geometry.Util.getContentNode(entity);
    const entityLayer = HSCore.Util.Layer.getEntityLayer(this.entity);

    let altitude = 0;
    if (entityLayer instanceof HSCore.Model.Layer) {
      altitude = HSCore.Util.Layer.getAltitude(entityLayer);
    }

    contentNode.position.y -= entity.ZSize / 2 - altitude;
    contentNode.add(mesh);
    contentNode.updateMatrixWorld(false);

    const boundingBox = new THREE.Box3();
    boundingBox.setFromObject(contentNode);

    const clipAidCSGs: ClipAidCSG[] = [];
    clipAidCSGs.push({
      csg: mesh,
      box: boundingBox
    });

    return {
      csgs: clipAidCSGs,
      node: contentNode
    };
  }
}