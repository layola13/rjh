/**
 * Snap functionality for geometry alignment and positioning
 * Provides strategies for snapping different geometric shapes together
 */

/**
 * Types of snap results indicating how geometries relate
 */
export enum SnapResultType {
  /** Geometries are collinear (on the same line) */
  Colline = 1,
  /** Geometries overlap at a point */
  Overlap = 2,
  /** Collinear with rotation adjustment needed */
  CollineRotation = 3,
  /** Geometries are tangent to each other */
  Tangent = 4
}

/**
 * Mode for breaking snap calculations
 */
export enum SnapBreakMode {
  /** First priority break mode */
  first = 1,
  /** Second priority break mode */
  second = 2
}

/**
 * Represents a snap result between two geometries
 * Contains translation and rotation deltas needed to align geometries
 */
export declare class SnapResult {
  private readonly _master: any;
  private readonly _client: any;
  private readonly _dx: number;
  private readonly _dy: number;
  private readonly _drotation?: number;
  private readonly _center?: any;
  private readonly _loop?: any;
  private readonly _type: SnapResultType;

  /**
   * Creates a new snap result
   * @param config - Configuration object containing snap parameters
   */
  constructor(config: {
    _master: any;
    _client: any;
    _dx: number;
    _dy: number;
    _drotation?: number;
    _center?: any;
    _loop?: any;
    _type: SnapResultType;
  });

  /** The master geometry being snapped to */
  get master(): any;

  /** The client geometry being snapped */
  get client(): any;

  /** Translation delta in X direction */
  get dx(): number;

  /** Translation delta in Y direction */
  get dy(): number;

  /** Rotation delta in degrees */
  get drotation(): number | undefined;

  /** Center point for rotation */
  get center(): any;

  /** Loop geometry for collision detection */
  get loop(): any;

  /** Type of snap result */
  get type(): SnapResultType;

  /** Unique identifier combining master and client IDs */
  get id(): string;

  /**
   * Converts snap result to JSON representation
   * @returns Object containing dx, dy, drotation, and center
   */
  getJSON(): {
    dx: number;
    dy: number;
    drotation: number | undefined;
    center: any;
  };
}

/**
 * Strategy pattern implementation for snapping geometries
 * Handles various geometry type combinations (Circle, Line, Arc, Point)
 */
export declare class SnapStrategy {
  private static _instance?: SnapStrategy;
  
  /** Pixel-based snap intensity threshold */
  static pixelIntensity?: number;

  /**
   * Gets the singleton instance of SnapStrategy
   * Initializes with default pixel intensity of 7 if not exists
   * @returns The singleton SnapStrategy instance
   */
  static getInstance(): SnapStrategy;

  /**
   * Model-space snap intensity calculated from pixel intensity
   */
  get intensity(): number;

  /**
   * Break intensity is twice the normal intensity
   */
  get breakIntensity(): number;

  /**
   * Executes snap calculations between two sets of geometries
   * @param masterGeometries - Array of master geometries to snap to
   * @param clientGeometries - Array of client geometries to be snapped
   * @returns Array of snap results, filtered to exclude self-snapping
   */
  execute(
    masterGeometries: any[],
    clientGeometries: any[]
  ): SnapResult[];

  /**
   * Executes break calculation for snap with specified mode
   * @param master - Master geometry
   * @param client - Client geometry
   * @param mode - Break mode (first or second priority)
   * @returns Snap result or undefined if no valid snap found
   */
  exeBreakCalc(
    master: any,
    client: any,
    mode: SnapBreakMode
  ): SnapResult | undefined;

  /**
   * Snaps circle to circle
   * @param circle1 - First circle geometry
   * @param circle2 - Second circle geometry
   * @param intensity - Snap intensity threshold
   * @returns Snap result or undefined
   */
  doSnapC2C(
    circle1: any,
    circle2: any,
    intensity?: number
  ): SnapResult | undefined;

  /**
   * Snaps circle to arc
   * @param circle - Circle geometry
   * @param arc - Arc geometry
   * @param intensity - Snap intensity threshold
   * @returns Snap result or undefined
   */
  doSnapC2A(
    circle: any,
    arc: any,
    intensity?: number
  ): SnapResult | undefined;

  /**
   * Snaps circle to line
   * @param circle - Circle geometry
   * @param line - Line geometry
   * @param intensity - Snap intensity threshold
   * @returns Snap result or undefined
   */
  doSnapC2L(
    circle: any,
    line: any,
    intensity?: number
  ): SnapResult | undefined;

  /**
   * Snaps line to circle
   * @param line - Line geometry
   * @param circle - Circle geometry
   * @param intensity - Snap intensity threshold
   * @returns Snap result or undefined
   */
  doSnapL2C(
    line: any,
    circle: any,
    intensity?: number
  ): SnapResult | undefined;

  /**
   * Snaps line to arc
   * @param line - Line geometry
   * @param arc - Arc geometry
   * @param intensity - Snap intensity threshold
   * @returns Snap result or undefined
   */
  doSnapL2A(
    line: any,
    arc: any,
    intensity?: number
  ): SnapResult | undefined;

  /**
   * Snaps line to line (checks for parallel and collinear relationships)
   * @param line1 - First line geometry
   * @param line2 - Second line geometry
   * @param intensity - Snap intensity threshold
   * @returns Snap result or undefined
   */
  doSnapL2L(
    line1: any,
    line2: any,
    intensity?: number
  ): SnapResult | undefined;

  /**
   * Snaps point to line (includes rotation calculation for line alignment)
   * @param point - Point geometry
   * @param line - Line geometry
   * @param intensity - Snap intensity threshold
   * @returns Snap result or undefined
   */
  doSnapP2L(
    point: any,
    line: any,
    intensity?: number
  ): SnapResult | undefined;

  /**
   * Snaps point to point (checks for overlap)
   * @param point1 - First point geometry
   * @param point2 - Second point geometry
   * @param intensity - Snap intensity threshold
   * @returns Snap result or undefined
   */
  doSnapP2P(
    point1: any,
    point2: any,
    intensity?: number
  ): SnapResult | undefined;

  /**
   * Calculates rotation angle needed to align a line to a target curve
   * @param center - Center point for rotation
   * @param line - Line geometry to rotate
   * @param targetCurve - Target curve to align to
   * @returns Rotation angle in radians
   */
  calcRotate(center: any, line: any, targetCurve: any): number;
}