/**
 * Icon component module with forward ref support
 * 图标组件模块，支持 ref 转发
 * @module module_588920
 */

import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props for the icon component
 * 图标组件的基础属性接口
 */
export interface IconComponentProps {
  /** Additional CSS class name | 额外的 CSS 类名 */
  className?: string;
  /** Inline styles | 内联样式 */
  style?: React.CSSProperties;
  /** Icon size in pixels | 图标尺寸（像素） */
  size?: number | string;
  /** Icon color | 图标颜色 */
  color?: string;
  /** Accessibility label | 无障碍标签 */
  'aria-label'?: string;
  /** Click handler | 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional props passed to the underlying component | 传递给底层组件的其他属性 */
  [key: string]: unknown;
}

/**
 * Icon reference type
 * 图标引用类型
 */
export type IconRef = SVGSVGElement | null;

/**
 * Icon component with forward ref
 * 带有 ref 转发的图标组件
 * 
 * @example
 *