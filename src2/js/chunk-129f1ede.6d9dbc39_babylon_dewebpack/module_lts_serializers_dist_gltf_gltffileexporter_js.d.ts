/**
 * GLTF exporter extension interface marker
 * 
 * This module exports a constant that serves as a type identifier or registry key
 * for GLTF exporter extensions in the Babylon.js serialization system.
 * 
 * @module glTFFileExporter
 * @packageDocumentation
 */

/**
 * Internal identifier for GLTF exporter extension interface.
 * Used as a unique marker or type discriminator in the extension system.
 * 
 * @remarks
 * This constant is typically used internally by the framework to identify
 * and register GLTF exporter extension implementations.
 * 
 * @public
 */
export declare const __IGLTFExporterExtension: 0;

/**
 * Type alias for the GLTF exporter extension identifier.
 * Represents the literal type of the extension marker.
 * 
 * @public
 */
export type IGLTFExporterExtension = typeof __IGLTFExporterExtension;