import React from 'react';

/**
 * Checkbox组件的属性接口
 */
export interface CheckboxProps {
  /** 组件的CSS类名前缀 */
  prefixCls?: string;
  /** 自定义CSS类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** input元素的name属性 */
  name?: string;
  /** input元素的id属性 */
  id?: string;
  /** input的类型，通常为checkbox */
  type?: string;
  /** 默认是否选中（非受控模式） */
  defaultChecked?: boolean;
  /** 是否选中（受控模式） */
  checked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** tab键顺序 */
  tabIndex?: number;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** input元素的value属性 */
  value?: string | number;
  /** 是否必填 */
  required?: boolean;
  /** 点击事件处理函数 */
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  /** 获取焦点事件处理函数 */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /** 失去焦点事件处理函数 */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** 键盘按下事件处理函数 */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 键盘按压事件处理函数 */
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 键盘抬起事件处理函数 */
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 
   * 值改变事件处理函数
   * @param e - 包含目标属性和事件方法的自定义事件对象
   */
  onChange?: (e: CheckboxChangeEvent) => void;
}

/**
 * Checkbox变更事件对象
 */
export interface CheckboxChangeEvent {
  /** 目标元素的属性（合并了props和checked状态） */
  target: CheckboxProps & { checked: boolean };
  /** 阻止事件冒泡 */
  stopPropagation: () => void;
  /** 阻止默认行为 */
  preventDefault: () => void;
  /** 原生事件对象 */
  nativeEvent: Event;
}

/**
 * Checkbox组件的状态接口
 */
export interface CheckboxState {
  /** 当前是否选中 */
  checked: boolean;
}

/**
 * rc-checkbox - React Checkbox组件
 * 
 * 一个功能完整的复选框组件，支持受控和非受控两种模式。
 * 
 * @example
 *