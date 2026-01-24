/**
 * Base interface for glTF Exporter Extension V2
 * 
 * This module defines the core extension interface for the glTF 2.0 exporter.
 * Extensions can implement this interface to add custom functionality during the export process.
 * 
 * @module glTFExporterExtension
 * @see {@link https://github.com/KhronosGroup/glTF/tree/master/extensions glTF Extensions Specification}
 */

/**
 * Internal symbol used to identify glTF exporter extension implementations.
 * This is typically used as a unique identifier for the extension system.
 * 
 * @internal
 */
export declare const __IGLTFExporterExtensionV2: 0;

/**
 * Type representing the glTF Exporter Extension V2 identifier
 */
export type IGLTFExporterExtensionV2 = typeof __IGLTFExporterExtensionV2;