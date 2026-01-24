/**
 * 图标组件模块
 * 基于 forwardRef 包装的图标组件，支持引用转发
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
interface IconBaseProps {
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
  /** 其他 SVG 属性 */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 * 定义图标的路径数据和视图配置
 */
interface IconData {
  /** SVG 路径数据或子元素 */
  path?: string | ReactElement | ReactElement[];
  /** SVG viewBox 属性 */
  viewBox?: string;
  /** 图标宽度 */
  width?: number;
  /** 图标高度 */
  height?: number;
}

/**
 * 图标组件属性类型
 * 继承基础属性并添加 ref 支持
 */
type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 默认导出的图标组件
 * 
 * @description
 * 一个使用 forwardRef 包装的图标组件，允许父组件访问底层 SVG 元素的引用。
 * 该组件将传入的属性与内部图标数据合并，并渲染为 SVG 图标。
 * 
 * @example
 *