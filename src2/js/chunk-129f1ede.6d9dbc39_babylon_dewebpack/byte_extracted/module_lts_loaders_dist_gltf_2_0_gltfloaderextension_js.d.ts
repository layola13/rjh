/**
 * glTF 2.0 Loader Extension Module
 * 
 * This module provides the base extension interface and utilities for glTF 2.0 loader extensions.
 * Extensions allow customization of the glTF loading process for handling vendor-specific or
 * experimental features in glTF assets.
 * 
 * @module glTFLoaderExtension
 * @packageDocumentation
 */

/**
 * Base interface for glTF 2.0 loader extensions.
 * 
 * Extensions can override specific loading behaviors for nodes, materials, textures,
 * and other glTF elements. They are registered with the glTF loader and invoked
 * during the asset loading pipeline.
 */
export interface IGLTFLoaderExtension {
  /**
   * The name of the extension as it appears in the glTF file's extensionsUsed array.
   * @example "KHR_materials_pbrSpecularGlossiness"
   */
  readonly name: string;

  /**
   * Whether this extension is enabled. If false, the extension will be ignored.
   * @defaultValue true
   */
  enabled: boolean;

  /**
   * The order in which this extension should be applied relative to other extensions.
   * Lower values execute first.
   * @defaultValue 0
   */
  order?: number;

  /**
   * Called when the extension is disposed. Use this to clean up resources.
   */
  dispose?(): void;
}

/**
 * Re-export marker indicating this is an ES module.
 * This module has no runtime implementation in the original webpack bundle.
 */
export {};