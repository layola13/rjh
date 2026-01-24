/**
 * React Icon Component Module
 * 
 * 这是一个使用 forwardRef 创建的 React 图标组件的类型定义
 * 支持 ref 转发和自定义属性扩展
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自标准 SVG 元素的所有属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large' | number;
  
  /**
   * 图标的颜色
   * 可以是任何有效的 CSS 颜色值
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 是否启用旋转动画
   */
  spin?: boolean;
}

/**
 * 图标组件类型
 * 使用 forwardRef 包装，支持 ref 转发到底层 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *