import type { Point, Vector, Matrix, Segment, Arc, Line } from '@flatten-js/core';
import type { WinPolygon, PolygonCreator, PolyType } from './polygon-types';
import type { DrawParams } from './draw-params';
import type { ArcUtils } from './arc-utils';
import type { Utils } from './utils';
import type { EventType, RegularFrameSettings } from './event-types';

/**
 * Represents a regular polygon (equal sides and angles).
 * Extends WinPolygon with specialized behavior for regular polygons.
 */
export declare class RegularPoly extends WinPolygon {
  /**
   * Center point of the regular polygon
   */
  readonly cpt: Point;

  /**
   * Radius from center to vertices (circumradius)
   */
  radius: number;

  /**
   * Number of edges/sides of the polygon
   * @minimum 3
   */
  readonly edgeCount: number;

  /**
   * Creates a new RegularPoly instance
   * @param centerPoint - The center point of the polygon
   * @param radius - The radius from center to vertices
   * @param edgeCount - Number of edges (must be >= 3)
   * @param edges - Optional pre-computed edges array
   */
  constructor(
    centerPoint: Point,
    radius: number,
    edgeCount: number,
    edges?: Array<Segment | Arc>
  );

  /**
   * Flag indicating this polygon supports controlled dimensions
   * @returns Always true for regular polygons
   */
  get controlDimFlag(): boolean;

  /**
   * Factory method to create edges for a regular polygon
   * @param centerPoint - The center point of the polygon
   * @param radius - The radius from center to vertices
   * @param edgeCount - Number of edges (must be >= 3)
   * @returns Array of segments forming the regular polygon
   * @throws Error if edgeCount < 3
   */
  static create(
    centerPoint: Point,
    radius: number,
    edgeCount: number
  ): Array<Segment | Arc>;

  /**
   * Creates a deep clone of this regular polygon
   * @returns New RegularPoly instance with cloned properties
   */
  protected _clone(): RegularPoly;

  /**
   * Scales the polygon by a factor
   * @param scaleFactor - The scaling factor
   * @returns This instance for chaining
   */
  scale(scaleFactor: number): this;

  /**
   * Serializes the polygon to JSON format
   * @returns JSON representation including type, center, radius, and edge count
   */
  toJSON(): {
    type: PolyType;
    cpt: { x: number; y: number };
    radius: number;
    edgeCount: number;
    [key: string]: unknown;
  };

  /**
   * Creates a new regular polygon with a different number of edges
   * @param newEdgeCount - The new number of edges
   * @returns New RegularPoly with same center and radius but different edge count
   */
  changeEdgesCount(newEdgeCount: number): RegularPoly;

  /**
   * Translates the polygon by a vector
   * @param translationVector - The translation vector
   * @returns This instance for chaining
   */
  translate(translationVector: Vector): this;

  /**
   * Rotates the polygon around a point
   * @param angle - Rotation angle in radians
   * @param rotationCenter - Optional center of rotation (defaults to origin)
   * @returns This instance for chaining
   */
  rotate(angle: number, rotationCenter?: Point): this;

  /**
   * Handles edge dragging interaction
   * @param edgeIndex - Index of the edge being dragged
   * @param dragVector - The drag displacement vector
   * @param dragOrigin - Optional origin point of drag (defaults to origin)
   * @returns New RegularPoly with scaled edges
   * @throws Error if drag direction reverses the edge
   */
  dragEdge(
    edgeIndex: number,
    dragVector: Vector,
    dragOrigin?: Point
  ): RegularPoly;

  /**
   * Handles vertex dragging interaction
   * Delegates to dragEdge since all edges scale uniformly
   * @param vertexIndex - Index of the vertex being dragged
   * @param dragVector - The drag displacement vector
   * @param adjacentEdgeIndex - Index of adjacent edge (unused)
   * @param dragOrigin - Optional origin point of drag (defaults to origin)
   * @returns New RegularPoly with scaled edges
   */
  dragVertex(
    vertexIndex: number,
    dragVector: Vector,
    adjacentEdgeIndex: number,
    dragOrigin?: Point
  ): RegularPoly;

  /**
   * Converts an edge to an arc by dragging its midpoint
   * Applies arc conversion to all edges uniformly
   * @param edgeIndex - Index of the edge to convert
   * @param dragVector - Vector from edge midpoint to desired arc point
   * @returns New RegularPoly with arced or straight edges
   */
  dragArc(edgeIndex: number, dragVector: Vector): RegularPoly;

  /**
   * Initializes dimension display information for all edges
   * @returns Array of dimension info, with only first edge visible by default
   */
  initDimInfo(): Array<{
    idx: number;
    dimShow: boolean;
  }>;

  /**
   * Applies dimension edit by scaling the polygon
   * @param dimIndex - Index of dimension being edited
   * @param newScale - New scale factor
   * @param additionalParam - Additional parameter (unused)
   * @returns This instance after transformation
   */
  editDim(
    dimIndex: number,
    newScale: number,
    additionalParam: unknown
  ): this;

  /**
   * Raises a frame settings event for this polygon
   * @param eventContext - Event context containing view and event bus
   */
  raiseFrameEvent(eventContext: {
    view: {
      eventBus: {
        emit(event: {
          type: EventType;
          payload: RegularFrameSettings;
        }): void;
      };
    };
  }): void;
}