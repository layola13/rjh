/**
 * glTF Serializer Module
 * Provides glTF 2.0 export functionality and extensions for Babylon.js scenes
 */

// ============================================================================
// glTF 2.0 Extensions
// ============================================================================

/**
 * EXT_mesh_gpu_instancing extension
 * Enables GPU instancing for mesh rendering optimization
 */
export declare class EXT_mesh_gpu_instancing {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_lights_punctual extension
 * Adds support for punctual light sources (point, spot, directional)
 */
export declare class KHR_lights_punctual {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_clearcoat extension
 * Adds clearcoat layer support to materials
 */
export declare class KHR_materials_clearcoat {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_emissive_strength extension
 * Allows emissive strength values greater than 1.0
 */
export declare class KHR_materials_emissive_strength {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_ior extension
 * Adds index of refraction support to materials
 */
export declare class KHR_materials_ior {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_iridescence extension
 * Adds iridescence (thin-film interference) effect to materials
 */
export declare class KHR_materials_iridescence {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_sheen extension
 * Adds sheen layer support for cloth-like materials
 */
export declare class KHR_materials_sheen {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_specular extension
 * Adds specular workflow support to materials
 */
export declare class KHR_materials_specular {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_transmission extension
 * Adds transparency via light transmission (refraction)
 */
export declare class KHR_materials_transmission {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_unlit extension
 * Defines unlit materials (constant color, no lighting)
 */
export declare class KHR_materials_unlit {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_volume extension
 * Adds volumetric effects (thickness, attenuation) to materials
 */
export declare class KHR_materials_volume {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_texture_transform extension
 * Enables texture coordinate transformations (offset, rotation, scale)
 */
export declare class KHR_texture_transform {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

// ============================================================================
// Core Export Classes
// ============================================================================

/**
 * Container for glTF export data
 * Holds the serialized glTF JSON and binary buffer data
 */
export declare class GLTFData {
  /** glTF JSON structure */
  glTFFiles: Record<string, unknown>;
  /** Binary buffer data */
  glTFBuffers?: ArrayBuffer[];
  
  constructor();
}

/**
 * Main glTF 2.0 exporter
 * Provides static methods to export Babylon.js scenes to glTF format
 */
export declare class GLTF2Export {
  /**
   * Exports a scene to glTF 2.0 format
   * @param scene - The Babylon.js scene to export
   * @param filename - Output filename
   * @param options - Export configuration options
   * @returns Promise resolving to GLTFData
   */
  static GLTFAsync(
    scene: unknown,
    filename: string,
    options?: Record<string, unknown>
  ): Promise<GLTFData>;

  /**
   * Exports and downloads a scene as glTF 2.0
   * @param scene - The Babylon.js scene to export
   * @param filename - Output filename
   * @param options - Export configuration options
   * @returns Promise that resolves when download completes
   */
  static GLBAsync(
    scene: unknown,
    filename: string,
    options?: Record<string, unknown>
  ): Promise<GLTFData>;
}

// ============================================================================
// Internal Utilities (underscore-prefixed indicates internal API)
// ============================================================================

/**
 * Binary writer for glTF buffer data
 * @internal
 */
export declare class _BinaryWriter {
  /** Current byte offset in the buffer */
  byteOffset: number;
  /** Underlying array buffer */
  arrayBuffer: ArrayBuffer;
  /** DataView for typed writes */
  dataView: DataView;

  constructor(byteLength: number);

  /** Write unsigned 32-bit integer */
  setUInt32(value: number, offset?: number): void;
  /** Write unsigned 8-bit integer */
  setUInt8(value: number, offset?: number): void;
  /** Write float 32-bit */
  setFloat32(value: number, offset?: number): void;
  /** Write array buffer */
  setArrayBuffer(buffer: ArrayBuffer): void;
  /** Get current buffer as ArrayBuffer */
  getArrayBuffer(): ArrayBuffer;
}

/**
 * Core glTF exporter implementation
 * @internal
 */
export declare class _Exporter {
  /** Export options */
  options: Record<string, unknown>;
  /** Registered extensions */
  extensions: Record<string, unknown>;

  constructor(options?: Record<string, unknown>);

  /** Execute the export process */
  export(): Promise<GLTFData>;
  /** Dispose exporter resources */
  dispose(): void;
}

/**
 * Animation export utilities
 * @internal
 */
export declare class _GLTFAnimation {
  /**
   * Create glTF animation data from Babylon.js animation
   * @param babylonAnimation - Source animation
   * @param options - Conversion options
   * @returns glTF animation structure
   */
  static Create(
    babylonAnimation: unknown,
    options?: Record<string, unknown>
  ): unknown;
}

/**
 * Material export utilities
 * @internal
 */
export declare class _GLTFMaterialExporter {
  /** Export a Babylon.js material to glTF format */
  convertMaterial(babylonMaterial: unknown): unknown;
  /** Dispose material exporter resources */
  dispose(): void;
}

/**
 * General glTF export utilities
 * @internal
 */
export declare class _GLTFUtilities {
  /** Convert Babylon.js coordinate system to glTF */
  static ConvertToRightHanded(vector: unknown): unknown;
  /** Normalize quaternion rotation */
  static NormalizeQuaternion(quaternion: unknown): unknown;
  /** Get minimum value from array */
  static GetMinMax(array: number[]): { min: number[]; max: number[] };
}

// ============================================================================
// Extension Interfaces
// ============================================================================

/**
 * Base interface for glTF exporter extensions (legacy)
 * @internal
 */
export declare interface __IGLTFExporterExtension {
  /** Extension name */
  readonly name: string;
  /** Whether extension is enabled */
  enabled: boolean;
}

/**
 * Interface for glTF 2.0 exporter extensions
 * @internal
 */
export declare interface __IGLTFExporterExtensionV2 {
  /** Extension name */
  readonly name: string;
  /** Whether extension is enabled */
  enabled: boolean;
  /** Whether extension is required */
  required: boolean;
  
  /** Called before export begins */
  preExport?(): void;
  /** Called after export completes */
  postExport?(): void;
  /** Dispose extension resources */
  dispose?(): void;
}