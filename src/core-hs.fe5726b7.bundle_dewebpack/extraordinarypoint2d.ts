import { ExtraordinarySketchBase } from './ExtraordinarySketchBase';
import { ExPointType } from './ExPointType';

interface Point2D {
  x: number;
  y: number;
}

export class ExtraordinaryPoint2d extends ExtraordinarySketchBase {
  private _x: number;
  private _y: number;
  private _type: ExPointType;

  constructor(options: unknown) {
    super(options);
    this._x = 0;
    this._y = 0;
    this._type = ExPointType.common;
  }

  static create(point: Point2D, type?: ExPointType, options?: unknown): ExtraordinaryPoint2d {
    const instance = new ExtraordinaryPoint2d(options);
    instance._x = point.x;
    instance._y = point.y;
    if (type) {
      instance.setType(type);
    }
    return instance;
  }

  get x(): number {
    return this._x;
  }

  setX(value: number): void {
    this._x = value;
  }

  setY(value: number): void {
    this._y = value;
  }

  get y(): number {
    return this._y;
  }

  get type(): ExPointType {
    return this._type;
  }

  setType(type: ExPointType): void {
    this._type = type;
  }

  static getCode(point: Point2D): string {
    const PRECISION_MULTIPLIER = 100000;
    const xCode = Math.ceil(PRECISION_MULTIPLIER * point.x);
    const yCode = Math.ceil(PRECISION_MULTIPLIER * point.y);
    return `${xCode}-${yCode}`;
  }
}