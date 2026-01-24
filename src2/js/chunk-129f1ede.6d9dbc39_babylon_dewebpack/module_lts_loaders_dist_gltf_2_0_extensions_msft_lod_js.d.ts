/**
 * glTF MSFT_lod Extension Type Definitions
 * 
 * This extension enables Level of Detail (LOD) support for glTF assets,
 * allowing progressive loading of nodes and materials at different quality levels.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_lod
 */

import type { Observable } from '@babylonjs/core/Misc/observable';
import type { IGLTFLoaderExtension } from '@babylonjs/loaders/glTF/2.0/glTFLoaderExtension';
import type { GLTFLoader, INode, IMaterial } from '@babylonjs/loaders/glTF/2.0/glTFLoader';
import type { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import type { Material } from '@babylonjs/core/Materials/material';
import type { Nullable } from '@babylonjs/core/types';
import type { ISceneLoaderProgressEvent } from '@babylonjs/core/Loading/sceneLoader';

/**
 * Deferred promise wrapper for asynchronous operations
 */
interface Deferred<T = void> {
  /** The promise that will be resolved or rejected */
  promise: Promise<T>;
  /** Resolves the promise with the given value */
  resolve(value?: T): void;
  /** Rejects the promise with the given reason */
  reject(reason?: unknown): void;
}

/**
 * Buffer range specification for LOD loading
 */
interface BufferLODRange {
  /** Starting byte offset in the buffer */
  start: number;
  /** Ending byte offset in the buffer */
  end: number;
  /** Deferred promise that resolves when the buffer range is loaded */
  loaded: Deferred<Uint8Array>;
}

/**
 * glTF extension data structure for MSFT_lod
 */
interface IMSFT_lod {
  /** Array of LOD indices referencing nodes or materials */
  ids: number[];
}

/**
 * Extended node interface with LOD support
 */
interface INodeWithLOD extends INode {
  /** Cached Babylon.js transform node instance */
  _babylonTransformNode?: TransformNode;
}

/**
 * Extended material interface with LOD support
 */
interface IMaterialWithLOD extends IMaterial {
  /** Internal data cache for material instances */
  _data?: Record<string, { babylonMaterial: Material }>;
}

/**
 * MSFT_lod Extension Implementation
 * 
 * Implements progressive Level of Detail loading for glTF assets.
 * Supports both node-based and material-based LOD systems with deferred loading.
 */
export declare class MSFT_lod implements IGLTFLoaderExtension {
  /**
   * The name of this extension as defined in the glTF specification
   */
  readonly name: 'MSFT_lod';

  /**
   * Defines the order in which extensions are applied.
   * Higher values are applied later.
   * @default 100
   */
  readonly order: number;

  /**
   * Whether this extension is enabled for the current load operation
   */
  enabled: boolean;

  /**
   * Maximum number of LOD levels to load.
   * Must be greater than zero.
   * @default 10
   */
  maxLODsToLoad: number;

  /**
   * Observable that notifies when a node LOD level has been loaded
   * The event data is the LOD level index (0-based)
   */
  readonly onNodeLODsLoadedObservable: Observable<number>;

  /**
   * Observable that notifies when a material LOD level has been loaded
   * The event data is the LOD level index (0-based)
   */
  readonly onMaterialLODsLoadedObservable: Observable<number>;

  /**
   * @param loader - The parent glTF loader instance
   */
  constructor(loader: GLTFLoader);

  /**
   * Disposes of all resources held by this extension
   * Clears all LOD arrays and observables
   */
  dispose(): void;

  /**
   * Called when the loader is ready to start loading LODs
   * Sets up promise chains for progressive LOD loading
   */
  onReady(): void;

  /**
   * Loads a glTF scene with LOD support
   * 
   * @param context - The glTF context path for error reporting
   * @param scene - The glTF scene to load
   * @returns Promise that resolves when the scene is loaded
   */
  loadSceneAsync(context: string, scene: IScene): Promise<void>;

  /**
   * Loads a glTF node with LOD support
   * 
   * @param context - The glTF context path for error reporting
   * @param node - The glTF node to load
   * @param assign - Callback to assign the loaded TransformNode
   * @returns Promise that resolves with the loaded TransformNode, or null if extension not present
   */
  loadNodeAsync(
    context: string,
    node: INodeWithLOD,
    assign: (babylonTransformNode: TransformNode) => void
  ): Nullable<Promise<TransformNode>>;

  /**
   * Loads a glTF material with LOD support (internal method)
   * 
   * @param context - The glTF context path for error reporting
   * @param material - The glTF material to load
   * @param mesh - The Babylon.js mesh that will use this material
   * @param babylonDrawMode - The Babylon.js draw mode
   * @param assign - Callback to assign the loaded material
   * @returns Promise that resolves with the loaded Material, or null if extension not present
   */
  _loadMaterialAsync(
    context: string,
    material: IMaterialWithLOD,
    mesh: IMesh,
    babylonDrawMode: number,
    assign: (babylonMaterial: Material) => void
  ): Nullable<Promise<Material>>;

  /**
   * Loads a URI resource with deferred loading based on current LOD level
   * 
   * @param context - The glTF context path for error reporting
   * @param property - The glTF property containing the URI
   * @param uri - The URI to load
   * @returns Promise that resolves with the loaded data, or null if not deferred
   */
  _loadUriAsync(
    context: string,
    property: IProperty,
    uri: string
  ): Nullable<Promise<ArrayBufferView>>;

  /**
   * Loads a buffer with range request support for LOD streaming
   * 
   * @param context - The glTF context path for error reporting
   * @param buffer - The glTF buffer to load
   * @param byteOffset - Starting byte offset
   * @param byteLength - Number of bytes to load
   * @returns Promise that resolves with the buffer data, or null if range requests not supported
   */
  loadBufferAsync(
    context: string,
    buffer: IBuffer,
    byteOffset: number,
    byteLength: number
  ): Nullable<Promise<Uint8Array>>;

  // Private members (for documentation purposes)

  /** The parent glTF loader instance */
  private _loader: Nullable<GLTFLoader>;

  /** Buffer ranges for base LOD level */
  private _bufferLODs: Array<BufferLODRange | undefined>;

  /** Current node LOD index being processed */
  private _nodeIndexLOD: Nullable<number>;

  /** Deferred promises for node LOD synchronization */
  private _nodeSignalLODs: Array<Deferred | undefined>;

  /** Promises for each node LOD level */
  private _nodePromiseLODs: Array<Array<Promise<unknown>>>;

  /** Buffer ranges for each node LOD level */
  private _nodeBufferLODs: Array<BufferLODRange | undefined>;

  /** Current material LOD index being processed */
  private _materialIndexLOD: Nullable<number>;

  /** Deferred promises for material LOD synchronization */
  private _materialSignalLODs: Array<Deferred | undefined>;

  /** Promises for each material LOD level */
  private _materialPromiseLODs: Array<Array<Promise<unknown>>>;

  /** Buffer ranges for each material LOD level */
  private _materialBufferLODs: Array<BufferLODRange | undefined>;

  /**
   * Loads a specific buffer LOD range
   * 
   * @param bufferLODs - Array of buffer LOD ranges
   * @param lodIndex - The LOD level index to load
   */
  private _loadBufferLOD(
    bufferLODs: Array<BufferLODRange | undefined>,
    lodIndex: number
  ): void;

  /**
   * Retrieves the ordered array of LOD objects from highest to lowest detail
   * 
   * @param context - The glTF context path for error reporting
   * @param property - The glTF property containing the LOD extension
   * @param array - The source array of objects (nodes or materials)
   * @param ids - The LOD indices from the extension
   * @returns Array of LOD objects ordered from highest to lowest detail
   */
  private _getLODs<T extends { index: number }>(
    context: string,
    property: T,
    array: ArrayLike<T>,
    ids: number[]
  ): T[];

  /**
   * Disposes of a transform node and its associated materials
   * 
   * @param transformNode - The transform node to dispose
   */
  private _disposeTransformNode(transformNode: TransformNode): void;

  /**
   * Disposes of an array of materials and their unused textures
   * 
   * @param materials - Array of materials to dispose
   */
  private _disposeMaterials(materials: Material[]): void;
}