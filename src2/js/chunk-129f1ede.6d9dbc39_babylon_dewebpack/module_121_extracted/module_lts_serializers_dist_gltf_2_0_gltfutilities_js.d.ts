import { Vector3 } from '@babylonjs/core/Maths/math.vector';

/**
 * glTF buffer view structure
 * Represents a view into a buffer, defining a subset of the buffer data
 */
export interface IGLTFBufferView {
  /** The index of the buffer */
  buffer: number;
  /** The length of the bufferView in bytes */
  byteLength: number;
  /** The offset into the buffer in bytes (optional) */
  byteOffset?: number;
  /** The stride, in bytes, between vertex attributes (optional) */
  byteStride?: number;
  /** The user-defined name of this object (optional) */
  name?: string;
}

/**
 * glTF accessor structure
 * Defines how to access data within a buffer view
 */
export interface IGLTFAccessor {
  /** The user-defined name of this object */
  name: string;
  /** The index of the bufferView */
  bufferView: number;
  /** The datatype of components in the attribute */
  componentType: number;
  /** The number of attributes referenced by this accessor */
  count: number;
  /** Specifies if the attribute is a scalar, vector, or matrix */
  type: string;
  /** Minimum value of each component in this attribute (optional) */
  min?: number[];
  /** Maximum value of each component in this attribute (optional) */
  max?: number[];
  /** The offset relative to the start of the bufferView in bytes (optional) */
  byteOffset?: number;
}

/**
 * Min/Max position bounds
 */
export interface IMinMax {
  /** Minimum values [x, y, z] */
  min: number[];
  /** Maximum values [x, y, z] */
  max: number[];
}

/**
 * glTF accessor data element type
 */
export type AccessorType = 'SCALAR' | 'VEC2' | 'VEC3' | 'VEC4' | 'MAT2' | 'MAT3' | 'MAT4';

/**
 * Utility class for glTF 2.0 serialization operations
 * Provides helper methods for creating glTF structures and coordinate system conversions
 */
export declare class _GLTFUtilities {
  /**
   * Creates a glTF buffer view
   * @param bufferIndex - Index of the buffer
   * @param byteOffset - The offset into the buffer in bytes
   * @param byteLength - The length of the bufferView in bytes
   * @param byteStride - The stride, in bytes, between vertex attributes
   * @param name - The user-defined name of this object
   * @returns The created buffer view
   */
  static _CreateBufferView(
    bufferIndex: number,
    byteOffset: number,
    byteLength: number,
    byteStride?: number,
    name?: string
  ): IGLTFBufferView;

  /**
   * Creates a glTF accessor
   * @param bufferViewIndex - The index of the bufferView
   * @param name - The user-defined name of this object
   * @param type - Specifies if the attribute is a scalar, vector, or matrix
   * @param componentType - The datatype of components in the attribute
   * @param count - The number of attributes referenced by this accessor
   * @param byteOffset - The offset relative to the start of the bufferView in bytes
   * @param min - Minimum value of each component in this attribute
   * @param max - Maximum value of each component in this attribute
   * @returns The created accessor
   */
  static _CreateAccessor(
    bufferViewIndex: number,
    name: string,
    type: AccessorType,
    componentType: number,
    count: number,
    byteOffset?: number | null,
    min?: number[] | null,
    max?: number[] | null
  ): IGLTFAccessor;

  /**
   * Calculates the minimum and maximum values of an array of position floats
   * @param positions - The position array to calculate bounds for
   * @param vertexStart - Starting vertex offset in the positions array
   * @param vertexCount - Number of vertices to process
   * @param convertToRightHanded - Convert the positions from left-handed to right-handed system
   * @returns Object containing min and max position values
   */
  static _CalculateMinMaxPositions(
    positions: number[],
    vertexStart: number,
    vertexCount: number,
    convertToRightHanded?: boolean
  ): IMinMax;

  /**
   * Converts a left-handed position Vector3 to right-handed
   * @param position - The position vector to convert
   * @returns A new right-handed position vector
   */
  static _GetRightHandedPositionVector3(position: Vector3): Vector3;

  /**
   * Converts a left-handed position Vector3 to right-handed in place
   * @param position - The position vector to convert (modified in place)
   */
  static _GetRightHandedPositionVector3FromRef(position: Vector3): void;

  /**
   * Converts a left-handed position array to right-handed in place
   * @param positionArray - The position array [x, y, z] to convert (modified in place)
   */
  static _GetRightHandedPositionArray3FromRef(positionArray: number[]): void;

  /**
   * Converts a left-handed normal Vector3 to right-handed
   * @param normal - The normal vector to convert
   * @returns A new right-handed normal vector
   */
  static _GetRightHandedNormalVector3(normal: Vector3): Vector3;

  /**
   * Converts a left-handed normal Vector3 to right-handed in place
   * @param normal - The normal vector to convert (modified in place)
   */
  static _GetRightHandedNormalVector3FromRef(normal: Vector3): void;

  /**
   * Converts a left-handed normal array to right-handed in place
   * @param normalArray - The normal array [x, y, z] to convert (modified in place)
   */
  static _GetRightHandedNormalArray3FromRef(normalArray: number[]): void;

  /**
   * Converts a left-handed Vector4 to right-handed in place
   * @param vector4 - The vector4 to convert (modified in place)
   */
  static _GetRightHandedVector4FromRef(vector4: { x: number; y: number; z: number; w: number }): void;

  /**
   * Converts a left-handed array4 to right-handed in place
   * @param array4 - The array [x, y, z, w] to convert (modified in place)
   */
  static _GetRightHandedArray4FromRef(array4: number[]): void;

  /**
   * Converts a left-handed quaternion to right-handed in place
   * @param quaternion - The quaternion to convert (modified in place)
   */
  static _GetRightHandedQuaternionFromRef(quaternion: { x: number; y: number; z: number; w: number }): void;

  /**
   * Converts a left-handed quaternion array to right-handed in place
   * @param quaternionArray - The quaternion array [x, y, z, w] to convert (modified in place)
   */
  static _GetRightHandedQuaternionArrayFromRef(quaternionArray: number[]): void;

  /**
   * Normalizes a tangent vector in place
   * @param tangent - The tangent vector to normalize (modified in place)
   */
  static _NormalizeTangentFromRef(tangent: { x: number; y: number; z: number; w: number }): void;

  /**
   * Gets the number of components for a given accessor type
   * @param accessorType - The accessor type (SCALAR, VEC2, VEC3, VEC4, MAT2, MAT3, MAT4)
   * @returns The number of components
   */
  static _GetDataAccessorElementCount(accessorType: AccessorType): number;
}