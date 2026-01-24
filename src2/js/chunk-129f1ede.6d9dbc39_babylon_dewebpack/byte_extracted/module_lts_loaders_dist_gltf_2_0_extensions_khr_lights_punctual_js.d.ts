/**
 * glTF extension for KHR_lights_punctual
 * Implements support for punctual lights (directional, point, spot) in glTF 2.0
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_lights_punctual
 */

import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { INode } from "../glTFLoaderInterfaces";
import type { GLTFLoader } from "../glTFLoader";
import type { Nullable } from "core/types";
import type { Light, DirectionalLight, PointLight, SpotLight } from "core/Lights";
import type { TransformNode } from "core/Meshes";
import type { Vector3 } from "core/Maths/math.vector";
import type { Color3 } from "core/Maths/math.color";

/**
 * The name of the KHR_lights_punctual extension
 */
export declare const EXTENSION_NAME = "KHR_lights_punctual";

/**
 * Light types supported by the KHR_lights_punctual extension
 */
export declare type LightType = "directional" | "point" | "spot";

/**
 * Spot light properties
 */
export interface IKHRLightsPunctual_Spot {
    /**
     * Inner cone angle in radians (default: 0)
     */
    innerConeAngle?: number;

    /**
     * Outer cone angle in radians (default: PI/4)
     */
    outerConeAngle?: number;
}

/**
 * Light definition from KHR_lights_punctual extension
 */
export interface IKHRLightsPunctual_Light {
    /**
     * Name of the light
     */
    name?: string;

    /**
     * Type of the light (directional, point, or spot)
     */
    type: LightType;

    /**
     * RGB color of the light (default: [1.0, 1.0, 1.0])
     */
    color?: number[];

    /**
     * Intensity of the light (default: 1.0)
     */
    intensity?: number;

    /**
     * Range of the light in meters (default: infinite)
     */
    range?: number;

    /**
     * Spot light properties (only for spot lights)
     */
    spot?: IKHRLightsPunctual_Spot;

    /**
     * Internal reference to the Babylon.js light instance
     * @internal
     */
    _babylonLight?: Light;
}

/**
 * Root extension object for KHR_lights_punctual
 */
export interface IKHRLightsPunctual {
    /**
     * Array of light definitions
     */
    lights: IKHRLightsPunctual_Light[];
}

/**
 * Node extension data for KHR_lights_punctual
 */
export interface IKHRLightsPunctual_LightReference {
    /**
     * Index of the light in the lights array
     */
    light: number;
}

/**
 * Loader extension for KHR_lights_punctual
 * Adds support for loading punctual lights from glTF files
 */
export declare class KHR_lights implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: string;

    /**
     * Whether this extension is enabled
     */
    enabled: boolean;

    /**
     * The glTF loader instance
     */
    private _loader: GLTFLoader;

    /**
     * Array of lights defined in the extension
     */
    private _lights?: IKHRLightsPunctual_Light[];

    /**
     * Creates a new instance of the KHR_lights extension
     * @param loader The glTF loader
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes the extension and releases resources
     */
    dispose(): void;

    /**
     * Called when the loader starts loading the glTF file
     * Parses the lights array from the extension
     */
    onLoading(): void;

    /**
     * Loads a node with a light reference
     * @param context The loader context
     * @param node The glTF node
     * @param assign The function to assign the loaded transform node
     * @returns A promise that resolves with the loaded transform node
     */
    loadNodeAsync(
        context: string,
        node: INode,
        assign: (babylonTransformNode: TransformNode) => void
    ): Promise<TransformNode>;
}