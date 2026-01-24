import { BaseGradient } from "./BaseGradient";

/**
 * 径向渐变类，用于创建从一个圆到另一个圆的渐变效果
 * @extends BaseGradient
 */
export declare class RadialGradient extends BaseGradient {
    /** 起始圆的中心 x 坐标 */
    private _x0: number;
    
    /** 起始圆的中心 y 坐标 */
    private _y0: number;
    
    /** 起始圆的半径 */
    private _r0: number;
    
    /** 结束圆的中心 x 坐标 */
    private _x1: number;
    
    /** 结束圆的中心 y 坐标 */
    private _y1: number;
    
    /** 结束圆的半径 */
    private _r1: number;

    /**
     * 创建径向渐变实例
     * @param x0 - 起始圆的中心 x 坐标，默认为 0
     * @param y0 - 起始圆的中心 y 坐标，默认为 0
     * @param r0 - 起始圆的半径，默认为 0
     * @param x1 - 结束圆的中心 x 坐标，默认为 0
     * @param y1 - 结束圆的中心 y 坐标，默认为 0
     * @param r1 - 结束圆的半径，默认为 0
     */
    constructor(x0?: number, y0?: number, r0?: number, x1?: number, y1?: number, r1?: number);

    /**
     * 获取起始圆的中心 x 坐标
     */
    get x0(): number;

    /**
     * 获取起始圆的中心 y 坐标
     */
    get y0(): number;

    /**
     * 获取起始圆的半径
     */
    get r0(): number;

    /**
     * 获取结束圆的中心 x 坐标
     */
    get x1(): number;

    /**
     * 获取结束圆的中心 y 坐标
     */
    get y1(): number;

    /**
     * 获取结束圆的半径
     */
    get r1(): number;

    /**
     * 创建 Canvas 径向渐变对象
     * @param context - Canvas 2D 渲染上下文
     * @returns Canvas 径向渐变对象
     */
    protected _createCanvasGradient(context: CanvasRenderingContext2D): CanvasGradient;

    /**
     * 获取类名
     * @returns 返回 "RadialGradient"
     */
    getClassName(): string;

    /**
     * 序列化径向渐变数据
     * @param serializationObject - 用于存储序列化数据的对象
     */
    serialize(serializationObject: any): void;

    /**
     * 从序列化数据解析径向渐变
     * @param serializationObject - 包含序列化数据的对象
     */
    parse(serializationObject: any): void;
}