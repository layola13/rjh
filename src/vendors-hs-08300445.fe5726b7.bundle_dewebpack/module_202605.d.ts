/**
 * Mentions组件类型定义
 * 一个支持@提及功能的文本输入组件
 */

import type { Component, ReactNode, CSSProperties, FocusEvent, KeyboardEvent, ChangeEvent } from 'react';

/**
 * 选项数据结构
 */
export interface MentionOption {
  /** 选项的唯一标识 */
  key?: string;
  /** 选项的值 */
  value: string;
  /** 选项的显示内容 */
  label?: ReactNode;
  /** 禁用状态 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  [key: string]: unknown;
}

/**
 * Mentions组件的属性接口
 */
export interface MentionsProps {
  /** 组件类名前缀 */
  prefixCls?: string;
  /** 触发提及的前缀字符，默认为"@" */
  prefix?: string | string[];
  /** 分割字符，默认为空格 */
  split?: string;
  /** 下拉菜单的位置 */
  placement?: 'top' | 'bottom';
  /** 文字方向 */
  direction?: 'ltr' | 'rtl';
  /** 过渡动画名称 */
  transitionName?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 未找到内容时的提示文本 */
  notFoundContent?: ReactNode;
  /** 指定挂载的容器 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** 默认值 */
  defaultValue?: string;
  /** 受控值 */
  value?: string;
  /** 文本域行数 */
  rows?: number;
  /** 子选项（MentionsOption组件） */
  children?: ReactNode;
  
  /**
   * 自定义搜索验证函数
   * @param text 当前搜索文本
   * @param props 组件属性
   * @returns 是否为有效搜索
   */
  validateSearch?: (text: string, props: MentionsProps) => boolean;
  
  /**
   * 自定义过滤选项函数
   * @param searchText 搜索文本
   * @param option 选项数据
   * @returns 是否显示该选项
   */
  filterOption?: false | ((searchText: string, option: MentionOption) => boolean);
  
  /**
   * 值变化时的回调
   * @param value 新的值
   */
  onChange?: (value: string) => void;
  
  /**
   * 选中选项时的回调
   * @param option 选中的选项
   * @param prefix 触发的前缀字符
   */
  onSelect?: (option: MentionOption, prefix: string) => void;
  
  /**
   * 搜索时的回调
   * @param text 搜索文本
   * @param prefix 触发的前缀字符
   */
  onSearch?: (text: string, prefix: string) => void;
  
  /**
   * 按下回车键时的回调
   * @param event 键盘事件
   */
  onPressEnter?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  
  /**
   * 获得焦点时的回调
   * @param event 焦点事件
   */
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  
  /**
   * 失去焦点时的回调
   * @param event 焦点事件
   */
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  
  /** 其他原生textarea属性 */
  [key: string]: unknown;
}

/**
 * Mentions组件的状态接口
 */
export interface MentionsState {
  /** 当前值 */
  value: string;
  /** 是否正在进行提及测量 */
  measuring: boolean;
  /** 测量位置 */
  measureLocation: number;
  /** 测量的文本 */
  measureText: string | null;
  /** 测量的前缀 */
  measurePrefix: string;
  /** 当前激活的选项索引 */
  activeIndex: number;
  /** 是否处于焦点状态 */
  isFocus: boolean;
}

/**
 * Mentions上下文值接口
 */
export interface MentionsContextValue {
  /** 未找到内容时的提示 */
  notFoundContent?: ReactNode;
  /** 当前激活的索引 */
  activeIndex: number;
  /** 设置激活索引的函数 */
  setActiveIndex: (index: number) => void;
  /** 选择选项的函数 */
  selectOption: (option: MentionOption) => void;
  /** 下拉框获得焦点的回调 */
  onFocus: () => void;
  /** 下拉框失去焦点的回调 */
  onBlur: () => void;
}

/**
 * MentionsOption组件的属性接口
 */
export interface MentionsOptionProps {
  /** 选项的值 */
  value: string;
  /** 选项的显示内容 */
  children?: ReactNode;
  /** 禁用状态 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

/**
 * Mentions组件类
 */
export default class Mentions extends Component<MentionsProps, MentionsState> {
  /**
   * 默认属性
   */
  static defaultProps: Partial<MentionsProps>;
  
  /**
   * Option子组件
   */
  static Option: Component<MentionsOptionProps>;
  
  /**
   * 获取派生状态
   * @param props 新的属性
   * @param state 当前状态
   * @returns 新的状态片段
   */
  static getDerivedStateFromProps(props: MentionsProps, state: MentionsState): Partial<MentionsState>;
  
  /** 焦点定时器ID */
  private focusId?: number;
  
  /** 文本域引用 */
  private textarea: HTMLTextAreaElement;
  
  /** 测量元素引用 */
  private measure: HTMLElement;
  
  /**
   * 触发值变化
   * @param value 新的值
   */
  private triggerChange(value: string): void;
  
  /**
   * 输入变化处理
   * @param event 变化事件
   */
  private onChange(event: ChangeEvent<HTMLTextAreaElement>): void;
  
  /**
   * 键盘按下处理
   * @param event 键盘事件
   */
  private onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void;
  
  /**
   * 键盘松开处理
   * @param event 键盘事件
   */
  private onKeyUp(event: KeyboardEvent<HTMLTextAreaElement>): void;
  
  /**
   * 按下回车处理
   * @param event 键盘事件
   */
  private onPressEnter(event: KeyboardEvent<HTMLTextAreaElement>): void;
  
  /**
   * 输入框获得焦点
   * @param event 焦点事件
   */
  private onInputFocus(event: FocusEvent<HTMLTextAreaElement>): void;
  
  /**
   * 输入框失去焦点
   * @param event 焦点事件
   */
  private onInputBlur(event: FocusEvent<HTMLTextAreaElement>): void;
  
  /**
   * 下拉框获得焦点
   */
  private onDropdownFocus(): void;
  
  /**
   * 下拉框失去焦点
   */
  private onDropdownBlur(): void;
  
  /**
   * 统一的焦点处理
   * @param event 焦点事件（可选）
   */
  private onFocus(event?: FocusEvent<HTMLTextAreaElement>): void;
  
  /**
   * 统一的失焦处理
   * @param event 焦点事件（可选）
   */
  private onBlur(event?: FocusEvent<HTMLTextAreaElement>): void;
  
  /**
   * 选择选项
   * @param option 选中的选项
   */
  private selectOption(option: MentionOption): void;
  
  /**
   * 设置激活的索引
   * @param index 索引值
   */
  private setActiveIndex(index: number): void;
  
  /**
   * 设置文本域引用
   * @param element 文本域元素
   */
  private setTextAreaRef(element: unknown): void;
  
  /**
   * 设置测量元素引用
   * @param element 测量元素
   */
  private setMeasureRef(element: HTMLElement): void;
  
  /**
   * 获取过滤后的选项列表
   * @param searchText 搜索文本（可选）
   * @returns 选项数组
   */
  private getOptions(searchText?: string): MentionOption[];
  
  /**
   * 开始测量提及
   * @param text 测量文本
   * @param prefix 前缀字符
   * @param location 位置
   */
  private startMeasure(text: string, prefix: string, location: number): void;
  
  /**
   * 停止测量
   * @param callback 停止后的回调
   */
  private stopMeasure(callback?: () => void): void;
  
  /**
   * 使输入框获得焦点
   */
  focus(): void;
  
  /**
   * 使输入框失去焦点
   */
  blur(): void;
}

/**
 * MentionsOption组件
 */
export class MentionsOption extends Component<MentionsOptionProps> {}