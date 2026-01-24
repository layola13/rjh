/**
 * VCalendar 组件类型定义
 * 一个功能强大的日历组件，支持多种视图模式（月、周、日、分类等）
 */

import { VueConstructor } from 'vue';
import { VNode, CreateElement } from 'vue/types/umd';

/**
 * 时间戳对象接口
 */
export interface Timestamp {
  /** 日期字符串，格式：YYYY-MM-DD */
  date: string;
  /** 时间字符串，格式：HH:mm */
  time?: string;
  /** 年份 */
  year: number;
  /** 月份（1-12） */
  month: number;
  /** 日期（1-31） */
  day: number;
  /** 星期几（0-6，0为周日） */
  weekday: number;
  /** 小时（0-23） */
  hour?: number;
  /** 分钟（0-59） */
  minute?: number;
}

/**
 * 日历事件接口
 */
export interface CalendarEvent {
  /** 事件名称 */
  name: string;
  /** 开始时间 */
  start: string | Date | Timestamp;
  /** 结束时间 */
  end: string | Date | Timestamp;
  /** 事件分类 */
  category?: string;
  /** 事件颜色 */
  color?: string;
  /** 是否为定时事件 */
  timed?: boolean;
  [key: string]: unknown;
}

/**
 * 日历类型枚举
 */
export type CalendarType = 
  | 'month'          // 月视图
  | 'week'           // 周视图
  | 'day'            // 日视图
  | '4day'           // 4天视图
  | 'custom-weekly'  // 自定义周视图
  | 'custom-daily'   // 自定义日视图
  | 'category';      // 分类视图

/**
 * 分类信息接口
 */
export interface CategoryInfo {
  /** 分类索引 */
  index: number;
  /** 该分类下的事件数量 */
  count: number;
}

/**
 * 分类映射类型
 */
export type CategoryMap = Record<string, CategoryInfo>;

/**
 * 渲染属性接口
 */
export interface RenderProps {
  /** 渲染使用的组件构造器 */
  component: VueConstructor;
  /** 日历起始时间戳 */
  start: Timestamp;
  /** 日历结束时间戳 */
  end: Timestamp;
  /** 最大显示天数 */
  maxDays: number;
  /** 显示的星期几数组（0-6） */
  weekdays: number[];
  /** 分类列表 */
  categories: string[];
}

/**
 * 日期变更事件载荷
 */
export interface ChangeEventPayload {
  /** 新的起始时间戳 */
  start: Timestamp;
  /** 新的结束时间戳 */
  end: Timestamp;
}

/**
 * 日期点击事件载荷
 */
export interface ClickDateEventPayload {
  /** 被点击的日期字符串 */
  date: string;
  [key: string]: unknown;
}

/**
 * 格式化器选项接口
 */
export interface FormatterOptions {
  /** 时区 */
  timeZone: string;
  /** 月份格式 */
  month: 'long' | 'short' | 'numeric' | '2-digit';
}

/**
 * VCalendar 组件数据接口
 */
export interface VCalendarData {
  /** 上一次的起始时间戳 */
  lastStart: Timestamp | null;
  /** 上一次的结束时间戳 */
  lastEnd: Timestamp | null;
}

/**
 * VCalendar 组件计算属性接口
 */
export interface VCalendarComputed {
  /** 解析后的当前值时间戳 */
  parsedValue: Timestamp;
  /** 解析后的分类天数 */
  parsedCategoryDays: number;
  /** 渲染所需的属性对象 */
  renderProps: RenderProps;
  /** 事件显示的星期几 */
  eventWeekdays: number[];
  /** 是否为分类模式 */
  categoryMode: boolean;
  /** 日历标题字符串 */
  title: string;
  /** 月份长格式化器 */
  monthLongFormatter: (timestamp: Timestamp, withYear: boolean) => string;
  /** 月份短格式化器 */
  monthShortFormatter: (timestamp: Timestamp, withYear: boolean) => string;
  /** 解析后的分类数组 */
  parsedCategories: string[];
}

/**
 * VCalendar 组件属性接口
 */
export interface VCalendarProps {
  /** 当前日历值（日期字符串、Date对象或时间戳对象） */
  value?: string | Date | Timestamp;
  /** 日历类型 */
  type?: CalendarType;
  /** 事件数组 */
  events?: CalendarEvent[];
  /** 事件颜色映射 */
  eventColor?: string | ((event: CalendarEvent) => string);
  /** 是否隐藏事件 */
  noEvents?: boolean;
  /** 分类天数 */
  categoryDays?: number | string;
  /** 分类数组或逗号分隔的字符串 */
  categories?: string[] | string;
  /** 动态隐藏空分类 */
  categoryHideDynamic?: boolean;
  /** 显示所有分类（包括无事件的） */
  categoryShowAll?: boolean;
  /** 无效分类的默认分类名 */
  categoryForInvalid?: string;
  /** 起始日期（用于自定义视图） */
  start?: string | Date | Timestamp;
  /** 结束日期（用于自定义视图） */
  end?: string | Date | Timestamp;
  /** 最大显示天数 */
  maxDays?: number;
  /** 显示的星期几 */
  weekdays?: number[];
  [key: string]: unknown;
}

/**
 * VCalendar 组件方法接口
 */
export interface VCalendarMethods {
  /**
   * 检查日期范围变更并触发 change 事件
   */
  checkChange(): void;

  /**
   * 移动日历视图
   * @param delta - 移动的步数（正数向前，负数向后）
   */
  move(delta?: number): void;

  /**
   * 向后移动日历视图
   * @param count - 移动步数，默认为 1
   */
  next(count?: number): void;

  /**
   * 向前移动日历视图
   * @param count - 移动步数，默认为 1
   */
  prev(count?: number): void;

  /**
   * 将时间转换为 Y 轴坐标
   * @param time - 时间字符串或时间戳
   * @param clamp - 是否限制在可见范围内
   * @returns Y 轴坐标值，失败返回 false
   */
  timeToY(time: string | Timestamp, clamp?: boolean): number | false;

  /**
   * 计算时间差对应的像素值
   * @param time - 时间字符串或时间戳
   * @returns 像素值，失败返回 false
   */
  timeDelta(time: string | Timestamp): number | false;

  /**
   * 将分钟数转换为像素值
   * @param minutes - 分钟数
   * @returns 像素值，失败返回 -1
   */
  minutesToPixels(minutes: number): number;

  /**
   * 滚动到指定时间
   * @param time - 时间字符串或时间戳
   * @returns 是否成功滚动
   */
  scrollToTime(time: string | Timestamp): boolean;

  /**
   * 解析时间戳
   * @param input - 输入的时间字符串、Date 对象或时间戳
   * @param required - 是否必需
   * @returns 解析后的时间戳对象
   */
  parseTimestamp(input: string | Date | Timestamp, required: boolean): Timestamp;

  /**
   * 将时间戳转换为 Date 对象
   * @param timestamp - 时间戳对象
   * @returns Date 对象
   */
  timestampToDate(timestamp: Timestamp): Date;

  /**
   * 获取分类列表（根据事件动态生成）
   * @param categories - 原始分类数组
   * @returns 处理后的分类数组
   */
  getCategoryList(categories: string[]): string[];

  /**
   * 获取格式化器函数
   * @param options - 格式化选项
   * @returns 格式化器函数
   */
  getFormatter(options: FormatterOptions): (timestamp: Timestamp, withYear: boolean) => string;

  /**
   * 更新事件可见性
   */
  updateEventVisibility(): void;

  /**
   * 获取作用域插槽
   * @returns 作用域插槽对象
   */
  getScopedSlots(): Record<string, unknown>;
}

/**
 * VCalendar 组件完整接口
 */
export interface VCalendar extends VCalendarData, VCalendarComputed, VCalendarMethods {
  /** 组件名称 */
  readonly name: 'v-calendar';
  /** 组件属性 */
  readonly $props: VCalendarProps;
}

/**
 * VCalendar 组件默认导出
 * 基于 calendar-with-events mixin 扩展的 Vue 组件
 */
declare const VCalendar: VueConstructor<VCalendar>;

export default VCalendar;