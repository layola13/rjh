/**
 * Module: ConvexUShapeFeature
 * Provides feature classes for detecting and handling convex U-shaped spaces in floor plans,
 * including variants like balconies, hallways, and half-U shapes.
 */

import { ShapeType } from './ShapeTypeModule'; // Module 888439
import { Loop, Box2, MathAlg } from './GeometryModule'; // Module 815362
import { HSCore } from './HSCoreModule'; // Module 635589
import { Feature } from './FeatureModule'; // Module 841436
import { ConvexHallwayShapeFeature } from './HallwayModule'; // Module 49694

/**
 * Represents a curve geometry (line, arc, etc.)
 */
interface Curve {
  getStartPt(): Point;
  getEndPt(): Point;
  getLength(): number;
}

/**
 * 2D Point representation
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Polygon structure containing outer loop
 */
interface Polygon {
  outerLoop: Loop;
}

/**
 * Pattern data containing curves for shape matching
 */
interface PatternData {
  curves: Curve[];
}

/**
 * Opening information (door/window) with floor overlap data
 */
interface OpeningHostInfo {
  openingType: 'door' | 'window';
  openingFloorOverlapCurve?: Curve;
}

/**
 * Context data for feature detection
 */
interface FeatureContext {
  openings: {
    hostInfos: OpeningHostInfo[];
  };
}

/**
 * Makes curves into a closed loop
 * @param curves - Array of curves to close
 * @returns Closed curve array
 */
declare function makeCurvesClosed(curves: Curve[]): Curve[];

/**
 * Base class for convex U-shaped features
 * Represents a U-shaped protrusion in a floor plan with three main sides
 */
export declare class ConvexUShapeFeature extends Feature {
  /**
   * Pattern defining the turn sequence: Right, Left, Left, Right
   */
  static readonly pattern: ['R', 'L', 'L', 'R'];

  /**
   * Shape type identifier
   */
  type: ShapeType;

  /**
   * Display color for this feature
   */
  color: string;

  /**
   * Boolean operation mode for cutting this shape from the floor plan
   */
  cutOperation: 'different' | 'raw-different';

  /**
   * First side curve of the U-shape
   */
  a: Curve;

  /**
   * Bottom/middle curve of the U-shape
   */
  b: Curve;

  /**
   * Third side curve of the U-shape
   */
  c: Curve;

  /**
   * Curve connecting to the previous feature
   */
  prevConnectCurve: Curve;

  /**
   * Curve connecting to the next feature
   */
  nextConnectCurve: Curve;

  /**
   * Polygon representation of this feature
   */
  selfPolygon: Polygon;

  /**
   * Creates a convex U-shaped feature
   * @param id - Unique identifier for the feature
   * @param patternData - Pattern data containing the curves
   * @param context - Feature detection context
   */
  constructor(id: string, patternData: PatternData, context: FeatureContext);

  /**
   * Ensures the outer loop is properly closed by performing boolean operations
   * @private
   */
  private _makeLoopClosed(): void;
}

/**
 * Right-biased half U-shape feature
 * Pattern: Right, Left, Left, Left (asymmetric U-shape)
 */
export declare class ConvexRightHalfUShapeFeature extends ConvexUShapeFeature {
  /**
   * Shape type for right half U
   */
  static readonly type: ShapeType;

  /**
   * Pattern defining the turn sequence
   */
  static readonly pattern: ['R', 'L', 'L', 'L'];

  /**
   * Display color (blue tone)
   */
  color: '#005bc3';
}

/**
 * Left-biased half U-shape feature
 * Pattern: Left, Left, Left, Right (asymmetric U-shape)
 */
export declare class ConvexLeftHalfUShapeFeature extends ConvexUShapeFeature {
  /**
   * Shape type for left half U
   */
  static readonly type: ShapeType;

  /**
   * Pattern defining the turn sequence
   */
  static readonly pattern: ['L', 'L', 'L', 'R'];

  /**
   * Display color (lighter blue)
   */
  color: '#4b9dff';
}

/**
 * Balcony feature - U-shaped protrusion with window openings
 * Detects balconies by checking for window coverage along the curves
 */
export declare class ConvexBalconyFeature extends ConvexUShapeFeature {
  /**
   * Display color (yellow tone)
   */
  color: '#ffdb4b';

  /**
   * Post-processing check to validate if this U-shape is a balcony
   * Checks if windows cover >50% of the perimeter or if there are ≥3 windows
   * @param id - Feature identifier
   * @param curves - Curves forming the U-shape
   * @param context - Feature context with opening data
   * @returns True if this should be classified as a balcony
   */
  static postCheck(
    id: string,
    curves: Curve[],
    context: FeatureContext
  ): boolean;
}

/**
 * Door hall feature - U-shaped space with door openings
 * Detects hallways/entryways by checking for door coverage
 */
export declare class ConvexDoorHallFeature extends ConvexHallwayShapeFeature {
  /**
   * Display color (dark brown)
   */
  color: '#352f18';

  /**
   * Boolean operation mode (raw difference)
   */
  cutOperation: 'raw-different';

  /**
   * Creates a door hall feature
   * @param id - Unique identifier
   * @param patternData - Pattern data containing curves
   * @param context - Feature detection context
   */
  constructor(id: string, patternData: PatternData, context: FeatureContext);

  /**
   * Post-processing check to validate if this U-shape is a door hallway
   * Checks if doors cover >50% of the perimeter or if there are ≥2 doors
   * @param id - Feature identifier
   * @param curves - Curves forming the U-shape
   * @param context - Feature context with opening data
   * @returns True if this should be classified as a door hallway
   */
  static postCheck(
    id: string,
    curves: Curve[],
    context: FeatureContext
  ): boolean;
}