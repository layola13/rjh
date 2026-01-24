/**
 * glTF loader module exports
 * Provides glTF 1.0 and 2.0 file loading capabilities for Babylon.js
 */

/**
 * glTF 1.0 specification loader namespace
 * Contains types and loaders for legacy glTF 1.0 format
 */
export * as GLTF1 from './1.0/index';

/**
 * glTF 2.0 specification loader namespace
 * Contains types and loaders for current glTF 2.0 format
 */
export * as GLTF2 from './2.0/index';

/**
 * Main glTF file loader class
 * Handles parsing and loading of glTF/GLB files into Babylon.js scene
 */
export { GLTFFileLoader } from './glTFFileLoader';

/**
 * Enum defining animation start behavior when loading glTF files
 * Controls whether animations auto-play, play first only, or remain paused
 */
export { GLTFLoaderAnimationStartMode } from './glTFFileLoader';

/**
 * Enum defining coordinate system conversion mode
 * Controls transformation between glTF right-handed and Babylon.js left-handed coordinate systems
 */
export { GLTFLoaderCoordinateSystemMode } from './glTFFileLoader';

/**
 * Enum representing the current state of the glTF loader
 * Tracks loading lifecycle: loading, ready, complete, error states
 */
export { GLTFLoaderState } from './glTFFileLoader';

/**
 * glTF validation utilities
 * Provides schema validation and diagnostic tools for glTF files
 */
export { GLTFValidation } from './glTFValidation';