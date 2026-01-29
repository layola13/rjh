import { ShapeType, makeCurvesClosed } from './shape-utils';
import { Loop, Box2, MathAlg } from './geometry';
import { HSCore } from './hs-core';
import { Feature } from './feature';

interface Curve2D {
  isLine2d(): boolean;
  isParallelTo(other: Curve2D): boolean;
  getDirection(): Direction;
  getStartPt(): Point2D;
  getEndPt(): Point2D;
}

interface Direction {
  reversed(): Direction;
  equals(other: Direction): boolean;
}

interface Point2D {
  x: number;
  y: number;
}

interface Polygon {
  outerLoop: Loop;
  curves: Curve2D[];
}

interface MatchCandidate {
  interLines: Curve2D[];
  area: number;
  loop: Loop;
}

type CutOperation = 'different' | 'raw-different';

export class ConvexHallwayShapeFeature extends Feature {
  static readonly distanceThreshold: number = 100;
  static readonly pattern: string[] = ['R', 'L', 'L', 'R'];

  type: ShapeType;
  color: string;
  cutOperation: CutOperation;
  prevConnectCurve: Curve2D;
  nextConnectCurve: Curve2D;
  selfPolygon: Polygon;

  constructor(arg1: unknown, arg2: Polygon, arg3: unknown) {
    super(arg1, arg2, arg3);
    this.type = ShapeType.ConvexHallway;
    this.color = '#d194ec';
    this.cutOperation = 'different';
    this.prevConnectCurve = arg2.curves.at(-2)!;
    this.nextConnectCurve = arg2.curves.at(-1)!;

    if (!this.selfPolygon.outerLoop.isClosed()) {
      this._makeLoopClosed();
    }
  }

  private _makeLoopClosed(): void {
    const trimmedCurves = this.selfPolygon.curves.slice(
      0,
      this.selfPolygon.curves.length - 2
    );
    const closedLoop = new Loop(makeCurvesClosed(trimmedCurves));
    const targetPolygons = [closedLoop.getAllCurves()];

    const boundingBox = new Box2([
      this.prevConnectCurve.getStartPt(),
      this.prevConnectCurve.getEndPt(),
      this.nextConnectCurve.getStartPt(),
      this.nextConnectCurve.getEndPt()
    ]);

    const clipRectangle = Loop.createByRectangle(boundingBox.min, boundingBox.max);
    const clipPolygons = [clipRectangle.getAllCurves()];

    const resultPolygons = HSCore.Util.TgWall.PTInstance().different(
      targetPolygons,
      clipPolygons
    );

    this.selfPolygon.outerLoop = new Loop(resultPolygons[0]?.[0]);
  }

  static matcher(polygon: Polygon, context: unknown): Curve2D[] {
    const curves = polygon.curves;

    if (curves.some(curve => !curve.isLine2d())) {
      return [];
    }

    const lineCurves = curves;
    const candidates: MatchCandidate[] = [];

    for (let startIndex = 0; startIndex < lineCurves.length; startIndex++) {
      const startCurve = lineCurves[startIndex];
      let currentLines: Curve2D[] = [startCurve];
      let minArea = Number.MAX_VALUE;

      for (let offset = 0; offset < lineCurves.length / 2; offset++) {
        const endCurve = lineCurves[(startIndex + offset + 1) % lineCurves.length];
        currentLines.push(endCurve);

        const isParallel = startCurve.isParallelTo(endCurve);
        const isOppositeDirection = startCurve
          .getDirection()
          .reversed()
          .equals(endCurve.getDirection());

        if (isParallel && isOppositeDirection) {
          const closedLoop = new Loop(makeCurvesClosed(currentLines));

          const hasNoInternalParallelPairs = currentLines.every(line1 =>
            currentLines.every(
              line2 =>
                !(
                  line2 !== line1 &&
                  line1.isParallelTo(line2) &&
                  this.isDistanceValid(line1, line2)
                )
            )
          );

          if (hasNoInternalParallelPairs && closedLoop.isAnticlockwise()) {
            minArea = closedLoop.calcArea();
            currentLines.push(lineCurves.at(startIndex - 1)!);
            currentLines.push(lineCurves.at((startIndex + offset + 2) % lineCurves.length)!);

            if (currentLines.length <= 5) {
              candidates.push({
                interLines: currentLines,
                area: minArea,
                loop: closedLoop
              });
            }
            break;
          }
        }
      }
    }

    this.sortCandidates(candidates);
    const bestCandidateLines = candidates[0]?.interLines ?? [];

    return this.postCheck(polygon, bestCandidateLines.slice(0, 3), context)
      ? bestCandidateLines
      : [];
  }

  static isDistanceValid(curve1: Curve2D, curve2: Curve2D): boolean {
    const distance =
      MathAlg.CalculateDistance.curve2dToCurve2d(curve1, curve2) ?? Number.MAX_VALUE;
    return distance > this.distanceThreshold;
  }

  static sortCandidates(candidates: MatchCandidate[]): void {
    candidates.sort((a, b) => a.area - b.area);
  }

  static postCheck(polygon: Polygon, lines: Curve2D[], context: unknown): boolean {
    return true;
  }
}

export class ConvexFunctionRegionFeature extends ConvexHallwayShapeFeature {
  constructor(arg1: unknown, arg2: Polygon, arg3: unknown) {
    super(arg1, arg2, arg3);
    this.type = ShapeType.FunctionRegion;
    this.color = '#32ff10';
    this.cutOperation = 'raw-different';
  }

  static override sortCandidates(candidates: MatchCandidate[]): void {
    candidates.sort((a, b) => b.area - a.area);
  }

  static override postCheck(polygon: Polygon, lines: Curve2D[], context: unknown): boolean {
    return true;
  }
}