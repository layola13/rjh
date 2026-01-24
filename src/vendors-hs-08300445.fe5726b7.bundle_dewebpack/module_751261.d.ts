/**
 * Notice组件 - 通知提示框组件
 * 用于在页面中显示临时通知消息，支持自动关闭和手动关闭
 */

import { Component, ReactNode, CSSProperties, MouseEvent } from 'react';

/**
 * Notice组件的属性接口
 */
export interface NoticeProps {
  /**
   * 样式类名前缀
   * @default 'rc-notification'
   */
  prefixCls?: string;

  /**
   * 自定义样式类名
   */
  className?: string;

  /**
   * 是否显示关闭按钮
   * @default false
   */
  closable?: boolean;

  /**
   * 自定义关闭图标
   */
  closeIcon?: ReactNode;

  /**
   * 自定义样式
   */
  style?: CSSProperties;

  /**
   * 点击通知时的回调函数
   */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;

  /**
   * 通知内容
   */
  children?: ReactNode;

  /**
   * 通知的唯一标识key
   */
  noticeKey: string | number;

  /**
   * 自动关闭的延迟时间（秒）
   * 设置为null或0时不自动关闭
   * @default 1.5
   */
  duration?: number | null;

  /**
   * 关闭时的回调函数
   * @param key 通知的唯一标识
   */
  onClose?: (key: string | number) => void;

  /**
   * 更新标记，用于触发定时器重启
   * 当此值变化时，会重新启动关闭定时器
   */
  updateMark?: string | number;

  /**
   * 是否可见
   */
  visible?: boolean;

  /**
   * Portal挂载的DOM容器
   * 如果提供，组件将通过ReactDOM.createPortal渲染到该容器中
   */
  holder?: HTMLElement;

  /**
   * 其他HTML data-* 属性
   */
  [key: `data-${string}`]: unknown;

  /**
   * 其他HTML aria-* 属性
   */
  [key: `aria-${string}`]: unknown;

  /**
   * ARIA role属性
   */
  role?: string;
}

/**
 * Notice组件的状态接口
 */
export interface NoticeState {}

/**
 * Notice组件类
 * 一个可自动或手动关闭的通知组件
 * 
 * @example
 *