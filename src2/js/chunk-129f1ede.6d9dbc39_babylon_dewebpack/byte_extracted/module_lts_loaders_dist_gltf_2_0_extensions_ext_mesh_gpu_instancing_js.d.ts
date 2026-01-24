/**
 * glTF extension for GPU instancing support (EXT_mesh_gpu_instancing)
 * This extension allows efficient rendering of multiple instances of the same mesh
 * by storing instance transforms in GPU buffers.
 */

import { Observable } from "core/Misc/observable";
import { GLTFLoader, ArrayItem } from "../../../lts/loaders/dist/glTF/2.0/glTFLoader";
import { INode } from "../glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { Nullable } from "core/types";
import { TransformNode } from "core/Meshes/transformNode";
import { IEXTMeshGpuInstancing } from "./EXT_mesh_gpu_instancing";

/**
 * Extension name constant
 */
export const EXTENSION_NAME = "EXT_mesh_gpu_instancing";

/**
 * Interface for the EXT_mesh_gpu_instancing extension data
 */
export interface IEXTMeshGpuInstancingAttributes {
    /**
     * Accessor index for translation data
     */
    TRANSLATION?: number;
    
    /**
     * Accessor index for rotation data (quaternion)
     */
    ROTATION?: number;
    
    /**
     * Accessor index for scale data
     */
    SCALE?: number;
}

/**
 * Interface for the extension object in the glTF node
 */
export interface IEXTMeshGpuInstancing {
    /**
     * Attributes containing accessor indices for instance transforms
     */
    attributes: IEXTMeshGpuInstancingAttributes;
}

/**
 * Loader extension for EXT_mesh_gpu_instancing
 * Enables efficient GPU-based instancing of meshes with per-instance transforms.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing
 */
export declare class EXT_mesh_gpu_instancing implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: string;
    
    /**
     * Whether this extension is enabled
     */
    enabled: boolean;
    
    /**
     * Reference to the glTF loader
     */
    private _loader: Nullable<GLTFLoader>;
    
    /**
     * Creates a new instance of the EXT_mesh_gpu_instancing extension
     * @param loader The glTF loader
     */
    constructor(loader: GLTFLoader);
    
    /**
     * Disposes the extension and cleans up resources
     */
    dispose(): void;
    
    /**
     * Loads a node with GPU instancing data
     * @param context The loader context for error reporting
     * @param node The glTF node to load
     * @param assign Function to assign the loaded transform node
     * @returns Promise that resolves to the loaded transform node
     */
    loadNodeAsync(
        context: string,
        node: INode,
        assign: (babylonTransformNode: TransformNode) => void
    ): Promise<TransformNode>;
    
    /**
     * Loads instance attribute accessor data
     * @param context The loader context for error reporting
     * @param extensionData The extension data from the glTF node
     * @param attributeName The name of the attribute to load (TRANSLATION, ROTATION, or SCALE)
     * @returns Promise that resolves to the attribute data or null if not present
     */
    private _loadInstanceAttributeAsync(
        context: string,
        extensionData: IEXTMeshGpuInstancing,
        attributeName: keyof IEXTMeshGpuInstancingAttributes
    ): Promise<Nullable<Float32Array>>;
    
    /**
     * Creates instance transform matrices from translation, rotation, and scale data
     * @param instanceCount Number of instances
     * @param translations Translation data (Vector3 per instance)
     * @param rotations Rotation data (Quaternion per instance)
     * @param scales Scale data (Vector3 per instance)
     * @returns Float32Array containing 4x4 transform matrices for all instances
     */
    private _createInstanceMatrices(
        instanceCount: number,
        translations: Nullable<Float32Array>,
        rotations: Nullable<Float32Array>,
        scales: Nullable<Float32Array>
    ): Float32Array;
}