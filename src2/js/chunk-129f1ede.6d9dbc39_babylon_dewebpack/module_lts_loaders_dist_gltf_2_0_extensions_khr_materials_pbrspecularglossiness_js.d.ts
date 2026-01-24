/**
 * KHR_materials_pbrSpecularGlossiness extension for glTF 2.0 loader
 * Implements the PBR Specular-Glossiness material workflow as an alternative to metallic-roughness
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness
 */

import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { GLTFLoader } from "../glTFLoader";
import type { IMaterial } from "../glTFLoaderInterfaces";
import type { IKHRMaterialsPbrSpecularGlossiness } from "./KHR_materials_pbrSpecularGlossiness.types";
import type { Material } from "core/Materials/material";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_materials_pbrSpecularGlossiness";

/**
 * Loader extension for KHR_materials_pbrSpecularGlossiness
 * This extension defines a PBR shading model that uses specular-glossiness workflow
 * instead of the core glTF 2.0 metallic-roughness workflow
 */
export declare class KHR_materials_pbrSpecularGlossiness implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: typeof EXTENSION_NAME;

    /**
     * The order in which this extension should be processed (lower = earlier)
     */
    readonly order: number;

    /**
     * Whether this extension is enabled
     * Automatically set based on whether the extension is used in the glTF file
     */
    enabled: boolean;

    /**
     * Reference to the glTF loader
     */
    private _loader: GLTFLoader | null;

    /**
     * Creates a new instance of the KHR_materials_pbrSpecularGlossiness extension
     * @param loader - The parent glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Dispose of resources held by this extension
     */
    dispose(): void;

    /**
     * Load material properties from the glTF material definition
     * @param context - The glTF context path for error reporting
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon.js material to configure
     * @returns A promise that resolves when all material properties are loaded
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void> | null;

    /**
     * Load specular-glossiness specific properties onto the Babylon.js PBR material
     * @param context - The glTF context path for error reporting
     * @param material - The glTF material definition
     * @param properties - The KHR_materials_pbrSpecularGlossiness extension properties
     * @param babylonMaterial - The Babylon.js PBR material to configure
     * @returns A promise that resolves when all properties are loaded
     * @throws Error if the material is not a PBRMaterial
     */
    private _loadSpecularGlossinessPropertiesAsync(
        context: string,
        material: IMaterial,
        properties: IKHRMaterialsPbrSpecularGlossiness,
        babylonMaterial: Material
    ): Promise<void>;
}

/**
 * glTF extension data interface for KHR_materials_pbrSpecularGlossiness
 */
export declare interface IKHRMaterialsPbrSpecularGlossiness {
    /**
     * The RGBA components of the diffuse color of the material
     * The fourth component (A) is the alpha coverage of the material
     * Default: [1.0, 1.0, 1.0, 1.0]
     */
    diffuseFactor?: number[];

    /**
     * The diffuse texture
     * Contains RGB(A) components of the diffuse color in sRGB color space
     */
    diffuseTexture?: {
        index: number;
        texCoord?: number;
    };

    /**
     * The specular RGB color of the material
     * Default: [1.0, 1.0, 1.0]
     */
    specularFactor?: number[];

    /**
     * The glossiness or smoothness of the material
     * A value of 1.0 means the material has full glossiness (perfectly smooth)
     * A value of 0.0 means the material has no glossiness (completely rough)
     * Default: 1.0
     */
    glossinessFactor?: number;

    /**
     * The specular-glossiness texture
     * RGB channels contain specular color, A channel contains glossiness
     */
    specularGlossinessTexture?: {
        index: number;
        texCoord?: number;
    };
}