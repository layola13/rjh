/**
 * Decoration bar component reference position enum
 */
export enum CornerPosition {
  TopLeft = 0,
  TopRight = 1,
  BottomLeft = 2,
  BottomRight = 3
}

/**
 * Edge position enum for decoration bars
 */
export enum EdgePosition {
  Left = 0,
  Bottom = 1,
  Right = 2,
  Top = 3
}

/**
 * Reference type for decoration components
 */
export enum DecorationComponentReferenceType {
  vertex = 'vertex',
  edge = 'edge',
  edgeMiddle = 'edgeMiddle',
  center = 'center'
}

/**
 * Point in 2D space
 */
export interface Point {
  x: number;
  y: number;
  clone(): Point;
  transform(matrix: Matrix): Point;
}

/**
 * Vector in 2D space
 */
export interface Vector {
  x: number;
  y: number;
  clone(): Vector;
}

/**
 * Transformation matrix
 */
export interface Matrix {
  // Matrix transformation parameters
}

/**
 * Reference to a decoration component (corner, edge, etc.)
 */
export declare class DecoraitonReference {
  constructor(index: number, type?: DecorationComponentReferenceType);
}

/**
 * A point that references a decoration component
 */
export declare class DecoraitonReferencePoint {
  constructor(point: Point, reference: DecoraitonReference, offset?: number);
}

/**
 * Corner component of a decoration bar
 */
export declare class DecorationCorner {
  semiBarWidth?: number;
  constructor(vertex: DecoraitonReferencePoint, edges: DecoraitonReferencePoint[]);
}

/**
 * Edge component connecting two reference points
 */
export declare class DecorationPolyEdge {
  semiBarWidth?: number;
  constructor(start: DecoraitonReferencePoint, end: DecoraitonReferencePoint);
}

/**
 * Polygon component with vertices
 */
export declare class DecorationPoly {
  semiBarWidth?: number;
  constructor(
    edges: DecorationPolyEdge[],
    vertices: DecoraitonReferencePoint[],
    segments: string[]
  );
}

/**
 * Line component between two points
 */
export declare class DecorationLine {
  semiBarWidth?: number;
  constructor(start: DecoraitonReferencePoint, end: DecoraitonReferencePoint);
}

/**
 * Arbitrary line between two points with corner indices
 */
export declare class DecorationLineArbitrary {
  constructor(
    start: DecoraitonReferencePoint,
    end: DecoraitonReferencePoint,
    startCornerIndex: number,
    endCornerIndex: number
  );
}

/**
 * Base decoration bar class
 */
export declare class DecorationBar {
  semiBarWidth?: number;
}

/**
 * Chinese style decoration bar
 */
export declare class DecorationBarChinese extends DecorationBar {
  gap: number;
  hSep: number;
  vSep: number;
  constructor(components: Array<DecorationCorner | DecorationPoly | DecorationLine>);
}

/**
 * Chinese style 2 decoration bar
 */
export declare class DecorationBarChinese2 extends DecorationBar {
  constructor(components: Array<DecorationCorner | DecorationPoly | DecorationLine>);
}

/**
 * Chinese style 3 decoration bar
 */
export declare class DecorationBarChinese3 extends DecorationBar {
  constructor(components: Array<DecorationCorner | DecorationPoly | DecorationLine>);
}

/**
 * Chinese style 4 decoration bar with configurable bars
 */
export declare class DecorationBarChinese4 extends DecorationBar {
  gap: number;
  hSep: number;
  vSep: number;
  verticalBarCount: number;
  horizontalBarCount: number;
  constructor(components: Array<DecorationCorner | DecorationPoly | DecorationLine>);
}

/**
 * Prairie style decoration bar
 */
export declare class DecorationBarPrairie extends DecorationBar {
  verEdgeSep: number;
  verEdgeCount: number;
  horEdgeCount: number;
  horEdgeSep: number;
  middleCount: number;
  middleSep: number;
  vMiddleCount: number;
  vMiddleSep: number;
  constructor(components: DecorationLine[]);
}

/**
 * Colonial style decoration bar
 */
export declare class DecorationBarColonial extends DecorationBar {
  horEdgeCount: number;
  verEdgeCount: number;
  constructor(components: DecorationLine[]);
}

/**
 * Diamond style decoration bar
 */
export declare class DecorationBarDiamond extends DecorationBar {
  hPtCount: number;
  vPtCount: number;
  constructor(components: DecorationLineArbitrary[]);
}

/**
 * Semi-arc style decoration bar
 */
export declare class DecorationBarSemiArc extends DecorationBar {
  count: number;
  constructor(components: DecorationLine[]);
}

/**
 * Shape type enumeration
 */
export declare enum ShapeType {
  DecorationBar = 'DecorationBar'
}

/**
 * Tool type enumeration for different decoration bar styles
 */
export declare enum ToolType {
  decoration_bar_chinese = 'decoration_bar_chinese',
  decoration_bar_chinese2 = 'decoration_bar_chinese2',
  decoration_bar_chinese3 = 'decoration_bar_chinese3',
  decoration_bar_chinese4 = 'decoration_bar_chinese4',
  decoration_bar_prairie = 'decoration_bar_prairie',
  decoration_bar_colonial = 'decoration_bar_colonial',
  decoration_bar_diamond = 'decoration_bar_diamond',
  decoration_bar_semi_arc = 'decoration_bar_semi_arc'
}

/**
 * Parameter retrieval utility
 */
export declare class Param {
  get(shapeType: ShapeType): number;
}

/**
 * Factory class for creating various decoration bar styles
 */
export declare class DecorationBarCreator {
  /**
   * Singleton instance
   */
  static readonly Instance: DecorationBarCreator;

  /**
   * Create a decoration bar by tool type
   */
  create(toolType: ToolType): DecorationBar;

  /**
   * Create Chinese style decoration bar components
   * @param verticalBarCount - Number of vertical bars (default: 0)
   * @param horizontalBarCount - Number of horizontal bars (default: 0)
   * @param gap - Gap between elements (default: 0)
   * @param hSep - Horizontal separation (default: 0)
   * @param vSep - Vertical separation (default: 0)
   * @param semiBarWidth - Half width of the bar (default: from Param)
   */
  createChineseComponents(
    verticalBarCount?: number,
    horizontalBarCount?: number,
    gap?: number,
    hSep?: number,
    vSep?: number,
    semiBarWidth?: number
  ): Array<DecorationCorner | DecorationPoly>;

  /**
   * Create Chinese style 2 decoration bar components
   */
  createChinese2Components(
    param1?: number,
    param2?: number,
    param3?: number,
    param4?: number
  ): Array<DecorationPoly | DecorationLine>;

  /**
   * Create Chinese style 3 decoration bar components
   */
  createChinese3Components(): Array<DecorationCorner | DecorationPoly | DecorationLine>;

  /**
   * Create Chinese style 4 decoration bar components
   * @param verticalBarCount - Number of vertical bars (default: 1)
   * @param horizontalBarCount - Number of horizontal bars (default: 2)
   * @param gap - Gap between elements (default: 0)
   * @param hSep - Horizontal separation (default: 0)
   * @param vSep - Vertical separation (default: 0)
   * @param semiBarWidth - Half width of the bar (default: from Param)
   */
  createChinese4Components(
    verticalBarCount?: number,
    horizontalBarCount?: number,
    gap?: number,
    hSep?: number,
    vSep?: number,
    semiBarWidth?: number
  ): DecorationPoly[];

  /**
   * Create prairie style decoration bar components
   */
  createPrairieComponents(
    verEdgeSep: number,
    verEdgeCount?: number,
    horEdgeSep?: number,
    horEdgeCount?: number,
    middleCount?: number,
    middleSep?: number,
    vMiddleCount?: number,
    vMiddleSep?: number
  ): DecorationLine[];

  /**
   * Create colonial style decoration bar components
   */
  createColonialComponents(
    verEdgeCount?: number,
    horEdgeCount?: number
  ): DecorationLine[];

  /**
   * Create diamond style decoration bar components
   */
  createDiamondComponents(
    hPtCount: number,
    vPtCount: number
  ): DecorationLineArbitrary[];

  /**
   * Create semi-arc decoration bar components
   * @param count - Number of arcs (default: 3)
   */
  createSemiArcComponents(count?: number): DecorationLine[];

  /**
   * Create Chinese style decoration bar
   */
  createChinese(): DecorationBarChinese;

  /**
   * Create Chinese style 2 decoration bar
   */
  createChinese2(): DecorationBarChinese2;

  /**
   * Create Chinese style 3 decoration bar
   */
  createChinese3(): DecorationBarChinese3;

  /**
   * Create Chinese style 4 decoration bar
   */
  createChinese4(): DecorationBarChinese4;

  /**
   * Create prairie style decoration bar
   */
  createPrairie(): DecorationBarPrairie;

  /**
   * Create colonial style decoration bar
   */
  createColonial(): DecorationBarColonial;

  /**
   * Create diamond style decoration bar
   */
  createDiamond(): DecorationBarDiamond;

  /**
   * Create semi-arc decoration bar
   */
  createSemiArc(): DecorationBarSemiArc;

  /**
   * Create vertical bars for Chinese style
   */
  createChineseVerticalBars(
    count: number,
    gap: number,
    separation: number
  ): DecorationPolyEdge[];

  /**
   * Create horizontal bars for Chinese style
   */
  createChineseHorizontalBars(
    count: number,
    gap: number,
    separation: number
  ): DecorationPolyEdge[];

  /**
   * Create a reference point at a corner
   */
  point(vector: Vector, position?: CornerPosition): DecoraitonReferencePoint;

  /**
   * Create a reference point at an edge middle
   */
  middlePoint(vector: Vector, position?: EdgePosition): DecoraitonReferencePoint;

  /**
   * Create a reference point at a ratio along an edge
   */
  ratioPoint(
    ratio: number,
    offset: number,
    position?: EdgePosition,
    extraOffset?: number
  ): DecoraitonReferencePoint;

  /**
   * Create a reference point at the center
   */
  centerPoint(vector: Vector): DecoraitonReferencePoint;

  /**
   * Create an edge between two points at a corner
   */
  edge(start: Vector, end: Vector, position: CornerPosition): DecorationPolyEdge;

  /**
   * Create edges at multiple corners
   */
  edges(
    start: Vector,
    end: Vector,
    positions?: CornerPosition[]
  ): DecorationPolyEdge[];

  /**
   * Create a middle edge
   */
  middleEdge(
    startX: number,
    endX: number,
    offset: number,
    position: EdgePosition
  ): DecorationPolyEdge;

  /**
   * Create middle edges at multiple positions
   */
  middleEdges(
    startX: number,
    endX: number,
    offset: number,
    positions: EdgePosition[]
  ): DecorationPolyEdge[];

  /**
   * Create a ratio edge
   */
  ratioEdge(
    ratio: number,
    startOffset: number,
    endOffset: number,
    position: EdgePosition,
    extraOffset?: number
  ): DecorationPolyEdge;

  /**
   * Create ratio edges at multiple positions
   */
  ratioEdges(
    ratio: number,
    startOffset: number,
    endOffset: number,
    positions: EdgePosition[],
    extraOffset?: number
  ): DecorationPolyEdge[];

  /**
   * Create a center edge
   */
  centerEdge(start: Vector, end: Vector): DecorationPolyEdge;

  /**
   * Create a polygon from vertices
   */
  poly(vertices: DecoraitonReferencePoint[]): DecorationPoly;
}