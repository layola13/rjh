/**
 * glTF 2.0 Extension: ExtrasAsMetadata
 * 
 * This extension preserves the "extras" property from glTF nodes, cameras, and materials
 * by storing them in the Babylon.js metadata structure.
 */

import type { GLTFLoader } from './glTFLoader';
import type { INode, ICamera, IMaterial } from './glTFLoaderInterfaces';
import type { Node, Camera, Material } from '@babylonjs/core';

/**
 * Metadata structure for glTF extras
 */
interface IGLTFMetadata {
  /** glTF-specific metadata */
  gltf?: {
    /** Additional properties from the glTF extras field */
    extras?: Record<string, unknown>;
  };
}

/**
 * Extended Babylon.js object with metadata support
 */
interface IBabylonObjectWithMetadata {
  /** Metadata container for storing additional properties */
  metadata?: IGLTFMetadata;
}

/**
 * Callback function invoked after an async load operation completes
 */
type LoadCallback<T> = (result: T) => void;

/**
 * glTF object that may contain an extras property
 */
interface IGLTFObjectWithExtras {
  /** Additional application-specific data */
  extras?: Record<string, unknown>;
}

/**
 * ExtrasAsMetadata Extension
 * 
 * Transfers the glTF "extras" property into Babylon.js object metadata.
 * This allows preservation of custom data attached to glTF assets.
 * 
 * @see https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#reference-extras
 */
export declare class ExtrasAsMetadata {
  /**
   * The name of this extension.
   */
  readonly name: 'ExtrasAsMetadata';

  /**
   * Defines whether this extension is enabled.
   */
  enabled: boolean;

  /**
   * Reference to the glTF loader instance.
   * @internal
   */
  private _loader: GLTFLoader;

  /**
   * Creates a new instance of the ExtrasAsMetadata extension.
   * @param loader - The parent glTF loader
   */
  constructor(loader: GLTFLoader);

  /**
   * Assigns extras from a glTF object to a Babylon.js object's metadata.
   * 
   * If the glTF object contains an "extras" property with data, it will be
   * stored in `babylonObject.metadata.gltf.extras`.
   * 
   * @param babylonObject - The Babylon.js object to receive the metadata
   * @param gltfObject - The glTF object containing potential extras
   * @internal
   */
  private _assignExtras(
    babylonObject: IBabylonObjectWithMetadata,
    gltfObject: IGLTFObjectWithExtras
  ): void;

  /**
   * Disposes of this extension and releases resources.
   */
  dispose(): void;

  /**
   * Loads a glTF node asynchronously and assigns its extras to metadata.
   * 
   * @param context - The context string for error logging
   * @param node - The glTF node definition
   * @param assign - Callback invoked with the loaded Babylon.js node
   * @returns A promise that resolves with the loaded node
   */
  loadNodeAsync(
    context: string,
    node: INode,
    assign: LoadCallback<Node>
  ): Promise<Node>;

  /**
   * Loads a glTF camera asynchronously and assigns its extras to metadata.
   * 
   * @param context - The context string for error logging
   * @param camera - The glTF camera definition
   * @param assign - Callback invoked with the loaded Babylon.js camera
   * @returns A promise that resolves with the loaded camera
   */
  loadCameraAsync(
    context: string,
    camera: ICamera,
    assign: LoadCallback<Camera>
  ): Promise<Camera>;

  /**
   * Creates a Babylon.js material from a glTF material and assigns its extras to metadata.
   * 
   * @param context - The context string for error logging
   * @param material - The glTF material definition
   * @param babylonDrawMode - The Babylon.js draw mode for the material
   * @returns The created Babylon.js material with extras in metadata
   */
  createMaterial(
    context: string,
    material: IMaterial,
    babylonDrawMode: number
  ): Material;
}