/**
 * Fire material module
 * Provides fire effect materials for Babylon.js
 */

/**
 * Material that creates a fire effect with animated flames
 * @public
 */
export interface FireMaterial {
  /**
   * Creates a new fire material instance
   * @param name - The name of the material
   * @param scene - The scene the material belongs to
   */
  new(name: string, scene: any): FireMaterial;
}

/**
 * Fire material exports
 */
export { FireMaterial } from './fireMaterial';