/**
 * OBJ file loader plugin for Babylon.js scene loading system.
 * Handles parsing of Wavefront OBJ files and their associated MTL material files.
 * @module OBJFileLoader
 */

import type { ISceneLoaderPluginAsync, ISceneLoaderPluginExtensions } from "core/Loading/sceneLoader";
import type { Scene } from "core/scene";
import type { AssetContainer } from "core/assetContainer";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { IParticleSystem } from "core/Particles/IParticleSystem";
import type { Skeleton } from "core/Bones/skeleton";
import type { AnimationGroup } from "core/Animations/animationGroup";
import type { TransformNode } from "core/Meshes/transformNode";
import type { Geometry } from "core/Meshes/geometry";
import type { Light } from "core/Lights/light";
import type { Vector2 } from "core/Maths/math.vector";

/**
 * Options for configuring OBJ file loading behavior.
 */
export interface OBJLoadingOptions {
    /** Whether to compute normals if not present in the file */
    computeNormals: boolean;
    
    /** Whether to optimize normal vectors */
    optimizeNormals: boolean;
    
    /** Whether to import vertex color data from the file */
    importVertexColors: boolean;
    
    /** Whether to invert Y-axis coordinates */
    invertY: boolean;
    
    /** Whether to invert Y-axis of texture coordinates */
    invertTextureY: boolean;
    
    /** UV coordinate scaling vector */
    UVScaling: Vector2;
    
    /** Whether to silently ignore MTL material loading failures */
    materialLoadingFailsSilently: boolean;
    
    /** Whether to optimize geometry using UV data */
    optimizeWithUV: boolean;
    
    /** Whether to skip loading materials entirely */
    skipMaterials: boolean;
}

/**
 * Result of importing meshes from an OBJ file.
 */
export interface OBJImportMeshResult {
    /** Loaded mesh objects */
    meshes: AbstractMesh[];
    
    /** Particle systems (always empty for OBJ files) */
    particleSystems: IParticleSystem[];
    
    /** Skeletons (always empty for OBJ files) */
    skeletons: Skeleton[];
    
    /** Animation groups (always empty for OBJ files) */
    animationGroups: AnimationGroup[];
    
    /** Transform nodes (always empty for OBJ files) */
    transformNodes: TransformNode[];
    
    /** Geometries (always empty for OBJ files) */
    geometries: Geometry[];
    
    /** Lights (always empty for OBJ files) */
    lights: Light[];
}

/**
 * Callback for MTL file loading success.
 * @param fileContent - The loaded MTL file content as string
 */
export type MTLLoadCallback = (fileContent: string) => void;

/**
 * Callback for MTL file loading failure.
 * @param fileUrl - The URL of the MTL file that failed to load
 * @param error - The error that occurred
 */
export type MTLErrorCallback = (fileUrl: string, error: unknown) => void;

/**
 * Babylon.js scene loader plugin for Wavefront OBJ files.
 * Supports loading 3D geometry, materials (via MTL files), and texture coordinates.
 */
export declare class OBJFileLoader implements ISceneLoaderPluginAsync, ISceneLoaderPluginExtensions {
    /** Plugin identifier */
    readonly name: string;
    
    /** Supported file extensions */
    readonly extensions: string;
    
    /** Whether to optimize geometry using UV data (default: true) */
    static OPTIMIZE_WITH_UV: boolean;
    
    /** Whether to invert Y-axis coordinates (default: false) */
    static INVERT_Y: boolean;
    
    /** Whether to import vertex color data (default: false) */
    static IMPORT_VERTEX_COLORS: boolean;
    
    /** Whether to compute normals if not present (default: false) */
    static COMPUTE_NORMALS: boolean;
    
    /** Whether to optimize normal vectors (default: false) */
    static OPTIMIZE_NORMALS: boolean;
    
    /** UV coordinate scaling vector (default: (1, 1)) */
    static UV_SCALING: Vector2;
    
    /** Whether to skip loading materials (default: false) */
    static SKIP_MATERIALS: boolean;
    
    /** Whether to silently ignore MTL material loading failures (default: true) */
    static MATERIAL_LOADING_FAILS_SILENTLY: boolean;
    
    /**
     * Gets or sets whether to invert texture Y coordinates.
     * Proxies to MTLFileLoader.INVERT_TEXTURE_Y
     */
    static INVERT_TEXTURE_Y: boolean;
    
    /**
     * Gets the default loading options based on static configuration.
     * @internal
     */
    private static get _DefaultLoadingOptions(): OBJLoadingOptions;
    
    /**
     * Current asset container being populated during load.
     * @internal
     */
    private _assetContainer: AssetContainer | null;
    
    /**
     * Loading options for this loader instance.
     * @internal
     */
    private readonly _loadingOptions: OBJLoadingOptions;
    
    /**
     * Creates a new OBJ file loader instance.
     * @param loadingOptions - Configuration options for loading behavior
     */
    constructor(loadingOptions?: OBJLoadingOptions);
    
    /**
     * Loads an MTL material file.
     * @param fileName - Name of the MTL file
     * @param rootUrl - Base URL for loading
     * @param onSuccess - Callback invoked on successful load
     * @param onError - Callback invoked on load failure
     * @internal
     */
    private _loadMTL(
        fileName: string,
        rootUrl: string,
        onSuccess: MTLLoadCallback,
        onError: MTLErrorCallback
    ): void;
    
    /**
     * Creates a new plugin instance for the scene loader system.
     * @returns A new OBJFileLoader with default options
     */
    createPlugin(): OBJFileLoader;
    
    /**
     * Indicates whether this loader can directly load data without preprocessing.
     * @returns false - OBJ files require parsing
     */
    canDirectLoad(): boolean;
    
    /**
     * Imports meshes from OBJ file data.
     * @param meshNames - Names of specific meshes to load (null to load all)
     * @param scene - The scene to add meshes to
     * @param data - The OBJ file content as string
     * @param rootUrl - Base URL for loading external resources (e.g., MTL files)
     * @returns Promise resolving to imported mesh data
     */
    importMeshAsync(
        meshNames: string | string[] | null | undefined,
        scene: Scene,
        data: string,
        rootUrl: string
    ): Promise<OBJImportMeshResult>;
    
    /**
     * Loads an OBJ file into an existing scene.
     * @param scene - The scene to load into
     * @param data - The OBJ file content as string
     * @param rootUrl - Base URL for loading external resources
     * @returns Promise that resolves when loading completes
     */
    loadAsync(
        scene: Scene,
        data: string,
        rootUrl: string
    ): Promise<void>;
    
    /**
     * Loads an OBJ file into a new asset container.
     * @param scene - The scene context for loading
     * @param data - The OBJ file content as string
     * @param rootUrl - Base URL for loading external resources
     * @returns Promise resolving to the populated asset container
     */
    loadAssetContainerAsync(
        scene: Scene,
        data: string,
        rootUrl: string
    ): Promise<AssetContainer>;
    
    /**
     * Parses OBJ file geometry and materials.
     * @param meshNames - Names of specific meshes to parse (null to parse all)
     * @param scene - The scene context
     * @param data - The OBJ file content
     * @param rootUrl - Base URL for loading external resources
     * @returns Promise resolving to array of parsed meshes
     * @internal
     */
    private _parseSolid(
        meshNames: string | string[] | null | undefined,
        scene: Scene,
        data: string,
        rootUrl: string
    ): Promise<AbstractMesh[]>;
}