import { Curve2d, Curve2dType } from './748175';
import { Line2d as MathLine2d } from './815362';

export class Line2d extends Curve2d {
  constructor(start: any, end: any, id: number = -1) {
    super(start, end, id);
  }

  get type(): Curve2dType {
    return Curve2dType.line;
  }

  toRev(): Line2d {
    return new Line2d(this.end.clone(), this.start.clone(), this.id);
  }

  static toMathCurve(line: Line2d): MathLine2d {
    return new MathLine2d(line.start, line.end);
  }

  toMathCurve(): MathLine2d {
    return new MathLine2d(this.start, this.end);
  }

  rev(): this {
    const temp = this.end;
    this.end = this.start;
    this.start = temp;
    return this;
  }

  toBuffer(
    buffer1: any,
    buffer2: any,
    buffer3: any,
    buffer4: any,
    buffer5: any
  ): void {
    this._toBuffer(this.type, buffer1, buffer2, buffer3, buffer4, buffer5);
  }

  updateBox2d(box: { min: { x: number; y: number }; max: { x: number; y: number } }): void {
    if (box.min.x > this.start.x) box.min.x = this.start.x;
    if (box.min.x > this.end.x) box.min.x = this.end.x;
    if (box.max.x < this.start.x) box.max.x = this.start.x;
    if (box.max.x < this.end.x) box.max.x = this.end.x;
    if (box.min.y > this.start.y) box.min.y = this.start.y;
    if (box.min.y > this.end.y) box.min.y = this.end.y;
    if (box.max.y < this.start.y) box.max.y = this.start.y;
    if (box.max.y < this.end.y) box.max.y = this.end.y;
  }
}