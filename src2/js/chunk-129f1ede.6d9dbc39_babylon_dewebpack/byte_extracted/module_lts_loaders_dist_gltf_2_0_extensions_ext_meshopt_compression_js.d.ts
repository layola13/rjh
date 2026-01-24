/**
 * EXT_meshopt_compression extension for glTF 2.0 loader.
 * This extension enables efficient compression of mesh geometry data using meshoptimizer.
 * @see https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_meshopt_compression/README.md
 */

import type { GLTFLoader } from '../glTFLoader';
import type { IBufferView } from '../glTFLoaderInterfaces';
import type { IGLTFLoaderExtension } from '../glTFLoaderExtension';
import type { Nullable } from 'core/types';

/**
 * Extension name constant
 */
export declare const EXT_MESHOPT_COMPRESSION_NAME = "EXT_meshopt_compression";

/**
 * MeshOpt compression data structure as defined by the extension specification
 */
export interface IEXTMeshoptCompression {
    /**
     * The index of the buffer containing the compressed data
     */
    buffer: number;

    /**
     * The offset into the buffer in bytes
     */
    byteOffset?: number;

    /**
     * The length of the compressed data in bytes
     */
    byteLength: number;

    /**
     * The stride in bytes
     */
    byteStride: number;

    /**
     * The number of elements
     */
    count: number;

    /**
     * The compression mode/algorithm identifier
     */
    mode: string;

    /**
     * Optional filter to apply after decompression
     */
    filter?: string;
}

/**
 * Extended buffer view interface with cached meshopt decompression data
 */
export interface IBufferViewWithMeshOpt extends IBufferView {
    /**
     * Cached promise for the decompressed mesh data
     */
    _meshOptData?: Promise<ArrayBufferView>;
}

/**
 * Loader extension for EXT_meshopt_compression.
 * Enables loading of buffer views compressed with meshoptimizer compression.
 */
export declare class EXT_meshopt_compression implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: string;

    /**
     * Whether this extension is enabled
     */
    readonly enabled: boolean;

    /**
     * Reference to the parent glTF loader
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates a new instance of the EXT_meshopt_compression extension
     * @param loader The glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of this extension and releases all associated resources
     */
    dispose(): void;

    /**
     * Loads and decompresses a buffer view using meshopt compression
     * @param context The context string for error logging
     * @param bufferView The buffer view to load
     * @returns Promise that resolves to the decompressed buffer data
     */
    loadBufferViewAsync(
        context: string,
        bufferView: IBufferView
    ): Promise<ArrayBufferView>;
}