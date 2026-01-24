/**
 * Cascader 组件类型定义
 * 提供级联选择器的完整类型声明
 */

import type { Component, ReactNode, CSSProperties, ReactElement } from 'react';
import type { SizeType } from '../config-provider/SizeContext';
import type { ConfigConsumerProps } from '../config-provider';
import type { Locale } from '../locale-provider';

/**
 * 级联选择器选项的值类型
 */
export type CascaderValueType = string | number;

/**
 * 级联选择器选项数据结构
 */
export interface CascaderOptionType {
  /** 选项的值 */
  value?: CascaderValueType;
  /** 选项的标签文本 */
  label?: ReactNode;
  /** 子选项列表 */
  children?: CascaderOptionType[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为叶子节点（用于动态加载） */
  isLeaf?: boolean;
  /** 是否为空节点（内部使用） */
  isEmptyNode?: boolean;
  /** 扩展属性 */
  [key: string]: any;
}

/**
 * 字段名映射配置
 * 用于自定义选项数据结构中的字段名
 */
export interface FieldNamesType {
  /** 子选项字段名，默认 'children' */
  children?: string;
  /** 标签字段名，默认 'label' */
  label?: string;
  /** 值字段名，默认 'value' */
  value?: string;
}

/**
 * 搜索配置选项
 */
export interface ShowSearchType {
  /**
   * 自定义过滤函数
   * @param inputValue - 输入的搜索文本
   * @param path - 选项路径数组
   * @param names - 字段名配置
   * @returns 是否匹配
   */
  filter?: (inputValue: string, path: CascaderOptionType[], names: FilledFieldNamesType) => boolean;
  
  /**
   * 自定义渲染函数
   * @param inputValue - 输入的搜索文本
   * @param path - 选项路径数组
   * @param prefixCls - 样式类名前缀
   * @param names - 字段名配置
   * @returns 渲染结果
   */
  render?: (inputValue: string, path: CascaderOptionType[], prefixCls: string, names: FilledFieldNamesType) => ReactNode;
  
  /**
   * 自定义排序函数
   * @param a - 选项A的路径
   * @param b - 选项B的路径
   * @param inputValue - 输入的搜索文本
   * @param names - 字段名配置
   * @returns 排序结果
   */
  sort?: (a: CascaderOptionType[], b: CascaderOptionType[], inputValue: string, names: FilledFieldNamesType) => number;
  
  /** 搜索结果展示数量限制，默认 50，设置为 false 不限制 */
  limit?: number | false;
  
  /** 搜索框是否与下拉框等宽，默认 true */
  matchInputWidth?: boolean;
}

/**
 * 填充完整的字段名配置（内部使用）
 */
export interface FilledFieldNamesType {
  children: string;
  label: string;
  value: string;
}

/**
 * Cascader 组件的 Props
 */
export interface CascaderProps {
  /** 可选项数据源 */
  options?: CascaderOptionType[];
  
  /** 默认的选中项 */
  defaultValue?: CascaderValueType[];
  
  /** 指定选中项（受控模式） */
  value?: CascaderValueType[];
  
  /** 选择完成后的回调 */
  onChange?: (value: CascaderValueType[], selectedOptions: CascaderOptionType[]) => void;
  
  /** 显示在选择框中的内容 */
  displayRender?: (labels: string[], selectedOptions: CascaderOptionType[]) => ReactNode;
  
  /** 自定义样式 */
  style?: CSSProperties;
  
  /** 自定义类名 */
  className?: string;
  
  /** 弹出层的类名 */
  popupClassName?: string;
  
  /** 弹出层的样式 */
  popupStyle?: CSSProperties;
  
  /** 浮层预设位置：bottomLeft bottomRight topLeft topRight */
  popupPlacement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  
  /** 输入框占位文本 */
  placeholder?: string;
  
  /** 输入框大小 */
  size?: SizeType;
  
  /** 禁用 */
  disabled?: boolean;
  
  /** 是否支持清除 */
  allowClear?: boolean;
  
  /** 是否显示边框 */
  bordered?: boolean;
  
  /** 自定义浮层容器 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  
  /** 浮层显隐的回调 */
  onPopupVisibleChange?: (visible: boolean) => void;
  
  /** 浮层的显示状态（受控模式） */
  popupVisible?: boolean;
  
  /** 次级菜单的展开方式，可选 'click' 和 'hover' */
  expandTrigger?: 'click' | 'hover';
  
  /** 当此项为 true 时，点选每级菜单选项值都会发生变化 */
  changeOnSelect?: boolean;
  
  /** 用于动态加载选项 */
  loadData?: (selectedOptions: CascaderOptionType[]) => void;
  
  /** 当下拉列表为空时显示的内容 */
  notFoundContent?: ReactNode;
  
  /** 自定义 dropdown 配置 */
  dropdownRender?: (menus: ReactNode) => ReactNode;
  
  /** 是否支持搜索功能 */
  showSearch?: boolean | ShowSearchType;
  
  /** 自定义次级菜单展开图标 */
  expandIcon?: ReactNode;
  
  /** 自定义的选择框后缀图标 */
  suffixIcon?: ReactNode;
  
  /** 自定义字段名 */
  fieldNames?: FieldNamesType;
  
  /** 自定义样式前缀 */
  prefixCls?: string;
  
  /** 输入框的样式前缀 */
  inputPrefixCls?: string;
  
  /** 自定义子元素 */
  children?: ReactNode;
  
  /** 动画名称 */
  transitionName?: string;
  
  /** 表单自动完成属性 */
  autoComplete?: string;
  
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
}

/**
 * Cascader 组件的内部状态
 */
export interface CascaderState {
  /** 当前选中的值 */
  value: CascaderValueType[];
  
  /** 输入框的值（搜索模式下） */
  inputValue: string;
  
  /** 输入框是否获得焦点 */
  inputFocused: boolean;
  
  /** 浮层是否显示 */
  popupVisible?: boolean;
  
  /** 扁平化的选项列表（搜索模式下） */
  flattenOptions?: CascaderOptionType[][];
  
  /** 前一次的 props（用于 getDerivedStateFromProps） */
  prevProps: CascaderProps;
}

/**
 * 内部使用的过滤选项类型
 */
interface FilteredOptionType extends CascaderOptionType {
  /** 标记为过滤选项 */
  __IS_FILTERED_OPTION: boolean;
  
  /** 选项路径 */
  path: CascaderOptionType[];
  
  /** 保留的过滤选项值 */
  __KEEP_FILTERED_OPTION_VALUE?: CascaderValueType[];
}

/**
 * Cascader 级联选择器组件
 * 用于在多层级结构中进行选择
 */
export default class Cascader extends Component<CascaderProps, CascaderState> {
  /** 默认属性 */
  static defaultProps: Partial<CascaderProps>;
  
  /** 从 props 派生状态 */
  static getDerivedStateFromProps(props: CascaderProps, state: CascaderState): Partial<CascaderState>;
  
  /** 输入框引用 */
  private input: any;
  
  /** 缓存的选项列表 */
  private cachedOptions: CascaderOptionType[];
  
  /** 清除选择的定时器 */
  private clearSelectionTimeout?: number;
  
  constructor(props: CascaderProps);
  
  componentWillUnmount(): void;
  
  /**
   * 设置选中值
   * @param value - 选中的值数组
   * @param selectedOptions - 选中的选项对象数组
   */
  private setValue(value: CascaderValueType[], selectedOptions?: CascaderOptionType[]): void;
  
  /**
   * 保存输入框引用
   * @param node - 输入框节点
   */
  private saveInput(node: any): void;
  
  /**
   * 处理选项变化
   * @param value - 选中的值数组
   * @param selectedOptions - 选中的选项对象数组
   */
  private handleChange(value: CascaderValueType[], selectedOptions: CascaderOptionType[]): void;
  
  /**
   * 处理弹出层显隐变化
   * @param visible - 是否显示
   */
  private handlePopupVisibleChange(visible: boolean): void;
  
  /** 处理输入框失焦 */
  private handleInputBlur(): void;
  
  /**
   * 处理输入框点击
   * @param e - 鼠标事件
   */
  private handleInputClick(e: React.MouseEvent): void;
  
  /**
   * 处理键盘按下
   * @param e - 键盘事件
   */
  private handleKeyDown(e: React.KeyboardEvent): void;
  
  /**
   * 处理输入框内容变化
   * @param e - 输入事件
   */
  private handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
  
  /**
   * 清除选择
   * @param e - 鼠标事件
   */
  private clearSelection(e: React.MouseEvent): void;
  
  /**
   * 获取显示的标签
   * @returns 标签内容
   */
  private getLabel(): ReactNode;
  
  /**
   * 生成过滤后的选项列表
   * @param prefixCls - 样式类名前缀
   * @param renderEmpty - 空状态渲染函数
   * @returns 过滤后的选项列表
   */
  private generateFilteredOptions(prefixCls: string, renderEmpty: (componentName?: string) => ReactNode): CascaderOptionType[];
  
  /**
   * 获取弹出层位置
   * @param direction - 文本方向
   * @returns 弹出层位置
   */
  private getPopupPlacement(direction?: 'ltr' | 'rtl'): string;
  
  /**
   * 渲染 Cascader 组件
   * @param configProps - 配置属性
   * @param locale - 国际化文本
   * @returns React 元素
   */
  private renderCascader(configProps: ConfigConsumerProps, locale: Locale): ReactElement;
  
  /** 使输入框获得焦点 */
  focus(): void;
  
  /** 使输入框失去焦点 */
  blur(): void;
  
  render(): ReactElement;
}