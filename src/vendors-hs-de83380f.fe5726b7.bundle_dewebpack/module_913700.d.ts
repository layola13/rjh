/**
 * SVG图标组件模块
 * 基于React forwardRef实现的可转发引用的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承标准SVG元素的所有属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large' | number;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的旋转角度
   */
  rotate?: number;
  
  /**
   * 是否启用旋转动画
   */
  spin?: boolean;
  
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
 * 使用ForwardRefExoticComponent支持ref转发到底层SVG元素
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *