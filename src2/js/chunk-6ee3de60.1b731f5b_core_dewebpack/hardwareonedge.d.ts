/**
 * HardwareOnEdge 模块
 * 表示放置在多边形边缘上的硬件对象
 * @module HardwareOnEdge
 */

import { Hardware } from './Hardware';
import { Point, Vector, Segment, Arc, Line, ORIENTATION } from './geometry';
import { Polygon } from './Polygon';
import { Frame } from './Frame';

/**
 * 边缘捕捉信息接口
 * 描述硬件对象在边缘上的捕捉位置信息
 */
export interface EdgeSnapInfo {
  /** 捕捉线段 */
  snapLine: Segment;
  /** 捕捉目标硬件对象 */
  snapTarget: HardwareOnEdge;
  /** 是否在X轴上捕捉 */
  snapOnX: boolean;
}

/**
 * 边缘类型
 * 可以是线段或圆弧
 */
export type Edge = Segment | Arc;

/**
 * 硬件对象序列化数据接口
 */
export interface HardwareOnEdgeJSON {
  /** 边缘索引 */
  edgeIndex: number;
  [key: string]: any;
}

/**
 * HardwareOnEdge 类
 * 表示放置在多边形边缘上的硬件对象
 * 继承自 Hardware 基类，提供边缘定位和偏移计算功能
 * 
 * @extends Hardware
 * @example
 *