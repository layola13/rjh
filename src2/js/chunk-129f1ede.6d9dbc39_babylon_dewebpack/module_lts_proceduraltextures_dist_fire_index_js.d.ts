/**
 * Fire procedural texture module
 * Exports fire-related procedural texture functionality
 */

/**
 * Represents a procedural texture that generates fire effects
 * Provides dynamic, shader-based fire texture generation
 */
export class FireProceduralTexture {
  /**
   * Creates a new FireProceduralTexture instance
   * @param name - The name identifier for this texture
   * @param size - The texture size (width and height)
   * @param scene - The scene this texture belongs to
   * @param fallbackTexture - Optional fallback texture if shader compilation fails
   * @param generateMipMaps - Whether to generate mip maps for this texture
   */
  constructor(
    name: string,
    size: number,
    scene: unknown,
    fallbackTexture?: unknown,
    generateMipMaps?: boolean
  );
}

export { FireProceduralTexture as default };