/**
 * Input.Group 组件类型定义
 * 用于将多个输入框组合在一起的容器组件
 */

import type { CSSProperties, ReactNode, FocusEvent, MouseEvent } from 'react';

/**
 * Input.Group 组件的属性接口
 */
export interface InputGroupProps {
  /**
   * 自定义类名前缀
   */
  prefixCls?: string;

  /**
   * 自定义容器类名
   */
  className?: string;

  /**
   * 容器样式
   */
  style?: CSSProperties;

  /**
   * 输入框组合的尺寸
   * @default 'default'
   */
  size?: 'large' | 'default' | 'small';

  /**
   * 是否紧凑模式（无间距）
   * @default false
   */
  compact?: boolean;

  /**
   * 子元素内容
   */
  children?: ReactNode;

  /**
   * 鼠标移入事件回调
   */
  onMouseEnter?: (event: MouseEvent<HTMLSpanElement>) => void;

  /**
   * 鼠标移出事件回调
   */
  onMouseLeave?: (event: MouseEvent<HTMLSpanElement>) => void;

  /**
   * 获取焦点事件回调
   */
  onFocus?: (event: FocusEvent<HTMLSpanElement>) => void;

  /**
   * 失去焦点事件回调
   */
  onBlur?: (event: FocusEvent<HTMLSpanElement>) => void;
}

/**
 * Input.Group 组件
 * 用于将多个输入框组合在一起，支持不同尺寸和紧凑模式
 * 
 * @param props - 组件属性
 * @returns React 函数组件
 * 
 * @example
 *