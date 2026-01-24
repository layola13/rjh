/**
 * WKT (Well-Known Text) geometry format utility class
 * Provides methods to convert geometric objects to WKT string representations
 */

/**
 * Represents a 2D point with x and y coordinates
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Represents a 2D bounding box
 */
interface Box2 {
  /**
   * Returns the four corner points of the box
   */
  getCornerPts(): Point[];
}

/**
 * Represents a closed geometric loop (polygon ring)
 */
interface Loop {
  /**
   * Returns the starting point of the loop
   */
  getStartPt(): Point;
  
  /**
   * Returns all points in the loop
   */
  getAllPoints(): Point[];
}

/**
 * Represents a polygon with an outer boundary and optional holes
 */
interface Polygon {
  /**
   * The outer boundary loop of the polygon
   */
  outer: Loop;
  
  /**
   * Array of holes (inner rings) within the polygon
   */
  holes: Loop[];
}

/**
 * Utility class for converting geometric objects to WKT (Well-Known Text) format
 * @see https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry
 */
export declare class WKTUtils {
  /**
   * Converts a loop to WKT coordinate parameter string
   * @param loop - The loop to convert
   * @returns WKT coordinate parameters in format "(x1 y1, x2 y2, ..., x1 y1)"
   */
  static loopToWKTParams(loop: Loop): string;

  /**
   * Converts an array of points to WKT coordinate parameter string
   * @param points - Array of points to convert
   * @returns WKT coordinate parameters in format "(x1 y1, x2 y2, ..., x1 y1)"
   */
  static pointsToWKTParams(points: Point[]): string;

  /**
   * Converts a single point to WKT coordinate parameter string
   * @param point - The point to convert
   * @returns WKT coordinate parameters in format "x y"
   */
  static pointToWKTParams(point: Point): string;

  /**
   * Converts a point to WKT POINT representation
   * @param point - The point to convert
   * @returns WKT string in format "POINT (x y)"
   */
  static pointToWKT(point: Point): string;

  /**
   * Converts a 2D box to WKT POLYGON representation
   * @param box - The bounding box to convert
   * @returns WKT string in format "POLYGON ((x1 y1, x2 y2, x3 y3, x4 y4, x1 y1))"
   */
  static box2ToWKT(box: Box2): string;

  /**
   * Converts a loop to WKT POLYGON representation
   * @param loop - The loop to convert
   * @returns WKT string in format "POLYGON ((x1 y1, x2 y2, ..., x1 y1))"
   */
  static loopToWKT(loop: Loop): string;

  /**
   * Converts multiple loops to WKT MULTIPOLYGON representation
   * @param loops - Array of loops to convert
   * @returns WKT string in format "MULTIPOLYGON (((x1 y1, ...)), ((x1 y1, ...)))" or "MULTIPOLYGON EMPTY"
   */
  static loopsToWKT(loops: Loop[]): string;

  /**
   * Converts a polygon to WKT coordinate parameter string (including outer ring and holes)
   * @param polygon - The polygon to convert
   * @returns WKT coordinate parameters or "EMPTY" if outer boundary is empty
   */
  static polygonToWKTParams(polygon: Polygon): string;

  /**
   * Converts a polygon to WKT POLYGON representation
   * @param polygon - The polygon to convert (with outer boundary and optional holes)
   * @returns WKT string in format "POLYGON ((outer), (hole1), (hole2), ...)" or "POLYGON EMPTY"
   */
  static polygonToWKT(polygon: Polygon): string;

  /**
   * Converts multiple boxes to WKT MULTIPOLYGON representation
   * @param boxes - Array of bounding boxes to convert
   * @returns WKT string in format "MULTIPOLYGON (((box1)), ((box2)), ...)" or "MULTIPOLYGON EMPTY"
   */
  static boxesToMultiPolygonWKT(boxes: Box2[]): string;

  /**
   * Converts multiple outer loops to WKT GEOMETRYCOLLECTION representation
   * @param outers - Array of outer boundary loops to convert
   * @returns WKT string in format "GEOMETRYCOLLECTION (POLYGON (...), POLYGON (...), ...)" or "GEOMETRYCOLLECTION EMPTY"
   */
  static outersToGeometryCollectionWKT(outers: Loop[]): string;

  /**
   * Converts multiple points to WKT GEOMETRYCOLLECTION representation
   * @param points - Array of points to convert
   * @returns WKT string in format "GEOMETRYCOLLECTION (POINT (...), POINT (...), ...)" or "GEOMETRYCOLLECTION EMPTY"
   */
  static pointsToGeometryCollectionWKT(points: Point[]): string;

  /**
   * Converts multiple points to WKT MULTIPOINT representation
   * @param points - Array of points to convert
   * @returns WKT string in format "MULTIPOINT (x1 y1, x2 y2, ...)" or "MULTIPOINT EMPTY"
   */
  static pointsToMultiPointWKT(points: Point[]): string;

  /**
   * Combines multiple WKT POLYGON strings into a single WKT MULTIPOLYGON
   * @param polygonWKTs - Array of WKT POLYGON strings
   * @returns WKT string in format "MULTIPOLYGON ((poly1), (poly2), ...)" or "MULTIPOLYGON EMPTY"
   */
  static polygonWKTsToMultiPolygon(polygonWKTs: string[]): string;
}