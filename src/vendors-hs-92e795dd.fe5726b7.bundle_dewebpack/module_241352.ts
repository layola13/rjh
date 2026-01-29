import { Curve2d, Curve2dType } from './748175';
import { Point2D } from './785404';
import { NurbsCurve2d } from './815362';

/**
 * Quadratic Bezier curve in 2D space (degree 3)
 */
export class Bezier2d3 extends Curve2d {
  /** Control point */
  public p: Point2D;

  constructor(
    start: Point2D,
    end: Point2D,
    controlPoint: Point2D,
    id: number = -1
  ) {
    super(start, end, id);
    this.p = new Point2D(controlPoint.x, controlPoint.y);
  }

  get type(): Curve2dType {
    return Curve2dType.bezier2d3;
  }

  /**
   * Reverse the curve direction in place
   */
  rev(): this {
    const tempEnd = this.end;
    this.end = this.start;
    this.start = tempEnd;
    return this;
  }

  /**
   * Create a new reversed curve
   */
  toRev(): Bezier2d3 {
    return new Bezier2d3(
      this.end.clone(),
      this.start.clone(),
      this.p.clone(),
      this.id
    );
  }

  /**
   * Convert to mathematical curve representation (static)
   */
  static toMathCurve(curve: Bezier2d3): NurbsCurve2d {
    return NurbsCurve2d.makeBezier([curve.p]);
  }

  /**
   * Convert to mathematical curve representation
   */
  toMathCurve(): NurbsCurve2d {
    return NurbsCurve2d.makeBezier([this.p]);
  }

  /**
   * Serialize curve data to buffer
   */
  toBuffer(
    arg1: unknown,
    buffer: number[],
    arg3: unknown,
    arg4: unknown,
    arg5: unknown
  ): void {
    const offset = this._toBuffer(this.type, arg1, buffer, arg3, arg4, arg5);
    buffer[offset] = this.p.x;
    buffer[offset + 1] = this.p.y;
  }

  /**
   * Update bounding box to include this curve
   */
  updateBox2d(box: { min: Point2D; max: Point2D }): void {
    box.min.x = Math.min(box.min.x, this.start.x, this.end.x, this.p.x);
    box.min.y = Math.min(box.min.y, this.start.y, this.end.y, this.p.y);
    box.max.x = Math.max(box.max.x, this.start.x, this.end.x, this.p.x);
    box.max.y = Math.max(box.max.y, this.start.y, this.end.y, this.p.y);
  }
}