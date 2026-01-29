import { Loop, Line2d, MathAlg } from './path/to/geometry-module';
import { HSCore } from './path/to/hscore-module';

export enum ShapeType {
  ConcaveU = "ConcaveU",
  ConvexU = "ConvexU",
  ConvexHallway = "ConvexHallway",
  ConvexRightHalfU = "ConvexRightHalfU",
  ConvexLeftHalfU = "ConvexLeftHalfU",
  ConvexL = "ConvexL",
  Unsupported = "Unsupported",
  ConvexURegion = "ConvexURegion",
  ConvexRightHalfURegion = "ConvexRightHalfURegion",
  ConvexLeftHalfURegion = "ConvexLeftHalfURegion",
  ConvexSquareRegion = "ConvexSquareRegion",
  ExpandRegion = "ExpandRegion",
  PassageWayShape = "PassageWayShape",
  FunctionRegion = "FunctionRegion"
}

export const CURVE_CURVE_OVERLAP_RESULTS = [
  MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP,
  MathAlg.CurveCuvePositonType.OVERLAP
];

const ANGLE_THRESHOLD = 0.25;
const MIN_LENGTH_THRESHOLD = 0.001;

interface Curve {
  clone(): Curve;
  getStartPt(): Point;
  getEndPt(): Point;
  getDirection(): Vector;
  containsPoint(point: Point): boolean;
  containsProjectedPt(point: Point): boolean;
  getLength(): number;
  isLine2d(): boolean;
  reversed(): Curve;
}

interface Point {
  x: number;
  y: number;
}

interface Vector {
  angleTo(other: Vector): number;
}

type CutOperation = "different" | "union" | "intersect" | "raw-different";

interface CutOptions {
  selfPolygon: Polygon;
  cutOperation: CutOperation;
}

/**
 * Makes curves closed by inserting connecting lines where gaps exist
 */
export function makeCurvesClosed(curves: Curve[]): Curve[] {
  const clonedCurves = curves.map(curve => curve.clone());
  let loop = new Loop(clonedCurves);

  while (!loop.isClosed()) {
    const gapIndex = clonedCurves.findIndex((curve, index) => {
      const nextCurve = clonedCurves[(index + 1) % clonedCurves.length];
      return !curve.containsPoint(nextCurve.getStartPt());
    });

    if (gapIndex === -1) {
      return clonedCurves;
    }

    const connectingLine = new Line2d(
      clonedCurves[gapIndex].getEndPt(),
      clonedCurves[(gapIndex + 1) % clonedCurves.length].getStartPt()
    );
    clonedCurves.splice(gapIndex + 1, 0, connectingLine);
    loop = new Loop(clonedCurves);
  }

  return clonedCurves;
}

/**
 * Splits a curve based on overlap with another curve
 */
function splitCurveByOverlap(baseCurve: Curve, overlapCurve: Curve): Curve[] {
  const startPoint = baseCurve.getStartPt();
  const endPoint = baseCurve.getEndPt();
  
  const shouldReverse = baseCurve.getDirection().angleTo(overlapCurve.getDirection()) < ANGLE_THRESHOLD;
  const adjustedOverlap = shouldReverse ? overlapCurve.clone() : overlapCurve.clone().reversed();
  
  const overlapStart = adjustedOverlap.getStartPt();
  const overlapEnd = adjustedOverlap.getEndPt();

  let resultCurves: Curve[];

  if (baseCurve.containsProjectedPt(overlapStart) && baseCurve.containsProjectedPt(overlapEnd)) {
    resultCurves = [
      new Line2d(startPoint, overlapStart),
      new Line2d(overlapStart, overlapEnd),
      new Line2d(overlapEnd, endPoint)
    ];
  } else if (baseCurve.containsProjectedPt(overlapStart)) {
    resultCurves = [
      new Line2d(startPoint, overlapStart),
      new Line2d(overlapStart, endPoint)
    ];
  } else if (baseCurve.containsProjectedPt(overlapEnd)) {
    resultCurves = [
      new Line2d(startPoint, overlapEnd),
      new Line2d(overlapEnd, endPoint)
    ];
  } else {
    resultCurves = [baseCurve];
  }

  return resultCurves.filter(curve => curve.getLength() > MIN_LENGTH_THRESHOLD);
}

/**
 * Represents a polygon defined by its outer boundary curves
 */
export class Polygon {
  private curves: Curve[];
  private outerLoop: Loop;

  constructor(curves: Curve[]) {
    this.curves = curves.map(curve => curve.clone());
    this.outerLoop = new Loop(this.curves);
  }

  /**
   * Performs boolean operations on this polygon with another
   */
  cut(options: CutOptions): Polygon {
    const selfCurves = [this.outerLoop.getAllCurves().map(curve => curve.clone())];
    const otherCurves = [options.selfPolygon.outerLoop.getAllCurves()];

    let resultCurves: Curve[][];

    switch (options.cutOperation) {
      case "union":
        resultCurves = HSCore.Util.TgWall.PTInstance().union(selfCurves, otherCurves);
        break;
      case "intersect":
        resultCurves = HSCore.Util.TgWall.PTInstance().intersect(selfCurves, otherCurves);
        break;
      case "different":
      default:
        resultCurves = HSCore.Util.TgWall.PTInstance().different(selfCurves, otherCurves);
        break;
    }

    const finalCurves = resultCurves[0]?.[0] ?? selfCurves[0];

    if (options.cutOperation === "raw-different") {
      const processedCurves: Curve[] = [];
      const referenceCurves = options.selfPolygon.outerLoop.getAllCurves();

      for (let i = 0; i < finalCurves.length; i++) {
        const currentCurve = finalCurves[i];
        const overlappingCurve = referenceCurves.find(refCurve =>
          CURVE_CURVE_OVERLAP_RESULTS.includes(
            MathAlg.PositionJudge.curveCurveOverlap(refCurve, currentCurve)
          )
        );

        if (overlappingCurve?.isLine2d() && currentCurve.isLine2d()) {
          const splitCurves = splitCurveByOverlap(currentCurve, overlappingCurve);
          processedCurves.push(...splitCurves);
        } else {
          processedCurves.push(currentCurve);
        }
      }

      return new Polygon(processedCurves);
    }

    return new Polygon(finalCurves);
  }

  clone(): Polygon {
    return new Polygon(this.curves);
  }

  get area(): number {
    return this.outerLoop.calcArea();
  }
}