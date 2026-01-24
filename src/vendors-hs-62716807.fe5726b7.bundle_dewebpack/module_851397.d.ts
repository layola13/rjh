/**
 * 数字格式化组件的类型定义
 * 用于将数字按照指定格式进行展示，支持自定义分隔符、精度和格式化函数
 */

import type { ReactElement, ReactNode } from 'react';

/**
 * 数字统计组件的属性接口
 */
export interface StatisticNumberProps {
  /** 要展示的数字值 */
  value: string | number;
  
  /** 
   * 自定义格式化函数
   * @param value - 原始数值
   * @returns 格式化后的React节点
   */
  formatter?: (value: string | number) => ReactNode;
  
  /** 
   * 数字精度（小数位数）
   * @example 2 - 保留两位小数
   */
  precision?: number;
  
  /** 
   * 小数点分隔符
   * @default "."
   */
  decimalSeparator?: string;
  
  /** 
   * 千分位分隔符
   * @default ","
   * @example "," - 1,000,000
   */
  groupSeparator?: string;
  
  /** 
   * 组件样式类名前缀
   * @default "ant-statistic"
   */
  prefixCls?: string;
}

/**
 * 数字格式化组件
 * 
 * 功能说明：
 * 1. 支持自定义格式化函数，完全控制输出格式
 * 2. 默认格式化：千分位分隔、小数精度控制、整数和小数部分独立样式
 * 3. 自动处理负数符号
 * 4. 分离整数和小数部分的样式类名，便于差异化展示
 * 
 * @param props - 组件属性
 * @returns 格式化后的数字展示组件
 * 
 * @example
 *