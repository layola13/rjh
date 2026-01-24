/**
 * glTF 1.0 Materials Common Extension Type Definitions
 * Implements KHR_materials_common extension for glTF 1.0 format
 */

import { GLTFLoaderExtension, GLTFLoaderBase, GLTFLoader } from './glTFLoader';
import { 
    Scene, 
    Material, 
    StandardMaterial, 
    HemisphericLight, 
    PointLight, 
    DirectionalLight, 
    SpotLight, 
    Vector3, 
    Color3, 
    Texture 
} from 'core/Misc/observable';

/**
 * Light type definitions for KHR_materials_common extension
 */
type LightType = 'ambient' | 'point' | 'directional' | 'spot';

/**
 * Ambient light configuration
 */
interface AmbientLightConfig {
    /** RGB color values [r, g, b] */
    color?: number[];
}

/**
 * Point light configuration
 */
interface PointLightConfig {
    /** RGB color values [r, g, b] */
    color?: number[];
}

/**
 * Directional light configuration
 */
interface DirectionalLightConfig {
    /** RGB color values [r, g, b] */
    color?: number[];
}

/**
 * Spot light configuration
 */
interface SpotLightConfig {
    /** RGB color values [r, g, b] */
    color?: number[];
    /** Falloff angle in radians */
    fallOffAngle?: number;
    /** Falloff exponent for light intensity */
    fallOffExponent?: number;
}

/**
 * Light definition in glTF extension
 */
interface GLTFLight {
    /** Light name */
    name: string;
    /** Light type */
    type: LightType;
    /** Ambient light properties */
    ambient?: AmbientLightConfig;
    /** Point light properties */
    point?: PointLightConfig;
    /** Directional light properties */
    directional?: DirectionalLightConfig;
    /** Spot light properties */
    spot?: SpotLightConfig;
}

/**
 * Material technique types
 */
type MaterialTechnique = 'CONSTANT' | 'LAMBERT' | 'PHONG' | 'BLINN';

/**
 * Material values for KHR_materials_common
 */
interface MaterialCommonValues {
    /** Ambient color [r, g, b] or texture ID */
    ambient?: number[] | string;
    /** Diffuse color [r, g, b] or texture ID */
    diffuse?: number[] | string;
    /** Emission color [r, g, b] or texture ID */
    emission?: number[] | string;
    /** Specular color [r, g, b] or texture ID */
    specular?: number[] | string;
    /** Transparency value (0.0 - 1.0) */
    transparency?: number;
    /** Shininess factor */
    shininess?: number;
}

/**
 * KHR_materials_common extension data
 */
interface MaterialsCommonExtension {
    /** Rendering technique */
    technique: MaterialTechnique;
    /** Material property values */
    values: MaterialCommonValues;
    /** Whether material is double-sided */
    doubleSided?: boolean;
}

/**
 * glTF material with extensions
 */
interface GLTFMaterialWithExtensions {
    /** Extension data keyed by extension name */
    extensions?: {
        KHR_materials_common?: MaterialsCommonExtension;
        [key: string]: unknown;
    };
}

/**
 * glTF runtime data with extensions
 */
interface GLTFRuntimeWithExtensions {
    /** Babylon.js scene */
    scene: Scene;
    /** Materials array */
    materials: GLTFMaterialWithExtensions[];
    /** Extension data */
    extensions?: {
        KHR_materials_common?: {
            /** Light definitions */
            lights?: Record<string, GLTFLight>;
        };
        [key: string]: unknown;
    };
}

/**
 * Texture property keys for StandardMaterial
 */
type TexturePropertyKey = 'ambientTexture' | 'diffuseTexture' | 'emissiveTexture' | 'specularTexture';

/**
 * Implements the KHR_materials_common extension for glTF 1.0
 * This extension provides a common lighting and material model for glTF assets
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/1.0/Khronos/KHR_materials_common
 */
export declare class GLTFMaterialsCommonExtension extends GLTFLoaderExtension {
    /**
     * Constructor
     * Initializes the extension with the name "KHR_materials_common"
     */
    constructor();

    /**
     * Loads runtime extensions from glTF data
     * Processes lights defined in the KHR_materials_common extension
     * @param gltfRuntime - The glTF runtime data containing extension information
     * @returns True if extension was processed, false otherwise
     */
    loadRuntimeExtensionsAsync(gltfRuntime: GLTFRuntimeWithExtensions): boolean;

    /**
     * Loads a material using the KHR_materials_common extension
     * Creates a StandardMaterial with properties from the extension data
     * @param gltfRuntime - The glTF runtime data
     * @param materialId - ID of the material to load
     * @param onSuccess - Callback invoked on successful load
     * @param onError - Callback invoked on error
     * @returns True if material uses this extension, false otherwise
     */
    loadMaterialAsync(
        gltfRuntime: GLTFRuntimeWithExtensions,
        materialId: string,
        onSuccess: (material: StandardMaterial) => void,
        onError: (message: string) => void
    ): boolean;

    /**
     * Loads a texture from glTF buffer data
     * @param gltfRuntime - The glTF runtime data
     * @param textureId - ID of the texture to load
     * @param material - The material to apply the texture to
     * @param propertyKey - The material property to set (e.g., 'diffuseTexture')
     * @param onError - Callback invoked on error
     */
    private _loadTexture(
        gltfRuntime: GLTFRuntimeWithExtensions,
        textureId: string,
        material: StandardMaterial,
        propertyKey: TexturePropertyKey,
        onError: (message: string) => void
    ): void;
}