import { Component, ReactNode, CSSProperties, FocusEventHandler } from 'react';

/**
 * 下拉选项配置接口
 */
export interface MentionOption {
  /** 选项唯一标识 */
  key: string;
  /** 是否禁用该选项 */
  disabled?: boolean;
  /** 选项显示内容 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

/**
 * 下拉菜单渲染函数的参数接口
 */
export interface DropdownRenderParams {
  /** 无数据时的提示内容 */
  notFoundContent: ReactNode;
  /** 当前激活选项的索引 */
  activeIndex: number;
  /** 设置激活选项索引的回调函数 */
  setActiveIndex: (index: number) => void;
  /** 选择选项时的回调函数 */
  selectOption: (option: MentionOption | undefined) => void;
  /** 聚焦事件处理器 */
  onFocus: FocusEventHandler<HTMLElement>;
  /** 失焦事件处理器 */
  onBlur: FocusEventHandler<HTMLElement>;
}

/**
 * Mentions 下拉菜单组件的属性接口
 */
export interface MentionsDropdownProps {
  /** 组件类名前缀，用于样式命名空间 */
  prefixCls: string;
  /** 下拉菜单的选项列表 */
  options: MentionOption[];
}

/**
 * Mentions 上下文消费者组件的属性接口
 */
export interface MentionsContextValue extends Omit<DropdownRenderParams, 'activeIndex' | 'setActiveIndex' | 'selectOption' | 'onFocus' | 'onBlur'> {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  selectOption: (option: MentionOption | undefined) => void;
  onFocus: FocusEventHandler<HTMLElement>;
  onBlur: FocusEventHandler<HTMLElement>;
}

/**
 * Mentions 下拉菜单组件
 * 
 * 该组件用于渲染 @ 提及功能的下拉选项列表，支持键盘导航和鼠标交互。
 * 
 * @example
 *