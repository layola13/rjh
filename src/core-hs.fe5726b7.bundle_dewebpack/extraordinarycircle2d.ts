import { Arc2d } from './Arc2d';
import { ExtraordinaryCurve2d } from './ExtraordinaryCurve2d';
import { ExtraordinaryPoint2d } from './ExtraordinaryPoint2d';

export class ExtraordinaryCircle2d extends ExtraordinaryCurve2d {
    private _center: ExtraordinaryPoint2d;
    private _radius: number;
    private _isCCW: boolean;

    constructor(radius: number, isCCW: boolean, center?: ExtraordinaryPoint2d) {
        super();
        this._center = center || new ExtraordinaryPoint2d();
        this._radius = radius;
        this._isCCW = isCCW;
    }

    static create(center: ExtraordinaryPoint2d, radius: number, isCCW: boolean): ExtraordinaryCircle2d {
        return new ExtraordinaryCircle2d(radius, isCCW, center);
    }

    get isCCW(): boolean {
        return this._isCCW;
    }

    setCCW(isCCW: boolean): void {
        this._isCCW = isCCW;
    }

    get radius(): number {
        return this._radius;
    }

    setRadius(radius: number): void {
        this._radius = radius;
    }

    get center(): ExtraordinaryPoint2d {
        return this._center;
    }

    setCenter(center: ExtraordinaryPoint2d): void {
        this._center = center;
    }

    toMathCurve(): Arc2d {
        const FULL_CIRCLE_RADIANS = 2 * Math.PI;
        return Arc2d.makeArcByStartEndAngles(
            this.center,
            this.radius,
            0,
            FULL_CIRCLE_RADIANS,
            this.isCCW
        );
    }
}