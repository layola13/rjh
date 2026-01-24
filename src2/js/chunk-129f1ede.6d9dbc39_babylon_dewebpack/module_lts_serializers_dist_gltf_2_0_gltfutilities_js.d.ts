import type { Vector3, Vector4, Quaternion } from '@babylonjs/core/Maths/math.vector';

/**
 * glTF accessor type enumeration
 * Defines the number of components for accessor data types
 */
export type AccessorType = 'SCALAR' | 'VEC2' | 'VEC3' | 'VEC4' | 'MAT2' | 'MAT3' | 'MAT4';

/**
 * glTF component type enumeration
 * WebGL constant values for data types
 */
export type AccessorComponentType = 
  | 5120 // BYTE
  | 5121 // UNSIGNED_BYTE
  | 5122 // SHORT
  | 5123 // UNSIGNED_SHORT
  | 5125 // UNSIGNED_INT
  | 5126; // FLOAT

/**
 * glTF buffer view structure
 * Describes a view into a buffer generally representing a subset of the buffer
 */
export interface IBufferView {
  /** The index of the buffer */
  buffer: number;
  /** The offset into the buffer in bytes */
  byteOffset?: number;
  /** The total byte length of the buffer view */
  byteLength: number;
  /** The stride, in bytes, between vertex attributes */
  byteStride?: number;
  /** The user-defined name of this object */
  name?: string;
}

/**
 * glTF accessor structure
 * A typed view into a bufferView
 */
export interface IAccessor {
  /** The user-defined name of this object */
  name?: string;
  /** The index of the bufferView */
  bufferView: number;
  /** The offset relative to the start of the bufferView in bytes */
  byteOffset?: number;
  /** The datatype of components in the attribute */
  componentType: AccessorComponentType;
  /** The number of attributes referenced by this accessor */
  count: number;
  /** Specifies if the attribute is a scalar, vector, or matrix */
  type: AccessorType;
  /** Minimum value of each component in this attribute */
  min?: number[];
  /** Maximum value of each component in this attribute */
  max?: number[];
}

/**
 * Min/Max position bounds
 */
export interface IMinMax {
  /** Minimum [x, y, z] values */
  min: number[];
  /** Maximum [x, y, z] values */
  max: number[];
}

/**
 * Utility class for glTF serialization operations
 * Provides helper methods for creating glTF structures and coordinate system conversions
 */
export declare class _GLTFUtilities {
  /**
   * Creates a buffer view definition
   * @param bufferIndex - The index of the buffer
   * @param byteOffset - The offset into the buffer in bytes
   * @param byteLength - The length of the bufferView in bytes
   * @param byteStride - The stride in bytes between vertex attributes or other interleavable data
   * @param name - The name of the buffer view
   * @returns A glTF buffer view object
   */
  static _CreateBufferView(
    bufferIndex: number,
    byteOffset: number,
    byteLength: number,
    byteStride?: number,
    name?: string
  ): IBufferView;

  /**
   * Creates an accessor definition
   * @param bufferViewIndex - The index of the bufferView
   * @param name - The name of the accessor
   * @param type - The type of the accessor (SCALAR, VEC2, VEC3, VEC4, MAT2, MAT3, MAT4)
   * @param componentType - The component type (5120-5126, WebGL constants)
   * @param count - The number of elements referenced by this accessor
   * @param byteOffset - The offset relative to the start of the bufferView in bytes
   * @param min - Minimum value of each component in this attribute
   * @param max - Maximum value of each component in this attribute
   * @returns A glTF accessor object
   */
  static _CreateAccessor(
    bufferViewIndex: number,
    name: string,
    type: AccessorType,
    componentType: AccessorComponentType,
    count: number,
    byteOffset?: number | null,
    min?: number[] | null,
    max?: number[] | null
  ): IAccessor;

  /**
   * Calculates the minimum and maximum values of an array of position floats
   * @param positions - The position float array
   * @param vertexStart - The starting vertex offset
   * @param vertexCount - The number of vertices to process
   * @param convertToRightHanded - Whether to convert the positions to right-handed coordinate system
   * @returns Object containing min and max position arrays
   */
  static _CalculateMinMaxPositions(
    positions: FloatArray,
    vertexStart: number,
    vertexCount: number,
    convertToRightHanded?: boolean
  ): IMinMax;

  /**
   * Converts a left-handed position Vector3 to right-handed
   * @param position - The position vector to convert
   * @returns A new Vector3 with right-handed coordinates
   */
  static _GetRightHandedPositionVector3(position: Vector3): Vector3;

  /**
   * Converts a left-handed position Vector3 to right-handed in place
   * @param position - The position vector to convert (modified in place)
   */
  static _GetRightHandedPositionVector3FromRef(position: Vector3): void;

  /**
   * Converts a left-handed position array to right-handed in place
   * @param positionArray - The position array [x, y, z] (modified in place)
   */
  static _GetRightHandedPositionArray3FromRef(positionArray: number[]): void;

  /**
   * Converts a left-handed normal Vector3 to right-handed
   * @param normal - The normal vector to convert
   * @returns A new Vector3 with right-handed coordinates
   */
  static _GetRightHandedNormalVector3(normal: Vector3): Vector3;

  /**
   * Converts a left-handed normal Vector3 to right-handed in place
   * @param normal - The normal vector to convert (modified in place)
   */
  static _GetRightHandedNormalVector3FromRef(normal: Vector3): void;

  /**
   * Converts a left-handed normal array to right-handed in place
   * @param normalArray - The normal array [x, y, z] (modified in place)
   */
  static _GetRightHandedNormalArray3FromRef(normalArray: number[]): void;

  /**
   * Converts a left-handed Vector4 to right-handed in place
   * @param vector - The Vector4 to convert (modified in place)
   */
  static _GetRightHandedVector4FromRef(vector: Vector4): void;

  /**
   * Converts a left-handed 4-component array to right-handed in place
   * @param array - The array [x, y, z, w] (modified in place)
   */
  static _GetRightHandedArray4FromRef(array: number[]): void;

  /**
   * Converts a left-handed quaternion to right-handed in place
   * @param quaternion - The quaternion to convert (modified in place)
   */
  static _GetRightHandedQuaternionFromRef(quaternion: Quaternion): void;

  /**
   * Converts a left-handed quaternion array to right-handed in place
   * @param quaternionArray - The quaternion array [x, y, z, w] (modified in place)
   */
  static _GetRightHandedQuaternionArrayFromRef(quaternionArray: number[]): void;

  /**
   * Normalizes a tangent vector in place
   * @param tangent - The tangent vector to normalize (modified in place)
   */
  static _NormalizeTangentFromRef(tangent: Vector3 | Vector4): void;

  /**
   * Returns the number of components for a given accessor type
   * @param accessorType - The accessor type (SCALAR, VEC2, VEC3, VEC4, MAT2, MAT3, MAT4)
   * @returns The number of components (1-16)
   */
  static _GetDataAccessorElementCount(accessorType: AccessorType): number;
}