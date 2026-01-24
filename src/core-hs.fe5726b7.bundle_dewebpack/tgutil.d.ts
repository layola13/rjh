/**
 * Utility class for topology geometry operations
 * Handles face traversal, curve conversion, path clipping, and polygon operations
 */
export declare class TgUtil {
  /**
   * Get the previous wall face in the structure's face sequence
   * @param face - Target face to find predecessor for
   * @param structure - Structure containing face information
   * @returns Previous face in the sequence, or undefined if not found
   */
  static getPrevWallFace(
    face: unknown,
    structure: {
      structureFaceInfos:
        | Array<{ face: unknown }>
        | {
            outer: Array<{ face: unknown }>;
            holes: Array<Array<{ face: unknown }>>;
          };
    }
  ): unknown | undefined;

  /**
   * Get the next wall face in the structure's face sequence
   * @param face - Target face to find successor for
   * @param structure - Structure containing face information
   * @returns Next face in the sequence, or undefined if not found
   */
  static getNextWallFace(
    face: unknown,
    structure: {
      structureFaceInfos:
        | Array<{ face: unknown }>
        | {
            outer: Array<{ face: unknown }>;
            holes: Array<Array<{ face: unknown }>>;
          };
    }
  ): unknown | undefined;

  /**
   * Extract 2D path representation from a BREP face
   * @param face - BREP face to extract path from
   * @returns 2D polygon with outer boundary and holes
   */
  static getBrepFacePath2d(face: unknown): IPolygon2d;

  /**
   * Convert array of 3D curves to 2D curves via XOY plane projection
   * @param curves - Array of 3D curves
   * @returns Array of projected 2D curves
   */
  static convert3dCurvesTo2dCurves(curves: unknown[]): unknown[];

  /**
   * Convert single 3D curve to 2D curve via XOY plane projection
   * @param curve - 3D curve to project
   * @returns Projected 2D curve
   */
  static convert3dCurveTo2dCurve(curve: unknown): unknown;

  /**
   * Convert array of 2D curves to 3D curves at specified elevation
   * @param curves - Array of 2D curves
   * @param elevation - Z-coordinate for 3D curves
   * @returns Array of 3D curves
   */
  static convert2dCurvesTo3dCurves(curves: unknown[], elevation: number): unknown[];

  /**
   * Convert single 2D curve to 3D curve at specified elevation
   * @param curve - 2D curve to convert
   * @param elevation - Z-coordinate for 3D curve
   * @returns 3D curve
   */
  static convert2dCurveTo3dCurve(curve: unknown, elevation: number): unknown;

  /**
   * Convert 2D polygon to 3D polygon at specified elevation
   * @param polygon - 2D polygon with outer boundary and holes
   * @param elevation - Z-coordinate for 3D polygon
   * @param preserveDirection - Whether to preserve curve direction
   * @returns 3D polygon
   */
  static convert2dPolygonTo3dPolygon(
    polygon: IPolygon2d,
    elevation: number,
    preserveDirection?: boolean
  ): IPolygon3d;

  /**
   * Convert 3D polygon to 2D polygon via XOY plane projection
   * @param polygon - 3D polygon with outer boundary and holes
   * @param preserveDirection - Whether to preserve curve direction
   * @returns 2D polygon
   */
  static convert3dPolygonTo2dPolygon(
    polygon: IPolygon3d,
    preserveDirection?: boolean
  ): IPolygon2d;

  /**
   * Convert IPath to IPolygon by ensuring holes array exists
   * @param path - Path with outer boundary and optional holes
   * @returns Polygon with guaranteed holes array
   */
  static convertIpathToIPolygon(path: IPath): IPolygon;

  /**
   * Convert array of IPaths to IPolygons
   * @param paths - Array of paths
   * @returns Array of polygons
   */
  static convertIpathsToIPolygons(paths: IPath[]): IPolygon[];

  /**
   * Reverse path direction in-place (mutates input)
   * @param path - Path to reverse
   * @returns The mutated input path
   */
  static reversePath(path: IPolygon): IPolygon;

  /**
   * Create reversed copy of path (does not mutate input)
   * @param path - Path to reverse
   * @returns New reversed path
   */
  static reversedPath(path: IPolygon): IPolygon;

  /**
   * Perform boolean clipping operation on two sets of polygons
   * @param subjects - Subject polygons
   * @param clips - Clipping polygons
   * @param mode - Clipping mode (Union, Intersection, Difference, etc.)
   * @param fillRule - Fill rule for winding number calculation
   * @returns Result polygons after clipping
   */
  static clip(
    subjects: IPolygon[],
    clips: IPolygon[],
    mode: unknown,
    fillRule?: unknown
  ): IPolygon[];

  /**
   * Test if a curve intersects with a closed path
   * @param curve - Curve to test
   * @param path - Closed path (array of curves)
   * @returns True if curve intersects the path
   */
  static curvePathIntersect(curve: unknown, path: unknown[]): boolean;

  /**
   * Calculate bounding box center of multiple curves
   * @param curves - Array of curves
   * @returns Center point of union bounding box, or origin if empty
   */
  static getBBoxCenter(curves: unknown[]): unknown;

  /**
   * Extract base geometric information from a face
   * @param face - Face object (Face or geometric element)
   * @returns Face base information including paths and surface
   */
  static getFaceBaseInfo(face: unknown): {
    outerPath: unknown[];
    innerPaths: unknown[][];
    surface: unknown;
    sameDirWithSurface: boolean;
  };

  /**
   * Get original face information from legacy face structure
   * @param face - Face with rawPath and surfaceObj
   * @returns Old face information
   */
  static getOldFaceInfo(face: {
    rawPath: { outer: unknown[] };
    surfaceObj: unknown;
    material?: { clone: () => unknown };
  }): {
    outerPath: unknown[];
    surfaceObj: unknown;
    material?: unknown;
  };

  /**
   * Convert BREP face paths to 2D representation on surface
   * @param faceInfo - Face path information
   * @param surface - Surface for coordinate transformation
   * @returns 2D path with reversed flag
   */
  static getBrepFacePath(
    faceInfo: { outerPath: unknown[]; innerPaths: unknown[][] },
    surface: unknown
  ): {
    outer: unknown[];
    holes: unknown[][];
    reversed: boolean;
  };

  /**
   * Compute union of multiple face paths on same surface
   * @param faces - Array of faces to union
   * @returns Union result as single polygon with holes
   */
  static getUnionFacePath(
    faces: Array<{
      surfaceObj: unknown;
      rawPath: { outer: unknown[]; holes?: unknown[][] };
      holesPath: Array<{ outer: unknown[] }>;
    }>
  ): {
    outer: unknown[];
    holes: unknown[][];
  };

  /**
   * Check if any curves from two sets overlap
   * @param curvesA - First set of curves
   * @param curvesB - Second set of curves
   * @returns True if any pair overlaps
   */
  static isCurvesOverLap(curvesA: unknown[], curvesB: unknown[]): boolean;

  /**
   * Check if two paths overlap (have intersection area > threshold)
   * @param pathA - First path
   * @param pathB - Second path
   * @returns True if paths overlap
   */
  static isPathPathOverlap(pathA: IPolygon, pathB: IPolygon): boolean;

  /**
   * Simplify path by performing union operation with itself
   * @param path - Path to simplify
   * @returns Simplified paths
   */
  static simplifyPath(path: IPolygon): IPolygon[];

  /**
   * Immutably set a key-value pair in a map
   * @param map - Original map
   * @param key - Key to set
   * @param value - Value to set
   * @returns New map with updated entry
   */
  static setMap<K, V>(map: Map<K, V>, key: K, value: V): Map<K, V>;

  /**
   * Find curves on face that intersect a horizontal plane at given height
   * @param face - Face to test
   * @param elevation - Z-coordinate of horizontal plane
   * @returns Array of curves at the specified elevation
   */
  static getFaceHorizonPlaneIntersect(
    face: { wirePath: { outer: unknown[] } },
    elevation: number
  ): unknown[];

  /**
   * Compute slab face's linked structural faces based on geometric overlap
   * @param slabFace - Slab face to find links for
   * @param candidateFaces - Set of candidate structural faces
   * @returns Array of linked structural faces (also removes them from candidateFaces)
   */
  static computeSlabFaceLinkedStructFaces(
    slabFace: unknown,
    candidateFaces: Set<unknown>
  ): unknown[];
}

/**
 * 2D polygon with outer boundary and holes
 */
interface IPolygon2d {
  outer: unknown[];
  holes: unknown[][];
}

/**
 * 3D polygon with outer boundary and holes
 */
interface IPolygon3d {
  outer: unknown[];
  holes: unknown[][];
}

/**
 * Path with outer boundary and optional holes
 */
interface IPath {
  outer: unknown[];
  holes?: unknown[][];
}

/**
 * Polygon with guaranteed holes array
 */
interface IPolygon {
  outer: unknown[];
  holes: unknown[][];
}