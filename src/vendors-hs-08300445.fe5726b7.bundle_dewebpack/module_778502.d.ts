/**
 * 日期选择器头部组件类型定义
 * 用于渲染日期选择面板的头部导航区域
 */

import type { ReactNode } from 'react';
import type { GenerateConfig } from './generate';
import type { Locale } from './interface';

/**
 * 头部组件的属性接口
 * @template DateType 日期类型泛型
 */
export interface HeaderProps<DateType = any> {
  /** 样式类名前缀 */
  prefixCls: string;
  
  /** 日期生成配置对象，用于处理日期相关操作 */
  generateConfig: GenerateConfig<DateType>;
  
  /** 国际化配置对象 */
  locale: Locale;
  
  /** 当前视图显示的日期 */
  viewDate: DateType;
  
  /** 点击下一月按钮的回调函数 */
  onNextMonth: () => void;
  
  /** 点击上一月按钮的回调函数 */
  onPrevMonth: () => void;
  
  /** 点击下一年按钮的回调函数 */
  onNextYear: () => void;
  
  /** 点击上一年按钮的回调函数 */
  onPrevYear: () => void;
  
  /** 点击年份按钮的回调函数 */
  onYearClick?: () => void;
  
  /** 点击月份按钮的回调函数 */
  onMonthClick?: () => void;
}

/**
 * 日期生成配置接口
 * @template DateType 日期类型泛型
 */
export interface GenerateConfig<DateType> {
  /** 获取月份（0-11） */
  getMonth: (date: DateType) => number;
  
  /** 本地化配置 */
  locale: {
    /** 获取短月份名称数组的方法 */
    getShortMonths?: (locale: string) => string[];
  };
}

/**
 * 国际化配置接口
 */
export interface Locale {
  /** 本地化标识符（如 'zh-CN', 'en-US'） */
  locale: string;
  
  /** 年份格式化字符串 */
  yearFormat: string;
  
  /** 月份格式化字符串（可选） */
  monthFormat?: string;
  
  /** 短月份名称数组（可选，如 ['Jan', 'Feb', ...]） */
  shortMonths?: string[];
  
  /** 是否将月份显示在年份之前 */
  monthBeforeYear?: boolean;
}

/**
 * 上下文配置接口
 */
export interface PickerContextProps {
  /** 是否隐藏头部 */
  hideHeader?: boolean;
}

/**
 * 日期选择器头部组件
 * 渲染包含年份、月份切换及导航按钮的头部区域
 * 
 * @template DateType 日期类型泛型
 * @param props 组件属性
 * @returns 头部组件 ReactNode，如果 hideHeader 为 true 则返回 null
 */
declare function Header<DateType = any>(props: HeaderProps<DateType>): ReactNode;

export default Header;