import { Parameter, DataType } from './Parameter';
import { Matrix4 } from './Matrix4';
import { HSCatalog, HSCore } from './HSCore';
import { genEntityTypeFromContent, genInstanceDataFromContent } from './EntityUtils';
import { CustomizedPMInsFaceEntity } from './CustomizedPMInsFaceEntity';
import { CustomizedPMInsEdgeEntity } from './CustomizedPMInsEdgeEntity';
import { CustomizedPMInsMoldingEntity } from './CustomizedPMInsMoldingEntity';
import { Utils } from './Utils';
import { AcceptEntity } from './AcceptEntity';

interface SourceData {
  type: string;
  path: string;
  validArea?: number;
  overlap?: RoomPlaneInfo;
  facePlane?: {
    n: THREE.Vector3;
    o: THREE.Vector3;
  };
}

interface RoomPlaneInfo {
  plane: THREE.Plane;
  host: HSCore.Model.Wall | HSCore.Model.Ceiling | HSCore.Model.Floor;
}

interface ContentInstance {
  id: string;
  modelingDocId: string;
  instanceId: string;
  contentType: {
    isTypeOf: (type: unknown) => boolean;
  };
  getHostRoom: () => Room[];
  getTransformMatrix: () => { toArray: () => number[] };
  isInstanceInLayer: (layer: Layer) => boolean;
}

interface Room {
  id: string;
  roomInfos: Array<{
    structures: HSCore.Model.Wall[];
    faces: Face[];
  }>;
  getOuterLoopPolygon?: () => Array<{ x: number; y: number; z: number }>;
}

interface Layer {
  id: string;
  height: number;
}

interface Face {
  id: string;
  hasParent: (structure: unknown) => boolean;
  getOuterLoopPolygon: () => Array<{ x: number; y: number; z: number }>;
}

interface Scene {
  outdoorLayer: Layer;
  findLayer: (predicate: (layer: Layer) => boolean) => Layer | undefined;
}

interface FloorPlan {
  scene: Scene;
}

interface App {
  floorplan: FloorPlan;
}

declare const HSApp: {
  App: {
    getApp: () => App;
  };
};

declare const DiySdk: {
  DmDiyApi: {
    getBomData: (modelingDocId: string, instanceId: string, transform?: Matrix4) => SourceData[];
  };
};

declare const GeLib: {
  VectorUtils: {
    isPointEqual: (v1: THREE.Vector3, v2: THREE.Vector3) => boolean;
  };
  LineUtils: {
    isPointOnLine: (point: THREE.Vector3, line: THREE.Line3) => boolean;
  };
};

const MILLIMETERS_SCALE = 1000;
const PLANE_DOT_THRESHOLD = 0.01;
const FLOOR_DISTANCE_THRESHOLD = 0.05;
const DEFAULT_DISTANCE_THRESHOLD = 0.002;

export class CustomizedPMInsEntity extends AcceptEntity {
  private _sourceDatas: SourceData[] = [];

  constructor() {
    super();
  }

  buildEntityData(content: ContentInstance): void {
    this.updateSourceDatas(content);
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
  }

  buildChildren(): void {
    const faceData = this._sourceDatas.filter(data => data.type === 'face');
    faceData.forEach(data => {
      this.addChild(new CustomizedPMInsFaceEntity().accept(data));
    });

    const edgeData = this._sourceDatas.filter(data => data.type === 'edge');
    edgeData.forEach(data => {
      this.addChild(new CustomizedPMInsEdgeEntity().accept(data));
    });

    const moldingData = this._sourceDatas.filter(
      data => data.type === 'lightband' || data.type === 'lightslot' || data.type === 'molding'
    );
    moldingData.forEach(data => {
      this.addChild(new CustomizedPMInsMoldingEntity().accept(data));
    });
  }

  getInstanceData(content: ContentInstance): ReturnType<typeof genInstanceDataFromContent> {
    const instanceData = genInstanceDataFromContent(content);
    const hostRooms = content.getHostRoom();

    if (hostRooms.length === 1) {
      const room = hostRooms[0];
      const roomId = room?.id;
      instanceData.addParameter(new Parameter('roomId', roomId, DataType.String));
      
      this.updateRoomOverlapInfo(room);

      const hostFace = this.getHostFace(content);
      if (hostFace) {
        instanceData.addParameter(new Parameter('hostFace', hostFace.id, DataType.String));
      }

      const surfaceArea = this._sourceDatas
        .filter(data => data.type === 'face' && !data.overlap)
        .reduce((total, data) => (data.validArea ?? 0) + total, 0);
      
      instanceData.addParameter(
        new Parameter('surfaceArea', Utils.formatNumberPoints(surfaceArea), DataType.Number)
      );
    }

    const app = HSApp.App.getApp();
    const scene = app.floorplan.scene;
    const layer = scene.findLayer(l => l !== scene.outdoorLayer && content.isInstanceInLayer(l));

    if (layer) {
      instanceData.addParameter(new Parameter('layerId', layer.id, DataType.String));
    }

    return instanceData;
  }

  updateSourceDatas(content: ContentInstance): void {
    const transformMatrix = new Matrix4().fromArray(content.getTransformMatrix().toArray());
    
    let transform: Matrix4 | undefined;
    if (transformMatrix.isIdentity()) {
      transform = undefined;
    } else {
      const translation = transformMatrix.getTranslation().multiply(MILLIMETERS_SCALE);
      transformMatrix.setTranslation(translation);
      transform = transformMatrix;
    }

    const bomData = DiySdk.DmDiyApi.getBomData(
      content.modelingDocId,
      content.instanceId,
      transform
    );

    const pathPrefix = `${content.id}, `;
    bomData.forEach(data => {
      data.path = pathPrefix + data.path;
    });

    this._sourceDatas = bomData;
  }

  updateRoomOverlapInfo(room: Room): void {
    const faceData = this._sourceDatas.filter(data => data.type === 'face');
    const roomPlaneInfos = this.getRoomPlaneInfos(room);

    for (const face of faceData) {
      if (face.facePlane) {
        const normal = new THREE.Vector3().copy(face.facePlane.n);
        const origin = new THREE.Vector3().copy(face.facePlane.o);

        for (const planeInfo of roomPlaneInfos) {
          if (this.isPlaneOverlap(planeInfo, normal, origin)) {
            face.overlap = planeInfo;
            break;
          }
        }
      }
    }
  }

  getHostFace(content: ContentInstance): Face | undefined {
    const overlappingFaces = this._sourceDatas
      .filter(data => data.type === 'face')
      .filter(data => data.overlap);

    if (overlappingFaces.length === 0) {
      return undefined;
    }

    let hostType: typeof HSCore.Model.Wall | typeof HSCore.Model.Ceiling | typeof HSCore.Model.Floor | undefined;

    if (content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPMInstanceWall)) {
      hostType = HSCore.Model.Wall;
    } else if (content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPMInstanceCeiling)) {
      hostType = HSCore.Model.Ceiling;
    } else if (content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPMInstancePlatform)) {
      hostType = HSCore.Model.Floor;
    }

    if (hostType) {
      const matchingFaces = overlappingFaces.filter(
        face => face.overlap!.host instanceof hostType!
      );
      if (matchingFaces.length > 0) {
        return matchingFaces[0].overlap!.host as unknown as Face;
      }
    }

    return overlappingFaces[0].overlap!.host as unknown as Face;
  }

  isPlaneOverlap(planeInfo: RoomPlaneInfo, normal: THREE.Vector3, origin: THREE.Vector3): boolean {
    const { plane, host } = planeInfo;

    const dotProduct = Math.abs(Math.abs(normal.dot(plane.normal)) - 1);
    if (dotProduct > PLANE_DOT_THRESHOLD) {
      return false;
    }

    const distance = plane.distanceToPoint(origin);
    const threshold = host instanceof HSCore.Model.Floor 
      ? FLOOR_DISTANCE_THRESHOLD 
      : DEFAULT_DISTANCE_THRESHOLD;

    return distance <= threshold;
  }

  getFacePlane(face: Face, zOffset: number): THREE.Plane | undefined {
    const polygon = face.getOuterLoopPolygon();
    if (!polygon || polygon.length <= 2) {
      return undefined;
    }

    const points = polygon.map(p => new THREE.Vector3(p.x, p.y, p.z + zOffset));
    const firstPoint = points[0];
    const differentPoints = points.filter(p => !GeLib.VectorUtils.isPointEqual(p, firstPoint));

    if (differentPoints.length === 0) {
      return undefined;
    }

    const secondPoint = differentPoints[0];
    const line = new THREE.Line3(firstPoint, secondPoint);
    const thirdPoint = points.find(p => !GeLib.LineUtils.isPointOnLine(p, line));

    if (!thirdPoint) {
      return undefined;
    }

    return new THREE.Plane().setFromCoplanarPoints(firstPoint, secondPoint, thirdPoint);
  }

  getRoomPlaneInfos(room: Room): RoomPlaneInfo[] {
    const layer = HSCore.Util.Layer.getEntityLayer(room);
    const layerHeight = layer?.height ?? 0;
    const altitude = HSCore.Util.Layer.getAltitude(layer);
    const planeInfos: RoomPlaneInfo[] = [];

    const roomInfo = room.roomInfos[0];
    const structures = roomInfo.structures;
    const faces = roomInfo.faces;

    for (const structure of structures) {
      if (HSCore.Util.Wall.isArcWall(structure)) {
        continue;
      }

      const structureFaces = faces.filter(face => face.hasParent(structure));
      for (const face of structureFaces) {
        const plane = this.getFacePlane(face, altitude);
        if (plane) {
          planeInfos.push({ plane, host: structure });
        }
      }
    }

    const horizontalSurfaces: Room[] = [room];
    const ceiling = HSCore.Util.Floor.getFloorCeiling(room);
    if (ceiling) {
      horizontalSurfaces.push(ceiling);
    }

    for (const surface of horizontalSurfaces) {
      let surfaceAltitude = altitude;
      if (surface instanceof HSCore.Model.Ceiling) {
        surfaceAltitude = altitude + layerHeight;
      }

      const plane = this.getFacePlane(surface as unknown as Face, surfaceAltitude);
      if (plane) {
        planeInfos.push({ 
          plane, 
          host: surface as unknown as HSCore.Model.Wall | HSCore.Model.Ceiling | HSCore.Model.Floor
        });
      }
    }

    return planeInfos;
  }
}