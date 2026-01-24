import React from 'react';

/**
 * 属性栏控件类型枚举
 */
declare enum PropertyBarControlTypeEnum {
  /** 分隔线 */
  divider = 'divider',
}

/**
 * 菜单项配置接口
 */
interface MenuItem {
  /** 菜单项类型 */
  type?: PropertyBarControlTypeEnum;
  /** 图标源地址 */
  src?: string;
  /** 显示标签文本 */
  label: string;
  /** 是否禁用 */
  disable?: boolean;
  /** 子菜单项列表 */
  children?: MenuItem[];
  /** 点击事件处理函数 */
  onClick?: (event: React.MouseEvent) => void;
}

/**
 * 菜单项组件的属性接口
 */
interface MenuItemComponentProps {
  /** 菜单项配置对象 */
  item: MenuItem;
  /** 点击事件回调函数 */
  onClick?: (event: React.MouseEvent) => void;
}

/**
 * 右键菜单组件的属性接口
 */
interface ContextMenuProps {
  /** 菜单项配置对象 */
  item: MenuItem;
  /** 菜单项点击事件回调 */
  onItemClick: (item: MenuItem, event: React.MouseEvent) => void;
  /** 子菜单项点击事件回调 */
  onSubMenuClick: (event: React.MouseEvent) => void;
}

/**
 * 右键菜单组件的状态接口
 */
interface ContextMenuState {
  /** 是否显示子菜单 */
  submenu: boolean;
}

/**
 * 右键菜单组件类
 * 支持多级菜单、禁用状态、分隔线等功能
 */
declare class ContextMenu extends React.Component<ContextMenuProps, ContextMenuState> {
  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: ContextMenuProps);

  /**
   * 鼠标进入事件处理
   * 显示子菜单
   */
  onMouseEnter(): void;

  /**
   * 鼠标离开事件处理
   * 隐藏子菜单
   */
  onMouseLeave(): void;

  /**
   * 渲染子菜单
   * @returns 子菜单的React元素或undefined
   */
  renderSubMenu(): React.ReactElement | undefined;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}

export default ContextMenu;