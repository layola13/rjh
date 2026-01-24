/**
 * Direction enumeration for polygon orientation
 */
export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

/**
 * Polygon type enumeration defining all supported polygon shapes
 */
export enum PolyType {
  regular = 'regular',
  circle = 'circle',
  diamond = 'diamond',
  trapezoid = 'trapezoid',
  hollow = 'hollow',
  hollow2 = 'hollow2',
  hollowSize = 'hollowSize',
  convex = 'convex',
  gothic = 'gothic',
  isoscelesTriangle = 'isoscelesTriangle',
  parallelogram = 'parallelogram',
  quarterCircle = 'quarterCircle',
  quatrefoil = 'quatrefoil',
  springline = 'springline',
  threeDimensionalArc = 'threeDimensionalArc',
  halfCircle = 'halfCircle',
  ear = 'ear',
  ear2 = 'ear2',
  pointedEar = 'pointedEar',
  singleTrack = 'singleTrack',
  doubleEars = 'doubleEars',
  wave = 'wave',
  onion = 'onion',
  mosque = 'mosque',
  halfKfc = 'halfKfc',
  halfKfc2 = 'halfKfc2',
  kfc = 'kfc',
  kfc2 = 'kfc2',
  kfc3 = 'kfc3',
  kfc4 = 'kfc4',
  door = 'door',
  peakPentagon = 'peakPentagon',
  angledPentagon = 'angledPentagon',
  angledHexagon = 'angledHexagon',
  angledHexagon2 = 'angledHexagon2',
  roundedRectanglePolygon = 'roundedRectanglePolygon'
}

/**
 * 2D Point interface
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Geometric segment (straight line between two points)
 */
export interface Segment {
  start: Point;
  end: Point;
  name: 'segment';
  reverse(): Segment;
}

/**
 * Geometric arc
 */
export interface Arc {
  start: Point;
  end: Point;
  name: 'arc';
  reverse(): Arc;
}

/**
 * Edge type can be either a segment or an arc
 */
export type Edge = Segment | Arc;

/**
 * Base serialized polygon data structure
 */
export interface SerializedPolyData {
  type: PolyType;
  polygon: Array<Array<{ name: string; [key: string]: unknown }>>;
  editTool?: string;
  cpt?: Point;
  position?: Point;
  tangentPoint?: Point;
  width?: number;
  height?: number;
  radius?: number;
  edgeCount?: number;
  direction?: Direction;
  leftHeight?: number;
  rightHeight?: number;
  isVertical?: boolean;
  xFlip?: boolean;
  yFlip?: boolean;
  hph?: boolean;
  hb?: boolean;
  ph?: number[] | Map<number, number>;
  ep?: Direction;
  fr?: boolean;
  profileSize?: number;
  bid?: boolean;
  hs?: boolean[];
  smArcRadius?: number;
  fixedHeight?: number;
  rw?: number;
  rh?: number;
  la?: number;
  ra?: number;
  it?: boolean;
  br?: number;
  rectWidth?: number;
  arcHeight?: number;
  triangleHeight?: number;
  bottomHidden?: boolean;
}

/**
 * Base polygon class with common properties
 */
export interface BasePolygon {
  editTool?: string;
  pullingHeight?: number[] | Map<number, number>;
  hasBase?: boolean;
  bottomInnerDim?: boolean;
  hiddenSides?: boolean[];
}

/**
 * Generic window polygon
 */
export declare class WinPolygon implements BasePolygon {
  constructor(edges: Edge[]);
  editTool?: string;
}

/**
 * Ear-shaped polygon
 */
export declare class EarPolygon implements BasePolygon {
  constructor(
    centerPoint: Point,
    isVertical: boolean,
    xFlip: boolean,
    yFlip: boolean,
    edges: Edge[]
  );
  editTool?: string;
  hasBase?: boolean;
  pullingHeight?: number[];
}

/**
 * Ear2-shaped polygon (variant)
 */
export declare class Ear2Polygon implements BasePolygon {
  constructor(
    centerPoint: Point,
    isVertical: boolean,
    xFlip: boolean,
    yFlip: boolean,
    edges: Edge[]
  );
  editTool?: string;
  hasBase?: boolean;
  pullingHeight?: number[];
}

/**
 * Pointed ear polygon
 */
export declare class PointedEarPolygon implements BasePolygon {
  constructor(
    centerPoint: Point,
    earPosition: Direction,
    flipRotation: boolean,
    edges: Edge[]
  );
  editTool?: string;
  hasBase?: boolean;
  pullingHeight?: number[];
}

/**
 * Single track polygon
 */
export declare class SingleTrackPolygon implements BasePolygon {
  constructor(centerPoint: Point, earPosition: Direction, edges: Edge[]);
  editTool?: string;
  pullingHeight?: Map<number, number>;
}

/**
 * Double ears polygon
 */
export declare class DoubleEarsPolygon implements BasePolygon {
  constructor(centerPoint: Point, earPosition: Direction, edges: Edge[]);
  editTool?: string;
  hasBase?: boolean;
  pullingHeight?: number[];
}

/**
 * Wave-shaped polygon
 */
export declare class WavePoly implements BasePolygon {
  constructor(
    position: Point,
    tangentPoint: Point,
    width: number,
    height: number,
    edges: Edge[]
  );
  editTool?: string;
}

/**
 * Mosque-shaped polygon
 */
export declare class MosquePoly implements BasePolygon {
  constructor(
    position: Point,
    tangentPoint: Point,
    width: number,
    smallArcRadius: number,
    fixedHeight: number,
    edges: Edge[]
  );
  editTool?: string;
}

/**
 * Half KFC-shaped polygon
 */
export declare class HalfKfcPolygon implements BasePolygon {
  constructor(
    centerPoint: Point,
    xFlip: boolean,
    profileSize: number,
    edges: Edge[]
  );
  editTool?: string;
}

/**
 * Half KFC2-shaped polygon (variant)
 */
export declare class HalfKfc2Polygon implements BasePolygon {
  constructor(
    centerPoint: Point,
    xFlip: boolean,
    profileSize: number,
    edges: Edge[]
  );
  editTool?: string;
}

/**
 * KFC-shaped polygon
 */
export declare class KfcPolygon implements BasePolygon {
  constructor(centerPoint: Point, edges: Edge[]);
  editTool?: string;
  bottomInnerDim?: boolean;
}

/**
 * KFC2-shaped polygon (variant)
 */
export declare class Kfc2Polygon implements BasePolygon {
  constructor(centerPoint: Point, edges: Edge[]);
  editTool?: string;
  pullingHeight?: number[];
}

/**
 * KFC3-shaped polygon (variant)
 */
export declare class Kfc3Polygon implements BasePolygon {
  constructor(centerPoint: Point, edges: Edge[]);
  editTool?: string;
  bottomInnerDim?: boolean;
  hiddenSides?: boolean[];
}

/**
 * KFC4-shaped polygon (variant)
 */
export declare class Kfc4Polygon implements BasePolygon {
  constructor(edges: Edge[]);
  editTool?: string;
}

/**
 * Hollow2 polygon
 */
export declare class Hollow2Polygon implements BasePolygon {
  constructor(edges: Edge[]);
  editTool?: string;
}

/**
 * Door-shaped polygon
 */
export declare class DoorPolygon implements BasePolygon {
  constructor(centerPoint: Point, directions: Direction[], edges: Edge[]);
  editTool?: string;
  pullingHeight?: Map<number, number>;
}

/**
 * Peak pentagon polygon
 */
export declare class PeakPentagonPoly {
  constructor(
    centerPoint: Point,
    width: number,
    height: number,
    triangleHeight: number,
    edges: Edge[]
  );
}

/**
 * Angled pentagon polygon
 */
export declare class AngledPentagonPoly {
  constructor(edges: Edge[]);
}

/**
 * Angled hexagon polygon
 */
export declare class AngledHexagonPoly {
  constructor(
    centerPoint: Point,
    width: number,
    height: number,
    relativeWidth: number,
    relativeHeight: number
  );
}

/**
 * Angled hexagon2 polygon (variant)
 */
export declare class AngledHexagon2Poly {
  constructor(
    centerPoint: Point,
    width: number,
    height: number,
    relativeHeight: number,
    relativeWidth: number,
    leftAngle: number,
    rightAngle: number,
    isTopology: boolean,
    edges: Edge[]
  );
}

/**
 * Rounded rectangle polygon
 */
export declare class RoundedRectanglePolygon {
  constructor(
    centerPoint: Point,
    width: number,
    height: number,
    borderRadius: number,
    isTopology: boolean,
    edges: Edge[]
  );
}

/**
 * Regular polygon (n-sided)
 */
export declare class RegularPoly implements BasePolygon {
  constructor(
    centerPoint: Point,
    radius: number,
    edgeCount: number,
    edges: Edge[]
  );
  editTool?: string;
}

/**
 * Circle polygon
 */
export declare class CirclePoly implements BasePolygon {
  constructor(centerPoint: Point, radius: number, edges: Edge[]);
  editTool?: string;
}

/**
 * Diamond-shaped polygon
 */
export declare class DiamondPoly implements BasePolygon {
  constructor(centerPoint: Point, width: number, height: number, edges: Edge[]);
  editTool?: string;
}

/**
 * Trapezoid polygon
 */
export declare class TrapezoidPoly implements BasePolygon {
  constructor(
    centerPoint: Point,
    direction: Direction,
    width: number,
    leftHeight: number,
    rightHeight: number,
    edges: Edge[]
  );
  editTool?: string;
}

/**
 * Hollow polygon
 */
export declare class HollowPoly implements BasePolygon {
  constructor(
    centerPoint: Point,
    direction: Direction,
    width: number,
    height: number,
    edges: Edge[]
  );
  editTool?: string;
}

/**
 * Hollow side polygon
 */
export declare class HollowSidePoly implements BasePolygon {
  constructor(
    centerPoint: Point,
    direction: Direction,
    width: number,
    height: number,
    edges: Edge[]
  );
  editTool?: string;
}

/**
 * Convex polygon
 */
export declare class ConvexPoly implements BasePolygon {
  constructor(
    centerPoint: Point,
    direction: Direction,
    width: number,
    height: number,
    edges: Edge[]
  );
  editTool?: string;
}

/**
 * Gothic arch polygon
 */
export declare class GothicPoly implements BasePolygon {
  constructor(centerPoint: Point, radius: number, edges: Edge[]);
  editTool?: string;
}

/**
 * Onion-shaped polygon
 */
export declare class OnionPoly implements BasePolygon {
  constructor(centerPoint: Point, radius: number, edges: Edge[]);
  editTool?: string;
}

/**
 * Isosceles triangle polygon
 */
export declare class IsoscelesTrianglePoly implements BasePolygon {
  constructor(centerPoint: Point, width: number, height: number, edges: Edge[]);
  editTool?: string;
}

/**
 * Parallelogram polygon
 */
export declare class ParallelogramPoly implements BasePolygon {
  constructor(centerPoint: Point, width: number, edges: Edge[]);
  editTool?: string;
}

/**
 * Quarter circle polygon
 */
export declare class QuarterCirclePoly implements BasePolygon {
  constructor(position: Point, radius: number, edges: Edge[]);
  editTool?: string;
}

/**
 * Quatrefoil polygon (four-leaf clover shape)
 */
export declare class QuatrefoilPoly implements BasePolygon {
  constructor(centerPoint: Point, rectangleWidth: number, edges: Edge[]);
  editTool?: string;
}

/**
 * Springline polygon
 */
export declare class SpringlinePoly implements BasePolygon {
  constructor(
    centerPoint: Point,
    width: number,
    height: number,
    arcHeight: number,
    edges: Edge[]
  );
  editTool?: string;
}

/**
 * Three-dimensional arc polygon
 */
export declare class ThreeDimensionalArcPoly implements BasePolygon {
  constructor(centerPoint: Point, height: number, edges: Edge[]);
  editTool?: string;
}

/**
 * Half circle polygon
 */
export declare class HalfCirclePoly implements BasePolygon {
  constructor(
    centerPoint: Point,
    radius: number,
    bottomHidden: boolean,
    edges: Edge[]
  );
  editTool?: string;
}

/**
 * PolyParser class for parsing serialized polygon data into polygon instances
 */
export declare class PolyParser {
  /**
   * Main entry point - parses serialized data into appropriate polygon type
   * @param data - Serialized polygon data
   * @returns Corresponding polygon instance
   */
  static parse(data: SerializedPolyData): BasePolygon;

  /**
   * Parses edge data from serialized polygon
   * @param data - Serialized polygon data
   * @returns Array of edges (segments or arcs)
   */
  static parseEdges(data: SerializedPolyData): Edge[];

  /**
   * Parses generic polygon
   */
  static parsePolygon(data: SerializedPolyData): WinPolygon;

  /**
   * Parses ear polygon
   */
  static parseEar(data: SerializedPolyData): EarPolygon;

  /**
   * Parses ear2 polygon
   */
  static parseEar2(data: SerializedPolyData): Ear2Polygon;

  /**
   * Parses pointed ear polygon
   */
  static parsePointedEar(data: SerializedPolyData): PointedEarPolygon;

  /**
   * Parses single track polygon
   */
  static parseSingleTrack(data: SerializedPolyData): SingleTrackPolygon;

  /**
   * Parses double ears polygon
   */
  static parseDoubleEars(data: SerializedPolyData): DoubleEarsPolygon;

  /**
   * Parses wave polygon
   */
  static parseWave(data: SerializedPolyData): WavePoly;

  /**
   * Parses mosque polygon
   */
  static parseMosque(data: SerializedPolyData): MosquePoly;

  /**
   * Parses half KFC polygon
   */
  static parseHalfKfc(data: SerializedPolyData): HalfKfcPolygon;

  /**
   * Parses half KFC2 polygon
   */
  static parseHalfKfc2(data: SerializedPolyData): HalfKfc2Polygon;

  /**
   * Parses KFC polygon
   */
  static parseKfc(data: SerializedPolyData): KfcPolygon;

  /**
   * Parses KFC2 polygon
   */
  static parseKfc2(data: SerializedPolyData): Kfc2Polygon;

  /**
   * Parses KFC3 polygon
   */
  static parseKfc3(data: SerializedPolyData): Kfc3Polygon;

  /**
   * Parses KFC4 polygon
   */
  static parseKfc4(data: SerializedPolyData): Kfc4Polygon;

  /**
   * Parses hollow2 polygon
   */
  static parseHollow2(data: SerializedPolyData): Hollow2Polygon;

  /**
   * Parses door polygon
   */
  static parseDoor(data: SerializedPolyData): DoorPolygon;

  /**
   * Parses peak pentagon polygon
   */
  static parsePeakPentagon(data: SerializedPolyData): PeakPentagonPoly;

  /**
   * Parses angled pentagon polygon
   */
  static parseAngledPentagon(data: SerializedPolyData): AngledPentagonPoly;

  /**
   * Parses angled hexagon polygon
   */
  static parseAngledHexagon(data: SerializedPolyData): AngledHexagonPoly;

  /**
   * Parses angled hexagon2 polygon
   */
  static parseAngledHexagon2(data: SerializedPolyData): AngledHexagon2Poly;

  /**
   * Parses rounded rectangle polygon
   */
  static parseRoundedRectanglePolygon(data: SerializedPolyData): RoundedRectanglePolygon;

  /**
   * Parses regular polygon
   */
  static parseRegular(data: SerializedPolyData): RegularPoly;

  /**
   * Parses circle polygon
   */
  static parseCircle(data: SerializedPolyData): CirclePoly;

  /**
   * Parses diamond polygon
   */
  static parseDiamond(data: SerializedPolyData): DiamondPoly;

  /**
   * Parses trapezoid polygon
   */
  static parseTrapezoid(data: SerializedPolyData): TrapezoidPoly;

  /**
   * Parses hollow polygon
   */
  static parseHollow(data: SerializedPolyData): HollowPoly;

  /**
   * Parses hollow size polygon
   */
  static parseHollowSize(data: SerializedPolyData): HollowSidePoly;

  /**
   * Parses convex polygon
   */
  static parseConvex(data: SerializedPolyData): ConvexPoly;

  /**
   * Parses gothic polygon
   */
  static parseGothic(data: SerializedPolyData): GothicPoly;

  /**
   * Parses onion polygon
   */
  static parseOnion(data: SerializedPolyData): OnionPoly;

  /**
   * Parses isosceles triangle polygon
   */
  static parseIsoscelesTriangle(data: SerializedPolyData): IsoscelesTrianglePoly;

  /**
   * Parses parallelogram polygon
   */
  static parseParallelogram(data: SerializedPolyData): ParallelogramPoly;

  /**
   * Parses quarter circle polygon
   */
  static parseQuarterCircle(data: SerializedPolyData): QuarterCirclePoly;

  /**
   * Parses quatrefoil polygon
   */
  static parseQuatrefoil(data: SerializedPolyData): QuatrefoilPoly;

  /**
   * Parses springline polygon
   */
  static parseSpringline(data: SerializedPolyData): SpringlinePoly;

  /**
   * Parses three-dimensional arc polygon
   */
  static parseThreeDimensionalArc(data: SerializedPolyData): ThreeDimensionalArcPoly;

  /**
   * Parses half circle polygon
   */
  static parseHalfCircle(data: SerializedPolyData): HalfCirclePoly;
}