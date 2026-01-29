/**
 * 几何相交判断模块
 * 提供环路验证、环路相交检测和元素包围盒与房间相交检测的功能
 */

import { Loop, MathAlg, Interval, Vector2, Box3, MathUtil } from './math-library';

/**
 * 验证环路是否有效
 * @param points - 构成环路的二维点坐标数组
 * @returns 环路是否有效
 */
export function isLoopValid(points: Vector2[]): boolean;

/**
 * 判断两个环路是否相交
 * @param firstLoopPoints - 第一个环路的点坐标数组
 * @param secondLoopPoints - 第二个环路的点坐标数组
 * @returns 如果两个环路相交或包含关系则返回true，完全分离则返回false
 */
export function isLoopIntersectLoop(
  firstLoopPoints: Vector2[],
  secondLoopPoints: Vector2[]
): boolean;

/**
 * 判断元素的包围盒是否与房间相交
 * @param elementLoopPoints - 元素的二维环路点坐标数组（XY平面投影）
 * @param roomBoundingBox - 房间的三维包围盒
 * @param elevationMin - 元素的最小高程（Z坐标）
 * @param elevationHeight - 元素的高度范围
 * @returns 如果元素包围盒与房间相交则返回true，否则返回false
 */
export function isEleBoxIntersectRoom(
  elementLoopPoints: Vector2[],
  roomBoundingBox: Box3,
  elevationMin: number,
  elevationHeight: number
): boolean;