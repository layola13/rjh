/**
 * 时间选择器列组件的类型定义
 * 用于渲染时间选择器中的单个列（小时/分钟/秒）
 */

import type { ReactElement, Context } from 'react';

/**
 * 时间单位项接口
 * 表示列表中的一个可选项（例如一个小时、分钟或秒）
 */
export interface TimeUnit {
  /** 选项的值 */
  value: number;
  /** 选项的显示标签 */
  label: string | number;
  /** 是否禁用该选项 */
  disabled?: boolean;
}

/**
 * TimeColumn 组件的属性接口
 */
export interface TimeColumnProps {
  /** 样式类名前缀 */
  prefixCls: string;
  /** 时间单位数组（小时、分钟或秒的选项列表） */
  units: TimeUnit[];
  /** 选择回调函数 */
  onSelect: (value: number) => void;
  /** 当前选中的值 */
  value: number;
  /** 当前列是否处于激活状态 */
  active: boolean;
  /** 是否隐藏禁用的选项 */
  hideDisabledOptions?: boolean;
}

/**
 * 时间选择器上下文接口
 */
export interface TimePickerContextValue {
  /** 面板是否打开 */
  open: boolean;
}

/**
 * 时间选择器上下文
 */
export declare const TimePickerContext: Context<TimePickerContextValue>;

/**
 * 时间列组件
 * 渲染时间选择器中的单个列（小时/分钟/秒）
 * 
 * @param props - 组件属性
 * @returns 渲染的时间列元素
 * 
 * @example
 *