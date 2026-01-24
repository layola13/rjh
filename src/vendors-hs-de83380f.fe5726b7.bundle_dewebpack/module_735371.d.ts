/**
 * 图标组件类型定义
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标大小
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
}

/**
 * 图标组件属性类型
 * 继承自IconBaseProps，并添加ref支持
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * 图标数据对象
   */
  icon?: unknown;
}

/**
 * 图标组件类型
 * 使用forwardRef包装的组件，支持ref转发到SVG元素
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个经过forwardRef包装的React组件，可以接收ref并转发到内部的SVG元素
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;