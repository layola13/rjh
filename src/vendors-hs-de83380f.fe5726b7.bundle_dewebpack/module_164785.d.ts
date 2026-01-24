/**
 * React图标组件模块
 * 
 * 该模块导出一个使用forwardRef包装的React图标组件。
 * 组件接收props并将其合并后传递给底层图标组件。
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性接口
 * 扩展自标准HTML SVG元素属性
 */
export interface IconBaseProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 图标样式类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 图标是否旋转动画
   */
  spin?: boolean;
  
  /**
   * 其他自定义属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 
 * 这是一个使用React.forwardRef创建的组件，支持ref转发到底层SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *