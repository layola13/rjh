import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * SVG图标组件的属性接口
 * 继承所有标准SVG元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的自定义类名
   */
  className?: string;
  
  /**
   * 图标的尺寸（宽高）
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
}

/**
 * 前向引用的图标组件类型
 * 该组件封装了一个SVG图标，支持ref转发到内部SVG元素
 * 
 * @example
 *