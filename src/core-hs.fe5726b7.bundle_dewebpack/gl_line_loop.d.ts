/**
 * WebGL Tessellation Library
 * Provides polygon tessellation functionality using GLU tesselator algorithms
 */

// ============================================================================
// WebGL Primitive Type Constants
// ============================================================================

/**
 * WebGL primitive type: Line loop
 * Connects a group of line segments in a loop
 */
export declare const GL_LINE_LOOP: number;

/**
 * WebGL primitive type: Triangles
 * Each set of three vertices defines a separate triangle
 */
export declare const GL_TRIANGLES: number;

/**
 * WebGL primitive type: Triangle strip
 * Series of connected triangles sharing vertices
 */
export declare const GL_TRIANGLE_STRIP: number;

/**
 * WebGL primitive type: Triangle fan
 * Triangles sharing a common central vertex
 */
export declare const GL_TRIANGLE_FAN: number;

// ============================================================================
// GLU Tessellation Winding Rule Constants
// ============================================================================

/**
 * Winding rule: Odd
 * A region is considered inside if the winding number is odd
 */
export declare const GLU_TESS_WINDING_ODD: number;

/**
 * Winding rule: Non-zero
 * A region is considered inside if the winding number is non-zero
 */
export declare const GLU_TESS_WINDING_NONZERO: number;

/**
 * Winding rule: Positive
 * A region is considered inside if the winding number is positive
 */
export declare const GLU_TESS_WINDING_POSITIVE: number;

/**
 * Winding rule: Negative
 * A region is considered inside if the winding number is negative
 */
export declare const GLU_TESS_WINDING_NEGATIVE: number;

/**
 * Winding rule: Absolute value greater than or equal to two
 * A region is considered inside if |winding number| >= 2
 */
export declare const GLU_TESS_WINDING_ABS_GEQ_TWO: number;

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Represents a 2D or 3D vertex coordinate
 */
export type Vertex = number[];

/**
 * Represents a polygon as an array of vertices
 */
export type Polygon = Vertex[];

/**
 * Represents a 3D normal vector [x, y, z]
 */
export type Normal = [number, number, number];

/**
 * Tessellation options configuration
 */
export interface TessellationOptions {
  /**
   * Array of polygons to tessellate (outer boundaries)
   */
  polygons: Polygon[];

  /**
   * Array of hole polygons to subtract from the main polygons
   * @default []
   */
  holes?: Polygon[];

  /**
   * Winding rule to determine which regions are inside the polygon
   * @default GLU_TESS_WINDING_POSITIVE
   */
  windingRule?: number;

  /**
   * If true, only output the boundary edges (no fill triangles)
   * @default false
   */
  boundaryOnly?: boolean;

  /**
   * Normal vector for the tessellation plane
   * If null, will be automatically calculated
   * @default null
   */
  normal?: Normal | null;

  /**
   * Automatically fix polygon winding order
   * - Outer polygons will be counter-clockwise
   * - Holes will be clockwise
   * - Filters out degenerate polygons with zero area
   * @default true
   */
  autoWinding?: boolean;

  /**
   * Number of components per vertex (2 for 2D, 3 for 3D, etc.)
   * @default 2
   */
  vertexSize?: number;
}

/**
 * Default tessellation options
 */
export declare const DEFAULT_OPTIONS: Required<TessellationOptions>;

/**
 * Result of a tessellation operation
 * Array of triangles, where each triangle is an array of 3 vertices
 */
export type TessellationResult = Vertex[][];

// ============================================================================
// Tesselator Class
// ============================================================================

/**
 * Main tessellation class
 * Converts complex polygons with holes into triangles using GLU tesselator
 * 
 * @example
 *