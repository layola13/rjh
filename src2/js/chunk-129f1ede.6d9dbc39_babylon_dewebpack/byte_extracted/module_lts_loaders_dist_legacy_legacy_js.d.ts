/**
 * Legacy loaders module providing backward compatibility for various 3D file format loaders.
 * This module re-exports loader classes and enums from the main loaders package.
 * @module LegacyLoaders
 */

/**
 * GLTF 1.0 loader namespace containing legacy GLTF 1.0 format support.
 */
export declare const GLTF1: typeof import("@lts/loaders").GLTF1;

/**
 * GLTF 2.0 loader namespace containing GLTF 2.0 format support.
 */
export declare const GLTF2: typeof import("@lts/loaders").GLTF2;

/**
 * Main GLTF file loader class for loading GLTF/GLB files.
 * Supports both GLTF 1.0 and 2.0 formats.
 */
export declare const GLTFFileLoader: typeof import("@lts/loaders").GLTFFileLoader;

/**
 * Enum defining how animations should be started when a GLTF file is loaded.
 * @enum {number}
 */
export declare const GLTFLoaderAnimationStartMode: typeof import("@lts/loaders").GLTFLoaderAnimationStartMode;

/**
 * Enum defining the coordinate system mode for GLTF loader.
 * Controls how coordinate system conversion is handled.
 * @enum {number}
 */
export declare const GLTFLoaderCoordinateSystemMode: typeof import("@lts/loaders").GLTFLoaderCoordinateSystemMode;

/**
 * Enum representing the current state of the GLTF loader.
 * @enum {number}
 */
export declare const GLTFLoaderState: typeof import("@lts/loaders").GLTFLoaderState;

/**
 * GLTF validation utilities for validating GLTF files against the specification.
 */
export declare const GLTFValidation: typeof import("@lts/loaders").GLTFValidation;

/**
 * MTL (Material Template Library) file loader for loading Wavefront MTL material files.
 * Typically used in conjunction with OBJ files.
 */
export declare const MTLFileLoader: typeof import("@lts/loaders").MTLFileLoader;

/**
 * OBJ (Wavefront Object) file loader for loading Wavefront OBJ 3D model files.
 */
export declare const OBJFileLoader: typeof import("@lts/loaders").OBJFileLoader;

/**
 * STL (Stereolithography) file loader for loading STL 3D model files.
 * Supports both ASCII and binary STL formats.
 */
export declare const STLFileLoader: typeof import("@lts/loaders").STLFileLoader;

/**
 * Parser for solid-based STL files (ASCII STL format).
 * Handles parsing of ASCII STL file structure.
 */
export declare const SolidParser: typeof import("@lts/loaders").SolidParser;