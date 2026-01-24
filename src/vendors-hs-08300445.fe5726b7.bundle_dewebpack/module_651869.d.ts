/**
 * TabContent 组件的类型定义
 * 用于渲染标签页的内容区域，支持动画切换和动态销毁
 */

import type { ReactElement, CSSProperties } from 'react';

/**
 * 标签页位置类型
 */
export type TabPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * 动画配置接口
 */
export interface AnimatedConfig {
  /** 是否启用标签面板切换动画 */
  tabPane: boolean;
  /** 是否启用墨水条动画（可选） */
  inkBar?: boolean;
  /** 是否启用标签条动画（可选） */
  tabPaneMotion?: boolean;
}

/**
 * 标签项数据结构
 */
export interface TabItem {
  /** 标签唯一标识 */
  key: string;
  /** 标签对应的 React 节点 */
  node: ReactElement;
  /** 标签标题（可选） */
  label?: string;
  /** 是否禁用（可选） */
  disabled?: boolean;
  /** 是否可关闭（可选） */
  closable?: boolean;
}

/**
 * TabContent 组件属性接口
 */
export interface TabContentProps {
  /** 标签容器的唯一 ID */
  id: string;
  /** 当前激活的标签键值 */
  activeKey: string;
  /** 动画配置对象 */
  animated: AnimatedConfig;
  /** 标签页位置 */
  tabPosition: TabPosition;
  /** 是否为 RTL（从右到左）布局 */
  rtl: boolean;
  /** 是否销毁未激活的标签面板内容 */
  destroyInactiveTabPane: boolean;
}

/**
 * Tabs 上下文数据结构
 */
export interface TabsContextValue {
  /** 组件样式前缀 */
  prefixCls: string;
  /** 所有标签项数组 */
  tabs: TabItem[];
  /** 当前激活的标签键值（可选） */
  activeKey?: string;
  /** 标签切换回调（可选） */
  onTabClick?: (key: string, event: React.MouseEvent) => void;
}

/**
 * TabContent 组件
 * 
 * @description 渲染标签页的内容容器，支持：
 * - 左右/上下滑动动画切换
 * - RTL 布局适配
 * - 懒加载和销毁未激活面板
 * - 自定义样式前缀
 * 
 * @param props - 组件属性
 * @returns React 元素
 * 
 * @example
 *