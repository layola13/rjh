/**
 * React组件类型声明 - 图标组件
 * Module: module_948328
 * Original ID: 948328
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
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
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 转发引用的图标组件类型
 * 
 * @remarks
 * 此组件使用 forwardRef 包装，支持 ref 转发到内部 SVG 元素
 * 
 * @example
 *