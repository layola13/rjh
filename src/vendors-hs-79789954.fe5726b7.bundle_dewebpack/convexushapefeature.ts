import { ShapeType, makeCurvesClosed } from './ShapeType';
import { Loop, Box2, MathAlg } from './GeometryCore';
import { HSCore } from './HSCore';
import { Feature } from './Feature';
import { ConvexHallwayShapeFeature } from './ConvexHallwayShapeFeature';

interface Curve {
  getStartPt(): Point;
  getEndPt(): Point;
  getLength(): number;
}

interface Point {
  x: number;
  y: number;
}

interface CurveCollection {
  curves: Curve[];
}

interface OpeningHostInfo {
  openingType: string;
  openingFloorOverlapCurve?: Curve;
}

interface Openings {
  hostInfos: OpeningHostInfo[];
}

interface RoomData {
  openings: Openings;
}

type CutOperation = 'different' | 'raw-different';

export class ConvexUShapeFeature extends Feature {
  static readonly pattern: string[] = ['R', 'L', 'L', 'R'];

  type: ShapeType;
  color: string;
  cutOperation: CutOperation;
  a: Curve;
  b: Curve;
  c: Curve;
  prevConnectCurve: Curve;
  nextConnectCurve: Curve;

  constructor(param1: unknown, curveCollection: CurveCollection, param3: unknown) {
    super(param1, curveCollection, param3);
    this.type = ShapeType.ConvexU;
    this.color = '#c33300';
    this.cutOperation = 'different';
    this.a = curveCollection.curves[0];
    this.b = curveCollection.curves[1];
    this.c = curveCollection.curves[2];
    this.prevConnectCurve = curveCollection.curves[3];
    this.nextConnectCurve = curveCollection.curves[4];

    if (!this.selfPolygon.outerLoop.isClosed()) {
      this._makeLoopClosed();
    }
  }

  private _makeLoopClosed(): void {
    const edges: Curve[] = [this.a, this.b, this.c];
    const closedCurves = makeCurvesClosed(edges);
    const targetLoops: Curve[][] = [new Loop(closedCurves).getAllCurves()];

    const boundingBox = new Box2([
      this.prevConnectCurve.getStartPt(),
      this.prevConnectCurve.getEndPt(),
      this.nextConnectCurve.getStartPt(),
      this.nextConnectCurve.getEndPt()
    ]);

    const subtractLoops: Curve[][] = [
      Loop.createByRectangle(boundingBox.min, boundingBox.max).getAllCurves()
    ];

    const differenceResult = HSCore.Util.TgWall.PTInstance().different(targetLoops, subtractLoops);
    this.selfPolygon.outerLoop = new Loop(differenceResult[0]?.[0]);
  }
}

export class ConvexRightHalfUShapeFeature extends ConvexUShapeFeature {
  static readonly type: ShapeType = ShapeType.ConvexRightHalfU;
  static readonly pattern: string[] = ['R', 'L', 'L', 'L'];

  color = '#005bc3';
}

export class ConvexLeftHalfUShapeFeature extends ConvexUShapeFeature {
  static readonly type: ShapeType = ShapeType.ConvexLeftHalfU;
  static readonly pattern: string[] = ['L', 'L', 'L', 'R'];

  color = '#4b9dff';
}

export class ConvexBalconyFeature extends ConvexUShapeFeature {
  color = '#ffdb4b';

  static postCheck(param1: unknown, curves: Curve[], roomData: RoomData): boolean {
    const overlapTypes = [
      MathAlg.CurveCuvePositonType.OVERLAP,
      MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
    ];

    const windowOpenings = roomData.openings.hostInfos.filter(
      (hostInfo) =>
        hostInfo.openingType === 'window' &&
        hostInfo.openingFloorOverlapCurve !== undefined &&
        curves.some((curve) =>
          overlapTypes.includes(
            MathAlg.PositionJudge.curveCurveOverlap(curve, hostInfo.openingFloorOverlapCurve!)
          )
        )
    );

    const totalWindowLength = windowOpenings
      .map((opening) => opening.openingFloorOverlapCurve!)
      .reduce((sum, curve) => sum + curve.getLength(), 0);

    const totalCurveLength = curves.reduce((sum, curve) => sum + curve.getLength(), 0);

    return (
      super.postCheck(param1, curves, roomData) &&
      (totalWindowLength / totalCurveLength > 0.5 || windowOpenings.length >= 3)
    );
  }
}

export class ConvexDoorHallFeature extends ConvexHallwayShapeFeature {
  color = '#352f18';
  cutOperation: CutOperation = 'raw-different';

  constructor(param1: unknown, curveCollection: CurveCollection, param3: unknown) {
    super(param1, curveCollection, param3);
    this.color = '#352f18';
    this.cutOperation = 'raw-different';
  }

  static postCheck(param1: unknown, curves: Curve[], roomData: RoomData): boolean {
    const overlapTypes = [
      MathAlg.CurveCuvePositonType.OVERLAP,
      MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
    ];

    const doorOpenings = roomData.openings.hostInfos.filter(
      (hostInfo) =>
        hostInfo.openingType === 'door' &&
        hostInfo.openingFloorOverlapCurve !== undefined &&
        curves.some((curve) =>
          overlapTypes.includes(
            MathAlg.PositionJudge.curveCurveOverlap(curve, hostInfo.openingFloorOverlapCurve!)
          )
        )
    );

    const totalDoorLength = doorOpenings
      .map((opening) => opening.openingFloorOverlapCurve!)
      .reduce((sum, curve) => sum + curve.getLength(), 0);

    const totalCurveLength = curves.reduce((sum, curve) => sum + curve.getLength(), 0);

    return (
      super.postCheck(param1, curves, roomData) &&
      (totalDoorLength / totalCurveLength > 0.5 || doorOpenings.length >= 2)
    );
  }
}