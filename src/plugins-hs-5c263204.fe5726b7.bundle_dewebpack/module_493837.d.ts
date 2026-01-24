/**
 * Tube geometry utility class for calculating bounding information
 * Provides static methods to work with tube geometries in a 3D scene
 */
export default class TubeGeometryUtil {
  /**
   * Get boundary points of a tube geometry
   * Extracts all bounding box points from the tube's geometry objects
   * 
   * @param context - The application context containing the document
   * @param tube - The tube entity to extract boundary points from
   * @returns Array of 3D points representing the bounding vertices, empty array if geometry not found
   */
  static getTubeBoundPoints(
    context: { document: { geometryManager: { getGeometryObject(id: string): GeometryObject | null } } },
    tube: { id: string }
  ): Point3D[];

  /**
   * Get the complete bounding box of a tube
   * Calculates the axis-aligned bounding box encompassing all tube geometry
   * 
   * @param context - The application context containing the document
   * @param tube - The tube entity to calculate bounding box for
   * @returns Bounding box containing min/max coordinates and square projection
   */
  static getTubeBoundBox(
    context: { document: { geometryManager: { getGeometryObject(id: string): GeometryObject | null } } },
    tube: { id: string }
  ): BoundingBox | null;

  /**
   * Get the 2D outline of a tube's bounding box
   * Returns the four corner points of the tube's square projection
   * 
   * @param context - The application context containing the document
   * @param tube - The tube entity to get outline for
   * @returns Array of 4 corner points in clockwise order (bottom-left, bottom-right, top-right, top-left), empty if no square
   */
  static getTubeOutline(
    context: { document: { geometryManager: { getGeometryObject(id: string): GeometryObject | null } } },
    tube: { id: string }
  ): Point2D[];

  /**
   * Determine the primary axis direction of a tube
   * Analyzes the tube's route direction to find which axis it's primarily aligned with
   * 
   * @param tube - The tube entity with route information
   * @returns Object indicating which axes the tube is NOT primarily aligned with (true = perpendicular, false = aligned)
   */
  static getTubeAxisDir(tube: { route: Array<{ getDirection?: () => Vector3D }> }): AxisAlignment | undefined;
}

/**
 * 3D point in space
 */
interface Point3D {
  /** X coordinate in meters */
  x: number;
  /** Y coordinate in meters */
  y: number;
  /** Z coordinate in meters */
  z: number;
}

/**
 * 2D point in plane
 */
interface Point2D {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * 3D vector representing direction
 */
interface Vector3D {
  /** X component */
  x: number;
  /** Y component */
  y: number;
  /** Z component */
  z: number;
}

/**
 * Geometry object containing tube geometry data
 */
interface GeometryObject {
  geometry: {
    /** Array of geometry objects with bounding information */
    objects: Array<{
      /** Bounding box as [minX, minY, minZ, maxX, maxY, maxZ] in centimeters */
      bounding: [number, number, number, number, number, number];
    }>;
  };
}

/**
 * Bounding box with 3D and 2D projection information
 */
interface BoundingBox {
  /** 2D square projection of the bounding box */
  square?: {
    /** Minimum X coordinate */
    minX: number;
    /** Maximum X coordinate */
    maxX: number;
    /** Minimum Y coordinate */
    minY: number;
    /** Maximum Y coordinate */
    maxY: number;
  };
}

/**
 * Axis alignment flags indicating perpendicular axes
 */
interface AxisAlignment {
  /** True if tube is perpendicular to X axis (aligned with Y or Z) */
  axisX: boolean;
  /** True if tube is perpendicular to Y axis (aligned with X or Z) */
  axisY: boolean;
  /** True if tube is perpendicular to Z axis (aligned with X or Y) */
  axisZ: boolean;
}