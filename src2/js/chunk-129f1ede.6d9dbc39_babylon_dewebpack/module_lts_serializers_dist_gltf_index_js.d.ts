/**
 * glTF Serializer Module
 * 
 * This module provides comprehensive glTF 2.0 export functionality for Babylon.js,
 * including support for various glTF extensions and material properties.
 */

/**
 * EXT_mesh_gpu_instancing extension
 * Enables GPU instancing for meshes in glTF files
 */
export class EXT_mesh_gpu_instancing {
  /** Extension name identifier */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required for the glTF file to be loaded */
  required: boolean;
}

/**
 * Main glTF 2.0 exporter class
 * Handles the export of Babylon.js scenes to glTF 2.0 format
 */
export class GLTF2Export {
  /**
   * Exports a scene to glTF 2.0 format
   * @param scene - The Babylon.js scene to export
   * @param filePrefix - Prefix for the output file name
   * @param options - Export options and settings
   * @returns Promise resolving to GLTFData containing the exported content
   */
  static GLTFAsync(scene: unknown, filePrefix: string, options?: unknown): Promise<GLTFData>;
  
  /**
   * Exports a scene to GLB (binary glTF) format
   * @param scene - The Babylon.js scene to export
   * @param filePrefix - Prefix for the output file name
   * @param options - Export options and settings
   * @returns Promise resolving to GLTFData containing the exported content
   */
  static GLBAsync(scene: unknown, filePrefix: string, options?: unknown): Promise<GLTFData>;
}

/**
 * Container for glTF export data
 * Holds the exported glTF/GLB file content and associated resources
 */
export class GLTFData {
  /** The glTF JSON content */
  glTFFiles: Record<string, unknown>;
  /** Binary data for GLB format */
  glTFBinary?: ArrayBuffer;
  /** Associated texture and resource files */
  additionalFiles?: Record<string, Blob>;
}

/**
 * KHR_lights_punctual extension
 * Adds support for point, spot, and directional lights in glTF
 */
export class KHR_lights_punctual {
  /** Extension name identifier */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_clearcoat extension
 * Adds clear coat layer properties to materials
 */
export class KHR_materials_clearcoat {
  /** Extension name identifier */
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
export class KHR_materials_emissive_strength {
  /** Extension name identifier */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_ior extension
 * Defines index of refraction for materials
 */
export class KHR_materials_ior {
  /** Extension name identifier */
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
export class KHR_materials_iridescence {
  /** Extension name identifier */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_sheen extension
 * Adds sheen layer for cloth-like materials
 */
export class KHR_materials_sheen {
  /** Extension name identifier */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_specular extension
 * Extends materials with specular reflection properties
 */
export class KHR_materials_specular {
  /** Extension name identifier */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_transmission extension
 * Enables light transmission through materials (glass, water, etc.)
 */
export class KHR_materials_transmission {
  /** Extension name identifier */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_unlit extension
 * Defines materials that are not affected by lighting
 */
export class KHR_materials_unlit {
  /** Extension name identifier */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * KHR_materials_volume extension
 * Adds volumetric properties to materials (thickness, attenuation)
 */
export class KHR_materials_volume {
  /** Extension name identifier */
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
export class KHR_texture_transform {
  /** Extension name identifier */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required */
  required: boolean;
}

/**
 * Binary writer utility for glTF export
 * Handles writing binary data in glTF/GLB format
 * @internal
 */
export class _BinaryWriter {
  /** Current byte offset in the buffer */
  byteOffset: number;
  /** The underlying array buffer */
  arrayBuffer: ArrayBuffer;
  /** DataView for writing binary data */
  dataView: DataView;
  
  /**
   * Write a UInt32 value
   * @param value - The 32-bit unsigned integer to write
   */
  setUInt32(value: number): void;
  
  /**
   * Get the final array buffer
   * @returns The complete binary data
   */
  getArrayBuffer(): ArrayBuffer;
}

/**
 * Core glTF exporter implementation
 * @internal
 */
export class _Exporter {
  /** Export options and configuration */
  options: unknown;
  
  /**
   * Export the scene to glTF format
   * @returns Promise resolving to the glTF data
   */
  export(): Promise<GLTFData>;
}

/**
 * Animation exporter for glTF
 * Handles conversion of Babylon.js animations to glTF format
 * @internal
 */
export class _GLTFAnimation {
  /**
   * Create glTF animation data from Babylon.js animations
   * @param babylonScene - The source Babylon.js scene
   * @param animationTargets - Target nodes/meshes for animation
   * @param options - Animation export options
   * @returns Array of glTF animation objects
   */
  static CreateAnimations(
    babylonScene: unknown,
    animationTargets: unknown[],
    options?: unknown
  ): unknown[];
}

/**
 * Material exporter for glTF
 * Converts Babylon.js materials to glTF material definitions
 * @internal
 */
export class _GLTFMaterialExporter {
  /**
   * Convert a Babylon.js material to glTF format
   * @param material - The Babylon.js material to export
   * @param mimeType - MIME type for textures
   * @returns The glTF material definition
   */
  exportMaterial(material: unknown, mimeType?: string): unknown;
}

/**
 * Utility functions for glTF export
 * @internal
 */
export class _GLTFUtilities {
  /**
   * Convert rotation quaternion to glTF format
   * @param quaternion - The rotation quaternion
   * @returns Array of rotation values
   */
  static GetRotation(quaternion: unknown): number[];
  
  /**
   * Check if values are within epsilon tolerance
   * @param value1 - First value
   * @param value2 - Second value
   * @param epsilon - Tolerance threshold
   * @returns True if values are approximately equal
   */
  static IsStandardVertexData(value1: number, value2: number, epsilon: number): boolean;
}

/**
 * Base interface for glTF exporter extensions (v1)
 * @internal
 * @deprecated Use __IGLTFExporterExtensionV2 instead
 */
export interface __IGLTFExporterExtension {
  /** Extension name */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
}

/**
 * Interface for glTF 2.0 exporter extensions
 * Implement this interface to create custom glTF export extensions
 * @internal
 */
export interface __IGLTFExporterExtensionV2 {
  /** Unique extension name identifier */
  readonly name: string;
  /** Whether the extension is enabled */
  enabled: boolean;
  /** Whether the extension is required for the glTF file */
  required: boolean;
  
  /**
   * Called before the node is exported
   * @param context - Export context
   * @param node - The node being exported
   * @returns Promise that resolves when pre-export processing is complete
   */
  preExportNode?(context: unknown, node: unknown): Promise<void>;
  
  /**
   * Called after the node is exported
   * @param context - Export context
   * @param node - The node that was exported
   * @param nodeIndex - Index of the node in the glTF nodes array
   * @returns Promise that resolves when post-export processing is complete
   */
  postExportNode?(context: unknown, node: unknown, nodeIndex: number): Promise<void>;
}