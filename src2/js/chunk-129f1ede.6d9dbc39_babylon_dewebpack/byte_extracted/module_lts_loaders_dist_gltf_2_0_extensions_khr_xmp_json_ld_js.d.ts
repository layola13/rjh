/**
 * glTF extension for XMP metadata support (KHR_xmp_json_ld)
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_xmp_json_ld
 */

import { GLTFLoader } from './glTFLoader';
import { IGLTFLoaderExtension } from './glTFLoaderExtension';
import { Nullable } from '@babylonjs/core/types';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

/** Extension name constant */
declare const EXTENSION_NAME = "KHR_xmp_json_ld";

/**
 * XMP packet reference in asset extensions
 */
interface IKHRXmpJsonLdAssetExtension {
    /** Index of the XMP packet in the root extension */
    packet: number;
}

/**
 * XMP packets array in root glTF extensions
 */
interface IKHRXmpJsonLdRootExtension {
    /** Array of XMP metadata packets */
    packets?: string[];
}

/**
 * glTF asset definition with extensions
 */
interface IGLTFAsset {
    extensions?: {
        KHR_xmp_json_ld?: IKHRXmpJsonLdAssetExtension;
    };
}

/**
 * glTF root object with extensions
 */
interface IGLTF {
    asset?: IGLTFAsset;
    extensions?: {
        KHR_xmp_json_ld?: IKHRXmpJsonLdRootExtension;
    };
}

/**
 * Loader extension that handles KHR_xmp_json_ld glTF extension.
 * This extension adds XMP metadata to the root Babylon mesh.
 */
export declare class KHR_xmp_json_ld implements IGLTFLoaderExtension {
    /** Extension name */
    readonly name: typeof EXTENSION_NAME;
    
    /** Loading order priority */
    readonly order: number;
    
    /** Whether the extension is enabled */
    enabled: boolean;
    
    /** Reference to the glTF loader */
    private _loader: Nullable<GLTFLoader>;
    
    /**
     * Creates a new instance of the KHR_xmp_json_ld extension
     * @param loader The glTF loader instance
     */
    constructor(loader: GLTFLoader);
    
    /**
     * Disposes the extension and releases resources
     */
    dispose(): void;
    
    /**
     * Called during the loading phase to attach XMP metadata to the root mesh.
     * Reads XMP packet data from glTF extensions and attaches it to the root Babylon mesh metadata.
     */
    onLoading(): void;
}

/**
 * Extension registration with GLTFLoader
 */
declare module './glTFLoader' {
    interface GLTFLoader {
        /**
         * Registers an extension factory function
         * @param name Extension name
         * @param factory Factory function that creates the extension instance
         */
        static RegisterExtension(
            name: string,
            factory: (loader: GLTFLoader) => IGLTFLoaderExtension
        ): void;
        
        /** Root Babylon mesh created by the loader */
        rootBabylonMesh: Nullable<AbstractMesh>;
        
        /** Parsed glTF JSON object */
        gltf: IGLTF;
        
        /**
         * Checks if an extension is used in the glTF file
         * @param name Extension name
         * @returns True if the extension is listed in extensionsUsed
         */
        isExtensionUsed(name: string): boolean;
    }
}

/**
 * Metadata structure attached to mesh
 */
interface IMeshMetadata {
    /** XMP metadata packet string */
    xmp?: string;
    [key: string]: unknown;
}

declare module '@babylonjs/core/Meshes/abstractMesh' {
    interface AbstractMesh {
        /** Custom metadata object */
        metadata: Nullable<IMeshMetadata>;
    }
}