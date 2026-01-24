import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准的SVG元素属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * 图标的尺寸大小
   */
  size?: string | number;
  
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
   * 图标的旋转角度
   */
  spin?: boolean;
  
  /**
   * 图标的旋转角度（度数）
   */
  rotate?: number;
}

/**
 * 图标组件类型
 * 使用forwardRef包装以支持ref转发
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个经过forwardRef包装的React组件，用于渲染SVG图标
 * 
 * @example
 *