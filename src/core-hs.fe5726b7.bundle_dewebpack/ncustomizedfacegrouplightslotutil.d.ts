/**
 * Utility class for handling customized face group light slot operations.
 * Provides methods to split light slot face groups and reset their background properties.
 */
export declare class NCustomizedFaceGroupLightSlotUtil {
  /**
   * Splits light slot face groups by resetting the original background for each face group item.
   * @param entities - Array of entities containing face materials with light slot configurations
   */
  static splitLightSlotFaceGroups(entities: EntityWithFaceMaterials[]): void;

  /**
   * Retrieves all unique face group items from the provided entities.
   * Filters entities that have mixpaint with face group IDs and returns deduplicated face items.
   * @param entities - Array of entities to extract face group items from
   * @returns Array of unique face group items with entity and face type information
   */
  static getFaceGroupItems(entities: EntityWithFaceMaterials[]): FaceGroupItem[];

  /**
   * Resets the original background from a face group by cloning the material,
   * applying transformations, and updating the background polygon.
   * @param faceGroupItem - The face group item containing entity and face type to reset
   * @private
   */
  private static _resetOrginBackgroundFromFaceGroup(
    faceGroupItem: FaceGroupItem
  ): void;
}

/**
 * Represents an entity with face materials that may contain mixpaint configurations.
 */
export interface EntityWithFaceMaterials {
  /** Collection of face materials associated with the entity */
  faceMaterials: Map<FaceTag, FaceMaterial> | FaceMaterial[];

  /**
   * Retrieves the mesh key corresponding to a face tag.
   * @param faceTag - The face tag identifier
   * @returns The face type key
   */
  getMeshKeyByFaceTag(faceTag: FaceTag): FaceType;

  /**
   * Gets the face material for a specific face type.
   * @param faceType - The type of face to retrieve material for
   * @returns The face material or undefined if not found
   */
  getFaceMaterial(faceType: FaceType): FaceMaterial | undefined;

  /**
   * Sets the face material for a specific face type.
   * @param faceType - The type of face to set material for
   * @param material - The material to apply
   */
  setFaceMaterial(faceType: FaceType, material: FaceMaterial): void;
}

/**
 * Represents a face material with optional mixpaint configuration.
 */
export interface FaceMaterial {
  /** Optional mixpaint configuration containing face group information */
  mixpaint?: Mixpaint;

  /**
   * Creates a deep clone of the face material.
   * @returns A new instance of the face material
   */
  clone(): FaceMaterial;
}

/**
 * Mixpaint configuration for face materials with background and transformation properties.
 */
export interface Mixpaint {
  /** Face group configuration */
  faceGroup: FaceGroup;

  /** The entity this mixpaint belongs to */
  faceEntity?: EntityWithFaceMaterials;

  /** The face identifier */
  faceId?: FaceType;

  /**
   * Updates the background polygon with the provided curve path.
   * @param curvePath - The curve path defining the background polygon
   */
  updateBackgroundPolygon(curvePath: CurvePath): void;

  /**
   * Applies a transformation matrix to the mixpaint.
   * @param matrix - The THREE.js 3x3 transformation matrix
   */
  transform(matrix: THREE.Matrix3): void;
}

/**
 * Represents a face group with an identifier and clearing capability.
 */
export interface FaceGroup {
  /** Unique identifier for the face group */
  faceGroupId?: string | number;

  /**
   * Clears the face group configuration.
   */
  clear(): void;
}

/**
 * Represents a face group item containing entity and face type references.
 */
export interface FaceGroupItem {
  /** The entity containing the face */
  entity: EntityWithFaceMaterials;

  /** The type identifier of the face */
  faceType: FaceType;
}

/**
 * Represents a curve path with outer boundary and optional holes.
 */
export interface CurvePath {
  /** Outer boundary curve segments */
  outer: CurveSegment[];

  /** Optional array of hole curves */
  holes?: CurveSegment[][];
}

/**
 * Represents a curve segment that can be transformed.
 */
export interface CurveSegment {
  /**
   * Applies a transformation matrix to the curve segment.
   * @param matrix - The transformation matrix to apply
   */
  transform(matrix: Matrix3): void;
}

/**
 * Represents a 3x3 transformation matrix.
 */
export interface Matrix3 {
  /**
   * Checks if the matrix is an identity matrix.
   * @returns True if the matrix represents no transformation
   */
  isIdentity(): boolean;

  /**
   * Computes the inverse of the matrix.
   * @returns The inversed matrix or null if non-invertible
   */
  inversed(): Matrix3 | null;

  /**
   * Converts the matrix to a flat array representation.
   * @returns Array of 9 numbers representing the matrix elements
   */
  toArray(): number[];
}

/**
 * Type alias for face tag identifiers (indices or keys in face materials collection).
 */
export type FaceTag = number | string;

/**
 * Type alias for face type identifiers (mesh keys).
 */
export type FaceType = string;