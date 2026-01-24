/**
 * React组件类型定义文件
 * 封装了一个带图标的转发引用组件
 */

import * as React from 'react';

/**
 * 组件的props接口
 * 继承所有标准HTML元素属性
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 图标的自定义类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 其他任意属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 支持ref转发到底层DOM元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

/**
 * 默认导出的图标组件
 * 使用forwardRef包装，允许父组件访问底层DOM节点
 * 
 * @example
 *