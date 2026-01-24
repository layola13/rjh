/**
 * 数值比较工具模块
 * 提供浮点数比较、范围判断等数学工具函数
 */

/**
 * 全局配置接口
 */
interface GlobalConfig {
  /** 浮点数相等判断的默认容差值 */
  EQUAL_TOLERANCE: number;
}

/**
 * 包含全局配置的模块接口
 */
interface GlobalModule {
  global: GlobalConfig;
}

/**
 * 数值比较工具类型定义
 */
interface NumericalComparison {
  /**
   * 判断两个数值是否近似相等
   * @param value1 - 第一个数值
   * @param value2 - 第二个数值
   * @param tolerance - 可选的容差值，默认使用全局 EQUAL_TOLERANCE
   * @returns 如果两数之差的绝对值小于等于容差值则返回 true
   */
  nearlyEqual(value1: number, value2: number, tolerance?: number): boolean;

  /**
   * 判断数值是否近似为零
   * @param value - 待判断的数值
   * @param tolerance - 可选的容差值
   * @returns 如果数值近似为零则返回 true
   */
  isZero(value: number, tolerance?: number): boolean;

  /**
   * 判断第一个数值是否明显大于第二个数值
   * @param value1 - 第一个数值
   * @param value2 - 第二个数值
   * @param tolerance - 可选的容差值，默认使用全局 EQUAL_TOLERANCE
   * @returns 如果 value1 - value2 > tolerance 则返回 true
   */
  larger(value1: number, value2: number, tolerance?: number): boolean;

  /**
   * 判断第一个数值是否大于或近似等于第二个数值
   * @param value1 - 第一个数值
   * @param value2 - 第二个数值
   * @param tolerance - 可选的容差值，默认使用全局 EQUAL_TOLERANCE
   * @returns 如果 value1 >= value2（考虑容差）则返回 true
   */
  largerOrEqual(value1: number, value2: number, tolerance?: number): boolean;

  /**
   * 判断第一个数值是否明显小于第二个数值
   * @param value1 - 第一个数值
   * @param value2 - 第二个数值
   * @param tolerance - 可选的容差值，默认使用全局 EQUAL_TOLERANCE
   * @returns 如果 value1 - value2 < -tolerance 则返回 true
   */
  smaller(value1: number, value2: number, tolerance?: number): boolean;

  /**
   * 判断第一个数值是否小于或近似等于第二个数值
   * @param value1 - 第一个数值
   * @param value2 - 第二个数值
   * @param tolerance - 可选的容差值，默认使用全局 EQUAL_TOLERANCE
   * @returns 如果 value1 <= value2（考虑容差）则返回 true
   */
  smallerOrEqual(value1: number, value2: number, tolerance?: number): boolean;

  /**
   * 判断数值是否在指定范围内
   * @param value - 待判断的数值
   * @param rangeStart - 范围起始值
   * @param rangeEnd - 范围结束值
   * @param excludeStart - 是否排除起始值（true 为开区间，false 为闭区间）
   * @param excludeEnd - 是否排除结束值（true 为开区间，false 为闭区间）
   * @param tolerance - 可选的容差值
   * @returns 如果数值在指定范围内则返回 true
   */
  isInRange(
    value: number,
    rangeStart: number,
    rangeEnd: number,
    excludeStart?: boolean,
    excludeEnd?: boolean,
    tolerance?: number
  ): boolean;
}

declare const numericalComparison: NumericalComparison;

export = numericalComparison;