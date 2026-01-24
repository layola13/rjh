/**
 * 图标组件类型定义
 * 基于 React forwardRef 封装的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标类名 */
  className?: string;
  /** 图标样式 */
  style?: React.CSSProperties;
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 旋转角度 */
  rotate?: number;
  /** 是否旋转动画 */
  spin?: boolean;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他 SVG 属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型
 * 支持通过 ref 访问底层 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 使用 forwardRef 包装，支持 ref 转发到 SVG 元素
 * 
 * @example
 *