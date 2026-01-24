import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * SVG 图标组件的属性接口
 * 继承所有标准 SVG 元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
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
 * 图标组件类型定义
 * 支持 ref 转发到内部 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @description
 * 这是一个经过 forwardRef 包装的 SVG 图标组件，
 * 可以接收 ref 并转发到内部的 SVG 元素。
 * 
 * @example
 *