/**
 * KHR_materials_variants Extension for glTF 2.0
 * Provides support for material variants in glTF models
 */

import type { GLTFLoader } from './glTFLoader';
import type { Mesh } from 'core/Meshes/mesh';
import type { Material } from 'core/Materials/material';
import type { Nullable } from 'core/types';
import type { IglTF, IMeshPrimitive } from '../glTFLoaderInterfaces';
import type { IGLTFLoaderExtension } from '../glTFLoaderExtension';

/** Extension name constant */
declare const EXTENSION_NAME = "KHR_materials_variants";

/**
 * Variant definition from glTF extension
 */
export interface IKHRMaterialVariant {
    /** Name of the variant */
    name: string;
}

/**
 * Mapping entry for material variants
 */
export interface IKHRMaterialVariantMapping {
    /** Index of the material to use */
    material: number;
    /** Array of variant indices this mapping applies to */
    variants: number[];
}

/**
 * Mesh primitive extension data
 */
export interface IKHRMaterialVariantsPrimitive {
    /** Array of material variant mappings */
    mappings: IKHRMaterialVariantMapping[];
}

/**
 * Root extension data
 */
export interface IKHRMaterialVariantsRoot {
    /** Array of available variants */
    variants: IKHRMaterialVariant[];
}

/**
 * Internal mesh-material association
 */
interface IMeshMaterialPair {
    /** The mesh instance */
    mesh: Mesh;
    /** The material assigned to the mesh */
    material: Nullable<Material>;
}

/**
 * Internal metadata stored on mesh for variant management
 */
interface IVariantMetadata {
    /** The last selected variant name(s) */
    lastSelected: Nullable<string | string[]>;
    /** Original mesh-material pairs before any variant selection */
    original: IMeshMaterialPair[];
    /** Map of variant names to their mesh-material pairs */
    variants: Record<string, IMeshMaterialPair[]>;
}

/**
 * glTF loader extension that adds support for KHR_materials_variants.
 * This extension allows glTF models to define multiple material variants
 * that can be switched at runtime.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_variants
 */
export declare class KHR_materials_variants implements IGLTFLoaderExtension {
    /** Extension name */
    readonly name: string;

    /** Whether this extension is enabled */
    enabled: boolean;

    /** The parent glTF loader */
    private _loader: Nullable<GLTFLoader>;

    /** Array of variants defined in the glTF file */
    private _variants?: IKHRMaterialVariant[];

    /**
     * Creates a new instance of the KHR_materials_variants extension
     * @param loader - The parent glTF loader
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes resources held by this extension
     */
    dispose(): void;

    /**
     * Gets the list of available variant names for a mesh (static version)
     * @param mesh - The root mesh to query
     * @returns Array of variant names, or empty array if no variants exist
     */
    static GetAvailableVariants(mesh: Mesh): string[];

    /**
     * Gets the list of available variant names for a mesh (instance version)
     * @param mesh - The root mesh to query
     * @returns Array of variant names, or empty array if no variants exist
     */
    getAvailableVariants(mesh: Mesh): string[];

    /**
     * Selects a material variant or multiple variants for a mesh (static version)
     * @param mesh - The root mesh to apply the variant to
     * @param variantName - The variant name or array of variant names to select
     * @throws Error if the mesh does not have the KHR_materials_variants extension
     */
    static SelectVariant(mesh: Mesh, variantName: string | string[]): void;

    /**
     * Selects a material variant or multiple variants for a mesh (instance version)
     * @param mesh - The root mesh to apply the variant to
     * @param variantName - The variant name or array of variant names to select
     * @throws Error if the mesh does not have the KHR_materials_variants extension
     */
    selectVariant(mesh: Mesh, variantName: string | string[]): void;

    /**
     * Resets the mesh materials to their original state (static version)
     * @param mesh - The root mesh to reset
     * @throws Error if the mesh does not have the KHR_materials_variants extension
     */
    static Reset(mesh: Mesh): void;

    /**
     * Resets the mesh materials to their original state (instance version)
     * @param mesh - The root mesh to reset
     * @throws Error if the mesh does not have the KHR_materials_variants extension
     */
    reset(mesh: Mesh): void;

    /**
     * Gets the last selected variant name(s) for a mesh (static version)
     * @param mesh - The root mesh to query
     * @returns The last selected variant name(s), or null if none selected
     * @throws Error if the mesh does not have the KHR_materials_variants extension
     */
    static GetLastSelectedVariant(mesh: Mesh): Nullable<string | string[]>;

    /**
     * Gets the last selected variant name(s) for a mesh (instance version)
     * @param mesh - The root mesh to query
     * @returns The last selected variant name(s), or null if none selected
     * @throws Error if the mesh does not have the KHR_materials_variants extension
     */
    getLastSelectedVariant(mesh: Mesh): Nullable<string | string[]>;

    /**
     * Retrieves the internal variant metadata from a mesh
     * @param mesh - The mesh to query
     * @returns The variant metadata, or null if not present
     * @internal
     */
    private static _GetExtensionMetadata(mesh: Nullable<Mesh>): Nullable<IVariantMetadata>;

    /**
     * Called when the loader is parsing the glTF file
     * Extracts variant definitions from the extension data
     */
    onLoading?(): void;

    /**
     * Loads a mesh primitive with material variant support
     * @param context - The glTF loading context
     * @param name - The name of the mesh
     * @param node - The glTF node
     * @param mesh - The glTF mesh
     * @param primitive - The mesh primitive to load
     * @param assign - Callback to assign the loaded Babylon.js mesh
     * @returns Promise that resolves to the loaded Babylon.js mesh
     * @internal
     */
    _loadMeshPrimitiveAsync?(
        context: string,
        name: string,
        node: unknown,
        mesh: unknown,
        primitive: IMeshPrimitive,
        assign: (babylonMesh: Mesh) => void
    ): Nullable<Promise<Mesh>>;
}