/**
 * 日期选择器生成器模块
 * 用于创建各种类型的日期选择器组件（日期、周、月、年、时间、季度）
 */

import type { ComponentType, RefObject } from 'react';
import type { Locale } from './locale';
import type { GenerateConfig } from './generateConfig';

/**
 * 选择器类型
 */
type PickerType = 'date' | 'week' | 'month' | 'year' | 'time' | 'quarter';

/**
 * 尺寸类型
 */
type SizeType = 'small' | 'middle' | 'large';

/**
 * 配置上下文接口
 */
interface ConfigContext {
  /** 获取CSS类名前缀 */
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  /** 文本方向 */
  direction?: 'ltr' | 'rtl';
  /** 获取弹出容器 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

/**
 * 日期选择器基础属性
 */
interface BasePickerProps<DateType = any> {
  /** CSS类名前缀 */
  prefixCls?: string;
  /** 自定义弹出容器 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** 自定义CSS类名 */
  className?: string;
  /** 尺寸 */
  size?: SizeType;
  /** 是否有边框 */
  bordered?: boolean;
  /** 占位符 */
  placeholder?: string;
  /** 国际化配置 */
  locale?: Partial<Locale>;
  /** 选择器类型 */
  picker?: PickerType;
  /** 日期格式 */
  format?: string | string[];
  /** 时间选择配置 */
  showTime?: boolean | TimePickerConfig;
  /** 是否显示今天按钮 */
  showToday?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
}

/**
 * 时间选择器配置
 */
interface TimePickerConfig {
  /** 时间格式 */
  format?: string;
  /** 其他时间选择器属性 */
  [key: string]: any;
}

/**
 * 日期选择器组件状态
 */
interface PickerState {
  // 组件内部状态
}

/**
 * 日期选择器组件实例方法
 */
interface PickerInstance {
  /** 聚焦选择器 */
  focus: () => void;
  /** 失焦选择器 */
  blur: () => void;
}

/**
 * 生成器返回的日期选择器集合
 */
interface GeneratedPickers {
  /** 标准日期选择器 */
  DatePicker: ComponentType<BasePickerProps>;
  /** 周选择器 */
  WeekPicker: ComponentType<BasePickerProps>;
  /** 月选择器 */
  MonthPicker: ComponentType<BasePickerProps>;
  /** 年选择器 */
  YearPicker: ComponentType<BasePickerProps>;
  /** 时间选择器 */
  TimePicker: ComponentType<BasePickerProps>;
  /** 季度选择器 */
  QuarterPicker: ComponentType<BasePickerProps>;
}

/**
 * 日期选择器生成器
 * 
 * @template DateType - 日期类型（如 Date、Moment、Dayjs 等）
 * @param generateConfig - 日期生成配置对象
 * @returns 包含各类日期选择器组件的对象
 * 
 * @example
 *