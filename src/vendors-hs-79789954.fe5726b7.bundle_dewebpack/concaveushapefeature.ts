import { ShapeType, makeCurvesClosed } from './ShapeType';
import { Loop, Box2, Line2d, MathAlg, Curve2d } from './GeometryCore';
import { HSCore } from './HSCore';
import { Feature } from './Feature';

export class ConcaveUShapeFeature extends Feature {
  static readonly distanceThreshold: number = 0.48;
  static readonly pattern: string[] = ['LR', 'R', 'R', 'LR'];

  type: ShapeType;
  color: string;
  cutOperation: string;
  a: Curve2d;
  b: Curve2d;
  c: Curve2d;
  prevConnectCurve: Curve2d;
  nextConnectCurve: Curve2d;

  constructor(param1: unknown, curves: { curves: Curve2d[] }, param3: unknown) {
    super(param1, curves, param3);
    this.type = ShapeType.ConcaveU;
    this.color = '#75c300';
    this.cutOperation = 'union';
    this.a = curves.curves[0];
    this.b = curves.curves[1];
    this.c = curves.curves[2];
    this.prevConnectCurve = curves.curves[3];
    this.nextConnectCurve = curves.curves[4];

    if (!this.selfPolygon.outerLoop.isClosed()) {
      this._makeLoopClosed();
    }
  }

  private _makeLoopClosed(): void {
    const curvesABC: Curve2d[] = [this.a, this.b, this.c];
    const loop = new Loop(makeCurvesClosed(curvesABC));
    loop.reverse();

    const outerLoopCurves: Curve2d[][] = [loop.getAllCurves()];

    const boundingBox = new Box2([
      this.prevConnectCurve.getStartPt(),
      this.prevConnectCurve.getEndPt(),
      this.nextConnectCurve.getStartPt(),
      this.nextConnectCurve.getEndPt()
    ]);

    const rectangleCurves: Curve2d[][] = [
      Loop.createByRectangle(boundingBox.min, boundingBox.max).getAllCurves()
    ];

    const differenceResult = HSCore.Util.TgWall.PTInstance().different(
      outerLoopCurves,
      rectangleCurves
    );

    this.selfPolygon.outerLoop = new Loop(differenceResult[0]?.[0]);
  }

  static postCheck(param1: unknown, curves: Curve2d[]): boolean {
    const hasNoParallelLines = curves.every((curve1) =>
      curves.every((curve2) => {
        if (curve2 === curve1) {
          return true;
        }
        if (curve2 instanceof Line2d && curve1 instanceof Line2d && curve1.isParallelTo(curve2)) {
          const distance =
            MathAlg.CalculateDistance.curve2dToCurve2d(curve1, curve2) ?? Number.MAX_VALUE;
          return distance <= this.distanceThreshold;
        }
        return true;
      })
    );

    const isClockwise = !new Loop(makeCurvesClosed(curves)).isAnticlockwise();

    return hasNoParallelLines && isClockwise;
  }
}