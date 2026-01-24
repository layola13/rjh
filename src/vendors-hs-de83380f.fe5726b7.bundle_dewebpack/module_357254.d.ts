/**
 * 图标组件模块
 * Module ID: 357254
 * 
 * 该模块导出一个使用forwardRef包装的React图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
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
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件的属性类型
 * 继承自IconBaseProps并支持ref转发
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 图标组件类型定义
 * 使用forwardRef创建的可转发ref的函数组件
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 该组件是一个使用React.forwardRef创建的图标组件，
 * 支持ref转发到底层的SVG元素
 * 
 * @example
 *