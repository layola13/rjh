/**
 * Ant Design Layout 组件类型定义
 * 提供页面布局的基础组件：Layout、Header、Footer、Content
 */

import { Context, ReactNode, HTMLAttributes } from 'react';

/**
 * Sider 钩子函数接口
 * 用于在 Layout 中注册和移除侧边栏
 */
export interface SiderHook {
  /**
   * 添加侧边栏实例
   * @param id - 侧边栏唯一标识符
   */
  addSider: (id: string) => void;
  
  /**
   * 移除侧边栏实例
   * @param id - 侧边栏唯一标识符
   */
  removeSider: (id: string) => void;
}

/**
 * Layout 上下文值接口
 */
export interface LayoutContextValue {
  /** 侧边栏钩子函数集合 */
  siderHook: SiderHook;
}

/**
 * Layout 上下文
 * 用于在 Layout 组件树中共享侧边栏状态
 */
export const LayoutContext: Context<LayoutContextValue>;

/**
 * 基础布局组件的通用属性
 */
export interface BasicLayoutProps extends HTMLAttributes<HTMLElement> {
  /** 自定义类名前缀 */
  prefixCls?: string;
  
  /** 是否包含侧边栏（自动检测或手动指定） */
  hasSider?: boolean;
  
  /** 自定义 CSS 类名 */
  className?: string;
  
  /** 子元素 */
  children?: ReactNode;
  
  /** 自定义 HTML 标签名 */
  tagName?: string;
}

/**
 * 简化布局组件属性（Header、Footer、Content）
 */
export interface SimpleLayoutProps extends HTMLAttributes<HTMLElement> {
  /** 自定义类名前缀 */
  prefixCls?: string;
  
  /** 自定义 CSS 类名 */
  className?: string;
  
  /** 子元素 */
  children?: ReactNode;
  
  /** 自定义 HTML 标签名 */
  tagName?: string;
}

/**
 * 布局容器组件
 * 
 * @example
 *