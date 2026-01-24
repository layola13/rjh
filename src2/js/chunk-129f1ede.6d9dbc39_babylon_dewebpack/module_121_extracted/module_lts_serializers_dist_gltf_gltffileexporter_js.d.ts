/**
 * GLTF exporter extension interface identifier.
 * This constant is used as a marker or registry key for GLTF exporter extension implementations.
 * 
 * @module glTFFileExporter
 * @packageDocumentation
 */

/**
 * Interface identifier for GLTF exporter extensions.
 * Used to register and identify custom extensions that modify the GLTF export process.
 * 
 * @public
 * @constant
 */
export declare const __IGLTFExporterExtension: 0;

/**
 * Type representing the GLTF exporter extension interface.
 * Extensions implementing this interface can hook into the GLTF export pipeline
 * to add custom data, modify existing data, or perform additional processing.
 * 
 * @public
 */
export declare type IGLTFExporterExtension = typeof __IGLTFExporterExtension;