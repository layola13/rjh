import { Observable } from '@babylonjs/core/Misc/observable';
import { ISceneLoaderPluginAsync, ISceneLoaderPluginFactory, ISceneLoaderProgressEvent, ISceneLoaderPlugin } from '@babylonjs/core/Loading/sceneLoader';
import { Scene } from '@babylonjs/core/scene';
import { AssetContainer } from '@babylonjs/core/assetContainer';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { IParticleSystem } from '@babylonjs/core/Particles/IParticleSystem';
import { Skeleton } from '@babylonjs/core/Bones/skeleton';
import { AnimationGroup } from '@babylonjs/core/Animations/animationGroup';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import { Geometry } from '@babylonjs/core/Meshes/geometry';
import { Light } from '@babylonjs/core/Lights/light';
import { Camera } from '@babylonjs/core/Cameras/camera';
import { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';
import { Material } from '@babylonjs/core/Materials/material';
import { MorphTargetManager } from '@babylonjs/core/Morph/morphTargetManager';
import { Nullable } from '@babylonjs/core/types';

/**
 * Defines the coordinate system mode for glTF loader
 */
export declare enum GLTFLoaderCoordinateSystemMode {
    /** Automatically detect and convert coordinate system */
    AUTO = 0,
    /** Force right-handed coordinate system */
    FORCE_RIGHT_HANDED = 1
}

/**
 * Defines the animation start mode for glTF loader
 */
export declare enum GLTFLoaderAnimationStartMode {
    /** Do not start any animations */
    NONE = 0,
    /** Start only the first animation */
    FIRST = 1,
    /** Start all animations */
    ALL = 2
}

/**
 * Defines the state of the glTF loader
 */
export declare enum GLTFLoaderState {
    /** Loader is currently loading */
    LOADING = 0,
    /** Loader is ready */
    READY = 1,
    /** Loading is complete */
    COMPLETE = 2
}

/**
 * Represents the parsed glTF data structure
 */
export interface IGLTFLoaderData {
    /** Parsed JSON content */
    json: Record<string, any>;
    /** Binary buffer data (for .glb files) */
    bin: Nullable<IDataBuffer>;
}

/**
 * Interface for binary data buffer with async read capability
 */
export interface IDataBuffer {
    /** Read data asynchronously from buffer */
    readAsync(byteOffset: number, byteLength: number): Promise<ArrayBufferView>;
    /** Total byte length of the buffer */
    byteLength: number;
}

/**
 * Represents glTF validation results
 */
export interface IGLTFValidationResults {
    /** Validation issues found */
    issues: {
        message: string;
        severity: number;
        pointer: string;
    }[];
}

/**
 * Represents the result of mesh import operation
 */
export interface ISceneLoaderAsyncResult {
    /** Loaded meshes */
    meshes: AbstractMesh[];
    /** Loaded particle systems */
    particleSystems: IParticleSystem[];
    /** Loaded skeletons */
    skeletons: Skeleton[];
    /** Loaded animation groups */
    animationGroups: AnimationGroup[];
    /** Loaded transform nodes */
    transformNodes: TransformNode[];
    /** Loaded geometries */
    geometries: Geometry[];
    /** Loaded lights */
    lights: Light[];
}

/**
 * glTF file loader plugin for Babylon.js
 * Supports both .gltf (JSON) and .glb (binary) formats
 * Implements the Khronos glTF 2.0 specification
 */
export declare class GLTFFileLoader implements ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
    /** Plugin name identifier */
    readonly name: string;
    
    /** Supported file extensions */
    readonly extensions: {
        '.gltf': { isBinary: false };
        '.glb': { isBinary: true };
    };

    /**
     * Enable incremental loading for large files
     * @defaultValue true
     */
    static IncrementalLoading: boolean;

    /**
     * Use homogeneous coordinates for transformations
     * @defaultValue false
     */
    static HomogeneousCoordinates: boolean;

    /**
     * Coordinate system mode for the loader
     * @defaultValue GLTFLoaderCoordinateSystemMode.AUTO
     */
    coordinateSystemMode: GLTFLoaderCoordinateSystemMode;

    /**
     * Animation start mode
     * @defaultValue GLTFLoaderAnimationStartMode.FIRST
     */
    animationStartMode: GLTFLoaderAnimationStartMode;

    /**
     * Compile materials during loading
     * @defaultValue false
     */
    compileMaterials: boolean;

    /**
     * Enable clip plane usage
     * @defaultValue false
     */
    useClipPlane: boolean;

    /**
     * Compile shadow generators during loading
     * @defaultValue false
     */
    compileShadowGenerators: boolean;

    /**
     * Treat transparency as coverage
     * @defaultValue false
     */
    transparencyAsCoverage: boolean;

    /**
     * Use HTTP range requests for loading
     * @defaultValue false
     */
    useRangeRequests: boolean;

    /**
     * Create mesh instances for reused meshes
     * @defaultValue true
     */
    createInstances: boolean;

    /**
     * Always compute bounding boxes for meshes
     * @defaultValue false
     */
    alwaysComputeBoundingBox: boolean;

    /**
     * Load all materials even if not used
     * @defaultValue false
     */
    loadAllMaterials: boolean;

    /**
     * Load only materials without meshes
     * @defaultValue false
     */
    loadOnlyMaterials: boolean;

    /**
     * Skip loading materials
     * @defaultValue false
     */
    skipMaterials: boolean;

    /**
     * Use SRGB buffers for textures
     * @defaultValue true
     */
    useSRGBBuffers: boolean;

    /**
     * Target frames per second for animations
     * @defaultValue 60
     */
    targetFps: number;

    /**
     * Always compute skeleton root node
     * @defaultValue false
     */
    alwaysComputeSkeletonRootNode: boolean;

    /**
     * Preprocess URLs before loading
     */
    preprocessUrlAsync: (url: string) => Promise<string>;

    /**
     * Enable validation of glTF files
     * @defaultValue false
     */
    validate: boolean;

    /**
     * Observable triggered when glTF data is parsed
     */
    readonly onParsedObservable: Observable<IGLTFLoaderData>;

    /**
     * Observable triggered when a mesh is loaded
     */
    readonly onMeshLoadedObservable: Observable<AbstractMesh>;

    /**
     * Observable triggered when a skin is loaded
     */
    readonly onSkinLoadedObservable: Observable<any>;

    /**
     * Observable triggered when a texture is loaded
     */
    readonly onTextureLoadedObservable: Observable<BaseTexture>;

    /**
     * Observable triggered when a material is loaded
     */
    readonly onMaterialLoadedObservable: Observable<Material>;

    /**
     * Observable triggered when a camera is loaded
     */
    readonly onCameraLoadedObservable: Observable<Camera>;

    /**
     * Observable triggered when loading is complete
     */
    readonly onCompleteObservable: Observable<void>;

    /**
     * Observable triggered when an error occurs
     */
    readonly onErrorObservable: Observable<any>;

    /**
     * Observable triggered when the loader is disposed
     */
    readonly onDisposeObservable: Observable<void>;

    /**
     * Observable triggered when an extension is loaded
     */
    readonly onExtensionLoadedObservable: Observable<any>;

    /**
     * Observable triggered when validation is complete
     */
    readonly onValidatedObservable: Observable<IGLTFValidationResults>;

    /**
     * Observable triggered when loader state changes
     */
    readonly onLoaderStateChangedObservable: Observable<GLTFLoaderState>;

    /**
     * Callback when glTF data is parsed
     */
    set onParsed(callback: (loaderData: IGLTFLoaderData) => void);

    /**
     * Callback when a mesh is loaded
     */
    set onMeshLoaded(callback: (mesh: AbstractMesh) => void);

    /**
     * Callback when a texture is loaded
     */
    set onTextureLoaded(callback: (texture: BaseTexture) => void);

    /**
     * Callback when a material is loaded
     */
    set onMaterialLoaded(callback: (material: Material) => void);

    /**
     * Callback when a camera is loaded
     */
    set onCameraLoaded(callback: (camera: Camera) => void);

    /**
     * Callback when loading is complete
     */
    set onComplete(callback: () => void);

    /**
     * Callback when an error occurs
     */
    set onError(callback: (reason: any) => void);

    /**
     * Callback when the loader is disposed
     */
    set onDispose(callback: () => void);

    /**
     * Callback when an extension is loaded
     */
    set onExtensionLoaded(callback: (extension: any) => void);

    /**
     * Callback when validation is complete
     */
    set onValidated(callback: (results: IGLTFValidationResults) => void);

    /**
     * Enable logging
     */
    loggingEnabled: boolean;

    /**
     * Capture performance counters
     */
    capturePerformanceCounters: boolean;

    /**
     * Current loader state
     */
    readonly loaderState: Nullable<GLTFLoaderState>;

    /**
     * Dispose the loader and clean up resources
     */
    dispose(): void;

    /**
     * Load a glTF file
     * @param scene - The scene to load into
     * @param data - File data or URL
     * @param rootUrl - Root URL for relative paths
     * @param onProgress - Progress callback
     * @param useArrayBuffer - Whether to use ArrayBuffer
     * @param onError - Error callback
     * @returns File load request
     */
    loadFile(
        scene: Scene,
        data: string | ArrayBuffer,
        rootUrl: string,
        onSuccess: (data: IGLTFLoaderData) => void,
        onProgress?: (event: ISceneLoaderProgressEvent) => void,
        useArrayBuffer?: boolean,
        onError?: (request?: any, exception?: any) => void
    ): any;

    /**
     * Import meshes from glTF file
     * @param meshesNames - Names of meshes to import (null for all)
     * @param scene - Target scene
     * @param data - Parsed glTF data
     * @param rootUrl - Root URL for resources
     * @param onProgress - Progress callback
     * @param fileName - File name
     * @returns Promise resolving to imported assets
     */
    importMeshAsync(
        meshesNames: any,
        scene: Scene,
        data: IGLTFLoaderData,
        rootUrl: string,
        onProgress?: (event: ISceneLoaderProgressEvent) => void,
        fileName?: string
    ): Promise<ISceneLoaderAsyncResult>;

    /**
     * Load a glTF scene
     * @param scene - Target scene
     * @param data - Parsed glTF data
     * @param rootUrl - Root URL for resources
     * @param onProgress - Progress callback
     * @param fileName - File name
     * @returns Promise resolving when load is complete
     */
    loadAsync(
        scene: Scene,
        data: IGLTFLoaderData,
        rootUrl: string,
        onProgress?: (event: ISceneLoaderProgressEvent) => void,
        fileName?: string
    ): Promise<void>;

    /**
     * Load glTF into an asset container
     * @param scene - Target scene
     * @param data - Parsed glTF data
     * @param rootUrl - Root URL for resources
     * @param onProgress - Progress callback
     * @param fileName - File name
     * @returns Promise resolving to asset container
     */
    loadAssetContainerAsync(
        scene: Scene,
        data: IGLTFLoaderData,
        rootUrl: string,
        onProgress?: (event: ISceneLoaderProgressEvent) => void,
        fileName?: string
    ): Promise<AssetContainer>;

    /**
     * Check if the loader can directly load the given data
     * @param data - Data string to check
     * @returns True if data can be directly loaded
     */
    canDirectLoad(data: string): boolean;

    /**
     * Directly load glTF data without file I/O
     * @param scene - Target scene
     * @param data - glTF data string
     * @returns Promise resolving to parsed data
     */
    directLoad(scene: Scene, data: string): Promise<IGLTFLoaderData>;

    /**
     * Create a new instance of the loader plugin
     * @returns New loader instance
     */
    createPlugin(): ISceneLoaderPluginAsync;

    /**
     * Returns a promise that resolves when loading is complete
     * @returns Promise resolving on complete
     */
    whenCompleteAsync(): Promise<void>;
}