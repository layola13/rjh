/**
 * Babylon.js Serializers Type Definitions
 * 
 * This module provides type definitions for various 3D model serializers
 * including glTF 2.0, OBJ, and STL formats with their respective extensions.
 */

// ============================================================================
// Core Dependencies
// ============================================================================

import type { Vector2, Vector3, Vector4, Quaternion, Matrix } from '@babylonjs/core/Maths/math.vector';
import type { Scene } from '@babylonjs/core/scene';
import type { Node } from '@babylonjs/core/node';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import type { Material } from '@babylonjs/core/Materials/material';
import type { Texture } from '@babylonjs/core/Materials/Textures/texture';
import type { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';
import type { Animation } from '@babylonjs/core/Animations/animation';
import type { Camera } from '@babylonjs/core/Cameras/camera';
import type { Light } from '@babylonjs/core/Lights/light';

// ============================================================================
// glTF 2.0 Core Types
// ============================================================================

/**
 * Interface representing glTF 2.0 exported data
 */
export interface IGLTFData {
    /** The glTF JSON structure */
    glTFFiles: Record<string, string | Blob>;
    
    /** Binary buffer data */
    bin?: Blob;
}

/**
 * Options for glTF export
 */
export interface IExportOptions {
    /** Whether to export only visible nodes */
    exportOnlyVisibleNodes?: boolean;
    
    /** Whether to export unlit materials */
    exportUnlit?: boolean;
    
    /** Whether to embed textures as base64 */
    embedTextures?: boolean;
    
    /** Target frames per second for animations */
    animationSampleRate?: number;
    
    /** Whether to use right-handed coordinate system */
    shouldUseRightHandedSystem?: boolean;
    
    /** Whether to remove empty nodes from export */
    removeEmptyNodes?: boolean;
    
    /** Metadata to include in the glTF file */
    metadata?: Record<string, unknown>;
}

/**
 * Base class for glTF exporter extensions
 */
export declare abstract class GLTFExporterExtension {
    /** Extension name (e.g., "KHR_materials_unlit") */
    abstract readonly name: string;
    
    /** Whether this extension is enabled */
    enabled: boolean;
    
    /** Whether this extension is required for the glTF file */
    required: boolean;
    
    /**
     * Called when the exporter state changes
     * @param babylonNode - The Babylon.js node being processed
     */
    wasUsed?: boolean;
    
    /**
     * Dispose of resources used by the extension
     */
    dispose?(): void;
}

/**
 * glTF 2.0 material export data
 */
export interface IMaterialExportData {
    /** Base color factor [R, G, B, A] */
    baseColorFactor?: number[];
    
    /** Base color texture info */
    baseColorTexture?: ITextureInfo;
    
    /** Metallic factor (0-1) */
    metallicFactor?: number;
    
    /** Roughness factor (0-1) */
    roughnessFactor?: number;
    
    /** Metallic-roughness texture info */
    metallicRoughnessTexture?: ITextureInfo;
    
    /** Normal texture info */
    normalTexture?: INormalTextureInfo;
    
    /** Occlusion texture info */
    occlusionTexture?: IOcclusionTextureInfo;
    
    /** Emissive factor [R, G, B] */
    emissiveFactor?: number[];
    
    /** Emissive texture info */
    emissiveTexture?: ITextureInfo;
    
    /** Alpha mode: "OPAQUE", "MASK", or "BLEND" */
    alphaMode?: 'OPAQUE' | 'MASK' | 'BLEND';
    
    /** Alpha cutoff value (for MASK mode) */
    alphaCutoff?: number;
    
    /** Whether material is double-sided */
    doubleSided?: boolean;
    
    /** Extension-specific data */
    extensions?: Record<string, unknown>;
}

/**
 * glTF texture info structure
 */
export interface ITextureInfo {
    /** Texture index in the glTF textures array */
    index: number;
    
    /** Texture coordinate set index */
    texCoord?: number;
    
    /** Extension-specific data */
    extensions?: Record<string, unknown>;
}

/**
 * glTF normal texture info with scale
 */
export interface INormalTextureInfo extends ITextureInfo {
    /** Normal map scale factor */
    scale?: number;
}

/**
 * glTF occlusion texture info with strength
 */
export interface IOcclusionTextureInfo extends ITextureInfo {
    /** Occlusion strength (0-1) */
    strength?: number;
}

// ============================================================================
// glTF 2.0 Exporter
// ============================================================================

/**
 * Main glTF 2.0 exporter class
 */
export declare class GLTF2Export {
    /**
     * Export a scene to glTF 2.0 format
     * @param scene - The Babylon.js scene to export
     * @param fileName - Output file name (without extension)
     * @param options - Export options
     * @returns Promise resolving to glTF data
     */
    static GLTFAsync(
        scene: Scene,
        fileName: string,
        options?: IExportOptions
    ): Promise<IGLTFData>;
    
    /**
     * Export and download a scene as glTF 2.0
     * @param scene - The Babylon.js scene to export
     * @param fileName - Output file name (without extension)
     * @param options - Export options
     */
    static DownloadGLTF(
        scene: Scene,
        fileName: string,
        options?: IExportOptions
    ): void;
    
    /**
     * Export a scene to GLB format (binary glTF)
     * @param scene - The Babylon.js scene to export
     * @param fileName - Output file name (without extension)
     * @param options - Export options
     * @returns Promise resolving to GLB binary data
     */
    static GLBAsync(
        scene: Scene,
        fileName: string,
        options?: IExportOptions
    ): Promise<Blob>;
}

/**
 * Animation data exporter for glTF
 */
export declare namespace GLTFAnimation {
    /**
     * Build animation samplers from Babylon.js animations
     * @param animations - Array of Babylon.js animations
     * @param sampleRate - Target sample rate in FPS
     * @returns Animation sampler data
     */
    function BuildAnimationSamplers(
        animations: Animation[],
        sampleRate: number
    ): unknown;
}

/**
 * Material exporter for glTF 2.0
 */
export declare class GLTFMaterialExporter {
    /**
     * Convert a Babylon.js material to glTF material data
     * @param material - The Babylon.js material
     * @param mimeType - Image MIME type for textures
     * @returns glTF material export data
     */
    convertMaterialToGLTF(
        material: Material,
        mimeType: string
    ): IMaterialExportData | null;
}

/**
 * Utility functions for glTF export
 */
export declare namespace GLTFUtilities {
    /**
     * Convert Babylon.js quaternion to glTF rotation array
     * @param quaternion - Input quaternion
     * @returns Array [x, y, z, w]
     */
    function GetRotation(quaternion: Quaternion): number[];
    
    /**
     * Convert Babylon.js vector to glTF array
     * @param vector - Input vector
     * @returns Array of vector components
     */
    function GetPosition(vector: Vector3): number[];
    
    /**
     * Convert Babylon.js vector to glTF scale array
     * @param vector - Input scale vector
     * @returns Array [x, y, z]
     */
    function GetScale(vector: Vector3): number[];
}

// ============================================================================
// glTF 2.0 Extensions
// ============================================================================

/**
 * KHR_materials_unlit extension
 * Defines an unlit (shadeless) material
 */
export declare class KHR_materials_unlit extends GLTFExporterExtension {
    readonly name: 'KHR_materials_unlit';
}

/**
 * KHR_materials_clearcoat extension
 * Adds clearcoat layer to materials
 */
export declare class KHR_materials_clearcoat extends GLTFExporterExtension {
    readonly name: 'KHR_materials_clearcoat';
}

/**
 * KHR_materials_iridescence extension
 * Adds thin-film iridescence effect
 */
export declare class KHR_materials_iridescence extends GLTFExporterExtension {
    readonly name: 'KHR_materials_iridescence';
}

/**
 * KHR_materials_specular extension
 * Defines specular reflection properties
 */
export declare class KHR_materials_specular extends GLTFExporterExtension {
    readonly name: 'KHR_materials_specular';
}

/**
 * KHR_materials_sheen extension
 * Adds sheen layer for cloth-like materials
 */
export declare class KHR_materials_sheen extends GLTFExporterExtension {
    readonly name: 'KHR_materials_sheen';
}

/**
 * KHR_materials_transmission extension
 * Enables light transmission through materials
 */
export declare class KHR_materials_transmission extends GLTFExporterExtension {
    readonly name: 'KHR_materials_transmission';
}

/**
 * KHR_materials_volume extension
 * Defines volumetric properties for translucent materials
 */
export declare class KHR_materials_volume extends GLTFExporterExtension {
    readonly name: 'KHR_materials_volume';
}

/**
 * KHR_materials_ior extension
 * Specifies index of refraction
 */
export declare class KHR_materials_ior extends GLTFExporterExtension {
    readonly name: 'KHR_materials_ior';
}

/**
 * KHR_materials_emissive_strength extension
 * Allows emissive intensity > 1.0
 */
export declare class KHR_materials_emissive_strength extends GLTFExporterExtension {
    readonly name: 'KHR_materials_emissive_strength';
}

/**
 * KHR_texture_transform extension
 * Applies transformations to texture coordinates
 */
export declare class KHR_texture_transform extends GLTFExporterExtension {
    readonly name: 'KHR_texture_transform';
}

/**
 * KHR_lights_punctual extension
 * Exports point, spot, and directional lights
 */
export declare class KHR_lights_punctual extends GLTFExporterExtension {
    readonly name: 'KHR_lights_punctual';
}

/**
 * EXT_mesh_gpu_instancing extension
 * Enables GPU instancing for meshes
 */
export declare class EXT_mesh_gpu_instancing extends GLTFExporterExtension {
    readonly name: 'EXT_mesh_gpu_instancing';
}

// ============================================================================
// OBJ Serializer
// ============================================================================

/**
 * Options for OBJ export
 */
export interface IOBJExportOptions {
    /** Whether to export materials to .mtl file */
    exportMaterials?: boolean;
    
    /** Material library file name */
    materialLibraryFileName?: string;
}

/**
 * OBJ file format exporter
 */
export declare class OBJExport {
    /**
     * Export a mesh or scene to OBJ format
     * @param mesh - Mesh or array of meshes to export
     * @param materials - Whether to export materials
     * @param fileName - Output file name
     * @returns OBJ file content as string
     */
    static OBJ(
        mesh: Mesh | Mesh[],
        materials?: boolean,
        fileName?: string
    ): string;
    
    /**
     * Export and download mesh(es) as OBJ
     * @param mesh - Mesh or array of meshes to export
     * @param fileName - Output file name
     * @param materials - Whether to export materials
     */
    static DownloadOBJ(
        mesh: Mesh | Mesh[],
        fileName: string,
        materials?: boolean
    ): void;
}

// ============================================================================
// STL Serializer
// ============================================================================

/**
 * Options for STL export
 */
export interface ISTLExportOptions {
    /** Whether to export in binary format (default: true) */
    binary?: boolean;
    
    /** Whether to download the file */
    download?: boolean;
    
    /** File name for download */
    fileName?: string;
}

/**
 * STL file format exporter
 */
export declare class STLExport {
    /**
     * Export a mesh to STL format
     * @param mesh - Mesh or array of meshes to export
     * @param fileName - Output file name
     * @param binary - Whether to use binary format
     * @param download - Whether to trigger download
     * @returns STL file data
     */
    static STL(
        mesh: Mesh | Mesh[],
        fileName?: string,
        binary?: boolean,
        download?: boolean
    ): string | Blob;
    
    /**
     * Export and download mesh(es) as STL
     * @param mesh - Mesh or array of meshes to export
     * @param fileName - Output file name
     * @param binary - Whether to use binary format
     */
    static DownloadSTL(
        mesh: Mesh | Mesh[],
        fileName: string,
        binary?: boolean
    ): void;
}

// ============================================================================
// Legacy Re-exports
// ============================================================================

/**
 * Legacy namespace for backward compatibility
 * @deprecated Use named exports instead
 */
export declare namespace BABYLON {
    export { GLTF2Export };
    export { OBJExport };
    export { STLExport };
    export { GLTFExporterExtension };
    export type { IExportOptions, IGLTFData, IMaterialExportData };
}

// ============================================================================
// Default Export
// ============================================================================

declare const Serializers: {
    GLTF2Export: typeof GLTF2Export;
    OBJExport: typeof OBJExport;
    STLExport: typeof STLExport;
};

export default Serializers;