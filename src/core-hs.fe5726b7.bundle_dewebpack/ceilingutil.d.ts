/**
 * Ceiling utility for handling split ceiling operations and geometry calculations
 */

/**
 * Polygon point coordinates
 */
type Point = [number, number] | [number, number, number];

/**
 * Polygon represented as an array of points
 */
type Polygon = Point[];

/**
 * Ceiling divide information containing polygon paths
 */
type DivideInfo = Polygon[];

/**
 * Face path geometry data
 */
type FacePath = Polygon;

/**
 * Ceiling face interface
 */
interface ICeilingFace {
  /** Unique identifier for the ceiling face */
  id: string;
  /** Outer loop of the face */
  outerLoop: unknown;
  /** Indicates if this is a split ceiling */
  isSplitCeiling: boolean;
  /** Gets the outer loop polygon points */
  getOuterLoopPolygon(): Polygon | null;
}

/**
 * Ceiling element interface extending face
 */
interface ICeiling extends ICeilingFace {
  /** Parent slab master element */
  getMaster(): ISlab | null;
  /** Divide information for split ceilings */
  divideInfo?: DivideInfo;
}

/**
 * Slab element interface
 */
interface ISlab {
  /**
   * Gets faces of the specified type
   * @param faceType - Type of face (e.g., bottom, top)
   * @returns Record of faces indexed by ID
   */
  getFaces(faceType: number): Record<string, ICeilingFace>;
}

/**
 * Geometry provider interface
 */
interface IGeometryProvider {
  /**
   * Gets the face path geometry
   * @param face - Ceiling face element
   * @returns Array of polygon points representing the face path
   */
  getFacePath(face: ICeilingFace): FacePath;
}

/**
 * Geometry object wrapper
 */
interface IGeometryObject {
  /** Geometry provider for path calculations */
  provider: IGeometryProvider;
}

/**
 * Geometry manager interface
 */
interface IGeometryManager {
  /**
   * Gets geometry object without triggering updates
   * @param id - Element ID
   * @returns Geometry object or null if not found
   */
  getGeometryObjectWithoutUpdate(id: string): IGeometryObject | null;
}

/**
 * Document manager interface
 */
interface IDocManager {
  /** Geometry manager instance */
  geometryManager: IGeometryManager;
}

/**
 * Utility class for ceiling split operations and geometry calculations
 */
export declare class CeilingUtil {
  /**
   * Gets all split ceiling faces that are contained within the parent ceiling's outer loop
   * @param parentCeiling - Parent ceiling element
   * @param slab - Slab containing the split ceilings
   * @returns Array of split ceiling faces that are within the parent ceiling bounds
   */
  static getSplitCeilings(
    parentCeiling: ICeiling,
    slab: ISlab
  ): ICeilingFace[];

  /**
   * Dumps ceiling divide information by collecting split ceiling polygons
   * Modifies the parent ceiling's divideInfo property with polygon data
   * @param parentCeiling - Parent ceiling to update with divide info
   * @param slab - Slab containing split ceilings
   */
  static dumpCeilingDivideInfo(
    parentCeiling: ICeiling | null,
    slab: ISlab | null
  ): void;

  /**
   * Gets all divided ceiling paths from the parent ceiling's master slab
   * @param ceiling - Ceiling element to extract divided paths from
   * @returns Array of face paths for all split ceilings in the slab
   */
  static getDividedCeilingPath(ceiling: ICeiling | null): FacePath[];

  /**
   * Gets the inner path geometry for a ceiling face
   * @param face - Ceiling face to extract path from
   * @returns Polygon representing the face's inner path, or empty array if unavailable
   */
  static getFaceInnerPath(face: ICeilingFace | null): FacePath;
}

/**
 * Global HSCore namespace declarations
 */
declare global {
  namespace HSCore {
    namespace Model {
      /** Enum for slab face types */
      enum SlabFaceType {
        bottom = 0,
        top = 1
      }
    }

    namespace Util {
      namespace Math {
        /**
         * Checks if a point is inside a polygon
         * @param point - Point coordinates to test
         * @param polygon - Polygon boundary
         * @param includeEdge - Whether to include points on the edge
         * @returns True if point is inside the polygon
         */
        function isPointInPolygon(
          point: Point,
          polygon: Polygon,
          includeEdge: boolean
        ): boolean;
      }

      namespace Loop {
        /**
         * Extracts points from a loop object
         * @param loop - Loop object
         * @returns Array of points representing the loop
         */
        function getLoopPoints(loop: unknown): Polygon;
      }
    }

    namespace Doc {
      /**
       * Gets the document manager singleton
       * @returns Document manager instance
       */
      function getDocManager(): IDocManager;
    }
  }
}