/**
 * 2D数学工具模块
 * 提供2D向量、矩阵和数学辅助功能
 */

import { Vector2 } from 'core/Misc/observable';
import { Epsilon } from 'core/Misc/observable';

/**
 * 带附加信息的2D向量
 * 继承自Vector2，添加了鼠标按钮索引信息
 */
export declare class Vector2WithInfo extends Vector2 {
    /**
     * 鼠标按钮索引（0=左键, 1=中键, 2=右键）
     */
    buttonIndex: number;

    /**
     * 构造函数
     * @param vector - 源2D向量
     * @param buttonIndex - 鼠标按钮索引，默认为0（左键）
     */
    constructor(vector: Vector2, buttonIndex?: number);
}

/**
 * 2D变换矩阵（3x2仿射矩阵）
 * 矩阵格式: [a, b, c, d, tx, ty]
 * | a  c  tx |
 * | b  d  ty |
 * | 0  0  1  |
 */
export declare class Matrix2D {
    /**
     * 矩阵数据存储（6个元素的Float32Array）
     * [m00, m01, m10, m11, m20, m21]
     */
    m: Float32Array;

    /**
     * 构造函数
     * @param m00 - 矩阵元素 [0,0] - X轴缩放/旋转
     * @param m01 - 矩阵元素 [0,1] - X轴倾斜
     * @param m10 - 矩阵元素 [1,0] - Y轴倾斜
     * @param m11 - 矩阵元素 [1,1] - Y轴缩放/旋转
     * @param m20 - 矩阵元素 [2,0] - X轴平移
     * @param m21 - 矩阵元素 [2,1] - Y轴平移
     */
    constructor(m00: number, m01: number, m10: number, m11: number, m20: number, m21: number);

    /**
     * 从给定值设置矩阵
     * @param m00 - 矩阵元素 [0,0]
     * @param m01 - 矩阵元素 [0,1]
     * @param m10 - 矩阵元素 [1,0]
     * @param m11 - 矩阵元素 [1,1]
     * @param m20 - 矩阵元素 [2,0]
     * @param m21 - 矩阵元素 [2,1]
     * @returns 当前矩阵实例（支持链式调用）
     */
    fromValues(m00: number, m01: number, m10: number, m11: number, m20: number, m21: number): this;

    /**
     * 计算矩阵行列式
     * @returns 行列式值（ad - bc）
     */
    determinant(): number;

    /**
     * 计算逆矩阵并存储到目标矩阵
     * @param target - 存储逆矩阵的目标对象
     * @returns 当前矩阵实例
     */
    invertToRef(target: Matrix2D): this;

    /**
     * 矩阵乘法，结果存储到目标矩阵
     * @param other - 右侧乘数矩阵
     * @param result - 存储结果的目标矩阵
     * @returns 当前矩阵实例
     */
    multiplyToRef(other: Matrix2D, result: Matrix2D): this;

    /**
     * 对2D坐标进行变换
     * @param x - X坐标
     * @param y - Y坐标
     * @param result - 存储变换结果的向量
     * @returns 当前矩阵实例
     */
    transformCoordinates(x: number, y: number, result: Vector2): this;

    /**
     * 创建单位矩阵
     * @returns 新的单位矩阵实例
     */
    static Identity(): Matrix2D;

    /**
     * 将目标矩阵设置为单位矩阵
     * @param target - 目标矩阵
     */
    static IdentityToRef(target: Matrix2D): void;

    /**
     * 创建平移矩阵并存储到目标
     * @param x - X轴平移量
     * @param y - Y轴平移量
     * @param result - 存储结果的目标矩阵
     */
    static TranslationToRef(x: number, y: number, result: Matrix2D): void;

    /**
     * 创建缩放矩阵并存储到目标
     * @param scaleX - X轴缩放因子
     * @param scaleY - Y轴缩放因子
     * @param result - 存储结果的目标矩阵
     */
    static ScalingToRef(scaleX: number, scaleY: number, result: Matrix2D): void;

    /**
     * 创建旋转矩阵并存储到目标
     * @param angle - 旋转角度（弧度）
     * @param result - 存储结果的目标矩阵
     */
    static RotationToRef(angle: number, result: Matrix2D): void;

    /**
     * 组合变换（平移-缩放-旋转-平移）并存储到目标矩阵
     * @param centerX - 变换中心点X坐标
     * @param centerY - 变换中心点Y坐标
     * @param rotation - 旋转角度（弧度）
     * @param scaleX - X轴缩放因子
     * @param scaleY - Y轴缩放因子
     * @param parentMatrix - 可选的父矩阵（用于层级变换）
     * @param result - 存储结果的目标矩阵
     */
    static ComposeToRef(
        centerX: number,
        centerY: number,
        rotation: number,
        scaleX: number,
        scaleY: number,
        parentMatrix: Matrix2D | null,
        result: Matrix2D
    ): void;

    /** @internal 内部临时矩阵：变换前平移 */
    private static _TempPreTranslationMatrix: Matrix2D;
    /** @internal 内部临时矩阵：变换后平移 */
    private static _TempPostTranslationMatrix: Matrix2D;
    /** @internal 内部临时矩阵：旋转 */
    private static _TempRotationMatrix: Matrix2D;
    /** @internal 内部临时矩阵：缩放 */
    private static _TempScalingMatrix: Matrix2D;
    /** @internal 内部临时矩阵：组合中间结果0 */
    private static _TempCompose0: Matrix2D;
    /** @internal 内部临时矩阵：组合中间结果1 */
    private static _TempCompose1: Matrix2D;
    /** @internal 内部临时矩阵：组合中间结果2 */
    private static _TempCompose2: Matrix2D;
}

/**
 * 数学工具类
 * 提供通用数学辅助方法
 */
export declare class MathTools {
    /**
     * 默认舍入精度（100表示保留2位小数）
     */
    static readonly DefaultRoundingPrecision: number;

    /**
     * 将数值按指定精度四舍五入
     * @param value - 待舍入的数值
     * @param precision - 精度因子，默认使用DefaultRoundingPrecision（100）
     * @returns 舍入后的数值
     * @example
     * MathTools.Round(3.14159, 100) // 返回 3.14
     * MathTools.Round(3.14159, 1000) // 返回 3.142
     */
    static Round(value: number, precision?: number): number;
}