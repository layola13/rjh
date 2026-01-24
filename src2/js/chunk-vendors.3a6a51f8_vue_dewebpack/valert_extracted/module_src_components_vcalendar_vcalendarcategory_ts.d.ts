/**
 * VCalendarCategory 组件类型定义
 * 提供类别视图的日历组件，支持将时间段按类别分组显示
 */

import Vue, { VNode, CreateElement } from 'vue';
import { VCalendarDaily } from './VCalendarDaily';

/**
 * 时间戳对象接口
 */
export interface CalendarTimestamp {
  date: string;
  time: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: number;
  hasDay: boolean;
  hasTime: boolean;
  past: boolean;
  present: boolean;
  future: boolean;
}

/**
 * 日历周数据接口
 */
export interface CalendarWeek {
  days: CalendarTimestamp[];
}

/**
 * 日历作用域对象接口
 */
export interface CalendarScope {
  /** 当前日期时间戳 */
  timestamp: CalendarTimestamp;
  /** 当前周数据 */
  week?: CalendarTimestamp[];
  /** 类别索引 */
  index?: number;
  /** 类别名称 */
  category?: string | null;
}

/**
 * 鼠标事件作用域接口
 */
export interface MouseEventScope extends CalendarScope {
  nativeEvent: MouseEvent;
}

/**
 * VCalendarCategory 组件属性接口
 */
export interface VCalendarCategoryProps {
  /**
   * 类别列表
   * 可以是逗号分隔的字符串或字符串数组
   * @example "工作, 个人, 其他" 或 ["工作", "个人", "其他"]
   */
  categories?: string | string[];

  /**
   * 无效类别的显示文本
   * 当类别为 null 或 undefined 时显示的占位文本
   * @default "未分类"
   */
  categoryForInvalid?: string;

  /**
   * 日历天数数据
   */
  days?: CalendarTimestamp[];
}

/**
 * VCalendarCategory 组件计算属性接口
 */
export interface VCalendarCategoryComputed {
  /**
   * 组件CSS类名对象
   */
  classes: Record<string, boolean>;

  /**
   * 解析后的类别数组
   */
  parsedCategories: string[];

  /**
   * 主题类名对象
   */
  themeClasses: Record<string, boolean>;
}

/**
 * VCalendarCategory 组件方法接口
 */
export interface VCalendarCategoryMethods {
  /**
   * 生成日历头部元素
   * @param day - 日期时间戳对象
   * @param index - 日期索引
   * @returns VNode 数组
   */
  genDayHeader(day: CalendarTimestamp, index: number): VNode[];

  /**
   * 获取包含类别信息的作用域对象
   * @param scope - 基础作用域对象
   * @param category - 类别名称
   * @returns 扩展后的作用域对象
   */
  getCategoryScope(scope: CalendarScope, category: string): CalendarScope;

  /**
   * 生成单个类别的头部元素
   * @param day - 日期时间戳对象
   * @param scope - 类别作用域对象
   * @returns VNode 元素
   */
  genDayHeaderCategory(day: CalendarTimestamp, scope: CalendarScope): VNode;

  /**
   * 生成类别标题元素
   * @param category - 类别名称（可为 null）
   * @returns VNode 元素
   */
  genDayHeaderCategoryTitle(category: string | null): VNode;

  /**
   * 生成日历主体内容元素
   * @param day - 日期时间戳对象
   * @returns VNode 数组
   */
  genDayBody(day: CalendarTimestamp): VNode[];

  /**
   * 生成单个类别的主体内容元素
   * @param day - 日期时间戳对象
   * @param category - 类别名称
   * @returns VNode 元素
   */
  genDayBodyCategory(day: CalendarTimestamp, category: string): VNode;

  /**
   * 获取默认鼠标事件处理器
   * @param eventName - 事件名称
   * @param scopeGetter - 作用域获取函数
   * @returns 事件处理器对象
   */
  getDefaultMouseEventHandlers(
    eventName: string,
    scopeGetter: (event: MouseEvent) => CalendarScope
  ): Record<string, (event: MouseEvent) => void>;

  /**
   * 获取插槽作用域对象
   * @param data - 数据对象
   * @returns 作用域对象
   */
  getSlotScope(data: CalendarTimestamp | CalendarScope): CalendarScope;

  /**
   * 根据鼠标事件获取时间戳
   * @param event - 鼠标事件对象
   * @param day - 日期时间戳对象
   * @returns 时间戳对象
   */
  getTimestampAtEvent(event: MouseEvent, day: CalendarTimestamp): CalendarTimestamp;
}

/**
 * VCalendarCategory 组件类型定义
 * 继承自 VCalendarDaily，添加类别分组功能
 */
export interface VCalendarCategory extends Vue {
  // Props
  categories?: string | string[];
  categoryForInvalid: string;
  days: CalendarTimestamp[];

  // Computed
  readonly classes: Record<string, boolean>;
  readonly parsedCategories: string[];

  // Methods
  genDayHeader(day: CalendarTimestamp, index: number): VNode[];
  getCategoryScope(scope: CalendarScope, category: string): CalendarScope;
  genDayHeaderCategory(day: CalendarTimestamp, scope: CalendarScope): VNode;
  genDayHeaderCategoryTitle(category: string | null): VNode;
  genDayBody(day: CalendarTimestamp): VNode[];
  genDayBodyCategory(day: CalendarTimestamp, category: string): VNode;
  getDefaultMouseEventHandlers(
    eventName: string,
    scopeGetter: (event: MouseEvent) => CalendarScope
  ): Record<string, (event: MouseEvent) => void>;
  getSlotScope(data: CalendarTimestamp | CalendarScope): CalendarScope;
  getTimestampAtEvent(event: MouseEvent, day: CalendarTimestamp): CalendarTimestamp;
}

/**
 * VCalendarCategory 组件构造函数
 */
declare const VCalendarCategory: {
  new (): VCalendarCategory;
  extend(options: any): typeof VCalendarCategory;
};

export default VCalendarCategory;