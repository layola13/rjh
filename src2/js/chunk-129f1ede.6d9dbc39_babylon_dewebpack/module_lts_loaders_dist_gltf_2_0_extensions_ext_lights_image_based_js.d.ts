/**
 * Loader extension for EXT_lights_image_based glTF extension.
 * This extension provides image-based lighting (IBL) for glTF scenes using environment maps.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_lights_image_based
 */

import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { IScene } from "../glTFLoaderInterfaces";
import type { GLTFLoader } from "../glTFLoader";
import type { RawCubeTexture } from "core/Materials/Textures/rawCubeTexture";
import type { Nullable } from "core/types";

/**
 * Represents a single light definition in the EXT_lights_image_based extension.
 */
interface IEXTLightsImageBased_Light {
    /**
     * The name of the light.
     */
    name?: string;

    /**
     * The intensity/brightness multiplier for the light.
     */
    intensity?: number;

    /**
     * Rotation of the light as a quaternion [x, y, z, w].
     */
    rotation?: [number, number, number, number];

    /**
     * Array of spherical harmonics coefficients for irradiance.
     * Contains 9 RGB triplets (27 numbers total).
     */
    irradianceCoefficients: number[];

    /**
     * The size (width/height) of each specular image mipmap level.
     */
    specularImageSize: number;

    /**
     * 2D array of image indices for specular reflection mipmaps.
     * Outer array = mipmap levels, inner array = cube faces.
     */
    specularImages: number[][];

    /**
     * Internal flag indicating if the light has been loaded.
     * @internal
     */
    _loaded?: Promise<void>;

    /**
     * Internal reference to the created Babylon texture.
     * @internal
     */
    _babylonTexture?: RawCubeTexture;
}

/**
 * Root extension data in the glTF extensions object.
 */
interface IEXTLightsImageBased {
    /**
     * Array of all light definitions in the extension.
     */
    lights: IEXTLightsImageBased_Light[];
}

/**
 * Scene extension data referencing a light from the extension.
 */
interface IEXTLightsImageBased_SceneReference {
    /**
     * Index into the extension's lights array.
     */
    light: number;
}

/**
 * Loader extension implementing support for EXT_lights_image_based.
 * Provides image-based lighting using precomputed environment maps with spherical harmonics.
 */
export declare class EXT_lights_image_based implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "EXT_lights_image_based";

    /**
     * Whether this extension is enabled.
     */
    enabled: boolean;

    /**
     * Reference to the parent glTF loader.
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Array of light definitions from the extension data.
     */
    private _lights?: IEXTLightsImageBased_Light[];

    /**
     * Creates a new instance of the EXT_lights_image_based extension.
     * @param loader The parent glTF loader
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of resources used by this extension.
     */
    dispose(): void;

    /**
     * Called when the loader begins loading the glTF asset.
     * Extracts light definitions from the extension data.
     */
    onLoading(): void;

    /**
     * Loads a scene with image-based lighting extension data.
     * @param context The loader context path for logging
     * @param scene The glTF scene to load
     * @returns Promise that resolves when the scene and lighting are loaded
     */
    loadSceneAsync(
        context: string,
        scene: IScene
    ): Promise<void> | null;

    /**
     * Loads a light definition and creates the corresponding Babylon environment texture.
     * @param context The loader context path for logging
     * @param light The light definition to load
     * @returns Promise that resolves to the created RawCubeTexture
     */
    private _loadLightAsync(
        context: string,
        light: IEXTLightsImageBased_Light
    ): Promise<RawCubeTexture>;
}