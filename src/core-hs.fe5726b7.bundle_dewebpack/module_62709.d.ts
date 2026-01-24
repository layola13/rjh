/**
 * 几何判断工具模块
 * 提供环路验证、环路相交判断、元素包围盒与房间相交判断等功能
 */

import { Loop, MathAlg, Interval, Vector2, Box3, MathUtil } from './math-library';

/**
 * 检查环路（Loop）是否有效
 * @param points - 构成环路的二维点数组
 * @returns 如果环路有效返回 true，否则返回 false
 */
export function isLoopValid(points: Vector2[]): boolean;

/**
 * 判断两个环路是否相交
 * @param loop1Points - 第一个环路的二维点数组
 * @param loop2Points - 第二个环路的二维点数组
 * @returns 如果两个环路相交或包含关系返回 true，完全分离返回 false
 */
export function isLoopIntersectLoop(
  loop1Points: Vector2[],
  loop2Points: Vector2[]
): boolean;

/**
 * 判断元素的包围盒是否与房间相交
 * @param elementLoopPoints - 元素环路的二维点数组
 * @param roomBoundingBox - 房间的三维包围盒
 * @param elevationMin - 元素的最小高程（Z 轴坐标）
 * @param elevationHeight - 元素的高度（Z 轴方向的尺寸）
 * @returns 如果元素包围盒与房间相交返回 true，否则返回 false
 */
export function isEleBoxIntersectRoom(
  elementLoopPoints: Vector2[],
  roomBoundingBox: Box3,
  elevationMin: number,
  elevationHeight: number
): boolean;