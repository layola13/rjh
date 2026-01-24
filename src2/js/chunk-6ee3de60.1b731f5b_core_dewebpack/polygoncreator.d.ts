/**
 * PolygonCreator - Factory for creating various polygon shapes
 * @module PolygonCreator
 */

import { Point, Vector, Segment, Arc } from './geometry';
import { Direction } from './direction';
import { ToolType } from './tool-type';
import {
  CirclePoly,
  DoorPolygon,
  HalfCirclePoly,
  QuarterCirclePoly,
  GothicPoly,
  OnionPoly,
  RegularPoly,
  SpringlinePoly,
  IsoscelesTrianglePoly,
  AngledHexagonPoly,
  AngledHexagon2Poly,
  RoundedRectanglePolygon,
  ParallelogramPoly,
  DiamondPoly,
  TrapezoidPoly,
  PeakPentagonPoly,
  AngledPentagonPoly,
  HollowSidePoly,
  HollowPoly,
  ConvexPoly,
  QuatrefoilPoly,
  ThreeDimensionalArcPoly,
  EarPolygon,
  PointedEarPolygon,
  SingleTrackPolygon,
  DoubleEarsPolygon,
  HalfKfcPolygon,
  HalfKfc2Polygon,
  KfcPolygon,
  Kfc2Polygon,
  Kfc3Polygon,
  Kfc4Polygon,
  Hollow2Polygon,
  Ear2Polygon,
  WavePoly,
  MosquePoly,
  WinPolygon
} from './polygons';

/**
 * Shape creation function type
 */
type ShapeCreator = (origin: Point) => WinPolygon;

/**
 * Map of tool types to their corresponding shape creation functions
 */
type ShapeCreatorMap = Record<ToolType, ShapeCreator>;

/**
 * Vector with optional curvature parameter for advanced path creation
 * [vector, curvature]
 */
type VectorWithCurvature = [Vector, number | undefined];

/**
 * Factory class for creating polygon shapes based on tool types
 * Implements singleton pattern
 */
export declare class PolygonCreator {
  /**
   * Singleton instance accessor
   */
  static readonly Ins: PolygonCreator;

  /**
   * Base size constant used for shape dimensions (default: 800)
   */
  readonly sizeConst: number;

  /**
   * Map of shape creation functions keyed by ToolType
   */
  private readonly shapes: ShapeCreatorMap;

  /**
   * Creates a polygon shape based on tool type
   * @param toolType - The type of shape to create
   * @param origin - Origin point for the shape
   * @returns Created polygon
   */
  create(toolType: ToolType, origin: Point): WinPolygon;

  /**
   * Creates a circular polygon
   * @param origin - Center point of the circle
   * @returns Circle polygon
   */
  circleShape(origin: Point): CirclePoly;

  /**
   * Creates a rectangular polygon
   * @param origin - Center point of the rectangle
   * @param width - Width of rectangle (default: 3 * sizeConst)
   * @param height - Height of rectangle (default: 2 * sizeConst)
   * @returns Rectangle polygon
   */
  rectangleShape(origin: Point, width?: number, height?: number): WinPolygon;

  /**
   * Creates a door-shaped polygon
   * @param origin - Origin point of the door
   * @returns Door polygon with downward opening
   */
  doorShape(origin: Point): DoorPolygon;

  /**
   * Creates an equilateral triangle polygon
   * @param origin - Center point of the triangle
   * @returns Triangle polygon
   */
  triangleShape(origin: Point): WinPolygon;

  /**
   * Creates a half-circle (semicircle) polygon
   * @param origin - Center point of the half-circle
   * @returns Half-circle polygon
   */
  halfCircleShape(origin: Point): HalfCirclePoly;

  /**
   * Creates a quarter-circle polygon
   * @param origin - Corner point of the quarter-circle
   * @returns Quarter-circle polygon
   */
  quarterCircleShape(origin: Point): QuarterCirclePoly;

  /**
   * Creates a gothic arch polygon
   * @param origin - Base center point of the gothic arch
   * @returns Gothic arch polygon
   */
  gothicShape(origin: Point): GothicPoly;

  /**
   * Creates a gothic rectangle (onion dome) polygon
   * @param origin - Base center point
   * @returns Onion-shaped polygon
   */
  gothicRectangleShape(origin: Point): OnionPoly;

  /**
   * Creates a regular octagon polygon
   * @param origin - Center point of the octagon
   * @returns Octagon polygon
   */
  octagonShape(origin: Point): RegularPoly;

  /**
   * Creates a springline arch polygon
   * @param origin - Base point of the arch
   * @returns Springline arch polygon
   */
  springlineShape(origin: Point): SpringlinePoly;

  /**
   * Creates a springline flanker arch polygon
   * @param origin - Base point of the arch
   * @returns Springline flanker polygon
   */
  springlineFlankerShape(origin: Point): WinPolygon;

  /**
   * Creates an isosceles triangle polygon
   * @param origin - Base center point of the triangle
   * @returns Isosceles triangle polygon
   */
  isoscelesTriangleShape(origin: Point): IsoscelesTrianglePoly;

  /**
   * Creates a regular hexagon polygon
   * @param origin - Center point of the hexagon
   * @returns Hexagon polygon
   */
  hexagonShape(origin: Point): RegularPoly;

  /**
   * Creates an angled hexagon polygon
   * @param origin - Center point
   * @returns Angled hexagon polygon
   */
  angledHexagonShape(origin: Point): AngledHexagonPoly;

  /**
   * Creates an alternative angled hexagon polygon
   * @param origin - Center point
   * @returns Alternative angled hexagon polygon
   */
  angledHexagonShape2(origin: Point): AngledHexagon2Poly;

  /**
   * Creates a rounded rectangle polygon
   * @param origin - Center point
   * @returns Rounded rectangle polygon
   */
  roundedRectangleShape(origin: Point): RoundedRectanglePolygon;

  /**
   * Creates a parallelogram polygon
   * @param origin - Origin point
   * @returns Parallelogram polygon
   */
  parallelogramShape(origin: Point): ParallelogramPoly;

  /**
   * Creates a diamond (rhombus) polygon
   * @param origin - Center point
   * @returns Diamond polygon
   */
  diamondShape(origin: Point): DiamondPoly;

  /**
   * Creates a trapezoid polygon
   * @param origin - Center point
   * @param direction - Orientation direction of the trapezoid
   * @returns Trapezoid polygon
   */
  trapezoidShape(origin: Point, direction: Direction): TrapezoidPoly;

  /**
   * Creates a peak pentagon (house-shaped) polygon
   * @param origin - Base center point
   * @returns Peak pentagon polygon
   */
  peakPentagonShape(origin: Point): PeakPentagonPoly;

  /**
   * Creates an angled pentagon polygon
   * @param origin - Origin point
   * @param direction - Orientation direction (default: Up)
   * @returns Angled pentagon polygon
   */
  angledPentagonShape(origin: Point, direction?: Direction): AngledPentagonPoly;

  /**
   * Creates a hollow side polygon (rectangle with one side indented)
   * @param origin - Center point
   * @param direction - Direction of the hollow side
   * @returns Hollow side polygon
   */
  hollowSideShape(origin: Point, direction: Direction): HollowSidePoly;

  /**
   * Creates a hollow polygon (rectangle with center indentation)
   * @param origin - Center point
   * @param direction - Direction of the hollow
   * @returns Hollow polygon
   */
  hollowShape(origin: Point, direction: Direction): HollowPoly;

  /**
   * Creates a convex polygon (rectangle with center protrusion)
   * @param origin - Center point
   * @param direction - Direction of the convexity
   * @returns Convex polygon
   */
  convexShape(origin: Point, direction: Direction): ConvexPoly;

  /**
   * Creates a quarter arch polygon
   * @param origin - Corner point of the arch
   * @returns Quarter arch polygon
   */
  quarterArchShape(origin: Point): WinPolygon;

  /**
   * Creates an extended partial arch polygon
   * @param origin - Base point of the arch
   * @returns Extended partial arch polygon
   */
  extendedPartialArchShape(origin: Point): WinPolygon;

  /**
   * Creates a quatrefoil (four-leaf clover) polygon
   * @param origin - Center point
   * @returns Quatrefoil polygon
   */
  quatrefoilShape(origin: Point): QuatrefoilPoly;

  /**
   * Creates a three-dimensional arc polygon
   * @param origin - Base point
   * @returns 3D arc polygon
   */
  threeDimensionalArcShape(origin: Point): ThreeDimensionalArcPoly;

  /**
   * Creates an ear-shaped polygon
   * @param origin - Origin point
   * @param direction - Orientation direction (default: Right)
   * @returns Ear polygon
   */
  earShape(origin: Point, direction?: Direction): EarPolygon;

  /**
   * Creates a pointed ear polygon
   * @param origin - Origin point
   * @param direction - Orientation direction (default: Right)
   * @returns Pointed ear polygon
   */
  pointedEarShape(origin: Point, direction?: Direction): PointedEarPolygon;

  /**
   * Creates a single track polygon (with track openings on specified sides)
   * @param origin - Center point
   * @param directions - Array of directions for track openings (default: [Right])
   * @returns Single track polygon
   */
  singleTrackShape(origin: Point, directions?: Direction[]): SingleTrackPolygon;

  /**
   * Creates a double ears polygon
   * @param origin - Center point
   * @param direction - Orientation direction (default: Up)
   * @returns Double ears polygon
   */
  doubleEarsShape(origin: Point, direction?: Direction): DoubleEarsPolygon;

  /**
   * Creates a half KFC-style polygon
   * @param origin - Origin point
   * @returns Half KFC polygon
   */
  halfKfcShape(origin: Point): HalfKfcPolygon;

  /**
   * Creates an alternative half KFC-style polygon
   * @param origin - Origin point
   * @returns Alternative half KFC polygon
   */
  halfKfc2Shape(origin: Point): HalfKfc2Polygon;

  /**
   * Creates a KFC-style polygon
   * @param origin - Origin point
   * @returns KFC polygon
   */
  kfcShape(origin: Point): KfcPolygon;

  /**
   * Creates a KFC2-style polygon
   * @param origin - Origin point
   * @returns KFC2 polygon
   */
  kfc2Shape(origin: Point): Kfc2Polygon;

  /**
   * Creates a KFC3-style polygon
   * @param origin - Origin point
   * @returns KFC3 polygon
   */
  kfc3Shape(origin: Point): Kfc3Polygon;

  /**
   * Creates a KFC4-style polygon
   * @param origin - Origin point
   * @returns KFC4 polygon
   */
  kfc4Shape(origin: Point): Kfc4Polygon;

  /**
   * Creates a Hollow2-style polygon
   * @param origin - Origin point
   * @returns Hollow2 polygon
   */
  hollow2Shape(origin: Point): Hollow2Polygon;

  /**
   * Creates an Ear2-style polygon (horizontal orientation)
   * @param origin - Origin point
   * @returns Ear2 polygon
   */
  ear2Shape(origin: Point): Ear2Polygon;

  /**
   * Creates an Ear2-style polygon (vertical orientation)
   * @param origin - Origin point
   * @returns Vertical Ear2 polygon
   */
  ear2VerticalShape(origin: Point): Ear2Polygon;

  /**
   * Creates a wave-shaped polygon
   * @param origin - Center point
   * @returns Wave polygon
   */
  waveShape(origin: Point): WavePoly;

  /**
   * Creates a mosque dome polygon
   * @param origin - Base center point
   * @returns Mosque polygon
   */
  mosqueShape(origin: Point): MosquePoly;

  /**
   * Joins points using relative vectors to create a polygon
   * @param origin - Starting point
   * @param vectors - Array of relative vectors or arcs
   * @param smartClose - Whether to intelligently close the polygon (default: true)
   * @returns Constructed polygon
   */
  joinRelative(origin: Point, vectors: Array<Vector | Arc>, smartClose?: boolean): WinPolygon;

  /**
   * Advanced relative path joining with optional curvature
   * @param paths - Array of vectors with optional curvature values
   * @param startPoint - Starting point (default: origin)
   * @param smartClose - Whether to intelligently close the polygon (default: true)
   * @returns Constructed polygon with curved segments
   */
  joinRelativePro(
    paths: Array<Vector | VectorWithCurvature>,
    startPoint?: Point,
    smartClose?: boolean
  ): WinPolygon;

  /**
   * Joins points using absolute vectors to create a polygon
   * @param origin - Reference origin point
   * @param vectors - Array of absolute vectors or arcs relative to origin
   * @param smartClose - Whether to intelligently close the polygon (default: true)
   * @returns Constructed polygon
   */
  joinAbsolute(origin: Point, vectors: Array<Vector | Arc>, smartClose?: boolean): WinPolygon;

  /**
   * Joins an array of points with straight segments
   * @param points - Array of points to connect
   * @param offset - Translation offset to apply (default: zero vector)
   * @param close - Whether to close the path by connecting last to first point (default: true)
   * @returns Array of segments connecting the points
   * @throws Error if fewer than 2 points provided
   */
  joinPointsWithSegment(points: Point[], offset?: Vector, close?: boolean): Segment[];
}