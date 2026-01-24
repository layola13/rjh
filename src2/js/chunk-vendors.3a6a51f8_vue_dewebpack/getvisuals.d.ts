/**
 * 日历视图模式通用工具模块
 * 提供事件可视化布局、重叠检测、分组处理等核心功能
 */

/**
 * 事件可视化信息接口
 * 描述事件在日历视图中的布局属性
 */
export interface EventVisual<T = any> {
  /** 原始事件对象 */
  event: T;
  /** 当前列所在组的总列数 */
  columnCount: number;
  /** 事件所在的列索引（从0开始） */
  column: number;
  /** 左侧偏移百分比 */
  left: number;
  /** 宽度百分比 */
  width: number;
}

/**
 * 事件对象接口
 * 定义日历事件的必需属性
 */
export interface CalendarEvent {
  /** 事件开始时间戳标识符（毫秒） */
  startTimestampIdentifier: number;
  /** 事件结束时间戳标识符（毫秒） */
  endTimestampIdentifier: number;
  /** 事件开始日期标识符（YYYYMMDD格式） */
  startIdentifier: number;
  /** 事件结束日期标识符（YYYYMMDD格式） */
  endIdentifier: number;
}

/**
 * 重叠分组接口
 * 用于管理时间范围内重叠的事件集合
 */
export interface OverlapGroup<T = any> {
  /** 分组内所有事件的最早开始时间 */
  start: number;
  /** 分组内所有事件的最晚结束时间 */
  end: number;
  /** 分组内的事件可视化对象列表 */
  visuals: EventVisual<T>[];
}

/**
 * 时间戳对象接口
 */
export interface Timestamp {
  /** 星期几（0-6，0表示周日） */
  weekday: number;
  /** 其他时间戳属性 */
  [key: string]: any;
}

/**
 * 重叠分组处理器接口
 * 用于管理和处理事件的重叠分组逻辑
 */
export interface OverlapGroupHandler<T = any> {
  /** 当前活跃的重叠分组列表 */
  groups: OverlapGroup<T>[];
  /** 当前所有分组的最小时间标识符 */
  min: number;
  /** 当前所有分组的最大时间标识符 */
  max: number;
  /** 重置处理器状态 */
  reset(): void;
  /**
   * 处理事件列表并生成可视化布局
   * @param timestamp - 时间戳对象
   * @param events - 待处理的事件列表
   * @param useTimestamp - 是否使用精确时间戳（true）或仅日期（false）
   * @param forceReset - 是否强制重置分组
   * @returns 处理后的事件可视化对象列表
   */
  getVisuals(
    timestamp: Timestamp,
    events: T[],
    useTimestamp: boolean,
    forceReset?: boolean
  ): EventVisual<T>[];
}

/**
 * 初始化事件可视化对象
 * 将原始事件转换为可视化对象，并按时间顺序排序
 * 
 * @param events - 原始事件列表
 * @param minTime - 最小时间限制（用于裁剪事件开始时间），默认为0
 * @returns 排序后的事件可视化对象列表
 * 
 * @remarks
 * 排序规则：
 * 1. 优先按开始时间升序（考虑minTime裁剪）
 * 2. 开始时间相同时，按结束时间降序（长事件优先）
 */
export function getVisuals<T extends CalendarEvent>(
  events: T[],
  minTime?: number
): EventVisual<T>[];

/**
 * 检测两个时间范围是否存在重叠
 * 
 * @param start1 - 第一个时间范围的开始时间
 * @param end1 - 第一个时间范围的结束时间
 * @param start2 - 第二个时间范围的开始时间
 * @param end2 - 第二个时间范围的结束时间
 * @param inclusive - 是否包含边界（true: <=/>= 比较，false: </> 比较），默认为true
 * @returns 如果存在重叠返回true，否则返回false
 */
export function hasOverlap(
  start1: number,
  end1: number,
  start2: number,
  end2: number,
  inclusive?: boolean
): boolean;

/**
 * 设置分组内所有事件的列数
 * 将分组总数同步到每个事件的columnCount属性
 * 
 * @param groups - 重叠分组列表
 */
export function setColumnCount<T = any>(groups: OverlapGroup<T>[]): void;

/**
 * 获取事件的时间戳范围（精确到毫秒）
 * 
 * @param event - 日历事件对象
 * @returns 元组 [开始时间戳, 结束时间戳]
 */
export function getRange(event: CalendarEvent): [number, number];

/**
 * 获取事件的日期范围（仅日期标识符）
 * 
 * @param event - 日历事件对象
 * @returns 元组 [开始日期标识符, 结束日期标识符]
 */
export function getDayRange(event: CalendarEvent): [number, number];

/**
 * 获取事件在指定日期的标准化时间范围
 * 将事件时间范围裁剪到当前日期（dayStart ~ dayStart+86400000ms）
 * 
 * @param event - 日历事件对象
 * @param dayStart - 当前日期的开始时间戳（毫秒）
 * @returns 元组 [裁剪后的开始时间戳, 裁剪后的结束时间戳]
 * 
 * @remarks
 * 用于处理跨天事件在单日视图中的显示范围
 */
export function getNormalizedRange(
  event: CalendarEvent,
  dayStart: number
): [number, number];

/**
 * 查找可容纳新事件的空闲分组
 * 遍历现有分组，找到第一个与新事件不重叠的分组
 * 
 * @param groups - 现有的重叠分组列表
 * @param start - 新事件的开始时间
 * @param end - 新事件的结束时间
 * @param useTimestamp - 是否使用精确时间戳比较（true）或仅日期比较（false）
 * @returns 可用分组的索引，如果所有分组都重叠则返回-1
 */
export function getOpenGroup<T = any>(
  groups: OverlapGroup<T>[],
  start: number,
  end: number,
  useTimestamp: boolean
): number;

/**
 * 创建重叠分组处理器
 * 用于管理特定星期的事件分组和布局计算
 * 
 * @param weekday - 目标星期（0-6，0表示周日）
 * @returns 重叠分组处理器实例
 * 
 * @remarks
 * 处理器会在星期变化时自动重置状态，确保不同日期的事件分组独立
 */
export function getOverlapGroupHandler<T extends CalendarEvent>(
  weekday: number
): OverlapGroupHandler<T>;