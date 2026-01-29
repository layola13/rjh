import { Loop, MathAlg } from './math-algorithms';
import { ShapeType } from './shape-type';

interface Curve2D {
  getMidTangent(): Vector;
  getRange(): Range;
  getParamAt(point: Point): number;
  getStartPt(): Point;
  getEndPt(): Point;
  clone(): Curve2D;
  setRange(min: number, max: number): Curve2D;
}

interface Vector {
  angleTo(other: Vector): number;
}

interface Point {
  x: number;
  y: number;
}

interface Range {
  clamp(value: number): number;
}

interface Polygon {
  curves: Curve2D[];
  outerLoop: Loop;
  getAllCurves(): Curve2D[];
}

interface FloorContext {
  // Define properties based on actual usage
}

interface OverlapResult {
  featureCurve: Curve2D;
  floorCurve: Curve2D;
  overlapCurve: Curve2D;
  feature: Feature;
}

type PatternChar = 'L' | 'R' | 'LR';
type CutOperation = 'different' | 'union' | 'intersect';

const HALF_PI = 0.5 * Math.PI;
const ONE_AND_HALF_PI = 1.5 * Math.PI;
const MAX_DISTANCE_THRESHOLD = 2;

export class Feature {
  static pattern: PatternChar[] = ['R', 'L', 'L', 'R'];

  type: ShapeType = ShapeType.Unsupported;
  cutOperation: CutOperation = 'different';
  fromPolygon: Polygon;
  selfPolygon: Polygon;
  floorContext: FloorContext;

  constructor(fromPolygon: Polygon, selfPolygon: Polygon, floorContext: FloorContext) {
    this.fromPolygon = fromPolygon;
    this.selfPolygon = selfPolygon;
    this.floorContext = floorContext;
  }

  get order(): number {
    return 0;
  }

  static matcher(polygon: Polygon, context: unknown): Curve2D[] {
    const curves = polygon.curves;
    if (curves.length <= this.pattern.length) {
      return [];
    }

    const angles: number[] = [];
    for (let i = 0; i < curves.length; i++) {
      const currentCurve = curves[i];
      const nextCurve = curves[(i + 1) % curves.length];
      angles[i] = currentCurve.getMidTangent().angleTo(nextCurve.getMidTangent());
    }

    const angleThreshold = HALF_PI;

    for (let startIndex = 0; startIndex < angles.length; startIndex++) {
      let matchedCount = 0;
      const patternLength = this.pattern.length;

      for (let patternIndex = 0; patternIndex < patternLength; patternIndex++) {
        const angle = angles[(startIndex + patternIndex) % angles.length];
        const patternChar = this.pattern[patternIndex];

        const isLeftTurn = patternChar === 'L' && angle < Math.PI && Math.abs(angle - HALF_PI) < angleThreshold;
        const isRightTurn = patternChar === 'R' && angle > Math.PI && Math.abs(angle - ONE_AND_HALF_PI) < angleThreshold;
        const isEitherTurn = patternChar === 'LR' && (Math.abs(angle - HALF_PI) <= angleThreshold || Math.abs(angle - ONE_AND_HALF_PI) <= angleThreshold);

        if (!(isLeftTurn || isRightTurn || isEitherTurn)) {
          break;
        }
        matchedCount++;
      }

      if (matchedCount !== this.pattern.length) {
        continue;
      }

      const matchedCurves: Curve2D[] = [];
      for (let i = 0; i < this.pattern.length - 1; i++) {
        matchedCurves.push(curves[(startIndex + 1 + i) % curves.length]);
      }

      if (this.postCheck(polygon, matchedCurves, context)) {
        matchedCurves.push(curves[startIndex % curves.length]);
        matchedCurves.push(curves[(startIndex + this.pattern.length) % curves.length]);
        return matchedCurves;
      }
    }

    return [];
  }

  static postCheck(polygon: Polygon, curves: Curve2D[], context: unknown): boolean {
    let isValid = true;
    const halfPatternLength = Math.floor(this.pattern.length / 2);

    for (let i = 0; i < halfPatternLength; i++) {
      const startCurve = curves.at(i);
      const endCurve = curves.at(-(i + 1));

      if (startCurve === endCurve) {
        continue;
      }

      const distance = MathAlg.CalculateDistance.curve2dToCurve2d(startCurve, endCurve) ?? Number.MAX_VALUE;
      if (distance > MAX_DISTANCE_THRESHOLD) {
        isValid = false;
      }
    }

    return isValid;
  }

  getOverlapCurveWith(floorCurves: Curve2D[]): OverlapResult | undefined {
    const floorLoop = new Loop(floorCurves);
    const selfLoop = this.selfPolygon.outerLoop;

    const positionType = MathAlg.PositionJudge.loopToLoop(selfLoop, floorLoop, undefined, true);

    if (positionType === MathAlg.LoopLoopPositonType.INTERSECT) {
      const overlapTypes = [
        MathAlg.CurveCuvePositonType.OVERLAP,
        MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
      ];

      const selfCurves = selfLoop.getAllCurves();

      for (const selfCurve of selfCurves) {
        for (const floorCurve of floorCurves) {
          const overlapType = MathAlg.PositionJudge.curveCurveOverlap(selfCurve, floorCurve);

          if (overlapTypes.includes(overlapType)) {
            return {
              featureCurve: selfCurve,
              floorCurve: floorCurve,
              overlapCurve: this._getCurvesOverlap(floorCurve, selfCurve),
              feature: this
            };
          }
        }
      }
    }

    return undefined;
  }

  private _getCurvesOverlap(baseCurve: Curve2D, targetCurve: Curve2D): Curve2D {
    const range = baseCurve.getRange();
    const startParam = range.clamp(baseCurve.getParamAt(targetCurve.getStartPt()));
    const endParam = range.clamp(baseCurve.getParamAt(targetCurve.getEndPt()));
    const minParam = Math.min(startParam, endParam);
    const maxParam = Math.max(startParam, endParam);

    return baseCurve.clone().setRange(minParam, maxParam);
  }
}