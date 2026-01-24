/**
 * 年份面板头部组件
 * 用于显示年份选择器的头部导航区域
 */

import type { GenerateConfig } from './generateConfig';
import type { Locale } from './locale';

/**
 * 年份面板头部组件的属性接口
 * @template DateType 日期类型泛型
 */
export interface YearHeaderProps<DateType = any> {
  /**
   * 组件样式类名前缀
   * @example 'rc-picker'
   */
  prefixCls: string;

  /**
   * 日期生成配置对象，用于处理不同日期库的统一接口
   */
  generateConfig: GenerateConfig<DateType>;

  /**
   * 国际化语言配置
   */
  locale: Locale;

  /**
   * 当前视图显示的日期
   */
  viewDate: DateType;

  /**
   * 点击下一年按钮的回调函数
   */
  onNextYear?: () => void;

  /**
   * 点击上一年按钮的回调函数
   */
  onPrevYear?: () => void;

  /**
   * 点击年份按钮的回调函数
   */
  onYearClick?: () => void;
}

/**
 * 面板上下文接口
 */
export interface PanelContextProps {
  /**
   * 是否隐藏头部
   * @default false
   */
  hideHeader?: boolean;
}

/**
 * 年份面板头部组件
 * 
 * 渲染年份选择器的头部，包含：
 * - 上一年/下一年导航按钮
 * - 当前年份显示按钮
 * 
 * @template DateType 日期类型泛型
 * @param props 组件属性
 * @returns 年份头部组件或null（当hideHeader为true时）
 * 
 * @example
 *