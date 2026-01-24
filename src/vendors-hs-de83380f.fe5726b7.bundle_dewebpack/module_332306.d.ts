/**
 * 图标组件模块
 * 
 * 这是一个基于 forwardRef 的 React 图标组件，
 * 封装了通用图标组件并注入特定的图标数据
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 */
interface IconComponentProps {
  /** 图标类名 */
  className?: string;
  /** 图标样式 */
  style?: React.CSSProperties;
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 图标旋转角度 */
  rotate?: number;
  /** 是否启用旋转动画 */
  spin?: boolean;
  /** 其他 HTML 属性 */
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 */
type IconComponentRef = SVGSVGElement;

/**
 * 带引用转发的图标组件类型
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *