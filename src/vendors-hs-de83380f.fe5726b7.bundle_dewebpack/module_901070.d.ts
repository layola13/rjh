/**
 * Module: module_901070
 * Original ID: 901070
 * 
 * 图标组件的类型定义文件
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性
 * 继承自 SVG 元素的所有标准属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸
   * @default 16
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式
   */
  style?: React.CSSProperties;
}

/**
 * 图标组件类型
 * 支持通过 ref 访问底层 SVG 元素
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 使用 forwardRef 包装以支持 ref 传递
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;