import { BaseGradient } from "./BaseGradient";

/**
 * Represents a linear gradient for GUI controls.
 * Creates a gradient effect along a straight line defined by two points (x0, y0) and (x1, y1).
 */
export class LinearGradient extends BaseGradient {
    /**
     * Starting X coordinate of the linear gradient
     * @internal
     */
    private _x0: number;

    /**
     * Starting Y coordinate of the linear gradient
     * @internal
     */
    private _y0: number;

    /**
     * Ending X coordinate of the linear gradient
     * @internal
     */
    private _x1: number;

    /**
     * Ending Y coordinate of the linear gradient
     * @internal
     */
    private _y1: number;

    /**
     * Creates a new LinearGradient instance
     * @param x0 - Starting X coordinate (default: 0)
     * @param y0 - Starting Y coordinate (default: 0)
     * @param x1 - Ending X coordinate (default: 0)
     * @param y1 - Ending Y coordinate (default: 0)
     */
    constructor(x0?: number, y0?: number, x1?: number, y1?: number) {
        super();
        this._x0 = x0 ?? 0;
        this._y0 = y0 ?? 0;
        this._x1 = x1 ?? 0;
        this._y1 = y1 ?? 0;
    }

    /**
     * Creates a canvas linear gradient based on the configured coordinates
     * @param context - The 2D rendering context
     * @returns A CanvasGradient object
     * @internal
     */
    protected _createCanvasGradient(context: CanvasRenderingContext2D): CanvasGradient {
        return context.createLinearGradient(this._x0, this._y0, this._x1, this._y1);
    }

    /**
     * Gets the starting X coordinate of the gradient
     */
    get x0(): number {
        return this._x0;
    }

    /**
     * Gets the ending X coordinate of the gradient
     */
    get x1(): number {
        return this._x1;
    }

    /**
     * Gets the starting Y coordinate of the gradient
     */
    get y0(): number {
        return this._y0;
    }

    /**
     * Gets the ending Y coordinate of the gradient
     */
    get y1(): number {
        return this._y1;
    }

    /**
     * Returns the class name of this gradient type
     * @returns "LinearGradient"
     */
    getClassName(): string {
        return "LinearGradient";
    }

    /**
     * Serializes the linear gradient properties into a JSON-compatible object
     * @param serializationObject - The target object to store serialized data
     */
    serialize(serializationObject: Record<string, unknown>): void {
        super.serialize(serializationObject);
        serializationObject.x0 = this._x0;
        serializationObject.y0 = this._y0;
        serializationObject.x1 = this._x1;
        serializationObject.y1 = this._y1;
    }

    /**
     * Parses a serialized object to populate this gradient's properties
     * @param serializedObject - The serialized data to parse
     */
    parse(serializedObject: Record<string, unknown>): void {
        super.parse(serializedObject);
        this._x0 = serializedObject.x0 as number;
        this._y0 = serializedObject.y0 as number;
        this._x1 = serializedObject.x1 as number;
        this._y1 = serializedObject.y1 as number;
    }
}