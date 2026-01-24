/**
 * WebGL/OpenGL tessellation library for polygon triangulation
 * Provides polygon tessellation with support for complex polygons, holes, and various winding rules
 */

import { GluTesselator, primitiveType, windingRule, gluEnum } from './glu-tessellator';
import { area, is_cw, is_ccw, normal } from './polygon-utils';

// ============================================================================
// OpenGL Primitive Types
// ============================================================================

/**
 * OpenGL line loop primitive type
 * Connects vertices in a closed loop
 */
export const GL_LINE_LOOP: number;

/**
 * OpenGL triangles primitive type
 * Each set of 3 vertices forms an independent triangle
 */
export const GL_TRIANGLES: number;

/**
 * OpenGL triangle strip primitive type
 * Each new vertex creates a triangle with the previous two vertices
 */
export const GL_TRIANGLE_STRIP: number;

/**
 * OpenGL triangle fan primitive type
 * All triangles share the first vertex as a common point
 */
export const GL_TRIANGLE_FAN: number;

// ============================================================================
// GLU Tessellation Winding Rules
// ============================================================================

/**
 * Odd winding rule
 * A region is considered inside if it has an odd winding number
 */
export const GLU_TESS_WINDING_ODD: number;

/**
 * Non-zero winding rule
 * A region is considered inside if it has a non-zero winding number
 */
export const GLU_TESS_WINDING_NONZERO: number;

/**
 * Positive winding rule
 * A region is considered inside if it has a positive winding number
 */
export const GLU_TESS_WINDING_POSITIVE: number;

/**
 * Negative winding rule
 * A region is considered inside if it has a negative winding number
 */
export const GLU_TESS_WINDING_NEGATIVE: number;

/**
 * Absolute value >= 2 winding rule
 * A region is considered inside if its winding number magnitude is >= 2
 */
export const GLU_TESS_WINDING_ABS_GEQ_TWO: number;

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Represents a single vertex coordinate array
 * Length depends on vertexSize (typically 2 for 2D, 3 for 3D)
 */
export type Vertex = number[];

/**
 * A contour is an array of vertices forming a closed path
 */
export type Contour = Vertex[];

/**
 * A polygon is represented as an array of contours
 */
export type Polygon = Contour[];

/**
 * 3D normal vector [x, y, z]
 */
export type Normal = [number, number, number];

/**
 * Tessellation configuration options
 */
export interface TessellationOptions {
  /**
   * Array of polygons to tessellate
   * Each polygon is an array of vertex arrays
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
   * If true, only output boundary edges instead of filled triangles
   * @default false
   */
  boundaryOnly?: boolean;

  /**
   * Surface normal vector for the polygon plane
   * Auto-calculated from first polygon if not provided
   * @default null
   */
  normal?: Normal | null;

  /**
   * Automatically determine and correct polygon winding order
   * Ensures outer polygons are counter-clockwise and holes are clockwise
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
export const DEFAULT_OPTIONS: Required<TessellationOptions>;

/**
 * Result of tessellation - array of triangle vertex arrays
 */
export type TessellationResult = Vertex[][];

// ============================================================================
// Main Tessellator Class
// ============================================================================

/**
 * Polygon tessellator that converts complex polygons into triangles
 * Extends GLU tesselator with high-level API for polygon triangulation
 * 
 * @example
 *