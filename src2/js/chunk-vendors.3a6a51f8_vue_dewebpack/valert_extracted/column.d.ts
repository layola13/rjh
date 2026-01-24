/**
 * 列模式布局计算模块
 * 用于处理日历事件的列式布局，自动计算重叠事件的位置和宽度
 */

import type { OverlapGroupHandler, EventVisual, CalendarEvent } from './common';

/**
 * 列布局配置选项
 */
export interface ColumnOptions {
  /** 是否启用列布局计算 */
  enableColumnLayout?: boolean;
  /** 最小列宽百分比 */
  minColumnWidth?: number;
}

/**
 * 事件视觉属性（扩展）
 */
export interface ColumnEventVisual extends EventVisual {
  /** 列索引（从0开始） */
  column: number;
  /** 总列数 */
  columnCount: number;
  /** 左侧位置百分比（0-100） */
  left: number;
  /** 宽度百分比（0-100） */
  width: number;
}

/**
 * 列布局处理器函数签名
 * 
 * @param events - 日历事件数组
 * @param startTime - 时间范围起始时间戳
 * @param shouldApplyLayout - 是否应用列布局计算
 * @param visuals - 已有的视觉属性数组（可选）
 * @returns 包含列布局信息的事件视觉属性数组
 */
export type ColumnLayoutHandler = (
  events: CalendarEvent[],
  startTime: number,
  shouldApplyLayout: boolean,
  visuals?: EventVisual[]
) => ColumnEventVisual[];

/**
 * 创建列模式布局处理器
 * 
 * 此函数用于生成一个列布局处理器，能够：
 * 1. 检测重叠的日历事件
 * 2. 为每个事件分配列位置
 * 3. 计算事件的宽度和左侧偏移量（百分比）
 * 
 * @param events - 日历事件数组
 * @param options - 列布局配置选项
 * @param overlapHandler - 重叠组处理器（来自common模块）
 * @returns 列布局处理器函数
 * 
 * @example
 *