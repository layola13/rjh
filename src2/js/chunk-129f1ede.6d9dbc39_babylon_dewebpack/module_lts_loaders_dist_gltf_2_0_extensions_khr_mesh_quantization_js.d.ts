/**
 * KHR_mesh_quantization extension for glTF 2.0
 * 
 * This extension allows vertex attributes to be stored in quantized formats,
 * reducing file size and memory usage while maintaining visual fidelity.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_mesh_quantization
 */

import type { GLTFLoader } from './glTFLoader';

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME = "KHR_mesh_quantization";

/**
 * KHR_mesh_quantization extension implementation
 * 
 * Enables support for quantized vertex attributes in glTF meshes,
 * allowing more efficient storage of geometry data.
 */
export declare class KHR_mesh_quantization {
    /**
     * The name of this extension
     */
    readonly name: string;

    /**
     * Whether this extension is enabled for the current glTF file
     */
    readonly enabled: boolean;

    /**
     * Creates an instance of the KHR_mesh_quantization extension
     * 
     * @param loader - The glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of resources used by this extension
     */
    dispose(): void;
}

/**
 * Factory function for creating KHR_mesh_quantization extension instances
 * 
 * @param loader - The glTF loader instance
 * @returns A new instance of the extension
 */
export declare function createExtension(loader: GLTFLoader): KHR_mesh_quantization;