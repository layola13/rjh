import type { CSSProperties, ReactNode } from 'react';

/**
 * TabPane 组件的属性接口
 */
export interface TabPaneProps {
  /**
   * 样式类名前缀
   */
  prefixCls: string;

  /**
   * 强制渲染，即使 TabPane 未激活也会渲染内容
   * @default false
   */
  forceRender?: boolean;

  /**
   * 自定义样式类名
   */
  className?: string;

  /**
   * 自定义内联样式
   */
  style?: CSSProperties;

  /**
   * TabPane 的唯一标识符，用于生成 ARIA 属性
   */
  id?: string;

  /**
   * 当前 TabPane 是否激活
   */
  active: boolean;

  /**
   * 是否启用动画效果
   * @default false
   */
  animated?: boolean;

  /**
   * 是否在未激活时销毁 TabPane 内容
   * @default false
   */
  destroyInactiveTabPane?: boolean;

  /**
   * Tab 的键值，用于唯一标识
   */
  tabKey: string | number;

  /**
   * TabPane 的子内容
   */
  children?: ReactNode;
}

/**
 * TabPane 组件
 * 
 * 用于 Tabs 组件中的单个面板，支持懒加载、动画切换和销毁未激活面板等功能
 * 
 * @param props - TabPane 组件属性
 * @returns 渲染的 TabPane 元素
 */
export default function TabPane(props: TabPaneProps): JSX.Element;