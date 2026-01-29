/**
 * 年代选择器头部组件类型定义
 * @module DecadeHeader
 */

import type React from 'react';

/**
 * 日期生成器配置接口
 * 用于处理不同日期库（如 dayjs、moment）的统一抽象
 */
export interface GenerateConfig<DateType> {
  /**
   * 获取年份
   * @param date - 日期对象
   * @returns 年份数值
   */
  getYear(date: DateType): number;
  
  // 其他日期操作方法根据实际使用情况补充
  [key: string]: any;
}

/**
 * 年代头部组件属性接口
 * @template DateType - 日期类型（支持不同日期库）
 */
export interface DecadeHeaderProps<DateType = any> {
  /**
   * 样式类名前缀
   * @example 'rc-picker'
   */
  prefixCls: string;

  /**
   * 日期生成器配置对象
   * 提供日期操作的统一接口
   */
  generateConfig: GenerateConfig<DateType>;

  /**
   * 当前视图显示的日期
   * 用于计算当前年代范围
   */
  viewDate: DateType;

  /**
   * 点击上一个年代按钮的回调
   * 用于导航到前10年的年代
   */
  onPrevDecade?: () => void;

  /**
   * 点击下一个年代按钮的回调
   * 用于导航到后10年的年代
   */
  onNextDecade?: () => void;

  /**
   * 点击年代文本的回调
   * 通常用于切换到更高层级的视图
   */
  onDecadeClick?: () => void;
}

/**
 * 年代头部组件
 * 显示当前年代范围（如 2020-2029）并提供导航功能
 * 
 * @template DateType - 日期类型
 * @param props - 组件属性
 * @returns React 函数组件
 * 
 * @example
 *