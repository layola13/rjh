/**
 * GLTF Exporter Extension Interface
 * 
 * This module provides the core interface for glTF 2.0 exporter extensions.
 * Extensions allow customization of the glTF export process by hooking into
 * various stages of serialization.
 * 
 * @module glTFExporterExtension
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions
 */

/**
 * Base interface for glTF 2.0 exporter extensions.
 * 
 * Implementations of this interface can extend the glTF export functionality
 * by processing nodes, materials, meshes, and other scene elements during
 * the serialization process.
 * 
 * @public
 */
export interface IGLTFExporterExtensionV2 {
  /**
   * The unique name of the extension (e.g., "KHR_materials_unlit").
   */
  readonly name: string;

  /**
   * Whether this extension is enabled.
   * @defaultValue true
   */
  enabled?: boolean;

  /**
   * Whether this extension is required for proper asset loading.
   * If true, the extension name will be added to the glTF's "extensionsRequired" array.
   * @defaultValue false
   */
  required?: boolean;
}

/**
 * Internal extension registry counter.
 * Used for tracking registered exporter extensions.
 * 
 * @internal
 */
export const __IGLTFExporterExtensionV2: number = 0;