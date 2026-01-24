/**
 * KHR_texture_transform extension for glTF 2.0
 * 
 * This extension allows for texture transformations including offset, rotation, and scale.
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_transform
 */

import type { Texture } from 'core/Misc/observable';
import type { GLTFLoader } from '../../../lts/loaders/dist/glTF/2.0/glTFLoader';
import type { ITextureInfo } from 'babylonjs-gltf2interface';

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME = "KHR_texture_transform";

/**
 * Interface for KHR_texture_transform extension data
 */
export interface IKHRTextureTransform {
    /**
     * The offset of the UV coordinates. Default [0.0, 0.0]
     */
    offset?: [number, number];
    
    /**
     * Rotate the UVs by this many radians counter-clockwise around the origin. Default 0.0
     */
    rotation?: number;
    
    /**
     * The scale factor applied to the UV coordinates. Default [1.0, 1.0]
     */
    scale?: [number, number];
    
    /**
     * Overrides the textureInfo texCoord value if supplied
     */
    texCoord?: number;
}

/**
 * glTF loader extension for handling KHR_texture_transform
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_transform
 */
export declare class KHR_texture_transform {
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
    private _loader: GLTFLoader | null;
    
    /**
     * Creates a new instance of the KHR_texture_transform extension
     * @param loader - The glTF loader instance
     */
    constructor(loader: GLTFLoader);
    
    /**
     * Disposes of the extension and releases resources
     */
    dispose(): void;
    
    /**
     * Loads a texture info with the KHR_texture_transform extension applied
     * @param context - The context when loading the asset
     * @param textureInfo - The glTF texture info object
     * @param assign - A function called to assign the loaded texture
     * @returns A promise that resolves when the texture info has been loaded
     */
    loadTextureInfoAsync(
        context: string,
        textureInfo: ITextureInfo,
        assign: (texture: Texture) => void
    ): Promise<void>;
}