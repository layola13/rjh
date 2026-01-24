/**
 * Dialog component type definitions
 * 对话框组件类型定义
 */

import type { ReactNode, ReactElement } from 'react';

/**
 * Dialog component props interface
 * 对话框组件属性接口
 */
export interface DialogProps {
  /**
   * Whether the dialog is visible
   * 对话框是否可见
   */
  visible: boolean;

  /**
   * Function to get the container element for the dialog
   * 获取对话框容器元素的函数
   * @returns The container element or false to render in place
   */
  getContainer?: (() => HTMLElement) | false;

  /**
   * Whether to render the dialog even when not visible
   * 是否在不可见时也渲染对话框
   * @default false
   */
  forceRender?: boolean;

  /**
   * Whether to destroy the dialog on close
   * 关闭时是否销毁对话框
   * @default false
   */
  destroyOnClose?: boolean;

  /**
   * Callback function called after the dialog is closed
   * 对话框关闭后的回调函数
   */
  afterClose?: () => void;

  /**
   * Additional props passed to the dialog
   * 传递给对话框的其他属性
   */
  [key: string]: unknown;
}

/**
 * Dialog component
 * 对话框组件
 * 
 * @remarks
 * A modal dialog component that supports portal rendering, lazy mounting, and destroy on close.
 * 支持传送门渲染、延迟挂载和关闭时销毁的模态对话框组件。
 * 
 * @param props - The dialog component props
 * @returns A React element representing the dialog
 */
declare const Dialog: {
  (props: DialogProps): ReactElement | null;
  
  /**
   * Display name for debugging
   * 用于调试的显示名称
   */
  displayName: string;
};

export default Dialog;