/**
 * React图标组件模块
 * @module IconComponent
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准的React SVG属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标大小（宽度和高度）
   * @default 24
   */
  size?: number | string;

  /**
   * 图标颜色
   * @default "currentColor"
   */
  color?: string;

  /**
   * 图标的className
   */
  className?: string;

  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;

  /**
   * 鼠标点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;

  /**
   * 自定义的额外属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 使用forwardRef包装,支持ref转发到底层SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *