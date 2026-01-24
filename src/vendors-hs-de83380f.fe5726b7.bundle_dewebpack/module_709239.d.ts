/**
 * React组件类型定义
 * 基于ForwardRef模式的图标组件
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准SVG元素的所有属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /** 图标大小 */
  size?: string | number;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理 */
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

/**
 * 图标组件类型
 * 使用ForwardRef支持ref转发到底层SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * @example
 *