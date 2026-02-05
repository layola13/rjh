// @ts-nocheck
interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface BoundBox {
  square?: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}

interface Direction3D {
  x: number;
  y: number;
  z: number;
}

interface RouteSegment {
  getDirection?: () => Direction3D;
}

interface TubeEntity {
  id: string;
  route: RouteSegment[];
}

interface GeometryObject {
  bounding: number[];
}

interface Geometry {
  objects: GeometryObject[];
}

interface GeometryData {
  geometry: Geometry;
}

interface GeometryManager {
  getGeometryObject(id: string): GeometryData | null;
}

interface Document {
  geometryManager: GeometryManager;
}

interface AppContext {
  document: Document;
}

interface AxisDirection {
  axisX: boolean;
  axisY: boolean;
  axisZ: boolean;
}

export default class TubeGeometryUtil {
  /**
   * Get bound points from tube entity geometry
   */
  static getTubeBoundPoints(context: AppContext, entity: TubeEntity): Point3D[] {
    const geometryData = context.document.geometryManager.getGeometryObject(entity.id);
    
    if (!geometryData) {
      return [];
    }

    const points: Point3D[] = [];
    const objects = geometryData.geometry.objects;
    const lengthUnit = HSCore.Util.Unit.LengthUnitTypeEnum.centimeter;

    for (let i = 0; i < objects.length; i++) {
      const bounding = objects[i].bounding;
      const metersArray = bounding.map((value) => 
        HSCore.Util.Unit.ConvertToMeter(lengthUnit, value)
      );

      points.push({
        x: metersArray[0],
        y: metersArray[1],
        z: metersArray[2]
      });

      points.push({
        x: metersArray[3],
        y: metersArray[4],
        z: metersArray[5]
      });
    }

    return points;
  }

  /**
   * Get bounding box for tube entity
   */
  static getTubeBoundBox(context: AppContext, entity: TubeEntity): BoundBox {
    const points = TubeGeometryUtil.getTubeBoundPoints(context, entity) || [];
    return HSCore.Util.DEntityUtils.BoundUtil.getBoundBox(points);
  }

  /**
   * Get 2D outline points from tube bounding box
   */
  static getTubeOutline(context: AppContext, entity: TubeEntity): Point2D[] {
    const boundBox = TubeGeometryUtil.getTubeBoundBox(context, entity);

    if (boundBox?.square) {
      return [
        { x: boundBox.square.minX, y: boundBox.square.minY },
        { x: boundBox.square.maxX, y: boundBox.square.minY },
        { x: boundBox.square.maxX, y: boundBox.square.maxY },
        { x: boundBox.square.minX, y: boundBox.square.maxY }
      ];
    }

    return [];
  }

  /**
   * Determine primary axis direction of tube
   */
  static getTubeAxisDir(entity: TubeEntity): AxisDirection | undefined {
    const firstSegment = entity.route[0];

    if (firstSegment.getDirection) {
      const direction = firstSegment.getDirection();
      const absX = Math.abs(direction.x);
      const absY = Math.abs(direction.y);
      const absZ = Math.abs(direction.z);

      return {
        axisX: absX < absY || absX < absZ,
        axisY: absY < absX || absY < absZ,
        axisZ: absZ < absX || absZ < absY
      };
    }

    return undefined;
  }
}