/**
 * React组件类型定义
 * 这是一个使用forwardRef包装的React图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的props接口
 * 扩展了标准的SVG元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的填充颜色
   */
  fill?: string;
  
  /**
   * 图标的描边颜色
   */
  stroke?: string;
  
  /**
   * 图标数据（通常是SVG路径或其他图标定义）
   */
  icon?: unknown;
}

/**
 * 使用forwardRef创建的图标组件类型
 * 支持ref转发到底层的SVG元素
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个包装了特定图标数据的React组件，支持ref转发
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;