/**
 * glTF 1.0 Binary Extension
 * Implements the KHR_binary_glTF extension for loading binary glTF 1.0 files.
 */

import { GLTFLoaderExtension, GLTFLoaderBase, GLTFLoader } from './glTFLoader';
import { GLTFUtils } from './glTFLoaderUtils';
import { EComponentType, IGLTFRuntime, IGLTFBufferView, IGLTFTexture, IGLTFImage, IGLTFShader } from './glTFLoaderInterfaces';
import { Scene } from '@babylonjs/core';

/**
 * Binary data wrapper for glTF binary files
 */
interface IGLTFBinaryData {
  /**
   * Read binary data asynchronously
   * @param offset - Byte offset to start reading from
   * @param length - Number of bytes to read
   * @returns Promise resolving to the read data
   */
  readAsync(offset: number, length: number): Promise<ArrayBufferView>;
  
  /**
   * Total byte length of the binary data
   */
  readonly byteLength: number;
}

/**
 * glTF loader data containing JSON and optional binary buffer
 */
interface IGLTFLoaderData {
  /**
   * Parsed glTF JSON structure
   */
  json: IGLTFRuntime;
  
  /**
   * Optional binary buffer data
   */
  bin?: IGLTFBinaryData;
}

/**
 * Extension object in glTF elements
 */
interface IGLTFExtensions {
  [extensionName: string]: {
    /**
     * Reference to a buffer view index
     */
    bufferView: string;
  };
}

/**
 * glTF image with possible extensions
 */
interface IGLTFImageExtended extends IGLTFImage {
  extensions?: IGLTFExtensions;
}

/**
 * glTF shader with possible extensions
 */
interface IGLTFShaderExtended extends IGLTFShader {
  extensions?: IGLTFExtensions;
}

/**
 * KHR_binary_glTF extension implementation for glTF 1.0
 * Handles loading of binary glTF files where textures and shaders are embedded in a binary blob
 */
export declare class GLTFBinaryExtension extends GLTFLoaderExtension {
  /**
   * Binary data storage
   */
  private _bin?: IGLTFBinaryData;

  /**
   * Creates an instance of GLTFBinaryExtension
   * Registers the extension with name "KHR_binary_glTF"
   */
  constructor();

  /**
   * Loads the glTF runtime asynchronously
   * @param scene - The Babylon.js scene to load into
   * @param data - The glTF loader data containing JSON and optional binary
   * @param rootUrl - Root URL for resolving relative paths
   * @param onSuccess - Callback invoked on successful load with the created runtime
   * @returns True if the extension handled the load, false otherwise
   */
  loadRuntimeAsync(
    scene: Scene,
    data: IGLTFLoaderData,
    rootUrl: string,
    onSuccess: (runtime: IGLTFRuntime) => void
  ): boolean;

  /**
   * Loads a buffer asynchronously
   * @param runtime - The glTF runtime context
   * @param bufferId - ID of the buffer to load
   * @param onSuccess - Callback invoked with the loaded ArrayBufferView
   * @param onError - Callback invoked on error with error message
   * @returns True if the extension handled the buffer load, false otherwise
   */
  loadBufferAsync(
    runtime: IGLTFRuntime,
    bufferId: string,
    onSuccess: (data: ArrayBufferView) => void,
    onError: (message: string) => void
  ): boolean;

  /**
   * Loads a texture buffer asynchronously from the binary data
   * @param runtime - The glTF runtime context
   * @param textureId - ID of the texture to load
   * @param onSuccess - Callback invoked with the loaded texture buffer
   * @returns True if the extension handled the texture load, false otherwise
   */
  loadTextureBufferAsync(
    runtime: IGLTFRuntime,
    textureId: string,
    onSuccess: (buffer: ArrayBufferView) => void
  ): boolean;

  /**
   * Loads a shader string asynchronously from the binary data
   * @param runtime - The glTF runtime context
   * @param shaderId - ID of the shader to load
   * @param onSuccess - Callback invoked with the decoded shader source string
   * @returns True if the extension handled the shader load, false otherwise
   */
  loadShaderStringAsync(
    runtime: IGLTFRuntime,
    shaderId: string,
    onSuccess: (shaderSource: string) => void
  ): boolean;
}

/**
 * Register the binary extension with the glTF loader
 */
GLTFLoader.RegisterExtension(new GLTFBinaryExtension());