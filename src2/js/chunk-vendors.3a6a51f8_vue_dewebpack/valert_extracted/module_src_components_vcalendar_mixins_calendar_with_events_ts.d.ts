/**
 * VCalendar 日历组件事件混合器类型定义
 * @module calendar-with-events
 */

import Vue, { VNode, CreateElement } from 'vue';
import { PropType } from 'vue/types/options';

/**
 * 时间戳对象，表示特定日期和时间
 */
export interface CalendarTimestamp {
  /** 年份 */
  year: number;
  /** 月份 (1-12) */
  month: number;
  /** 日期 (1-31) */
  day: number;
  /** 星期几 (0-6, 0为周日) */
  weekday: number;
  /** 小时 (0-23) */
  hour: number;
  /** 分钟 (0-59) */
  minute: number;
  /** 是否包含时间信息 */
  hasTime: boolean;
  /** 日期标识符 (YYYY-MM-DD) */
  date: string;
  /** 时间标识符 (YYYY-MM-DD HH:mm) */
  time: string;
}

/**
 * 解析后的日历事件对象
 */
export interface ParsedCalendarEvent {
  /** 原始输入数据 */
  input: Record<string, any>;
  /** 事件开始时间戳 */
  start: CalendarTimestamp;
  /** 事件结束时间戳 */
  end: CalendarTimestamp;
  /** 开始日期标识符 */
  startIdentifier: string;
  /** 结束日期标识符 */
  endIdentifier: string;
  /** 是否为全天事件 */
  allDay: boolean;
  /** 事件索引 */
  index: number;
  /** 事件分类 (如果启用分类模式) */
  category?: string | null;
  /** 事件列索引 (由重叠模式函数计算) */
  column?: number;
}

/**
 * 日历日期对象
 */
export interface CalendarDay extends CalendarTimestamp {
  /** 是否在当前月份/周期外 */
  outside: boolean;
  /** 所属周的所有日期 */
  week: CalendarDay[];
  /** 在周中的索引 */
  index: number;
  /** 事件分类 (分类模式下) */
  category?: string | null;
  /** 计算与给定时间戳的时间差（分钟） */
  timeDelta(time: CalendarTimestamp): number;
  /** 将分钟数转换为Y坐标位置 */
  timeToY(minutes: number): number;
}

/**
 * 事件映射条目
 */
interface EventMapEntry {
  /** 父容器DOM元素 */
  parent: HTMLElement;
  /** "更多"按钮元素 */
  more: HTMLElement | null;
  /** 事件DOM元素列表 */
  events: HTMLElement[];
}

/**
 * 事件作用域插槽参数
 */
export interface EventSlotProps {
  /** 原始事件输入数据 */
  event: Record<string, any>;
  /** 解析后的事件对象 */
  eventParsed: ParsedCalendarEvent;
  /** 事件所在日期 */
  day: CalendarDay;
  /** 是否为事件开始日 */
  start: boolean;
  /** 是否为事件结束日 */
  end: boolean;
  /** 是否为定时事件 */
  timed: boolean;
  /** 是否在当前周期外 */
  outside: boolean;
  /** 是否单行显示 */
  singline: boolean;
  /** 是否跨越中午 */
  overlapsNoon: boolean;
  /** 原生鼠标事件 */
  nativeEvent?: MouseEvent;
  /** 格式化时间函数 */
  formatTime(time: CalendarTimestamp, ampm: boolean): string;
  /** 生成时间范围摘要 */
  timeSummary(): string;
  /** 生成事件摘要 */
  eventSummary(): string;
}

/**
 * 事件重叠模式计算函数
 * @param events - 解析后的事件列表
 * @param firstWeekday - 一周的第一天 (0-6)
 * @param overlapThreshold - 重叠阈值（分钟）
 * @returns 返回事件布局计算函数
 */
export type EventOverlapMode = (
  events: ParsedCalendarEvent[],
  firstWeekday: number,
  overlapThreshold: number
) => (
  day: CalendarDay,
  dayEvents: ParsedCalendarEvent[],
  timed: boolean,
  categoryMode: boolean
) => ParsedCalendarEvent[];

/**
 * 日历事件混合器组件定义
 */
export interface CalendarWithEvents extends Vue {
  // ============ 属性 ============
  
  /** 事件数据数组 */
  events: Record<string, any>[];
  
  /** 事件开始时间字段名或提取函数 */
  eventStart: string;
  
  /** 事件结束时间字段名或提取函数 */
  eventEnd: string;
  
  /** 事件颜色字段名或颜色函数 */
  eventColor: string | ((event: Record<string, any>) => string);
  
  /** 事件文本颜色字段名或颜色函数 */
  eventTextColor: string | ((event: Record<string, any>) => string);
  
  /** 事件名称字段名或提取函数 */
  eventName: string | ((event: Record<string, any>, timedEvent: boolean) => string);
  
  /** 判断事件是否为定时事件的字段名或函数 */
  eventTimed: string | ((event: Record<string, any>) => boolean);
  
  /** 事件分类字段名或提取函数 */
  eventCategory: string | ((event: Record<string, any>) => string | null);
  
  /** 事件重叠模式：字符串模式名或自定义函数 */
  eventOverlapMode: string | EventOverlapMode;
  
  /** 事件重叠阈值（分钟，用于判断是否单行显示） */
  eventOverlapThreshold: string | number;
  
  /** 事件高度（像素） */
  eventHeight: number;
  
  /** 事件底部外边距（像素） */
  eventMarginBottom: number;
  
  /** 是否启用事件水波纹效果 */
  eventRipple: boolean | null;
  
  /** 是否显示"更多"按钮 */
  eventMore: boolean;
  
  /** "更多"按钮文本模板 */
  eventMoreText: string;

  /** 解析后的星期几数组 (继承自 calendar-base) */
  parsedWeekdays: number[];

  /** 当前显示的日期列表 (继承自 calendar-base) */
  days: CalendarDay[];

  // ============ 计算属性 ============
  
  /** 是否没有事件 */
  readonly noEvents: boolean;
  
  /** 解析后的事件列表 */
  readonly parsedEvents: ParsedCalendarEvent[];
  
  /** 解析后的重叠阈值（整数分钟） */
  readonly parsedEventOverlapThreshold: number;
  
  /** 事件颜色提取函数 */
  readonly eventColorFunction: (event: Record<string, any>) => string;
  
  /** 事件是否定时判断函数 */
  readonly eventTimedFunction: (event: Record<string, any>) => boolean;
  
  /** 事件分类提取函数 */
  readonly eventCategoryFunction: (event: Record<string, any>) => string | null;
  
  /** 事件文本颜色提取函数 */
  readonly eventTextColorFunction: (event: Record<string, any>) => string;
  
  /** 事件名称提取函数 */
  readonly eventNameFunction: (event: Record<string, any>, timedEvent: boolean) => string;
  
  /** 事件重叠模式计算函数 */
  readonly eventModeFunction: EventOverlapMode;
  
  /** 事件使用的星期几配置 */
  readonly eventWeekdays: number[];
  
  /** 是否启用分类模式 */
  readonly categoryMode: boolean;

  // ============ 方法 ============
  
  /**
   * 解析事件对象
   * @param event - 原始事件数据
   * @param index - 事件索引，默认为0
   * @returns 解析后的事件对象
   */
  parseEvent(event: Record<string, any>, index?: number): ParsedCalendarEvent;
  
  /**
   * 格式化时间为显示字符串
   * @param time - 时间戳对象
   * @param ampm - 是否显示AM/PM
   * @returns 格式化的时间字符串
   */
  formatTime(time: CalendarTimestamp, ampm: boolean): string;
  
  /**
   * 更新事件可见性（处理"更多"按钮显示逻辑）
   */
  updateEventVisibility(): void;
  
  /**
   * 获取事件DOM元素映射
   * @returns 按日期分组的事件映射
   */
  getEventsMap(): Record<string, EventMapEntry>;
  
  /**
   * 生成全天事件的VNode
   * @param eventData - 包含事件和列信息的数据
   * @param day - 事件所在日期
   * @returns 事件VNode
   */
  genDayEvent(eventData: { event: ParsedCalendarEvent; column?: number }, day: CalendarDay): VNode;
  
  /**
   * 生成定时事件的VNode
   * @param eventData - 包含事件、位置和宽度信息的数据
   * @param day - 事件所在日期
   * @returns 事件VNode或false（如果事件不在当前日期显示）
   */
  genTimedEvent(
    eventData: { event: ParsedCalendarEvent; left: number; width: number },
    day: CalendarDay
  ): VNode | false;
  
  /**
   * 生成事件VNode（内部方法）
   * @param event - 解析后的事件
   * @param slotProps - 插槽属性
   * @param timedEvent - 是否为定时事件
   * @param vNodeData - VNode配置数据
   * @returns 事件VNode
   */
  genEvent(
    event: ParsedCalendarEvent,
    slotProps: Omit<EventSlotProps, 'nativeEvent' | 'formatTime' | 'timeSummary' | 'eventSummary'>,
    timedEvent: boolean,
    vNodeData: Record<string, any>
  ): VNode;
  
  /**
   * 生成事件名称VNode
   * @param summaryFn - 生成摘要内容的函数
   * @returns 名称VNode
   */
  genName(summaryFn: () => string): VNode;
  
  /**
   * 生成占位符VNode
   * @param day - 日期对象
   * @returns 占位符VNode
   */
  genPlaceholder(day: CalendarDay): VNode;
  
  /**
   * 生成"更多"按钮VNode
   * @param day - 日期对象
   * @returns "更多"按钮VNode
   */
  genMore(day: CalendarDay): VNode;
  
  /**
   * 获取当前可见的所有事件
   * @returns 可见事件列表
   */
  getVisibleEvents(): ParsedCalendarEvent[];
  
  /**
   * 判断事件是否属于指定分类
   * @param event - 事件对象
   * @param category - 分类名称
   * @returns 是否匹配
   */
  isEventForCategory(event: ParsedCalendarEvent, category: string | null): boolean;
  
  /**
   * 获取指定日期开始的事件
   * @param day - 日期对象
   * @returns 该日期开始的事件列表
   */
  getEventsForDay(day: CalendarDay): ParsedCalendarEvent[];
  
  /**
   * 获取指定日期的所有全天事件
   * @param day - 日期对象
   * @returns 全天事件列表
   */
  getEventsForDayAll(day: CalendarDay): ParsedCalendarEvent[];
  
  /**
   * 获取指定日期的所有定时事件
   * @param day - 日期对象
   * @returns 定时事件列表
   */
  getEventsForDayTimed(day: CalendarDay): ParsedCalendarEvent[];
  
  /**
   * 获取增强后的作用域插槽（注入事件渲染逻辑）
   * @returns 作用域插槽对象
   */
  getScopedSlots(): Record<string, (props: any) => VNode | VNode[]>;

  /**
   * 获取默认鼠标事件处理器 (继承自 calendar-base)
   * @param eventName - 事件名称
   * @param eventDataFn - 生成事件数据的函数
   * @returns 事件处理器对象
   */
  getDefaultMouseEventHandlers(
    eventName: string,
    eventDataFn: (nativeEvent: MouseEvent) => any
  ): Record<string, (e: MouseEvent) => void>;

  /**
   * 设置文本颜色 (Vuetify colorable mixin)
   * @param color - 颜色值
   * @param data - VNode数据对象
   * @returns 修改后的VNode数据
   */
  setTextColor(color: string | false | undefined, data: Record<string, any>): Record<string, any>;

  /**
   * 设置背景颜色 (Vuetify colorable mixin)
   * @param color - 颜色值
   * @param data - VNode数据对象
   * @returns 修改后的VNode数据
   */
  setBackgroundColor(color: string | false | undefined, data: Record<string, any>): Record<string, any>;

  /**
   * 获取格式化器函数 (继承自 calendar-base)
   * @param options - Intl.DateTimeFormat 配置
   * @returns 格式化函数
   */
  getFormatter(options: Intl.DateTimeFormatOptions): (timestamp: CalendarTimestamp, short: boolean) => string;
}

/**
 * 日历事件混合器组件
 * 为VCalendar组件提供事件渲染和管理功能
 */
declare const CalendarWithEvents: CalendarWithEvents;

export default CalendarWithEvents;