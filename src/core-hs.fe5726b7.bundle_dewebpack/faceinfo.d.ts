/**
 * Represents information about a face in a 3D geometry structure.
 * A face typically consists of an outer boundary path and optional inner holes,
 * associated with a geometric surface.
 */
export interface FaceInfo {
  /**
   * Gets the previous face in a linked structure.
   * @returns The previous FaceInfo instance or undefined if none exists.
   */
  readonly prev: FaceInfo | undefined;

  /**
   * Gets the next face in a linked structure.
   * @returns The next FaceInfo instance or undefined if none exists.
   */
  readonly next: FaceInfo | undefined;

  /**
   * Gets the basic information about the face including paths and surface data.
   * @returns An object containing the face's geometric properties.
   */
  readonly baseInfo: FaceBaseInfo;
}

/**
 * Basic geometric information for a face.
 */
export interface FaceBaseInfo {
  /**
   * The outer boundary path defining the face's perimeter.
   */
  outerPath: unknown;

  /**
   * Array of inner paths representing holes within the face.
   */
  innerPaths: unknown[];

  /**
   * The geometric surface associated with this face.
   */
  surface: unknown;

  /**
   * Indicates whether the face orientation matches the surface normal direction.
   */
  sameDirWithSurface: boolean;
}

/**
 * Internal face data structure (typically from a CAD kernel or geometry engine).
 */
export interface Face {
  /**
   * Raw path data containing outer boundary and holes.
   */
  rawPath: {
    outer: unknown;
    holes: unknown[];
  };

  /**
   * Surface object with geometric and orientation information.
   */
  surfaceObj: {
    surface: unknown;
    sameDirWithSurface: boolean;
  };
}

/**
 * Constructor signature for FaceInfo class.
 */
export interface FaceInfoConstructor {
  /**
   * Creates a new FaceInfo instance wrapping a face object.
   * @param face - The underlying face data structure to wrap.
   */
  new (face: Face): FaceInfo;
}

export declare const FaceInfo: FaceInfoConstructor;