/**
 * Gothic polygon module - creates and manages gothic arch-shaped polygons
 * @module GothicPoly
 */

import type { Point, Vector, Matrix, Arc } from './geometry';
import type { WinPolygon, PolygonEdge } from './polygon';

/**
 * Polygon type enumeration
 */
export enum PolyType {
  gothic = 'gothic',
  // ... other types
}

/**
 * Gothic arch polygon class
 * Extends WinPolygon to create gothic-style architectural shapes
 * with pointed arches characteristic of Gothic architecture
 */
export declare class GothicPoly extends WinPolygon {
  /**
   * Center point of the gothic polygon
   */
  cpt: Point;

  /**
   * Radius of the arcs forming the gothic arch
   */
  radius: number;

  /**
   * Constructor for GothicPoly
   * @param cpt - Center point of the polygon
   * @param radius - Radius of the gothic arch arcs
   * @param edges - Optional pre-computed edges array
   */
  constructor(cpt: Point, radius: number, edges?: PolygonEdge[]);

  /**
   * Flag indicating if control dimensions are enabled
   * @returns Always returns true for gothic polygons
   */
  get controlDimFlag(): boolean;

  /**
   * Factory method to create gothic polygon edges
   * Creates a pointed arch using two symmetric arcs at 45° angle
   * @param centerPoint - The center point for the gothic shape
   * @param radius - The radius of the arcs forming the gothic arch
   * @returns Array of polygon edges forming the gothic shape
   */
  static create(centerPoint: Point, radius: number): PolygonEdge[];

  /**
   * Scales the gothic polygon by a given factor
   * @param scaleFactor - The scaling factor to apply
   * @returns The scaled polygon instance
   */
  scale(scaleFactor: number): this;

  /**
   * Creates a deep clone of this gothic polygon
   * @returns A new GothicPoly instance with cloned properties
   * @internal
   */
  protected _clone(): GothicPoly;

  /**
   * Serializes the gothic polygon to JSON
   * @returns JSON representation including type, center point, and radius
   */
  toJSON(): {
    type: PolyType.gothic;
    cpt: ReturnType<Point['toJSON']>;
    radius: number;
    [key: string]: unknown;
  };

  /**
   * Translates (moves) the gothic polygon by a vector
   * @param translationVector - The vector to translate by
   * @returns The translated polygon instance
   */
  translate(translationVector: Vector): this;

  /**
   * Rotates the gothic polygon around a pivot point
   * @param angle - Rotation angle in radians
   * @param pivotPoint - Point to rotate around
   * @returns The rotated polygon instance
   */
  rotate(angle: number, pivotPoint: Point): this;

  /**
   * Drags (modifies) an edge of the gothic polygon
   * Maintains symmetry for edges 0 and 2
   * @param edgeIndex - Index of the edge to drag (0-based)
   * @param dragVector - Vector representing the drag movement
   * @param constraintPoint - Optional constraint point for the drag operation
   * @returns New GothicPoly instance with modified edge
   */
  dragEdge(edgeIndex: number, dragVector: Vector, constraintPoint?: Point): GothicPoly;

  /**
   * Drags (modifies) a vertex of the gothic polygon
   * Internally converts vertex operations to edge operations
   * @param vertexIndex - Index of the vertex to drag (0-based)
   * @param dragVector - Vector representing the drag movement
   * @param _unused - Unused parameter (kept for interface compatibility)
   * @param constraintPoint - Optional constraint point for the drag operation
   * @returns New GothicPoly instance with modified vertex
   */
  dragVertex(
    vertexIndex: number,
    dragVector: Vector,
    _unused: unknown,
    constraintPoint?: Point
  ): GothicPoly;

  /**
   * Drags (modifies) an arc of the gothic polygon
   * Maintains symmetry for opposite arcs
   * @param arcIndex - Index of the arc to drag (0-based)
   * @param dragVector - Vector representing the drag movement
   * @returns New GothicPoly instance with modified arc
   */
  dragArc(arcIndex: number, dragVector: Vector): GothicPoly;

  /**
   * Edits dimensions of the gothic polygon by applying a uniform scale
   * @param _unused - Unused parameter (kept for interface compatibility)
   * @param scaleFactor - The scaling factor to apply
   * @param _unused2 - Unused parameter (kept for interface compatibility)
   * @returns The transformed polygon instance
   */
  editDim(_unused: unknown, scaleFactor: number, _unused2: unknown): this;
}