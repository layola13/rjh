/**
 * glTF 2.0 Serializer Module
 * 
 * This module provides comprehensive glTF 2.0 export functionality for Babylon.js,
 * including core exporters, material handling, animations, and various glTF extensions.
 */

// ============================================================================
// Core Classes
// ============================================================================

/**
 * Binary writer for glTF file generation
 * Handles writing binary data in the correct format for glTF specification
 */
export class _BinaryWriter {
  /**
   * Creates a new binary writer instance
   */
  constructor();

  /**
   * Writes data to the binary buffer
   */
  write(data: ArrayBuffer | ArrayBufferView): void;

  /**
   * Gets the final binary data
   */
  getBuffer(): ArrayBuffer;
}

/**
 * Main glTF exporter class
 * Responsible for converting Babylon.js scenes to glTF format
 */
export class _Exporter {
  /**
   * Creates a new glTF exporter instance
   * @param babylonScene - The Babylon.js scene to export
   */
  constructor(babylonScene: any);

  /**
   * Exports the scene to glTF format
   * @param options - Export configuration options
   */
  export(options?: any): Promise<GLTFData>;

  /**
   * Disposes of the exporter and releases resources
   */
  dispose(): void;
}

/**
 * Container for glTF export data
 * Holds the exported glTF JSON and binary data
 */
export class GLTFData {
  /**
   * The glTF JSON content
   */
  glTFFiles: { [fileName: string]: string | Blob };

  /**
   * Creates a new GLTFData instance
   */
  constructor();

  /**
   * Downloads the glTF files
   */
  downloadFiles(): void;
}

/**
 * High-level glTF 2.0 export API
 * Provides static methods for exporting scenes to glTF format
 */
export class GLTF2Export {
  /**
   * Exports a Babylon.js scene to glTF 2.0 format
   * @param scene - The scene to export
   * @param fileName - The name for the exported file
   * @param options - Export options
   */
  static GLTFAsync(
    scene: any,
    fileName: string,
    options?: any
  ): Promise<GLTFData>;

  /**
   * Exports and downloads a scene as glTF
   * @param scene - The scene to export
   * @param fileName - The name for the exported file
   * @param options - Export options
   */
  static GLB(scene: any, fileName: string, options?: any): Promise<GLTFData>;
}

// ============================================================================
// Animation
// ============================================================================

/**
 * Handles glTF animation export
 * Converts Babylon.js animations to glTF animation format
 */
export class _GLTFAnimation {
  /**
   * Creates animation data from Babylon.js animations
   * @param babylonScene - The source scene
   * @param options - Animation export options
   */
  static CreateAnimations(babylonScene: any, options?: any): any[];

  /**
   * Builds animation channel data
   */
  static BuildAnimationChannels(animation: any): any[];
}

// ============================================================================
// Materials
// ============================================================================

/**
 * Handles material export to glTF format
 * Converts Babylon.js materials to glTF material definitions
 */
export class _GLTFMaterialExporter {
  /**
   * Creates a new material exporter
   * @param exporter - Parent exporter instance
   */
  constructor(exporter: _Exporter);

  /**
   * Converts a Babylon.js material to glTF format
   * @param material - The material to convert
   * @param mimeType - Image MIME type for textures
   */
  convertMaterialToGLTF(material: any, mimeType: string): any;

  /**
   * Exports a material's textures
   */
  exportTextures(material: any): Promise<void>;
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Utility functions for glTF export operations
 * Provides helper methods for data conversion and validation
 */
export class _GLTFUtilities {
  /**
   * Converts a quaternion to the glTF coordinate system
   */
  static ConvertQuaternionToGLTF(quaternion: any): number[];

  /**
   * Converts a vector3 to the glTF coordinate system
   */
  static ConvertVector3ToGLTF(vector: any): number[];

  /**
   * Gets the minimum and maximum values from a float array
   */
  static GetMinMax(data: Float32Array): { min: number[]; max: number[] };
}

// ============================================================================
// Extensions Base
// ============================================================================

/**
 * Base interface for glTF exporter extensions
 * All glTF extensions must implement this interface
 */
export class __IGLTFExporterExtensionV2 {
  /**
   * The name of the extension
   */
  readonly name: string;

  /**
   * Whether the extension is enabled
   */
  enabled: boolean;

  /**
   * Whether the extension is required
   */
  required: boolean;

  /**
   * Called after a node is exported
   */
  postExportNodeAsync?(
    context: string,
    node: any,
    babylonNode: any
  ): Promise<void>;

  /**
   * Called after a material is exported
   */
  postExportMaterialAsync?(
    context: string,
    material: any,
    babylonMaterial: any
  ): Promise<void>;

  /**
   * Disposes of the extension
   */
  dispose?(): void;
}

// ============================================================================
// glTF Extensions
// ============================================================================

/**
 * EXT_mesh_gpu_instancing extension
 * Enables GPU instancing for meshes in glTF
 */
export class EXT_mesh_gpu_instancing implements __IGLTFExporterExtensionV2 {
  readonly name: "EXT_mesh_gpu_instancing";
  enabled: boolean;
  required: boolean;

  /**
   * Exports GPU instancing data for a node
   */
  postExportNodeAsync(
    context: string,
    node: any,
    babylonNode: any
  ): Promise<void>;
}

/**
 * KHR_lights_punctual extension
 * Adds support for punctual lights (point, spot, directional)
 */
export class KHR_lights_punctual implements __IGLTFExporterExtensionV2 {
  readonly name: "KHR_lights_punctual";
  enabled: boolean;
  required: boolean;

  /**
   * Exports light data
   */
  postExportNodeAsync(
    context: string,
    node: any,
    babylonNode: any
  ): Promise<void>;
}

/**
 * KHR_materials_clearcoat extension
 * Adds clearcoat layer to materials
 */
export class KHR_materials_clearcoat implements __IGLTFExporterExtensionV2 {
  readonly name: "KHR_materials_clearcoat";
  enabled: boolean;
  required: boolean;

  /**
   * Exports clearcoat material properties
   */
  postExportMaterialAsync(
    context: string,
    material: any,
    babylonMaterial: any
  ): Promise<void>;
}

/**
 * KHR_materials_emissive_strength extension
 * Allows emissive strength values greater than 1
 */
export class KHR_materials_emissive_strength
  implements __IGLTFExporterExtensionV2 {
  readonly name: "KHR_materials_emissive_strength";
  enabled: boolean;
  required: boolean;

  /**
   * Exports emissive strength value
   */
  postExportMaterialAsync(
    context: string,
    material: any,
    babylonMaterial: any
  ): Promise<void>;
}

/**
 * KHR_materials_ior extension
 * Specifies index of refraction for materials
 */
export class KHR_materials_ior implements __IGLTFExporterExtensionV2 {
  readonly name: "KHR_materials_ior";
  enabled: boolean;
  required: boolean;

  /**
   * Exports IOR value
   */
  postExportMaterialAsync(
    context: string,
    material: any,
    babylonMaterial: any
  ): Promise<void>;
}

/**
 * KHR_materials_iridescence extension
 * Adds iridescence effect to materials
 */
export class KHR_materials_iridescence implements __IGLTFExporterExtensionV2 {
  readonly name: "KHR_materials_iridescence";
  enabled: boolean;
  required: boolean;

  /**
   * Exports iridescence properties
   */
  postExportMaterialAsync(
    context: string,
    material: any,
    babylonMaterial: any
  ): Promise<void>;
}

/**
 * KHR_materials_sheen extension
 * Adds sheen layer for cloth-like materials
 */
export class KHR_materials_sheen implements __IGLTFExporterExtensionV2 {
  readonly name: "KHR_materials_sheen";
  enabled: boolean;
  required: boolean;

  /**
   * Exports sheen properties
   */
  postExportMaterialAsync(
    context: string,
    material: any,
    babylonMaterial: any
  ): Promise<void>;
}

/**
 * KHR_materials_specular extension
 * Controls specular reflection
 */
export class KHR_materials_specular implements __IGLTFExporterExtensionV2 {
  readonly name: "KHR_materials_specular";
  enabled: boolean;
  required: boolean;

  /**
   * Exports specular properties
   */
  postExportMaterialAsync(
    context: string,
    material: any,
    babylonMaterial: any
  ): Promise<void>;
}

/**
 * KHR_materials_transmission extension
 * Enables transparency via refraction
 */
export class KHR_materials_transmission implements __IGLTFExporterExtensionV2 {
  readonly name: "KHR_materials_transmission";
  enabled: boolean;
  required: boolean;

  /**
   * Exports transmission properties
   */
  postExportMaterialAsync(
    context: string,
    material: any,
    babylonMaterial: any
  ): Promise<void>;
}

/**
 * KHR_materials_unlit extension
 * Defines unlit materials (no lighting calculations)
 */
export class KHR_materials_unlit implements __IGLTFExporterExtensionV2 {
  readonly name: "KHR_materials_unlit";
  enabled: boolean;
  required: boolean;

  /**
   * Marks material as unlit
   */
  postExportMaterialAsync(
    context: string,
    material: any,
    babylonMaterial: any
  ): Promise<void>;
}

/**
 * KHR_materials_volume extension
 * Adds volumetric properties for subsurface scattering
 */
export class KHR_materials_volume implements __IGLTFExporterExtensionV2 {
  readonly name: "KHR_materials_volume";
  enabled: boolean;
  required: boolean;

  /**
   * Exports volume properties
   */
  postExportMaterialAsync(
    context: string,
    material: any,
    babylonMaterial: any
  ): Promise<void>;
}

/**
 * KHR_texture_transform extension
 * Allows texture coordinate transformations (offset, rotation, scale)
 */
export class KHR_texture_transform implements __IGLTFExporterExtensionV2 {
  readonly name: "KHR_texture_transform";
  enabled: boolean;
  required: boolean;

  /**
   * Exports texture transform data
   */
  postExportMaterialAsync(
    context: string,
    material: any,
    babylonMaterial: any
  ): Promise<void>;
}