/**
 * Legacy glTF loader module for Babylon.js
 * Re-exports core glTF loader types and validation utilities
 */

// Core glTF file loader types and classes
export { 
  GLTFFileLoader,
  GLTFLoaderAnimationStartMode,
  GLTFLoaderCoordinateSystemMode,
  GLTFLoaderState
} from './glTF/glTFFileLoader';

// glTF validation utilities
export { GLTFValidation } from './glTF/glTFValidation';

/**
 * Enum defining how animations should start when loading glTF files
 */
export enum GLTFLoaderAnimationStartMode {
  /** Do not start any animations */
  NONE = 0,
  /** Start the first animation */
  FIRST = 1,
  /** Start all animations */
  ALL = 2
}

/**
 * Enum defining coordinate system conversion modes for glTF loader
 */
export enum GLTFLoaderCoordinateSystemMode {
  /** Automatically determine coordinate system conversion */
  AUTO = 0,
  /** Force right-handed coordinate system */
  FORCE_RIGHT_HANDED = 1
}

/**
 * Enum representing the current state of the glTF loader
 */
export enum GLTFLoaderState {
  /** Loader is ready to load */
  READY = 0,
  /** Loader is currently loading */
  LOADING = 1,
  /** Loader has completed loading */
  COMPLETE = 2
}

/**
 * Main glTF file loader class for loading glTF/GLB files into Babylon.js scenes
 */
export interface GLTFFileLoader {
  /** The name of the loader */
  readonly name: string;
  
  /** Current state of the loader */
  readonly state: GLTFLoaderState;
  
  /** Animation start mode */
  animationStartMode: GLTFLoaderAnimationStartMode;
  
  /** Coordinate system mode */
  coordinateSystemMode: GLTFLoaderCoordinateSystemMode;
  
  /** Whether to compile materials */
  compileMaterials: boolean;
  
  /** Whether to compile shadow generators */
  compileShadowGenerators: boolean;
  
  /** Whether to use clip plane */
  useClipPlane: boolean;
  
  /** Whether to validate the glTF file */
  validate: boolean;
}

/**
 * glTF validation utilities for validating glTF files against the specification
 */
export interface GLTFValidation {
  /**
   * Validates a glTF file
   * @param data - The glTF file data to validate
   * @param rootUrl - The root URL for resolving external resources
   * @param fileName - The name of the file being validated
   * @param getExternalResource - Callback to get external resources
   * @returns Promise that resolves with validation report
   */
  validateAsync(
    data: ArrayBuffer | string,
    rootUrl: string,
    fileName: string,
    getExternalResource?: (uri: string) => Promise<ArrayBuffer>
  ): Promise<ValidationReport>;
}

/**
 * glTF validation report containing issues found during validation
 */
export interface ValidationReport {
  /** URI of the validated file */
  uri: string;
  
  /** Array of validation issues */
  issues: ValidationIssue[];
  
  /** Number of errors found */
  numErrors: number;
  
  /** Number of warnings found */
  numWarnings: number;
  
  /** Number of informational messages */
  numInfos: number;
  
  /** Number of hints */
  numHints: number;
}

/**
 * Individual validation issue
 */
export interface ValidationIssue {
  /** Severity of the issue */
  severity: 0 | 1 | 2 | 3; // Error | Warning | Info | Hint
  
  /** JSON pointer to the problematic element */
  pointer: string;
  
  /** Issue message */
  message: string;
  
  /** Issue code */
  code?: string;
}