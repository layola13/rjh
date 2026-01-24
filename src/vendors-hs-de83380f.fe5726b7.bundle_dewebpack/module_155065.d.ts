import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准SVG元素的所有属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标颜色
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
 * 使用forwardRef包装，支持ref转发到底层SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个经过forwardRef包装的React函数组件，可以接收ref并转发到内部的SVG元素
 * 
 * @example
 *