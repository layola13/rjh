/**
 * SubMenu 组件类型定义
 * 提供菜单子菜单的类型声明
 */

import React from 'react';
import { CSSMotionProps } from 'rc-motion';

/**
 * 菜单模式类型
 */
export type MenuMode = 'horizontal' | 'vertical' | 'vertical-left' | 'vertical-right' | 'inline';

/**
 * 触发子菜单动作类型
 */
export type TriggerSubMenuAction = 'click' | 'hover';

/**
 * 菜单方向类型
 */
export type MenuDirection = 'ltr' | 'rtl';

/**
 * 弹出位置类型
 */
export type PopupPlacement = 'bottomLeft' | 'bottomRight' | 'rightTop' | 'rightBottom' | 'leftTop' | 'leftBottom';

/**
 * 内置位置配置
 */
export interface BuiltinPlacements {
  [key: string]: {
    points?: string[];
    offset?: number[];
    overflow?: {
      adjustX?: boolean;
      adjustY?: boolean;
    };
  };
}

/**
 * 菜单项事件对象
 */
export interface MenuItemEventInfo {
  /** 菜单项的唯一键 */
  key: string;
  /** 原生 DOM 事件 */
  domEvent: React.MouseEvent | React.KeyboardEvent;
  /** 菜单项路径 */
  keyPath?: string[];
  /** 菜单项实例 */
  item?: React.ReactInstance;
}

/**
 * 子菜单打开/关闭事件对象
 */
export interface OpenEventInfo {
  /** 子菜单的唯一键 */
  key: string;
  /** 子菜单实例 */
  item: React.ReactInstance;
  /** 触发方式 */
  trigger: 'click' | 'mouseenter' | 'mouseleave';
  /** 是否打开 */
  open: boolean;
}

/**
 * 悬停事件对象
 */
export interface HoverEventInfo {
  /** 菜单项的唯一键 */
  key: string;
  /** 是否悬停 */
  hover: boolean;
}

/**
 * Store 状态类型
 */
export interface MenuStore {
  getState(): {
    /** 默认激活的首项配置 */
    defaultActiveFirst: Record<string, boolean>;
    /** 打开的子菜单键集合 */
    openKeys: string[];
    /** 当前激活的菜单项键 */
    activeKey: Record<string, string>;
    /** 选中的菜单项键集合 */
    selectedKeys: string[];
  };
  setState(state: Partial<ReturnType<MenuStore['getState']>>): void;
}

/**
 * SubMenu 组件属性
 */
export interface SubMenuProps {
  /** 子菜单的唯一标识键 */
  eventKey: string;
  
  /** 子菜单标题 */
  title?: React.ReactNode;
  
  /** 子菜单内容 */
  children?: React.ReactNode;
  
  /** 菜单模式 */
  mode?: MenuMode;
  
  /** 是否打开 */
  isOpen?: boolean;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 是否激活 */
  active?: boolean;
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 菜单层级 */
  level?: number;
  
  /** 内联模式下的缩进像素 */
  inlineIndent?: number;
  
  /** 根样式类前缀 */
  rootPrefixCls?: string;
  
  /** 弹出层类名 */
  popupClassName?: string;
  
  /** 弹出层偏移量 [x, y] */
  popupOffset?: [number, number];
  
  /** 触发子菜单展开/收起的动作 */
  triggerSubMenuAction?: TriggerSubMenuAction;
  
  /** 子菜单打开延迟（秒） */
  subMenuOpenDelay?: number;
  
  /** 子菜单关闭延迟（秒） */
  subMenuCloseDelay?: number;
  
  /** 是否强制渲染子菜单 */
  forceSubMenuRender?: boolean;
  
  /** 是否支持多选 */
  multiple?: boolean;
  
  /** 选中的菜单项键数组 */
  selectedKeys?: string[];
  
  /** 打开的子菜单键数组 */
  openKeys?: string[];
  
  /** 动画配置 */
  motion?: CSSMotionProps;
  
  /** 内置弹出位置配置 */
  builtinPlacements?: BuiltinPlacements;
  
  /** 菜单项图标渲染函数或节点 */
  itemIcon?: React.ReactNode | ((props: SubMenuProps) => React.ReactNode);
  
  /** 展开图标渲染函数或节点 */
  expandIcon?: React.ReactNode | ((props: SubMenuProps) => React.ReactNode);
  
  /** 菜单方向 */
  direction?: MenuDirection;
  
  /** 父菜单实例 */
  parentMenu?: SubMenu;
  
  /** 子菜单键（用于连接状态） */
  subMenuKey?: string;
  
  /** Store 实例 */
  store?: MenuStore;
  
  /** 获取弹出容器的函数 */
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  
  /** 鼠标移入事件 */
  onMouseEnter?: (info: MenuItemEventInfo) => void;
  
  /** 鼠标移出事件 */
  onMouseLeave?: (info: MenuItemEventInfo) => void;
  
  /** 标题鼠标移入事件 */
  onTitleMouseEnter?: (info: MenuItemEventInfo) => void;
  
  /** 标题鼠标移出事件 */
  onTitleMouseLeave?: (info: MenuItemEventInfo) => void;
  
  /** 标题点击事件 */
  onTitleClick?: (info: MenuItemEventInfo) => void;
  
  /** 菜单项点击事件 */
  onClick?: (info: MenuItemEventInfo) => void;
  
  /** 菜单项选中事件 */
  onSelect?: (info: MenuItemEventInfo) => void;
  
  /** 菜单项取消选中事件 */
  onDeselect?: (info: MenuItemEventInfo) => void;
  
  /** 子菜单打开/关闭事件 */
  onOpenChange?: (info: OpenEventInfo) => void;
  
  /** 菜单项悬停事件 */
  onItemHover?: (info: HoverEventInfo) => void;
  
  /** 销毁事件 */
  onDestroy?: (key: string) => void;
  
  /** 手动引用回调 */
  manualRef?: (instance: SubMenu | null) => void;
}

/**
 * SubMenu 组件状态
 */
export interface SubMenuState {
  /** 当前菜单模式 */
  mode: MenuMode;
  
  /** 是否打开 */
  isOpen: boolean;
}

/**
 * 子菜单组件类
 * 支持嵌套菜单、多种展开模式和动画效果
 */
export declare class SubMenu extends React.Component<SubMenuProps, SubMenuState> {
  /** 是否为根菜单 */
  isRootMenu: boolean;
  
  /** 是否已渲染过 */
  haveRendered: boolean;
  
  /** 是否曾打开过 */
  haveOpened: boolean;
  
  /** 内部菜单 ID */
  internalMenuId?: string;
  
  /** 菜单实例引用 */
  menuInstance?: React.ReactInstance;
  
  /** 子菜单标题 DOM 引用 */
  subMenuTitle?: HTMLElement;
  
  /** 鼠标移入定时器 */
  mouseenterTimeout?: number;
  
  /** 最小宽度调整定时器 */
  minWidthTimeout?: number;
  
  /** 更新状态的 RAF ID */
  updateStateRaf?: number;
  
  /** 默认属性 */
  static defaultProps: Partial<SubMenuProps>;
  
  /** 是否为子菜单标识 */
  static isSubMenu: boolean;
  
  /**
   * 获取样式类前缀
   */
  getPrefixCls(): string;
  
  /**
   * 获取激活状态类名
   */
  getActiveClassName(): string;
  
  /**
   * 获取禁用状态类名
   */
  getDisabledClassName(): string;
  
  /**
   * 获取选中状态类名
   */
  getSelectedClassName(): string;
  
  /**
   * 获取打开状态类名
   */
  getOpenClassName(): string;
  
  /**
   * 获取当前可见性
   */
  getVisible(): boolean;
  
  /**
   * 获取当前菜单模式
   */
  getMode(): MenuMode;
  
  /**
   * 判断是否为内联模式
   */
  isInlineMode(): boolean;
  
  /**
   * 判断子元素是否被选中
   */
  isChildrenSelected(): boolean;
  
  /**
   * 触发打开/关闭变化
   * @param open - 是否打开
   * @param trigger - 触发方式
   */
  triggerOpenChange(open: boolean, trigger: 'click' | 'mouseenter' | 'mouseleave'): void;
  
  /**
   * 添加键路径到事件对象
   * @param event - 事件对象
   */
  addKeyPath(event: MenuItemEventInfo): MenuItemEventInfo;
  
  /**
   * 调整弹出菜单宽度
   */
  adjustWidth(): void;
  
  /**
   * 渲染弹出菜单
   * @param className - 类名
   * @param style - 样式
   */
  renderPopupMenu(className?: string, style?: React.CSSProperties): React.ReactElement;
  
  /**
   * 渲染子元素
   */
  renderChildren(): React.ReactElement;
}

/**
 * 连接 Redux Store 的 SubMenu 组件
 */
declare const ConnectedSubMenu: React.ComponentType<SubMenuProps>;

export { ConnectedSubMenu };
export default ConnectedSubMenu;