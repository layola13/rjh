/**
 * KHR_materials_variants extension for glTF loader.
 * Enables switching between material variants on meshes at runtime.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_variants
 */

import type { GLTFLoader } from "../glTFLoader";
import type { Mesh } from "core/Meshes/mesh";
import type { Material } from "core/Materials/material";
import type { IExtension } from "../glTFLoaderExtension";
import type { IMesh, IMeshPrimitive } from "../glTFLoaderInterfaces";
import type { Nullable } from "core/types";

/**
 * Extension name constant
 */
export declare const KHR_MATERIALS_VARIANTS_NAME = "KHR_materials_variants";

/**
 * Variant definition from the glTF extension
 */
export interface IKHRMaterialVariant {
    /** Name of the variant */
    name: string;
}

/**
 * Mapping entry that associates materials with variants
 */
export interface IKHRMaterialVariantMapping {
    /** Index of the material to use for this mapping */
    material: number;
    /** Array of variant indices this mapping applies to */
    variants: number[];
}

/**
 * glTF extension data structure
 */
export interface IKHRMaterialsVariants {
    /** Available variants defined in the extension */
    variants: IKHRMaterialVariant[];
}

/**
 * Mesh primitive extension data
 */
export interface IKHRMaterialsVariantsPrimitive {
    /** Mappings between materials and variants for this primitive */
    mappings: IKHRMaterialVariantMapping[];
}

/**
 * Internal metadata stored on a mesh for tracking variants
 */
export interface IMeshVariantMetadata {
    /** The last selected variant name or array of names */
    lastSelected: string | string[] | null;
    /** Original mesh/material pairs before any variant selection */
    original: Array<{ mesh: Mesh; material: Nullable<Material> }>;
    /** Map of variant names to their mesh/material pairs */
    variants: Record<string, Array<{ mesh: Mesh; material: Nullable<Material> }>>;
}

/**
 * KHR_materials_variants extension implementation.
 * Allows runtime switching between predefined material variants on glTF meshes.
 */
export declare class KHR_materials_variants implements IExtension {
    /** Extension name */
    readonly name: string;
    
    /** Whether this extension is enabled */
    enabled: boolean;
    
    /** Reference to the parent glTF loader */
    private _loader: Nullable<GLTFLoader>;
    
    /** Parsed variant definitions from the extension */
    private _variants?: IKHRMaterialVariant[];
    
    /**
     * Creates an instance of the KHR_materials_variants extension
     * @param loader The parent glTF loader
     */
    constructor(loader: GLTFLoader);
    
    /**
     * Disposes resources held by this extension
     */
    dispose(): void;
    
    /**
     * Gets the list of available variant names for a given mesh (static method)
     * @param mesh The mesh to query
     * @returns Array of variant names, or empty array if none exist
     */
    static GetAvailableVariants(mesh: Mesh): string[];
    
    /**
     * Gets the list of available variant names for a given mesh (instance method)
     * @param mesh The mesh to query
     * @returns Array of variant names, or empty array if none exist
     */
    getAvailableVariants(mesh: Mesh): string[];
    
    /**
     * Selects a material variant on the given mesh (static method)
     * @param mesh The mesh to apply the variant to
     * @param variantName The name of the variant to select, or array of names
     * @throws Error if the mesh does not have the KHR_materials_variants extension
     */
    static SelectVariant(mesh: Mesh, variantName: string | string[]): void;
    
    /**
     * Selects a material variant on the given mesh (instance method)
     * @param mesh The mesh to apply the variant to
     * @param variantName The name of the variant to select, or array of names
     */
    selectVariant(mesh: Mesh, variantName: string | string[]): void;
    
    /**
     * Resets the mesh to its original material (static method)
     * @param mesh The mesh to reset
     * @throws Error if the mesh does not have the KHR_materials_variants extension
     */
    static Reset(mesh: Mesh): void;
    
    /**
     * Resets the mesh to its original material (instance method)
     * @param mesh The mesh to reset
     */
    reset(mesh: Mesh): void;
    
    /**
     * Gets the last selected variant name(s) for a mesh (static method)
     * @param mesh The mesh to query
     * @returns The last selected variant name, array of names, or null if none selected
     * @throws Error if the mesh does not have the KHR_materials_variants extension
     */
    static GetLastSelectedVariant(mesh: Mesh): string | string[] | null;
    
    /**
     * Gets the last selected variant name(s) for a mesh (instance method)
     * @param mesh The mesh to query
     * @returns The last selected variant name, array of names, or null if none selected
     */
    getLastSelectedVariant(mesh: Mesh): string | string[] | null;
    
    /**
     * Retrieves the extension metadata from a mesh's internal metadata (static helper)
     * @param mesh The mesh to extract metadata from
     * @returns The variant metadata, or null if not present
     */
    private static _GetExtensionMetadata(mesh: Nullable<Mesh>): Nullable<IMeshVariantMetadata>;
    
    /**
     * Called when the loader starts processing the glTF file
     * Extracts variant definitions from the root extension
     */
    onLoading(): void;
    
    /**
     * Loads a mesh primitive with material variants
     * @param context The glTF context path for error reporting
     * @param node The glTF node data
     * @param mesh The glTF mesh data
     * @param primitive The glTF mesh primitive data
     * @param assign Callback to assign the loaded Babylon mesh
     * @returns Promise that resolves when the primitive is loaded
     */
    _loadMeshPrimitiveAsync(
        context: string,
        node: any,
        mesh: IMesh,
        primitive: IMeshPrimitive,
        assign: (babylonMesh: Mesh) => void
    ): Promise<Mesh>;
}