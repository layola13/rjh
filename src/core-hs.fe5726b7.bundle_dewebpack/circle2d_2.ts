import { GeometryObjectType } from './GeometryObjectType';
import { Curve2d } from './Curve2d';
import { Point2d, IPoint2d, isIPoint2d } from './Point2d';
import { Arc2d } from './Arc2d';
import { isNumber } from './utils';
import { isSamePoint, nearlyEquals, isPointOnCurve } from './geometryUtils';

interface ICircle2d {
  center: IPoint2d;
  radius: number;
}

interface Circle2dDumpData {
  c: ReturnType<Point2d['dump']>;
  gt: GeometryObjectType.Circle2d;
  r: number;
}

interface DiscretePointsOptions {
  // Add specific options based on your needs
}

export class Circle2d extends Curve2d {
  public center: Point2d;
  public radius: number;

  constructor(center: IPoint2d, radius: number) {
    super();
    this.center = new Point2d();
    this.radius = 1;
    this.center.assign(center);
    this.radius = radius;
  }

  getType(): GeometryObjectType {
    return GeometryObjectType.Circle2d;
  }

  assign(other: ICircle2d): void {
    this.center.assign(other.center);
    this.radius = other.radius;
  }

  static create(params: ICircle2d): Circle2d {
    const { center, radius } = params;
    return new Circle2d(center, radius);
  }

  dump(): Circle2dDumpData {
    return {
      c: this.center.dump(),
      gt: GeometryObjectType.Circle2d,
      r: this.radius
    };
  }

  clone(): Circle2d {
    return Circle2d.create(this);
  }

  isClosed(): boolean {
    return true;
  }

  getDiscretePoints(options: DiscretePointsOptions = {}): IPoint2d[] {
    const threeCurve = this._toThreeCurve();
    return HSCore.Util.Geometry.getArcPoints(threeCurve, options).map((point) => ({
      x: point.x,
      y: point.y
    }));
  }

  private _toThreeCurve(): THREE.ArcCurve {
    return new THREE.ArcCurve(
      this.center.x,
      this.center.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
  }

  getPoint(t: number): IPoint2d {
    return this._toThreeCurve().getPoint(t);
  }

  isSameCurve(other: Curve2d, tolerance: number = HSConstants.Constants.TOLERANCE): boolean {
    return (
      this === other ||
      (this.getType() === other.getType() &&
        isSamePoint(this.center, (other as Circle2d).center, tolerance) &&
        nearlyEquals(this.radius, (other as Circle2d).radius, tolerance))
    );
  }

  createSubCurve(start: number, end: number): Arc2d {
    const { center, radius } = this;
    return Arc2d.create({
      center,
      radius,
      start,
      end,
      clockwise: false
    });
  }

  isPointOnCurve(point: IPoint2d, tolerance: number = HSConstants.Constants.TOLERANCE): boolean {
    const vector = GeLib.VectorUtils.toTHREEVector3(point);
    return isPointOnCurve(vector, this._toThreeCurve(), tolerance);
  }

  hLineIntersections(y: number): THREE.Vector3[] {
    const intersections: THREE.Vector3[] = [];
    const line = GeLib.LineUtils.toTHREELine3(
      { x: 0, y },
      { x: 1, y }
    );
    const curve = this._toThreeCurve();
    const intersectionInfo = GeLib.CurveUtils.getIntersectionInfo(curve, line);
    const count = intersectionInfo ? intersectionInfo.intersects.length : 0;

    for (let i = 0; i < count; i++) {
      const intersection = intersectionInfo.intersects[i];
      if (intersection) {
        intersections.push(intersection);
      }
    }

    return intersections;
  }
}

export function isICircle2d(obj: unknown): obj is ICircle2d {
  return !!obj && isIPoint2d((obj as ICircle2d).center) && isNumber((obj as ICircle2d).radius);
}

export function isCircle2dDumpData(data: unknown): data is Circle2dDumpData {
  return (
    !!data &&
    ((data as Circle2dDumpData).gt === GeometryObjectType.Circle2d ||
      (data as any).geoType === GeometryObjectType.Circle2d)
  );
}