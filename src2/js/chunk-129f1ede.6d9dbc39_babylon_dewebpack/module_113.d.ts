/**
 * Background management module for Babylon.js scenes
 * Provides utilities for creating and managing scene backgrounds
 * @module BackgroundManager
 */

import { Scene, Color4, Mesh, BackgroundMaterial, Texture, GridMaterial, Color3, Vector3 } from 'babylonjs';

/**
 * Manages scene backgrounds including ground planes and grid materials
 */
export default class BackgroundManager {
  /**
   * The current scene instance
   */
  private static scene: Scene;

  /**
   * The current background mesh
   */
  private static background?: Mesh;

  /**
   * Initialize the background manager with a scene
   * @param scene - The Babylon.js scene to manage
   */
  static Init(scene: Scene): void;

  /**
   * Clean up and dispose of the current background mesh
   */
  static Clean(): void;

  /**
   * Generate a textured ground background
   * Creates a 200x200 ground plane with a background texture material
   * Sets scene clear color to a dark blue-gray (0.2, 0.2, 0.3)
   */
  static GenGround0(): void;

  /**
   * Generate a grid-based ground background
   * Creates a large 2000x2000 ground plane with a grid material
   * Sets scene clear color to a dark blue-gray (0.2, 0.2, 0.3)
   * Grid features:
   * - Black main color with white lines
   * - 80% opacity
   * - Major grid lines every 10 units
   * - 50% visibility for minor units
   */
  static GenGrid(): void;
}