/**
 * glTF Exporter extension for EXT_mesh_gpu_instancing
 * Enables GPU instancing support for mesh thin instances in glTF 2.0 export
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing
 */

import type { Mesh } from 'core/Meshes/mesh';
import type { Node } from 'core/node';
import type { INode } from '../glTFExporterInterfaces';
import type { _BinaryWriter } from '../glTFExporterUtilities';
import type { _Exporter } from '../glTFExporter';
import type { Nullable } from 'core/types';

/**
 * Component type constants for glTF accessors
 */
export enum GLTFComponentType {
  /** Signed byte */
  BYTE = 5120,
  /** Signed short */
  SHORT = 5122,
  /** Float */
  FLOAT = 5126,
}

/**
 * Accessor type strings for glTF
 */
export type GLTFAccessorType = 'SCALAR' | 'VEC2' | 'VEC3' | 'VEC4' | 'MAT2' | 'MAT3' | 'MAT4';

/**
 * Attributes for EXT_mesh_gpu_instancing extension
 */
export interface IEXTMeshGpuInstancingAttributes {
  /** Translation attribute accessor index */
  TRANSLATION?: number;
  /** Rotation attribute accessor index */
  ROTATION?: number;
  /** Scale attribute accessor index */
  SCALE?: number;
}

/**
 * EXT_mesh_gpu_instancing extension data structure
 */
export interface IEXTMeshGpuInstancing {
  /** Instancing attributes */
  attributes: IEXTMeshGpuInstancingAttributes;
}

/**
 * glTF Exporter Extension for EXT_mesh_gpu_instancing
 * Exports Babylon.js thin instances as glTF GPU instancing extension data
 */
export declare class EXT_mesh_gpu_instancing {
  /**
   * Name of this extension
   */
  readonly name: string;

  /**
   * Defines whether this extension is enabled
   */
  enabled: boolean;

  /**
   * Defines whether this extension is required
   */
  required: boolean;

  /**
   * Reference to the glTF exporter
   */
  private _exporter: _Exporter;

  /**
   * Indicates if the extension was used during export
   */
  private _wasUsed: boolean;

  /**
   * Creates a new EXT_mesh_gpu_instancing extension
   * @param exporter The glTF exporter instance
   */
  constructor(exporter: _Exporter);

  /**
   * Dispose of resources
   */
  dispose(): void;

  /**
   * Gets whether the extension was used during the export
   */
  get wasUsed(): boolean;

  /**
   * Post-processes a node after export to add instancing data
   * @param context The export context path
   * @param node The glTF node being exported
   * @param babylonNode The corresponding Babylon node
   * @param nodeMap Array mapping Babylon nodes to glTF node indices
   * @param binaryWriter The binary writer for buffer data
   * @returns A promise that resolves to the potentially modified glTF node
   */
  postExportNodeAsync(
    context: string,
    node: INode,
    babylonNode: Node,
    nodeMap: Nullable<Node[]>,
    binaryWriter: _BinaryWriter
  ): Promise<INode>;

  /**
   * Builds a glTF accessor for instancing attribute data
   * @param data The typed array containing attribute data
   * @param type The accessor type (e.g., 'VEC3', 'VEC4')
   * @param count The number of elements
   * @param binaryWriter The binary writer for buffer data
   * @param componentType The component type (BYTE, SHORT, FLOAT)
   * @returns The index of the created accessor
   */
  private _buildAccessor(
    data: Float32Array | Int8Array | Int16Array,
    type: GLTFAccessorType,
    count: number,
    binaryWriter: _BinaryWriter,
    componentType: GLTFComponentType
  ): number;
}