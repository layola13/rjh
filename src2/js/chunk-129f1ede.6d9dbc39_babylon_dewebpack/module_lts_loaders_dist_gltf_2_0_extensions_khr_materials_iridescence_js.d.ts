import type { IGLTFLoaderExtension } from '@babylonjs/loaders/glTF/2.0/glTFLoaderExtension';
import type { IProperty } from '@babylonjs/loaders/glTF/2.0/glTFLoaderInterfaces';
import type { IMaterial } from '@babylonjs/loaders/glTF/2.0/glTFLoaderInterfaces';
import type { PBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import type { GLTFLoader } from '@babylonjs/loaders/glTF/2.0/glTFLoader';
import type { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';

/**
 * Interface representing the glTF KHR_materials_iridescence extension data structure
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_iridescence
 */
export interface IKHRMaterialsIridescence {
    /**
     * The iridescence intensity factor (range: [0.0, 1.0], default: 0.0)
     */
    iridescenceFactor?: number;

    /**
     * The iridescence texture containing intensity values in the R channel
     */
    iridescenceTexture?: ITextureInfo;

    /**
     * The index of refraction of the dielectric thin-film layer (default: 1.3)
     */
    iridescenceIor?: number;

    /**
     * Legacy property name for index of refraction (deprecated)
     */
    iridescenceIOR?: number;

    /**
     * The minimum thickness of the thin-film layer in nanometers (default: 100)
     */
    iridescenceThicknessMinimum?: number;

    /**
     * The maximum thickness of the thin-film layer in nanometers (default: 400)
     */
    iridescenceThicknessMaximum?: number;

    /**
     * The iridescence thickness texture containing thickness values in the G channel
     */
    iridescenceThicknessTexture?: ITextureInfo;
}

/**
 * Texture info reference
 */
interface ITextureInfo {
    index: number;
    texCoord?: number;
}

/**
 * Loader extension for the KHR_materials_iridescence glTF extension
 * 
 * This extension adds iridescence (thin-film interference) effects to materials,
 * simulating the rainbow-like color shifts seen on soap bubbles, oil slicks, etc.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_iridescence
 */
export declare class KHR_materials_iridescence implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: string;

    /**
     * Defines the order of this extension relative to other extensions
     * Lower values are processed first
     */
    readonly order: number;

    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Reference to the parent glTF loader
     */
    private _loader: GLTFLoader | null;

    /**
     * Creates a new instance of the KHR_materials_iridescence extension
     * @param loader - The parent glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of extension resources and cleans up references
     */
    dispose(): void;

    /**
     * Loads material properties from the extension data
     * @param context - The glTF context path for error reporting
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon.js material to apply properties to
     * @returns Promise that resolves when all material properties are loaded
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: PBRMaterial
    ): Promise<void>;

    /**
     * Internal method to load iridescence-specific properties
     * @param context - The glTF context path for error reporting
     * @param extension - The extension data containing iridescence parameters
     * @param babylonMaterial - The Babylon.js PBR material to configure
     * @returns Promise that resolves when iridescence properties are loaded
     * @internal
     */
    private _loadIridescencePropertiesAsync(
        context: string,
        extension: IKHRMaterialsIridescence,
        babylonMaterial: PBRMaterial
    ): Promise<void>;
}