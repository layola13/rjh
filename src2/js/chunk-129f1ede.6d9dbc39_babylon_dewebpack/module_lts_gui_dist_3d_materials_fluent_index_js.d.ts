/**
 * Fluent material system module for Babylon.js GUI 3D.
 * Provides fluent design style materials with modern visual effects.
 */

/**
 * Defines configuration for FluentMaterial shader compilation.
 * Controls which features and effects are enabled in the material.
 */
export interface FluentMaterialDefines {
  // Add specific define properties based on your material needs
  // Example properties (adjust based on actual implementation):
  // ALPHATEST?: boolean;
  // INSTANCES?: boolean;
  // etc.
}

/**
 * A material implementing Microsoft Fluent Design System aesthetics.
 * Provides acrylic-like transparency, depth, and modern visual effects
 * suitable for 3D GUI elements.
 */
export class FluentMaterial {
  /**
   * Creates a new FluentMaterial instance.
   * @param name - Unique name for the material
   * @param scene - The scene this material belongs to
   */
  constructor(name: string, scene?: unknown);

  /**
   * Material name identifier.
   */
  name: string;

  /**
   * Shader defines for this material instance.
   */
  defines: FluentMaterialDefines;

  // Add other public properties and methods based on actual implementation
  // Common material properties:
  // alpha?: number;
  // backFaceCulling?: boolean;
  // dispose(): void;
  // isReady(mesh?: unknown, useInstances?: boolean): boolean;
  // etc.
}

export { FluentMaterial, FluentMaterialDefines };