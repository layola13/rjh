/**
 * glTF 1.0 Binary Extension
 * Handles KHR_binary_glTF extension for loading binary glTF 1.0 files
 */

import type { IGLTFRuntime, IGLTFLoaderData, IBufferView, IGLTFTexture, IGLTFImage, IGLTFShader } from './glTFLoaderInterfaces';
import type { Scene } from '@babylonjs/core';

/**
 * Component type enumeration for typed arrays
 */
export enum EComponentType {
  BYTE = 5120,
  UNSIGNED_BYTE = 5121,
  SHORT = 5122,
  UNSIGNED_SHORT = 5123,
  INT = 5124,
  UNSIGNED_INT = 5125,
  FLOAT = 5126
}

/**
 * Binary data reader interface
 */
export interface IBinReader {
  /** Total byte length of the binary data */
  readonly byteLength: number;
  
  /**
   * Asynchronously reads a portion of the binary data
   * @param offset - Starting byte offset
   * @param length - Number of bytes to read
   * @returns Promise resolving to the read data
   */
  readAsync(offset: number, length: number): Promise<ArrayBufferView>;
}

/**
 * glTF loader data with optional binary buffer
 */
export interface IGLTFLoaderDataWithBin extends IGLTFLoaderData {
  /** Binary buffer for glTF binary format */
  bin?: IBinReader;
}

/**
 * glTF JSON structure
 */
export interface IGLTFJson {
  /** List of extensions used in this glTF asset */
  extensionsUsed?: string[];
  
  /** Buffer views defining segments of buffer data */
  bufferViews?: IBufferView[];
  
  /** Textures referencing image sources */
  textures?: IGLTFTexture[];
  
  /** Images containing texture data */
  images?: IGLTFImage[];
  
  /** Shader programs */
  shaders?: IGLTFShader[];
}

/**
 * Base class for glTF loader extensions
 */
export declare abstract class GLTFLoaderExtension {
  /** Extension name (e.g., "KHR_binary_glTF") */
  readonly name: string;
  
  constructor(name: string);
  
  /**
   * Loads runtime data asynchronously
   * @param scene - Babylon.js scene
   * @param data - glTF loader data
   * @param rootUrl - Root URL for resolving relative paths
   * @param onSuccess - Callback invoked on successful load
   * @returns True if extension handled the load, false otherwise
   */
  loadRuntimeAsync?(
    scene: Scene,
    data: IGLTFLoaderData,
    rootUrl: string,
    onSuccess: (runtime: IGLTFRuntime) => void
  ): boolean;
  
  /**
   * Loads buffer data asynchronously
   * @param gltf - glTF JSON root object
   * @param bufferId - Buffer identifier
   * @param onSuccess - Callback invoked with loaded buffer
   * @param onError - Callback invoked on error
   * @returns True if extension handled the load, false otherwise
   */
  loadBufferAsync?(
    gltf: IGLTFJson,
    bufferId: string,
    onSuccess: (buffer: ArrayBufferView) => void,
    onError: (message: string) => void
  ): boolean;
  
  /**
   * Loads texture buffer data asynchronously
   * @param gltf - glTF JSON root object
   * @param textureId - Texture identifier
   * @param onSuccess - Callback invoked with loaded texture buffer
   * @returns True if extension handled the load, false otherwise
   */
  loadTextureBufferAsync?(
    gltf: IGLTFJson,
    textureId: string,
    onSuccess: (buffer: ArrayBufferView) => void
  ): boolean;
  
  /**
   * Loads shader source code asynchronously
   * @param gltf - glTF JSON root object
   * @param shaderId - Shader identifier
   * @param onSuccess - Callback invoked with shader source string
   * @returns True if extension handled the load, false otherwise
   */
  loadShaderStringAsync?(
    gltf: IGLTFJson,
    shaderId: string,
    onSuccess: (source: string) => void
  ): boolean;
}

/**
 * Extension for loading binary glTF 1.0 files (KHR_binary_glTF)
 * Handles embedded binary data in glTF assets
 */
export declare class GLTFBinaryExtension extends GLTFLoaderExtension {
  /** Binary data reader for the glTF binary buffer */
  private _bin?: IBinReader;
  
  constructor();
  
  /**
   * Loads runtime data from binary glTF
   * @param scene - Babylon.js scene
   * @param data - glTF loader data with binary buffer
   * @param rootUrl - Root URL for resolving relative paths
   * @param onSuccess - Callback invoked with created runtime
   * @returns True if binary extension is used, false otherwise
   */
  loadRuntimeAsync(
    scene: Scene,
    data: IGLTFLoaderDataWithBin,
    rootUrl: string,
    onSuccess: (runtime: IGLTFRuntime) => void
  ): boolean;
  
  /**
   * Loads buffer from binary glTF data
   * @param gltf - glTF JSON root object
   * @param bufferId - Buffer identifier (must be "binary_glTF")
   * @param onSuccess - Callback invoked with loaded buffer
   * @param onError - Callback invoked with error message
   * @returns True if buffer is loaded from binary, false otherwise
   */
  loadBufferAsync(
    gltf: IGLTFJson,
    bufferId: string,
    onSuccess: (buffer: ArrayBufferView) => void,
    onError: (message: string) => void
  ): boolean;
  
  /**
   * Loads texture data from binary buffer
   * @param gltf - glTF JSON root object
   * @param textureId - Texture identifier
   * @param onSuccess - Callback invoked with texture buffer
   * @returns True if texture is loaded from binary, false otherwise
   */
  loadTextureBufferAsync(
    gltf: IGLTFJson,
    textureId: string,
    onSuccess: (buffer: ArrayBufferView) => void
  ): boolean;
  
  /**
   * Loads shader source from binary buffer
   * @param gltf - glTF JSON root object
   * @param shaderId - Shader identifier
   * @param onSuccess - Callback invoked with decoded shader source
   * @returns True if shader is loaded from binary, false otherwise
   */
  loadShaderStringAsync(
    gltf: IGLTFJson,
    shaderId: string,
    onSuccess: (source: string) => void
  ): boolean;
}

/**
 * Utility functions for glTF loading
 */
export declare namespace GLTFUtils {
  /**
   * Extracts buffer data from a buffer view
   * @param gltf - glTF JSON root object
   * @param bufferView - Buffer view descriptor
   * @param byteOffset - Additional byte offset
   * @param byteLength - Number of bytes to extract
   * @param componentType - Data component type
   * @returns Typed array view of the buffer data
   */
  function GetBufferFromBufferView(
    gltf: IGLTFJson,
    bufferView: IBufferView,
    byteOffset: number,
    byteLength: number,
    componentType: EComponentType
  ): ArrayBufferView;
  
  /**
   * Decodes binary buffer to UTF-8 text string
   * @param buffer - Binary buffer containing text data
   * @returns Decoded text string
   */
  function DecodeBufferToText(buffer: ArrayBufferView): string;
}

/**
 * Base glTF loader class
 */
export declare abstract class GLTFLoaderBase {
  /**
   * Creates a glTF runtime from JSON data
   * @param json - glTF JSON root object
   * @param scene - Babylon.js scene
   * @param rootUrl - Root URL for resolving relative paths
   * @returns Created glTF runtime
   */
  static CreateRuntime(json: IGLTFJson, scene: Scene, rootUrl: string): IGLTFRuntime;
}

/**
 * Main glTF 1.0 loader
 */
export declare class GLTFLoader {
  /**
   * Registers a glTF loader extension
   * @param extension - Extension instance to register
   */
  static RegisterExtension(extension: GLTFLoaderExtension): void;
}