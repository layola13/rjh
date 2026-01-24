/**
 * Legacy glTF loader module that re-exports core glTF functionality.
 * This module provides backward compatibility for older import paths.
 * 
 * @module legacy-glTF
 */

/**
 * Defines the animation start mode for glTF animations.
 * Controls how animations are played when a glTF model is loaded.
 */
export enum GLTFLoaderAnimationStartMode {
  /** Do not start animations automatically */
  NONE = 0,
  /** Start the first animation automatically */
  FIRST = 1,
  /** Start all animations automatically */
  ALL = 2
}

/**
 * Defines the coordinate system mode for glTF loader.
 * Determines how the coordinate system is handled during import.
 */
export enum GLTFLoaderCoordinateSystemMode {
  /** Automatically determine coordinate system */
  AUTO = 0,
  /** Force right-handed coordinate system */
  FORCE_RIGHT_HANDED = 1
}

/**
 * Represents the current state of the glTF loader.
 */
export enum GLTFLoaderState {
  /** Loader is ready to load a file */
  LOADING = 0,
  /** Loader is currently loading */
  READY = 1,
  /** Loading completed successfully */
  COMPLETE = 2
}

/**
 * Configuration interface for glTF file loader options.
 */
export interface IGLTFLoaderOptions {
  /** Animation start mode */
  animationStartMode?: GLTFLoaderAnimationStartMode;
  /** Coordinate system mode */
  coordinateSystemMode?: GLTFLoaderCoordinateSystemMode;
  /** Enable validation */
  validate?: boolean;
  /** Compile materials in parallel */
  compileMaterials?: boolean;
  /** Compile shadow generators */
  compileShadowGenerators?: boolean;
  /** Use clip plane */
  useClipPlane?: boolean;
  /** Always compute bounding box */
  alwaysComputeBoundingBox?: boolean;
  /** Always compute skeleton root node */
  alwaysComputeSkeletonRootNode?: boolean;
}

/**
 * Main glTF file loader class.
 * Handles loading and parsing of glTF 2.0 files.
 */
export declare class GLTFFileLoader {
  /** Loader name identifier */
  readonly name: string;
  
  /** Supported file extensions */
  readonly extensions: string[];
  
  /** Animation start mode */
  animationStartMode: GLTFLoaderAnimationStartMode;
  
  /** Coordinate system mode */
  coordinateSystemMode: GLTFLoaderCoordinateSystemMode;
  
  /** Current loader state */
  readonly state: GLTFLoaderState;
  
  /** Enable validation */
  validate: boolean;
  
  /** Compile materials in parallel */
  compileMaterials: boolean;
  
  /** Compile shadow generators */
  compileShadowGenerators: boolean;
  
  /** Use clip plane */
  useClipPlane: boolean;
  
  /**
   * Creates a new GLTFFileLoader instance.
   * @param options - Optional loader configuration
   */
  constructor(options?: IGLTFLoaderOptions);
  
  /**
   * Dispose of the loader and free resources.
   */
  dispose(): void;
}

/**
 * glTF validation utilities.
 * Provides methods to validate glTF files against the specification.
 */
export declare class GLTFValidation {
  /**
   * Validates a glTF file.
   * @param data - The glTF data to validate (ArrayBuffer or JSON object)
   * @param rootUrl - The root URL for resolving external resources
   * @param fileName - The file name being validated
   * @param getExternalResource - Optional callback to retrieve external resources
   * @returns Promise that resolves with validation report
   */
  static ValidateAsync(
    data: ArrayBuffer | Record<string, unknown>,
    rootUrl: string,
    fileName: string,
    getExternalResource?: (uri: string) => Promise<ArrayBuffer>
  ): Promise<IGLTFValidationResults>;
}

/**
 * Validation results interface.
 * Contains the results of glTF validation.
 */
export interface IGLTFValidationResults {
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Information messages */
  infos?: string[];
  /** Validation succeeded */
  valid: boolean;
}