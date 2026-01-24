/**
 * KHR_materials_pbrSpecularGlossiness Extension
 * 
 * This extension defines a PBR shading model that uses specular-glossiness workflow
 * instead of the metallic-roughness workflow defined in the core glTF 2.0 specification.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness
 */

import { Nullable } from 'core/types';
import { Color3 } from 'core/Maths/math.color';
import { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import { BaseTexture } from 'core/Materials/Textures/baseTexture';
import { GLTFLoader, IGLTFLoaderExtension } from '../glTFLoader';
import { IMaterial } from '../glTFLoaderInterfaces';
import { ITextureInfo } from '../glTFLoaderInterfaces';

/** Extension name constant */
export const EXTENSION_NAME = 'KHR_materials_pbrSpecularGlossiness';

/**
 * PBR Specular Glossiness material properties as defined by the extension
 */
export interface IKHRMaterialsPbrSpecularGlossiness {
    /**
     * The RGBA components of the reflected diffuse color of the material.
     * Metals have a diffuse value of [0.0, 0.0, 0.0]. The fourth component (A) is the alpha coverage of the material.
     * The alphaMode property specifies how alpha is interpreted. The values are linear.
     */
    diffuseFactor?: [number, number, number, number];

    /**
     * The diffuse texture. This texture contains RGB(A) components of the reflected diffuse color of the material in sRGB color space.
     * If the fourth component (A) is present, it represents the alpha coverage of the material.
     * Otherwise, an alpha of 1.0 is assumed. The alphaMode property specifies how alpha is interpreted.
     */
    diffuseTexture?: ITextureInfo;

    /**
     * The specular RGB color of the material. This value is linear.
     */
    specularFactor?: [number, number, number];

    /**
     * The glossiness or smoothness of the material. A value of 1.0 means the material has full glossiness or is perfectly smooth.
     * A value of 0.0 means the material has no glossiness or is completely rough. This value is linear.
     */
    glossinessFactor?: number;

    /**
     * The specular-glossiness texture is a RGBA texture, containing the specular color (RGB) in sRGB color space and the glossiness value (A) in linear space.
     */
    specularGlossinessTexture?: ITextureInfo;
}

/**
 * Loader extension for KHR_materials_pbrSpecularGlossiness
 * 
 * This extension converts specular-glossiness materials to Babylon.js PBR materials
 * by mapping the specular-glossiness parameters to the appropriate PBR material properties.
 */
export class KHR_materials_pbrSpecularGlossiness implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    public readonly name = EXTENSION_NAME;

    /**
     * Defines the order in which this extension is applied.
     * Lower values are applied first.
     */
    public readonly order = 200;

    /**
     * Defines whether this extension is enabled.
     */
    public enabled: boolean;

    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates a new instance of the KHR_materials_pbrSpecularGlossiness extension
     * @param loader - The glTF loader instance
     */
    constructor(loader: GLTFLoader) {
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(EXTENSION_NAME);
    }

    /**
     * Disposes of the extension and releases resources
     */
    public dispose(): void {
        this._loader = null;
    }

    /**
     * Loads material properties from the extension data
     * @param context - The loader context when loading the asset
     * @param material - The glTF material property
     * @param babylonMaterial - The Babylon material instance
     * @returns A promise that resolves when the load is complete
     */
    public loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Nullable<Promise<void>> {
        return GLTFLoader.LoadExtensionAsync<IKHRMaterialsPbrSpecularGlossiness>(
            context,
            material,
            this.name,
            (extensionContext, extension) => {
                const promises = new Array<Promise<void>>();

                // Load base material properties (e.g., alpha mode, double sided, etc.)
                promises.push(this._loader!.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));

                // Load specular-glossiness specific properties
                promises.push(this._loadSpecularGlossinessPropertiesAsync(extensionContext, material, extension, babylonMaterial));

                // Load alpha properties
                this._loader!.loadMaterialAlphaProperties(context, material, babylonMaterial);

                return Promise.all(promises).then(() => {});
            }
        );
    }

    /**
     * Loads specular-glossiness material properties and applies them to the Babylon material
     * @param context - The loader context
     * @param material - The glTF material property
     * @param properties - The extension properties
     * @param babylonMaterial - The Babylon material instance
     * @returns A promise that resolves when all properties are loaded
     * @throws Error if the material is not a PBR material
     */
    private _loadSpecularGlossinessPropertiesAsync(
        context: string,
        material: IMaterial,
        properties: IKHRMaterialsPbrSpecularGlossiness,
        babylonMaterial: Material
    ): Promise<void> {
        if (!(babylonMaterial instanceof PBRMaterial)) {
            throw new Error(`${context}: Material type not supported`);
        }

        const promises = new Array<Promise<void>>();

        // Disable metallic-roughness workflow
        babylonMaterial.metallic = null;
        babylonMaterial.roughness = null;

        // Apply diffuse color and alpha
        if (properties.diffuseFactor) {
            babylonMaterial.albedoColor = Color3.FromArray(properties.diffuseFactor);
            babylonMaterial.alpha = properties.diffuseFactor[3];
        } else {
            babylonMaterial.albedoColor = Color3.White();
        }

        // Apply specular color (reflectivity in Babylon.js)
        babylonMaterial.reflectivityColor = properties.specularFactor
            ? Color3.FromArray(properties.specularFactor)
            : Color3.White();

        // Apply glossiness (microSurface in Babylon.js)
        babylonMaterial.microSurface = properties.glossinessFactor ?? 1;

        // Load diffuse texture
        if (properties.diffuseTexture) {
            promises.push(
                this._loader!.loadTextureInfoAsync(
                    `${context}/diffuseTexture`,
                    properties.diffuseTexture,
                    (texture: BaseTexture) => {
                        texture.name = `${babylonMaterial.name} (Diffuse)`;
                        babylonMaterial.albedoTexture = texture;
                    }
                )
            );
        }

        // Load specular-glossiness texture
        if (properties.specularGlossinessTexture) {
            promises.push(
                this._loader!.loadTextureInfoAsync(
                    `${context}/specularGlossinessTexture`,
                    properties.specularGlossinessTexture,
                    (texture: BaseTexture) => {
                        texture.name = `${babylonMaterial.name} (Specular Glossiness)`;
                        babylonMaterial.reflectivityTexture = texture;
                        babylonMaterial.reflectivityTexture.hasAlpha = true;
                    }
                )
            );

            // Use alpha channel of specular-glossiness texture for glossiness
            babylonMaterial.useMicroSurfaceFromReflectivityMapAlpha = true;
        }

        return Promise.all(promises).then(() => {});
    }
}

/**
 * Register the extension with the glTF loader
 */
GLTFLoader.RegisterExtension(EXTENSION_NAME, (loader: GLTFLoader) => {
    return new KHR_materials_pbrSpecularGlossiness(loader);
});