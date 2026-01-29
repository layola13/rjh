import { Vector2, Line2d, Arc2d, ArcType } from './math';
import { ExtraordinaryCurve2d } from './ExtraordinaryCurve2d';
import { ExtraordinaryPoint2d } from './ExtraordinaryPoint2d';

/**
 * Represents a circular arc in 2D space defined by start point, end point, center, and direction.
 */
export class ExtraordinaryCircleArc2d extends ExtraordinaryCurve2d {
    private _from: ExtraordinaryPoint2d;
    private _to: ExtraordinaryPoint2d;
    private _center: ExtraordinaryPoint2d;
    private _isCCW: boolean;

    constructor(
        from?: ExtraordinaryPoint2d,
        to?: ExtraordinaryPoint2d,
        center?: ExtraordinaryPoint2d,
        isCCW?: boolean
    ) {
        super();
        this._from = from || new ExtraordinaryPoint2d();
        this._to = to || new ExtraordinaryPoint2d();
        this._center = center || new ExtraordinaryPoint2d();
        this._isCCW = isCCW || false;
    }

    static create(
        from: ExtraordinaryPoint2d,
        to: ExtraordinaryPoint2d,
        center: ExtraordinaryPoint2d,
        isCCW: boolean
    ): ExtraordinaryCircleArc2d {
        return new ExtraordinaryCircleArc2d(from, to, center, isCCW);
    }

    get from(): ExtraordinaryPoint2d {
        return this._from;
    }

    setFrom(from: ExtraordinaryPoint2d): void {
        this._from = from;
    }

    get to(): ExtraordinaryPoint2d {
        return this._to;
    }

    setTo(to: ExtraordinaryPoint2d): void {
        this._to = to;
    }

    get isCCW(): boolean {
        return this._isCCW;
    }

    setCCW(isCCW: boolean): void {
        this._isCCW = isCCW;
    }

    get radius(): number {
        return new Vector2(this._center).distanceTo(this._from);
    }

    get center(): ExtraordinaryPoint2d {
        return this._center;
    }

    setCenter(center: ExtraordinaryPoint2d): void {
        this._center = center;
    }

    /**
     * Gets the sagitta (height) of the arc.
     */
    get sagitta(): number {
        const arcType = this.toMathCurve().getArcType();
        const chordHalfLength = 0.5 * new Line2d(this.from, this.to).getLength();
        const radiusSquared = this.radius * this.radius;
        const chordSquared = chordHalfLength * chordHalfLength;
        const sign = arcType === ArcType.SmallArc ? -1 : 1;
        
        return this.radius + sign * Math.sqrt(Math.abs(radiusSquared - chordSquared));
    }

    split(point: ExtraordinaryPoint2d): {
        curve1: ExtraordinaryCircleArc2d;
        curve2: ExtraordinaryCircleArc2d;
    } {
        return {
            curve1: ExtraordinaryCircleArc2d.create(this._from, point, this._center, this._isCCW),
            curve2: ExtraordinaryCircleArc2d.create(point, this._to, this._center, this._isCCW)
        };
    }

    toMathCurve(): Arc2d {
        return Arc2d.makeArcByStartEndPoints(this.center, this.from, this.to, this.isCCW);
    }
}