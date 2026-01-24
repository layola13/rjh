/**
 * 图标组件模块
 * 该模块导出一个使用forwardRef包装的React图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承标准SVG元素的所有属性
 */
export interface IconComponentProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
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
   * 图标数据对象
   * @internal
   */
  icon?: {
    tag: string;
    attrs: Record<string, unknown>;
    children: unknown[];
  };
}

/**
 * 图标组件类型
 * 使用forwardRef包装，支持ref转发到底层SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个经过forwardRef包装的函数式组件，可以接收ref并转发到内部的SVG元素
 * 
 * @example
 *