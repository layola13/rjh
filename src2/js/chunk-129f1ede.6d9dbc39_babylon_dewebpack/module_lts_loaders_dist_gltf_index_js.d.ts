/**
 * glTF loader module providing support for glTF 1.0 and 2.0 file formats
 * @module glTF
 */

/**
 * glTF 1.0 loader implementation
 * Contains legacy glTF 1.0 format support
 */
export * as GLTF1 from './1.0/index.js';

/**
 * glTF 2.0 loader implementation
 * Contains modern glTF 2.0 format support with PBR materials
 */
export * as GLTF2 from './2.0/index.js';

/**
 * Main glTF file loader class
 * Handles loading and parsing of glTF/GLB files
 */
export { GLTFFileLoader } from './glTFFileLoader.js';

/**
 * Enumeration defining animation start behavior modes
 * Controls when and how animations begin playing after load
 */
export { GLTFLoaderAnimationStartMode } from './glTFFileLoader.js';

/**
 * Enumeration defining coordinate system conversion modes
 * Handles transformation between glTF right-handed and engine coordinate systems
 */
export { GLTFLoaderCoordinateSystemMode } from './glTFFileLoader.js';

/**
 * Enumeration representing the current state of the glTF loader
 * Tracks loading progress through various stages
 */
export { GLTFLoaderState } from './glTFFileLoader.js';

/**
 * glTF validation utilities
 * Provides schema validation and error checking for glTF files
 */
export { GLTFValidation } from './glTFValidation.js';