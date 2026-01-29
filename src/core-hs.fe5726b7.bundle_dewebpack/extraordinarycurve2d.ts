import { Line2d } from './Line2d';

export class ExtraordinaryCurve2d {
  constructor() {}

  toMathCurve(): Line2d {
    return new Line2d(
      { x: 0, y: 0 },
      { x: 1, y: 0 }
    );
  }
}