/**
 * 图标组件类型定义
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准 SVG 元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | number;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
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
}

/**
 * 图标组件类型
 * 使用 forwardRef 包装，支持 ref 转发到 SVG 元素
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个通过 forwardRef 创建的 React 组件，用于渲染 SVG 图标
 * 
 * @example
 *