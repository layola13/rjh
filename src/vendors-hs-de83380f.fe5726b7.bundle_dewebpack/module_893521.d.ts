/**
 * 图标组件模块
 * 该模块导出一个使用 forwardRef 包装的 React 图标组件
 */

import type React from 'react';

/**
 * 图标组件的属性接口
 * 继承自基础图标组件的所有属性
 */
export interface IconComponentProps {
  /** 图标大小 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 图标组件类型定义
 * 使用 forwardRef 支持 ref 转发到底层 DOM 元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *