/**
 * Legacy loaders module for Babylon.js
 * Re-exports various 3D file format loaders for backward compatibility
 */

// GLTF 1.0 loader namespace
export namespace GLTF1 {
  // Add GLTF1-specific types and interfaces here based on implementation
}

// GLTF 2.0 loader namespace
export namespace GLTF2 {
  // Add GLTF2-specific types and interfaces here based on implementation
}

/**
 * Animation start mode for GLTF loader
 */
export enum GLTFLoaderAnimationStartMode {
  /** Do not start animations */
  NONE = 0,
  /** Start first animation */
  FIRST = 1,
  /** Start all animations */
  ALL = 2
}

/**
 * Coordinate system mode for GLTF loader
 */
export enum GLTFLoaderCoordinateSystemMode {
  /** Automatically detect coordinate system */
  AUTO = 0,
  /** Force right-handed coordinate system */
  FORCE_RIGHT_HANDED = 1
}

/**
 * State of the GLTF loader
 */
export enum GLTFLoaderState {
  /** Loader is ready */
  READY = 0,
  /** Loader is loading */
  LOADING = 1,
  /** Loader has completed */
  COMPLETE = 2
}

/**
 * GLTF validation utilities
 */
export interface GLTFValidation {
  /**
   * Validates a GLTF file
   * @param data - The GLTF data to validate
   * @param schema - Optional schema version
   * @returns Validation result
   */
  validate(data: ArrayBuffer | string, schema?: string): Promise<ValidationResult>;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  /** Whether validation passed */
  valid: boolean;
  /** Validation errors if any */
  errors?: ValidationError[];
  /** Validation warnings if any */
  warnings?: ValidationWarning[];
}

/**
 * Validation error details
 */
export interface ValidationError {
  /** Error message */
  message: string;
  /** Error code */
  code?: string;
}

/**
 * Validation warning details
 */
export interface ValidationWarning {
  /** Warning message */
  message: string;
  /** Warning code */
  code?: string;
}

/**
 * GLTF file loader class
 * Handles loading and parsing of glTF/glb files
 */
export class GLTFFileLoader {
  /**
   * Name of the loader
   */
  readonly name: string;

  /**
   * Animation start mode
   */
  animationStartMode: GLTFLoaderAnimationStartMode;

  /**
   * Coordinate system mode
   */
  coordinateSystemMode: GLTFLoaderCoordinateSystemMode;

  /**
   * Current loader state
   */
  readonly state: GLTFLoaderState;

  /**
   * Validation instance
   */
  validation?: GLTFValidation;

  /**
   * Creates a new GLTF file loader instance
   */
  constructor();
}

/**
 * MTL (Material Template Library) file loader
 * Handles loading of OBJ material files
 */
export class MTLFileLoader {
  /**
   * Name of the loader
   */
  readonly name: string;

  /**
   * Creates a new MTL file loader instance
   */
  constructor();
}

/**
 * OBJ file loader
 * Handles loading and parsing of Wavefront OBJ files
 */
export class OBJFileLoader {
  /**
   * Name of the loader
   */
  readonly name: string;

  /**
   * Associated MTL loader
   */
  materialLoader?: MTLFileLoader;

  /**
   * Creates a new OBJ file loader instance
   */
  constructor();
}

/**
 * STL (Stereolithography) file loader
 * Handles loading of STL files in ASCII and binary formats
 */
export class STLFileLoader {
  /**
   * Name of the loader
   */
  readonly name: string;

  /**
   * Creates a new STL file loader instance
   */
  constructor();
}

/**
 * Solid parser for STL files
 * Parses ASCII STL solid format
 */
export class SolidParser {
  /**
   * Parses solid STL data
   * @param data - The STL data to parse
   * @returns Parsed geometry data
   */
  parse(data: string): SolidParserResult;
}

/**
 * Result from solid parser
 */
export interface SolidParserResult {
  /** Vertex positions */
  positions: Float32Array;
  /** Vertex normals */
  normals: Float32Array;
  /** Vertex indices */
  indices?: Uint32Array;
}