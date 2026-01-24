/**
 * 图标组件模块
 * 基于 forwardRef 封装的可转发引用的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 点击事件处理函数
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * 其他 HTML 属性
   */
  [key: string]: unknown;
}

/**
 * 图标引用类型
 */
export type IconRef = HTMLSpanElement | HTMLElement;

/**
 * 图标组件类型定义
 * 支持 ref 转发的图标组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *