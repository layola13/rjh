import { Curve2d, Curve2dType } from './748175';
import { Point2D } from './785404';
import { Arc2d as MathArc2d } from './815362';

interface IPoint2D {
  x: number;
  y: number;
}

interface IBox2d {
  min: IPoint2D;
  max: IPoint2D;
}

export class Arc2d extends Curve2d {
  public r: number;
  public center: Point2D;
  public beta: number;

  constructor(
    start: Point2D,
    end: Point2D,
    radius: number,
    beta: number,
    center: IPoint2D,
    id: number = -1
  ) {
    super(start, end, id);
    this.r = radius;
    this.center = new Point2D(center.x, center.y);
    this.beta = beta;
  }

  get type(): Curve2dType {
    return Curve2dType.arc;
  }

  static toMathCurve(arc: Arc2d): MathArc2d {
    const startAngle = Math.atan2(
      arc.start.y - arc.center.y,
      arc.start.x - arc.center.x
    );
    return MathArc2d.makeArcByStartEndAngles(
      arc.center,
      arc.r,
      startAngle,
      startAngle + arc.beta,
      arc.beta > 0
    );
  }

  toMathCurve(): MathArc2d {
    const startAngle = Math.atan2(
      this.start.y - this.center.y,
      this.start.x - this.center.x
    );
    return MathArc2d.makeArcByStartEndAngles(
      this.center,
      this.r,
      startAngle,
      startAngle + this.beta,
      this.beta > 0
    );
  }

  rev(): this {
    const tempEnd = this.end;
    this.end = this.start;
    this.start = tempEnd;
    this.beta = -this.beta;
    return this;
  }

  toRev(): Arc2d {
    return new Arc2d(
      this.end.clone(),
      this.start.clone(),
      this.r,
      -this.beta,
      this.center.clone(),
      this.id
    );
  }

  toBuffer(
    buffer: ArrayBuffer,
    floatArray: Float64Array,
    offset: number,
    param4: unknown,
    param5: unknown
  ): void {
    let bufferIndex = this._toBuffer(this.type, buffer, floatArray, offset, param4, param5);
    floatArray[bufferIndex++] = this.r;
    floatArray[bufferIndex++] = this.center.x;
    floatArray[bufferIndex++] = this.center.y;
    floatArray[bufferIndex++] = this.beta;
  }

  inside(point: IPoint2D): boolean {
    const startVectorX = this.start.x - this.center.x;
    const startVectorY = this.start.y - this.center.y;
    const pointVectorX = point.x - this.center.x;
    const pointVectorY = point.y - this.center.y;
    
    const crossProduct = startVectorX * pointVectorY - pointVectorX * startVectorY;
    const dotProduct = startVectorX * pointVectorX + startVectorY * pointVectorY;
    const angle = Math.atan2(crossProduct, dotProduct);

    const TWO_PI = 2 * Math.PI;

    if (angle < 0) {
      return this.beta < 0 
        ? angle > this.beta 
        : angle < this.beta - TWO_PI;
    } else {
      return this.beta > 0 
        ? angle < this.beta 
        : angle > this.beta + TWO_PI;
    }
  }

  updateBox2d(box: IBox2d): void {
    const candidatePoints: IPoint2D[] = [
      this.start,
      this.end,
      { x: this.center.x - this.r, y: this.center.y },
      { x: this.center.x + this.r, y: this.center.y },
      { x: this.center.x, y: this.center.y + this.r },
      { x: this.center.x, y: this.center.y - this.r }
    ];

    for (let i = 0; i < candidatePoints.length; ++i) {
      if (i > 1 && !this.inside(candidatePoints[i])) {
        continue;
      }

      box.min.x = Math.min(candidatePoints[i].x, box.min.x);
      box.min.y = Math.min(candidatePoints[i].y, box.min.y);
      box.max.x = Math.max(candidatePoints[i].x, box.max.x);
      box.max.y = Math.max(candidatePoints[i].y, box.max.y);
    }
  }
}