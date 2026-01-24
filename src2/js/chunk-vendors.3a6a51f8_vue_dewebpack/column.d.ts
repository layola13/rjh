/**
 * 列模式布局处理模块
 * 用于计算日历事件在列布局中的位置和宽度
 */

import type { getOverlapGroupHandler } from './common';

/**
 * 日历事件的视觉属性接口
 */
export interface EventVisual {
  /** 事件在当前列组中的列索引 */
  column: number;
  /** 当前列组的总列数 */
  columnCount: number;
  /** 事件左侧位置百分比 (0-100) */
  left: number;
  /** 事件宽度百分比 (0-100) */
  width: number;
  /** 其他事件属性 */
  [key: string]: unknown;
}

/**
 * 重叠组处理器接口
 */
export interface OverlapGroupHandler {
  /**
   * 获取事件的视觉布局属性
   * @param events - 事件列表
   * @param startTime - 开始时间
   * @param endTime - 结束时间
   * @param visuals - 已有的视觉属性列表
   * @returns 更新后的视觉属性列表
   */
  getVisuals<T>(
    events: unknown,
    startTime: unknown,
    endTime: unknown,
    visuals: T[]
  ): T[];
}

/**
 * 列布局处理函数类型
 * @param events - 事件列表
 * @param startTime - 开始时间
 * @param endTime - 结束时间
 * @param visuals - 已有的视觉属性列表
 * @returns 计算后的事件视觉属性列表
 */
export type ColumnLayoutHandler = <T extends EventVisual>(
  events: unknown,
  startTime: unknown,
  endTime: unknown,
  visuals: T[]
) => T[];

/**
 * 创建列模式布局处理器
 * 
 * 该函数根据事件的重叠情况计算每个事件在列布局中的位置和宽度。
 * 重叠的事件会被分配到不同的列中，每列的宽度相等。
 * 
 * @param config - 配置对象（未使用）
 * @param options - 列布局选项
 * @param context - 上下文对象（未使用）
 * @returns 列布局处理函数
 * 
 * @example
 *