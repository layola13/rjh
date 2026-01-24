/**
 * 二维空间中的点坐标
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 检查三个点是否共线（在同一直线上）
 * 使用中点公式：如果点t是点p1和p3的中点，则三点共线
 * 
 * @param p1 - 第一个点
 * @param p2 - 中间点
 * @param p3 - 第三个点
 * @returns 如果三点共线返回true，否则返回false
 */
export function checkCollinear(p1: Point, p2: Point, p3: Point): boolean;

/**
 * 计算两点之间的欧几里得距离
 * 使用勾股定理：distance = √((x2-x1)² + (y2-y1)²)
 * 
 * @param p1 - 起始点
 * @param p2 - 目标点
 * @returns 两点之间的距离
 */
export function getDistance(p1: Point, p2: Point): number;

/**
 * 从起始点向目标点方向移动指定距离
 * 计算方向向量并归一化，然后按指定距离移动
 * 
 * @param from - 起始点
 * @param to - 目标点（用于确定方向）
 * @param distance - 要移动的距离
 * @returns 移动后的新点坐标
 */
export function moveTo(from: Point, to: Point, distance: number): Point;