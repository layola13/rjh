/**
 * Module: glTF Loader Animation
 * Provides animation property information and utilities for glTF 2.0 animations
 */

import { Animation } from "core/Animations/animation";
import { Vector3 } from "core/Maths/math.vector";
import { Quaternion } from "core/Maths/math.quaternion";
import { TransformNode } from "core/Meshes/transformNode";
import { MorphTarget } from "core/Morph/morphTarget";

/**
 * Represents an animation key frame
 */
export interface IAnimationKey {
  /** The frame number */
  frame: number;
  /** The animated value */
  value: any;
  /** Optional input tangent for interpolation */
  inTangent?: any;
  /** Optional output tangent for interpolation */
  outTangent?: any;
  /** Optional interpolation mode */
  interpolation?: number;
}

/**
 * Represents a glTF loader node with animation data
 */
export interface IAnimationNode {
  /** The Babylon.js transform node */
  _babylonTransformNode?: TransformNode;
  /** Array of primitive Babylon meshes */
  _primitiveBabylonMeshes?: Array<{
    morphTargetManager?: {
      getTarget(index: number): MorphTarget;
    };
  }>;
  /** Number of morph targets */
  _numMorphTargets?: number;
}

/**
 * Callback type for registering animations
 */
export type AnimationCallback = (target: any, animation: Animation) => void;

/**
 * Extracts a Vector3 from an array at the specified offset and scales it
 * @param context - Unused context parameter
 * @param data - Source data array
 * @param offset - Offset into the data array
 * @param scale - Scale factor to apply
 * @returns Scaled Vector3
 */
export declare function getVector3(
  context: any,
  data: ArrayLike<number>,
  offset: number,
  scale: number
): Vector3;

/**
 * Extracts a Quaternion from an array at the specified offset and scales it
 * @param context - Unused context parameter
 * @param data - Source data array
 * @param offset - Offset into the data array
 * @param scale - Scale factor to apply
 * @returns Scaled Quaternion
 */
export declare function getQuaternion(
  context: any,
  data: ArrayLike<number>,
  offset: number,
  scale: number
): Quaternion;

/**
 * Extracts morph target weights from an array
 * @param node - The animation node containing morph target information
 * @param data - Source data array
 * @param offset - Offset into the data array
 * @param scale - Scale factor to apply to each weight
 * @returns Array of scaled weights
 */
export declare function getWeights(
  node: IAnimationNode,
  data: ArrayLike<number>,
  offset: number,
  scale: number
): number[];

/**
 * Base class for animation property information
 */
export declare class AnimationPropertyInfo {
  /** The animation type (e.g., ANIMATIONTYPE_VECTOR3) */
  readonly type: number;
  
  /** The property name to animate (e.g., "position", "rotation") */
  readonly name: string;
  
  /** Function to retrieve the animated value from raw data */
  readonly getValue: (
    node: IAnimationNode,
    data: ArrayLike<number>,
    offset: number,
    scale: number
  ) => any;
  
  /** Function to get the stride (number of components) for this property */
  readonly getStride: (node: IAnimationNode) => number;

  /**
   * Creates an instance of AnimationPropertyInfo
   * @param type - The animation type constant
   * @param name - The property name
   * @param getValue - Function to extract value from data
   * @param getStride - Function to get component stride
   */
  constructor(
    type: number,
    name: string,
    getValue: (
      node: IAnimationNode,
      data: ArrayLike<number>,
      offset: number,
      scale: number
    ) => any,
    getStride: (node: IAnimationNode) => number
  );

  /**
   * Builds a Babylon.js Animation from key frames
   * @param name - Animation name
   * @param framePerSecond - Frames per second
   * @param keys - Array of animation key frames
   * @returns The constructed Animation
   * @internal
   */
  protected _buildAnimation(
    name: string,
    framePerSecond: number,
    keys: IAnimationKey[]
  ): Animation;

  /**
   * Builds and registers animations for the target
   * @param node - The animation node
   * @param name - Animation name
   * @param framePerSecond - Frames per second
   * @param keys - Array of animation key frames
   * @param callback - Callback to register the animation
   */
  buildAnimations(
    node: IAnimationNode,
    name: string,
    framePerSecond: number,
    keys: IAnimationKey[],
    callback: AnimationCallback
  ): void;
}

/**
 * Animation property info for TransformNode properties (translation, rotation, scale)
 */
export declare class TransformNodeAnimationPropertyInfo extends AnimationPropertyInfo {
  /**
   * Builds and registers animations for a transform node
   * @param node - The animation node
   * @param name - Animation name
   * @param framePerSecond - Frames per second
   * @param keys - Array of animation key frames
   * @param callback - Callback to register the animation
   */
  buildAnimations(
    node: IAnimationNode,
    name: string,
    framePerSecond: number,
    keys: IAnimationKey[],
    callback: AnimationCallback
  ): void;
}

/**
 * Animation property info for morph target weights
 */
export declare class WeightAnimationPropertyInfo extends AnimationPropertyInfo {
  /**
   * Builds and registers animations for morph target weights
   * Creates separate animations for each morph target
   * @param node - The animation node
   * @param name - Animation name base
   * @param framePerSecond - Frames per second
   * @param keys - Array of animation key frames with array values
   * @param callback - Callback to register each morph target animation
   */
  buildAnimations(
    node: IAnimationNode,
    name: string,
    framePerSecond: number,
    keys: IAnimationKey[],
    callback: AnimationCallback
  ): void;
}

/**
 * Map of animation target paths to their corresponding property info
 * Defines how different glTF animation channels are handled
 */
export declare const nodeAnimationData: {
  /** Translation animation (position) */
  translation: [TransformNodeAnimationPropertyInfo];
  /** Rotation animation (quaternion) */
  rotation: [TransformNodeAnimationPropertyInfo];
  /** Scale animation */
  scale: [TransformNodeAnimationPropertyInfo];
  /** Morph target weight animations */
  weights: [WeightAnimationPropertyInfo];
};