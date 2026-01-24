/**
 * Drawer 组件类型定义
 * 一个从屏幕边缘滑出的面板组件
 */

import { Component, ReactNode, CSSProperties, MouseEvent } from 'react';

/**
 * Drawer 的放置位置
 */
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

/**
 * Drawer 的层级设置
 */
export type DrawerLevel = 'all' | string | string[];

/**
 * Drawer 组件的属性接口
 */
export interface DrawerProps {
  /**
   * 样式类名前缀
   * @default 'drawer'
   */
  prefixCls?: string;

  /**
   * Drawer 的自定义样式类名
   * @default ''
   */
  className?: string;

  /**
   * Drawer 外层容器的样式类名
   * @default ''
   */
  wrapperClassName?: string;

  /**
   * Drawer 的放置位置
   * @default 'left'
   */
  placement?: DrawerPlacement;

  /**
   * 控制 Drawer 是否可见（受控模式）
   */
  open?: boolean;

  /**
   * 初始是否打开（非受控模式）
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * 自定义触发器，用于打开 Drawer
   * @default <div className="drawer-handle"><i className="drawer-handle-icon" /></div>
   */
  handler?: ReactNode | false;

  /**
   * 动画持续时间
   * @default '.3s'
   */
  duration?: string;

  /**
   * 动画缓动函数
   * @default 'cubic-bezier(0.78, 0.14, 0.15, 0.86)'
   */
  ease?: string;

  /**
   * 设置哪些层级的元素会被 Drawer 推动
   * @default 'all'
   */
  level?: DrawerLevel;

  /**
   * 指定 Drawer 挂载的 HTML 节点
   * @default 'body'
   */
  getContainer?: string | HTMLElement | (() => HTMLElement);

  /**
   * 是否显示遮罩层
   * @default true
   */
  showMask?: boolean;

  /**
   * 点击遮罩层是否关闭 Drawer
   * @default true
   */
  maskClosable?: boolean;

  /**
   * 遮罩层的自定义样式
   * @default {}
   */
  maskStyle?: CSSProperties;

  /**
   * 是否支持键盘 ESC 关闭
   * @default true
   */
  keyboard?: boolean;

  /**
   * 强制渲染 Drawer 内容（即使未打开）
   * @default false
   */
  forceRender?: boolean;

  /**
   * 点击触发器的回调函数
   */
  onHandleClick?: (event: MouseEvent<HTMLElement>) => void;

  /**
   * 关闭 Drawer 的回调函数
   */
  onClose?: (event: MouseEvent<HTMLElement> | KeyboardEvent) => void;

  /**
   * Drawer 打开/关闭状态改变时的回调
   */
  onChange?: (open: boolean) => void;

  /**
   * Drawer 完全关闭后的回调（动画结束后）
   */
  afterVisibleChange?: (open: boolean) => void;

  /**
   * Drawer 的子内容
   */
  children?: ReactNode;

  /**
   * @deprecated 已废弃，请使用 onClose
   */
  onMaskClick?: (event: MouseEvent<HTMLElement>) => void;
}

/**
 * Drawer 组件的内部状态接口
 */
export interface DrawerState {
  /**
   * 当前打开状态
   */
  open: boolean;

  /**
   * 前一次的属性（用于 getDerivedStateFromProps）
   */
  prevProps?: DrawerProps;
}

/**
 * Drawer 抽屉组件
 * 
 * 提供从屏幕边缘滑出的面板UI，支持四个方向、遮罩层、键盘交互等特性
 * 
 * @example
 *