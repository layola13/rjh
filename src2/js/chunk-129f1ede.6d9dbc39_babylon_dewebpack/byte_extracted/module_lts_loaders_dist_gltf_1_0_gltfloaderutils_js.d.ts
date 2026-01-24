/**
 * glTF 1.0 loader utility functions module
 * Provides helper methods for loading and processing glTF 1.0 assets
 */

import { Matrix, Vector2, Vector3, Vector4 } from 'core/Maths/math.vector';
import { Texture } from 'core/Materials/Textures/texture';
import { Effect } from 'core/Materials/effect';
import { ShaderMaterial } from 'core/Materials/shaderMaterial';
import { Color4 } from 'core/Maths/math.color';
import { Scene } from 'core/scene';
import { 
  EParameterType, 
  ETextureWrapMode, 
  ETextureFilterType, 
  EComponentType,
  IGLTFRuntime,
  IGLTFTechniqueParameter,
  IGLTFBufferView,
  IGLTFAccessor
} from './glTFLoaderInterfaces';

/**
 * Camera interface for glTF operations
 */
export interface IGLTFCamera {
  /** Get the projection matrix */
  getProjectionMatrix(): Matrix;
  /** Get the view matrix */
  getViewMatrix(): Matrix;
  /** Get the combined transform matrix */
  getTransformMatrix(): Matrix;
}

/**
 * Node/Mesh interface for glTF operations
 */
export interface IGLTFNode {
  /** Get the world transformation matrix */
  getWorldMatrix(): Matrix;
}

/**
 * Shader effect interface
 */
export interface IGLTFEffect {
  /** Set a 2x2 matrix uniform */
  setMatrix2x2(uniformName: string, matrix: Float32Array): void;
  /** Set a 3x3 matrix uniform */
  setMatrix3x3(uniformName: string, matrix: Float32Array): void;
  /** Set a 4x4 matrix uniform */
  setMatrix(uniformName: string, matrix: Matrix): void;
  /** Set a float uniform */
  setFloat(uniformName: string, value: number): void;
  /** Set a Vector2 uniform */
  setVector2(uniformName: string, vector: Vector2): void;
  /** Set a Vector3 uniform */
  setVector3(uniformName: string, vector: Vector3): void;
  /** Set a Vector4 uniform */
  setVector4(uniformName: string, vector: Vector4): void;
}

/**
 * Shader material options for glTF default material
 */
export interface IShaderMaterialOptions {
  /** Vertex attribute names */
  attributes: string[];
  /** Uniform variable names */
  uniforms: string[];
  /** Texture sampler names */
  samplers: string[];
  /** Whether the material needs alpha blending */
  needAlphaBlending: boolean;
}

/**
 * Shader definition paths
 */
export interface IShaderDefinition {
  /** Vertex shader name */
  vertex: string;
  /** Fragment shader name */
  fragment: string;
}

/**
 * Utility class for glTF 1.0 loader operations
 * Provides methods for matrix operations, buffer access, and material creation
 */
export declare class GLTFUtils {
  /**
   * Internal default material instance cache
   * @internal
   */
  private static _DefaultMaterial: ShaderMaterial | null;

  /**
   * Set a matrix uniform based on semantic type
   * Handles various matrix semantics like MODEL, VIEW, PROJECTION, etc.
   * 
   * @param camera - The camera providing view and projection matrices
   * @param node - The node/mesh providing the world matrix
   * @param parameter - The technique parameter defining the semantic and type
   * @param uniformName - The name of the uniform in the shader
   * @param effect - The shader effect to set the uniform on
   */
  static SetMatrix(
    camera: IGLTFCamera,
    node: IGLTFNode,
    parameter: IGLTFTechniqueParameter,
    uniformName: string,
    effect: IGLTFEffect
  ): void;

  /**
   * Set a uniform value based on parameter type
   * Supports float, vec2, vec3, and vec4 types
   * 
   * @param effect - The shader effect to set the uniform on
   * @param uniformName - The name of the uniform in the shader
   * @param value - The value to set (number or array)
   * @param type - The parameter type (FLOAT, FLOAT_VEC2, etc.)
   * @returns True if the uniform was set successfully, false otherwise
   */
  static SetUniform(
    effect: IGLTFEffect,
    uniformName: string,
    value: number | number[],
    type: EParameterType
  ): boolean;

  /**
   * Convert glTF texture wrap mode to Babylon.js address mode
   * 
   * @param mode - The glTF texture wrap mode
   * @returns The corresponding Babylon.js texture address mode constant
   */
  static GetWrapMode(mode: ETextureWrapMode): number;

  /**
   * Get the byte stride from accessor type string
   * Returns the number of components per element
   * 
   * @param accessor - The accessor containing type information
   * @returns The number of components (1 for SCALAR, 2 for VEC2, etc.)
   */
  static GetByteStrideFromType(accessor: IGLTFAccessor): number;

  /**
   * Convert glTF texture filter mode to Babylon.js sampling mode
   * 
   * @param mode - The glTF texture filter type
   * @returns The corresponding Babylon.js texture sampling mode constant
   */
  static GetTextureFilterMode(mode: ETextureFilterType): number;

  /**
   * Extract a typed array buffer from a buffer view
   * 
   * @param runtime - The glTF runtime containing loaded buffer data
   * @param bufferView - The buffer view definition
   * @param byteOffset - Offset in bytes from the start of the buffer view
   * @param byteLength - Length in bytes to extract
   * @param componentType - The component type (determines array type)
   * @returns A typed array view of the requested buffer data
   * @throws Error if buffer access is out of range
   */
  static GetBufferFromBufferView(
    runtime: IGLTFRuntime,
    bufferView: IGLTFBufferView,
    byteOffset: number,
    byteLength: number,
    componentType: EComponentType
  ): Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array;

  /**
   * Get a typed array buffer from an accessor
   * Convenience method that calculates byte length from accessor properties
   * 
   * @param runtime - The glTF runtime containing loaded buffer data
   * @param accessor - The accessor definition
   * @returns A typed array containing the accessor data
   */
  static GetBufferFromAccessor(
    runtime: IGLTFRuntime,
    accessor: IGLTFAccessor
  ): Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array;

  /**
   * Decode a byte buffer to text string
   * 
   * @param buffer - The byte buffer to decode
   * @returns The decoded text string
   */
  static DecodeBufferToText(buffer: Uint8Array): string;

  /**
   * Get or create the default material for glTF loading
   * Creates a simple shader material with emission color if not already created
   * 
   * @param scene - The scene to create the material in
   * @returns The default shader material instance
   */
  static GetDefaultMaterial(scene: Scene): ShaderMaterial;
}