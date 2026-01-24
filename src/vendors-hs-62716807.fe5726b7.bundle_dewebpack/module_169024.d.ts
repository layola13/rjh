/**
 * Card Grid Component Type Definitions
 * 卡片网格组件类型定义
 */

import type { CSSProperties, HTMLAttributes } from 'react';

/**
 * Card Grid component properties
 * 卡片网格组件属性
 */
export interface CardGridProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /**
   * Custom CSS class prefix
   * 自定义样式类名前缀
   */
  prefixCls?: string;

  /**
   * Additional CSS class name
   * 附加的 CSS 类名
   */
  className?: string;

  /**
   * Whether to enable hover effect
   * 是否启用悬停效果
   * @default true
   */
  hoverable?: boolean;

  /**
   * Inline styles
   * 内联样式
   */
  style?: CSSProperties;
}

/**
 * Card Grid Component
 * 卡片网格组件
 * 
 * A grid layout component typically used within Card components
 * 通常在 Card 组件内使用的网格布局组件
 * 
 * @param props - Component properties / 组件属性
 * @returns React element / React 元素
 * 
 * @example
 *