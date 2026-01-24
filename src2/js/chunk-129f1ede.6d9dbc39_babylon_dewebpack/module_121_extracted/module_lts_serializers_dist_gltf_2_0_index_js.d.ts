/**
 * glTF 2.0 Serializer Module
 * 
 * This module provides comprehensive support for exporting Babylon.js scenes to glTF 2.0 format,
 * including core functionality and various glTF extensions.
 * 
 * @packageDocumentation
 */

/**
 * Extension for GPU instancing support in glTF meshes.
 * Enables efficient rendering of multiple instances of the same mesh.
 */
export class EXT_mesh_gpu_instancing {
  /** Extension name identifier */
  readonly name: string;
}

/**
 * Main glTF 2.0 export API.
 * Provides methods to export Babylon.js scenes to glTF format.
 */
export class GLTF2Export {
  /**
   * Exports a scene to glTF 2.0 format.
   * @param scene - The Babylon.js scene to export
   * @param fileName - Name of the output file
   * @param options - Export configuration options
   * @returns Promise resolving to the exported glTF data
   */
  static ExportAsync(scene: unknown, fileName: string, options?: unknown): Promise<GLTFData>;
}

/**
 * Container for glTF export data including JSON and binary buffers.
 */
export class GLTFData {
  /** The glTF JSON structure */
  glTFFiles: Record<string, unknown>;
  
  /** Binary buffer data (.bin files) */
  glTFBuffers?: ArrayBuffer[];
  
  /**
   * Downloads the exported glTF data as files.
   */
  downloadFiles(): void;
}

/**
 * Extension for punctual lights in glTF.
 * Supports point, spot, and directional lights.
 */
export class KHR_lights_punctual {
  /** Extension name identifier */
  readonly name: string;
}

/**
 * Extension for clear coat material properties.
 * Adds a reflective coating layer over the base material.
 */
export class KHR_materials_clearcoat {
  /** Extension name identifier */
  readonly name: string;
}

/**
 * Extension for enhanced emissive strength control.
 * Allows emissive values beyond the standard [0,1] range.
 */
export class KHR_materials_emissive_strength {
  /** Extension name identifier */
  readonly name: string;
}

/**
 * Extension for index of refraction (IOR) material property.
 * Controls how light bends when passing through transparent materials.
 */
export class KHR_materials_ior {
  /** Extension name identifier */
  readonly name: string;
}

/**
 * Extension for iridescence material effect.
 * Simulates thin-film interference for rainbow-like reflections.
 */
export class KHR_materials_iridescence {
  /** Extension name identifier */
  readonly name: string;
}

/**
 * Extension for sheen material properties.
 * Adds soft, fabric-like reflections (e.g., velvet, satin).
 */
export class KHR_materials_sheen {
  /** Extension name identifier */
  readonly name: string;
}

/**
 * Extension for specular-glossiness workflow.
 * Alternative PBR workflow to metallic-roughness.
 */
export class KHR_materials_specular {
  /** Extension name identifier */
  readonly name: string;
}

/**
 * Extension for light transmission through materials.
 * Enables realistic glass and translucent material rendering.
 */
export class KHR_materials_transmission {
  /** Extension name identifier */
  readonly name: string;
}

/**
 * Extension for unlit materials.
 * Materials are rendered without lighting calculations.
 */
export class KHR_materials_unlit {
  /** Extension name identifier */
  readonly name: string;
}

/**
 * Extension for volumetric material properties.
 * Simulates light interaction within thick translucent materials.
 */
export class KHR_materials_volume {
  /** Extension name identifier */
  readonly name: string;
}

/**
 * Extension for texture coordinate transformations.
 * Supports offset, rotation, and scale of texture UVs.
 */
export class KHR_texture_transform {
  /** Extension name identifier */
  readonly name: string;
}

/**
 * Internal binary writer for glTF buffer data.
 * Handles serialization of binary data in little-endian format.
 * 
 * @internal
 */
export class _BinaryWriter {
  /** Current byte length of the buffer */
  readonly byteLength: number;
  
  /**
   * Writes binary data to the buffer.
   * @param data - Data to write
   */
  write(data: ArrayBufferView): void;
  
  /**
   * Retrieves the complete binary buffer.
   * @returns The binary data as ArrayBuffer
   */
  getArrayBuffer(): ArrayBuffer;
}

/**
 * Core glTF exporter implementation.
 * Handles scene traversal and glTF structure generation.
 * 
 * @internal
 */
export class _Exporter {
  /**
   * Exports a scene to glTF format.
   * @param scene - The scene to export
   * @param options - Export options
   */
  export(scene: unknown, options?: unknown): Promise<GLTFData>;
}

/**
 * Internal handler for glTF animation export.
 * Converts Babylon.js animations to glTF animation format.
 * 
 * @internal
 */
export class _GLTFAnimation {
  /**
   * Exports animations from a scene.
   * @param animations - Array of Babylon.js animations
   * @param sampleRate - Animation sampling rate in frames per second
   */
  static ExportAnimations(animations: unknown[], sampleRate: number): unknown[];
}

/**
 * Internal material exporter for glTF.
 * Converts Babylon.js materials to glTF PBR materials.
 * 
 * @internal
 */
export class _GLTFMaterialExporter {
  /**
   * Exports a material to glTF format.
   * @param material - The Babylon.js material to export
   * @returns glTF material definition
   */
  exportMaterial(material: unknown): unknown;
}

/**
 * Internal utility functions for glTF export operations.
 * Provides helper methods for data conversion and validation.
 * 
 * @internal
 */
export class _GLTFUtilities {
  /**
   * Converts a Babylon.js quaternion to glTF format.
   * @param quaternion - The quaternion to convert
   * @returns Array of 4 numbers [x, y, z, w]
   */
  static ConvertQuaternion(quaternion: unknown): number[];
  
  /**
   * Normalizes a glTF property name.
   * @param name - Property name to normalize
   * @returns Normalized name
   */
  static NormalizeName(name: string): string;
}

/**
 * Base interface for glTF exporter extensions (version 2).
 * Implement this interface to create custom glTF export extensions.
 * 
 * @internal
 */
export interface __IGLTFExporterExtensionV2 {
  /** Unique name identifier for the extension */
  readonly name: string;
  
  /** Whether the extension is enabled */
  enabled: boolean;
  
  /** Whether the extension is required for proper loading */
  required: boolean;
  
  /**
   * Called after a node is exported.
   * @param context - Export context
   * @param node - The exported glTF node
   * @param babylonNode - The original Babylon.js node
   */
  postExportNodeAsync?(context: unknown, node: unknown, babylonNode: unknown): Promise<void>;
  
  /**
   * Called after a material is exported.
   * @param context - Export context
   * @param material - The exported glTF material
   * @param babylonMaterial - The original Babylon.js material
   */
  postExportMaterialAsync?(context: unknown, material: unknown, babylonMaterial: unknown): Promise<void>;
}