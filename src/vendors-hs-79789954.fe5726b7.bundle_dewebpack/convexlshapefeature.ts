import { ShapeType, makeCurvesClosed } from './ShapeType';
import { Loop, Box2 } from './Geometry';
import { HSCore } from './HSCore';
import { Feature } from './Feature';

interface Curve {
  getStartPt(): Point;
  getEndPt(): Point;
}

interface Point {
  x: number;
  y: number;
}

interface ConvexLShapeData {
  curves: Curve[];
}

export class ConvexLShapeFeature extends Feature {
  public static readonly pattern: string[] = ['R', 'L', 'L', 'L', 'R', 'LR'];

  public readonly type: ShapeType;
  public readonly color: string;
  public readonly cutOperation: string;

  private readonly a: Curve;
  private readonly b: Curve;
  private readonly c: Curve;
  private readonly d: Curve;
  private readonly e: Curve;
  private readonly prevConnectCurve: Curve;
  private readonly nextConnectCurve: Curve;

  constructor(
    firstParam: unknown,
    data: ConvexLShapeData,
    thirdParam: unknown
  ) {
    super(firstParam, data, thirdParam);

    this.type = ShapeType.ConvexL;
    this.color = '#c104b1';
    this.cutOperation = 'different';

    this.a = data.curves[0];
    this.b = data.curves[1];
    this.c = data.curves[2];
    this.d = data.curves[3];
    this.e = data.curves[4];
    this.prevConnectCurve = data.curves[5];
    this.nextConnectCurve = data.curves[6];

    if (!this.selfPolygon.outerLoop.isClosed()) {
      this._makeLoopClosed();
    }
  }

  private _makeLoopClosed(): void {
    const curves: Curve[] = [this.a, this.b, this.c, this.d, this.e];

    const closedCurves = makeCurvesClosed(curves);
    const sourceLoops: Curve[][] = [new Loop(closedCurves).getAllCurves()];

    const boundingPoints: Point[] = [
      this.prevConnectCurve.getStartPt(),
      this.prevConnectCurve.getEndPt(),
      this.nextConnectCurve.getStartPt(),
      this.nextConnectCurve.getEndPt()
    ];
    const boundingBox = new Box2(boundingPoints);

    const clipLoops: Curve[][] = [
      Loop.createByRectangle(boundingBox.min, boundingBox.max).getAllCurves()
    ];

    const resultLoops = HSCore.Util.TgWall.PTInstance().different(
      sourceLoops,
      clipLoops
    );

    const firstResultLoop = resultLoops[0]?.[0];
    if (firstResultLoop) {
      this.selfPolygon.outerLoop = new Loop(firstResultLoop);
    }
  }
}