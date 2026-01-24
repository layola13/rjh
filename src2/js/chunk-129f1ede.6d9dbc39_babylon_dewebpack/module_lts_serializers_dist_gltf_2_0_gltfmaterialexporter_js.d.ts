/**
 * glTF 2.0 Material Exporter
 * Handles conversion of Babylon.js materials to glTF 2.0 format
 */

import { Color3, Vector2, Scalar, Constants, Texture, TextureTools, RawTexture, DumpTools } from '@babylonjs/core';
import type { 
    Scene, 
    StandardMaterial, 
    PBRMaterial, 
    BaseTexture,
    InternalTexture,
    Nullable
} from '@babylonjs/core';

/**
 * glTF 2.0 Texture Information
 */
export interface IGLTFTextureInfo {
    /** Index of the texture */
    index: number;
    /** Texture coordinate set index */
    texCoord?: number;
}

/**
 * glTF 2.0 Normal Texture Information
 */
export interface IGLTFNormalTextureInfo extends IGLTFTextureInfo {
    /** Normal map scale factor */
    scale?: number;
}

/**
 * glTF 2.0 Occlusion Texture Information
 */
export interface IGLTFOcclusionTextureInfo extends IGLTFTextureInfo {
    /** Occlusion strength factor */
    strength?: number;
}

/**
 * glTF 2.0 PBR Metallic Roughness
 */
export interface IGLTFPBRMetallicRoughness {
    /** Base color factor [R, G, B, A] */
    baseColorFactor?: [number, number, number, number];
    /** Base color texture */
    baseColorTexture?: IGLTFTextureInfo;
    /** Metallic factor */
    metallicFactor?: number;
    /** Roughness factor */
    roughnessFactor?: number;
    /** Metallic-roughness texture */
    metallicRoughnessTexture?: IGLTFTextureInfo;
}

/**
 * glTF 2.0 Material
 */
export interface IGLTFMaterial {
    /** Material name */
    name?: string;
    /** PBR metallic roughness parameters */
    pbrMetallicRoughness?: IGLTFPBRMetallicRoughness;
    /** Normal texture */
    normalTexture?: IGLTFNormalTextureInfo;
    /** Occlusion texture */
    occlusionTexture?: IGLTFOcclusionTextureInfo;
    /** Emissive texture */
    emissiveTexture?: IGLTFTextureInfo;
    /** Emissive factor [R, G, B] */
    emissiveFactor?: [number, number, number];
    /** Alpha mode: OPAQUE, MASK, or BLEND */
    alphaMode?: string;
    /** Alpha cutoff threshold */
    alphaCutoff?: number;
    /** Double-sided rendering flag */
    doubleSided?: boolean;
    /** glTF extensions */
    extensions?: Record<string, unknown>;
}

/**
 * glTF 2.0 Texture Sampler
 */
export interface IGLTFSampler {
    /** Magnification filter */
    magFilter?: number;
    /** Minification filter */
    minFilter?: number;
    /** Wrap mode for S coordinate */
    wrapS?: number;
    /** Wrap mode for T coordinate */
    wrapT?: number;
}

/**
 * glTF 2.0 Texture
 */
export interface IGLTFTexture {
    /** Sampler index */
    sampler?: number;
    /** Image source index */
    source?: number;
}

/**
 * glTF 2.0 Image
 */
export interface IGLTFImage {
    /** Image name */
    name?: string;
    /** Image URI */
    uri?: string;
}

/**
 * Metallic-Roughness conversion result
 */
export interface IMetallicRoughnessFactors {
    /** Base color */
    baseColor: Color3;
    /** Metallic factor */
    metallic: number;
    /** Roughness factor */
    roughness: number;
    /** Base color texture data */
    baseColorTextureData?: ArrayBuffer;
    /** Metallic-roughness texture data */
    metallicRoughnessTextureData?: ArrayBuffer;
}

/**
 * Specular-Glossiness material properties
 */
export interface ISpecularGlossinessProperties {
    /** Diffuse color */
    diffuseColor: Color3;
    /** Specular color */
    specularColor: Color3;
    /** Glossiness factor */
    glossiness: number;
}

/**
 * Image data cache
 */
export interface IImageData {
    /** Image binary data */
    data: ArrayBuffer;
    /** MIME type */
    mimeType: string;
}

/**
 * glTF Material Exporter
 * Converts Babylon.js materials to glTF 2.0 format
 */
export declare class _GLTFMaterialExporter {
    /** Texture mapping cache (texture UID -> texture info) */
    private _textureMap: Record<string, IGLTFTextureInfo>;
    
    /** Internal texture to image data cache */
    private _internalTextureToImage: Record<number, Record<string, Promise<number>>>;
    
    /** Reference to the main glTF exporter */
    private _exporter: unknown;

    /** Dielectric specular color constant */
    private static readonly _DielectricSpecular: Color3;
    
    /** Maximum specular power */
    private static readonly _MaxSpecularPower: number;
    
    /** Epsilon value for floating-point comparisons */
    private static readonly _Epsilon: number;

    /**
     * Constructor
     * @param exporter - The main glTF exporter instance
     */
    constructor(exporter: unknown);

    /**
     * Fuzzy equality comparison for colors within epsilon tolerance
     * @param color1 - First color
     * @param color2 - Second color
     * @param epsilon - Tolerance threshold
     * @returns True if colors are approximately equal
     */
    private static _FuzzyEquals(color1: Color3, color2: Color3, epsilon: number): boolean;

    /**
     * Converts an array of Babylon.js materials to glTF format
     * @param materials - Array of materials to convert
     * @param mimeType - Image MIME type for texture export
     * @param hasTextureCoords - Whether mesh has texture coordinates
     * @returns Promise that resolves when conversion is complete
     */
    private _convertMaterialsToGLTFAsync(
        materials: Array<StandardMaterial | PBRMaterial>,
        mimeType: string,
        hasTextureCoords: boolean
    ): Promise<void>;

    /**
     * Strips texture references from material, keeping only scalar/vector properties
     * @param material - glTF material to strip
     * @returns Material with textures removed
     */
    private _stripTexturesFromMaterial(material: IGLTFMaterial): IGLTFMaterial;

    /**
     * Checks if a glTF material has any texture references
     * @param material - glTF material to check
     * @returns True if material has textures
     */
    private _hasTexturesPresent(material: IGLTFMaterial): boolean;

    /**
     * Gets cached texture info by texture UID
     * @param texture - Babylon.js texture
     * @returns Cached texture info or null
     */
    private _getTextureInfo(texture: BaseTexture): Nullable<IGLTFTextureInfo>;

    /**
     * Converts StandardMaterial to glTF PBR Metallic Roughness parameters
     * @param material - StandardMaterial to convert
     * @returns PBR metallic roughness approximation
     */
    private _convertToGLTFPBRMetallicRoughness(material: StandardMaterial): IGLTFPBRMetallicRoughness;

    /**
     * Solves for metallic factor from diffuse and specular properties
     * @param diffuse - Perceived brightness of diffuse color
     * @param specular - Perceived brightness of specular color
     * @param oneMinusSpecularStrength - 1 minus max specular component
     * @returns Calculated metallic factor
     */
    private static _SolveMetallic(
        diffuse: number,
        specular: number,
        oneMinusSpecularStrength: number
    ): number;

    /**
     * Sets alpha mode on glTF material based on Babylon.js material properties
     * @param material - glTF material to configure
     * @param babylonMaterial - Source Babylon.js material
     */
    private static _SetAlphaMode(
        material: IGLTFMaterial,
        babylonMaterial: StandardMaterial | PBRMaterial
    ): void;

    /**
     * Converts StandardMaterial to glTF material
     * @param material - StandardMaterial to convert
     * @param mimeType - Image MIME type for textures
     * @param hasTextureCoords - Whether mesh has texture coordinates
     * @returns Promise resolving to glTF material
     */
    private _convertStandardMaterialAsync(
        material: StandardMaterial,
        mimeType: string,
        hasTextureCoords: boolean
    ): Promise<IGLTFMaterial>;

    /**
     * Finalizes material export with extensions and post-processing
     * @param promises - Array of pending texture export promises
     * @param material - glTF material being exported
     * @param babylonMaterial - Source Babylon.js material
     * @param mimeType - Image MIME type
     * @returns Promise resolving to final glTF material
     */
    private _finishMaterial(
        promises: Array<Promise<void>>,
        material: IGLTFMaterial,
        babylonMaterial: StandardMaterial | PBRMaterial,
        mimeType: string
    ): Promise<IGLTFMaterial>;

    /**
     * Extracts image data from pixel array
     * @param pixels - Pixel data array
     * @param width - Image width
     * @param height - Image height
     * @param mimeType - Target image MIME type
     * @returns Promise resolving to image data buffer
     */
    private _getImageDataAsync(
        pixels: Uint8Array | Float32Array,
        width: number,
        height: number,
        mimeType: string
    ): Promise<ArrayBuffer>;

    /**
     * Creates a white texture of specified dimensions
     * @param width - Texture width
     * @param height - Texture height
     * @param scene - Babylon.js scene
     * @returns White RGBA texture
     */
    private _createWhiteTexture(width: number, height: number, scene: Scene): RawTexture;

    /**
     * Resizes two textures to the same dimensions
     * @param texture1 - First texture
     * @param texture2 - Second texture
     * @param scene - Babylon.js scene
     * @returns Object containing resized textures
     */
    private _resizeTexturesToSameDimensions(
        texture1: Nullable<BaseTexture>,
        texture2: Nullable<BaseTexture>,
        scene: Scene
    ): { texture1: Nullable<BaseTexture>; texture2: Nullable<BaseTexture> };

    /**
     * Converts Uint8Array pixel data to Float32Array (normalized 0-1)
     * @param pixels - Pixel data array
     * @returns Float32 normalized pixel array
     */
    private _convertPixelArrayToFloat32(pixels: Uint8Array | Float32Array): Float32Array;

    /**
     * Converts specular-glossiness textures to metallic-roughness workflow
     * @param diffuseTexture - Diffuse texture
     * @param specularGlossinessTexture - Specular-glossiness texture
     * @param properties - Specular-glossiness material properties
     * @param mimeType - Image MIME type
     * @returns Promise resolving to metallic-roughness factors and textures
     */
    private _convertSpecularGlossinessTexturesToMetallicRoughnessAsync(
        diffuseTexture: Nullable<BaseTexture>,
        specularGlossinessTexture: Nullable<BaseTexture>,
        properties: ISpecularGlossinessProperties,
        mimeType: string
    ): Promise<IMetallicRoughnessFactors>;

    /**
     * Converts specular-glossiness properties to metallic-roughness
     * @param properties - Specular-glossiness material properties
     * @returns Metallic-roughness factors
     */
    private _convertSpecularGlossinessToMetallicRoughness(
        properties: ISpecularGlossinessProperties
    ): IMetallicRoughnessFactors;

    /**
     * Calculates perceived brightness of a color (luminance)
     * @param color - Input color
     * @returns Perceived brightness value
     */
    private _getPerceivedBrightness(color: Color3): number;

    /**
     * Gets the maximum component (R, G, or B) of a color
     * @param color - Input color
     * @returns Maximum component value
     */
    private _getMaxComponent(color: Color3): number;

    /**
     * Converts PBR metallic-roughness factors to glTF format
     * @param material - PBR material
     * @param mimeType - Image MIME type
     * @param metallicRoughness - Target glTF PBR parameters
     * @param hasTextureCoords - Whether mesh has texture coordinates
     * @returns Promise resolving to metallic-roughness factors
     */
    private _convertMetalRoughFactorsToMetallicRoughnessAsync(
        material: PBRMaterial,
        mimeType: string,
        metallicRoughness: IGLTFPBRMetallicRoughness,
        hasTextureCoords: boolean
    ): Promise<IMetallicRoughnessFactors>;

    /**
     * Gets glTF texture sampler settings from Babylon.js texture
     * @param texture - Babylon.js texture
     * @returns glTF sampler parameters
     */
    private _getTextureSampler(texture: Nullable<BaseTexture>): IGLTFSampler;

    /**
     * Converts Babylon.js texture wrap mode to glTF wrap mode constant
     * @param mode - Babylon.js wrap mode
     * @returns glTF wrap mode constant
     */
    private _getGLTFTextureWrapMode(mode: number): number;

    /**
     * Converts specular-glossiness factors to metallic-roughness
     * @param material - PBR material with specular-glossiness workflow
     * @param mimeType - Image MIME type
     * @param metallicRoughness - Target glTF PBR parameters
     * @param hasTextureCoords - Whether mesh has texture coordinates
     * @returns Promise resolving to metallic-roughness factors
     */
    private _convertSpecGlossFactorsToMetallicRoughnessAsync(
        material: PBRMaterial,
        mimeType: string,
        metallicRoughness: IGLTFPBRMetallicRoughness,
        hasTextureCoords: boolean
    ): Promise<IMetallicRoughnessFactors>;

    /**
     * Converts PBRMaterial to glTF material
     * @param material - PBR material to convert
     * @param mimeType - Image MIME type
     * @param hasTextureCoords - Whether mesh has texture coordinates
     * @returns Promise resolving to glTF material
     */
    private _convertPBRMaterialAsync(
        material: PBRMaterial,
        mimeType: string,
        hasTextureCoords: boolean
    ): Promise<IGLTFMaterial>;

    /**
     * Applies metallic-roughness parameters to glTF material
     * @param factors - Metallic-roughness factors
     * @param material - Source PBR material
     * @param glTFMaterial - Target glTF material
     * @param metallicRoughness - glTF PBR parameters
     * @param mimeType - Image MIME type
     * @param hasTextureCoords - Whether mesh has texture coordinates
     * @returns Promise resolving to configured glTF material
     */
    private _setMetallicRoughnessPbrMaterial(
        factors: IMetallicRoughnessFactors,
        material: PBRMaterial,
        glTFMaterial: IGLTFMaterial,
        metallicRoughness: IGLTFPBRMetallicRoughness,
        mimeType: string,
        hasTextureCoords: boolean
    ): Promise<IGLTFMaterial>;

    /**
     * Reads pixel data from texture
     * @param texture - Babylon.js texture
     * @returns Promise resolving to pixel array
     */
    private _getPixelsFromTexture(texture: BaseTexture): Promise<Nullable<Uint8Array | Float32Array>>;

    /**
     * Exports a Babylon.js texture to glTF format with extension support
     * @param texture - Texture to export
     * @param mimeType - Image MIME type
     * @returns Promise resolving to glTF texture info
     */
    private _exportTextureAsync(
        texture: BaseTexture,
        mimeType: string
    ): Promise<Nullable<IGLTFTextureInfo>>;

    /**
     * Exports texture information to glTF format
     * @param texture - Texture to export
     * @param mimeType - Image MIME type
     * @returns Promise resolving to glTF texture info
     */
    private _exportTextureInfoAsync(
        texture: BaseTexture,
        mimeType: string
    ): Promise<Nullable<IGLTFTextureInfo>>;

    /**
     * Exports image data and registers it in the glTF image array
     * @param name - Image name
     * @param mimeType - Image MIME type
     * @param data - Image binary data
     * @returns Image index in glTF images array
     */
    private _exportImage(name: string, mimeType: string, data: ArrayBuffer): number;

    /**
     * Creates glTF texture info referencing image and sampler
     * @param imageIndex - Index in glTF images array
     * @param samplerIndex - Index in glTF samplers array
     * @param coordinatesIndex - Texture coordinate set index
     * @returns glTF texture info object
     */
    private _exportTextureInfo(
        imageIndex: number,
        samplerIndex: number,
        coordinatesIndex?: number
    ): IGLTFTextureInfo;

    /**
     * Exports texture sampler and returns its index
     * @param texture - Babylon.js texture
     * @returns Index in glTF samplers array
     */
    private _exportTextureSampler(texture: Nullable<BaseTexture>): number;
}