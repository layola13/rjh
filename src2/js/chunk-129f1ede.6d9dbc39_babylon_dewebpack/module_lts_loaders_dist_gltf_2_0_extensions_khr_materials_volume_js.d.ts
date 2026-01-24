/**
 * Loader extension for the KHR_materials_volume glTF extension.
 * This extension defines a volume component for materials that support refraction and subsurface scattering.
 * @see https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md
 */

import type { Nullable } from "core/types";
import type { Material } from "core/Materials/material";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { ITextureInfo } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { GLTFLoader } from "../glTFLoader";

/**
 * Interface representing the KHR_materials_volume extension data in glTF.
 */
export interface IKHRMaterialsVolume {
    /**
     * The thickness of the volume beneath the surface in meters.
     * If undefined, the material is considered to be infinitely thick.
     */
    thicknessFactor?: number;

    /**
     * A texture that defines the thickness in the G channel.
     * This will be multiplied by thicknessFactor.
     */
    thicknessTexture?: ITextureInfo;

    /**
     * The distance that light travels in the medium before interacting with a particle.
     * Measured in meters. If undefined, the medium is considered to be non-attenuating.
     */
    attenuationDistance?: number;

    /**
     * The color that white light becomes due to absorption when reaching the attenuation distance.
     * Array of 3 numbers in linear RGB space.
     */
    attenuationColor?: [number, number, number];
}

/**
 * Loader extension for KHR_materials_volume.
 * Implements volume rendering properties for subsurface materials.
 */
export class KHR_materials_volume implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    public readonly name = "KHR_materials_volume";

    /**
     * Defines a number that determines the order the extensions are applied.
     * Higher numbers are applied later.
     */
    public readonly order = 173;

    /**
     * Defines whether this extension is enabled.
     */
    public enabled: boolean;

    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates a new instance of the KHR_materials_volume extension.
     * @param loader The glTF loader
     */
    constructor(loader: GLTFLoader) {
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(this.name);
        
        if (this.enabled) {
            // Volume materials cannot use instanced meshes due to per-instance thickness requirements
            this._loader._disableInstancedMesh++;
        }
    }

    /**
     * Disposes of the extension resources.
     */
    public dispose(): void {
        if (this.enabled) {
            this._loader!._disableInstancedMesh--;
        }
        this._loader = null;
    }

    /**
     * Loads material properties from the glTF extension.
     * @param context The glTF context
     * @param material The glTF material
     * @param babylonMaterial The Babylon material
     * @returns A promise that resolves when the properties are loaded
     */
    public loadMaterialPropertiesAsync(
        context: string,
        material: Material,
        babylonMaterial: Material
    ): Promise<void> {
        return GLTFLoader.LoadExtensionAsync<IKHRMaterialsVolume>(
            context,
            material,
            this.name,
            (extensionContext, extension) => {
                const promises = new Array<Promise<void>>();
                
                // Load base material properties
                promises.push(this._loader!.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
                
                // Load standard material properties
                promises.push(this._loader!.loadMaterialPropertiesAsync(context, material, babylonMaterial));
                
                // Load volume-specific properties
                promises.push(this._loadVolumePropertiesAsync(extensionContext, material, babylonMaterial, extension));
                
                return Promise.all(promises).then(() => {});
            }
        );
    }

    /**
     * Loads volume properties from the extension data.
     * @param context The extension context
     * @param material The glTF material
     * @param babylonMaterial The Babylon material
     * @param extension The volume extension data
     * @returns A promise that resolves when the volume properties are loaded
     */
    private _loadVolumePropertiesAsync(
        context: string,
        material: Material,
        babylonMaterial: Material,
        extension: IKHRMaterialsVolume
    ): Promise<void> {
        if (!(babylonMaterial instanceof PBRMaterial)) {
            throw new Error(`${context}: Material type not supported`);
        }

        // Volume only applies when refraction or translucency is enabled
        if ((!babylonMaterial.subSurface.isRefractionEnabled && !babylonMaterial.subSurface.isTranslucencyEnabled) || 
            extension.thicknessFactor === undefined) {
            return Promise.resolve();
        }

        // Apply index of refraction to volume
        babylonMaterial.subSurface.volumeIndexOfRefraction = babylonMaterial.indexOfRefraction;

        // Set attenuation distance (default to maximum if not specified)
        const attenuationDistance = extension.attenuationDistance ?? Number.MAX_VALUE;
        babylonMaterial.subSurface.tintColorAtDistance = attenuationDistance;

        // Apply attenuation color (RGB)
        if (extension.attenuationColor !== undefined && extension.attenuationColor.length === 3) {
            babylonMaterial.subSurface.tintColor.copyFromFloats(
                extension.attenuationColor[0],
                extension.attenuationColor[1],
                extension.attenuationColor[2]
            );
        }

        // Set thickness properties
        babylonMaterial.subSurface.minimumThickness = 0;
        babylonMaterial.subSurface.maximumThickness = extension.thicknessFactor;
        babylonMaterial.subSurface.useThicknessAsDepth = true;

        // Load thickness texture if present
        if (extension.thicknessTexture) {
            extension.thicknessTexture.nonColorData = true;
            return this._loader!.loadTextureInfoAsync(
                `${context}/thicknessTexture`,
                extension.thicknessTexture
            ).then((texture) => {
                babylonMaterial.subSurface.thicknessTexture = texture;
                babylonMaterial.subSurface.useGltfStyleTextures = true;
            });
        }

        return Promise.resolve();
    }
}

// Register the extension with the glTF loader
GLTFLoader.RegisterExtension("KHR_materials_volume", (loader: GLTFLoader) => {
    return new KHR_materials_volume(loader);
});