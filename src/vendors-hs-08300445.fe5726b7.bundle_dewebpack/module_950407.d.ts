/**
 * 可调整大小的文本域组件
 * @module ResizableTextAreaWrapper
 */

import type { Component, ComponentType, ReactElement } from 'react';

/**
 * ResizableTextArea 组件的属性接口
 */
export interface ResizableTextAreaProps {
  /** 文本域的值（受控模式） */
  value?: string;
  /** 文本域的默认值（非受控模式） */
  defaultValue?: string;
  /** 值变化时的回调函数 */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** 按下回车键时的回调函数 */
  onPressEnter?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  /** 按键按下时的回调函数 */
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  /** 其他 HTML textarea 属性 */
  [key: string]: any;
}

/**
 * ResizableTextArea 组件的状态接口
 */
export interface ResizableTextAreaState {
  /** 当前文本域的值 */
  value?: string;
}

/**
 * ResizableTextArea 内部实例接口
 */
export interface ResizableTextAreaInstance {
  /** 底层的 textarea 元素 */
  textArea: HTMLTextAreaElement;
  /** 调整文本域高度的方法 */
  resizeTextarea: () => void;
}

/**
 * 可调整大小的文本域组件
 * 支持自动调整高度以适应内容
 */
export declare class ResizableTextAreaWrapper extends Component<
  ResizableTextAreaProps,
  ResizableTextAreaState
> {
  /** ResizableTextArea 组件的引用 */
  private resizableTextArea: ResizableTextAreaInstance;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: ResizableTextAreaProps);

  /**
   * 从属性派生状态的静态方法
   * @param nextProps - 下一个属性对象
   * @returns 新的状态对象或 null
   */
  static getDerivedStateFromProps(
    nextProps: ResizableTextAreaProps
  ): Partial<ResizableTextAreaState> | null;

  /**
   * 设置文本域的值
   * @param value - 要设置的值
   * @param callback - 设置完成后的回调函数
   */
  setValue(value: string, callback?: () => void): void;

  /**
   * 使文本域获得焦点
   */
  focus(): void;

  /**
   * 使文本域失去焦点
   */
  blur(): void;

  /**
   * 保存 ResizableTextArea 组件的引用
   * @param instance - ResizableTextArea 实例
   */
  private saveTextArea(instance: ResizableTextAreaInstance): void;

  /**
   * 处理文本变化事件
   * @param event - 变化事件对象
   */
  private handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;

  /**
   * 处理按键按下事件
   * @param event - 键盘事件对象
   */
  private handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>): void;

  /**
   * 渲染组件
   * @returns React 元素
   */
  render(): ReactElement;
}

/**
 * 可调整大小的文本域组件（默认导出）
 */
export default ResizableTextAreaWrapper;

/**
 * 可调整大小的文本域组件（命名导出）
 */
export { ResizableTextAreaWrapper as ResizableTextArea };