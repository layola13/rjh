/**
 * 图标组件类型定义
 * Module: module_251043
 * Original ID: 251043
 */

import type { Ref, ForwardRefExoticComponent, RefAttributes } from 'react';

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
  /** 自定义属性 */
  [key: string]: any;
}

/**
 * 图标数据接口
 */
export interface IconData {
  /** 图标名称 */
  name?: string;
  /** SVG 路径数据 */
  path?: string;
  /** 视图盒子尺寸 */
  viewBox?: string;
  /** 图标主题 */
  theme?: 'filled' | 'outlined' | 'two-tone';
}

/**
 * 前向引用的图标组件类型
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 使用 forwardRef 包装以支持 ref 转发
 */
declare const IconForwardRefComponent: IconComponent;

export default IconForwardRefComponent;