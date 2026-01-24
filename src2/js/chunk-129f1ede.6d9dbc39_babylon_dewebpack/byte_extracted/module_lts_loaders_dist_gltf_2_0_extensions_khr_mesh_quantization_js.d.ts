/**
 * KHR_mesh_quantization extension for glTF 2.0 loader
 * 
 * This extension allows vertex attributes to be stored in quantized formats,
 * reducing memory usage and improving loading performance.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_mesh_quantization
 */

import type { GLTFLoader } from '../glTFLoader';

/**
 * The name identifier for the KHR_mesh_quantization extension
 */
export declare const EXTENSION_NAME = "KHR_mesh_quantization";

/**
 * Implements support for the KHR_mesh_quantization glTF extension.
 * 
 * This extension enables the use of quantized vertex attribute formats such as:
 * - BYTE, UNSIGNED_BYTE
 * - SHORT, UNSIGNED_SHORT
 * for POSITION, NORMAL, TANGENT, and TEXCOORD attributes.
 */
export declare class KHR_mesh_quantization {
    /**
     * The name of this extension
     */
    readonly name: string;

    /**
     * Whether this extension is enabled for the current glTF asset
     */
    readonly enabled: boolean;

    /**
     * Creates an instance of the KHR_mesh_quantization extension
     * 
     * @param loader - The parent glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of resources used by this extension
     */
    dispose(): void;
}

/**
 * Factory function for registering the extension with the glTF loader
 * 
 * @param loader - The glTF loader instance
 * @returns A new instance of the KHR_mesh_quantization extension
 */
export declare function createExtension(loader: GLTFLoader): KHR_mesh_quantization;