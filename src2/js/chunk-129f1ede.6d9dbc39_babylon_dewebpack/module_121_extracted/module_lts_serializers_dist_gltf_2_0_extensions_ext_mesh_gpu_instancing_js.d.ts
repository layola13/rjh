/**
 * glTF Exporter Extension for EXT_mesh_gpu_instancing
 * Exports GPU instancing data for meshes with thin instances
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing
 */

import type { Mesh } from 'core/Meshes/mesh';
import type { Node } from 'core/node';
import type { Vector3, Quaternion } from 'core/Maths/math.vector';
import type { Nullable } from 'core/types';

/**
 * Data writer interface for binary buffer operations
 */
export interface IDataWriter {
  /**
   * Gets the current byte offset in the buffer
   */
  getByteOffset(): number;

  /**
   * Writes a 32-bit float value to the buffer
   * @param value - The float value to write
   */
  setFloat32(value: number): void;

  /**
   * Writes a signed 8-bit integer to the buffer
   * @param value - The byte value to write
   */
  setByte(value: number): void;

  /**
   * Writes a signed 16-bit integer to the buffer
   * @param value - The int16 value to write
   */
  setInt16(value: number): void;
}

/**
 * glTF node representation
 */
export interface INode {
  /**
   * Dictionary of node extensions
   */
  extensions?: Record<string, unknown>;

  /**
   * Node name
   */
  name?: string;

  /**
   * Other node properties
   */
  [key: string]: unknown;
}

/**
 * glTF buffer view descriptor
 */
export interface IBufferView {
  /**
   * Index of the buffer
   */
  buffer: number;

  /**
   * Byte offset into the buffer
   */
  byteOffset: number;

  /**
   * Length of the buffer view in bytes
   */
  byteLength: number;

  /**
   * Stride in bytes between elements
   */
  byteStride?: number;
}

/**
 * glTF accessor descriptor
 */
export interface IAccessor {
  /**
   * Index of the buffer view
   */
  bufferView: number;

  /**
   * Component data type (e.g., 5126 for FLOAT)
   */
  componentType: number;

  /**
   * Number of elements
   */
  count: number;

  /**
   * Data type (e.g., "VEC3", "VEC4", "SCALAR")
   */
  type: string;

  /**
   * Whether values are normalized
   */
  normalized?: boolean;

  /**
   * Minimum values for each component
   */
  min?: number[];

  /**
   * Maximum values for each component
   */
  max?: number[];
}

/**
 * EXT_mesh_gpu_instancing extension data structure
 */
export interface IEXTMeshGpuInstancing {
  /**
   * Dictionary of instance attribute accessors
   * Common attributes: TRANSLATION, ROTATION, SCALE
   */
  attributes: Record<string, number>;
}

/**
 * glTF exporter interface
 */
export interface IGLTFExporter {
  /**
   * Collection of buffer views
   */
  _bufferViews: IBufferView[];

  /**
   * Collection of accessors
   */
  _accessors: IAccessor[];
}

/**
 * Base interface for glTF exporter extensions
 */
export interface IGLTFExporterExtension {
  /**
   * Name of the extension
   */
  name: string;

  /**
   * Whether the extension is enabled
   */
  enabled: boolean;

  /**
   * Whether the extension is required for proper loading
   */
  required: boolean;

  /**
   * Whether the extension was used during export
   */
  readonly wasUsed: boolean;

  /**
   * Called after a node is exported, allows modification
   * @param context - Export context string
   * @param node - The exported glTF node
   * @param babylonNode - The source Babylon node
   * @param nodeMap - Map of Babylon nodes to glTF node indices
   * @param binaryWriter - Binary data writer
   * @returns Promise resolving to the modified node
   */
  postExportNodeAsync(
    context: string,
    node: INode,
    babylonNode: Node,
    nodeMap: Map<Node, number>,
    binaryWriter: IDataWriter
  ): Promise<INode>;

  /**
   * Disposes resources used by the extension
   */
  dispose(): void;
}

/**
 * Component type constants for glTF accessors
 */
export enum GLTFComponentType {
  /** Signed 8-bit integer */
  BYTE = 5120,
  /** Unsigned 8-bit integer */
  UNSIGNED_BYTE = 5121,
  /** Signed 16-bit integer */
  SHORT = 5122,
  /** Unsigned 16-bit integer */
  UNSIGNED_SHORT = 5123,
  /** Unsigned 32-bit integer */
  UNSIGNED_INT = 5125,
  /** 32-bit float */
  FLOAT = 5126,
}

/**
 * Extension name constant
 */
export declare const EXT_MESH_GPU_INSTANCING_NAME = "EXT_mesh_gpu_instancing";

/**
 * EXT_mesh_gpu_instancing exporter extension
 * Exports thin instance data as GPU instancing attributes for glTF
 */
export declare class EXT_mesh_gpu_instancing implements IGLTFExporterExtension {
  /**
   * Name of this extension
   */
  readonly name: string;

  /**
   * Whether this extension is enabled
   */
  enabled: boolean;

  /**
   * Whether this extension is required
   */
  required: boolean;

  /**
   * Whether this extension was used during the export process
   */
  readonly wasUsed: boolean;

  /**
   * Reference to the glTF exporter
   */
  private readonly _exporter: IGLTFExporter;

  /**
   * Tracks if the extension has been utilized
   */
  private _wasUsed: boolean;

  /**
   * Creates a new EXT_mesh_gpu_instancing extension
   * @param exporter - The parent glTF exporter instance
   */
  constructor(exporter: IGLTFExporter);

  /**
   * Disposes the extension and cleans up resources
   */
  dispose(): void;

  /**
   * Exports node instance data after the node is exported
   * @param context - The export context identifier
   * @param node - The glTF node being exported
   * @param babylonNode - The source Babylon.js node
   * @param nodeMap - Mapping from Babylon nodes to glTF node indices
   * @param binaryWriter - Writer for binary buffer data
   * @returns Promise resolving to the node with instancing extension data
   */
  postExportNodeAsync(
    context: string,
    node: INode,
    babylonNode: Node,
    nodeMap: Nullable<Map<Node, number>>,
    binaryWriter: Nullable<IDataWriter>
  ): Promise<INode>;

  /**
   * Builds a glTF accessor for instance attribute data
   * @param data - Typed array containing the attribute data
   * @param type - Accessor type (e.g., "VEC3", "VEC4")
   * @param count - Number of elements
   * @param binaryWriter - Writer for binary buffer data
   * @param componentType - Data component type (BYTE, SHORT, FLOAT, etc.)
   * @returns Index of the created accessor
   */
  private _buildAccessor(
    data: Float32Array | Int8Array | Int16Array,
    type: string,
    count: number,
    binaryWriter: IDataWriter,
    componentType: GLTFComponentType
  ): number;
}