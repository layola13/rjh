/**
 * Iterator helper type for ES5 compatibility
 */
interface IteratorResult<T> {
  value: T | undefined;
  done: boolean;
}

/**
 * Edge intersection result containing target and reference edges
 */
interface TargetEdgeResult {
  /** Target edge from bar polygon */
  tedge: Flatten.Segment | Flatten.Arc;
  /** Reference edge from mullion polygon */
  redge: Flatten.Segment | Flatten.Arc;
}

/**
 * Input and output edge pair for split operations
 */
interface InOutEdgeResult {
  /** Input edge (incoming edge to intersection) */
  iedge?: Flatten.Segment | Flatten.Arc;
  /** Output edge (outgoing edge from intersection) */
  oedge?: Flatten.Segment | Flatten.Arc;
}

/**
 * Edge pair used in split calculations
 */
interface EdgePair {
  /** Input edge */
  iedge: Flatten.Segment | Flatten.Arc;
  /** Output edge */
  oedge: Flatten.Segment | Flatten.Arc;
}

/**
 * Result of a split bar operation
 */
interface SplitBarResult {
  /** New point created by the split */
  npt: Flatten.Point;
  /** Updated edges after split */
  nedges: Array<Flatten.Segment | Flatten.Arc>;
  /** New boundary polygon created by split */
  nbPoly: BarPolygon[];
}

/**
 * Polygon representing a bar element in the curtain wall system
 */
interface BarPolygon {
  /** Collection of edges forming the polygon */
  edges: Array<Flatten.Segment | Flatten.Arc>;
  /** Split line reference */
  spLine: unknown;
  /** Endpoint dock configuration */
  epDock: DockConfig;
  /** Associated mullion shape */
  mulShape?: Flatten.Segment | Flatten.Arc;
  /** Polygon identifier */
  polyId?: string;
  
  /**
   * Check if this polygon intersects with a shape
   */
  isIntersect(shape: Flatten.Segment | Flatten.Arc): boolean;
}

/**
 * Polygon representing a mullion element in the curtain wall system
 */
interface MullionPolygon {
  /** Collection of edges forming the polygon */
  edges: Array<Flatten.Segment | Flatten.Arc>;
  /** Associated mullion shape */
  mulShape?: Flatten.Segment | Flatten.Arc;
  /** Polygon identifier */
  polyId: string;
}

/**
 * Dock configuration for endpoint connections
 */
interface DockConfig {
  /**
   * Set dock configuration
   * @param isStart - Whether this is the start point
   * @param dock - Dock reference
   */
  setDock(isStart: boolean, dock: unknown): void;
  
  /** Clone this dock configuration */
  clone(): DockConfig;
}

/**
 * Utility class for arc-related geometric operations
 */
declare class ArcUtils {
  /**
   * Find intersection point between two edges
   * @param edge1 - First edge
   * @param edge2 - Second edge
   * @param hint - Hint point near expected intersection
   * @returns Intersection point or undefined
   */
  static edgeCrossPt(
    edge1: Flatten.Segment | Flatten.Arc,
    edge2: Flatten.Segment | Flatten.Arc,
    hint: Flatten.Point
  ): Flatten.Point | undefined;
}

/**
 * Base class for splitting operations
 */
declare abstract class Splitter {
  /**
   * Split geometry by points
   * @param points - Points to split at
   * @param inShape - Input shape
   * @param outShape - Output shape
   * @returns Array of resulting bar polygons
   */
  splitByPts(
    points: Flatten.Point[],
    inShape: Flatten.Line | Flatten.Arc,
    outShape: Flatten.Line | Flatten.Arc
  ): BarPolygon[];
}

/**
 * Splitter implementation for line-based splits
 */
declare class SplitterLine extends Splitter {
  constructor(barPoly: BarPolygon, line: Flatten.Line);
}

/**
 * Splitter implementation for arc-based splits
 */
declare class SplitterArc extends Splitter {
  constructor(barPoly: BarPolygon, shape: Flatten.Segment | Flatten.Arc);
}

/**
 * Utility class for geometric calculations
 */
declare class Utils {
  /**
   * Check if two lines are parallel
   * @param line1 - First line
   * @param line2 - Second line
   * @returns True if lines are parallel
   */
  static isParallel(line1: Flatten.Line, line2: Flatten.Line): boolean;
}

/**
 * Dock factory for creating mullion connections
 */
declare class Dock {
  /**
   * Create a mullion dock reference
   * @param polyId - Polygon identifier
   */
  static Mullion(polyId: string): unknown;
}

/**
 * Flatten.js geometry library namespace
 */
declare namespace Flatten {
  class Point {
    equalTo(other: Point): boolean;
  }
  
  class Vector {
    slope: number;
  }
  
  class Segment {
    start: Point;
    end: Point;
    contains(point: Point): boolean;
    middle(): Point;
  }
  
  class Arc {
    center: Point;
    r: { valueOf(): number };
    startAngle: number;
    endAngle: number;
    counterClockwise: boolean;
    start: Point;
    end: Point;
    contains(point: Point): boolean;
    middle(): Point;
  }
  
  class Line {
    contains(point: Point): boolean;
    split(point: Point): [Segment | Arc, Segment | Arc];
  }
  
  namespace Utils {
    function GT(a: number, b: number): boolean;
  }
  
  function segment(start: Point, end: Point): Segment;
  function arc(
    center: Point,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterClockwise: boolean
  ): Arc;
  function vector(from: Point, to: Point): Vector;
  function line(start: Point, end: Point): Line;
}

/**
 * Performs split operations on bar elements intersected by mullions.
 * Handles geometric calculations for dividing curtain wall bars at intersection points.
 */
export declare class SplitBar {
  /** Bar polygon being split */
  private readonly barPoly: BarPolygon;
  
  /** Mullion polygon causing the split */
  private readonly mulPoly: MullionPolygon;
  
  /** Hit point where split occurs */
  private readonly hitPt: Flatten.Point;
  
  /**
   * Create a new split bar operation
   * @param barPoly - Bar polygon to split
   * @param mulPoly - Mullion polygon intersecting the bar
   * @param hitPt - Point of intersection
   */
  constructor(barPoly: BarPolygon, mulPoly: MullionPolygon, hitPt: Flatten.Point);
  
  /**
   * Execute the split operation
   * @returns Result containing new point, edges, and boundary polygon
   * @throws Error if no valid intersection is found
   */
  run(): SplitBarResult;
  
  /**
   * Find the target edge that contains the hit point
   * @returns Target edge result or undefined if not found
   */
  private findTargetEdge(): TargetEdgeResult | undefined;
  
  /**
   * Find input and output edges at the intersection
   * @param refEdge - Reference edge to search around
   * @returns Input and output edge pair
   */
  private findInOutEdge(refEdge: Flatten.Segment | Flatten.Arc): InOutEdgeResult;
  
  /**
   * Split the bar polygon at specified points
   * @param edges - Input and output edge pair
   * @param points - Points defining the split
   * @returns Array of new bar polygons
   */
  private split(edges: EdgePair, points: Flatten.Point[]): BarPolygon[];
  
  /**
   * Calculate mullion shapes for resulting polygons
   * @param polygons - Polygons to calculate shapes for
   */
  private calcMulShape(polygons: BarPolygon[]): void;
}