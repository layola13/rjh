/**
 * Input 组件的包装器，用于处理前缀、后缀、清除按钮和插槽等功能
 */

import * as React from 'react';

/**
 * 输入框类型元组
 */
export type InputType = 'text' | 'input';

/**
 * Input 包装器组件的属性接口
 */
export interface InputWrapperProps {
  /** 输入框的前缀类名 */
  prefixCls: string;
  
  /** 输入框类型：'text' 表示 TextArea，'input' 表示普通 Input */
  inputType: InputType;
  
  /** 要包装的原始输入框元素 */
  element: React.ReactElement;
  
  /** 输入框的值 */
  value?: string | number | readonly string[];
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 是否只读 */
  readOnly?: boolean;
  
  /** 输入框大小 */
  size?: 'small' | 'middle' | 'large';
  
  /** 是否显示边框 */
  bordered?: boolean;
  
  /** 文本方向 */
  direction?: 'ltr' | 'rtl';
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 是否聚焦 */
  focused?: boolean;
  
  /** 前缀图标或内容 */
  prefix?: React.ReactNode;
  
  /** 后缀图标或内容 */
  suffix?: React.ReactNode;
  
  /** 是否显示清除按钮 */
  allowClear?: boolean;
  
  /** 前置标签 */
  addonBefore?: React.ReactNode;
  
  /** 后置标签 */
  addonAfter?: React.ReactNode;
  
  /** 清除按钮点击回调 */
  handleReset?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /** 触发聚焦的回调函数 */
  triggerFocus?: () => void;
}

/**
 * 检查是否包含前缀、后缀或清除按钮
 * @param props - 组件属性
 * @returns 如果包含前缀、后缀或允许清除则返回 true
 */
export function hasPrefixSuffix(props: Pick<InputWrapperProps, 'prefix' | 'suffix' | 'allowClear'>): boolean;

/**
 * Input 包装器组件类
 * 负责渲染输入框的前缀、后缀、清除按钮、前置/后置标签等装饰元素
 */
export default class InputWrapper extends React.Component<InputWrapperProps> {
  /** 容器元素的引用 */
  containerRef: React.RefObject<HTMLSpanElement>;
  
  /**
   * 鼠标松开时的处理函数
   * @param event - 鼠标事件
   */
  onInputMouseUp: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * 渲染清除图标
   * @param prefixCls - 前缀类名
   * @returns 清除图标元素或 null
   */
  renderClearIcon(prefixCls: string): React.ReactElement | null;
  
  /**
   * 渲染后缀内容（包括清除按钮和自定义后缀）
   * @param prefixCls - 前缀类名
   * @returns 后缀元素或 null
   */
  renderSuffix(prefixCls: string): React.ReactElement | null;
  
  /**
   * 渲染带有前缀和后缀图标的输入框
   * @param prefixCls - 前缀类名
   * @param element - 原始输入框元素
   * @returns 包装后的输入框元素
   */
  renderLabeledIcon(prefixCls: string, element: React.ReactElement): React.ReactElement;
  
  /**
   * 渲染带有前置/后置标签的输入框
   * @param prefixCls - 前缀类名
   * @param element - 原始输入框元素
   * @returns 包装后的输入框元素
   */
  renderInputWithLabel(prefixCls: string, element: React.ReactElement): React.ReactElement;
  
  /**
   * 渲染带有清除按钮的文本域
   * @param prefixCls - 前缀类名
   * @param element - 原始文本域元素
   * @returns 包装后的文本域元素
   */
  renderTextAreaWithClearIcon(prefixCls: string, element: React.ReactElement): React.ReactElement;
  
  /**
   * 渲染组件
   * @returns 渲染的 React 元素
   */
  render(): React.ReactElement;
}