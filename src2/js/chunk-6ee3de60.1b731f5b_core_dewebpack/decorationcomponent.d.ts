/**
 * Decoration component types enumeration
 */
export enum DecorationComponentType {
  decorationCorner = 'decorationCorner',
  decorationEdge = 'decorationEdge',
  decorationLine = 'decorationLine',
  decorationLineArbitrary = 'decorationLineArbitrary',
  decorationPoly = 'decorationPoly'
}

/**
 * Shape type identifier for decoration bars
 */
export enum ShapeType {
  DecorationBar = 'DecorationBar'
}

/**
 * Reference type for decoration points
 */
export interface DecorationReference {
  /** Reference index */
  index: number;
}

/**
 * Point with reference information for decoration components
 */
export interface DecorationReferencePoint {
  /** Base point coordinates */
  point: Point;
  /** Reference information */
  reference: DecorationReference;
  
  /**
   * Get the actual point position in the context
   * @param context - The polygon or shape context
   * @returns The real point coordinates
   */
  getRealPoint(context: WinPolygon): Point;
  
  /**
   * Serialize to JSON
   */
  toJSON(): DecorationReferencePointJSON;
  
  /**
   * Deserialize from JSON
   * @param data - Serialized data
   */
  deserialize(data: DecorationReferencePointJSON): void;
}

/**
 * Serialized format for DecorationReferencePoint
 */
export interface DecorationReferencePointJSON {
  /** Point data */
  pt?: unknown;
  /** Reference data */
  ref?: unknown;
}

/**
 * Geometric point
 */
export interface Point {
  x: number;
  y: number;
  
  /**
   * Translate point by a vector
   * @param vector - Translation vector
   */
  translate(vector: Vector): Point;
}

/**
 * Geometric vector
 */
export interface Vector {
  /**
   * Multiply vector by scalar
   * @param scalar - Multiplication factor
   */
  multiply(scalar: number): Vector;
  
  /**
   * Rotate vector 90 degrees counter-clockwise
   */
  rotate90CCW(): Vector;
}

/**
 * Geometric line
 */
export interface Line {
  /** Point on the line */
  pt: Point;
  /** Normal vector */
  norm: Vector;
  
  /**
   * Find intersection points with another line
   * @param other - Line to intersect with
   */
  intersect(other: Line): Point[];
}

/**
 * Geometric segment
 */
export interface Segment {
  /** Start point */
  start: Point;
  /** End point */
  end: Point;
  
  /**
   * Get tangent vector at start point
   */
  tangentInStart(): Vector;
}

/**
 * Geometric arc
 */
export interface Arc {
  /** Center point */
  center: Point;
  /** Radius */
  r: number;
  /** Counter-clockwise direction flag */
  counterClockwise: boolean;
  
  /**
   * Get numeric radius value
   */
  valueOf(): number;
}

/**
 * Polygon with multiple edges
 */
export interface WinPolygon {
  /** Array of edges (segments or arcs) */
  edges: (Segment | Arc)[];
  /** Multiplication shape reference */
  mulShape?: Segment | Arc;
  
  /**
   * Create framed inner polygon
   * @param widths - Width for each edge
   * @param options - Framing options
   */
  frametify(widths: number[], options: unknown[]): FrametifyResult;
  
  /**
   * Get ring polygon if exists
   */
  ringPolygon(): WinPolygon | undefined;
}

/**
 * Result of polygon frametify operation
 */
export interface FrametifyResult {
  /** Generated bar polygons */
  barPolys: WinPolygon[];
  /** Inner polygons after framing */
  innerPolys: WinPolygon[];
}

/**
 * Parameter manager
 */
export interface Param {
  /**
   * Get parameter value for a shape type
   * @param shapeType - Type of shape
   */
  get(shapeType: ShapeType): number;
}

/**
 * Serialized base component data
 */
export interface DecorationComponentJSON {
  /** Semi-bar width */
  sbw: number;
  /** Component type */
  tp: DecorationComponentType;
}

/**
 * Base class for all decoration components
 */
export declare abstract class DecorationComponent {
  /** Type of decoration component */
  readonly type: DecorationComponentType;
  /** Half-width of the decoration bar */
  semiBarWidth: number;
  
  /**
   * @param type - Type of the decoration component
   */
  constructor(type: DecorationComponentType);
  
  /**
   * Get updated line geometries in the given context
   * @param context - The polygon context
   * @returns Array of updated geometric elements
   */
  abstract getUpdatedLines(context: WinPolygon): unknown[];
  
  /**
   * Create bar polygons for this decoration component
   * @param context - The polygon context
   * @returns Array of generated bar polygons
   */
  abstract createBarPolys(context: WinPolygon): WinPolygon[];
  
  /**
   * Serialize component to JSON
   */
  toJSON(): DecorationComponentJSON;
  
  /**
   * Deserialize component from JSON
   * @param data - Serialized component data
   */
  deserialize(data: DecorationComponentJSON): void;
}

/**
 * Serialized corner decoration data
 */
export interface DecorationCornerJSON extends DecorationComponentJSON {
  /** Vertex data */
  vt: DecorationReferencePointJSON;
  /** Adjacent points data */
  pts: DecorationReferencePointJSON[];
}

/**
 * Corner decoration with vertex and adjacent points
 */
export declare class DecorationCorner extends DecorationComponent {
  /** The corner vertex */
  vertext: DecorationReferencePoint;
  /** Adjacent points defining the corner */
  pts: DecorationReferencePoint[];
  
  /**
   * @param vertex - Corner vertex point
   * @param points - Adjacent points
   */
  constructor(vertex: DecorationReferencePoint, points: DecorationReferencePoint[]);
  
  getUpdatedLines(context: WinPolygon): [Point, Point[]];
  
  createBarPolys(context: WinPolygon): WinPolygon[];
  
  toJSON(): DecorationCornerJSON;
  
  deserialize(data: DecorationCornerJSON): void;
}

/**
 * Serialized edge decoration data
 */
export interface DecorationPolyEdgeJSON extends DecorationComponentJSON {
  /** Start point data */
  st: DecorationReferencePointJSON;
  /** End point data */
  ed: DecorationReferencePointJSON;
}

/**
 * Edge decoration for polygon edges
 */
export declare class DecorationPolyEdge extends DecorationComponent {
  /** Start point of the edge */
  start: DecorationReferencePoint;
  /** End point of the edge */
  end: DecorationReferencePoint;
  
  /**
   * @param start - Edge start point
   * @param end - Edge end point
   */
  constructor(start: DecorationReferencePoint, end: DecorationReferencePoint);
  
  getUpdatedLines(context: WinPolygon): [Point, Point];
  
  createBarPolys(context: WinPolygon): WinPolygon[];
  
  /**
   * Create standard bar polygons for a segment
   * @param start - Start point
   * @param end - End point
   * @param semiBarWidth - Half-width of the bar
   */
  static createStandardBars(start: Point, end: Point, semiBarWidth: number): WinPolygon[];
  
  toJSON(): DecorationPolyEdgeJSON;
  
  deserialize(data: DecorationPolyEdgeJSON): void;
}

/**
 * Serialized line decoration data
 */
export interface DecorationLineJSON extends DecorationComponentJSON {
  /** Start point data */
  st: DecorationReferencePointJSON;
  /** End point data */
  ed: DecorationReferencePointJSON;
}

/**
 * Simple line decoration between two points
 */
export declare class DecorationLine extends DecorationComponent {
  /** Start point of the line */
  start: DecorationReferencePoint;
  /** End point of the line */
  end: DecorationReferencePoint;
  
  /**
   * @param start - Line start point
   * @param end - Line end point
   */
  constructor(start: DecorationReferencePoint, end: DecorationReferencePoint);
  
  getUpdatedLines(context: WinPolygon): [Point, Point];
  
  createBarPolys(context: WinPolygon): WinPolygon[];
  
  toJSON(): DecorationLineJSON;
  
  deserialize(data: DecorationLineJSON): void;
}

/**
 * Serialized arbitrary line decoration data
 */
export interface DecorationLineArbitraryJSON extends DecorationComponentJSON {
  /** Start point data */
  st: DecorationReferencePointJSON;
  /** End point data */
  ed: DecorationReferencePointJSON;
  /** Start intersection edge index */
  sii: number;
  /** End intersection edge index */
  eii: number;
}

/**
 * Arbitrary line decoration with edge intersections
 */
export declare class DecorationLineArbitrary extends DecorationComponent {
  /** Start point of the line */
  start: DecorationReferencePoint;
  /** End point of the line */
  end: DecorationReferencePoint;
  /** Index of edge intersecting at start */
  startIntersectIdx: number;
  /** Index of edge intersecting at end */
  endIntersectIdx: number;
  
  /**
   * @param start - Line start point
   * @param end - Line end point
   * @param startIntersectIdx - Start edge intersection index
   * @param endIntersectIdx - End edge intersection index
   */
  constructor(
    start: DecorationReferencePoint,
    end: DecorationReferencePoint,
    startIntersectIdx: number,
    endIntersectIdx: number
  );
  
  getUpdatedLines(context: WinPolygon): [Point, Point];
  
  createBarPolys(context: WinPolygon): WinPolygon[];
  
  toJSON(): DecorationLineArbitraryJSON;
  
  deserialize(data: DecorationLineArbitraryJSON): void;
}

/**
 * Serialized polygon decoration data
 */
export interface DecorationPolyJSON extends DecorationComponentJSON {
  /** Vertices data */
  vcs: DecorationReferencePointJSON[];
  /** Sub-lines data */
  sls: (DecorationLineJSON | DecorationLineArbitraryJSON)[];
  /** Shape types for each edge */
  stps: string[];
}

/**
 * Complex polygon decoration with multiple edges and vertices
 */
export declare class DecorationPoly extends DecorationComponent {
  /** Sub-line decorations */
  slines: (DecorationLine | DecorationLineArbitrary)[];
  /** Polygon vertices */
  vertices: DecorationReferencePoint[];
  /** Shape type for each edge ('seg' for segment) */
  shapeType: string[];
  
  /**
   * @param slines - Sub-line decorations
   * @param vertices - Polygon vertices
   * @param shapeType - Shape type for each edge
   */
  constructor(
    slines: (DecorationLine | DecorationLineArbitrary)[],
    vertices: DecorationReferencePoint[],
    shapeType: string[]
  );
  
  getUpdatedLines(context: WinPolygon): [WinPolygon];
  
  createBarPolys(context: WinPolygon): WinPolygon[];
  
  /**
   * Create framed inner polygon
   * @param width - Total frame width
   * @param polygon - Source polygon
   */
  frametifyInner(width: number, polygon: WinPolygon): WinPolygon[];
  
  toJSON(): DecorationPolyJSON;
  
  deserialize(data: DecorationPolyJSON): void;
}

/**
 * Utility for parsing decoration components from JSON
 */
export declare namespace DecorationComponentParser {
  /**
   * Parse a point from JSON data
   * @param data - Serialized point data
   */
  function parsePoint(data: DecorationReferencePointJSON): DecorationReferencePoint;
  
  /**
   * Parse an edge component from JSON data
   * @param data - Serialized edge data
   */
  function parseEdge(
    data: DecorationLineJSON | DecorationLineArbitraryJSON
  ): DecorationLine | DecorationLineArbitrary;
}

/**
 * Utility functions
 */
export declare namespace Utils {
  /**
   * Get next index in a circular array
   * @param currentIndex - Current index
   * @param arrayLength - Total array length
   */
  function getNextIdx(currentIndex: number, arrayLength: number): number;
}