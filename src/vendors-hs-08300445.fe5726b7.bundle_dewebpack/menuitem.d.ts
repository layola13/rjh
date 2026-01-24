/**
 * MenuItem 组件类型定义
 * 菜单项组件，用于构建菜单系统中的单个可选项
 */

import { Component, ReactNode, CSSProperties, MouseEvent, KeyboardEvent } from 'react';

/**
 * 菜单项事件携带的数据
 */
export interface MenuItemEventData {
  /** 菜单项的唯一标识 */
  key: string;
  /** 菜单项的键路径（从根到当前项） */
  keyPath: string[];
  /** 菜单项组件实例 */
  item: MenuItem;
  /** 原始DOM事件 */
  domEvent: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>;
}

/**
 * 悬停事件数据
 */
export interface MenuItemHoverData {
  /** 菜单项的唯一标识 */
  key: string;
  /** 是否处于悬停状态 */
  hover: boolean;
}

/**
 * 简化的鼠标事件数据
 */
export interface MenuItemMouseEventData {
  /** 菜单项的唯一标识 */
  key: string;
  /** 原始DOM鼠标事件 */
  domEvent: MouseEvent<HTMLLIElement>;
}

/**
 * MenuItem 组件属性
 */
export interface MenuItemProps {
  /** 菜单项的唯一标识 */
  eventKey: string;
  
  /** 所属子菜单的key */
  subMenuKey?: string;
  
  /** 菜单项的子内容 */
  children?: ReactNode;
  
  /** 自定义CSS类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: CSSProperties;
  
  /** 菜单项标题 */
  title?: string | ReactNode;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 是否处于激活状态 */
  active?: boolean;
  
  /** 是否被选中 */
  isSelected?: boolean;
  
  /** 是否支持多选 */
  multiple?: boolean;
  
  /** 菜单模式：inline(内联) | vertical(垂直) | horizontal(水平) */
  mode?: 'inline' | 'vertical' | 'horizontal';
  
  /** 文本方向：ltr(左到右) | rtl(右到左) */
  direction?: 'ltr' | 'rtl';
  
  /** 内联模式下的缩进像素 */
  inlineIndent?: number;
  
  /** 菜单项层级深度 */
  level?: number;
  
  /** 根组件CSS前缀 */
  rootPrefixCls?: string;
  
  /** ARIA角色属性 */
  role?: string;
  
  /** 自定义HTML属性 */
  attribute?: Record<string, unknown>;
  
  /** 菜单项图标（可以是组件或渲染函数） */
  itemIcon?: ReactNode | ((props: MenuItemProps) => ReactNode);
  
  /** 点击事件回调 */
  onClick?: (data: MenuItemEventData) => void;
  
  /** 选中事件回调 */
  onSelect?: (data: MenuItemEventData) => void;
  
  /** 取消选中事件回调 */
  onDeselect?: (data: MenuItemEventData) => void;
  
  /** 鼠标进入事件回调 */
  onMouseEnter?: (data: MenuItemMouseEventData) => void;
  
  /** 鼠标离开事件回调 */
  onMouseLeave?: (data: MenuItemMouseEventData) => void;
  
  /** 悬停状态变化回调 */
  onItemHover?: (data: MenuItemHoverData) => void;
  
  /** 组件销毁回调 */
  onDestroy?: (eventKey: string) => void;
  
  /** 手动引用回调，用于获取组件实例 */
  manualRef?: (instance: MenuItem | null) => void;
}

/**
 * Redux状态映射属性
 */
export interface MenuItemStateProps {
  /** 当前激活的菜单项key */
  activeKey?: Record<string, string>;
  
  /** 已选中的菜单项key列表 */
  selectedKeys?: string[] | string;
}

/**
 * MenuItem 组件
 * 菜单系统中的基础菜单项组件，支持选中、禁用、多选等功能
 * 
 * @example
 *