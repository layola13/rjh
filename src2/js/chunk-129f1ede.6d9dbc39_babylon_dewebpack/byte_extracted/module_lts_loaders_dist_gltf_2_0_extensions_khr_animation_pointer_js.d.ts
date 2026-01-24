/**
 * KHR_animation_pointer extension for glTF 2.0 loader
 * This extension allows animation channels to target any property in the glTF asset using JSON pointers
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_animation_pointer
 */

import { GLTFLoader } from "../glTFLoader";
import { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { IAnimationChannel } from "../glTFLoaderInterfaces";
import { Nullable } from "core/types";
import { Logger } from "core/Misc/logger";
import { AnimationPointerTree } from "./KHR_animation_pointer.data";

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_animation_pointer";

/**
 * Target information for animation pointer
 * Contains the target object and the properties to animate
 */
export interface IAnimationPointerTargetInfo {
    /**
     * The target object to animate
     */
    target: unknown;
    
    /**
     * Array of property paths to animate on the target
     */
    properties: string[];
}

/**
 * glTF extension structure for KHR_animation_pointer
 */
export interface IKHR_animation_pointer {
    /**
     * JSON pointer string identifying the property to animate
     * Must start with "/" and follow JSON pointer syntax
     */
    pointer: string;
}

/**
 * Animation channel target extensions structure
 */
export interface IAnimationChannelTargetExtensions {
    /**
     * KHR_animation_pointer extension data
     */
    KHR_animation_pointer?: IKHR_animation_pointer;
}

/**
 * KHR_animation_pointer extension implementation
 * Enables animation of arbitrary glTF properties using JSON pointer syntax
 */
export declare class KHR_animation_pointer implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: typeof EXTENSION_NAME;

    /**
     * Reference to the glTF loader instance
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Defines whether this extension is enabled
     * Returns true if the extension is used in the loaded glTF asset
     */
    get enabled(): boolean;

    /**
     * Creates a new instance of the KHR_animation_pointer extension
     * @param loader The glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes the extension and releases resources
     */
    dispose(): void;

    /**
     * Loads an animation channel asynchronously with animation pointer support
     * @param context The context string for error reporting
     * @param animationContext The animation context string
     * @param animation The animation data
     * @param channel The animation channel to load
     * @param onLoad Callback invoked when the channel is loaded
     * @returns Promise that resolves when loading is complete, or null if not handled
     */
    _loadAnimationChannelAsync(
        context: string,
        animationContext: string,
        animation: unknown,
        channel: IAnimationChannel,
        onLoad: () => void
    ): Nullable<Promise<void>>;

    /**
     * Parses an animation pointer string and resolves it to target information
     * @param context The context string for error reporting
     * @param pointer The JSON pointer string to parse (e.g., "/nodes/0/translation")
     * @returns Target information containing the target object and property paths, or null if invalid
     */
    _parseAnimationPointer(
        context: string,
        pointer: string
    ): Nullable<IAnimationPointerTargetInfo>;
}