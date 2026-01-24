/**
 * React Checkbox 组件类型定义
 * 基于 rc-checkbox 的类型声明
 */

import React from 'react';

/**
 * Checkbox 变更事件对象
 */
export interface CheckboxChangeEvent {
  /** 目标元素属性，包含最新的 checked 状态 */
  target: CheckboxChangeEventTarget;
  /** 阻止事件冒泡 */
  stopPropagation: () => void;
  /** 阻止默认行为 */
  preventDefault: () => void;
  /** 原生事件对象 */
  nativeEvent: Event;
}

/**
 * Checkbox 变更事件目标对象
 */
export interface CheckboxChangeEventTarget extends CheckboxProps {
  /** 当前选中状态 */
  checked: boolean;
}

/**
 * Checkbox 组件属性接口
 */
export interface CheckboxProps {
  /** 组件类名前缀 */
  prefixCls?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 表单字段名称 */
  name?: string;
  /** 元素 ID */
  id?: string;
  /** Input 类型 */
  type?: string;
  /** 默认选中状态（非受控） */
  defaultChecked?: boolean;
  /** 选中状态（受控） */
  checked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** Tab 键顺序 */
  tabIndex?: number;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
  /** Input 的 value 属性 */
  value?: any;
  /** 是否必填 */
  required?: boolean;
  /** 点击事件处理器 */
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  /** 获得焦点事件处理器 */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /** 失去焦点事件处理器 */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** 键盘按下事件处理器 */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 键盘按键事件处理器 */
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 键盘释放事件处理器 */
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 变更事件处理器 */
  onChange?: (event: CheckboxChangeEvent) => void;
  /** ARIA 无障碍属性（支持所有 aria-* 属性） */
  [key: `aria-${string}`]: any;
  /** 数据属性（支持所有 data-* 属性） */
  [key: `data-${string}`]: any;
  /** ARIA role 属性 */
  role?: string;
}

/**
 * Checkbox 组件状态接口
 */
export interface CheckboxState {
  /** 当前选中状态 */
  checked: boolean;
}

/**
 * Checkbox 复选框组件
 * 
 * @example
 *