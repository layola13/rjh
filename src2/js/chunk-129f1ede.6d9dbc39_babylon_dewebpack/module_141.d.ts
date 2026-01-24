/**
 * Module: module_141
 * Original ID: 141
 * 
 * Water scene generator for Babylon.js
 * Provides functionality to create realistic water surfaces with wave effects,
 * bump mapping, and ground terrain integration.
 */

import { Scene, Mesh, WaterMaterial, Texture, Vector2, Vector3, Color3, StandardMaterial } from 'babylonjs';
import SkyBoxModule from './module_8';

/**
 * Water scene generator class
 * Manages creation of water surfaces with realistic materials and physics properties
 */
export default class WaterSceneGenerator {
  /**
   * The Babylon.js scene instance where water will be rendered
   */
  private static scene: Scene;

  /**
   * Initializes the water scene generator with a Babylon.js scene
   * @param scene - The Babylon.js scene to attach water effects to
   */
  static Init(scene: Scene): void;

  /**
   * Generates a water surface with realistic wave effects and surrounding terrain
   * 
   * Creates:
   * - Water mesh (40x40 units) with bump-mapped material
   * - Ground mesh (40x40 units) with sand texture
   * - Configures wave physics, wind direction, and color properties
   * - Adds skybox and ground to water reflection render list
   * 
   * Configuration:
   * - Water position: (80, 0.5, 0)
   * - Ground position: (80, 0.2, 0)
   * - Wind force: -15
   * - Wave height: 0 (calm water)
   * - Water color: RGB(0.1, 0.1, 0.6) - deep blue
   * - Blend factor: 0.3
   * - Bump height: 0.1
   * - Wave length: 0.1
   * 
   * @remarks
   * Uses external texture assets from Aliyun OSS:
   * - Water bump map: waterbump.png
   * - Ground texture: sand.jpg (scaled 4x in UV)
   */
  static GenWater(): void;
}