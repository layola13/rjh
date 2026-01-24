/**
 * React图标组件模块
 * 模块ID: 181656
 * 
 * 该模块导出一个使用forwardRef包装的React图标组件,
 * 支持传递ref以便父组件访问底层DOM元素
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承自基础图标组件的所有属性
 */
export interface IconComponentProps {
  /**
   * 图标的尺寸(像素)
   */
  size?: number | string;
  
  /**
   * 图标颜色
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
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他SVG属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 使用React.forwardRef创建,支持ref转发到底层SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 这是一个经过forwardRef包装的函数组件,
 * 内部使用基础图标包装器(l.default)和图标数据(i.default)渲染
 * 
 * @example
 *