/**
 * Legacy glTF2 Serializer Module
 * Provides backward compatibility for GLTF2 exporter and extensions
 */

declare module '@babylonjs/serializers/legacy/legacy-glTF2Serializer' {
  // Core GLTF2 Export Classes
  
  /**
   * Class for holding and exporting glTF data
   */
  export class GLTFData {
    /**
     * Creates a new GLTFData instance
     * @param glTFFiles - Object containing the glTF JSON and binary data
     */
    constructor(glTFFiles: object);
  }

  /**
   * Main class for exporting scenes to glTF 2.0 format
   */
  export class GLTF2Export {
    /**
     * Exports a scene to glTF 2.0 format
     * @param scene - The scene to export
     * @param filePrefix - Prefix for the output files
     * @param options - Export options
     * @returns Promise resolving to GLTFData
     */
    static ExportAsync(scene: any, filePrefix: string, options?: any): Promise<GLTFData>;
  }

  // Internal Utility Classes
  
  /**
   * Binary writer for glTF data serialization
   */
  export class _BinaryWriter {
    /**
     * Gets the current byte offset
     */
    getByteOffset(): number;
    
    /**
     * Writes binary data
     * @param data - Data to write
     */
    write(data: ArrayBuffer | ArrayBufferView): void;
  }

  /**
   * Core glTF exporter implementation
   */
  export class _Exporter {
    /**
     * Creates a new exporter instance
     * @param scene - Scene to export
     * @param options - Export options
     */
    constructor(scene: any, options?: any);
  }

  /**
   * Handles animation data export for glTF
   */
  export class _GLTFAnimation {
    /**
     * Generates animation data for glTF export
     * @param node - Node containing animations
     * @param exporter - Exporter instance
     */
    static GenerateAnimations(node: any, exporter: _Exporter): void;
  }

  /**
   * Handles material export and conversion for glTF
   */
  export class _GLTFMaterialExporter {
    /**
     * Creates a new material exporter
     * @param exporter - Parent exporter instance
     */
    constructor(exporter: _Exporter);
    
    /**
     * Exports a material to glTF format
     * @param material - Material to export
     * @returns Material index in glTF
     */
    exportMaterial(material: any): number;
  }

  /**
   * Utility functions for glTF export operations
   */
  export class _GLTFUtilities {
    /**
     * Converts rotation quaternion to glTF format
     * @param rotation - Rotation quaternion
     * @returns Converted rotation array
     */
    static ConvertRotation(rotation: any): number[];
  }

  // Extension Interfaces
  
  /**
   * Base interface for glTF exporter extensions (legacy)
   */
  export interface __IGLTFExporterExtension {
    /**
     * Name of the extension
     */
    readonly name: string;
    
    /**
     * Whether the extension is enabled
     */
    enabled: boolean;
  }

  /**
   * Interface for glTF 2.0 exporter extensions
   */
  export interface __IGLTFExporterExtensionV2 extends __IGLTFExporterExtension {
    /**
     * Callback before exporting a node
     * @param context - Export context
     * @param node - Node being exported
     * @returns Promise or void
     */
    preExportNodeAsync?(context: any, node: any): Promise<void> | void;
    
    /**
     * Callback after exporting a node
     * @param context - Export context
     * @param node - Exported node data
     * @returns Promise or void
     */
    postExportNodeAsync?(context: any, node: any): Promise<void> | void;
  }

  // glTF Extensions
  
  /**
   * EXT_mesh_gpu_instancing extension for GPU instancing support
   */
  export class EXT_mesh_gpu_instancing implements __IGLTFExporterExtensionV2 {
    readonly name: 'EXT_mesh_gpu_instancing';
    enabled: boolean;
  }

  /**
   * KHR_lights_punctual extension for punctual lights
   */
  export class KHR_lights_punctual implements __IGLTFExporterExtensionV2 {
    readonly name: 'KHR_lights_punctual';
    enabled: boolean;
  }

  /**
   * KHR_materials_clearcoat extension for clear coat materials
   */
  export class KHR_materials_clearcoat implements __IGLTFExporterExtensionV2 {
    readonly name: 'KHR_materials_clearcoat';
    enabled: boolean;
  }

  /**
   * KHR_materials_emissive_strength extension for enhanced emissive strength
   */
  export class KHR_materials_emissive_strength implements __IGLTFExporterExtensionV2 {
    readonly name: 'KHR_materials_emissive_strength';
    enabled: boolean;
  }

  /**
   * KHR_materials_ior extension for index of refraction
   */
  export class KHR_materials_ior implements __IGLTFExporterExtensionV2 {
    readonly name: 'KHR_materials_ior';
    enabled: boolean;
  }

  /**
   * KHR_materials_iridescence extension for iridescence effects
   */
  export class KHR_materials_iridescence implements __IGLTFExporterExtensionV2 {
    readonly name: 'KHR_materials_iridescence';
    enabled: boolean;
  }

  /**
   * KHR_materials_sheen extension for sheen materials
   */
  export class KHR_materials_sheen implements __IGLTFExporterExtensionV2 {
    readonly name: 'KHR_materials_sheen';
    enabled: boolean;
  }

  /**
   * KHR_materials_specular extension for specular materials
   */
  export class KHR_materials_specular implements __IGLTFExporterExtensionV2 {
    readonly name: 'KHR_materials_specular';
    enabled: boolean;
  }

  /**
   * KHR_materials_transmission extension for transmission/transparency
   */
  export class KHR_materials_transmission implements __IGLTFExporterExtensionV2 {
    readonly name: 'KHR_materials_transmission';
    enabled: boolean;
  }

  /**
   * KHR_materials_unlit extension for unlit materials
   */
  export class KHR_materials_unlit implements __IGLTFExporterExtensionV2 {
    readonly name: 'KHR_materials_unlit';
    enabled: boolean;
  }

  /**
   * KHR_materials_volume extension for volumetric materials
   */
  export class KHR_materials_volume implements __IGLTFExporterExtensionV2 {
    readonly name: 'KHR_materials_volume';
    enabled: boolean;
  }

  /**
   * KHR_texture_transform extension for texture transformations
   */
  export class KHR_texture_transform implements __IGLTFExporterExtensionV2 {
    readonly name: 'KHR_texture_transform';
    enabled: boolean;
  }
}