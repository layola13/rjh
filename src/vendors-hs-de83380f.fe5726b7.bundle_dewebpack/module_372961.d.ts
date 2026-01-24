/**
 * React组件类型定义
 * 导出一个带有图标的React转发引用组件
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承SVG元素的所有标准属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   */
  size?: number | string;
  
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
}

/**
 * 图标组件类型
 * 使用forwardRef包装的函数组件，支持ref转发到SVG元素
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;