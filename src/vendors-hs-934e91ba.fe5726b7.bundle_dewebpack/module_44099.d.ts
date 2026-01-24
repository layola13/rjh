/**
 * 2D线段相交检测模块
 * 使用方向测试算法判断两条线段是否相交
 */

/** 二维坐标点 */
export type Point2D = [number, number];

/** 线段定义（由两个端点组成） */
export type LineSegment = [Point2D, Point2D];

/**
 * 检查两条线段是否相交
 * 
 * @param segmentA - 第一条线段，由起点和终点坐标组成
 * @param segmentB - 第二条线段，由起点和终点坐标组成
 * @returns 如果两条线段相交返回 true，否则返回 false
 * 
 * @example
 *