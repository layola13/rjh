interface Floor {
  id: string;
}

interface Point {
  x: number;
  y: number;
}

interface FacePath {
  // Define based on GeLib.PolygonUtils expected structure
  points?: Point[];
}

interface GeometryProvider {
  getFacePath(floor: Floor): FacePath | null | undefined;
}

interface GeometryObject {
  provider: GeometryProvider;
}

interface GeometryManager {
  getGeometryObject(id: string): GeometryObject;
}

interface DocManager {
  geometryManager: GeometryManager;
}

interface HSCoreDoc {
  getDocManager(): DocManager;
}

interface HSCoreGlobal {
  Doc: HSCoreDoc;
}

interface GeLibPolygonUtils {
  pointInPolygon(point: Point, path: FacePath, tolerance: number): number;
}

interface GeLibGlobal {
  PolygonUtils: GeLibPolygonUtils;
}

declare const HSCore: HSCoreGlobal;
declare const GeLib: GeLibGlobal;

const POLYGON_TOLERANCE = 1e-4;

export const FloorUtil = {
  /**
   * Checks if a point is inside the specified floor boundary
   * @param floor - The floor object containing an id
   * @param point - The point to test
   * @returns true if the point is inside the floor, false otherwise
   */
  isPointInsideFloor(floor: Floor, point: Point): boolean {
    const facePath = HSCore.Doc.getDocManager()
      .geometryManager
      .getGeometryObject(floor.id)
      .provider
      .getFacePath(floor);

    if (!facePath) {
      return false;
    }

    return GeLib.PolygonUtils.pointInPolygon(point, facePath, POLYGON_TOLERANCE) !== 0;
  }
};