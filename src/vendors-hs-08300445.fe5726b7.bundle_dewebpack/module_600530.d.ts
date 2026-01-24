/**
 * InputNumber 组件类型定义
 * 一个支持数字输入、步进控制的输入框组件
 */

import React from 'react';

/** 最大安全整数常量 */
declare const MAX_SAFE_INTEGER: number;

/**
 * 步进方向类型
 */
type StepType = 'up' | 'down';

/**
 * 步进回调参数
 */
interface StepCallbackParams {
  /** 步进偏移量 */
  offset: number;
  /** 步进类型 */
  type: StepType;
}

/**
 * InputNumber 组件属性接口
 */
export interface InputNumberProps {
  /** 样式类名前缀 */
  prefixCls?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否使用触摸事件 */
  useTouch?: boolean;
  /** 自动完成属性 */
  autoComplete?: string;
  /** 自定义向上按钮 */
  upHandler?: React.ReactNode;
  /** 自定义向下按钮 */
  downHandler?: React.ReactNode;
  /** 组件样式类名 */
  className?: string;
  /** 最大值 */
  max?: number;
  /** 最小值 */
  min?: number;
  /** 组件样式 */
  style?: React.CSSProperties;
  /** 标题提示 */
  title?: string;
  /** 鼠标移入事件 */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** 鼠标移出事件 */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /** 鼠标悬停事件 */
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
  /** 鼠标离开事件 */
  onMouseOut?: React.MouseEventHandler<HTMLDivElement>;
  /** 是否必填 */
  required?: boolean;
  /** 点击事件 */
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  /** Tab 索引 */
  tabIndex?: number;
  /** 输入框类型 */
  type?: string;
  /** 占位符 */
  placeholder?: string;
  /** 输入框 ID */
  id?: string;
  /** 输入模式 */
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  /** 输入模式正则 */
  pattern?: string;
  /** 步进增量 */
  step?: number | string;
  /** 最大输入长度 */
  maxLength?: number;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
  /** 输入框名称 */
  name?: string;
  /** 粘贴事件 */
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  /** 输入事件 */
  onInput?: React.FormEventHandler<HTMLInputElement>;
  /** 当前值 */
  value?: number | string;
  /** 默认值 */
  defaultValue?: number | string;
  /** 值变化回调 */
  onChange?: (value: number | null) => void;
  /** 键盘按下事件 */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 键盘抬起事件 */
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 按下回车键事件 */
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 聚焦事件 */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /** 失焦事件 */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** 鼠标抬起事件 */
  onMouseUp?: React.MouseEventHandler<HTMLInputElement>;
  /** 步进回调 */
  onStep?: (value: number, info: StepCallbackParams) => void;
  /** 数值精度 */
  precision?: number;
  /** 自定义格式化函数 */
  formatter?: (value: number | string) => string;
  /** 自定义解析函数 */
  parser?: (displayValue: string) => string;
  /** 小数分隔符 */
  decimalSeparator?: string;
  /** 步进时是否自动聚焦 */
  focusOnUpDown?: boolean;
}

/**
 * InputNumber 组件状态接口
 */
interface InputNumberState {
  /** 当前数值 */
  value: number | null;
  /** 输入框显示值 */
  inputValue: number | string;
  /** 是否聚焦 */
  focused: boolean;
}

/**
 * 数字输入框组件
 * 支持步进控制、精度控制、格式化等功能
 */
export default class InputNumber extends React.Component<InputNumberProps, InputNumberState> {
  /** 默认属性 */
  static defaultProps: Partial<InputNumberProps>;

  /** 输入框 DOM 引用 */
  private input: HTMLInputElement;
  /** 光标起始位置 */
  private cursorStart?: number;
  /** 光标结束位置 */
  private cursorEnd?: number;
  /** 当前输入值 */
  private currentValue?: string;
  /** 光标前的文本 */
  private cursorBefore?: string;
  /** 光标后的文本 */
  private cursorAfter?: string;
  /** 最后按下的键码 */
  private lastKeyCode?: number;
  /** 是否正在输入 */
  private inputting: boolean;
  /** 原始输入值 */
  private rawInput?: string;
  /** 是否正在按上下键 */
  private pressingUpOrDown: boolean;
  /** 自动步进定时器 */
  private autoStepTimer?: number;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: InputNumberProps);

  /**
   * 组件挂载后的生命周期
   */
  componentDidMount(): void;

  /**
   * 组件更新后的生命周期
   * @param prevProps - 更新前的属性
   */
  componentDidUpdate(prevProps: InputNumberProps | null): void;

  /**
   * 组件卸载前的生命周期
   */
  componentWillUnmount(): void;

  /**
   * 键盘按下事件处理
   * @param event - 键盘事件
   */
  private onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;

  /**
   * 键盘抬起事件处理
   * @param event - 键盘事件
   */
  private onKeyUp: React.KeyboardEventHandler<HTMLInputElement>;

  /**
   * 输入变化事件处理
   * @param event - 变化事件
   */
  private onChange: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * 鼠标抬起事件处理
   */
  private onMouseUp: React.MouseEventHandler<HTMLInputElement>;

  /**
   * 聚焦事件处理
   */
  private onFocus: React.FocusEventHandler<HTMLInputElement>;

  /**
   * 失焦事件处理
   */
  private onBlur: React.FocusEventHandler<HTMLInputElement>;

  /**
   * 获取当前有效值
   * @param inputValue - 输入值
   * @returns 有效的数值
   */
  private getCurrentValidValue(inputValue: string | number): number | null;

  /**
   * 从事件中获取值
   * @param event - 变化事件
   * @returns 解析后的值
   */
  private getValueFromEvent(event: React.ChangeEvent<HTMLInputElement>): string;

  /**
   * 获取有效值（在最大最小值范围内）
   * @param value - 输入值
   * @returns 有效值
   */
  private getValidValue(value: number | string): number | string;

  /**
   * 设置值并触发回调
   * @param value - 要设置的值
   * @param callback - 设置后的回调
   * @returns 设置后的值
   */
  private setValue(value: number | string, callback: () => void): number | null;

  /**
   * 获取最大精度
   * @param currentValue - 当前值
   * @param ratio - 比率
   * @returns 最大精度位数
   */
  private getMaxPrecision(currentValue: number | string, ratio?: number): number;

  /**
   * 获取精度因子
   * @param currentValue - 当前值
   * @param ratio - 比率
   * @returns 精度因子（10的幂）
   */
  private getPrecisionFactor(currentValue: number | string, ratio?: number): number;

  /**
   * 聚焦输入框
   */
  focus(): void;

  /**
   * 失焦输入框
   */
  blur(): void;

  /**
   * 选中输入框内容
   */
  select(): void;

  /**
   * 格式化包装函数
   * @param value - 要格式化的值
   * @returns 格式化后的值
   */
  private formatWrapper(value: number | string): string;

  /**
   * 按步进精度转换值
   * @param value - 输入值
   * @returns 转换后的值
   */
  private toPrecisionAsStep(value: number | string): string | number;

  /**
   * 转换为数字
   * @param value - 输入值
   * @returns 数字或原值
   */
  private toNumber(value: number | string): number | string;

  /**
   * 向上步进
   * @param currentValue - 当前值
   * @param ratio - 步进比率
   * @returns 步进后的值
   */
  private upStep(currentValue: number, ratio: number): number | string;

  /**
   * 向下步进
   * @param currentValue - 当前值
   * @param ratio - 步进比率
   * @returns 步进后的值
   */
  private downStep(currentValue: number, ratio: number): number | string;

  /**
   * 执行步进操作
   * @param type - 步进类型
   * @param event - 事件对象
   * @param ratio - 步进比率
   * @param recursive - 是否递归调用
   */
  private step(
    type: StepType,
    event: React.MouseEvent | React.TouchEvent | React.KeyboardEvent | null,
    ratio?: number,
    recursive?: boolean
  ): void;

  /**
   * 修复光标位置
   * @param start - 起始位置
   * @param end - 结束位置
   */
  private fixCaret(start: number, end: number): void;

  /**
   * 获取步进比率（根据修饰键）
   * @param event - 键盘事件
   * @returns 步进比率
   */
  private getRatio(event: React.KeyboardEvent): number;

  /**
   * 获取完整数字字符串（处理科学计数法）
   * @param value - 数值
   * @returns 完整数字字符串
   */
  private getFullNum(value: number | string): string | number;

  /**
   * 获取数值精度
   * @param value - 数值
   * @returns 精度位数
   */
  private getPrecision(value: number | string): number;

  /**
   * 获取输入框显示值
   * @param state - 组件状态
   * @returns 显示值
   */
  private getInputDisplayValue(state?: Partial<InputNumberState> | null): string;

  /**
   * 记录光标位置
   */
  private recordCursorPosition(): void;

  /**
   * 根据光标后文本恢复光标位置
   * @param after - 光标后的文本
   * @returns 是否成功恢复
   */
  private restoreByAfter(after?: string): boolean;

  /**
   * 部分恢复光标位置
   * @param after - 光标后的文本
   * @returns 是否成功恢复
   */
  private partRestoreByAfter(after?: string): boolean;

  /**
   * 判断是否为不完整的数字
   * @param value - 输入值
   * @returns 是否不完整
   */
  private isNotCompleteNumber(value: number | string): boolean;

  /**
   * 停止自动步进
   */
  private stop(): void;

  /**
   * 向下步进
   * @param event - 事件对象
   * @param ratio - 步进比率
   * @param recursive - 是否递归调用
   */
  private down(
    event: React.MouseEvent | React.TouchEvent | React.KeyboardEvent | null,
    ratio: number,
    recursive: boolean | null
  ): void;

  /**
   * 向上步进
   * @param event - 事件对象
   * @param ratio - 步进比率
   * @param recursive - 是否递归调用
   */
  private up(
    event: React.MouseEvent | React.TouchEvent | React.KeyboardEvent | null,
    ratio: number,
    recursive: boolean | null
  ): void;

  /**
   * 保存输入框引用
   * @param element - 输入框元素
   */
  private saveInput(element: HTMLInputElement): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}