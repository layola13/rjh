/**
 * Cell material module type definitions
 * @module cell
 */

/**
 * Cell material class for rendering cell-based visual effects
 * Provides specialized material properties for cellular shading and rendering
 */
export declare class CellMaterial {
  /**
   * Creates a new instance of CellMaterial
   * @param name - The name identifier for this material
   * @param scene - The scene this material belongs to
   */
  constructor(name: string, scene?: unknown);

  /**
   * The unique identifier for this material instance
   */
  readonly id: string;

  /**
   * The human-readable name of this material
   */
  name: string;

  /**
   * Disposes of the material and releases associated resources
   * @param forceDisposeEffect - Whether to force disposal of effects
   * @param forceDisposeTextures - Whether to force disposal of textures
   */
  dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;

  /**
   * Clones the material
   * @param name - The name for the cloned material
   * @returns A new CellMaterial instance with copied properties
   */
  clone(name: string): CellMaterial;

  /**
   * Serializes the material to a JSON object
   * @returns Serialized representation of the material
   */
  serialize(): Record<string, unknown>;
}

/**
 * Re-export of CellMaterial for named import convenience
 */
export { CellMaterial };