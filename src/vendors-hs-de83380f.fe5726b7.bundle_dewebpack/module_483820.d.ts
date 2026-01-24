/**
 * 图标组件类型定义
 * 基于 React.forwardRef 的图标封装组件
 */

import type { Ref, ReactElement, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** CSS 类名 */
  className?: string;
  /** 内联样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他 SVG 属性 */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 * 定义图标的 SVG 路径和元数据
 */
export interface IconData {
  /** SVG 标签名 */
  tag: string;
  /** SVG 属性 */
  attrs: Record<string, string | number>;
  /** 子元素列表 */
  children?: IconData[];
}

/**
 * 图标组件类型
 * 使用 forwardRef 支持 ref 转发到 SVG 元素
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *