/**
 * glTF KHR_materials_transmission extension loader
 * Implements support for transmission/refraction materials in glTF 2.0
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_transmission
 */

import type { Nullable } from "core/types";
import type { Observer } from "core/Misc/observable";
import type { Scene } from "core/scene";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { RenderTargetTexture } from "core/Materials/Textures/renderTargetTexture";
import type { Color4 } from "core/Maths/math.color";
import type { Observable } from "core/Misc/observable";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { ILoader } from "../glTFLoader";
import type { IMaterial } from "../glTFLoaderInterfaces";

/**
 * Configuration options for the transmission helper
 */
export interface ITransmissionHelperOptions {
    /**
     * Size of the render target texture (width and height)
     * @default 1024
     */
    renderSize: number;

    /**
     * Number of MSAA samples for the render target
     * @default 4
     */
    samples: number;

    /**
     * Scale applied to LOD generation
     * @default 1
     */
    lodGenerationScale: number;

    /**
     * Offset applied to LOD generation
     * @default -4
     */
    lodGenerationOffset: number;

    /**
     * Texture type for the render target (e.g., TEXTURETYPE_HALF_FLOAT)
     * @default Constants.TEXTURETYPE_HALF_FLOAT
     */
    renderTargetTextureType: number;

    /**
     * Whether to generate mipmaps for the render target
     * @default true
     */
    generateMipmaps: boolean;

    /**
     * Optional clear color for the render target
     */
    clearColor?: Color4;
}

/**
 * glTF extension data for KHR_materials_transmission
 */
export interface IKHRMaterialsTransmission {
    /**
     * Transmission factor (0-1), where 1 is fully transparent
     */
    transmissionFactor?: number;

    /**
     * Texture that defines transmission intensity per pixel
     */
    transmissionTexture?: {
        index: number;
        texCoord?: number;
        nonColorData?: boolean;
    };
}

/**
 * Helper class for rendering transmission/refraction effects
 * Manages render targets and mesh lists for proper transparency rendering
 */
export declare class TransmissionHelper {
    /**
     * Observable triggered when an error occurs
     */
    onErrorObservable: Observable<unknown>;

    /**
     * Gets the default configuration options
     * @returns Default transmission helper options
     */
    static _GetDefaultOptions(): ITransmissionHelperOptions;

    /**
     * Updates the transmission helper options
     * Recreates render targets if necessary settings changed
     * @param options - Partial options to update
     */
    updateOptions(options: Partial<ITransmissionHelperOptions>): void;

    /**
     * Gets the opaque render target texture used for refraction
     * @returns The render target texture or null if not initialized
     */
    getOpaqueTarget(): Nullable<RenderTargetTexture>;

    /**
     * Releases all resources used by the transmission helper
     */
    dispose(): void;

    /**
     * @internal
     * Determines if a material should be rendered with transmission
     */
    private _shouldRenderAsTransmission(material: Nullable<any>): boolean;

    /**
     * @internal
     * Adds a mesh to the appropriate render cache
     */
    private _addMesh(mesh: AbstractMesh): void;

    /**
     * @internal
     * Removes a mesh from render caches
     */
    private _removeMesh(mesh: AbstractMesh): void;

    /**
     * @internal
     * Parses the scene and sets up mesh observers
     */
    private _parseScene(): void;

    /**
     * @internal
     * Handles material changes on meshes
     */
    private _onMeshMaterialChanged(mesh: AbstractMesh): void;

    /**
     * @internal
     * Sets up or recreates the render targets
     */
    private _setupRenderTargets(): void;

    private _scene: Scene;
    private _options: ITransmissionHelperOptions;
    private _opaqueRenderTarget: Nullable<RenderTargetTexture>;
    private _opaqueMeshesCache: AbstractMesh[];
    private _transparentMeshesCache: AbstractMesh[];
    private _materialObservers: Record<number, Observer<AbstractMesh>>;
}

/**
 * Loader extension for KHR_materials_transmission
 * Enables transmission/refraction effects on glTF materials
 */
export declare class KHR_materials_transmission implements IGLTFLoaderExtension {
    /**
     * Extension name
     */
    readonly name: "KHR_materials_transmission";

    /**
     * Load order priority
     */
    readonly order: 175;

    /**
     * Whether this extension is enabled
     */
    enabled: boolean;

    /**
     * @param loader - The glTF loader instance
     */
    constructor(loader: ILoader);

    /**
     * Releases resources used by the extension
     */
    dispose(): void;

    /**
     * Loads material properties from the extension data
     * @param context - The glTF context path
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon.js material instance
     * @returns Promise that resolves when loading is complete
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Nullable<Promise<void>>;

    /**
     * @internal
     * Loads transmission-specific properties onto the material
     */
    private _loadTransparentPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: PBRMaterial,
        extensionData: IKHRMaterialsTransmission
    ): Promise<void>;

    private _loader: ILoader;
}