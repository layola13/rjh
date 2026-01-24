/**
 * 空间划分请求事务类
 * 用于处理楼层平面图中空间的分割操作
 * @module SplitSpaceRequest
 */

import type { Layer } from './Layer';
import type { Floor } from './Floor';
import type { Point2D, Polygon2D } from './Geometry';
import { StateRequest } from './StateRequest';

/**
 * 表示一条二维线段或路径
 */
export interface Line2D {
  /** 起点坐标 */
  start: Point2D;
  /** 终点坐标 */
  end: Point2D;
}

/**
 * 空间划分请求类
 * 继承自StateRequest，用于在特定楼层和图层上执行空间分割操作
 * 
 * @example
 *