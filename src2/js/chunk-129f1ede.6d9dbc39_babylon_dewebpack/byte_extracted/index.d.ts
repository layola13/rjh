/**
 * Babylon.js LTS Loaders Bundle - Type Definitions
 * 
 * This module aggregates all loader functionality for Babylon.js including:
 * - glTF 1.0 and 2.0 loaders with extensions
 * - OBJ file loader with MTL material support
 * - STL file loader
 * - Various glTF extensions (KHR, EXT, MSFT)
 */

/**
 * Re-exports all types from the byte module
 * This includes glTF 1.0 loader interfaces and related types
 */
export * from './byte';

/**
 * OBJ Loader Module
 * Provides functionality for loading Wavefront OBJ files
 */
export namespace OBJ {
  /**
   * Configuration options for OBJ file loading
   */
  export interface IOBJLoadingOptions {
    /** Skip materials loading */
    skipMaterials?: boolean;
    /** Material loading options */
    materialLoadingOptions?: unknown;
    /** Optimize mesh data */
    optimizeWithUV?: boolean;
    /** Optimize normals */
    optimizeNormals?: boolean;
    /** Import vertex colors */
    importVertexColors?: boolean;
    /** Compute normals */
    computeNormals?: boolean;
    /** UV coordinate scaling */
    UVScaling?: { u: number; v: number };
  }
}

/**
 * glTF Loader Module
 * Provides functionality for loading glTF 1.0 and 2.0 files
 */
export namespace GLTF {
  /**
   * glTF file loader validation state
   */
  export enum GLTFValidationState {
    /** Validation not performed */
    None = 0,
    /** Validation in progress */
    Validating = 1,
    /** Validation completed successfully */
    Valid = 2,
    /** Validation failed */
    Invalid = 3
  }

  /**
   * glTF loader extension interface
   */
  export interface IGLTFLoaderExtension {
    /** Extension name */
    readonly name: string;
    /** Whether extension is enabled */
    enabled: boolean;
    /** Extension order/priority */
    order?: number;
  }

  /**
   * glTF 2.0 loader animation targets
   */
  export interface IAnimationTargetInfo {
    /** Target animation channel */
    target: unknown;
    /** Animation properties */
    properties?: string[];
  }
}

/**
 * glTF 2.0 Extensions
 * Support for various official and vendor-specific glTF extensions
 */
export namespace GLTF2 {
  /**
   * Khronos Group (KHR) Extensions
   */
  export namespace KHR {
    /** Draco mesh compression support */
    export const KHR_draco_mesh_compression: string;
    /** PBR specular-glossiness material model */
    export const KHR_materials_pbrSpecularGlossiness: string;
    /** Unlit material extension */
    export const KHR_materials_unlit: string;
    /** Clearcoat material layer */
    export const KHR_materials_clearcoat: string;
    /** Sheen material property */
    export const KHR_materials_sheen: string;
    /** Material specular properties */
    export const KHR_materials_specular: string;
    /** Index of refraction */
    export const KHR_materials_ior: string;
    /** Material iridescence effect */
    export const KHR_materials_iridescence: string;
    /** Material volume/thickness */
    export const KHR_materials_volume: string;
    /** Material translucency */
    export const KHR_materials_translucency: string;
    /** Material transmission (glass/transparency) */
    export const KHR_materials_transmission: string;
    /** Emissive strength multiplier */
    export const KHR_materials_emissive_strength: string;
    /** Material variants support */
    export const KHR_materials_variants: string;
    /** Mesh quantization/compression */
    export const KHR_mesh_quantization: string;
    /** Punctual lights (point, spot, directional) */
    export const KHR_lights_punctual: string;
    /** Texture coordinate transformation */
    export const KHR_texture_transform: string;
    /** Basis Universal texture compression */
    export const KHR_texture_basisu: string;
    /** XMP metadata support */
    export const KHR_xmp_json_ld: string;
    /** Animation pointer for custom properties */
    export const KHR_animation_pointer: string;
  }

  /**
   * Multi-Vendor Extensions (EXT)
   */
  export namespace EXT {
    /** WebP texture format support */
    export const EXT_texture_webp: string;
    /** Image-based lighting */
    export const EXT_lights_image_based: string;
    /** GPU instancing for meshes */
    export const EXT_mesh_gpu_instancing: string;
    /** Meshopt compression */
    export const EXT_meshopt_compression: string;
  }

  /**
   * Microsoft (MSFT) Extensions
   */
  export namespace MSFT {
    /** Level of detail support */
    export const MSFT_lod: string;
    /** sRGB factor handling */
    export const MSFT_sRGBFactors: string;
    /** Audio emitter support */
    export const MSFT_audio_emitter: string;
    /** Minecraft mesh format */
    export const MSFT_minecraftMesh: string;
  }

  /**
   * Community Extensions
   */
  export namespace Extensions {
    /** Store glTF extras as Babylon metadata */
    export const ExtrasAsMetadata: string;
  }
}

/**
 * STL Loader Module
 * Provides functionality for loading STL (STereoLithography) files
 */
export namespace STL {
  /**
   * STL file format types
   */
  export enum STLFileFormat {
    /** ASCII text format */
    ASCII = 0,
    /** Binary format */
    Binary = 1
  }
}

/**
 * Legacy Module Exports
 * Backward compatibility exports for older API versions
 */
export namespace Legacy {
  /** Legacy glTF general exports */
  export const GLTF: unknown;
  /** Legacy glTF 1.0 specific exports */
  export const GLTF1: unknown;
  /** Legacy glTF 2.0 specific exports */
  export const GLTF2: unknown;
  /** Legacy OBJ file loader exports */
  export const OBJFileLoader: unknown;
  /** Legacy STL file loader exports */
  export const STLFileLoader: unknown;
}

/**
 * Core observable pattern implementation
 * Used throughout loaders for event handling and callbacks
 */
export interface IObservable<T> {
  /** Add an observer callback */
  add(callback: (eventData: T) => void): unknown;
  /** Remove an observer */
  remove(observer: unknown): boolean;
  /** Clear all observers */
  clear(): void;
  /** Notify all observers */
  notifyObservers(eventData: T): void;
}