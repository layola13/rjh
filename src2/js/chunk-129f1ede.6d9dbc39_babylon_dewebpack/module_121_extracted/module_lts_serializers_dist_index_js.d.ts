/**
 * Babylon.js Serializers Module
 * 
 * This module provides export functionality for various 3D file formats including
 * glTF 2.0, OBJ, and STL. It includes the core exporter classes and glTF extensions
 * for advanced material properties and features.
 */

/**
 * glTF 2.0 extension for GPU instancing using the EXT_mesh_gpu_instancing extension.
 * Enables efficient rendering of multiple instances of the same mesh.
 */
export declare class EXT_mesh_gpu_instancing {
  // Extension implementation for GPU instancing
}

/**
 * Main glTF 2.0 exporter class.
 * Handles the conversion of Babylon.js scenes to glTF 2.0 format.
 */
export declare class GLTF2Export {
  /**
   * Exports a scene to glTF 2.0 format
   * @param scene The Babylon.js scene to export
   * @param filename The output filename
   * @param options Export options
   */
  // Export methods and configuration
}

/**
 * Container for glTF export data including JSON, binary buffers, and image data.
 */
export declare class GLTFData {
  /** The glTF JSON structure */
  glTFFiles: Record<string, unknown>;
  
  /** Binary buffer data */
  glTFBuffers?: ArrayBuffer[];
  
  /** Image data */
  imageData?: Record<string, { data: ArrayBuffer; mimeType: string }>;
}

/**
 * glTF extension for punctual lights (point, spot, directional).
 * Implements KHR_lights_punctual specification.
 */
export declare class KHR_lights_punctual {
  // Light export functionality
}

/**
 * glTF extension for clearcoat material layer.
 * Implements KHR_materials_clearcoat for simulating clear coating on surfaces.
 */
export declare class KHR_materials_clearcoat {
  // Clearcoat material properties export
}

/**
 * glTF extension for emissive strength control.
 * Allows emissive intensity values greater than 1.0 for HDR rendering.
 */
export declare class KHR_materials_emissive_strength {
  // Emissive strength export
}

/**
 * glTF extension for index of refraction.
 * Implements KHR_materials_ior for realistic refraction effects.
 */
export declare class KHR_materials_ior {
  // IOR material property export
}

/**
 * glTF extension for iridescence effects.
 * Simulates thin-film interference (soap bubbles, oil slicks).
 */
export declare class KHR_materials_iridescence {
  // Iridescence material properties export
}

/**
 * glTF extension for sheen material layer.
 * Used for cloth and fabric rendering.
 */
export declare class KHR_materials_sheen {
  // Sheen material properties export
}

/**
 * glTF extension for specular workflow.
 * Alternative to metallic-roughness PBR workflow.
 */
export declare class KHR_materials_specular {
  // Specular material properties export
}

/**
 * glTF extension for transmission (transparency with refraction).
 * Enables realistic glass and transparent material rendering.
 */
export declare class KHR_materials_transmission {
  // Transmission material properties export
}

/**
 * glTF extension for unlit materials.
 * Materials that are not affected by lighting.
 */
export declare class KHR_materials_unlit {
  // Unlit material flag export
}

/**
 * glTF extension for volumetric materials.
 * Implements subsurface scattering and volume attenuation.
 */
export declare class KHR_materials_volume {
  // Volume material properties export
}

/**
 * glTF extension for texture coordinate transformations.
 * Enables texture tiling, rotation, and offset.
 */
export declare class KHR_texture_transform {
  // Texture transformation export
}

/**
 * Wavefront OBJ format exporter.
 * Exports Babylon.js meshes to OBJ format with optional MTL material files.
 */
export declare class OBJExport {
  /**
   * Exports meshes to OBJ format
   * @param meshes Array of meshes to export
   * @param materials Whether to export materials
   * @param materialLibraryFilename MTL file name
   * @param globalPosition Global position offset
   */
  // OBJ export methods
}

/**
 * STL (Stereolithography) format exporter.
 * Exports mesh geometry for 3D printing and CAD applications.
 */
export declare class STLExport {
  /**
   * Exports mesh to STL format
   * @param mesh The mesh to export
   * @param download Whether to trigger download
   * @param fileName Output filename
   * @param binary Export as binary STL (default: true)
   */
  // STL export methods
}

/**
 * Internal binary data writer for glTF export.
 * Handles writing binary data to buffers with proper alignment.
 * @internal
 */
export declare class _BinaryWriter {
  /** Gets the current byte length */
  getByteLength(): number;
  
  /** Gets the array buffer */
  getArrayBuffer(): ArrayBuffer;
  
  // Binary writing methods
}

/**
 * Base exporter class for glTF export.
 * Contains shared functionality for glTF exporters.
 * @internal
 */
export declare class _Exporter {
  // Core export logic
}

/**
 * Internal glTF animation exporter.
 * Handles conversion of Babylon.js animations to glTF animation format.
 * @internal
 */
export declare class _GLTFAnimation {
  // Animation export functionality
}

/**
 * Internal glTF material exporter.
 * Converts Babylon.js materials to glTF material definitions.
 * @internal
 */
export declare class _GLTFMaterialExporter {
  // Material conversion and export
}

/**
 * Internal glTF utility functions.
 * Helper methods for glTF data conversion and manipulation.
 * @internal
 */
export declare class _GLTFUtilities {
  // Utility methods for glTF export
}

/**
 * Base interface for glTF exporter extensions.
 * Defines the contract for implementing custom glTF extensions.
 * @internal
 */
export declare interface __IGLTFExporterExtension {
  /** Extension name */
  readonly name: string;
  
  /** Whether the extension is enabled */
  enabled: boolean;
}

/**
 * Interface for glTF 2.0 exporter extensions.
 * Extended interface with glTF 2.0 specific hooks and methods.
 * @internal
 */
export declare interface __IGLTFExporterExtensionV2 extends __IGLTFExporterExtension {
  // glTF 2.0 extension hooks
}