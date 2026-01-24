/**
 * 图标组件模块
 * 封装了一个使用 forwardRef 的 React 图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
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
 * 描述图标的 SVG 路径和视图框配置
 */
export interface IconDefinition {
  /** SVG 路径数据 */
  path: string | string[];
  /** SVG 视图框 */
  viewBox?: string;
  /** 图标名称 */
  name?: string;
}

/**
 * Ref 类型定义
 */
type IconRef = SVGSVGElement;

/**
 * 图标组件类型
 * 支持转发 ref 到底层 SVG 元素
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @description
 * 这是一个封装好的图标组件，使用 React.forwardRef 实现了 ref 转发功能。
 * 组件内部使用通用图标容器渲染特定的图标定义。
 * 
 * @example
 *