/**
 * Graphics object type enumeration
 * Defines the types of graphics objects supported in the system
 * @module GraphicsObjectType
 */

/**
 * Enumeration of graphics object types
 * @readonly
 * @enum {number}
 */
export declare const GraphicsObjectType: {
  /**
   * Mesh graphics object type
   * Represents a single mesh entity
   */
  readonly Mesh: 1;
  
  /**
   * Model graphics object type
   * Represents a complete 3D model that may contain multiple meshes
   */
  readonly Model: 2;
};

/**
 * Type representing valid graphics object type values
 */
export type GraphicsObjectType = typeof GraphicsObjectType[keyof typeof GraphicsObjectType];