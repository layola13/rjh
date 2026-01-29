import { ExtraordinarySketchBase } from './ExtraordinarySketchBase';

export class ExtraordinaryGuideline extends ExtraordinarySketchBase {
    private readonly _curve: unknown;
    private readonly _fromAnchor: unknown;
    private readonly _endAnchor: unknown;
    private _type: unknown;

    constructor(
        curve: unknown,
        fromAnchor: unknown,
        endAnchor: unknown,
        type: unknown,
        baseParam: unknown
    ) {
        super(baseParam);
        this._curve = curve;
        this._fromAnchor = fromAnchor;
        this._endAnchor = endAnchor;
        this._type = type;
    }

    static create(
        curve: unknown,
        fromAnchor: unknown,
        endAnchor: unknown,
        type: unknown,
        baseParam: unknown
    ): ExtraordinaryGuideline {
        return new ExtraordinaryGuideline(curve, fromAnchor, endAnchor, type, baseParam);
    }

    get fromAnchor(): unknown {
        return this._fromAnchor;
    }

    get endAnchor(): unknown {
        return this._endAnchor;
    }

    get curve(): unknown {
        return this._curve;
    }

    get type(): unknown {
        return this._type;
    }

    changeType(type: unknown): void {
        this._type = type;
    }
}