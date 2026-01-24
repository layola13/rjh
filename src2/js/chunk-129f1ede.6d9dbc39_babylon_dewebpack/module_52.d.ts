/**
 * Animation explosion utility for 3D mesh objects
 * Handles animated displacement of mesh components based on naming conventions
 */

import { Animation } from '@babylonjs/core';
import type { AbstractMesh, Nullable, TransformNode } from '@babylonjs/core';

/**
 * Configuration for animation settings
 */
interface AnimationConfig {
  /** Whether animation is enabled globally */
  EnableAnimation: boolean;
}

/**
 * Animation state manager
 */
interface AnimationStateManager {
  /** Array of meshes with explosion animations applied */
  animationExplosionArray: AbstractMesh[];
}

/**
 * Animation keyframe definition
 */
interface AnimationKey {
  /** Frame number in the animation timeline */
  frame: number;
  /** Position value at this keyframe */
  value: number;
}

/**
 * Utility class for managing explosion-style animations on 3D meshes
 */
export default class AnimationExplosionManager {
  /**
   * Adds explosion animation to a transform node and its child meshes
   * 
   * @param node - The root transform node containing meshes to animate
   * @param multiplier - Animation distance multiplier (default: 1)
   * @param offset - Base offset for animation displacement (default: 0)
   * @param yAxisOverride - If non-zero, forces animation on Y axis instead of Z
   * 
   * @remarks
   * Animation behavior is determined by mesh naming conventions:
   * - "jt" or "glassitem": no additional offset (l = 0)
   * - "lxcout": positive offset (l = 1)
   * - "lxcin", "lock", "hinge": negative offset (l = -1)
   * - "flyscreen", "glassitem", "glassjt": animate on Y axis with inverted offset
   */
  static addAniamtionExplosion(
    node: Nullable<TransformNode>,
    multiplier?: number,
    offset?: number,
    yAxisOverride?: number
  ): void;
}