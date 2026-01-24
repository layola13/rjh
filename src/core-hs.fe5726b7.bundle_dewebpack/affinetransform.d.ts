/**
 * 工具模块集合
 * 提供仿射变换、数组操作、边界计算、信号处理等通用工具类
 * @module Utils
 */

/**
 * 版本信息管理类
 */
export class Version {
  // 具体实现需参考源模块 66263
}

/**
 * URL 处理工具类
 */
export class Url {
  // 具体实现需参考源模块 91586
}

/**
 * 单位转换工具类
 */
export class Unit {
  // 具体实现需参考源模块 69829
}

/**
 * SVG 工具函数集合
 */
export namespace SVGUtil {
  // 具体实现需参考源模块 50298
}

/**
 * 字符串处理工具类
 */
export class String {
  // 具体实现需参考源模块 65426
}

/**
 * 信号事件类
 * 用于事件驱动架构中的事件对象
 */
export class SignalEvent<T = unknown> {
  // 具体实现需参考源模块 55995
}

/**
 * 信号钩子类
 * 用于注册和管理信号监听器
 */
export class SignalHook<T = unknown> {
  // 具体实现需参考源模块 55995
}

/**
 * 信号类
 * 实现观察者模式的核心类
 */
export class Signal<T = unknown> {
  // 具体实现需参考源模块 55995
}

/**
 * 配置文件解析器
 */
export namespace ProfileParser {
  // 具体实现需参考源模块 35665
}

/**
 * 数学工具函数集合
 */
export namespace MathUtil {
  // 具体实现需参考源模块 59145
}

/**
 * JSON 反序列化工具
 * 用于恢复经过 JSONDecycle 处理的循环引用对象
 * @param json - 包含路径引用的 JSON 对象
 * @returns 恢复循环引用后的对象
 */
export function JSONRetrocycle<T = unknown>(json: unknown): T;

/**
 * JSON 序列化工具
 * 用于处理包含循环引用的对象，将循环引用转换为路径字符串
 * @param object - 可能包含循环引用的对象
 * @returns 移除循环引用后的对象
 */
export function JSONDecycle<T = unknown>(object: T): unknown;

/**
 * ID 生成器类型枚举
 */
export enum IDGeneratorType {
  // 具体实现需参考源模块 38477
}

/**
 * ID 生成器类
 * 用于生成唯一标识符
 */
export class IDGenerator {
  /**
   * 构造函数
   * @param type - ID 生成器类型
   */
  constructor(type?: IDGeneratorType);

  /**
   * 生成唯一 ID
   * @returns 生成的 ID 字符串
   */
  generate(): string;

  // 具体实现需参考源模块 38477
}

/**
 * 标志位工具类
 * 用于位运算和标志管理
 */
export class Flag {
  // 具体实现需参考源模块 40269
}

/**
 * 加密工具类
 * 基于 CryptoJS 的封装
 */
export class Cryptojs {
  // 具体实现需参考源模块 20069
}

/**
 * BREP 边界类
 * 用于边界表示法(Boundary Representation)的边界计算
 */
export class BrepBound {
  // 具体实现需参考源模块 51976
}

/**
 * 边界矩形类
 * 表示二维空间中的矩形边界框
 */
export class Bound {
  /**
   * 最小 X 坐标
   */
  minX: number;

  /**
   * 最小 Y 坐标
   */
  minY: number;

  /**
   * 最大 X 坐标
   */
  maxX: number;

  /**
   * 最大 Y 坐标
   */
  maxY: number;

  /**
   * 构造函数
   * @param minX - 最小 X 坐标
   * @param minY - 最小 Y 坐标
   * @param maxX - 最大 X 坐标
   * @param maxY - 最大 Y 坐标
   */
  constructor(minX?: number, minY?: number, maxX?: number, maxY?: number);

  /**
   * 获取边界宽度
   */
  get width(): number;

  /**
   * 获取边界高度
   */
  get height(): number;

  // 具体实现需参考源模块 61403
}

/**
 * 数组工具函数集合
 */
export namespace ArrayUtil {
  // 具体实现需参考源模块 48234
}

/**
 * 仿射变换类
 * 用于二维图形的平移、旋转、缩放、倾斜等变换
 */
export class AffineTransform {
  /**
   * 缩放/旋转 X 分量
   */
  m00: number;

  /**
   * 倾斜 Y 分量
   */
  m10: number;

  /**
   * 倾斜 X 分量
   */
  m01: number;

  /**
   * 缩放/旋转 Y 分量
   */
  m11: number;

  /**
   * 平移 X 分量
   */
  m02: number;

  /**
   * 平移 Y 分量
   */
  m12: number;

  /**
   * 构造函数
   * @param m00 - 缩放/旋转 X 分量，默认 1
   * @param m10 - 倾斜 Y 分量，默认 0
   * @param m01 - 倾斜 X 分量，默认 0
   * @param m11 - 缩放/旋转 Y 分量，默认 1
   * @param m02 - 平移 X 分量，默认 0
   * @param m12 - 平移 Y 分量，默认 0
   */
  constructor(
    m00?: number,
    m10?: number,
    m01?: number,
    m11?: number,
    m02?: number,
    m12?: number
  );

  /**
   * 克隆当前变换
   * @returns 新的仿射变换实例
   */
  clone(): AffineTransform;

  /**
   * 应用平移变换
   * @param tx - X 方向平移量
   * @param ty - Y 方向平移量
   * @returns 当前实例（支持链式调用）
   */
  translate(tx: number, ty: number): this;

  /**
   * 应用旋转变换
   * @param angle - 旋转角度（弧度）
   * @returns 当前实例（支持链式调用）
   */
  rotate(angle: number): this;

  /**
   * 应用缩放变换
   * @param sx - X 方向缩放比例
   * @param sy - Y 方向缩放比例
   * @returns 当前实例（支持链式调用）
   */
  scale(sx: number, sy: number): this;

  /**
   * 连接另一个仿射变换
   * @param transform - 要连接的变换
   * @returns 当前实例（支持链式调用）
   */
  concatenate(transform: AffineTransform): this;

  /**
   * 计算逆变换
   * @returns 逆变换实例，若不可逆则返回 null
   */
  invert(): AffineTransform | null;

  // 具体实现需参考源模块 29826
}