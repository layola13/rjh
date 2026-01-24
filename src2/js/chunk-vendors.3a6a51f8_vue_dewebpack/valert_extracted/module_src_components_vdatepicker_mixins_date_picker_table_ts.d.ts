/**
 * 日期选择器表格混合组件类型定义
 * @module VDatePickerTable
 */

import Vue from 'vue';
import { VNode, VNodeData, PropType } from 'vue';

/**
 * 日期字符串类型 (格式: YYYY-MM-DD)
 */
export type DateString = string;

/**
 * 事件配置类型
 * - 数组: 包含事件日期的数组
 * - 函数: 接收日期返回是否有事件
 * - 对象: 日期到事件配置的映射
 */
export type EventsConfig = DateString[] | ((date: DateString) => boolean) | Record<DateString, boolean | string | string[]>;

/**
 * 事件颜色配置类型
 * - 字符串: 单一颜色名称
 * - 数组: 颜色名称数组
 * - 函数: 接收日期返回颜色
 * - 对象: 日期到颜色的映射
 */
export type EventColorConfig = string | string[] | ((date: DateString) => string | string[]) | Record<DateString, string | string[]>;

/**
 * 日期允许函数类型
 * @param date - 要验证的日期字符串
 * @returns 是否允许该日期
 */
export type AllowedDatesFunction = (date: DateString) => boolean;

/**
 * 日期格式化函数类型
 * @param date - 要格式化的日期字符串
 * @returns 格式化后的字符串
 */
export type DateFormatFunction = (date: DateString) => string;

/**
 * Touch手势回调函数类型
 * @param offset - 滑动偏移量
 */
export type TouchHandler = (offset: number) => void;

/**
 * 滚轮事件处理函数类型
 * @param deltaY - 滚轮滚动的Y轴偏移量
 * @returns 新的表格日期
 */
export type WheelHandler = (deltaY: number) => DateString;

/**
 * Touch事件对象
 */
export interface TouchEvent {
  /** X轴偏移量 */
  offsetX: number;
  /** Y轴偏移量 */
  offsetY: number;
}

/**
 * Touch指令配置
 */
export interface TouchDirective {
  /** 指令名称 */
  name: 'touch';
  /** 指令值配置 */
  value: {
    /** 向左滑动处理器 */
    left: (event: TouchEvent) => void;
    /** 向右滑动处理器 */
    right: (event: TouchEvent) => void;
  };
}

/**
 * 组件数据接口
 */
export interface DatePickerTableData {
  /** 是否处于反向过渡状态 */
  isReversing: boolean;
  /** 滚轮事件节流函数 */
  wheelThrottle: ((event: WheelEvent, handler: WheelHandler) => void) | null;
}

/**
 * 组件属性接口
 */
export interface DatePickerTableProps {
  /** 允许的日期验证函数 */
  allowedDates?: AllowedDatesFunction;
  /** 当前日期 (高亮显示但未选中) */
  current?: DateString;
  /** 是否禁用整个组件 */
  disabled?: boolean;
  /** 日期格式化函数 */
  format?: DateFormatFunction;
  /** 事件配置 (标记特定日期有事件) */
  events?: EventsConfig;
  /** 事件颜色配置 */
  eventColor?: EventColorConfig;
  /** 最小可选日期 */
  min?: DateString;
  /** 最大可选日期 */
  max?: DateString;
  /** 是否启用范围选择模式 */
  range?: boolean;
  /** 是否只读 (可浏览但不可选择) */
  readonly?: boolean;
  /** 是否启用滚轮和触摸滑动 */
  scrollable?: boolean;
  /** 当前显示的表格日期 (年月) */
  tableDate: DateString;
  /** 选中的日期值 (单选或多选) */
  value?: DateString | DateString[];
}

/**
 * 计算属性接口
 */
export interface DatePickerTableComputed {
  /** 根据RTL和反转状态计算的过渡动画名称 */
  computedTransition: string;
  /** 显示的月份 (0-11) */
  displayedMonth: number;
  /** 显示的年份 */
  displayedYear: number;
}

/**
 * 按钮类对象接口
 */
export interface ButtonClasses {
  /** 默认尺寸 */
  'v-size--default': boolean;
  /** 当前日期标记 */
  'v-date-picker-table__current': boolean;
  /** 激活状态 (选中) */
  'v-btn--active': boolean;
  /** 扁平样式 */
  'v-btn--flat': boolean;
  /** 文本样式 */
  'v-btn--text': boolean;
  /** 圆角样式 */
  'v-btn--rounded': boolean;
  /** 禁用状态 */
  'v-btn--disabled': boolean;
  /** 轮廓样式 */
  'v-btn--outlined': boolean;
  [key: string]: boolean;
}

/**
 * 组件方法接口
 */
export interface DatePickerTableMethods {
  /**
   * 生成按钮的CSS类名对象
   * @param isAllowed - 日期是否被允许选择
   * @param isFloating - 是否为浮动样式 (圆形按钮)
   * @param isSelected - 是否被选中
   * @param isCurrent - 是否为当前日期
   * @returns CSS类名对象
   */
  genButtonClasses(
    isAllowed: boolean,
    isFloating: boolean,
    isSelected: boolean,
    isCurrent: boolean
  ): ButtonClasses;

  /**
   * 生成按钮的事件监听器对象
   * @param date - 日期字符串
   * @param isAllowed - 是否允许选择
   * @param eventType - 事件类型标识
   * @returns 事件监听器对象
   */
  genButtonEvents(
    date: DateString,
    isAllowed: boolean,
    eventType: string
  ): Record<string, Function> | undefined;

  /**
   * 生成日期按钮VNode
   * @param date - 日期字符串
   * @param isFloating - 是否为浮动样式
   * @param eventType - 事件类型
   * @param formatter - 日期格式化函数
   * @returns 按钮VNode
   */
  genButton(
    date: DateString,
    isFloating: boolean,
    eventType: string,
    formatter: (date: DateString) => string | number
  ): VNode;

  /**
   * 获取指定日期的事件颜色数组
   * @param date - 日期字符串
   * @returns 颜色字符串数组
   */
  getEventColors(date: DateString): string[];

  /**
   * 生成事件指示器VNode
   * @param date - 日期字符串
   * @returns 事件指示器VNode或null
   */
  genEvents(date: DateString): VNode | null;

  /**
   * 处理滚轮事件 (节流)
   * @param event - 滚轮事件对象
   * @param handler - 日期变更处理函数
   */
  wheel(event: WheelEvent, handler: WheelHandler): void;

  /**
   * 处理触摸滑动
   * @param direction - 滑动方向 (1: 下一个, -1: 上一个)
   * @param handler - 日期变更处理函数
   */
  touch(direction: number, handler: WheelHandler): void;

  /**
   * 生成完整的表格VNode
   * @param className - 根容器类名
   * @param tableContent - 表格内容VNode数组
   * @param handler - 日期变更处理函数
   * @returns 表格容器VNode
   */
  genTable(
    className: string,
    tableContent: VNode[],
    handler: WheelHandler
  ): VNode;

  /**
   * 判断日期是否被选中
   * @param date - 日期字符串
   * @returns 是否选中
   */
  isSelected(date: DateString): boolean;
}

/**
 * VDatePickerTable 混合组件类型定义
 * 为日期选择器的日、月、年视图提供通用功能
 */
declare const DatePickerTable: Vue.ExtendedVue<
  Vue,
  DatePickerTableData,
  DatePickerTableMethods,
  DatePickerTableComputed,
  DatePickerTableProps
>;

export default DatePickerTable;