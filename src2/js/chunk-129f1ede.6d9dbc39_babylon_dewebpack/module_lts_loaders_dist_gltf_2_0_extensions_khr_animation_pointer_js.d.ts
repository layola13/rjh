/**
 * KHR_animation_pointer glTF extension implementation
 * Enables animation of arbitrary properties via JSON Pointer syntax
 */

import type { IAnimationTargetInfo } from '../glTFLoader';
import type { IAnimationChannel, IAnimation, IGlTF } from '../glTFLoaderInterfaces';
import type { Nullable } from 'core/types';
import type { AnimationGroup } from 'core/Animations/animationGroup';

/**
 * Extension data interface for KHR_animation_pointer
 */
export interface IKHRAnimationPointer {
    /**
     * JSON Pointer string targeting the property to animate
     * Must start with "/" and follow JSON Pointer RFC 6901 syntax
     */
    pointer: string;
}

/**
 * Animation channel target extensions
 */
export interface IAnimationChannelTargetExtensions {
    KHR_animation_pointer?: IKHRAnimationPointer;
}

/**
 * Animation channel target with extension support
 */
export interface IAnimationChannelTarget {
    /**
     * Target path (must be "pointer" when using this extension)
     */
    path: string;
    
    /**
     * Target node index (must not be present when using this extension)
     */
    node?: number;
    
    /**
     * Extension data
     */
    extensions?: IAnimationChannelTargetExtensions;
}

/**
 * Parsed animation pointer result
 */
export interface IParsedAnimationPointer {
    /**
     * Target object resolved from the pointer path
     */
    target: unknown;
    
    /**
     * Property names to animate on the target
     */
    properties: string[];
}

/**
 * Animation pointer tree node for validation
 */
export interface IAnimationPointerTreeNode {
    /**
     * Indicates this node represents an array element
     */
    __array__?: IAnimationPointerTreeNode;
    
    /**
     * Indicates this node is a valid animation target
     */
    __target__?: boolean;
    
    /**
     * Child nodes indexed by property name
     */
    [key: string]: IAnimationPointerTreeNode | boolean | undefined;
}

/**
 * KHR_animation_pointer Extension
 * 
 * This extension allows animations to target arbitrary glTF properties
 * using JSON Pointer syntax instead of being limited to predefined node properties.
 * 
 * Specification: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_animation_pointer
 */
export declare class KHR_animation_pointer {
    /**
     * Extension name constant
     */
    readonly name: 'KHR_animation_pointer';
    
    /**
     * Reference to the glTF loader instance
     */
    private _loader: import('../glTFLoader').GLTFLoader;
    
    /**
     * Creates an instance of the KHR_animation_pointer extension
     * @param loader - The glTF loader instance
     */
    constructor(loader: import('../glTFLoader').GLTFLoader);
    
    /**
     * Indicates whether this extension is enabled
     * Returns true if the extension is used in the loaded glTF asset
     */
    get enabled(): boolean;
    
    /**
     * Disposes resources used by this extension
     */
    dispose(): void;
    
    /**
     * Loads an animation channel asynchronously using animation pointer syntax
     * 
     * @param context - Context path for error reporting (e.g., "/animations/0/channels/1")
     * @param animationContext - Animation context path for error reporting
     * @param animation - The animation definition
     * @param channel - The animation channel to load
     * @param onLoad - Callback invoked when the animation group is loaded
     * @returns Promise that resolves when the channel is loaded, or null if skipped
     */
    _loadAnimationChannelAsync(
        context: string,
        animationContext: string,
        animation: IAnimation,
        channel: IAnimationChannel,
        onLoad: (animationGroup: AnimationGroup) => void
    ): Nullable<Promise<void>>;
    
    /**
     * Parses a JSON Pointer string and resolves it to a target object and properties
     * 
     * @param context - Context path for error reporting
     * @param pointer - JSON Pointer string (e.g., "/materials/0/pbrMetallicRoughness/baseColorFactor")
     * @returns Parsed pointer information with target and properties, or null if invalid
     */
    _parseAnimationPointer(
        context: string,
        pointer: string
    ): Nullable<IParsedAnimationPointer>;
}