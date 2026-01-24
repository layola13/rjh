/**
 * glTF extension for GPU instancing using EXT_mesh_gpu_instancing.
 * This extension enables efficient rendering of multiple instances of the same mesh
 * by using GPU instancing with per-instance transformation data.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing
 */

import type { Nullable } from "core/types";
import type { IDisposable } from "core/scene";
import type { TransformNode } from "core/Meshes/transformNode";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { INode } from "../glTFLoaderInterfaces";
import type { GLTFLoader } from "../glTFLoader";

/**
 * Extension name constant
 */
export declare const EXT_MESH_GPU_INSTANCING_NAME: "EXT_mesh_gpu_instancing";

/**
 * glTF extension data structure for EXT_mesh_gpu_instancing
 */
export interface IEXT_mesh_gpu_instancing {
    /**
     * Attribute accessors for instance data.
     * Keys can be "TRANSLATION", "ROTATION", "SCALE", or custom attributes.
     */
    attributes: {
        /**
         * Accessor index for per-instance translation vectors
         */
        TRANSLATION?: number;
        
        /**
         * Accessor index for per-instance rotation quaternions
         */
        ROTATION?: number;
        
        /**
         * Accessor index for per-instance scale vectors
         */
        SCALE?: number;
        
        /**
         * Additional custom instance attributes
         */
        [key: string]: number | undefined;
    };
}

/**
 * Loader extension for handling EXT_mesh_gpu_instancing.
 * 
 * This extension allows glTF assets to define multiple instances of a mesh with
 * per-instance transformation attributes (translation, rotation, scale) stored
 * efficiently in GPU buffers.
 * 
 * @implements {IGLTFLoaderExtension}
 * @implements {IDisposable}
 */
export declare class EXT_mesh_gpu_instancing implements IGLTFLoaderExtension, IDisposable {
    /**
     * The name of this extension.
     */
    readonly name: "EXT_mesh_gpu_instancing";
    
    /**
     * Whether this extension is enabled.
     * Set to true if the glTF asset uses this extension.
     */
    enabled: boolean;
    
    /**
     * Reference to the parent glTF loader.
     */
    private _loader: Nullable<GLTFLoader>;
    
    /**
     * Creates a new instance of the EXT_mesh_gpu_instancing extension.
     * 
     * @param loader - The parent glTF loader
     */
    constructor(loader: GLTFLoader);
    
    /**
     * Disposes of extension resources.
     * Cleans up the loader reference.
     */
    dispose(): void;
    
    /**
     * Loads a glTF node with GPU instancing support.
     * 
     * This method:
     * 1. Loads the base node without instancing
     * 2. Reads instance attribute data (TRANSLATION, ROTATION, SCALE)
     * 3. Composes transformation matrices for each instance
     * 4. Applies thin instance buffers to all primitive meshes
     * 
     * @param context - The glTF context path for error messages
     * @param node - The glTF node data
     * @param assign - Callback to assign the loaded Babylon.js node
     * @returns Promise that resolves to the loaded TransformNode
     */
    loadNodeAsync(
        context: string,
        node: INode,
        assign: (babylonTransformNode: TransformNode) => void
    ): Promise<TransformNode>;
}