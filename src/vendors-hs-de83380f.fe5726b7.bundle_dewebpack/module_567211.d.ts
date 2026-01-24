/**
 * 图标组件模块
 * 使用 forwardRef 包装的 React 图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconProps {
  /**
   * 图标的大小
   */
  size?: number | string;
  
  /**
   * 图标的颜色
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
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * 其他 HTML 属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件的 Ref 类型
 */
export type IconRef = HTMLElement;

/**
 * 图标组件类型定义
 * 一个使用 forwardRef 包装的 React 组件，用于渲染图标
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *