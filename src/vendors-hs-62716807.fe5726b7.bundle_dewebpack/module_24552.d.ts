import React from 'react';

/**
 * Radio 组件的属性接口
 */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /**
   * 指定当前是否选中
   */
  checked?: boolean;

  /**
   * 根据 value 进行比较，判断是否选中
   */
  value?: any;

  /**
   * 禁用 Radio
   * @default false
   */
  disabled?: boolean;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: React.CSSProperties;

  /**
   * 自定义前缀
   */
  prefixCls?: string;

  /**
   * 子元素内容
   */
  children?: React.ReactNode;

  /**
   * 变化时的回调函数
   */
  onChange?: (e: RadioChangeEvent) => void;

  /**
   * 鼠标移入时的回调
   */
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;

  /**
   * 鼠标移出时的回调
   */
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;

  /**
   * input[type="radio"] 的 type 属性
   * @default "radio"
   */
  type?: string;
}

/**
 * Radio 变化事件对象
 */
export interface RadioChangeEvent {
  target: RadioChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

/**
 * Radio 变化事件目标对象
 */
export interface RadioChangeEventTarget extends RadioProps {
  checked: boolean;
}

/**
 * Radio 组件
 * 
 * @description 单选框组件，用于在一组可选项中进行单选
 * 
 * @example
 *