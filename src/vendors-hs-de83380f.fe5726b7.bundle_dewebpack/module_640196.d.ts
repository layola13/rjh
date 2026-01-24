/**
 * 图标组件模块
 * @module IconComponent
 * @description 基于React forwardRef实现的图标组件，支持ref转发
 */

import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的属性接口
 * @interface IconComponentProps
 * @extends {SVGAttributes<SVGSVGElement>} 继承所有SVG元素属性
 */
export interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   * @default 24
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
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据（SVG路径或配置）
   */
  icon?: any;
}

/**
 * 带有ref转发的图标组件类型
 * @typedef {ForwardRefExoticComponent} IconComponent
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * @description 使用forwardRef包装的React组件，允许父组件访问底层SVG元素
 * @example
 *