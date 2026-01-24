import { BaseGradient } from "./BaseGradient";

/**
 * 径向渐变类，用于创建从一个圆到另一个圆的渐变效果
 * Radial gradient class for creating gradients between two circles
 */
export declare class RadialGradient extends BaseGradient {
    /**
     * 起始圆的中心X坐标
     * The x-coordinate of the starting circle's center
     */
    private _x0;

    /**
     * 起始圆的中心Y坐标
     * The y-coordinate of the starting circle's center
     */
    private _y0;

    /**
     * 起始圆的半径
     * The radius of the starting circle
     */
    private _r0;

    /**
     * 结束圆的中心X坐标
     * The x-coordinate of the ending circle's center
     */
    private _x1;

    /**
     * 结束圆的中心Y坐标
     * The y-coordinate of the ending circle's center
     */
    private _y1;

    /**
     * 结束圆的半径
     * The radius of the ending circle
     */
    private _r1;

    /**
     * 创建径向渐变实例
     * Creates a new RadialGradient instance
     * @param x0 - 起始圆中心X坐标，默认为0 / Starting circle center x-coordinate, defaults to 0
     * @param y0 - 起始圆中心Y坐标，默认为0 / Starting circle center y-coordinate, defaults to 0
     * @param r0 - 起始圆半径，默认为0 / Starting circle radius, defaults to 0
     * @param x1 - 结束圆中心X坐标，默认为0 / Ending circle center x-coordinate, defaults to 0
     * @param y1 - 结束圆中心Y坐标，默认为0 / Ending circle center y-coordinate, defaults to 0
     * @param r1 - 结束圆半径，默认为0 / Ending circle radius, defaults to 0
     */
    constructor(x0?: number, y0?: number, r0?: number, x1?: number, y1?: number, r1?: number);

    /**
     * 获取起始圆中心X坐标
     * Gets the x-coordinate of the starting circle's center
     */
    get x0(): number;

    /**
     * 获取起始圆中心Y坐标
     * Gets the y-coordinate of the starting circle's center
     */
    get y0(): number;

    /**
     * 获取起始圆半径
     * Gets the radius of the starting circle
     */
    get r0(): number;

    /**
     * 获取结束圆中心X坐标
     * Gets the x-coordinate of the ending circle's center
     */
    get x1(): number;

    /**
     * 获取结束圆中心Y坐标
     * Gets the y-coordinate of the ending circle's center
     */
    get y1(): number;

    /**
     * 获取结束圆半径
     * Gets the radius of the ending circle
     */
    get r1(): number;

    /**
     * 创建Canvas径向渐变对象
     * Creates a canvas radial gradient object
     * @param context - Canvas 2D渲染上下文 / Canvas 2D rendering context
     * @returns Canvas径向渐变对象 / Canvas radial gradient object
     */
    protected _createCanvasGradient(context: CanvasRenderingContext2D): CanvasGradient;

    /**
     * 获取类名
     * Gets the class name
     * @returns 类名字符串 / Class name string
     */
    getClassName(): string;

    /**
     * 序列化渐变对象为JSON
     * Serializes the gradient to JSON
     * @param serializationObject - 用于存储序列化数据的对象 / Object to store serialization data
     */
    serialize(serializationObject: any): void;

    /**
     * 从序列化数据解析渐变对象
     * Parses the gradient from serialized data
     * @param serializationObject - 包含序列化数据的对象 / Object containing serialized data
     */
    parse(serializationObject: any): void;
}