import { GeometryObjectType } from './GeometryObjectType';
import { Curve2d } from './Curve2d';
import { Point2d, IPoint2d, isIPoint2d } from './Point2d';
import { isNumber, isBoolean } from './typeGuards';
import { nearlyEquals, isSamePoint, isPointOnCurve as isPointOnCurveUtil, numberInRange } from './mathUtils';

const DEFAULT_TOLERANCE = 0.0001; // HSConstants.Constants.TOLERANCE

export interface IArc2d {
  start: IPoint2d;
  end: IPoint2d;
  center: IPoint2d;
  radius: number;
  clockwise: boolean;
}

export interface Arc2dDumpData {
  ln: [IPoint2d, IPoint2d];
  c: IPoint2d;
  r: number;
  cw: boolean;
  gt: GeometryObjectType;
  geoType?: GeometryObjectType;
}

export interface DiscretePointsOptions {
  segments?: number;
  tolerance?: number;
}

export class Arc2d extends Curve2d {
  public start: Point2d;
  public end: Point2d;
  public center: Point2d;
  public radius: number;
  public clockwise: boolean;

  constructor() {
    super();
    this.start = new Point2d();
    this.end = new Point2d();
    this.center = new Point2d();
    this.radius = 1;
    this.clockwise = false;
  }

  public getType(): GeometryObjectType {
    return GeometryObjectType.Arc2d;
  }

  public assign(arc: IArc2d): void {
    const { start, end, center, radius, clockwise } = arc;
    this.start.assign(start);
    this.end.assign(end);
    this.center.assign(center);
    this.radius = radius;
    this.clockwise = clockwise;
  }

  public static create(arc: IArc2d): Arc2d {
    const instance = new Arc2d();
    instance.assign(arc);
    return instance;
  }

  public dump(): Arc2dDumpData {
    return {
      ln: [this.start.dump(), this.end.dump()],
      c: this.center.dump(),
      r: this.radius,
      cw: this.clockwise,
      gt: GeometryObjectType.Arc2d
    };
  }

  public clone(): Arc2d {
    return Arc2d.create(this);
  }

  public getDiscretePoints(options: DiscretePointsOptions = {}): IPoint2d[] {
    const threeCurve = this._toThreeCurve();
    return HSCore.Util.Geometry.getArcPoints(threeCurve, options).map((point: any) => ({
      x: point.x,
      y: point.y
    }));
  }

  private _toThreeCurve(): any {
    const centerVector = GeLib.VectorUtils.toTHREEVector3(this.center);
    const startVector = GeLib.VectorUtils.toTHREEVector3(this.start);
    const endVector = GeLib.VectorUtils.toTHREEVector3(this.end);
    return GeLib.ArcUtils.createArcFromPoints(
      startVector,
      endVector,
      centerVector,
      this.radius,
      this.clockwise
    );
  }

  public getPoint(t: number): IPoint2d {
    if (nearlyEquals(t, 0)) {
      return this.start;
    }
    if (nearlyEquals(t, 1)) {
      return this.end;
    }
    return this._toThreeCurve().getPoint(t);
  }

  public isSameCurve(other: Arc2d, tolerance: number = DEFAULT_TOLERANCE): boolean {
    if (this === other) {
      return true;
    }
    
    if (this.getType() !== other.getType()) {
      return false;
    }
    
    if (!isSamePoint(this.center, other.center, tolerance)) {
      return false;
    }
    
    if (!nearlyEquals(this.radius, other.radius, tolerance)) {
      return false;
    }
    
    const { start, end } = this;
    
    if (this.clockwise === other.clockwise) {
      if (!isSamePoint(start, other.start, tolerance) || !isSamePoint(end, other.end, tolerance)) {
        return false;
      }
    } else {
      if (!isSamePoint(start, other.end, tolerance) || !isSamePoint(end, other.start, tolerance)) {
        return false;
      }
    }
    
    return true;
  }

  public createSubCurve(start: IPoint2d, end: IPoint2d): Arc2d {
    const { center, radius, clockwise } = this;
    return Arc2d.create({
      center,
      radius,
      start,
      end,
      clockwise
    });
  }

  public isPointOnCurve(point: IPoint2d, tolerance: number = DEFAULT_TOLERANCE): boolean {
    const vector = GeLib.VectorUtils.toTHREEVector3(point);
    return isPointOnCurveUtil(vector, this._toThreeCurve(), tolerance);
  }

  public hLineIntersections(y: number): IPoint2d[] {
    const intersections: IPoint2d[] = [];
    const line = GeLib.LineUtils.toTHREELine3(
      { x: 0, y },
      { x: 1, y }
    );
    
    const curve = this._toThreeCurve();
    const intersectionInfo = GeLib.CurveUtils.getIntersectionInfo(curve, line);
    const intersectionCount = intersectionInfo ? intersectionInfo.intersects.length : 0;
    
    for (let i = 0; i < intersectionCount; i++) {
      const intersection = intersectionInfo.intersects[i];
      const parameter = intersectionInfo.thisParams[i];
      
      if (numberInRange(parameter, 0, 1, true) && intersection) {
        intersections.push(intersection);
      }
    }
    
    return intersections;
  }
}

export function isIArc2d(value: unknown): value is IArc2d {
  if (!value) {
    return false;
  }
  
  const arc = value as IArc2d;
  return (
    isIPoint2d(arc.center) &&
    isIPoint2d(arc.start) &&
    isIPoint2d(arc.end) &&
    isNumber(arc.radius) &&
    isBoolean(arc.clockwise)
  );
}

export function isArc2dDumpData(value: unknown): value is Arc2dDumpData {
  if (!value) {
    return false;
  }
  
  const data = value as Arc2dDumpData;
  return (
    data.gt === GeometryObjectType.Arc2d ||
    data.geoType === GeometryObjectType.Arc2d
  );
}