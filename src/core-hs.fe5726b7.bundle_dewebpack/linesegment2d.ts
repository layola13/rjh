import { Curve2d } from './Curve2d';
import { Point2d, isIPoint2d, IPoint2d } from './Point2d';
import { GeometryObjectType } from './GeometryObjectType';
import { nearlyEquals, isSamePoint, isPointOnLineSegment } from './MathUtils';

export interface ILineSegment2d {
    start: IPoint2d;
    end: IPoint2d;
}

export interface LineSegment2dDumpData {
    ln: [IPoint2d, IPoint2d];
    gt: GeometryObjectType;
    geoType?: GeometryObjectType;
}

export interface DiscretePointsOptions {}

export class LineSegment2d extends Curve2d {
    start: Point2d;
    end: Point2d;

    constructor(start: IPoint2d, end: IPoint2d) {
        super();
        this.start = new Point2d();
        this.end = new Point2d();
        this.set(start, end);
    }

    getType(): GeometryObjectType {
        return GeometryObjectType.LineSegment2d;
    }

    assign(other: LineSegment2d): void {
        this.start.assign(other.start);
        this.end.assign(other.end);
    }

    set(start: IPoint2d, end: IPoint2d): void {
        this.start.assign(start);
        this.end.assign(end);
    }

    static create(config: ILineSegment2d): LineSegment2d {
        const { start, end } = config;
        return new LineSegment2d(start, end);
    }

    static createFormPoints(start: IPoint2d, end: IPoint2d): LineSegment2d {
        return new LineSegment2d(start, end);
    }

    dump(): LineSegment2dDumpData {
        return {
            ln: [this.start.dump(), this.end.dump()],
            gt: GeometryObjectType.LineSegment2d
        };
    }

    clone(): LineSegment2d {
        return LineSegment2d.createFormPoints(this.start, this.end);
    }

    getDiscretePoints(options: DiscretePointsOptions = {}): IPoint2d[] {
        return [this.start, this.end].map((point) => ({
            x: point.x,
            y: point.y
        }));
    }

    getPoint(parameter: number): Point2d {
        if (nearlyEquals(parameter, 0)) {
            return this.start.clone();
        }
        if (nearlyEquals(parameter, 1)) {
            return this.end.clone();
        }
        const x = (this.end.x - this.start.x) * parameter + this.start.x;
        const y = (this.end.y - this.start.y) * parameter + this.start.y;
        return new Point2d(x, y);
    }

    isSameCurve(other: Curve2d, tolerance: number = HSConstants.Constants.TOLERANCE): boolean {
        return this === other || (
            this.getType() === other.getType() &&
            isSamePoint(this.start, (other as LineSegment2d).start, tolerance) &&
            isSamePoint(this.end, (other as LineSegment2d).end, tolerance)
        );
    }

    createSubCurve(start: IPoint2d, end: IPoint2d): LineSegment2d {
        return LineSegment2d.create({ start, end });
    }

    isPointOnCurve(point: IPoint2d, tolerance: number = HSConstants.Constants.TOLERANCE): boolean {
        const { start, end } = this;
        return isPointOnLineSegment(point, start, end, tolerance);
    }

    hLineIntersections(yCoordinate: number): IPoint2d[] {
        const { start, end } = this;
        if ((start.y > yCoordinate) !== (end.y > yCoordinate)) {
            return [{
                x: (end.x - start.x) * (yCoordinate - start.y) / (end.y - start.y) + start.x,
                y: yCoordinate
            }];
        }
        return [];
    }
}

export function isILineSegment2d(obj: unknown): obj is ILineSegment2d {
    return !!obj && isIPoint2d((obj as ILineSegment2d).start) && isIPoint2d((obj as ILineSegment2d).end);
}

export function isLineSegment2dDumpData(data: unknown): data is LineSegment2dDumpData {
    return !!data && (
        (data as LineSegment2dDumpData).gt === GeometryObjectType.LineSegment2d ||
        (data as LineSegment2dDumpData).geoType === GeometryObjectType.LineSegment2d
    );
}