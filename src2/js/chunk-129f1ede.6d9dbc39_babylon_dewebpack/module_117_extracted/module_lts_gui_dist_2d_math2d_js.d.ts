/**
 * 2D数学工具库
 * 提供2D向量、矩阵运算和数学工具函数
 */

/**
 * 数学工具类
 * 提供通用的数学辅助函数
 */
export declare class MathTools {
  /**
   * 默认舍入精度
   * @default 100
   */
  static readonly DefaultRoundingPrecision: number;

  /**
   * 将数值按指定精度四舍五入
   * @param value - 要舍入的数值
   * @param precision - 精度系数，默认为 DefaultRoundingPrecision (100)
   * @returns 舍入后的数值
   * @example
   * MathTools.Round(3.14159, 100) // 返回 3.14
   */
  static Round(value: number, precision?: number): number;
}

/**
 * 2D仿射变换矩阵 (3x2矩阵)
 * 使用行主序存储: [a, b, c, d, tx, ty]
 * 表示变换矩阵:
 * | a  c  tx |
 * | b  d  ty |
 * | 0  0  1  |
 */
export declare class Matrix2D {
  /**
   * 矩阵元素数组 (长度为6)
   * 顺序: [m00, m01, m10, m11, m40, m41]
   */
  readonly m: Float32Array;

  /**
   * 构造一个2D矩阵
   * @param a - 矩阵元素 m[0] (缩放X/旋转)
   * @param b - 矩阵元素 m[1] (旋转/倾斜Y)
   * @param c - 矩阵元素 m[2] (倾斜X/旋转)
   * @param d - 矩阵元素 m[3] (缩放Y/旋转)
   * @param tx - 矩阵元素 m[4] (平移X)
   * @param ty - 矩阵元素 m[5] (平移Y)
   */
  constructor(a: number, b: number, c: number, d: number, tx: number, ty: number);

  /**
   * 设置矩阵元素值
   * @param a - 矩阵元素 m[0]
   * @param b - 矩阵元素 m[1]
   * @param c - 矩阵元素 m[2]
   * @param d - 矩阵元素 m[3]
   * @param tx - 矩阵元素 m[4]
   * @param ty - 矩阵元素 m[5]
   * @returns 当前矩阵实例 (支持链式调用)
   */
  fromValues(a: number, b: number, c: number, d: number, tx: number, ty: number): this;

  /**
   * 计算矩阵的行列式
   * @returns 行列式的值 (ad - bc)
   */
  determinant(): number;

  /**
   * 计算当前矩阵的逆矩阵并存储到目标矩阵
   * @param target - 用于存储逆矩阵结果的矩阵对象
   * @returns 当前矩阵实例
   * @remarks 如果矩阵不可逆(行列式接近0)，目标矩阵将被设置为零矩阵
   */
  invertToRef(target: Matrix2D): this;

  /**
   * 将当前矩阵与另一个矩阵相乘，结果存储到目标矩阵
   * @param other - 右侧乘数矩阵
   * @param result - 用于存储乘法结果的矩阵对象
   * @returns 当前矩阵实例
   * @remarks 执行矩阵乘法: result = this * other
   */
  multiplyToRef(other: Matrix2D, result: Matrix2D): this;

  /**
   * 使用当前矩阵变换2D坐标点
   * @param x - 输入点的X坐标
   * @param y - 输入点的Y坐标
   * @param result - 用于存储变换后坐标的向量对象
   * @returns 当前矩阵实例
   * @remarks 执行仿射变换: result = this * [x, y, 1]
   */
  transformCoordinates(x: number, y: number, result: { x: number; y: number }): this;

  /**
   * 创建一个单位矩阵
   * @returns 新的单位矩阵实例
   */
  static Identity(): Matrix2D;

  /**
   * 将目标矩阵设置为单位矩阵
   * @param target - 要设置的矩阵对象
   */
  static IdentityToRef(target: Matrix2D): void;

  /**
   * 创建平移矩阵并存储到目标矩阵
   * @param x - X轴平移量
   * @param y - Y轴平移量
   * @param result - 用于存储结果的矩阵对象
   */
  static TranslationToRef(x: number, y: number, result: Matrix2D): void;

  /**
   * 创建缩放矩阵并存储到目标矩阵
   * @param scaleX - X轴缩放因子
   * @param scaleY - Y轴缩放因子
   * @param result - 用于存储结果的矩阵对象
   */
  static ScalingToRef(scaleX: number, scaleY: number, result: Matrix2D): void;

  /**
   * 创建旋转矩阵并存储到目标矩阵
   * @param angle - 旋转角度 (弧度)
   * @param result - 用于存储结果的矩阵对象
   */
  static RotationToRef(angle: number, result: Matrix2D): void;

  /**
   * 组合变换(平移、缩放、旋转)并存储到目标矩阵
   * @param originX - 变换中心点的X坐标
   * @param originY - 变换中心点的Y坐标
   * @param rotation - 旋转角度 (弧度)
   * @param scaleX - X轴缩放因子
   * @param scaleY - Y轴缩放因子
   * @param parentMatrix - 可选的父级变换矩阵
   * @param result - 用于存储结果的矩阵对象
   * @remarks 变换顺序: 平移到原点 -> 缩放 -> 旋转 -> 平移回原位置 -> (可选)乘以父矩阵
   */
  static ComposeToRef(
    originX: number,
    originY: number,
    rotation: number,
    scaleX: number,
    scaleY: number,
    parentMatrix: Matrix2D | null,
    result: Matrix2D
  ): void;

  /** @internal 内部临时矩阵: 预平移 */
  private static _TempPreTranslationMatrix: Matrix2D;
  /** @internal 内部临时矩阵: 后平移 */
  private static _TempPostTranslationMatrix: Matrix2D;
  /** @internal 内部临时矩阵: 旋转 */
  private static _TempRotationMatrix: Matrix2D;
  /** @internal 内部临时矩阵: 缩放 */
  private static _TempScalingMatrix: Matrix2D;
  /** @internal 内部临时矩阵: 组合中间结果0 */
  private static _TempCompose0: Matrix2D;
  /** @internal 内部临时矩阵: 组合中间结果1 */
  private static _TempCompose1: Matrix2D;
  /** @internal 内部临时矩阵: 组合中间结果2 */
  private static _TempCompose2: Matrix2D;
}

/**
 * 带附加信息的2D向量
 * 继承自 core/Misc/observable 模块的 Vector2
 * 用于存储带有按钮索引信息的向量(如鼠标点击位置)
 */
export declare class Vector2WithInfo {
  /**
   * X坐标分量
   */
  x: number;

  /**
   * Y坐标分量
   */
  y: number;

  /**
   * 关联的按钮索引
   * @remarks 通常用于表示鼠标按钮: 0=左键, 1=中键, 2=右键
   */
  buttonIndex: number;

  /**
   * 构造一个带按钮信息的2D向量
   * @param vector - 基础向量对象 (包含x和y坐标)
   * @param buttonIndex - 按钮索引，默认为 0
   */
  constructor(vector: { x: number; y: number }, buttonIndex?: number);
}