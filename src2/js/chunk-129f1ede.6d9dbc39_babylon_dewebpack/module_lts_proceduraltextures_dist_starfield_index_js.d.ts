/**
 * Starfield procedural texture module
 * Provides procedural generation of starfield textures
 */

/**
 * Procedural texture that generates a starfield effect
 * @public
 */
export class StarfieldProceduralTexture {
  /**
   * Creates a new StarfieldProceduralTexture instance
   * @param name - The name of the texture
   * @param size - The size of the texture
   * @param scene - The scene the texture belongs to
   */
  constructor(name: string, size: number, scene: unknown);
  
  /**
   * The name of the texture
   */
  name: string;
  
  /**
   * Updates the texture
   */
  update(): void;
  
  /**
   * Disposes of the texture and releases resources
   */
  dispose(): void;
}

/**
 * Re-export of StarfieldProceduralTexture for convenience
 */
export { StarfieldProceduralTexture };