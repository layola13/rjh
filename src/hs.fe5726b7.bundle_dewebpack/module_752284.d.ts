import React from 'react';

/**
 * 下拉菜单选项配置
 */
export interface DropdownOption {
  /** 选项唯一标识 */
  id: string;
  /** 选项显示文本 */
  label?: string;
  /** 选项图标 URL */
  icon?: string;
}

/**
 * Popover 气泡提示配置
 */
export interface PopoverConfig {
  /** 气泡位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 触发方式 */
  trigger?: 'hover' | 'click';
  /** 延迟时间（毫秒） */
  delay?: number;
  /** 打开延迟时间（毫秒） */
  delayOpen?: number;
  /** 关闭延迟时间（毫秒） */
  delayClose?: number;
  /** 图片 URL */
  imageUrl?: string;
  /** 视频 URL */
  videoUrl?: string;
  /** 提示文本 */
  text?: string;
  /** 是否显示按钮 */
  showBtn?: boolean;
  /** 按钮点击回调 */
  onBtnClick?: () => void;
  /** 按钮文本 */
  btnText?: string;
  /** 链接文本 */
  linkText?: string;
  /** 链接 URL */
  linkUrl?: string;
}

/**
 * 下拉菜单数据配置
 */
export interface DropdownData {
  /** 标题 */
  title?: string;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 自定义组件类名 */
  customClassName?: string;
  /** 选项列表 */
  options: DropdownOption[];
  /** 所有选项列表（包括隐藏选项） */
  allOptions?: DropdownOption[];
  /** 默认选中的选项 ID */
  defaultKey?: string;
  /** 布局方向 */
  direction?: 'row' | 'column';
  /** 触发方式 */
  trigger?: 'click' | 'hover';
  /** 气泡提示配置 */
  popover?: PopoverConfig;
  /** 选项变更回调 */
  onchange: (selectedId: string) => void;
  /** 下拉菜单点击回调 */
  onClickDropDown?: () => void;
  /** 下拉菜单隐藏回调 */
  onHideDropDown?: () => void;
}

/**
 * 下拉菜单组件 Props
 */
export interface DropdownProps {
  /** 下拉菜单数据配置 */
  data?: DropdownData;
  /** 组件 ID */
  id?: string;
}

/**
 * 下拉菜单组件 State
 */
export interface DropdownState {
  /** 下拉菜单显示状态 */
  show: boolean;
}

/**
 * 下拉菜单组件
 * 
 * @description
 * 支持点击和悬停两种触发方式的下拉选择组件。
 * 可配置图标、标题、自定义样式和气泡提示。
 * 
 * @example
 *