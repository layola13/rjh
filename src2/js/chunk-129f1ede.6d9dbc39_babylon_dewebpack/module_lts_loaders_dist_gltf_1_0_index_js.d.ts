/**
 * glTF 1.0 Loader Module
 * 
 * This module provides the complete API for loading and parsing glTF 1.0 format files.
 * It includes core loaders, extensions, utilities, and type definitions for the glTF 1.0 specification.
 * 
 * @module glTF/1.0
 */

// ============================================================================
// Enumerations from glTFLoaderInterfaces
// ============================================================================

/**
 * Blending function modes for material rendering
 */
export enum EBlendingFunction {
  /** Zero blending factor */
  ZERO = 0,
  /** One blending factor */
  ONE = 1,
  /** Source color blending */
  SRC_COLOR = 768,
  /** One minus source color */
  ONE_MINUS_SRC_COLOR = 769,
  /** Source alpha blending */
  SRC_ALPHA = 770,
  /** One minus source alpha */
  ONE_MINUS_SRC_ALPHA = 771,
  /** Destination alpha blending */
  DST_ALPHA = 772,
  /** One minus destination alpha */
  ONE_MINUS_DST_ALPHA = 773,
  /** Destination color blending */
  DST_COLOR = 774,
  /** One minus destination color */
  ONE_MINUS_DST_COLOR = 775,
  /** Source alpha saturate */
  SRC_ALPHA_SATURATE = 776
}

/**
 * Component data types for vertex attributes and indices
 */
export enum EComponentType {
  /** 8-bit signed byte */
  BYTE = 5120,
  /** 8-bit unsigned byte */
  UNSIGNED_BYTE = 5121,
  /** 16-bit signed short */
  SHORT = 5122,
  /** 16-bit unsigned short */
  UNSIGNED_SHORT = 5123,
  /** 32-bit signed integer */
  INT = 5124,
  /** 32-bit unsigned integer */
  UNSIGNED_INT = 5125,
  /** 32-bit floating point */
  FLOAT = 5126
}

/**
 * Face culling modes for rendering optimization
 */
export enum ECullingType {
  /** Cull front-facing polygons */
  FRONT = 1028,
  /** Cull back-facing polygons */
  BACK = 1029,
  /** Cull both front and back faces */
  FRONT_AND_BACK = 1032
}

/**
 * Parameter types for shader uniforms and material properties
 */
export enum EParameterType {
  /** 8-bit signed byte */
  BYTE = 5120,
  /** 8-bit unsigned byte */
  UNSIGNED_BYTE = 5121,
  /** 16-bit signed short */
  SHORT = 5122,
  /** 16-bit unsigned short */
  UNSIGNED_SHORT = 5123,
  /** 32-bit signed integer */
  INT = 5124,
  /** 32-bit unsigned integer */
  UNSIGNED_INT = 5125,
  /** 32-bit floating point */
  FLOAT = 5126,
  /** 2D floating point vector */
  FLOAT_VEC2 = 35664,
  /** 3D floating point vector */
  FLOAT_VEC3 = 35665,
  /** 4D floating point vector */
  FLOAT_VEC4 = 35666,
  /** 2D integer vector */
  INT_VEC2 = 35667,
  /** 3D integer vector */
  INT_VEC3 = 35668,
  /** 4D integer vector */
  INT_VEC4 = 35669,
  /** Boolean value */
  BOOL = 35670,
  /** 2D boolean vector */
  BOOL_VEC2 = 35671,
  /** 3D boolean vector */
  BOOL_VEC3 = 35672,
  /** 4D boolean vector */
  BOOL_VEC4 = 35673,
  /** 2x2 floating point matrix */
  FLOAT_MAT2 = 35674,
  /** 3x3 floating point matrix */
  FLOAT_MAT3 = 35675,
  /** 4x4 floating point matrix */
  FLOAT_MAT4 = 35676,
  /** 2D texture sampler */
  SAMPLER_2D = 35678
}

/**
 * Shader types in the graphics pipeline
 */
export enum EShaderType {
  /** Fragment/pixel shader */
  FRAGMENT = 35632,
  /** Vertex shader */
  VERTEX = 35633
}

/**
 * Texture filtering modes for minification and magnification
 */
export enum ETextureFilterType {
  /** Nearest neighbor filtering */
  NEAREST = 9728,
  /** Linear interpolation filtering */
  LINEAR = 9729,
  /** Nearest mipmap nearest filtering */
  NEAREST_MIPMAP_NEAREST = 9984,
  /** Linear mipmap nearest filtering */
  LINEAR_MIPMAP_NEAREST = 9985,
  /** Nearest mipmap linear filtering */
  NEAREST_MIPMAP_LINEAR = 9986,
  /** Trilinear filtering (linear mipmap linear) */
  LINEAR_MIPMAP_LINEAR = 9987
}

/**
 * Texture internal format specifications
 */
export enum ETextureFormat {
  /** Alpha channel only */
  ALPHA = 6406,
  /** RGB color channels */
  RGB = 6407,
  /** RGBA color channels with alpha */
  RGBA = 6408,
  /** Luminance (grayscale) */
  LUMINANCE = 6409,
  /** Luminance with alpha channel */
  LUMINANCE_ALPHA = 6410
}

/**
 * Texture coordinate wrapping modes
 */
export enum ETextureWrapMode {
  /** Clamp texture coordinates to [0, 1] range */
  CLAMP_TO_EDGE = 33071,
  /** Mirror texture coordinates at boundaries */
  MIRRORED_REPEAT = 33648,
  /** Repeat texture coordinates (tiling) */
  REPEAT = 10497
}

// ============================================================================
// Core Loader Classes
// ============================================================================

/**
 * Base class for glTF 1.0 loaders
 * Provides common functionality for loading and parsing glTF assets
 */
export class GLTFLoaderBase {
  /**
   * Loads a glTF file from the specified URL
   * @param url - The URL or path to the glTF file
   */
  public load(url: string): void;
  
  /**
   * Disposes of all resources associated with the loader
   */
  public dispose(): void;
}

/**
 * Main glTF 1.0 loader implementation
 * Handles loading of glTF 1.0 format files and their associated resources
 */
export class GLTFLoader extends GLTFLoaderBase {
  /**
   * Creates a new GLTFLoader instance
   */
  constructor();
  
  /**
   * Imports mesh data from a glTF file
   * @param meshesNames - Array of mesh names to import, or null for all meshes
   * @param scene - The Babylon.js scene to import into
   * @param data - The glTF file data
   * @param rootUrl - The root URL for resolving relative paths
   * @param onSuccess - Callback invoked on successful load
   * @param onProgress - Callback for load progress updates
   * @param onError - Callback invoked on load errors
   */
  public importMesh(
    meshesNames: string[] | null,
    scene: unknown,
    data: string | ArrayBuffer,
    rootUrl: string,
    onSuccess?: (meshes: unknown[], particleSystems: unknown[], skeletons: unknown[]) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (message: string) => void
  ): void;
}

/**
 * Base class for glTF loader extensions
 * Allows extending the loader with custom functionality for handling
 * specific glTF extensions or custom features
 */
export class GLTFLoaderExtension {
  /**
   * The name of the extension
   */
  public readonly name: string;
  
  /**
   * Loads vertex data for a mesh primitive
   * @param context - The loading context
   * @param primitive - The mesh primitive data
   * @param babylonMesh - The Babylon.js mesh to populate
   * @returns True if the extension handled the vertex data, false otherwise
   */
  public loadVertexDataAsync?(
    context: string,
    primitive: unknown,
    babylonMesh: unknown
  ): boolean;
  
  /**
   * Loads material data
   * @param context - The loading context
   * @param material - The material data
   * @param babylonMesh - The Babylon.js mesh using this material
   * @returns True if the extension handled the material, false otherwise
   */
  public loadMaterialAsync?(
    context: string,
    material: unknown,
    babylonMesh: unknown
  ): boolean;
}

// ============================================================================
// Extension Implementations
// ============================================================================

/**
 * Extension for loading binary glTF (.glb) files
 * Handles the binary container format that packages JSON and binary data
 */
export class GLTFBinaryExtension extends GLTFLoaderExtension {
  /**
   * Creates a new GLTFBinaryExtension instance
   */
  constructor();
  
  /**
   * The extension name identifier
   */
  public readonly name: "KHR_binary_glTF";
}

/**
 * Extension for the KHR_materials_common specification
 * Provides support for common material types like Lambert and Blinn-Phong
 */
export class GLTFMaterialsCommonExtension extends GLTFLoaderExtension {
  /**
   * Creates a new GLTFMaterialsCommonExtension instance
   */
  constructor();
  
  /**
   * The extension name identifier
   */
  public readonly name: "KHR_materials_common";
}

// ============================================================================
// Utility Classes
// ============================================================================

/**
 * Utility functions for glTF 1.0 loading and processing
 * Provides helper methods for common operations during glTF asset loading
 */
export class GLTFUtils {
  /**
   * Normalizes a glTF URI to an absolute URL
   * @param uri - The URI to normalize
   * @param rootUrl - The root URL for resolving relative paths
   * @returns The normalized absolute URL
   */
  public static NormalizeUri(uri: string, rootUrl: string): string;
  
  /**
   * Decodes a base64 data URI to binary data
   * @param dataUri - The data URI to decode
   * @returns The decoded binary data as ArrayBuffer
   */
  public static DecodeBase64(dataUri: string): ArrayBuffer;
  
  /**
   * Gets the byte stride for an accessor
   * @param accessor - The glTF accessor object
   * @returns The byte stride value
   */
  public static GetByteStrideFromType(accessor: unknown): number;
}