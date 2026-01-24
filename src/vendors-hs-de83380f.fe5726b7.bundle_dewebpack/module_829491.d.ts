/**
 * React图标组件模块
 * 基于forwardRef创建的可转发ref的图标组件
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 扩展自SVG元素的所有标准属性
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸
   * @default 16
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
 * 图标组件类型定义
 * 支持ref转发到内部SVG元素
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *