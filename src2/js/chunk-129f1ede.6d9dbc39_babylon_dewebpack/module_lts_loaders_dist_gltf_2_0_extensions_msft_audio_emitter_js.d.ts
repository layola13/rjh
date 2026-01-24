/**
 * MSFT_audio_emitter Extension for glTF 2.0
 * 
 * This extension adds spatial audio emitters to glTF scenes, supporting:
 * - Audio clips with various playback properties
 * - 3D spatial audio with distance attenuation
 * - Directional audio cones
 * - Animation-driven audio events
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_audio_emitter
 */

import { Observable } from "@babylonjs/core/Misc/observable";
import { Sound, WeightedSound, Vector3, Tools } from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Animation, AnimationEvent } from "@babylonjs/core/Animations/animation";
import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup";
import { 
    GLTFLoader, 
    IGLTFLoaderExtension, 
    ArrayItem 
} from "@babylonjs/loaders/glTF/2.0/glTFLoader";

/**
 * Extension name identifier
 */
export declare const EXTENSION_NAME = "MSFT_audio_emitter";

/**
 * Represents a single audio clip in the glTF extension
 */
export interface IMSFTAudioClip {
    /** URI to the audio file */
    uri?: string;
    /** Buffer view index containing audio data */
    bufferView?: number;
    /** MIME type of the audio (e.g., "audio/mpeg", "audio/wav") */
    mimeType: string;
    /** Optional name for the clip */
    name?: string;
    /** Internal: Cached object URL for the audio blob */
    _objectURL?: Promise<string>;
    /** Internal: Array item index */
    index?: number;
}

/**
 * Audio clip reference with playback weight
 */
export interface IMSFTAudioClipReference {
    /** Index of the clip in the clips array */
    clip: number;
    /** Playback weight for mixing multiple clips (default: 1.0) */
    weight?: number;
}

/**
 * Distance model types for spatial audio attenuation
 */
export type DistanceModel = "linear" | "inverse" | "exponential";

/**
 * Represents an audio emitter in 3D space
 */
export interface IMSFTAudioEmitter {
    /** Optional name for the emitter */
    name?: string;
    /** Array item index */
    index?: number;
    /** Audio clips to play from this emitter */
    clips: IMSFTAudioClipReference[];
    /** Whether to loop the audio (default: false) */
    loop?: boolean;
    /** Volume multiplier (0.0 to 1.0, default: 1.0) */
    volume?: number;
    
    // Distance attenuation properties
    /** Reference distance for attenuation calculation (default: 1.0) */
    refDistance?: number;
    /** Maximum distance beyond which audio won't attenuate further (default: 256.0) */
    maxDistance?: number;
    /** Rate of attenuation (default: 1.0) */
    rolloffFactor?: number;
    /** Distance model algorithm (default: "exponential") */
    distanceModel?: DistanceModel;
    
    // Directional cone properties (in radians)
    /** Inner cone angle where volume is unaffected */
    innerAngle?: number;
    /** Outer cone angle where volume starts to decrease */
    outerAngle?: number;
    
    /** Internal: Cached Babylon.js Sound instances */
    _babylonSounds?: Sound[];
    /** Internal: Loaded emitter data */
    _babylonData?: {
        loaded: Promise<void>;
        sound?: WeightedSound;
    };
}

/**
 * Audio event actions that can be triggered during animation
 */
export type AudioEventAction = "play" | "stop" | "pause";

/**
 * Animation event for controlling audio playback
 */
export interface IMSFTAudioEvent {
    /** Index in the events array */
    index?: number;
    /** Time in the animation to trigger the event (in seconds) */
    time: number;
    /** Index of the emitter to control */
    emitter: number;
    /** Action to perform on the emitter */
    action: AudioEventAction;
    /** Time offset to start playback from (for "play" action, in seconds) */
    startOffset?: number;
}

/**
 * Animation extension data
 */
export interface IMSFTAudioAnimation {
    /** Audio events triggered during this animation */
    events: IMSFTAudioEvent[];
}

/**
 * Scene extension data
 */
export interface IMSFTAudioScene {
    /** Emitters attached to the scene (non-directional, non-distance) */
    emitters: number[];
}

/**
 * Node extension data
 */
export interface IMSFTAudioNode {
    /** Emitters attached to this node */
    emitters: number[];
}

/**
 * Root extension data structure
 */
export interface IMSFTAudioEmitterExtension {
    /** All audio clips defined in the extension */
    clips: IMSFTAudioClip[];
    /** All audio emitters defined in the extension */
    emitters: IMSFTAudioEmitter[];
}

/**
 * glTF Loader Extension for MSFT_audio_emitter
 * 
 * Loads and manages spatial audio emitters, integrating them with
 * Babylon.js Sound API and glTF scenes, nodes, and animations.
 */
export declare class MSFT_audio_emitter implements IGLTFLoaderExtension {
    /**
     * Extension name
     */
    readonly name: typeof EXTENSION_NAME;
    
    /**
     * Whether this extension is enabled
     */
    enabled: boolean;
    
    /**
     * Reference to the parent glTF loader
     */
    private _loader: GLTFLoader | null;
    
    /**
     * Cached audio clips from the extension
     */
    private _clips: IMSFTAudioClip[] | null;
    
    /**
     * Cached audio emitters from the extension
     */
    private _emitters: IMSFTAudioEmitter[] | null;
    
    /**
     * Creates a new instance of the MSFT_audio_emitter extension
     * @param loader The parent glTF loader
     */
    constructor(loader: GLTFLoader);
    
    /**
     * Disposes of the extension and clears cached data
     */
    dispose(): void;
    
    /**
     * Called during the loading phase to cache extension data
     */
    onLoading(): void;
    
    /**
     * Loads audio emitters attached to a scene
     * @param context The glTF context path
     * @param scene The glTF scene definition
     * @returns Promise that resolves when scene audio is loaded
     */
    loadSceneAsync(context: string, scene: any): Promise<void>;
    
    /**
     * Loads audio emitters attached to a node
     * @param context The glTF context path
     * @param node The glTF node definition
     * @param assign Callback to assign the loaded Babylon.js node
     * @returns Promise that resolves to the loaded TransformNode
     */
    loadNodeAsync(
        context: string, 
        node: any, 
        assign: (babylonNode: TransformNode) => void
    ): Promise<TransformNode>;
    
    /**
     * Loads animation events for controlling audio playback
     * @param context The glTF context path
     * @param animation The glTF animation definition
     * @returns Promise that resolves to the loaded AnimationGroup
     */
    loadAnimationAsync(
        context: string, 
        animation: any
    ): Promise<AnimationGroup>;
    
    /**
     * Loads an audio clip and returns its object URL
     * @param context The glTF context path
     * @param clip The audio clip definition
     * @returns Promise that resolves to a blob URL for the audio data
     */
    private _loadClipAsync(
        context: string, 
        clip: IMSFTAudioClip
    ): Promise<string>;
    
    /**
     * Loads an audio emitter and creates Babylon.js Sound instances
     * @param context The glTF context path
     * @param emitter The emitter definition
     * @returns Promise that resolves when the emitter is fully loaded
     */
    private _loadEmitterAsync(
        context: string, 
        emitter: IMSFTAudioEmitter
    ): Promise<void>;
    
    /**
     * Creates an action function for an animation event
     * @param context The glTF context path
     * @param sound The WeightedSound to control
     * @param action The action type
     * @param eventTime The time the event occurs in the animation
     * @param startOffset Optional start offset for playback
     * @returns Function to execute when the event triggers
     */
    private _getEventAction(
        context: string,
        sound: WeightedSound,
        action: AudioEventAction,
        eventTime: number,
        startOffset?: number
    ): (currentFrame: number) => void;
    
    /**
     * Loads an animation event and attaches it to the animation
     * @param context The glTF context path
     * @param animationContext The animation's context path
     * @param animation The glTF animation definition
     * @param event The audio event definition
     * @param animationGroup The loaded Babylon.js AnimationGroup
     * @returns Promise that resolves when the event is loaded
     */
    private _loadAnimationEventAsync(
        context: string,
        animationContext: string,
        animation: any,
        event: IMSFTAudioEvent,
        animationGroup: AnimationGroup
    ): Promise<void>;
}