/**
 * 邮件图标组件类型定义
 * Module: module_179690
 * Original ID: 179690
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的基础属性
 */
interface IconBaseProps {
  /** 图标大小，可以是数字（像素）或字符串（如 '1em', '24px'） */
  size?: number | string;
  
  /** 图标颜色 */
  color?: string;
  
  /** 图标样式类名 */
  className?: string;
  
  /** 内联样式对象 */
  style?: React.CSSProperties;
  
  /** 图标旋转角度 */
  rotate?: number;
  
  /** 是否启用旋转动画 */
  spin?: boolean;
  
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** aria-label 用于无障碍访问 */
  'aria-label'?: string;
  
  /** 其他 SVG 元素支持的属性 */
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 */
type IconRef = SVGSVGElement;

/**
 * 邮件图标组件
 * 
 * @remarks
 * 这是一个基于 React 的转发引用（forwardRef）组件，
 * 用于渲染邮件相关的 SVG 图标。
 * 
 * @example
 *