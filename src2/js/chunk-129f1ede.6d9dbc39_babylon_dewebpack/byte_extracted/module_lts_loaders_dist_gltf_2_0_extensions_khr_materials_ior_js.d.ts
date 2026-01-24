import type { IGLTFLoaderExtension } from "@lts/loaders";
import type { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import type { IKHRMaterialsIor } from "babylonjs-gltf2interface";
import type { IMaterial } from "../glTFLoaderInterfaces";
import type { Nullable } from "@babylonjs/core/types";

/**
 * glTF extension name constant for KHR_materials_ior
 */
declare const EXTENSION_NAME = "KHR_materials_ior";

/**
 * Loader extension that implements the KHR_materials_ior glTF extension.
 * This extension defines the index of refraction (IOR) for materials.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_ior
 */
export declare class KHR_materials_ior implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: typeof EXTENSION_NAME;

    /**
     * Defines the order of this extension.
     * The loader will execute extensions in ascending order by this value.
     */
    readonly order: 180;

    /**
     * Defines whether this extension is enabled.
     * Set to true if the glTF asset declares usage of this extension.
     */
    enabled: boolean;

    /**
     * Default index of refraction value used when no IOR is specified.
     * Standard value for common materials.
     */
    private static readonly _DEFAULT_IOR: 1.5;

    /**
     * Reference to the glTF loader instance.
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates a new instance of the KHR_materials_ior extension.
     * @param loader - The parent glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of the extension and releases resources.
     * Clears the reference to the loader.
     */
    dispose(): void;

    /**
     * Loads material properties from the glTF material extension.
     * This method is called by the loader when processing materials.
     * @param context - The glTF context path for error reporting
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon.js material instance to populate
     * @returns A promise that resolves when the properties are loaded
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void>;

    /**
     * Loads IOR properties from the extension data and applies them to the material.
     * @param context - The glTF context path for error reporting
     * @param extension - The parsed KHR_materials_ior extension data
     * @param babylonMaterial - The Babylon.js material to modify
     * @returns A promise that resolves when IOR properties are applied
     * @throws Error if the material type is not PBRMaterial
     */
    private _loadIorPropertiesAsync(
        context: string,
        extension: IKHRMaterialsIor,
        babylonMaterial: Material
    ): Promise<void>;
}