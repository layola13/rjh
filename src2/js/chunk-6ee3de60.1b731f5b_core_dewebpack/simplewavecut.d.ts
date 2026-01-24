/**
 * Simple wave cut module for polygon cutting operations with wave patterns
 * @module SimpleWaveCut
 */

import Point from './Point';
import { Segment, Arc, Line } from './GeometryPrimitives';
import { Frametify } from './Frametify';
import { SimpleLineCut, SimpleWave } from './SimpleCut';
import { ShapeElement, Splitter, Polygon } from './ShapeUtils';

/**
 * Edge representation in geometric operations
 */
export interface Edge {
  start: Point;
  end: Point;
  center?: Point;
  clone(): Edge;
}

/**
 * Polygon structure with edges and mullion properties
 */
export interface IPolygon {
  /** Whether this polygon represents a mullion (structural element) */
  IsMullion: boolean;
  /** Array of edges forming the polygon boundary */
  edges: Edge[];
  /** Unique identifier for the polygon */
  polyId: PolyId;
}

/**
 * Polygon identifier
 */
export interface PolyId {
  clone(): PolyId;
}

/**
 * Line segment structure with center point for arcs
 */
export interface ISegment {
  start: Point;
  end: Point;
  center?: Point;
}

/**
 * Simple line structure containing segments
 */
export interface ISimpleLine {
  /** Array of segments forming the line */
  segments: ISegment[];
  /** Index of the inner edge in the line structure */
  innerEdgeIdx?: number;
  clone(): ISimpleLine;
}

/**
 * Result polygon from cutting operations
 */
export interface ResultPolygon extends Polygon {
  /** Associated simple line structure */
  spLine: {
    line: ISimpleLine;
    innerEdgeIdx: number;
  };
  /** Polygon identifier */
  polyId: PolyId;
  /** Array of edges in the result polygon */
  edges: Edge[];
  /**
   * Validates and marks mullion properties based on reference geometry
   * @param referenceGeometry - Reference line or arc to check against
   */
  checkMullion(referenceGeometry: Line | Arc): void;
}

/**
 * SimpleWaveCut class for cutting polygons with wave patterns.
 * Extends SimpleLineCut to provide wave-based cutting functionality.
 * 
 * @extends SimpleLineCut
 */
export declare class SimpleWaveCut extends SimpleLineCut {
  /** The polygon to be cut */
  protected polygon: IPolygon;
  
  /** The wave pattern line used for cutting */
  protected sline: ISimpleLine;
  
  /** Array of resulting split polygons after cutting operation */
  protected splitPoly: ResultPolygon[];
  
  /** Edges that lie on the cutting line */
  protected edgesOnLine: Edge[];

  /**
   * Creates a new SimpleWaveCut instance
   * @param polygon - The polygon to cut
   * @param sline - The wave pattern line to cut with
   */
  constructor(polygon: IPolygon, sline: ISimpleLine);

  /**
   * Finds parallel edges at a specified offset distance from the cutting line.
   * Creates two parallel wave patterns on either side of the original line.
   * 
   * @param offset - The perpendicular distance from the original line
   * @returns Tuple of two SimpleWave instances representing parallel edges on both sides
   */
  findParallelEdges(offset: number): [SimpleWave, SimpleWave];

  /**
   * Creates mullion structures (structural elements) between parallel edges.
   * Processes polygon segments to generate bridge connections and construct
   * individual mullion polygons.
   * 
   * @param polygon - The source polygon with mullion properties
   * @param leftEdge - The left parallel edge wave
   * @param rightEdge - The right parallel edge wave
   * @returns Array of result polygons representing individual mullions
   */
  createMullion(
    polygon: IPolygon,
    leftEdge: SimpleWave,
    rightEdge: SimpleWave
  ): ResultPolygon[];

  /**
   * Creates a bridge connection between two shape elements.
   * Used internally to connect parallel edges in mullion creation.
   * 
   * @param elements - Array of all shape elements
   * @param start - Starting shape element
   * @param end - Ending shape element
   * @protected
   */
  protected createBridge(
    elements: ShapeElement[],
    start: ShapeElement | undefined,
    end: ShapeElement | undefined
  ): void;
}