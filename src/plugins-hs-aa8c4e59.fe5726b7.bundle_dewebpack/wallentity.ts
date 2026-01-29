import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { Utils } from './Utils';
import { HSCore } from './HSCore';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Bound {
  getTopLeft(): Point3D;
  getBottomRight(): Point3D;
}

interface Layer {
  id: string;
  height?: number;
}

interface Scene {
  getLayerAltitude(layer: Layer): number;
}

interface Floorplan {
  scene: Scene;
}

interface Application {
  floorplan: Floorplan;
  geometryManager: GeometryManager;
}

interface GeometryManager {
  getFaceRoomInfo(face: unknown): unknown;
}

interface WallData {
  id: string;
  Class: string;
  bound: Bound;
  parent?: Layer;
  length: number;
  width: number;
  height3d: number;
  rotation: number;
  from: Point3D;
  to: Point3D;
  wallType: string;
  isLoadBearing: boolean;
  outline: Point3D[];
  leftFaces: Record<string, unknown>;
  rightFaces: Record<string, unknown>;
}

interface GeometryInfo {
  innerFrom: Point3D;
  innerTo: Point3D;
  borderlinePath: Point3D[];
}

interface LocationData {
  from: Point3D;
  to: Point3D;
}

declare const HSApp: {
  App: {
    getApp(): Application;
  };
};

export class WallEntity extends AcceptEntity {
  constructor() {
    super();
  }

  buildEntityData(wallData: WallData): void {
    this.setInstanceData(this.getInstanceData(wallData));
    this.setType({
      classType: wallData.Class
    });
  }

  buildChildren(): void {
    // No children to build
  }

  getInstanceData(wallData: WallData): InstanceData {
    const bound = wallData.bound;
    const topLeft = bound.getTopLeft();
    const bottomRight = bound.getBottomRight();
    const floorplan = HSApp.App.getApp().floorplan;
    const parentLayer = wallData.parent;
    const altitude = floorplan.scene.getLayerAltitude(parentLayer!);

    const center: Point3D = {
      x: (topLeft.x + bottomRight.x) / 2,
      y: (topLeft.y + bottomRight.y) / 2,
      z: altitude
    };

    const size = [wallData.length, wallData.width, wallData.height3d];
    const instanceData = new InstanceData(wallData.id);

    instanceData.addParameter(
      new Parameter("parentId", parentLayer?.id, DataType.String),
      new Parameter("center", Utils.formatNumberPoints([center.x, center.y, center.z]), DataType.ArrayPoint3D),
      new Parameter("rotation", wallData.rotation, DataType.Number),
      new Parameter("size", Utils.formatNumberPoints(size), DataType.ArrayPoint3D),
      new Parameter("area", Utils.formatNumberPoints(this.getWallInnerLength(wallData) * wallData.height3d))
    );

    const layerHeight = parentLayer?.height ?? 0;
    const isFullHeight = wallData.height3d === layerHeight;

    const location: LocationData = {
      from: {
        x: wallData.from.x,
        y: wallData.from.y,
        z: wallData.from.z
      },
      to: {
        x: wallData.to.x,
        y: wallData.to.y,
        z: wallData.to.z
      }
    };

    instanceData.addParameter(
      new Parameter("layerId", parentLayer?.id, DataType.String),
      new Parameter("location", location, DataType.Object),
      new Parameter("wallType", wallData.wallType, DataType.String),
      new Parameter("thickness", wallData.width, DataType.Number),
      new Parameter("height", wallData.height3d, DataType.Number),
      new Parameter("bFullHeight", isFullHeight, DataType.Boolean),
      new Parameter("bBearing", wallData.isLoadBearing, DataType.Boolean),
      new Parameter("innerLength", this.getWallInnerLength(wallData), DataType.Number),
      new Parameter("sectionArea", this.getWallSectionArea(wallData), DataType.Number),
      new Parameter("isInnerWall", this.isInnerWall(wallData), DataType.Boolean)
    );

    return instanceData;
  }

  getWallInnerLength(wallData: WallData): number {
    const geometryInfo = HSCore.Util.Geometry.getWallGeometryInfo(wallData);
    let distance = HSCore.Util.Math.getDistance(wallData.from, wallData.to);

    if (geometryInfo) {
      distance = HSCore.Util.Math.getDistance(geometryInfo.innerFrom, geometryInfo.innerTo);
    }

    return Utils.formatNumberPoints(distance);
  }

  getWallSectionArea(wallData: WallData): number {
    const geometryInfo = HSCore.Util.Geometry.getWallGeometryInfo(wallData);
    const path = geometryInfo 
      ? geometryInfo.borderlinePath 
      : wallData.outline.map(point => ({
          x: point.x,
          y: point.y
        }));

    if (!HSCore.Util.Math.isSamePoint(path[0], path[path.length - 1])) {
      path.push(path[0]);
    }

    const massProperties = HSCore.Util.Geometry.getMassProperties(path);
    return Utils.formatNumberPoints(Math.abs(massProperties[0]));
  }

  isInnerWall(wallData: WallData): boolean {
    const geometryManager = HSApp.App.getApp().geometryManager;
    const leftFaces = Object.values(wallData.leftFaces);
    const rightFaces = Object.values(wallData.rightFaces);

    const hasLeftRoom = leftFaces.length > 0 && !!geometryManager.getFaceRoomInfo(leftFaces[0]);
    const hasRightRoom = rightFaces.length > 0 && !!geometryManager.getFaceRoomInfo(rightFaces[0]);

    return hasLeftRoom && hasRightRoom;
  }
}