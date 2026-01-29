import { LineSegment2d, isLineSegment2dDumpData, isILineSegment2d } from './LineSegment2d';
import { GeometryObjectType } from './GeometryObjectType';
import { Arc2d, isArc2dDumpData, isIArc2d } from './Arc2d';
import { Circle2d, isCircle2dDumpData, isICircle2d } from './Circle2d';
import { isSamePoint } from './GeometryUtils';
import { isSameArray } from './ArrayUtils';

interface Point2d {
  x: number;
  y: number;
}

interface DiscretePointsOptions {
  tolerance?: number;
  maxSegments?: number;
}

interface Curve2dDumpData {
  geoType?: GeometryObjectType;
  [key: string]: unknown;
}

interface LineSegment2dDumpData extends Curve2dDumpData {
  ln?: [[number, number], [number, number]];
  start?: Point2d;
  end?: Point2d;
}

interface Arc2dDumpData extends Curve2dDumpData {
  r?: number;
  radius?: number;
  cw?: boolean;
  clockwise?: boolean;
  c?: [number, number];
  center?: Point2d;
  ln?: [[number, number], [number, number]];
  start?: Point2d;
  end?: Point2d;
}

interface Circle2dDumpData extends Curve2dDumpData {
  r?: number;
  radius?: number;
  c?: [number, number];
  center?: Point2d;
}

interface PolyCurve2dDumpData {
  curves: Curve2dDumpData[];
  geoType: GeometryObjectType;
}

type Curve2d = LineSegment2d | Arc2d | Circle2d;

interface ICurve2d {
  clone(): Curve2d;
  dump(): Curve2dDumpData;
  getDiscretePoints(options?: DiscretePointsOptions): Point2d[];
  getPoint(t: number): Point2d;
  isClosed(): boolean;
  isSameCurve(other: Curve2d, tolerance?: number): boolean;
}

export class PolyCurve2d {
  public curves: Curve2d[] = [];

  constructor() {
    this.curves = [];
  }

  assign(source: PolyCurve2d): void {
    const curveCount = source.curves.length;
    this.curves.length = curveCount;
    
    for (let i = 0; i < curveCount; i++) {
      this.curves[i] = source.curves[i].clone();
    }
  }

  getType(): GeometryObjectType {
    return GeometryObjectType.PolyCurve2d;
  }

  load(data: PolyCurve2dDumpData): void {
    this.curves.length = 0;
    
    if (data.curves) {
      for (const curveData of data.curves) {
        const curve = createCurve2D(curveData);
        if (curve) {
          this.curves.push(curve);
        } else {
          console.assert(false, 'failed to create Curve', 'HSCore.Math');
        }
      }
    }
  }

  dump(): PolyCurve2dDumpData {
    return {
      curves: this.curves.map(curve => curve.dump()),
      geoType: GeometryObjectType.PolyCurve2d
    };
  }

  clone(): PolyCurve2d {
    const cloned = new PolyCurve2d();
    cloned.load(this.dump());
    return cloned;
  }

  setFromPoints(points: Point2d[], closePath: boolean = true): void {
    let processedPoints = points;
    
    if (closePath) {
      processedPoints = points.concat([points[0]]);
    }
    
    this.curves.length = 0;
    
    for (let i = 0; i < processedPoints.length - 1; i++) {
      const startPoint = processedPoints[i];
      const endPoint = processedPoints[i + 1];
      const lineSegment = LineSegment2d.createFormPoints(startPoint, endPoint);
      this.curves.push(lineSegment);
    }
  }

  setCurves(curves: Curve2d[]): void {
    this.curves.length = 0;
    curves.forEach(curve => this.curves.push(curve));
  }

  isClosed(): boolean {
    if (this.curves.length < 1) {
      return false;
    }
    
    if (this.curves.length === 1 && this.curves[0].isClosed()) {
      return true;
    }
    
    const firstCurve = this.curves[0];
    const lastCurve = this.curves[this.curves.length - 1];
    const startPoint = firstCurve.getPoint(0);
    const endPoint = lastCurve.getPoint(1);
    
    return isSamePoint(startPoint, endPoint);
  }

  getDiscretePoints(options: DiscretePointsOptions = {}): Point2d[] {
    const allPoints: Point2d[] = [];
    
    for (let curveIndex = 0; curveIndex < this.curves.length; curveIndex++) {
      let curvePoints = this.curves[curveIndex].getDiscretePoints(options);
      
      if (allPoints.length > 0 && curvePoints.length > 0 && 
          isSamePoint(allPoints[allPoints.length - 1], curvePoints[0])) {
        curvePoints = curvePoints.slice(1);
      }
      
      if (curveIndex === this.curves.length - 1 && curvePoints.length > 0 && 
          isSamePoint(allPoints[0], curvePoints[curvePoints.length - 1])) {
        curvePoints.pop();
      }
      
      allPoints.push(...curvePoints);
    }
    
    return allPoints;
  }

  isSamePolyCurve(other: PolyCurve2d, tolerance: number = HSConstants.Constants.TOLERANCE): boolean {
    if (this === other) {
      return true;
    }
    
    return isSameArray(
      this.curves, 
      other.curves, 
      false, 
      (curve1, curve2) => curve1.isSameCurve(curve2, tolerance)
    );
  }
}

export function isCurve2dDumpData(data: unknown): data is Curve2dDumpData {
  return !!(isLineSegment2dDumpData(data) || 
            isCircle2dDumpData(data) || 
            isArc2dDumpData(data));
}

export function isPolyCurve2dDumpData(data: unknown): data is PolyCurve2dDumpData {
  if (!data) {
    return false;
  }
  
  const polyCurveData = data as Partial<PolyCurve2dDumpData>;
  
  if (polyCurveData.curves === undefined) {
    return false;
  }
  
  if (!Array.isArray(polyCurveData.curves)) {
    return false;
  }
  
  for (const curveData of polyCurveData.curves) {
    if (!isCurve2dDumpData(curveData)) {
      return false;
    }
  }
  
  return true;
}

export function createCurve2D(data: Curve2dDumpData): Curve2d | null {
  if (isArc2dDumpData(data)) {
    let arcParams: Partial<Arc2dDumpData>;
    
    if (data.geoType == null) {
      const legacyData = data as Arc2dDumpData;
      arcParams = {
        radius: legacyData.r,
        clockwise: legacyData.cw,
        center: {
          x: legacyData.c![0],
          y: legacyData.c![1]
        },
        start: {
          x: legacyData.ln![0][0],
          y: legacyData.ln![0][1]
        },
        end: {
          x: legacyData.ln![1][0],
          y: legacyData.ln![1][1]
        }
      };
    } else {
      arcParams = data;
    }
    
    const arc = new Arc2d();
    arc.assign(arcParams);
    return arc;
  }
  
  if (isCircle2dDumpData(data)) {
    let center: Point2d;
    let radius: number;
    
    if (data.geoType != null) {
      center = data.center!;
      radius = data.radius!;
    } else {
      const legacyData = data as Circle2dDumpData;
      center = {
        x: legacyData.c![0],
        y: legacyData.c![1]
      };
      radius = legacyData.r!;
    }
    
    return new Circle2d(center, radius);
  }
  
  if (isLineSegment2dDumpData(data)) {
    let start: Point2d;
    let end: Point2d;
    
    if (data.geoType != null) {
      start = data.start!;
      end = data.end!;
    } else {
      const legacyData = data as LineSegment2dDumpData;
      start = {
        x: legacyData.ln![0][0],
        y: legacyData.ln![0][1]
      };
      end = {
        x: legacyData.ln![1][0],
        y: legacyData.ln![1][1]
      };
    }
    
    return new LineSegment2d(start, end);
  }
  
  if (isIArc2d(data)) {
    return Arc2d.create(data);
  }
  
  if (isICircle2d(data)) {
    return Circle2d.create(data);
  }
  
  if (isILineSegment2d(data)) {
    return LineSegment2d.create(data);
  }
  
  return null;
}