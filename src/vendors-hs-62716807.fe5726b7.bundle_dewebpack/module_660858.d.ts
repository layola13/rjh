/**
 * 菜单子菜单组件类型定义
 * @module SubMenu
 */

import type { ReactNode, ComponentType } from 'react';
import type { SubMenuProps as RcSubMenuProps } from 'rc-menu';

/**
 * 菜单主题类型
 */
export type MenuTheme = 'light' | 'dark';

/**
 * 菜单模式类型
 */
export type MenuMode = 'vertical' | 'horizontal' | 'inline';

/**
 * 菜单上下文接口
 */
interface MenuContextProps {
  /** 是否内联折叠状态 */
  inlineCollapsed?: boolean;
  /** Ant Design 菜单主题 */
  antdMenuTheme?: MenuTheme;
  /** 根节点类名前缀 */
  rootPrefixCls?: string;
}

/**
 * 子菜单组件属性接口
 */
export interface SubMenuProps extends Omit<RcSubMenuProps, 'title'> {
  /** 子菜单图标 */
  icon?: ReactNode;
  /** 子菜单标题 */
  title?: ReactNode;
  /** 菜单层级 */
  level?: number;
  /** 根节点类名前缀 */
  rootPrefixCls?: string;
  /** 弹出菜单的类名 */
  popupClassName?: string;
  /** 子菜单项 */
  children?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 唯一标志 */
  key?: string | number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击回调 */
  onTitleClick?: (info: { key: string; domEvent: React.MouseEvent }) => void;
}

/**
 * 子菜单组件接口
 * @description 用于渲染具有嵌套结构的菜单项，支持图标、折叠状态和主题定制
 */
interface SubMenuComponent extends ComponentType<SubMenuProps> {
  /** 组件上下文类型 */
  contextType: React.Context<MenuContextProps>;
  /** 子菜单标识符 */
  isSubMenu: 1;
}

/**
 * 默认导出的子菜单组件
 * @description 继承自 React.Component，支持内联折叠、主题切换等功能
 */
declare const SubMenu: SubMenuComponent;

export default SubMenu;