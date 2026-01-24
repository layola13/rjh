/**
 * Ant Design Layout Sider Component Type Definitions
 * 侧边栏布局组件类型定义
 */

import * as React from 'react';

/**
 * Breakpoint types for responsive layout
 * 响应式布局的断点类型
 */
export type SiderBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Theme types for Sider
 * 侧边栏主题类型
 */
export type SiderTheme = 'light' | 'dark';

/**
 * Sider collapse trigger type
 * 侧边栏折叠触发类型
 */
export type SiderTriggerType = 'clickTrigger' | 'responsive';

/**
 * Sider context value interface
 * 侧边栏上下文值接口
 */
export interface SiderContextValue {
  /** Whether the sider is collapsed / 侧边栏是否折叠 */
  siderCollapsed?: boolean;
  /** Width of collapsed sider / 折叠后的宽度 */
  collapsedWidth?: number | string;
}

/**
 * Sider context
 * 侧边栏上下文对象
 */
export const SiderContext: React.Context<SiderContextValue>;

/**
 * Sider component props interface
 * 侧边栏组件属性接口
 */
export interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Prefix for CSS class names / CSS类名前缀 */
  prefixCls?: string;
  
  /** Additional CSS class name / 额外的CSS类名 */
  className?: string;
  
  /** Whether the sider is collapsed / 是否折叠 */
  collapsed?: boolean;
  
  /** Default collapsed state / 默认折叠状态 */
  defaultCollapsed?: boolean;
  
  /** Whether the sider can be collapsed / 是否可折叠 */
  collapsible?: boolean;
  
  /** Custom trigger element, null to hide trigger / 自定义触发器元素，null为隐藏 */
  trigger?: React.ReactNode;
  
  /** Width of the sider / 侧边栏宽度 */
  width?: number | string;
  
  /** Width of collapsed sider / 折叠后的宽度 */
  collapsedWidth?: number | string;
  
  /** Breakpoint for responsive behavior / 响应式断点 */
  breakpoint?: SiderBreakpoint;
  
  /** Theme of the sider / 侧边栏主题 */
  theme?: SiderTheme;
  
  /** Reverse direction of arrow icon / 翻转箭头方向 */
  reverseArrow?: boolean;
  
  /** Custom style / 自定义样式 */
  style?: React.CSSProperties;
  
  /** Style of zero width trigger / 零宽度触发器样式 */
  zeroWidthTriggerStyle?: React.CSSProperties;
  
  /**
   * Callback when collapse state changes
   * 折叠状态改变时的回调
   * @param collapsed - New collapsed state / 新的折叠状态
   * @param type - Trigger type / 触发类型
   */
  onCollapse?: (collapsed: boolean, type: SiderTriggerType) => void;
  
  /**
   * Callback when breakpoint is triggered
   * 断点触发时的回调
   * @param broken - Whether the breakpoint is triggered / 是否触发断点
   */
  onBreakpoint?: (broken: boolean) => void;
  
  /** Child elements / 子元素 */
  children?: React.ReactNode;
}

/**
 * Sider component for Layout
 * 布局侧边栏组件
 * 
 * @example
 *