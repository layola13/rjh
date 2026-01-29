import { Curve2d, Curve2dType } from './748175';
import { Point2D } from './785404';
import { Coordinate2, Arc2d } from './815362';

export class Ellipse extends Curve2d {
  public a: number;
  public b: number;
  public center: Point2D;
  public rotate: number;
  public beta: number;

  constructor(
    start: Point2D,
    end: Point2D,
    a: number,
    b: number,
    rotate: number,
    center: Point2D,
    beta: number,
    id: number = -1
  ) {
    super(start, end, id);
    this.a = a;
    this.b = b;
    this.center = new Point2D(center.x, center.y);
    this.rotate = rotate;
    this.beta = beta;
  }

  get type(): Curve2dType {
    return Curve2dType.ellipse;
  }

  public rev(): this {
    const tempEnd = this.end;
    this.end = this.start;
    this.start = tempEnd;
    this.beta = -this.beta;
    return this;
  }

  public toRev(): Ellipse {
    return new Ellipse(
      this.end.clone(),
      this.start.clone(),
      this.a,
      this.b,
      this.rotate,
      this.center.clone(),
      -this.beta,
      this.id
    );
  }

  public static toMathCurve(ellipse: Ellipse): Arc2d {
    const coordinate = new Coordinate2(ellipse.center, {
      x: Math.cos(ellipse.beta),
      y: Math.sin(ellipse.beta)
    });
    const startAngle = Math.atan2(
      ellipse.start.y - ellipse.center.y,
      ellipse.end.x - ellipse.center.x
    );
    return new Arc2d(
      coordinate,
      ellipse.a,
      ellipse.b,
      ellipse.beta >= 0,
      [startAngle, startAngle + ellipse.beta]
    );
  }

  public toMathCurve(): Arc2d {
    const coordinate = new Coordinate2(this.center, {
      x: Math.cos(this.beta),
      y: Math.sin(this.beta)
    });
    const startAngle = Math.atan2(
      this.start.y - this.center.y,
      this.end.x - this.center.x
    );
    return new Arc2d(
      coordinate,
      this.a,
      this.b,
      this.beta >= 0,
      [startAngle, startAngle + this.beta]
    );
  }

  public toBuffer(
    buffer: ArrayBuffer,
    dataView: Float64Array,
    offset: number,
    byteOffset: number,
    length: number
  ): void {
    let index = this._toBuffer(this.type, buffer, dataView, offset, byteOffset, length);
    dataView[index++] = this.a;
    dataView[index++] = this.b;
    dataView[index++] = this.rotate;
    dataView[index++] = this.center.x;
    dataView[index++] = this.center.y;
    dataView[index++] = this.beta;
  }

  public updateBox2d(box: unknown): void {
    // Implementation needed
  }
}