import { Line2d } from './Line2d';
import { ExtraordinaryCurve2d } from './ExtraordinaryCurve2d';
import { ExtraordinaryPoint2d } from './ExtraordinaryPoint2d';

/**
 * Represents a 2D line segment defined by two points.
 */
export class ExtraordinaryLine2d extends ExtraordinaryCurve2d {
    private _from: ExtraordinaryPoint2d;
    private _to: ExtraordinaryPoint2d;

    constructor(from?: ExtraordinaryPoint2d, to?: ExtraordinaryPoint2d) {
        super();
        this._from = from || new ExtraordinaryPoint2d();
        this._to = to || new ExtraordinaryPoint2d();
    }

    /**
     * Factory method to create a new ExtraordinaryLine2d instance.
     */
    static create(from: ExtraordinaryPoint2d, to: ExtraordinaryPoint2d): ExtraordinaryLine2d {
        return new ExtraordinaryLine2d(from, to);
    }

    get from(): ExtraordinaryPoint2d {
        return this._from;
    }

    get to(): ExtraordinaryPoint2d {
        return this._to;
    }

    setFrom(from: ExtraordinaryPoint2d): void {
        this._from = from;
    }

    setTo(to: ExtraordinaryPoint2d): void {
        this._to = to;
    }

    /**
     * Splits the line at a given point.
     */
    split(point: ExtraordinaryPoint2d): { curve1: ExtraordinaryLine2d; curve2: ExtraordinaryLine2d } {
        return {
            curve1: ExtraordinaryLine2d.create(this._from, point),
            curve2: ExtraordinaryLine2d.create(point, this._to)
        };
    }

    /**
     * Converts to mathematical Line2d representation.
     */
    toMathCurve(): Line2d {
        return new Line2d(this.from, this.to);
    }
}