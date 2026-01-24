/**
 * Statistic 统计数值展示组件类型声明
 * 用于展示统计数据，支持自定义前缀、后缀、加载状态等
 */

import * as React from 'react';

/**
 * 统计组件的属性接口
 */
export interface StatisticProps {
  /**
   * 组件样式类名前缀
   * @default "statistic"
   */
  prefixCls?: string;

  /**
   * 自定义组件外层容器的 CSS 类名
   */
  className?: string;

  /**
   * 自定义组件外层容器的内联样式
   */
  style?: React.CSSProperties;

  /**
   * 自定义数值区域的内联样式
   */
  valueStyle?: React.CSSProperties;

  /**
   * 数值内容，可以是数字或字符串
   * @default 0
   */
  value?: string | number;

  /**
   * 数值上方的标题文本
   */
  title?: React.ReactNode;

  /**
   * 自定义数值的渲染函数
   * @param node - 默认渲染的数值节点
   * @returns 自定义渲染结果
   */
  valueRender?: (node: React.ReactNode) => React.ReactNode;

  /**
   * 数值的前缀内容（显示在数值左侧）
   */
  prefix?: React.ReactNode;

  /**
   * 数值的后缀内容（显示在数值右侧）
   */
  suffix?: React.ReactNode;

  /**
   * 是否显示加载中状态
   * @default false
   */
  loading?: boolean;

  /**
   * 文本方向，支持从左到右或从右到左
   * @default "ltr"
   */
  direction?: 'ltr' | 'rtl';

  /**
   * 小数点分隔符
   * @default "."
   */
  decimalSeparator?: string;

  /**
   * 千分位分隔符
   * @default ","
   */
  groupSeparator?: string;

  /**
   * 鼠标移入事件处理函数
   */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * 鼠标移出事件处理函数
   */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * 统计数值展示组件
 * 
 * @example
 *