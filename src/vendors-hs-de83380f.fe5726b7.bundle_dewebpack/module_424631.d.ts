/**
 * React图标组件模块
 * 使用forwardRef封装的可转发ref的图标组件
 */

import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承标准SVG元素属性
 */
export interface IconBaseProps extends SVGAttributes<SVGElement> {
  /**
   * 图标大小
   */
  size?: string | number;
  
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
   * 图标标题（用于无障碍访问）
   */
  title?: string;
  
  /**
   * 其他自定义属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件的Ref类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 支持ref转发的React函数组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 这是一个使用forwardRef包装的React组件，支持ref转发到内部SVG元素
 * 
 * @example
 *