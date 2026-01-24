/**
 * Radio Button Component Type Definitions
 * A radio button component that integrates with Radio.Group context
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Radio Button 组件的属性接口
 */
export interface RadioButtonProps {
  /**
   * 自定义类名前缀
   * @default 'radio-button'
   */
  prefixCls?: string;

  /**
   * Radio Button 的值
   */
  value?: any;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否选中（受控）
   */
  checked?: boolean;

  /**
   * 默认是否选中（非受控）
   */
  defaultChecked?: boolean;

  /**
   * 自动获取焦点
   */
  autoFocus?: boolean;

  /**
   * 子节点内容
   */
  children?: React.ReactNode;

  /**
   * 自定义样式类名
   */
  className?: string;

  /**
   * 自定义内联样式
   */
  style?: React.CSSProperties;

  /**
   * 变化时的回调函数
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * 点击事件回调
   */
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;

  /**
   * 失去焦点时的回调
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * 获得焦点时的回调
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * Radio Button 组件
 * 
 * 用于在 Radio.Group 中作为按钮样式的单选项
 * 自动继承 Radio.Group 的 value 和 disabled 状态
 * 
 * @example
 *