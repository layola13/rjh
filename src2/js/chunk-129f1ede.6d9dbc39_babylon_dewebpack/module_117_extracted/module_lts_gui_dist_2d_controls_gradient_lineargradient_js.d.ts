import { BaseGradient } from "./BaseGradient";
import { RegisterClass } from "core/Misc/decorators";

/**
 * Represents a linear gradient for GUI controls
 * Creates a gradient that transitions colors along a straight line between two points
 */
export class LinearGradient extends BaseGradient {
    /**
     * X coordinate of the gradient start point
     * @internal
     */
    private _x0: number;

    /**
     * Y coordinate of the gradient start point
     * @internal
     */
    private _y0: number;

    /**
     * X coordinate of the gradient end point
     * @internal
     */
    private _x1: number;

    /**
     * Y coordinate of the gradient end point
     * @internal
     */
    private _y1: number;

    /**
     * Creates a new LinearGradient instance
     * @param x0 - X coordinate of the gradient start point (default: 0)
     * @param y0 - Y coordinate of the gradient start point (default: 0)
     * @param x1 - X coordinate of the gradient end point (default: 0)
     * @param y1 - Y coordinate of the gradient end point (default: 0)
     */
    constructor(x0?: number, y0?: number, x1?: number, y1?: number) {
        super();
        this._x0 = x0 ?? 0;
        this._y0 = y0 ?? 0;
        this._x1 = x1 ?? 0;
        this._y1 = y1 ?? 0;
    }

    /**
     * Creates a canvas linear gradient using the configured coordinates
     * @param context - The 2D rendering context to create the gradient on
     * @returns The created CanvasGradient object
     * @internal
     */
    protected _createCanvasGradient(context: CanvasRenderingContext2D): CanvasGradient {
        return context.createLinearGradient(this._x0, this._y0, this._x1, this._y1);
    }

    /**
     * Gets the X coordinate of the gradient start point
     */
    get x0(): number {
        return this._x0;
    }

    /**
     * Gets the X coordinate of the gradient end point
     */
    get x1(): number {
        return this._x1;
    }

    /**
     * Gets the Y coordinate of the gradient start point
     */
    get y0(): number {
        return this._y0;
    }

    /**
     * Gets the Y coordinate of the gradient end point
     */
    get y1(): number {
        return this._y1;
    }

    /**
     * Gets the class name of this control
     * @returns The string "LinearGradient"
     */
    getClassName(): string {
        return "LinearGradient";
    }

    /**
     * Serializes the linear gradient to a JSON object
     * @param serializationObject - The target object to serialize into
     */
    serialize(serializationObject: any): void {
        super.serialize(serializationObject);
        serializationObject.x0 = this._x0;
        serializationObject.y0 = this._y0;
        serializationObject.x1 = this._x1;
        serializationObject.y1 = this._y1;
    }

    /**
     * Parses a serialized linear gradient from a JSON object
     * @param serializedObject - The source object to parse from
     */
    parse(serializedObject: any): void {
        super.parse(serializedObject);
        this._x0 = serializedObject.x0;
        this._y0 = serializedObject.y0;
        this._x1 = serializedObject.x1;
        this._y1 = serializedObject.y1;
    }
}

RegisterClass("BABYLON.GUI.LinearGradient", LinearGradient);