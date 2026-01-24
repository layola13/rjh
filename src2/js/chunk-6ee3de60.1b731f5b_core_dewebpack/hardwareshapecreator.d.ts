/**
 * Hardware shape type definitions
 * Defines various types of hardware components for doors and windows
 */

/**
 * Hardware shape enumeration
 * Represents all available hardware component types
 */
export enum HardwareShape {
  /** Standard hinge */
  Hinge = "Hinge",
  /** Hinge positioned on circular surface */
  HingeOnCircle = "HingeOnCircle",
  /** Professional/enhanced hinge variant */
  HingePro = "HingePro",
  /** Hinge positioned at endpoint */
  EndpointHinge = "EndpointHinge",
  /** Standard window handle */
  Handle = "Handle",
  /** Door handle variant 2 */
  Handle2 = "Handle2",
  /** Door handle variant 3 */
  Handle3 = "Handle3",
  /** Door handle variant 4 */
  Handle4 = "Handle4",
  /** Door handle variant 5 */
  Handle5 = "Handle5",
  /** Commercial door handle */
  CommercialHandle = "CommercialHandle",
  /** Commercial door handle variant 2 */
  CommercialHandle2 = "CommercialHandle2",
  /** Commercial door handle variant 3 */
  CommercialHandle3 = "CommercialHandle3",
  /** Commercial door handle variant 4 */
  CommercialHandle4 = "CommercialHandle4",
  /** Commercial door handle variant 5 */
  CommercialHandle5 = "CommercialHandle5",
  /** Commercial door handle variant 6 */
  CommercialHandle6 = "CommercialHandle6",
  /** Commercial door handle variant 7 */
  CommercialHandle7 = "CommercialHandle7",
  /** Commercial door handle variant 8 */
  CommercialHandle8 = "CommercialHandle8",
  /** Commercial door handle variant 9 */
  CommercialHandle9 = "CommercialHandle9",
  /** Commercial door handle variant 10 */
  CommercialHandle10 = "CommercialHandle10",
  /** Commercial door handle variant 11 */
  CommercialHandle11 = "CommercialHandle11",
  /** Commercial door handle variant 12 */
  CommercialHandle12 = "CommercialHandle12",
  /** Commercial door handle variant 13 */
  CommercialHandle13 = "CommercialHandle13",
  /** Commercial door handle variant 14 */
  CommercialHandle14 = "CommercialHandle14",
  /** Handle designed for folding doors */
  HandleForFold = "HandleForFold",
  /** Handle designed for sliding doors */
  HandleForSlide = "HandleForSlide",
  /** Handle designed for sliding doors variant 2 */
  HandleForSlide2 = "HandleForSlide2",
  /** KFC-style handle */
  KfcHandle = "KfcHandle",
  /** Cross-shaped handle */
  CrossHandle = "CrossHandle",
  /** Standard lock */
  Lock = "Lock",
  /** Lock variant 2 */
  Lock2 = "Lock2"
}

/**
 * Point interface representing 2D coordinates
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Vector interface representing direction and magnitude
 */
export interface Vector {
  x: number;
  y: number;
  /** Rotation angle in radians */
  slope: number;
  /** Rotate vector 90 degrees clockwise */
  rotate90CW(): Vector;
  /** Rotate vector 90 degrees counter-clockwise */
  rotate90CCW(): Vector;
  /** Normalize vector to unit length */
  normalize(): Vector;
  /** Multiply vector by scalar */
  multiply(scalar: number): Vector;
  /** Invert vector direction */
  invert(): Vector;
  /** Rotate vector by angle */
  rotate(angle: number): Vector;
}

/**
 * Polygon interface representing a closed shape
 */
export interface WinPolygon {
  /** Translate polygon by vector */
  translate(vector: Vector): void;
  /** Rotate polygon around point */
  rotate(angle: number, center: Point): void;
  /** Transform polygon using matrix */
  transform(matrix: unknown): void;
  /** Clone polygon */
  clone(): WinPolygon;
  /** Get polygon edges */
  edges: unknown[];
  /** Get bounding box */
  box: { xmin: number; xmax: number; ymin: number; ymax: number };
}

/**
 * Hardware shape creation function type
 * @param position - Position point for the hardware
 * @param direction - Direction vector for orientation
 * @param size - Optional size parameter (default: -1 indicates auto-size)
 * @param variant - Optional variant parameter for Handle2
 * @returns Array of polygon shapes representing the hardware component
 */
type HardwareShapeFunction = (
  position: Point,
  direction: Vector,
  size?: number,
  variant?: unknown
) => WinPolygon[];

/**
 * Hardware Shape Creator
 * Factory class for creating hardware component geometries
 */
export declare class HardwareShapeCreator {
  /** Shape creation function registry */
  private readonly shapeMap: Map<HardwareShape, HardwareShapeFunction>;

  /**
   * Get singleton instance
   */
  static readonly Ins: HardwareShapeCreator;

  /**
   * Get shape creation function by type
   * @param shapeType - Type of hardware shape
   * @returns Shape creation function or undefined
   */
  get(shapeType: HardwareShape): HardwareShapeFunction | undefined;

  /**
   * Get list of available window handle types
   */
  readonly windowHandles: HardwareShape[];

  /**
   * Get list of available door handle types
   */
  readonly doorHandles: HardwareShape[];

  /**
   * Create standard hinge shape
   * @param position - Hinge position
   * @param direction - Hinge orientation direction
   * @returns Array of polygon shapes
   */
  hinge(position: Point, direction: Vector): WinPolygon[];

  /**
   * Create professional hinge shape
   * @param position - Hinge position
   * @param direction - Hinge orientation direction
   * @returns Array of polygon shapes
   */
  hingePro(position: Point, direction: Vector): WinPolygon[];

  /**
   * Create endpoint hinge shape
   * @param position - Hinge position
   * @param direction - Hinge orientation direction
   * @returns Array of polygon shapes
   */
  endpointHinge(position: Point, direction: Vector): WinPolygon[];

  /**
   * Create hinge on circular surface
   * @param position - Hinge position
   * @param direction - Hinge orientation direction
   * @returns Array of polygon shapes
   */
  hingeOnCircle(position: Point, direction: Vector): WinPolygon[];

  /**
   * Create standard window handle
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @returns Array of polygon shapes
   */
  handle(position: Point, direction: Vector): WinPolygon[];

  /**
   * Create door handle variant 2
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter
   * @param variant - Optional variant parameter
   * @returns Array of polygon shapes
   */
  handle2(position: Point, direction: Vector, size?: number, variant?: unknown): WinPolygon[];

  /**
   * Create door handle variant 3
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @returns Array of polygon shapes
   */
  handle3(position: Point, direction: Vector): WinPolygon[];

  /**
   * Create door handle variant 4
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter
   * @returns Array of polygon shapes
   */
  handle4(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create door handle variant 5
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter
   * @returns Array of polygon shapes
   */
  handle5(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle variant 2
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle2(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle variant 3
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle3(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle variant 4
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle4(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle variant 5
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle5(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle variant 6
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle6(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle variant 7
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle7(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle variant 8
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle8(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle variant 9
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle9(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle variant 10
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle10(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle variant 11
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle11(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle variant 12
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle12(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create commercial handle variant 13
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @returns Array of polygon shapes
   */
  commercialHandle13(position: Point, direction: Vector): WinPolygon[];

  /**
   * Create commercial handle variant 14
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  commercialHandle14(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create handle for folding doors
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @returns Array of polygon shapes
   */
  handleForFold(position: Point, direction: Vector): WinPolygon[];

  /**
   * Create handle for sliding doors
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @returns Array of polygon shapes
   */
  handleForSlide(position: Point, direction: Vector): WinPolygon[];

  /**
   * Create handle for sliding doors variant 2
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @returns Array of polygon shapes
   */
  handleForSlide2(position: Point, direction: Vector): WinPolygon[];

  /**
   * Create KFC-style handle
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: 200)
   * @returns Array of polygon shapes
   */
  kfcHandle(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create cross-shaped handle
   * @param position - Handle position
   * @param direction - Handle orientation direction
   * @param size - Optional size parameter (default: -1)
   * @returns Array of polygon shapes
   */
  crossHandle(position: Point, direction: Vector, size?: number): WinPolygon[];

  /**
   * Create standard lock
   * @param position - Lock position
   * @param direction - Lock orientation direction
   * @returns Array of polygon shapes
   */
  lock(position: Point, direction: Vector): WinPolygon[];

  /**
   * Create lock variant 2
   * @param position - Lock position
   * @param direction - Lock orientation direction
   * @returns Array of polygon shapes
   */
  lock2(position: Point, direction: Vector): WinPolygon[];
}