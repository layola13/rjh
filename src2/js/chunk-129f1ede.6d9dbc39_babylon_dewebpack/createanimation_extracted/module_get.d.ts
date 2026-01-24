/**
 * Gets the environment texture used for image-based lighting (IBL) in the scene.
 * 
 * This texture is typically used for:
 * - Reflections on materials with metallic or glossy properties
 * - Ambient lighting contributions
 * - Skybox rendering
 * 
 * @returns The current environment texture, or undefined if not set
 */
declare function get(this: {
  /**
   * Internal storage for the environment texture.
   * Should be accessed through the getter rather than directly.
   */
  _environmentTexture?: EnvironmentTexture;
}): EnvironmentTexture | undefined;

/**
 * Represents an environment texture used for image-based lighting.
 * Commonly a cube map or equirectangular texture.
 */
interface EnvironmentTexture {
  /** Unique identifier for the texture */
  readonly id: string;
  
  /** The name or path of the texture resource */
  name: string;
  
  /** Indicates whether the texture has been loaded and is ready for use */
  isReady: boolean;
  
  /** Optional intensity multiplier for the environment lighting */
  intensity?: number;
  
  /** Rotation applied to the environment map in radians */
  rotation?: number;
}