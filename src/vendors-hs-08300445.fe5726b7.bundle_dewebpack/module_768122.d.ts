/**
 * Panel Content Component
 * 用于折叠面板内容区域的 React 组件
 */

import type { ForwardRefExoticComponent, RefAttributes, CSSProperties, ReactNode } from 'react';

/**
 * PanelContent 组件的属性接口
 */
export interface PanelContentProps {
  /**
   * 组件类名前缀
   * @default 'rc-collapse'
   */
  prefixCls?: string;

  /**
   * 是否强制渲染内容（即使面板未激活）
   * @default false
   */
  forceRender?: boolean;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: CSSProperties;

  /**
   * 面板内容
   */
  children?: ReactNode;

  /**
   * 面板是否处于激活状态
   */
  isActive?: boolean;

  /**
   * ARIA role 属性
   * @default 'region'
   */
  role?: string;
}

/**
 * 面板内容组件
 * 
 * 用于显示折叠面板的内容区域，支持条件渲染和强制渲染模式。
 * 当 isActive 为 true 时显示激活状态样式，为 false 时显示非激活状态样式。
 * 
 * @example
 *