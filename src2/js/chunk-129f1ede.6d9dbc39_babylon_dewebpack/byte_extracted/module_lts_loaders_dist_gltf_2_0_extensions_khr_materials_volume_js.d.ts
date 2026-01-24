/**
 * Loader extension for KHR_materials_volume glTF extension.
 * This extension defines volumetric properties for materials, enabling effects like fog, smoke, and translucent materials.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_volume
 */

import { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import { BaseTexture } from "core/Materials/Textures/baseTexture";
import { GLTFLoader, IGLTFLoaderExtension } from "../glTFLoader";
import { IKHRMaterialsVolume } from "./KHR_materials_volume.types";
import { IMaterial } from "../glTFLoaderInterfaces";
import { Material } from "core/Materials/material";

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME = "KHR_materials_volume";

/**
 * Interface representing the KHR_materials_volume extension data structure
 */
export interface IKHRMaterialsVolumeExtension {
    /**
     * Thickness of the volume in the local space of the mesh.
     * Range: [0.0, +∞), default: 0.0
     */
    thicknessFactor?: number;

    /**
     * Texture defining the thickness per pixel. Stored in the G channel.
     */
    thicknessTexture?: {
        index: number;
        texCoord?: number;
        nonColorData?: boolean;
    };

    /**
     * Distance in world space units traveled by light through the medium before fully attenuated.
     * Range: (0.0, +∞), default: +∞
     */
    attenuationDistance?: number;

    /**
     * Color that white light turns into after traveling the attenuation distance.
     * RGB color in linear space, default: [1.0, 1.0, 1.0]
     */
    attenuationColor?: [number, number, number];
}

/**
 * glTF loader extension implementing KHR_materials_volume.
 * Handles loading and applying volumetric material properties to Babylon.js PBR materials.
 */
export declare class KHR_materials_volume implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;

    /**
     * Defines the loading order relative to other extensions.
     */
    readonly order: number;

    /**
     * Whether this extension is enabled.
     */
    readonly enabled: boolean;

    /**
     * Reference to the parent glTF loader.
     */
    private _loader: GLTFLoader;

    /**
     * Creates an instance of KHR_materials_volume extension.
     * @param loader - The parent glTF loader
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes the extension and releases resources.
     */
    dispose(): void;

    /**
     * Loads material properties asynchronously, including volume properties.
     * @param context - The glTF context path for error reporting
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon.js material to apply properties to
     * @returns Promise that resolves when all material properties are loaded
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void>;

    /**
     * Loads volume-specific properties from the extension data.
     * @param context - The glTF context path for error reporting
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon.js PBR material to configure
     * @param extensionData - The parsed KHR_materials_volume extension data
     * @returns Promise that resolves when volume properties are applied
     * @throws Error if the material is not a PBRMaterial
     */
    private _loadVolumePropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: PBRMaterial,
        extensionData: IKHRMaterialsVolumeExtension
    ): Promise<void>;
}