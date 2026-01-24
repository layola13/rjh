import React from 'react';
import { Store } from './store';

/**
 * 菜单选择事件对象
 */
export interface SelectInfo {
  /** 选中的菜单项 key */
  key: string;
  /** 当前选中的所有 key 数组 */
  selectedKeys: string[];
  /** 原生事件对象 */
  item?: React.ReactInstance;
  /** 原生 DOM 事件 */
  domEvent?: React.MouseEvent | React.KeyboardEvent;
}

/**
 * 菜单打开/关闭事件对象
 */
export interface OpenEventInfo {
  /** 菜单项 key */
  key: string;
  /** 是否打开 */
  open: boolean;
  /** 原生 DOM 事件 */
  domEvent?: React.MouseEvent | React.KeyboardEvent;
}

/**
 * 菜单内置动画配置
 */
export interface MotionConfig {
  /** 动画名称 */
  motionName?: string;
  /** 动画出现时的类名 */
  motionAppear?: boolean;
  /** 动画离开时的类名 */
  motionLeave?: boolean;
  /** 自定义动画钩子 */
  onAppearStart?: (element: HTMLElement) => React.CSSProperties;
  onAppearActive?: (element: HTMLElement) => React.CSSProperties;
  onLeaveStart?: (element: HTMLElement) => React.CSSProperties;
  onLeaveActive?: (element: HTMLElement) => React.CSSProperties;
}

/**
 * 菜单内置弹出位置配置
 */
export interface BuiltinPlacements {
  [placement: string]: {
    points?: string[];
    offset?: number[];
    overflow?: {
      adjustX?: boolean | number;
      adjustY?: boolean | number;
    };
  };
}

/**
 * 菜单组件属性
 */
export interface MenuProps {
  /** 菜单类型，支持垂直、水平、内嵌模式 */
  mode?: 'vertical' | 'horizontal' | 'inline';
  
  /** 是否可选择 */
  selectable?: boolean;
  
  /** 是否支持多选 */
  multiple?: boolean;
  
  /** 当前选中的菜单项 key 数组 */
  selectedKeys?: string[];
  
  /** 默认选中的菜单项 key 数组 */
  defaultSelectedKeys?: string[];
  
  /** 当前展开的 SubMenu 菜单项 key 数组 */
  openKeys?: string[];
  
  /** 默认展开的 SubMenu 菜单项 key 数组 */
  defaultOpenKeys?: string[];
  
  /** 当前激活的菜单项 key */
  activeKey?: string;
  
  /** 点击菜单项时的回调 */
  onClick?: (info: SelectInfo) => void;
  
  /** 选中菜单项时的回调 */
  onSelect?: (info: SelectInfo) => void;
  
  /** 取消选中菜单项时的回调 */
  onDeselect?: (info: SelectInfo) => void;
  
  /** SubMenu 展开/关闭时的回调 */
  onOpenChange?: (openKeys: string[]) => void;
  
  /** 鼠标移入菜单时的回调 */
  onMouseEnter?: (event: React.MouseEvent<HTMLUListElement>) => void;
  
  /** 子菜单打开延迟时间（秒） */
  subMenuOpenDelay?: number;
  
  /** 子菜单关闭延迟时间（秒） */
  subMenuCloseDelay?: number;
  
  /** 触发子菜单的行为，可选 hover 或 click */
  triggerSubMenuAction?: 'hover' | 'click';
  
  /** inline 模式时菜单是否收起状态 */
  inlineCollapsed?: boolean;
  
  /** 配合 Sider 组件使用，指示侧边栏是否收起 */
  siderCollapsed?: boolean;
  
  /** 收起时的宽度，仅在 inline 模式下生效 */
  collapsedWidth?: number | string;
  
  /** 样式类名前缀 */
  prefixCls?: string;
  
  /** 根节点样式类名 */
  className?: string;
  
  /** 根节点内联样式 */
  style?: React.CSSProperties;
  
  /** 文本方向，支持 ltr 或 rtl */
  direction?: 'ltr' | 'rtl';
  
  /** 自定义动画配置（已废弃，使用 motion） */
  openAnimation?: string | object;
  
  /** 自定义动画过渡名称（已废弃，使用 motion） */
  openTransitionName?: string;
  
  /** 默认动画配置映射表 */
  defaultMotions?: Record<string, MotionConfig>;
  
  /** 动画配置 */
  motion?: MotionConfig;
  
  /** 内置弹出位置配置 */
  builtinPlacements?: BuiltinPlacements;
  
  /** 自定义溢出指示器（当菜单项溢出时显示） */
  overflowedIndicator?: React.ReactNode;
  
  /** 子菜单渲染到的容器 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  
  /** 子节点 */
  children?: React.ReactNode;
}

/**
 * 菜单组件内部状态
 */
export interface MenuState {
  /** 是否正在从 inline 模式切换到其他模式 */
  switchingModeFromInline: boolean;
  
  /** 前一次的 props，用于 getDerivedStateFromProps 对比 */
  prevProps: MenuProps;
  
  /** inline 模式收起前的 openKeys，用于恢复展开状态 */
  inlineOpenKeys: string[];
  
  /** 内部状态管理 store */
  store: Store;
}

/**
 * 菜单状态数据（store 中存储的数据结构）
 */
export interface MenuStoreState {
  /** 当前选中的菜单项 key 数组 */
  selectedKeys: string[];
  
  /** 当前展开的 SubMenu key 数组 */
  openKeys: string[];
  
  /** 当前激活的菜单项 key 映射表 */
  activeKey: Record<string, string>;
}

/**
 * 根菜单组件类
 * 
 * 这是菜单组件的根容器，负责：
 * - 管理菜单的选中状态（selectedKeys）
 * - 管理子菜单的展开状态（openKeys）
 * - 处理 inline 模式下的收起/展开逻辑
 * - 提供状态存储和事件处理
 */
export default class Menu extends React.Component<MenuProps, MenuState> {
  /**
   * 默认属性值
   */
  static defaultProps: Partial<MenuProps>;
  
  /**
   * 从新 props 派生状态
   * 处理 mode 切换、inlineCollapsed 变化等场景
   */
  static getDerivedStateFromProps(
    nextProps: MenuProps,
    prevState: MenuState
  ): Partial<MenuState> | null;
  
  /**
   * 内部菜单实例引用
   */
  private innerMenu: any;
  
  /**
   * 是否为根菜单标识
   */
  public isRootMenu: boolean;
  
  /**
   * 状态管理 store 实例
   */
  public store: Store;
  
  /**
   * 收起前保存的 openKeys，用于恢复
   */
  private prevOpenKeys: string[] | null;
  
  /**
   * 组件挂载后更新 store 和菜单显示状态
   */
  componentDidMount(): void;
  
  /**
   * 组件更新后同步状态，处理收起/展开逻辑
   */
  componentDidUpdate(prevProps: MenuProps): void;
  
  /**
   * 更新菜单显示状态
   * 在 collapsedWidth 为 0 时隐藏子菜单
   */
  updateMenuDisplay(): void;
  
  /**
   * 获取真实的菜单模式
   * 处理 inline 收起时转为 vertical 模式的逻辑
   */
  getRealMenuMode(): 'vertical' | 'horizontal' | 'inline';
  
  /**
   * 获取菜单是否处于收起状态
   * 优先使用 siderCollapsed，其次使用 inlineCollapsed
   */
  getInlineCollapsed(): boolean;
  
  /**
   * 从 inline 模式恢复到 vertical 模式
   * 清除过渡状态标识
   */
  restoreModeVerticalFromInline(): void;
  
  /**
   * 从 props 更新 store 中的状态
   */
  updateMiniStore(): void;
  
  /**
   * 菜单项选中事件处理
   */
  onSelect: (info: SelectInfo) => void;
  
  /**
   * 菜单项取消选中事件处理
   */
  onDeselect: (info: SelectInfo) => void;
  
  /**
   * 菜单项点击事件处理
   */
  onClick: (info: SelectInfo) => void;
  
  /**
   * 子菜单展开/关闭事件处理
   */
  onOpenChange: (event: OpenEventInfo | OpenEventInfo[]) => void;
  
  /**
   * 鼠标移入事件处理
   */
  onMouseEnter: (event: React.MouseEvent<HTMLUListElement>) => void;
  
  /**
   * CSS 过渡结束事件处理
   * 用于在动画结束后恢复菜单模式
   */
  onTransitionEnd: (event: React.TransitionEvent<HTMLUListElement>) => void;
  
  /**
   * 键盘按键事件处理（代理给内部菜单）
   */
  onKeyDown: (
    event: React.KeyboardEvent,
    callback: (info: SelectInfo) => void
  ) => void;
  
  /**
   * 设置内部菜单实例引用
   */
  setInnerMenu: (instance: any) => void;
  
  /**
   * 渲染菜单组件
   */
  render(): React.ReactElement;
}