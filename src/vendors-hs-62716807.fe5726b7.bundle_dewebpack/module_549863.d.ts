import type { ReactNode, ButtonHTMLAttributes, MouseEvent } from 'react';

/**
 * 按钮类型，用于确定按钮的样式主题
 */
export type ButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link' | 'ghost';

/**
 * 关闭模态框的回调函数
 */
export type CloseModalCallback = (...args: any[]) => void;

/**
 * 操作函数，可以返回 Promise 以支持异步操作
 * - 如果函数接受参数（length > 0），则传入 closeModal 回调
 * - 如果返回 falsy 值，不会关闭模态框
 * - 如果返回 Promise，会显示 loading 状态直到 Promise resolve
 */
export type ActionFunction = 
  | ((closeModal: CloseModalCallback) => void | boolean | Promise<any>)
  | (() => void | boolean | Promise<any>);

/**
 * 模态框操作按钮的属性接口
 */
export interface ModalActionButtonProps {
  /**
   * 按钮类型，决定按钮的视觉样式
   */
  type?: ButtonType;

  /**
   * 按钮显示的内容
   */
  children?: ReactNode;

  /**
   * 按钮的样式类名前缀
   */
  prefixCls?: string;

  /**
   * 传递给底层 Button 组件的额外属性
   */
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    [key: string]: any;
  };

  /**
   * 是否自动聚焦到该按钮
   * @default false
   */
  autoFocus?: boolean;

  /**
   * 点击按钮时执行的操作函数
   * - 可以同步执行并返回 boolean 来决定是否关闭模态框
   * - 可以返回 Promise 来执行异步操作，按钮会显示 loading 状态
   */
  actionFn?: ActionFunction;

  /**
   * 关闭模态框的回调函数
   */
  closeModal: CloseModalCallback;
}

/**
 * 模态框操作按钮组件
 * 
 * 用于模态框的确认/取消等操作按钮，支持：
 * - 自动聚焦
 * - 异步操作（显示 loading 状态）
 * - 防止重复点击
 * - 灵活的操作函数定义
 * 
 * @param props - 组件属性
 * @returns React 函数组件
 * 
 * @example
 *