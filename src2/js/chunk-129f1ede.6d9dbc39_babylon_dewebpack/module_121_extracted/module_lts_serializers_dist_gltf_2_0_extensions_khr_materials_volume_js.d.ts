/**
 * KHR_materials_volume extension for glTF 2.0 serializer
 * Implements the KHR_materials_volume extension for exporting volumetric material properties
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_volume
 */

import type { IMaterial } from '../glTFExporter';
import type { ITextureInfo } from '../glTFExporterInterfaces';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';
import type { Color3 } from 'core/Maths/math.color';
import type { _Exporter } from '../glTFExporter';

/**
 * Interface representing the KHR_materials_volume extension data structure
 */
export interface IKHRMaterialsVolume {
    /**
     * The thickness of the volume beneath the surface in meters.
     * If undefined, the thickness is infinitely thick.
     */
    thicknessFactor?: number;

    /**
     * A texture that defines the thickness of the volume.
     * The texture's red channel contains thickness values.
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
     * RGB color in linear space.
     */
    attenuationColor?: [number, number, number];

    /**
     * Internal helper to check if extension has textures
     */
    hasTextures?: () => boolean;
}

/**
 * Extension metadata for material extensions
 */
export interface IMaterialExtensions {
    [key: string]: unknown;
}

/**
 * Material interface with extensions support
 */
export interface IMaterialWithExtensions extends IMaterial {
    extensions?: IMaterialExtensions;
}

/**
 * glTF exporter extension that implements KHR_materials_volume
 * This extension allows exporting volumetric rendering properties such as:
 * - Subsurface thickness
 * - Light attenuation through the volume
 * - Color tinting based on light travel distance
 */
export declare class KHR_materials_volume {
    /**
     * Name of the extension
     */
    readonly name: string;

    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Defines whether this extension is required
     */
    required: boolean;

    /**
     * Internal flag tracking whether the extension was actually used during export
     */
    private _wasUsed: boolean;

    /**
     * Reference to the glTF exporter
     */
    private _exporter: _Exporter;

    /**
     * Creates a new KHR_materials_volume extension instance
     * @param exporter - The glTF exporter instance
     */
    constructor(exporter: _Exporter);

    /**
     * Disposes the extension and releases resources
     */
    dispose(): void;

    /**
     * Indicates whether the extension was used during the export process
     */
    get wasUsed(): boolean;

    /**
     * Collects additional textures required by this extension for a given material
     * @param context - The export context string
     * @param material - The Babylon material being exported
     * @param babylonMaterial - The source Babylon material
     * @returns Array of textures used by the volume extension (thickness texture)
     */
    postExportMaterialAdditionalTextures(
        context: string,
        material: IMaterial,
        babylonMaterial: unknown
    ): BaseTexture[];

    /**
     * Checks if the volume extension should be enabled for the given material
     * @param material - The PBR material to check
     * @returns True if the extension should be enabled, false otherwise
     */
    private _isExtensionEnabled(material: PBRMaterial): boolean;

    /**
     * Checks if the material has any textures that require the extension
     * @param material - The PBR material to check
     * @returns True if the material has a thickness texture
     */
    private _hasTexturesExtension(material: PBRMaterial): boolean;

    /**
     * Exports the KHR_materials_volume extension data for a material after standard export
     * @param context - The export context string
     * @param material - The glTF material being exported
     * @param babylonMaterial - The source Babylon PBR material
     * @returns Promise that resolves with the modified material
     */
    postExportMaterialAsync(
        context: string,
        material: IMaterialWithExtensions,
        babylonMaterial: unknown
    ): Promise<IMaterialWithExtensions>;
}