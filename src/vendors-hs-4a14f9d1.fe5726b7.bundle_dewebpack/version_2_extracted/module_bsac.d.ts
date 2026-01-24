/**
 * 2D坐标点操作工具模块
 * 提供点的字符串转换、比较和相等性判断功能
 */

/**
 * 二维坐标点接口
 */
export interface Point {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 将点转换为基础字符串格式 "(x; y)"
 * @param point - 要转换的坐标点
 * @returns 格式化的坐标字符串
 */
export declare function toStringBase(point: Point): string;

/**
 * 将点转换为字符串
 * 如果点的toString()返回"[object Object]"，则使用toStringBase格式化
 * 否则使用点自身的toString()结果
 * @param point - 要转换的坐标点
 * @returns 字符串表示
 */
export declare function toString(point: Point): string;

/**
 * 比较两个点的位置
 * 先按Y坐标比较，Y相同则按X坐标比较
 * @param pointA - 第一个点
 * @param pointB - 第二个点
 * @returns 负数表示pointA在前，0表示位置相同，正数表示pointB在前
 */
export declare function compare(pointA: Point, pointB: Point): number;

/**
 * 判断两个点是否相等
 * @param pointA - 第一个点
 * @param pointB - 第二个点
 * @returns 两点的X和Y坐标都相等时返回true
 */
export declare function equals(pointA: Point, pointB: Point): boolean;