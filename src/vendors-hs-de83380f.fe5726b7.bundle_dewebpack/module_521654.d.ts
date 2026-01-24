/**
 * 图标组件类型定义
 * Module: module_521654
 * Original ID: 521654
 */

import type * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准SVG元素属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /** 图标尺寸 */
  size?: string | number;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 图标旋转角度 */
  rotate?: number;
  /** 是否旋转动画 */
  spin?: boolean;
}

/**
 * 图标组件类型
 * 支持ref转发的React函数组件
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 通过forwardRef包装，支持ref传递到底层SVG元素
 */
declare const IconForwardRefComponent: IconComponent;

export default IconForwardRefComponent;