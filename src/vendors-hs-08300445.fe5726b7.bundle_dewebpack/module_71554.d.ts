/**
 * 年代选择器头部组件
 * 用于在日期选择器中展示和导航年代范围（如 2020-2029）
 */

import type React from 'react';

/**
 * 日期生成器配置接口
 * 提供日期操作的抽象方法，支持不同日期库（如 dayjs、moment）
 */
export interface GenerateConfig<DateType> {
  /**
   * 获取日期的年份
   * @param date - 日期对象
   * @returns 年份数值
   */
  getYear(date: DateType): number;
  
  // 其他可能的日期操作方法...
  [key: string]: unknown;
}

/**
 * 年代头部组件的属性接口
 * @template DateType - 日期对象类型，由具体日期库决定
 */
export interface DecadeHeaderProps<DateType> {
  /**
   * CSS 类名前缀，用于构建 BEM 风格的类名
   * @example 'rc-picker'
   */
  prefixCls: string;
  
  /**
   * 日期生成器配置对象
   */
  generateConfig: GenerateConfig<DateType>;
  
  /**
   * 当前视图展示的日期
   */
  viewDate: DateType;
  
  /**
   * 点击上一个年代按钮的回调
   */
  onPrevDecade?: () => void;
  
  /**
   * 点击下一个年代按钮的回调
   */
  onNextDecade?: () => void;
  
  /**
   * 点击年代范围文本的回调
   */
  onDecadeClick?: () => void;
}

/**
 * 年代选择器头部组件
 * 
 * 展示当前年代范围（如 2020-2029），并提供前后年代导航功能
 * 
 * @template DateType - 日期对象类型
 * @param props - 组件属性
 * @returns React 元素或 null（当 hideHeader 为 true 时）
 * 
 * @example
 *