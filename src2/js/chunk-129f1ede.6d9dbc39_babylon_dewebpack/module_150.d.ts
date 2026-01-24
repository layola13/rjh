import { Scene, Camera, DigitalRainPostProcess } from '@babylonjs/core';

/**
 * Digital rain post-processing effect manager
 * Provides initialization and generation of digital rain visual effects
 */
export default class DigitalRainManager {
  /**
   * The scene instance where the effect will be applied
   */
  private static scene: Scene;

  /**
   * The camera to which the post-process effect will be attached
   */
  private static camera: Camera;

  /**
   * Initialize the digital rain manager with scene and camera
   * @param scene - The Babylon.js scene instance
   * @param camera - The camera to attach the effect to
   */
  static Init(scene: Scene, camera: Camera): void;

  /**
   * Generate and apply a digital rain post-processing effect
   * Creates an animated effect that oscillates between normal and digital rain rendering
   * The effect intensity varies sinusoidally over time
   */
  static GenDigital(): void;
}