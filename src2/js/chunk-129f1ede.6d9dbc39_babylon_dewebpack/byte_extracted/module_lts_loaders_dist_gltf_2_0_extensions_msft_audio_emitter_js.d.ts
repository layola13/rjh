/**
 * MSFT_audio_emitter glTF Extension
 * Implements support for audio emitters in glTF files as per the MSFT_audio_emitter specification.
 * This extension allows audio clips to be attached to scenes and nodes with spatial audio properties.
 */

import { Sound, WeightedSound, AnimationEvent, Vector3, Tools, Observable } from '@babylonjs/core';
import { GLTFLoader, ArrayItem, IArrayItem } from '@babylonjs/loaders';
import type { IScene, INode, IAnimation } from '@babylonjs/loaders';

/** Extension name constant */
declare const EXTENSION_NAME = "MSFT_audio_emitter";

/**
 * Audio clip data structure containing buffer or URI reference
 */
export interface IMSFTAudioEmitter_Clip extends IArrayItem {
  /** Name of the audio clip */
  name?: string;
  /** URI to the audio file */
  uri?: string;
  /** Reference to a bufferView containing audio data */
  bufferView?: number;
  /** MIME type of the audio (e.g., "audio/mpeg", "audio/wav") */
  mimeType: string;
  /** @internal Cached object URL for the audio blob */
  _objectURL?: Promise<string>;
}

/**
 * Weighted audio clip reference
 */
export interface IMSFTAudioEmitter_ClipReference {
  /** Index of the clip in the clips array */
  clip: number;
  /** Playback weight for this clip (default: 1) */
  weight?: number;
}

/**
 * Audio emitter configuration
 */
export interface IMSFTAudioEmitter_Emitter extends IArrayItem {
  /** Name of the emitter */
  name?: string;
  /** Array of audio clips with weights */
  clips: IMSFTAudioEmitter_ClipReference[];
  /** Whether the audio should loop */
  loop?: boolean;
  /** Volume level (0-1 range) */
  volume?: number;
  /** Reference distance for distance attenuation */
  refDistance?: number;
  /** Maximum distance for audio audibility */
  maxDistance?: number;
  /** Rolloff factor for distance attenuation */
  rolloffFactor?: number;
  /** Distance model ("linear", "inverse", "exponential") */
  distanceModel?: string;
  /** Inner cone angle in radians */
  innerAngle?: number;
  /** Outer cone angle in radians */
  outerAngle?: number;
  
  /** @internal Babylon.js Sound instances */
  _babylonSounds?: Sound[];
  /** @internal Babylon.js data container */
  _babylonData?: {
    loaded: Promise<void>;
    sound?: WeightedSound;
  };
}

/**
 * Animation event configuration for audio control
 */
export interface IMSFTAudioEmitter_AnimationEvent extends IArrayItem {
  /** Time in the animation when the event triggers */
  time: number;
  /** Action to perform: "play", "stop", or "pause" */
  action: 'play' | 'stop' | 'pause';
  /** Index of the emitter to control */
  emitter: number;
  /** Start offset for play action */
  startOffset?: number;
}

/**
 * Animation extension data
 */
export interface IMSFTAudioEmitter_Animation {
  /** Array of animation events */
  events: IMSFTAudioEmitter_AnimationEvent[];
}

/**
 * Scene extension data
 */
export interface IMSFTAudioEmitter_Scene {
  /** Array of emitter indices attached to the scene */
  emitters: number[];
}

/**
 * Node extension data
 */
export interface IMSFTAudioEmitter_Node {
  /** Array of emitter indices attached to the node */
  emitters: number[];
}

/**
 * Root extension data in glTF
 */
export interface IMSFTAudioEmitter {
  /** Array of audio clips */
  clips: IMSFTAudioEmitter_Clip[];
  /** Array of audio emitters */
  emitters: IMSFTAudioEmitter_Emitter[];
}

/**
 * MSFT_audio_emitter glTF Extension Loader
 * 
 * This extension enables spatial audio in glTF scenes by:
 * - Loading audio clips from URIs or buffer views
 * - Creating spatial audio emitters with distance attenuation
 * - Supporting directional audio cones
 * - Syncing audio playback with animations
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_audio_emitter
 */
export declare class MSFT_audio_emitter {
  /** Extension name */
  readonly name: typeof EXTENSION_NAME;
  
  /** Whether this extension is enabled */
  enabled: boolean;
  
  /** @internal Reference to the parent glTF loader */
  private _loader: GLTFLoader;
  
  /** @internal Array of audio clips from the extension */
  private _clips: IMSFTAudioEmitter_Clip[] | null;
  
  /** @internal Array of audio emitters from the extension */
  private _emitters: IMSFTAudioEmitter_Emitter[] | null;
  
  /**
   * Creates a new instance of the MSFT_audio_emitter extension
   * @param loader - The parent glTF loader instance
   */
  constructor(loader: GLTFLoader);
  
  /**
   * Disposes resources and clears references
   */
  dispose(): void;
  
  /**
   * Called during glTF loading to initialize extension data
   * Reads clips and emitters from the glTF extensions object
   */
  onLoading(): void;
  
  /**
   * Loads scene-level audio emitters
   * @param context - Context string for error messages
   * @param scene - The glTF scene object
   * @returns Promise that resolves when all emitters are loaded
   * @throws Error if direction or distance properties are used on scene emitters
   */
  loadSceneAsync(context: string, scene: IScene): Promise<void>;
  
  /**
   * Loads node-level audio emitters and attaches them to the node's mesh
   * @param context - Context string for error messages
   * @param node - The glTF node object
   * @param assign - Callback to assign the loaded Babylon.js node
   * @returns Promise that resolves when the node and all emitters are loaded
   */
  loadNodeAsync(
    context: string,
    node: INode,
    assign: (babylonTransformNode: import('@babylonjs/core').TransformNode) => void
  ): Promise<import('@babylonjs/core').TransformNode>;
  
  /**
   * Loads animation events that control audio playback
   * @param context - Context string for error messages
   * @param animation - The glTF animation object
   * @returns Promise that resolves when animation and events are loaded
   */
  loadAnimationAsync(
    context: string,
    animation: IAnimation
  ): Promise<import('@babylonjs/core').AnimationGroup>;
  
  /**
   * Loads an audio clip from URI or bufferView
   * @param context - Context string for error messages
   * @param clip - The clip definition
   * @returns Promise that resolves to an object URL for the audio data
   * @internal
   */
  private _loadClipAsync(context: string, clip: IMSFTAudioEmitter_Clip): Promise<string>;
  
  /**
   * Loads an emitter and creates Babylon.js Sound instances
   * @param context - Context string for error messages
   * @param emitter - The emitter definition
   * @returns Promise that resolves when all clips are loaded
   * @internal
   */
  private _loadEmitterAsync(
    context: string,
    emitter: IMSFTAudioEmitter_Emitter
  ): Promise<void>;
  
  /**
   * Creates an action function for animation events
   * @param context - Context string for error messages
   * @param sound - The WeightedSound to control
   * @param action - The action type ("play", "stop", "pause")
   * @param time - Animation time when the event triggers
   * @param startOffset - Optional start offset for play action
   * @returns Function to execute the action
   * @throws Error if action type is not supported
   * @internal
   */
  private _getEventAction(
    context: string,
    sound: WeightedSound,
    action: string,
    time: number,
    startOffset?: number
  ): (currentFrame: number) => void;
  
  /**
   * Loads an animation event and adds it to the animation
   * @param context - Context string for error messages
   * @param animationContext - Animation context string
   * @param animation - The glTF animation object
   * @param event - The event definition
   * @param animationGroup - The Babylon.js AnimationGroup
   * @returns Promise that resolves when the event is loaded
   * @internal
   */
  private _loadAnimationEventAsync(
    context: string,
    animationContext: string,
    animation: IAnimation,
    event: IMSFTAudioEmitter_AnimationEvent,
    animationGroup: import('@babylonjs/core').AnimationGroup
  ): Promise<void>;
}