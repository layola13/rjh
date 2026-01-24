/**
 * glTF extension for loading Draco compressed mesh data.
 * Implements the KHR_draco_mesh_compression extension specification.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_draco_mesh_compression
 */

import { Observable } from 'core/Misc/observable';
import { GLTFLoader, ArrayItem } from '../../../lts/loaders/dist/glTF/2.0/glTFLoader';
import { VertexBuffer } from 'core/Buffers/buffer';
import { Geometry } from 'core/Meshes/geometry';
import { DracoCompression } from 'core/Meshes/Compression/dracoCompression';
import { Scene } from 'core/scene';

/** Extension name constant */
export declare const EXTENSION_NAME = "KHR_draco_mesh_compression";

/**
 * Draco attribute mapping from glTF attribute names to Draco attribute IDs
 */
export interface IDracoAttributeMap {
  [attributeName: string]: number;
}

/**
 * Normalization scale factors for vertex attributes
 */
export interface IDracoNormalizationMap {
  [attributeKind: string]: number;
}

/**
 * glTF extension data structure for KHR_draco_mesh_compression
 */
export interface IKHRDracoMeshCompression {
  /** Index of the bufferView containing compressed data */
  bufferView: number;
  /** Mapping of glTF attribute semantic names to Draco attribute unique IDs */
  attributes: { [key: string]: number };
}

/**
 * Extended bufferView with cached Draco geometry
 */
export interface IBufferViewWithDraco {
  /** Original bufferView index */
  index: number;
  /** Cached promise for decoded Babylon.js Geometry */
  _dracoBabylonGeometry?: Promise<Geometry>;
}

/**
 * KHR_draco_mesh_compression extension loader.
 * Enables efficient loading of compressed mesh geometry using Google's Draco library.
 */
export declare class KHR_draco_mesh_compression {
  /**
   * The name of this extension.
   */
  readonly name: typeof EXTENSION_NAME;

  /**
   * Defines whether this extension is enabled.
   * Enabled when Draco decoder is available and extension is used in the glTF.
   */
  enabled: boolean;

  /**
   * Optional custom Draco compression instance.
   * Falls back to DracoCompression.Default if not provided.
   */
  dracoCompression?: DracoCompression;

  /**
   * Reference to the parent glTF loader.
   */
  private _loader: GLTFLoader | null;

  /**
   * Creates an instance of KHR_draco_mesh_compression extension.
   * @param loader - The parent glTF loader instance
   */
  constructor(loader: GLTFLoader);

  /**
   * Disposes resources used by this extension.
   * Clears the Draco compression instance and loader reference.
   */
  dispose(): void;

  /**
   * Loads vertex data from a Draco compressed mesh primitive.
   * @param context - The glTF context path for error reporting
   * @param primitive - The glTF mesh primitive definition
   * @param babylonGeometry - The target Babylon.js Geometry to populate
   * @returns Promise that resolves when vertex data is loaded
   */
  _loadVertexDataAsync(
    context: string,
    primitive: IMeshPrimitive,
    babylonGeometry: Geometry
  ): Promise<Geometry>;
}

/**
 * glTF mesh primitive definition
 */
export interface IMeshPrimitive {
  /** Primitive rendering mode (e.g., TRIANGLES = 4, TRIANGLE_STRIP = 5) */
  mode?: number;
  /** Mapping of attribute semantic names to accessor indices */
  attributes: { [name: string]: number };
  /** Extensions object */
  extensions?: {
    [EXTENSION_NAME]?: IKHRDracoMeshCompression;
  };
}

/**
 * glTF accessor definition
 */
export interface IAccessor {
  /** Component data type (e.g., BYTE = 5120, FLOAT = 5126) */
  componentType: number;
  /** Whether integer data values should be normalized */
  normalized?: boolean;
}

/**
 * Extended Geometry with delay info for deferred attribute loading
 */
export interface IGeometryWithDelayInfo extends Geometry {
  /** Array of vertex buffer kinds that have deferred loading */
  _delayInfo?: string[];
}

/**
 * Registers the KHR_draco_mesh_compression extension with the glTF loader.
 * @param loader - The glTF loader instance
 * @returns A new instance of the extension
 */
declare function registerExtension(loader: GLTFLoader): KHR_draco_mesh_compression;