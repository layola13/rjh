/**
 * Babylon.js LTS Serializers Module
 * 
 * This module provides legacy exports for various 3D model serialization formats including
 * glTF 2.0, OBJ, and STL. It consolidates exports from multiple serializer modules.
 * 
 * @module LTSSerializers
 */

// ============================================================================
// glTF 2.0 Serializer Exports
// ============================================================================

/**
 * glTF extension for GPU instancing support using EXT_mesh_gpu_instancing
 * Enables efficient rendering of multiple instances of the same mesh
 */
export type EXT_mesh_gpu_instancing = any; // TODO: Define precise interface

/**
 * Main glTF 2.0 exporter class
 * Provides functionality to export Babylon.js scenes to glTF 2.0 format
 */
export class GLTF2Export {
  /**
   * Exports a scene to glTF 2.0 format
   * @param scene - The Babylon.js scene to export
   * @param fileName - Target file name for the export
   * @param options - Export configuration options
   */
  static ExportAsync(scene: any, fileName: string, options?: any): Promise<GLTFData>;
}

/**
 * Container for glTF export data
 * Holds the exported glTF JSON and binary buffer data
 */
export class GLTFData {
  /** The glTF JSON content */
  glTFFiles: Record<string, any>;
  
  /** Binary buffers associated with the glTF file */
  glTFBuffers?: ArrayBuffer[];
  
  /**
   * Downloads the exported glTF data to the user's device
   */
  downloadFiles(): void;
}

/**
 * glTF extension for punctual lights (KHR_lights_punctual)
 * Adds support for point, spot, and directional lights in glTF
 */
export type KHR_lights_punctual = any; // TODO: Define precise interface

/**
 * glTF extension for clearcoat material properties (KHR_materials_clearcoat)
 * Simulates a thin coating layer on top of materials (e.g., car paint, varnish)
 */
export type KHR_materials_clearcoat = any; // TODO: Define precise interface

/**
 * glTF extension for emissive strength (KHR_materials_emissive_strength)
 * Allows emissive colors to exceed the 0-1 range for HDR rendering
 */
export type KHR_materials_emissive_strength = any; // TODO: Define precise interface

/**
 * glTF extension for index of refraction (KHR_materials_ior)
 * Defines how light bends when passing through transparent materials
 */
export type KHR_materials_ior = any; // TODO: Define precise interface

/**
 * glTF extension for iridescence effect (KHR_materials_iridescence)
 * Creates rainbow-like color shifts based on viewing angle (e.g., soap bubbles, oil slicks)
 */
export type KHR_materials_iridescence = any; // TODO: Define precise interface

/**
 * glTF extension for sheen material properties (KHR_materials_sheen)
 * Simulates soft, velvet-like surface reflections (e.g., fabric, felt)
 */
export type KHR_materials_sheen = any; // TODO: Define precise interface

/**
 * glTF extension for specular/glossiness workflow (KHR_materials_specular)
 * Provides additional control over specular reflections
 */
export type KHR_materials_specular = any; // TODO: Define precise interface

/**
 * glTF extension for transmission (KHR_materials_transmission)
 * Enables realistic light transmission through transparent surfaces (e.g., glass, water)
 */
export type KHR_materials_transmission = any; // TODO: Define precise interface

/**
 * glTF extension for unlit materials (KHR_materials_unlit)
 * Materials that are not affected by scene lighting (constant color)
 */
export type KHR_materials_unlit = any; // TODO: Define precise interface

/**
 * glTF extension for volume/subsurface properties (KHR_materials_volume)
 * Simulates light scattering within translucent materials (e.g., wax, skin, jade)
 */
export type KHR_materials_volume = any; // TODO: Define precise interface

/**
 * glTF extension for texture transforms (KHR_texture_transform)
 * Allows offset, rotation, and scaling of texture coordinates
 */
export type KHR_texture_transform = any; // TODO: Define precise interface

// ============================================================================
// Internal/Private glTF Utilities
// ============================================================================

/**
 * Internal binary writer utility for glTF buffer generation
 * Handles writing binary data in the correct format for glTF files
 * @internal
 */
export class _BinaryWriter {
  /**
   * Writes data to the binary buffer
   * @param data - Data to write
   */
  write(data: ArrayBufferView): void;
  
  /**
   * Gets the current buffer contents
   */
  getBuffer(): ArrayBuffer;
}

/**
 * Base exporter class for glTF serialization
 * @internal
 */
export class _Exporter {
  /**
   * Exports a Babylon.js scene
   * @param scene - Scene to export
   * @param options - Export options
   */
  export(scene: any, options?: any): Promise<GLTFData>;
}

/**
 * Internal utility for handling glTF animation data
 * Converts Babylon.js animations to glTF animation format
 * @internal
 */
export class _GLTFAnimation {
  /**
   * Creates glTF animation data from Babylon.js animations
   * @param animationGroup - Source animation group
   */
  static CreateAnimation(animationGroup: any): any;
}

/**
 * Internal utility for exporting materials to glTF format
 * Handles material property conversion and texture export
 * @internal
 */
export class _GLTFMaterialExporter {
  /**
   * Exports a material to glTF format
   * @param material - Babylon.js material to export
   */
  exportMaterial(material: any): any;
}

/**
 * Internal utility functions for glTF export operations
 * @internal
 */
export class _GLTFUtilities {
  /**
   * Converts data to the appropriate glTF format
   */
  static Convert(data: any): any;
}

/**
 * Base interface for glTF exporter extensions
 * Allows custom behavior during glTF export
 * @internal
 */
export interface __IGLTFExporterExtension {
  /** Extension name */
  readonly name: string;
  
  /** Whether the extension is enabled */
  enabled: boolean;
}

/**
 * Interface for glTF 2.0 exporter extensions
 * Provides hooks into the export process for custom data serialization
 * @internal
 */
export interface __IGLTFExporterExtensionV2 extends __IGLTFExporterExtension {
  /**
   * Called after a node is exported
   * @param context - Export context
   * @param node - The exported node
   * @param babylonNode - The source Babylon.js node
   */
  postExportNodeAsync?(context: any, node: any, babylonNode: any): Promise<void>;
  
  /**
   * Called after a material is exported
   * @param context - Export context
   * @param material - The exported material
   * @param babylonMaterial - The source Babylon.js material
   */
  postExportMaterialAsync?(context: any, material: any, babylonMaterial: any): Promise<void>;
}

// ============================================================================
// OBJ Serializer Exports
// ============================================================================

/**
 * Wavefront OBJ format exporter
 * Exports Babylon.js meshes to the widely-supported OBJ format
 */
export class OBJExport {
  /**
   * Exports meshes to OBJ format
   * @param meshes - Array of meshes to export
   * @param fileName - Target file name
   */
  static OBJ(meshes: any[], fileName: string): void;
  
  /**
   * Exports meshes to OBJ format with material (MTL) file
   * @param meshes - Array of meshes to export
   * @param materials - Materials to include
   * @param fileName - Target file name
   */
  static MTL(meshes: any[], materials: any[], fileName: string): void;
}

// ============================================================================
// STL Serializer Exports
// ============================================================================

/**
 * STL (Stereolithography) format exporter
 * Exports Babylon.js meshes to STL format commonly used for 3D printing
 */
export class STLExport {
  /**
   * Exports a mesh to STL format (ASCII)
   * @param mesh - Mesh to export
   * @param fileName - Target file name
   */
  static CreateSTL(mesh: any, fileName: string): void;
  
  /**
   * Exports a mesh to binary STL format
   * @param mesh - Mesh to export
   * @param fileName - Target file name
   */
  static CreateBinarySTL(mesh: any, fileName: string): void;
}