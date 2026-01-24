/**
 * KHR_draco_mesh_compression extension for glTF 2.0 loader
 * Provides Draco compressed mesh geometry decompression support
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression
 */

import { Observable } from "core/Misc/observable";
import { GLTFLoader, ArrayItem } from "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js";
import { VertexBuffer } from "core/Buffers/buffer";
import { Geometry } from "core/Meshes/geometry";
import { DracoCompression } from "core/Meshes/Compression/dracoCompression";
import { Nullable } from "core/types";

/**
 * Extension name constant
 */
export const EXTENSION_NAME = "KHR_draco_mesh_compression";

/**
 * Attribute mapping configuration for Draco decoder
 */
interface DracoAttributeMap {
  [key: string]: number;
}

/**
 * Normalization scale factors for vertex attribute types
 */
interface DracoNormalizationMap {
  [key: string]: number;
}

/**
 * glTF primitive mode enumeration
 */
enum MeshPrimitiveMode {
  POINTS = 0,
  LINES = 1,
  LINE_LOOP = 2,
  LINE_STRIP = 3,
  TRIANGLES = 4,
  TRIANGLE_STRIP = 5,
  TRIANGLE_FAN = 6
}

/**
 * glTF accessor component type enumeration
 */
enum AccessorComponentType {
  BYTE = 5120,
  UNSIGNED_BYTE = 5121,
  SHORT = 5122,
  UNSIGNED_SHORT = 5123,
  UNSIGNED_INT = 5125,
  FLOAT = 5126
}

/**
 * Extension data structure from glTF primitive
 */
interface IKHRDracoMeshCompression {
  /** Index of the bufferView containing compressed Draco data */
  bufferView: number;
  /** Mapping of glTF attribute names to Draco attribute IDs */
  attributes: { [name: string]: number };
}

/**
 * glTF mesh primitive definition
 */
interface IMeshPrimitive {
  /** Primitive rendering mode */
  mode?: MeshPrimitiveMode;
  /** Attribute accessor indices */
  attributes: { [name: string]: number };
  /** Extension data */
  extensions?: { [name: string]: unknown };
}

/**
 * glTF accessor definition
 */
interface IAccessor {
  /** Component type of accessor elements */
  componentType: AccessorComponentType;
  /** Whether integer data should be normalized */
  normalized?: boolean;
}

/**
 * glTF buffer view definition with Draco cache
 */
interface IBufferView {
  /** Buffer view index */
  index: number;
  /** Cached decoded Draco geometry promise */
  _dracoBabylonGeometry?: Promise<Geometry>;
}

/**
 * Vertex data container with delay information
 */
interface IVertexData {
  /** List of vertex buffer kinds that need delayed loading */
  _delayInfo?: string[];
}

/**
 * KHR_draco_mesh_compression extension implementation
 * Handles decompression of Draco-compressed mesh geometry in glTF assets
 */
export declare class KHR_draco_mesh_compression {
  /**
   * Extension name identifier
   */
  readonly name: string;

  /**
   * Custom Draco compression decoder instance
   * If not set, uses the default DracoCompression decoder
   */
  dracoCompression?: DracoCompression;

  /**
   * Whether this extension is enabled for the current glTF asset
   */
  enabled: boolean;

  /**
   * Reference to the parent glTF loader
   */
  private _loader: Nullable<GLTFLoader>;

  /**
   * Creates a new instance of the KHR_draco_mesh_compression extension
   * @param loader - The parent glTF loader instance
   */
  constructor(loader: GLTFLoader);

  /**
   * Disposes resources used by this extension
   * Clears the custom Draco decoder and loader reference
   */
  dispose(): void;

  /**
   * Loads vertex data from a Draco-compressed mesh primitive
   * @param context - Error context string for debugging
   * @param primitive - The glTF mesh primitive to load
   * @param vertexData - Target vertex data container to populate
   * @returns Promise that resolves when vertex data is loaded and decoded
   * @throws Error if unsupported primitive mode is encountered
   * @throws Error if Draco decoding fails
   */
  _loadVertexDataAsync(
    context: string,
    primitive: IMeshPrimitive,
    vertexData: IVertexData
  ): Promise<Geometry>;
}

/**
 * Factory function to register the extension with the glTF loader
 * @param loader - The glTF loader instance
 * @returns New instance of the KHR_draco_mesh_compression extension
 * @internal
 */
declare function createExtension(loader: GLTFLoader): KHR_draco_mesh_compression;