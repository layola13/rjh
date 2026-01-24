import type { Nullable } from "core/types";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { IMaterial } from "../glTFLoaderInterfaces";
import type { IProperty } from "babylonjs-gltf2interface";
import type { GLTFLoader } from "../glTFLoader";

/**
 * Extension name constant for MSFT_minecraftMesh glTF extension
 */
declare const EXTENSION_NAME = "MSFT_minecraftMesh";

/**
 * Loader extension for handling Minecraft-style meshes in glTF files.
 * This extension enables special material properties required for Minecraft rendering,
 * including forced depth writing and two-sided lighting.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_minecraftMesh
 */
export declare class MSFT_minecraftMesh {
    /**
     * The name of this extension.
     */
    readonly name: typeof EXTENSION_NAME;

    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;

    /**
     * Reference to the glTF loader instance.
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates a new instance of the MSFT_minecraftMesh extension.
     * @param loader - The parent glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of the extension and releases resources.
     * Clears the reference to the loader.
     */
    dispose(): void;

    /**
     * Loads material properties asynchronously with Minecraft-specific settings.
     * Applies special rendering properties like forced depth writing, separate culling pass,
     * and two-sided lighting when the extension is present.
     * 
     * @param context - The glTF context string for error reporting
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon.js material instance to configure
     * @returns A promise that resolves when material properties are loaded
     * @throws Error if the material type is not PBRMaterial
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Nullable<Promise<void>>;
}