/**
 * MSFT_minecraftMesh glTF extension loader
 * Handles Minecraft-specific material properties in glTF files
 */

import { GLTFLoader } from '../glTFLoader';
import { IProperty } from '../glTFLoaderInterfaces';
import { IMaterial } from '../glTFLoaderInterfaces';
import { Material } from 'core/Materials/material';
import { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import { Nullable } from 'core/types';

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "MSFT_minecraftMesh";

/**
 * glTF extension data structure for MSFT_minecraftMesh
 */
export interface IMSFT_minecraftMesh {
    /** Extension-specific properties */
    [key: string]: unknown;
}

/**
 * MSFT_minecraftMesh extension loader
 * Loads Minecraft mesh materials with specific rendering properties
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_minecraftMesh
 */
export declare class MSFT_minecraftMesh {
    /**
     * The name of this extension
     */
    readonly name: string;

    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Reference to the glTF loader
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates a new instance of the MSFT_minecraftMesh extension
     * @param loader The glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of the extension and releases resources
     */
    dispose(): void;

    /**
     * Loads material properties asynchronously
     * Configures PBR materials with Minecraft-specific rendering settings:
     * - Enables depth writing for transparent materials
     * - Sets up separate culling pass
     * - Configures back face culling based on depth write
     * - Enables two-sided lighting
     * 
     * @param context The glTF context for error reporting
     * @param material The glTF material definition
     * @param babylonMaterial The Babylon.js material to configure
     * @returns A promise that resolves when the material properties are loaded
     * @throws Error if the material type is not PBRMaterial
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Nullable<Promise<void>>;
}