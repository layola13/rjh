/**
 * glTF extension for preserving extra metadata from glTF assets.
 * This extension reads the "extras" field from glTF nodes, cameras, and materials
 * and stores them in the Babylon.js metadata structure.
 */

import type { IGLTFLoaderExtension } from './glTFLoaderExtension';
import type { GLTFLoader } from '../glTFLoader';
import type { INode, ICamera, IMaterial } from '../glTFLoaderInterfaces';
import type { Node } from '@babylonjs/core/node';
import type { Camera } from '@babylonjs/core/Cameras/camera';
import type { Material } from '@babylonjs/core/Materials/material';

/**
 * Extension name identifier
 */
export declare const EXTENSION_NAME = "ExtrasAsMetadata";

/**
 * Interface for objects that can have metadata attached
 */
export interface IMetadataContainer {
  metadata?: {
    gltf?: {
      extras?: Record<string, unknown>;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
}

/**
 * glTF extras callback function type
 */
export type ExtrasCallback<T> = (result: T) => void;

/**
 * Extension that transfers glTF "extras" data to Babylon.js metadata.
 * 
 * This extension processes the optional "extras" field from glTF elements
 * (nodes, cameras, materials) and preserves them in the Babylon.js scene graph
 * under the metadata.gltf.extras property.
 * 
 * @see https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#reference-extras
 */
export declare class ExtrasAsMetadata implements IGLTFLoaderExtension {
  /**
   * The name of this extension.
   */
  readonly name: string;

  /**
   * Defines whether this extension is enabled.
   */
  enabled: boolean;

  /**
   * Reference to the glTF loader instance.
   */
  private _loader: GLTFLoader | null;

  /**
   * Creates an instance of the ExtrasAsMetadata extension.
   * @param loader - The parent glTF loader instance
   */
  constructor(loader: GLTFLoader);

  /**
   * Assigns extras from a glTF object to a Babylon.js object's metadata.
   * 
   * If the glTF object contains an "extras" field with properties, this method
   * creates/updates the metadata structure on the target object:
   * target.metadata.gltf.extras = gltfObject.extras
   * 
   * @param target - The Babylon.js object to receive metadata
   * @param gltfObject - The glTF object containing potential extras
   */
  private _assignExtras<T extends IMetadataContainer>(
    target: T,
    gltfObject: { extras?: Record<string, unknown> }
  ): void;

  /**
   * Disposes of this extension and clears references.
   */
  dispose(): void;

  /**
   * Loads a glTF node and assigns its extras to the resulting Babylon.js node.
   * 
   * @param context - The glTF loader context string
   * @param node - The glTF node data
   * @param assign - Callback function to receive the loaded node
   * @returns Promise that resolves when the node is loaded
   */
  loadNodeAsync(
    context: string,
    node: INode,
    assign: ExtrasCallback<Node>
  ): Promise<Node>;

  /**
   * Loads a glTF camera and assigns its extras to the resulting Babylon.js camera.
   * 
   * @param context - The glTF loader context string
   * @param camera - The glTF camera data
   * @param assign - Callback function to receive the loaded camera
   * @returns Promise that resolves when the camera is loaded
   */
  loadCameraAsync(
    context: string,
    camera: ICamera,
    assign: ExtrasCallback<Camera>
  ): Promise<Camera>;

  /**
   * Creates a Babylon.js material from glTF material data and assigns extras.
   * 
   * @param context - The glTF loader context string
   * @param material - The glTF material data
   * @param babylonDrawMode - The Babylon.js draw mode for the material
   * @returns The created Babylon.js material with extras assigned
   */
  createMaterial(
    context: string,
    material: IMaterial,
    babylonDrawMode: number
  ): Material;
}