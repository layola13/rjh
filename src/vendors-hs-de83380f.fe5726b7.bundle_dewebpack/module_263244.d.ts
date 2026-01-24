/**
 * 图标组件模块
 * 提供基于React的forwardRef图标组件实现
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承标准的SVG元素属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 其他SVG属性 */
  [key: string]: unknown;
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
 * 
 * @description
 * 这是一个使用forwardRef包装的图标组件，支持：
 * - ref转发到底层SVG元素
 * - 完整的SVG属性支持
 * - 自定义尺寸、颜色等属性
 * 
 * @example
 *