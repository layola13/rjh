import * as React from 'react';

/**
 * 修复受控组件的值，将 null/undefined 转换为空字符串
 * @param value - 输入值
 * @returns 处理后的值
 */
export function fixControlledValue(value: any): string;

/**
 * 获取输入框的 className
 * @param prefixCls - 类名前缀
 * @param bordered - 是否显示边框
 * @param size - 输入框尺寸
 * @param disabled - 是否禁用
 * @param direction - 文本方向
 * @returns 组合后的 className
 */
export function getInputClassName(
  prefixCls: string,
  bordered: boolean,
  size?: 'small' | 'large' | 'default',
  disabled?: boolean,
  direction?: 'ltr' | 'rtl'
): string;

/**
 * 触发 onChange 事件
 * @param element - 输入元素
 * @param event - 事件对象
 * @param onChange - onChange 回调函数
 */
export function resolveOnChange(
  element: HTMLInputElement,
  event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>,
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => void
): void;

/**
 * 聚焦选项
 */
export interface FocusOptions {
  /** 光标位置：start-开始, end-结束, all-全选 */
  cursor?: 'start' | 'end' | 'all';
}

/**
 * 触发输入框聚焦
 * @param element - 输入元素
 * @param options - 聚焦选项
 */
export function triggerFocus(element: HTMLInputElement | null, options?: FocusOptions): void;

/**
 * Input 组件属性
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** 类名前缀 */
  prefixCls?: string;
  /** 输入框类型 */
  type?: string;
  /** 输入框内容 */
  value?: string;
  /** 默认内容 */
  defaultValue?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 输入框大小 */
  size?: 'small' | 'large' | 'default';
  /** 自定义类名 */
  className?: string;
  /** 是否有边框 */
  bordered?: boolean;
  /** 前置标签 */
  addonBefore?: React.ReactNode;
  /** 后置标签 */
  addonAfter?: React.ReactNode;
  /** 前缀图标 */
  prefix?: React.ReactNode;
  /** 后缀图标 */
  suffix?: React.ReactNode;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 按下回车的回调 */
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** 输入框内容变化时的回调 */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 获得焦点时的回调 */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** 失去焦点时的回调 */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** 按键按下时的回调 */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** 输入框类型（内部使用） */
  inputType?: string;
}

/**
 * Input 组件状态
 */
export interface InputState {
  /** 当前值 */
  value: string | undefined;
  /** 是否聚焦 */
  focused: boolean;
  /** 前一个值 */
  prevValue?: string;
}

/**
 * Input 输入框组件
 */
export default class Input extends React.Component<InputProps, InputState> {
  /** 默认属性 */
  static defaultProps: {
    type: string;
  };

  /** 静态方法：从 props 派生 state */
  static getDerivedStateFromProps(
    nextProps: InputProps,
    prevState: InputState
  ): Partial<InputState> | null;

  /** 输入框 DOM 元素引用 */
  input: HTMLInputElement;

  /** 可清除输入框组件引用 */
  clearableInput: any;

  /** 文本方向 */
  direction: 'ltr' | 'rtl';

  /** 清除密码值超时句柄 */
  removePasswordTimeout?: number;

  /**
   * 使输入框获得焦点
   * @param options - 聚焦选项
   */
  focus(options?: FocusOptions): void;

  /**
   * 使输入框失去焦点
   */
  blur(): void;

  /**
   * 选中输入框内容
   */
  select(): void;

  /**
   * 设置选择范围
   * @param start - 开始位置
   * @param end - 结束位置
   * @param direction - 选择方向
   */
  setSelectionRange(
    start: number,
    end: number,
    direction?: 'forward' | 'backward' | 'none'
  ): void;

  /**
   * 保存可清除输入框引用
   * @param input - 输入框组件实例
   */
  saveClearableInput(input: any): void;

  /**
   * 保存输入框引用
   * @param input - 输入框 DOM 元素
   */
  saveInput(input: HTMLInputElement): void;

  /**
   * 聚焦事件处理
   * @param event - 聚焦事件
   */
  onFocus(event: React.FocusEvent<HTMLInputElement>): void;

  /**
   * 失焦事件处理
   * @param event - 失焦事件
   */
  onBlur(event: React.FocusEvent<HTMLInputElement>): void;

  /**
   * 重置输入框内容
   * @param event - 鼠标事件
   */
  handleReset(event: React.MouseEvent<HTMLElement>): void;

  /**
   * 渲染输入框元素
   * @param prefixCls - 类名前缀
   * @param size - 尺寸
   * @param bordered - 是否有边框
   * @param inputConfig - 输入框配置
   * @returns React 元素
   */
  renderInput(
    prefixCls: string,
    size?: 'small' | 'large' | 'default',
    bordered?: boolean,
    inputConfig?: { autoComplete?: string }
  ): React.ReactElement;

  /**
   * 清除密码输入框的 value 属性
   */
  clearPasswordValueAttribute(): void;

  /**
   * 输入变化事件处理
   * @param event - 变化事件
   */
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;

  /**
   * 按键事件处理
   * @param event - 按键事件
   */
  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;

  /**
   * 渲染组件
   * @param config - 配置上下文
   * @returns React 元素
   */
  renderComponent(config: {
    getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
    direction: 'ltr' | 'rtl';
    input?: any;
  }): React.ReactElement;

  /**
   * 设置输入框的值
   * @param value - 新值
   * @param callback - 回调函数
   */
  setValue(value: string, callback?: () => void): void;
}