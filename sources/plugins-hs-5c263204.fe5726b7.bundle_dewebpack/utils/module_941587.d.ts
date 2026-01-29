/**
 * Utility class for creating and managing 3D gizmo geometries and materials
 * Provides factory methods for gizmo rendering in the T3D view system
 */
export default class GizmoHelper {
  /**
   * Cached materials storage
   * @static
   */
  static materials: unknown | null;

  /**
   * Creates a gizmo-specific material with render group configuration
   * 
   * @template T - Material constructor type
   * @param MaterialClass - The material class constructor to instantiate
   * @param options - Additional material options to merge with defaults
   * @returns Instance of the specified material class configured for gizmo rendering
   * 
   * @example
   *