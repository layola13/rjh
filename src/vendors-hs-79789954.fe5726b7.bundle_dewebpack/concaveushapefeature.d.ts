/**
 * Module: ConcaveUShapeFeature
 * Original ID: 114857
 * Exports: ConcaveUShapeFeature
 */

import { ShapeType, makeCurvesClosed } from './ShapeType';
import { Loop, Box2, Line2d, MathAlg, Curve2d } from './GeometryCore';
import { HSCore } from './HSCore';
import { Feature } from './Feature';

/**
 * Represents a concave U-shaped feature in the geometry system.
 * This feature is defined by three curves forming a U shape and two connection curves.
 */
export class ConcaveUShapeFeature extends Feature {
  /**
   * Distance threshold for parallel line detection (in units)
   * @default 0.48
   */
  static readonly distanceThreshold: number = 0.48;

  /**
   * Pattern definition for the U-shape feature.
   * LR = Left/Right, R = Right
   */
  static readonly pattern: readonly [string, string, string, string] = ["LR", "R", "R", "LR"];

  /**
   * Type of the shape
   */
  readonly type: ShapeType.ConcaveU;

  /**
   * Display color for the feature
   */
  readonly color: string;

  /**
   * Boolean operation type for cutting
   */
  readonly cutOperation: "union";

  /**
   * First curve of the U-shape
   */
  readonly a: Curve2d;

  /**
   * Second curve of the U-shape (bottom of U)
   */
  readonly b: Curve2d;

  /**
   * Third curve of the U-shape
   */
  readonly c: Curve2d;

  /**
   * Curve connecting to the previous feature
   */
  readonly prevConnectCurve: Curve2d;

  /**
   * Curve connecting to the next feature
   */
  readonly nextConnectCurve: Curve2d;

  /**
   * Creates a new ConcaveUShapeFeature instance
   * @param featureId - Unique identifier for the feature
   * @param geometry - Geometry data containing the curves
   * @param options - Additional configuration options
   */
  constructor(
    featureId: string,
    geometry: { curves: [Curve2d, Curve2d, Curve2d, Curve2d, Curve2d] },
    options: unknown
  ) {
    super(featureId, geometry, options);
    
    this.type = ShapeType.ConcaveU;
    this.color = "#75c300";
    this.cutOperation = "union";
    
    this.a = geometry.curves[0];
    this.b = geometry.curves[1];
    this.c = geometry.curves[2];
    this.prevConnectCurve = geometry.curves[3];
    this.nextConnectCurve = geometry.curves[4];
    
    if (!this.selfPolygon.outerLoop.isClosed()) {
      this._makeLoopClosed();
    }
  }

  /**
   * Closes the polygon loop by computing the difference between the U-shape
   * and a bounding rectangle formed by the connection curves.
   * @private
   */
  private _makeLoopClosed(): void {
    const uShapeCurves = [this.a, this.b, this.c];
    const closedLoop = new Loop(makeCurvesClosed(uShapeCurves));
    closedLoop.reverse();
    
    const loopCurves = [closedLoop.getAllCurves()];
    
    // Create bounding box from connection curve endpoints
    const boundingBox = new Box2([
      this.prevConnectCurve.getStartPt(),
      this.prevConnectCurve.getEndPt(),
      this.nextConnectCurve.getStartPt(),
      this.nextConnectCurve.getEndPt()
    ]);
    
    const rectangleCurves = [
      Loop.createByRectangle(boundingBox.min, boundingBox.max).getAllCurves()
    ];
    
    // Compute boolean difference operation
    const resultCurves = HSCore.Util.TgWall.PTInstance().different(
      loopCurves,
      rectangleCurves
    );
    
    this.selfPolygon.outerLoop = new Loop(resultCurves[0]?.[0]);
  }

  /**
   * Validates whether the given curves form a valid concave U-shape feature.
   * Checks for parallel lines that are too close and clockwise orientation.
   * 
   * @param featureId - Unique identifier for the feature (unused in current implementation)
   * @param curves - Array of curves to validate
   * @returns true if the curves pass all validation checks, false otherwise
   */
  static postCheck(featureId: string, curves: Curve2d[]): boolean {
    // Check no parallel lines are closer than threshold
    const hasNoCloseParallelLines = curves.every((curveA) =>
      curves.every((curveB) => {
        if (curveB === curveA) {
          return true;
        }
        
        if (!(curveB instanceof Line2d && curveA instanceof Line2d)) {
          return true;
        }
        
        if (!curveA.isParallelTo(curveB)) {
          return true;
        }
        
        const distance = 
          MathAlg.CalculateDistance.curve2dToCurve2d(curveA, curveB) ?? Number.MAX_VALUE;
        
        return distance <= this.distanceThreshold;
      })
    );
    
    // Check the loop is not anticlockwise (must be clockwise)
    const isClockwise = !new Loop(makeCurvesClosed(curves)).isAnticlockwise();
    
    return hasNoCloseParallelLines && isClockwise;
  }
}