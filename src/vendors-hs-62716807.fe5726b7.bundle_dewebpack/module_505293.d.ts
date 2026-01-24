/**
 * Skeleton paragraph component type definitions
 * 骨架屏段落组件类型定义
 */

import type { CSSProperties, ReactElement } from 'react';

/**
 * Width configuration for skeleton paragraph lines
 * 骨架屏段落行宽度配置
 * 
 * Can be:
 * - A single number/string for all lines except the last
 * - An array of numbers/strings for each line individually
 */
export type SkeletonParagraphWidth = number | string | Array<number | string>;

/**
 * Props for the Skeleton Paragraph component
 * 骨架屏段落组件属性
 */
export interface SkeletonParagraphProps {
  /**
   * CSS class name prefix for BEM-style naming
   * CSS类名前缀，用于BEM风格命名
   */
  prefixCls?: string;

  /**
   * Additional CSS class name(s)
   * 额外的CSS类名
   */
  className?: string;

  /**
   * Inline styles for the root element
   * 根元素的内联样式
   */
  style?: CSSProperties;

  /**
   * Number of paragraph lines to display
   * 要显示的段落行数
   * @default 2
   */
  rows?: number;

  /**
   * Width configuration for each line
   * 每行的宽度配置
   * 
   * - Single value: applies to all lines except the last (which uses this exact value)
   * - Array: each element defines the width of the corresponding line
   */
  width?: SkeletonParagraphWidth;
}

/**
 * Skeleton Paragraph Component
 * 骨架屏段落组件
 * 
 * Renders a list of placeholder lines used in skeleton loading states.
 * 渲染用于骨架屏加载状态的占位行列表
 * 
 * @param props - Component props
 * @returns React element representing the skeleton paragraph
 * 
 * @example
 *