/**
 * 图标组件模块
 * 这是一个基于React的图标组件，通过forwardRef支持ref转发
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承自SVG元素的所有标准属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** 图标大小，可以是数字（像素）或字符串（如 '24px', '2em'） */
  size?: number | string;
  
  /** 图标颜色 */
  color?: string;
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 图标旋转角度 */
  rotate?: number;
  
  /** 是否启用旋转动画 */
  spin?: boolean;
}

/**
 * 图标组件类型
 * 使用ForwardRefExoticComponent支持ref转发到内部SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *