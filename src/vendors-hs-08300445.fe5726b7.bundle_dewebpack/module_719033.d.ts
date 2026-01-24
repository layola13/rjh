/**
 * RC-Tabs 组件类型定义
 * 一个功能丰富的React选项卡组件，支持动画、编辑、移动端等特性
 */

import * as React from 'react';

/**
 * 选项卡位置类型
 */
export type TabPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * 文本方向类型
 */
export type Direction = 'ltr' | 'rtl';

/**
 * 动画配置
 */
export interface AnimatedConfig {
  /** 是否启用指示条动画 */
  inkBar?: boolean;
  /** 是否启用选项卡面板切换动画 */
  tabPane?: boolean;
}

/**
 * 可编辑配置
 */
export interface EditableConfig {
  /** 是否显示添加按钮 */
  showAdd?: boolean;
  /** 添加回调 */
  onEdit?: (type: 'add' | 'remove', key: React.Key) => void;
  /** 移除确认回调 */
  removeIcon?: React.ReactNode;
  /** 添加图标 */
  addIcon?: React.ReactNode;
}

/**
 * 国际化配置
 */
export interface TabsLocale {
  /** 下拉菜单的无障碍标签 */
  dropdownAriaLabel?: string;
  /** 移除按钮的无障碍标签 */
  removeAriaLabel?: string;
  /** 添加按钮的无障碍标签 */
  addAriaLabel?: string;
}

/**
 * 选项卡项配置
 */
export interface TabPaneProps {
  /** 选项卡标题 */
  tab?: React.ReactNode;
  /** 唯一标识 */
  key: React.Key;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可关闭 */
  closable?: boolean;
  /** 选项卡面板内容 */
  children?: React.ReactNode;
  /** 是否强制渲染 */
  forceRender?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 选项卡节点（内部使用） */
  node?: React.ReactElement;
}

/**
 * TabBar 渲染函数的参数
 */
export interface RenderTabBarProps {
  /** 组件ID */
  id?: string;
  /** 当前激活的选项卡键值 */
  activeKey: React.Key;
  /** 动画配置 */
  animated: AnimatedConfig;
  /** 选项卡位置 */
  tabPosition: TabPosition;
  /** 是否为RTL模式 */
  rtl: boolean;
  /** 是否为移动端 */
  mobile: boolean;
  /** 可编辑配置 */
  editable?: EditableConfig;
  /** 国际化配置 */
  locale?: TabsLocale;
  /** 更多图标 */
  moreIcon?: React.ReactNode;
  /** 更多下拉菜单过渡动画名称 */
  moreTransitionName?: string;
  /** 选项卡之间的间隙 */
  tabBarGutter?: number;
  /** 选项卡点击回调 */
  onTabClick?: (key: React.Key, event: React.MouseEvent | React.KeyboardEvent) => void;
  /** 选项卡滚动回调 */
  onTabScroll?: (direction: 'left' | 'right' | 'top' | 'bottom') => void;
  /** 额外内容 */
  extra?: React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 选项卡面板列表 */
  panes?: React.ReactNode;
}

/**
 * Tabs 组件属性
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 组件唯一标识 */
  id?: string;
  /** 样式类名前缀 */
  prefixCls?: string;
  /** 自定义类名 */
  className?: string;
  /** 子元素（TabPane） */
  children?: React.ReactNode;
  /** 文本方向 */
  direction?: Direction;
  /** 当前激活的选项卡键值（受控） */
  activeKey?: React.Key;
  /** 默认激活的选项卡键值（非受控） */
  defaultActiveKey?: React.Key;
  /** 是否可编辑（添加/删除选项卡） */
  editable?: EditableConfig;
  /** 动画配置，可传入布尔值或配置对象 */
  animated?: boolean | AnimatedConfig;
  /** 选项卡位置 */
  tabPosition?: TabPosition;
  /** 选项卡之间的间隙（像素） */
  tabBarGutter?: number;
  /** 选项卡栏自定义样式 */
  tabBarStyle?: React.CSSProperties;
  /** 选项卡栏额外内容 */
  tabBarExtraContent?: React.ReactNode;
  /** 国际化配置 */
  locale?: TabsLocale;
  /** 更多下拉菜单图标 */
  moreIcon?: React.ReactNode;
  /** 更多下拉菜单过渡动画类名 */
  moreTransitionName?: string;
  /** 是否销毁未激活的选项卡面板 */
  destroyInactiveTabPane?: boolean;
  /** 自定义渲染选项卡栏 */
  renderTabBar?: (props: RenderTabBarProps, DefaultTabBar: React.ComponentType<RenderTabBarProps>) => React.ReactElement;
  /** 切换选项卡回调 */
  onChange?: (activeKey: React.Key) => void;
  /** 选项卡点击回调 */
  onTabClick?: (key: React.Key, event: React.MouseEvent | React.KeyboardEvent) => void;
  /** 选项卡滚动回调 */
  onTabScroll?: (direction: 'left' | 'right' | 'top' | 'bottom') => void;
}

/**
 * RC-Tabs 组件
 * 
 * @example
 *