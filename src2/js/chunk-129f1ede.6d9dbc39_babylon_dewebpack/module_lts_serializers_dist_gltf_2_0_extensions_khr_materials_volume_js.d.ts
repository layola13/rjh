/**
 * glTF Exporter extension for KHR_materials_volume
 * Handles volume-related material properties for glTF 2.0 export
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_volume
 */

import type { IMaterial } from '../glTFMaterialExporter';
import type { ITextureInfo } from '../glTFExporterInterfaces';
import type { _Exporter } from '../glTFExporter';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';
import type { Color3 } from 'core/Maths/math.color';

/**
 * KHR_materials_volume extension name constant
 */
export declare const KHR_MATERIALS_VOLUME_NAME: 'KHR_materials_volume';

/**
 * Interface representing the KHR_materials_volume extension data
 */
export interface IKHRMaterialsVolume {
    /**
     * The thickness of the volume beneath the surface in meters.
     * If undefined, the material is considered to be infinitely thick.
     */
    thicknessFactor?: number;

    /**
     * Texture that defines the thickness in the G channel.
     * Will be multiplied by thicknessFactor.
     */
    thicknessTexture?: ITextureInfo;

    /**
     * Density of the medium given as the average distance that light travels 
     * in the medium before interacting with a particle.
     * If undefined, the medium is assumed to be infinitely dense.
     */
    attenuationDistance?: number;

    /**
     * The color that white light turns into due to absorption when reaching the attenuation distance.
     * RGB components in linear space.
     */
    attenuationColor?: [number, number, number];

    /**
     * Internal helper to check if extension uses textures
     * @internal
     */
    hasTextures?: () => boolean;
}

/**
 * glTF Exporter extension that exports KHR_materials_volume data
 * 
 * This extension defines volume properties for materials that exhibit transmission,
 * such as thickness, attenuation distance, and attenuation color.
 */
export declare class KHR_materials_volume {
    /**
     * Name of the extension
     */
    readonly name: typeof KHR_MATERIALS_VOLUME_NAME;

    /**
     * Whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Whether this extension is required
     */
    required: boolean;

    /**
     * Reference to the glTF exporter
     * @internal
     */
    private readonly _exporter: _Exporter;

    /**
     * Tracks whether this extension was actually used during export
     * @internal
     */
    private _wasUsed: boolean;

    /**
     * Creates a new KHR_materials_volume extension instance
     * @param exporter - The glTF exporter instance
     */
    constructor(exporter: _Exporter);

    /**
     * Dispose and release resources
     */
    dispose(): void;

    /**
     * Indicates whether this extension was used during the export process
     */
    get wasUsed(): boolean;

    /**
     * Collects additional textures used by this extension
     * @param context - Export context string
     * @param material - The glTF material being processed
     * @param babylonMaterial - The Babylon material source
     * @returns Array of textures used by the volume extension
     */
    postExportMaterialAdditionalTextures(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): BaseTexture[];

    /**
     * Checks if the volume extension should be enabled for the given material
     * @param material - The PBR material to check
     * @returns True if the extension is applicable
     * @internal
     */
    private _isExtensionEnabled(material: PBRMaterial): boolean;

    /**
     * Checks if the material uses any textures for the volume extension
     * @param material - The PBR material to check
     * @returns True if volume textures are present
     * @internal
     */
    private _hasTexturesExtension(material: PBRMaterial): boolean;

    /**
     * Exports the KHR_materials_volume extension data after material export
     * @param context - Export context string
     * @param material - The glTF material being exported
     * @param babylonMaterial - The source Babylon material
     * @returns Promise resolving to the modified material with extension data
     */
    postExportMaterialAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<IMaterial>;
}