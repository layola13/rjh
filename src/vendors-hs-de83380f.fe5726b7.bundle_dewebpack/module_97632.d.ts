/**
 * React组件模块 - 图标包装组件
 * @module IconComponent
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 扩展了标准的React组件属性
 */
export interface IconComponentProps extends React.ComponentPropsWithoutRef<'svg'> {
  /**
   * 图标的尺寸
   * @default 24
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
  
  /**
   * 图标数据对象(由模块内部注入)
   * @internal
   */
  icon?: unknown;
  
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 一个带有ref转发功能的React函数组件
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 此组件是通过React.forwardRef创建的,支持ref转发
 * 内部使用了图标包装器组件,并自动注入了图标数据
 * 
 * @example
 *