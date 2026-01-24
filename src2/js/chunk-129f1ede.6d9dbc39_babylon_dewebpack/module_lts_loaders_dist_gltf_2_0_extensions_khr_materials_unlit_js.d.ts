/**
 * KHR_materials_unlit extension for glTF loader.
 * This extension defines an unlit shading model for materials.
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit
 */

import { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
import { IglTFMaterial } from "../glTFLoaderInterfaces";
import { Material } from "core/Materials/material";
import { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import { Color3 } from "core/Maths/math.color";
import { BaseTexture } from "core/Materials/Textures/baseTexture";

/** Extension name constant */
const EXTENSION_NAME = "KHR_materials_unlit";

/** Default extension loading order */
const EXTENSION_ORDER = 210;

/** Default alpha value for opaque materials */
const DEFAULT_ALPHA = 1.0;

/** Default base color index in factor array */
const ALPHA_INDEX = 3;

/**
 * Loader extension that implements the KHR_materials_unlit glTF extension.
 * Converts materials to use an unlit shading model.
 */
export interface KHR_materials_unlit extends IGLTFLoaderExtension {
    /** Extension name */
    readonly name: string;
    
    /** Loading order priority */
    readonly order: number;
    
    /** Whether this extension is enabled */
    enabled: boolean;
    
    /**
     * Loads material properties asynchronously.
     * @param context - The glTF context path
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon material to configure
     * @returns Promise that resolves when loading is complete
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IglTFMaterial,
        babylonMaterial: Material
    ): Promise<void> | null;
    
    /**
     * Disposes resources used by this extension.
     */
    dispose(): void;
}

/**
 * Implementation of the KHR_materials_unlit extension.
 * @internal
 */
export class KHR_materials_unlit implements IGLTFLoaderExtension {
    /** @inheritdoc */
    public readonly name = EXTENSION_NAME;
    
    /** @inheritdoc */
    public readonly order = EXTENSION_ORDER;
    
    /** @inheritdoc */
    public enabled: boolean;
    
    /** Reference to the parent glTF loader */
    private _loader: GLTFLoader | null;
    
    /**
     * Creates a new instance of the KHR_materials_unlit extension.
     * @param loader - The parent glTF loader instance
     */
    constructor(loader: GLTFLoader) {
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(EXTENSION_NAME);
    }
    
    /** @inheritdoc */
    public dispose(): void {
        this._loader = null;
    }
    
    /** @inheritdoc */
    public loadMaterialPropertiesAsync(
        context: string,
        material: IglTFMaterial,
        babylonMaterial: Material
    ): Promise<void> | null {
        return GLTFLoader.LoadExtensionAsync(
            context,
            material,
            this.name,
            () => this._loadUnlitPropertiesAsync(context, material, babylonMaterial)
        );
    }
    
    /**
     * Loads unlit material properties.
     * @param context - The glTF context path
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon material to configure
     * @returns Promise that resolves when all properties are loaded
     * @throws Error if material type is not PBRMaterial
     */
    private _loadUnlitPropertiesAsync(
        context: string,
        material: IglTFMaterial,
        babylonMaterial: Material
    ): Promise<void> {
        if (!(babylonMaterial instanceof PBRMaterial)) {
            throw new Error(`${context}: Material type not supported`);
        }
        
        const promises: Array<Promise<void>> = [];
        
        // Enable unlit mode
        babylonMaterial.unlit = true;
        
        const pbrMetallicRoughness = material.pbrMetallicRoughness;
        
        if (pbrMetallicRoughness) {
            // Load base color
            if (pbrMetallicRoughness.baseColorFactor) {
                babylonMaterial.albedoColor = Color3.FromArray(pbrMetallicRoughness.baseColorFactor);
                babylonMaterial.alpha = pbrMetallicRoughness.baseColorFactor[ALPHA_INDEX] ?? DEFAULT_ALPHA;
            } else {
                babylonMaterial.albedoColor = Color3.White();
            }
            
            // Load base color texture
            if (pbrMetallicRoughness.baseColorTexture) {
                promises.push(
                    this._loader!.loadTextureInfoAsync(
                        `${context}/baseColorTexture`,
                        pbrMetallicRoughness.baseColorTexture,
                        (texture: BaseTexture) => {
                            texture.name = `${babylonMaterial.name} (Base Color)`;
                            babylonMaterial.albedoTexture = texture;
                        }
                    )
                );
            }
        }
        
        // Handle double-sided materials
        if (material.doubleSided) {
            babylonMaterial.backFaceCulling = false;
            babylonMaterial.twoSidedLighting = true;
        }
        
        // Load alpha properties (blend mode, alpha cutoff, etc.)
        this._loader!.loadMaterialAlphaProperties(context, material, babylonMaterial);
        
        return Promise.all(promises).then(() => {
            // All properties loaded successfully
        });
    }
}

// Register the extension with the glTF loader
GLTFLoader.RegisterExtension(EXTENSION_NAME, (loader: GLTFLoader) => {
    return new KHR_materials_unlit(loader);
});