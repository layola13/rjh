/**
 * 图标组件模块
 * 提供一个可转发 ref 的 React 图标组件
 */

import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准 SVG 元素属性
 */
export interface IconComponentProps extends Omit<SVGAttributes<SVGSVGElement>, 'ref'> {
  /**
   * 图标的尺寸大小
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标标题，用于无障碍访问
   */
  title?: string;
  
  /**
   * 图标旋转角度
   */
  spin?: boolean;
}

/**
 * 图标组件类型
 * 支持 ref 转发到底层 SVG 元素
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *