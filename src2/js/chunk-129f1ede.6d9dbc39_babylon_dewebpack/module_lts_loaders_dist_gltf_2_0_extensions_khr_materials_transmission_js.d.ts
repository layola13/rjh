/**
 * KHR_materials_transmission extension for glTF 2.0 loader
 * 
 * This extension enables realistic light transmission through materials,
 * simulating effects like glass, water, and other translucent surfaces.
 * 
 * Specification: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_transmission
 */

import { Observable } from '@babylonjs/core/Misc/observable';
import { Constants } from '@babylonjs/core/Engines/constants';
import { PBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import { RenderTargetTexture } from '@babylonjs/core/Materials/Textures/renderTargetTexture';
import { Scene } from '@babylonjs/core/scene';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Material } from '@babylonjs/core/Materials/material';
import { Color4 } from '@babylonjs/core/Maths/math.color';
import { Nullable } from '@babylonjs/core/types';
import { IGLTFLoaderExtension } from '../glTFLoaderExtension';
import { IProperty, IMaterial, ITextureInfo } from '../glTFLoaderInterfaces';
import { GLTFLoader } from '../glTFLoader';

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME = "KHR_materials_transmission";

/**
 * Configuration options for the transmission helper
 */
export interface ITransmissionHelperOptions {
    /**
     * Size of the render target texture (width and height in pixels)
     * @default 1024
     */
    renderSize: number;

    /**
     * Number of MSAA samples for anti-aliasing
     * @default 4
     */
    samples: number;

    /**
     * Scale factor for LOD (Level of Detail) generation
     * @default 1
     */
    lodGenerationScale: number;

    /**
     * Offset for LOD generation
     * @default -4
     */
    lodGenerationOffset: number;

    /**
     * Texture type for the render target
     * @default Constants.TEXTURETYPE_HALF_FLOAT
     */
    renderTargetTextureType: number;

    /**
     * Whether to generate mipmaps for the render target
     * @default true
     */
    generateMipmaps: boolean;

    /**
     * Optional custom clear color for the render target
     */
    clearColor?: Color4;
}

/**
 * glTF extension data for KHR_materials_transmission
 */
export interface IKHRMaterialsTransmission extends IProperty {
    /**
     * The base percentage of light transmitted through the surface (0.0 to 1.0)
     * @default 0
     */
    transmissionFactor?: number;

    /**
     * Texture defining spatially varying transmission factor
     */
    transmissionTexture?: ITextureInfo;
}

/**
 * Helper class for managing transmission rendering in a scene.
 * 
 * This class handles render target setup and mesh management for materials
 * using the transmission effect. It maintains separate caches for opaque
 * and transparent meshes and renders the scene accordingly.
 */
export declare class TransmissionHelper {
    /**
     * Observable fired when an error occurs during transmission rendering
     */
    readonly onErrorObservable: Observable<unknown>;

    /**
     * Gets the default options for the transmission helper
     * @returns Default configuration options
     */
    static _GetDefaultOptions(): ITransmissionHelperOptions;

    /**
     * Creates a new transmission helper instance
     * @param options Configuration options (merged with defaults)
     * @param scene The Babylon.js scene to attach to
     */
    constructor(options: Partial<ITransmissionHelperOptions>, scene: Scene);

    /**
     * Updates the transmission helper options
     * @param options Partial options to update (only changed values)
     */
    updateOptions(options: Partial<ITransmissionHelperOptions>): void;

    /**
     * Gets the render target texture used for opaque scene rendering
     * @returns The opaque render target texture
     */
    getOpaqueTarget(): Nullable<RenderTargetTexture>;

    /**
     * Disposes of all resources used by the transmission helper
     */
    dispose(): void;

    /**
     * Checks if a material should render with transmission
     * @param material The material to check
     * @returns True if the material has refraction enabled
     */
    private _shouldRenderAsTransmission(material: Nullable<Material>): boolean;

    /**
     * Adds a mesh to the appropriate cache (opaque or transparent)
     * @param mesh The mesh to add
     */
    private _addMesh(mesh: AbstractMesh): void;

    /**
     * Removes a mesh from all caches
     * @param mesh The mesh to remove
     */
    private _removeMesh(mesh: AbstractMesh): void;

    /**
     * Parses the scene and sets up observers for mesh changes
     */
    private _parseScene(): void;

    /**
     * Handles material changes on a mesh
     * @param mesh The mesh whose material changed
     */
    private _onMeshMaterialChanged(mesh: AbstractMesh): void;

    /**
     * Sets up or recreates the render targets for transmission rendering
     */
    private _setupRenderTargets(): void;

    /**
     * Current configuration options
     */
    private _options: ITransmissionHelperOptions;

    /**
     * The scene this helper is attached to
     */
    private _scene: Scene;

    /**
     * Render target for opaque objects
     */
    private _opaqueRenderTarget: Nullable<RenderTargetTexture>;

    /**
     * Cache of opaque meshes
     */
    private _opaqueMeshesCache: AbstractMesh[];

    /**
     * Cache of transparent (transmission) meshes
     */
    private _transparentMeshesCache: AbstractMesh[];

    /**
     * Map of mesh unique IDs to material change observers
     */
    private _materialObservers: Record<number, Nullable<any>>;
}

/**
 * glTF loader extension for KHR_materials_transmission
 * 
 * This extension enables loading and applying transmission material properties
 * from glTF files, creating realistic light-transmitting materials like glass.
 */
export declare class KHR_materials_transmission implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: string;

    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Defines the order in which this extension is applied
     */
    order: number;

    /**
     * Creates a new KHR_materials_transmission extension instance
     * @param loader The parent glTF loader
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of resources used by this extension
     */
    dispose(): void;

    /**
     * Loads material properties from the extension data
     * @param context The glTF context path for error reporting
     * @param material The glTF material definition
     * @param babylonMaterial The Babylon.js material to apply properties to
     * @returns Promise that resolves when properties are loaded
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void>;

    /**
     * Loads transparent (transmission) properties onto a material
     * @param context The glTF context path for error reporting
     * @param material The glTF material definition
     * @param babylonMaterial The Babylon.js PBR material
     * @param extension The transmission extension data
     * @returns Promise that resolves when properties are loaded
     */
    private _loadTransparentPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material,
        extension: IKHRMaterialsTransmission
    ): Promise<void>;

    /**
     * Reference to the parent glTF loader
     */
    private _loader: GLTFLoader;
}