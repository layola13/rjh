import { Matrix4, Euler, Vector3, Quaternion, Math as ThreeMath } from 'three';

/**
 * Converts a rotation value from degrees to radians
 * @param entity - Entity containing rotation properties
 * @param rotationKey - The rotation property key (e.g., "XRotation", "YRotation", "ZRotation")
 * @returns Rotation value in radians
 */
declare function getRotationInRadians(entity: any, rotationKey: string): number;

/**
 * Shared Euler instance for rotation calculations (XYZ order)
 */
declare const sharedEuler: Euler;

/**
 * Rotation and transformation data for an entity
 */
interface EntityMatrixData {
  /** Position vector */
  pos: Vector3;
  /** Rotation quaternion */
  quat: Quaternion;
  /** Scale vector */
  scal: Vector3;
  /** Euler rotation angles in degrees */
  euler: {
    x: number;
    y: number;
    z: number;
  };
}

/**
 * Euler angles in degrees
 */
interface EulerAngles {
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

/**
 * Animation rotation information
 */
interface AnimationRotation {
  /** Rotation anchor point */
  anchor: [number, number, number];
  /** Rotation axis direction */
  anchorAxis: [number, number, number];
  /** Rotation angle in degrees */
  angle: number;
}

/**
 * Animation translation information
 */
type AnimationTranslation = [number, number, number];

/**
 * Entity with animation properties
 */
interface AnimatableEntity {
  anchor?: [number, number, number];
  anchorAxis?: [number, number, number];
  angle?: number;
  translation?: AnimationTranslation;
  rotation?: AnimationRotation;
  animationMatrix4?: Matrix4;
  followParentAnimation?: boolean;
  parent?: any;
}

/**
 * Utility for handling 3D matrix transformations for entities
 */
export declare const Matrix3DHandler: {
  /**
   * Calculates the local transformation matrix for an entity
   * @param entity - The entity to calculate matrix for
   * @param applyFlip - Whether to apply horizontal flip transformation
   * @returns 4x4 transformation matrix
   */
  getMatrix4(entity: any, applyFlip?: boolean): Matrix4;

  /**
   * Gets the transformation matrix with animation applied
   * @param entity - The entity to calculate matrix for
   * @param applyFlip - Whether to apply horizontal flip transformation
   * @returns 4x4 transformation matrix with animation
   */
  getMatrix4WithAnimationMat(entity: any, applyFlip?: boolean): Matrix4;

  /**
   * Calculates the global (world) transformation matrix for an entity
   * @param entity - The entity to calculate global matrix for
   * @param applyFlip - Whether to apply horizontal flip transformation
   * @returns 4x4 global transformation matrix
   */
  getGlobalMatrix4(entity: any, applyFlip?: boolean): Matrix4;

  /**
   * Calculates global matrix excluding the entity's own animation
   * @param entity - The entity to calculate matrix for
   * @param applyFlip - Whether to apply horizontal flip transformation
   * @returns 4x4 global transformation matrix without self animation
   */
  getGlobalMatrix4WithoutSelfAnimationMat(entity: any, applyFlip?: boolean): Matrix4;

  /**
   * Gets the last animation matrix for an entity
   * @param entity - The entity to get animation matrix for
   * @returns Animation matrix or undefined if no animation
   */
  getAnimationLastMatrix4(entity: AnimatableEntity): Matrix4 | undefined;

  /**
   * Gets the inverse of parent's animation matrix if needed
   * @param entity - The entity to check
   * @returns Inverse animation matrix or undefined
   */
  getInverseAnimationMatrix4(entity: AnimatableEntity): Matrix4 | undefined;

  /**
   * Creates animation matrix from rotation and translation info
   * @param animationInfo - Animation information object
   * @returns Combined animation transformation matrix
   */
  getAnimationInfoMatrix(animationInfo: {
    rotation?: AnimationRotation;
    translation?: AnimationTranslation;
  }): Matrix4;

  /**
   * Calculates animation matrix from entity's anchor, axis, angle, and translation
   * @param entity - Entity with animation properties
   * @returns Animation transformation matrix
   */
  getAnimationMatrix4(entity: AnimatableEntity): Matrix4;

  /**
   * Builds the path from entity to root parent
   * @param entity - Starting entity
   * @returns Array of entities from child to root
   */
  entityToRootPath(entity: any): any[];

  /**
   * Converts a quaternion to Euler angles in degrees
   * @param quaternion - Quaternion to convert
   * @returns Euler angles in degrees
   */
  convertQuaternion2euler(quaternion: Quaternion): EulerAngles;

  /**
   * Decomposes entity's global matrix into position, rotation, and scale
   * @param entity - The entity to analyze
   * @param applyFlip - Whether to apply horizontal flip transformation
   * @returns Decomposed matrix data
   */
  getEntityMatrixData(entity: any, applyFlip?: boolean): EntityMatrixData;

  /**
   * Gets the rotation matrix of the top-level assembly containing the content
   * @param entity - The entity to start from
   * @param applyFlip - Whether to apply horizontal flip transformation
   * @returns Rotation matrix of parent assembly
   */
  getContentTopPAssemblyGlobalRotationMatrix4(entity: any, applyFlip?: boolean): Matrix4;

  /**
   * Gets the rotation matrix of the PContent parent
   * @param entity - The entity to find PContent parent for
   * @param applyFlip - Whether to apply horizontal flip transformation
   * @returns Rotation matrix of PContent
   */
  getPContentRotationMatrix4(entity: any, applyFlip?: boolean): Matrix4;

  /**
   * Checks if a 3x3 matrix is an identity matrix
   * @param matrix - Matrix to check (Matrix3 or array of elements)
   * @returns True if identity matrix or invalid, false otherwise
   */
  isIdentityMat3(matrix?: { elements?: number[] } | number[]): boolean;

  /**
   * Calculates the relative transformation matrix from entity A to entity B
   * @param entityA - Source entity
   * @param entityB - Target entity (reference frame)
   * @returns Transformation matrix from A's space to B's space
   */
  getEntityA2BMatrix(entityA: any, entityB: any): Matrix4;
};