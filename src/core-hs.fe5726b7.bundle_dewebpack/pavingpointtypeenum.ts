export enum PavingPointTypeEnum {
    Default = "default",
    DefaultNormal = "default-normal",
    UserDefined = "userDefined"
}

interface Point {
    x: number;
    y: number;
}

interface PavingOptionArgs {
    type?: PavingPointTypeEnum;
    point?: Point;
    rotation?: number;
    sliderOffsetX?: number;
    sliderOffsetY?: number;
    defaultOffsetX?: number;
    defaultOffsetY?: number;
}

interface PavingOptionForFGI {
    point: Point;
    rotation: number;
    type: PavingPointTypeEnum;
    defaultOffsetX: number;
    defaultOffsetY: number;
}

export class PavingOption {
    static readonly DefaultOption = PavingOption.create();

    private _type: PavingPointTypeEnum = PavingPointTypeEnum.Default;
    private _point: Point = { x: 0, y: 0 };
    private _rotation: number = 0;
    private _sliderOffsetX?: number;
    private _sliderOffsetY?: number;
    private _defaultOffsetX?: number;
    private _defaultOffsetY?: number;

    constructor(args?: PavingOptionArgs) {
        this._setFrom(args);
    }

    static create(args?: PavingOptionArgs): PavingOption {
        const option = new PavingOption();
        if (args) {
            if (args.type) {
                option._type = args.type;
            }
            if (args.point) {
                option._point = args.point;
            }
            if (args.rotation) {
                option._rotation = args.rotation;
            }
            option._sliderOffsetX = args.sliderOffsetX;
            option._sliderOffsetY = args.sliderOffsetY;
            option._defaultOffsetX = args.defaultOffsetX;
            option._defaultOffsetY = args.defaultOffsetY;
        }
        return option;
    }

    dump(): PavingOptionArgs {
        const result: PavingOptionArgs = {};
        
        if (this._type !== PavingPointTypeEnum.Default) {
            result.type = this._type;
        }
        
        if (this._point.x !== 0 || this._point.y !== 0) {
            result.point = {
                x: this._point.x,
                y: this._point.y
            };
        }
        
        if (this._rotation !== 0) {
            result.rotation = this._rotation;
        }
        
        if (this.defaultOffsetX !== 0) {
            result.defaultOffsetX = this.defaultOffsetX;
        }
        
        if (this.defaultOffsetY !== 0) {
            result.defaultOffsetY = this.defaultOffsetY;
        }
        
        if (this.sliderOffsetX !== 0) {
            result.sliderOffsetX = this.sliderOffsetX;
        }
        
        if (this.sliderOffsetY !== 0) {
            result.sliderOffsetY = this.sliderOffsetY;
        }
        
        return result;
    }

    get type(): PavingPointTypeEnum {
        return this._type;
    }

    get point(): Point {
        return this._point;
    }

    get rotation(): number {
        return this._rotation;
    }

    get sliderOffsetX(): number {
        return this._sliderOffsetX ?? 0;
    }

    get sliderOffsetY(): number {
        return this._sliderOffsetY ?? 0;
    }

    get defaultOffsetX(): number {
        return this._defaultOffsetX ?? 0;
    }

    get defaultOffsetY(): number {
        return this._defaultOffsetY ?? 0;
    }

    getArgs(): Required<PavingOptionArgs> {
        return {
            point: {
                x: this.point.x,
                y: this.point.y
            },
            rotation: this.rotation,
            type: this.type,
            sliderOffsetX: this.sliderOffsetX,
            sliderOffsetY: this.sliderOffsetY,
            defaultOffsetX: this.defaultOffsetX,
            defaultOffsetY: this.defaultOffsetY
        };
    }

    getPavingOptionForFGI(): PavingOptionForFGI {
        return {
            point: {
                x: this.point.x,
                y: this.point.y
            },
            rotation: this.rotation,
            type: this.type,
            defaultOffsetX: this.defaultOffsetX,
            defaultOffsetY: this.defaultOffsetY
        };
    }

    clone(args?: PavingOptionArgs): PavingOption {
        const cloned = new PavingOption(this.getArgs());
        if (args) {
            cloned._setFrom(args);
        }
        return cloned;
    }

    equals(other?: PavingOptionArgs): boolean {
        if (!other) {
            return false;
        }

        return (
            this._type === (other.type ?? PavingPointTypeEnum.Default) &&
            isSamePoint(this._point, other.point ?? { x: 0, y: 0 }) &&
            nearlyEquals(this._rotation, other.rotation ?? 0) &&
            nearlyEquals(this.sliderOffsetX, other.sliderOffsetX ?? 0) &&
            nearlyEquals(this.sliderOffsetY, other.sliderOffsetY ?? 0) &&
            nearlyEquals(this.defaultOffsetX, other.defaultOffsetX ?? 0) &&
            nearlyEquals(this.defaultOffsetY, other.defaultOffsetY ?? 0)
        );
    }

    private _setFrom(args?: PavingOptionArgs): void {
        if (!args) {
            return;
        }

        if (args.type !== undefined) {
            this._type = args.type;
        }

        if (args.point !== undefined) {
            this._point = {
                x: args.point.x,
                y: args.point.y
            };
        }

        if (args.rotation !== undefined) {
            this._rotation = args.rotation;
        }

        if (args.sliderOffsetX !== undefined) {
            this._sliderOffsetX = args.sliderOffsetX;
        }

        if (args.sliderOffsetY !== undefined) {
            this._sliderOffsetY = args.sliderOffsetY;
        }

        if (args.defaultOffsetX !== undefined) {
            this._defaultOffsetX = args.defaultOffsetX;
        }

        if (args.defaultOffsetY !== undefined) {
            this._defaultOffsetY = args.defaultOffsetY;
        }
    }
}

function isSamePoint(point1: Point, point2: Point): boolean {
    return point1.x === point2.x && point1.y === point2.y;
}

function nearlyEquals(value1: number, value2: number, epsilon: number = 1e-10): boolean {
    return Math.abs(value1 - value2) < epsilon;
}