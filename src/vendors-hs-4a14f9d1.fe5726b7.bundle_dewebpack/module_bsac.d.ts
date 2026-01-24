/**
 * 2D坐标点接口
 */
interface Point {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 坐标点工具模块
 * 提供坐标点的字符串转换、比较和相等性判断功能
 */
declare module 'module_BsaC' {
  /**
   * 将坐标点转换为字符串表示
   * @param point - 要转换的坐标点对象
   * @returns 坐标点的字符串表示，格式为 "(x; y)"
   * @example
   * toString({ x: 10, y: 20 }) // returns "(10; 20)"
   */
  export function toString(point: Point): string;

  /**
   * 将坐标点转换为基础字符串格式
   * @param point - 要转换的坐标点对象
   * @returns 坐标点的字符串表示，格式为 "(x; y)"
   * @example
   * toStringBase({ x: 5, y: 15 }) // returns "(5; 15)"
   */
  export function toStringBase(point: Point): string;

  /**
   * 比较两个坐标点的位置关系
   * 优先按Y坐标比较，Y坐标相同时按X坐标比较
   * @param pointA - 第一个坐标点
   * @param pointB - 第二个坐标点
   * @returns 负数表示pointA在pointB前面，0表示相同位置，正数表示pointA在pointB后面
   * @example
   * compare({ x: 1, y: 2 }, { x: 3, y: 2 }) // returns -2 (same y, compare x)
   * compare({ x: 1, y: 2 }, { x: 1, y: 5 }) // returns -3 (compare y)
   */
  export function compare(pointA: Point, pointB: Point): number;

  /**
   * 判断两个坐标点是否相等
   * @param pointA - 第一个坐标点
   * @param pointB - 第二个坐标点
   * @returns 如果两个坐标点的x和y坐标都相等则返回true，否则返回false
   * @example
   * equals({ x: 10, y: 20 }, { x: 10, y: 20 }) // returns true
   * equals({ x: 10, y: 20 }, { x: 10, y: 21 }) // returns false
   */
  export function equals(pointA: Point, pointB: Point): boolean;
}