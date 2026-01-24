/**
 * Calendar 组件类型定义
 * 提供日历选择器的完整类型支持
 */

import type { CSSProperties, ReactNode } from 'react';
import type { Locale } from './locale';
import type { GenerateConfig } from './generate';

/**
 * 日历模式类型
 */
export type CalendarMode = 'month' | 'year';

/**
 * 选择器类型
 */
export type PickerMode = 'date' | 'month';

/**
 * 日期范围元组
 */
export type ValidRange<DateType> = [DateType, DateType];

/**
 * 日历组件属性接口
 */
export interface CalendarProps<DateType = Date> {
  /** 样式类名前缀 */
  prefixCls?: string;
  
  /** 自定义样式类名 */
  className?: string;
  
  /** 自定义样式对象 */
  style?: CSSProperties;
  
  /** 自定义渲染日期单元格（完整内容） */
  dateFullCellRender?: (date: DateType) => ReactNode;
  
  /** 自定义渲染日期单元格（内容部分） */
  dateCellRender?: (date: DateType) => ReactNode;
  
  /** 自定义渲染月份单元格（完整内容） */
  monthFullCellRender?: (date: DateType) => ReactNode;
  
  /** 自定义渲染月份单元格（内容部分） */
  monthCellRender?: (date: DateType) => ReactNode;
  
  /** 自定义渲染头部 */
  headerRender?: (config: HeaderRenderConfig<DateType>) => ReactNode;
  
  /** 当前选中的日期 */
  value?: DateType;
  
  /** 默认选中的日期 */
  defaultValue?: DateType;
  
  /** 禁用日期的判断函数 */
  disabledDate?: (date: DateType) => boolean;
  
  /** 日历模式 */
  mode?: CalendarMode;
  
  /** 有效日期范围 */
  validRange?: ValidRange<DateType>;
  
  /** 是否全屏显示 */
  fullscreen?: boolean;
  
  /** 日期变化回调 */
  onChange?: (date: DateType) => void;
  
  /** 面板变化回调（日期和模式都可能变化） */
  onPanelChange?: (date: DateType, mode: CalendarMode) => void;
  
  /** 选择日期回调 */
  onSelect?: (date: DateType) => void;
  
  /** 国际化配置 */
  locale?: Partial<Locale>;
}

/**
 * 头部渲染配置接口
 */
export interface HeaderRenderConfig<DateType> {
  /** 当前日期值 */
  value: DateType;
  
  /** 当前模式 */
  type: CalendarMode;
  
  /** 日期变化处理函数 */
  onChange: (date: DateType) => void;
  
  /** 模式变化处理函数 */
  onTypeChange: (type: CalendarMode) => void;
}

/**
 * 日期生成器配置接口
 */
export interface GenerateConfig<DateType> {
  /** 获取当前日期 */
  getNow: () => DateType;
  
  /** 获取年份 */
  getYear: (date: DateType) => number;
  
  /** 获取月份 */
  getMonth: (date: DateType) => number;
  
  /** 获取日期 */
  getDate: (date: DateType) => number;
  
  /** 判断日期是否在另一个日期之后 */
  isAfter: (date1: DateType, date2: DateType) => boolean;
  
  /** 国际化配置 */
  locale: {
    /** 获取短月份名称数组 */
    getShortMonths: (locale?: string) => string[];
  };
}

/**
 * 创建日历组件的工厂函数
 * @param generateConfig - 日期生成器配置
 * @returns 日历组件
 */
declare function createCalendar<DateType = Date>(
  generateConfig: GenerateConfig<DateType>
): (props: CalendarProps<DateType>) => ReactNode;

export default createCalendar;