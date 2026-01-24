/**
 * Module: module_763107
 * Original ID: 763107
 * 
 * 图标组件模块，导出一个使用forwardRef包装的React图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

/**
 * 图标数据接口
 */
export interface IconData {
  /** SVG路径数据 */
  path?: string | string[];
  /** 视图盒尺寸 */
  viewBox?: string;
  /** 图标宽度 */
  width?: number;
  /** 图标高度 */
  height?: number;
  [key: string]: unknown;
}

/**
 * 图标组件属性类型
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 图标组件类型定义
 * 
 * 这是一个使用React.forwardRef创建的图标组件，
 * 允许父组件通过ref访问底层的SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *