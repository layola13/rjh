/**
 * glTF extension for loading meshes with EXT_meshopt_compression.
 * This extension enables efficient mesh compression using the meshoptimizer library.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_meshopt_compression
 */

import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { GLTFLoader } from "../glTFLoader";
import type { IBufferView } from "../glTFLoaderInterfaces";
import type { Nullable } from "core/types";

/**
 * Defines the structure of the EXT_meshopt_compression extension data
 * as it appears in the glTF buffer view.
 */
export interface IEXTMeshoptCompression {
    /**
     * The index of the buffer containing the compressed data.
     */
    buffer: number;

    /**
     * The offset into the buffer in bytes.
     */
    byteOffset?: number;

    /**
     * The length of the compressed data in bytes.
     */
    byteLength: number;

    /**
     * The stride in bytes between consecutive elements.
     */
    byteStride: number;

    /**
     * The number of elements to decode.
     */
    count: number;

    /**
     * The compression mode/algorithm identifier.
     */
    mode: string;

    /**
     * Optional filter to apply during decompression.
     */
    filter?: string;
}

/**
 * Extended buffer view interface that includes cached meshopt decompression data.
 */
interface IBufferViewWithMeshopt extends IBufferView {
    /**
     * Cached promise for the decompressed buffer data.
     * @internal
     */
    _meshOptData?: Promise<ArrayBufferView>;
}

/**
 * Loader extension for handling EXT_meshopt_compression.
 * Decompresses buffer views that use meshoptimizer compression.
 */
export declare class EXT_meshopt_compression implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: "EXT_meshopt_compression";

    /**
     * Whether this extension is enabled based on the glTF asset's extensionsUsed.
     */
    readonly enabled: boolean;

    /**
     * Reference to the parent glTF loader.
     * @internal
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates a new instance of the EXT_meshopt_compression extension.
     * @param loader - The parent glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of this extension and releases resources.
     */
    dispose(): void;

    /**
     * Loads a buffer view asynchronously, decompressing it if needed.
     * @param context - The glTF context string for error messages
     * @param bufferView - The buffer view to load
     * @returns A promise that resolves with the decompressed buffer data
     */
    loadBufferViewAsync(
        context: string,
        bufferView: IBufferView
    ): Promise<ArrayBufferView>;
}