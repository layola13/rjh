/**
 * 日历堆叠模式模块
 * 用于处理日历事件的堆叠布局算法
 */

import type { VTimestamp, TimestampIdentifier } from '../util/timestamp';
import type { CalendarEvent, VisualDescriptor, OverlapGroupHandler } from './common';

/**
 * 视觉节点，表示一个事件在堆叠布局中的位置和关系
 */
export interface VisualNode {
  /** 父节点 */
  parent: VisualNode | null;
  /** 是否与父节点有重叠关系 */
  sibling: boolean;
  /** 在当前层级的索引 */
  index: number;
  /** 关联的视觉描述符 */
  visual: VisualDescriptor;
  /** 事件开始时间戳 */
  start: number;
  /** 事件结束时间戳 */
  end: number;
  /** 子节点列表 */
  children: VisualNode[];
}

/**
 * 时间区间分组，包含在该区间内重叠的所有事件
 */
export interface TimeRangeGroup {
  /** 区间开始时间 */
  start: number;
  /** 区间结束时间 */
  end: number;
  /** 该区间内的所有视觉元素 */
  visuals: VisualDescriptor[];
}

/**
 * 堆叠布局处理函数类型
 */
export type StackLayoutHandler = (
  timestamp: VTimestamp,
  events: CalendarEvent[],
  forceUpdate: boolean,
  weekdaySkips: number[]
) => VisualDescriptor[];

/**
 * 最大宽度百分比
 */
declare const MAX_WIDTH_PERCENT: 100;

/**
 * 最小事件宽度百分比
 */
declare const MIN_EVENT_WIDTH: 5;

/**
 * 宽度扩展系数
 */
declare const WIDTH_MULTIPLIER: 1.7;

/**
 * 创建堆叠布局处理器
 * 
 * @param timestamp - 时间戳对象
 * @param overlapHandler - 重叠事件分组处理器
 * @param weekdaySkips - 需要跳过的星期几
 * @returns 堆叠布局处理函数
 */
export function stack(
  timestamp: VTimestamp,
  overlapHandler: OverlapGroupHandler,
  weekdaySkips: number[]
): StackLayoutHandler;

/**
 * 查找指定范围和索引的相关节点
 * 
 * @param node - 当前节点
 * @param allNodes - 所有节点列表
 * @param minIndex - 最小索引
 * @param maxIndex - 最大索引
 * @param onlyFirstLevel - 是否只返回第一层级的节点
 * @returns 符合条件的节点数组
 */
declare function findRelatedNodes(
  node: VisualNode,
  allNodes: VisualNode[],
  minIndex: number,
  maxIndex: number,
  onlyFirstLevel?: boolean
): VisualNode[];

/**
 * 计算事件结束时间（考虑跨越时间）
 * 
 * @param startTime - 开始时间戳
 * @param duration - 持续时长（分钟）
 * @returns 结束时间戳
 */
declare function calculateEndTime(startTime: number, duration: number): number;

/**
 * 查找可用的列索引
 * 
 * @param node - 当前节点
 * @param existingNodes - 已存在的节点列表
 * @returns 可用的列索引，如果没有可用列则返回 false
 */
declare function findAvailableColumnIndex(
  node: VisualNode,
  existingNodes: VisualNode[]
): number | false;

/**
 * 获取重叠的列索引列表
 * 
 * @param node - 当前节点
 * @param existingNodes - 已存在的节点列表
 * @returns 重叠的列索引数组
 */
declare function getOverlappingColumns(
  node: VisualNode,
  existingNodes: VisualNode[]
): number[];

/**
 * 查找最深的父节点
 * 
 * @param node - 当前节点
 * @param existingNodes - 已存在的节点列表
 * @returns 最深的父节点，如果不存在则返回 null
 */
declare function findDeepestParent(
  node: VisualNode,
  existingNodes: VisualNode[]
): VisualNode | null;

/**
 * 计算节点的最大深度索引
 * 
 * @param node - 节点
 * @returns 最大深度索引
 */
declare function calculateMaxDepthIndex(node: VisualNode): number;

/**
 * 计算节点的有效跨度
 * 
 * @param node - 节点
 * @param allNodes - 所有节点列表
 * @returns 有效跨度值
 */
declare function calculateEffectiveSpan(
  node: VisualNode,
  allNodes: VisualNode[]
): number;

/**
 * 检查节点是否可以扩展到全宽
 * 
 * @param node - 当前节点
 * @param allNodes - 所有节点列表
 * @param weekdaySkips - 需要跳过的星期几
 * @returns 如果可以扩展则返回 true
 */
declare function canExpandToFullWidth(
  node: VisualNode,
  allNodes: VisualNode[],
  weekdaySkips: number[]
): boolean;

/**
 * 将事件分组为时间区间
 * 
 * @param visuals - 视觉描述符列表
 * @param timestampIdentifier - 时间戳标识符
 * @returns 时间区间分组数组
 */
declare function groupEventsByTimeRange(
  visuals: VisualDescriptor[],
  timestampIdentifier: TimestampIdentifier
): TimeRangeGroup[];

/**
 * 应用堆叠布局到节点列表
 * 
 * @param nodes - 节点列表
 * @param weekdaySkips - 需要跳过的星期几
 */
declare function applyStackLayout(
  nodes: VisualNode[],
  weekdaySkips: number[]
): void;