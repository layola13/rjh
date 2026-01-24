/**
 * Calendar Header Component Module
 * 提供日历组件的头部控件,包括年份选择器、月份选择器和模式切换按钮
 */

import type React from 'react';

/**
 * 日历视图模式
 */
type CalendarMode = 'month' | 'year';

/**
 * 日期值类型(泛型,支持不同的日期库实现)
 */
type DateValue<T = any> = T;

/**
 * 日期范围类型
 */
type DateRange<T = any> = [T, T];

/**
 * 日期生成器配置接口
 * 封装日期操作的抽象层,支持不同日期库(如moment、dayjs等)
 */
interface GenerateConfig<T = any> {
  /**
   * 获取年份
   */
  getYear(date: T): number;
  
  /**
   * 获取月份(0-11)
   */
  getMonth(date: T): number;
  
  /**
   * 设置年份
   */
  setYear(date: T, year: number): T;
  
  /**
   * 设置月份
   */
  setMonth(date: T, month: number): T;
  
  /**
   * 本地化配置
   */
  locale: {
    /**
     * 获取短月份名称数组
     */
    getShortMonths(locale: string): string[];
  };
}

/**
 * 本地化配置接口
 */
interface Locale {
  /**
   * "年"的本地化文本
   */
  year?: string;
  
  /**
   * "月"的本地化文本
   */
  month: string;
  
  /**
   * 短月份名称数组(如: ['Jan', 'Feb', ...])
   */
  shortMonths?: string[];
  
  /**
   * 语言代码(如: 'en-US', 'zh-CN')
   */
  locale: string;
}

/**
 * 年份选择器Props
 */
interface YearSelectProps<T = any> {
  /**
   * CSS类名前缀
   */
  prefixCls: string;
  
  /**
   * 是否全屏显示
   */
  fullscreen?: boolean;
  
  /**
   * 有效日期范围
   */
  validRange?: DateRange<T>;
  
  /**
   * 日期生成器配置
   */
  generateConfig: GenerateConfig<T>;
  
  /**
   * 本地化配置
   */
  locale: Locale;
  
  /**
   * 当前选中的日期值
   */
  value: T;
  
  /**
   * 日期变更回调
   */
  onChange: (date: T) => void;
  
  /**
   * 下拉容器的引用
   */
  divRef: React.RefObject<HTMLDivElement>;
}

/**
 * 月份选择器Props
 */
interface MonthSelectProps<T = any> {
  /**
   * CSS类名前缀
   */
  prefixCls: string;
  
  /**
   * 是否全屏显示
   */
  fullscreen?: boolean;
  
  /**
   * 有效日期范围
   */
  validRange?: DateRange<T>;
  
  /**
   * 当前选中的日期值
   */
  value: T;
  
  /**
   * 日期生成器配置
   */
  generateConfig: GenerateConfig<T>;
  
  /**
   * 本地化配置
   */
  locale: Locale;
  
  /**
   * 月份变更回调
   */
  onChange: (date: T) => void;
  
  /**
   * 下拉容器的引用
   */
  divRef: React.RefObject<HTMLDivElement>;
}

/**
 * 模式切换器Props
 */
interface ModeSwitchProps {
  /**
   * CSS类名前缀
   */
  prefixCls: string;
  
  /**
   * 本地化配置
   */
  locale: Locale;
  
  /**
   * 当前模式
   */
  mode: CalendarMode;
  
  /**
   * 是否全屏显示
   */
  fullscreen?: boolean;
  
  /**
   * 模式变更回调
   */
  onModeChange: (mode: CalendarMode) => void;
}

/**
 * 日历头部组件Props
 */
interface CalendarHeaderProps<T = any> {
  /**
   * CSS类名前缀
   */
  prefixCls: string;
  
  /**
   * 是否全屏显示
   */
  fullscreen?: boolean;
  
  /**
   * 当前视图模式
   */
  mode: CalendarMode;
  
  /**
   * 当前选中的日期值
   */
  value: T;
  
  /**
   * 有效日期范围
   */
  validRange?: DateRange<T>;
  
  /**
   * 日期生成器配置
   */
  generateConfig: GenerateConfig<T>;
  
  /**
   * 本地化配置
   */
  locale: Locale;
  
  /**
   * 日期变更回调
   */
  onChange: (date: T) => void;
  
  /**
   * 模式变更回调
   */
  onModeChange: (mode: CalendarMode) => void;
}

/**
 * 年份选择器组件
 * 根据有效范围生成年份选项列表
 */
declare function YearSelect<T = any>(props: YearSelectProps<T>): React.ReactElement;

/**
 * 月份选择器组件
 * 根据当前年份和有效范围生成月份选项列表
 */
declare function MonthSelect<T = any>(props: MonthSelectProps<T>): React.ReactElement;

/**
 * 模式切换组件
 * 在月视图和年视图之间切换
 */
declare function ModeSwitch(props: ModeSwitchProps): React.ReactElement;

/**
 * 日历头部组件
 * 包含年份选择器、月份选择器(月视图下)和模式切换按钮
 * 
 * @example
 *