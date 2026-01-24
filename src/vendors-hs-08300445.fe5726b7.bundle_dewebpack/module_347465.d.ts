import type { ReactNode, ReactElement, KeyboardEvent, SyntheticEvent } from 'react';
import type { Component } from 'react';

/**
 * 字段名称配置接口
 * 用于自定义级联选择器的数据字段映射
 */
export interface FieldNames {
  /** 显示标签的字段名，默认为 'label' */
  label?: string;
  /** 值的字段名，默认为 'value' */
  value?: string;
  /** 子选项的字段名，默认为 'children' */
  children?: string;
}

/**
 * 级联选项数据项接口
 */
export interface CascaderOption {
  /** 选项的值 */
  value: string | number;
  /** 选项的显示文本 */
  label: ReactNode;
  /** 是否禁用该选项 */
  disabled?: boolean;
  /** 是否为叶子节点 */
  isLeaf?: boolean;
  /** 子选项列表 */
  children?: CascaderOption[];
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * 弹出层位置类型
 */
export type PopupPlacement = 
  | 'bottomLeft' 
  | 'bottomRight' 
  | 'topLeft' 
  | 'topRight';

/**
 * 展开触发方式
 */
export type ExpandTrigger = 'click' | 'hover';

/**
 * 内置弹出层位置配置
 */
export interface BuiltinPlacements {
  [key: string]: {
    points?: string[];
    offset?: number[];
    overflow?: {
      adjustX?: boolean;
      adjustY?: boolean;
    };
  };
}

/**
 * 下拉渲染函数类型
 * @param menu - 原始菜单节点
 * @returns 自定义渲染后的节点
 */
export type DropdownRender = (menu: ReactNode) => ReactNode;

/**
 * 级联选择器属性接口
 */
export interface CascaderProps {
  /** 样式前缀，默认为 'rc-cascader' */
  prefixCls?: string;
  /** 级联选项数据源 */
  options?: CascaderOption[];
  /** 是否禁用，默认为 false */
  disabled?: boolean;
  /** 当前选中的值（受控模式） */
  value?: Array<string | number>;
  /** 默认选中的值（非受控模式） */
  defaultValue?: Array<string | number>;
  /** 
   * 选中值变化时的回调函数
   * @param value - 选中的值数组
   * @param selectedOptions - 选中的选项对象数组
   */
  onChange?: (value: Array<string | number>, selectedOptions: CascaderOption[]) => void;
  /** 
   * 弹出层显隐变化时的回调
   * @param visible - 是否可见
   */
  onPopupVisibleChange?: (visible: boolean) => void;
  /** 
   * 键盘事件回调
   * @param event - 键盘事件对象
   */
  onKeyDown?: (event: KeyboardEvent) => void;
  /** 弹出层是否可见（受控模式） */
  popupVisible?: boolean;
  /** 弹出层 CSS 类名 */
  popupClassName?: string;
  /** 弹出层位置，默认为 'bottomLeft' */
  popupPlacement?: PopupPlacement;
  /** 弹出层过渡动画名称 */
  transitionName?: string;
  /** 内置的弹出层位置配置 */
  builtinPlacements?: BuiltinPlacements;
  /** 是否在选择每一级时立即改变值，默认为 false */
  changeOnSelect?: boolean;
  /** 
   * 动态加载选项的函数
   * @param selectedOptions - 当前已选中的选项路径
   */
  loadData?: (selectedOptions: CascaderOption[]) => void;
  /** 次级菜单的展开方式，默认为 'click' */
  expandTrigger?: ExpandTrigger;
  /** 自定义字段名配置 */
  fieldNames?: FieldNames;
  /** @deprecated 已废弃，请使用 fieldNames */
  filedNames?: FieldNames;
  /** 自定义展开图标 */
  expandIcon?: ReactNode;
  /** 子元素（通常是触发器组件） */
  children?: ReactElement;
  /** 自定义下拉框内容渲染函数 */
  dropdownRender?: DropdownRender;
}

/**
 * 级联选择器状态接口
 */
export interface CascaderState {
  /** 弹出层是否可见 */
  popupVisible?: boolean;
  /** 当前激活的值路径 */
  activeValue: Array<string | number>;
  /** 当前选中的值 */
  value: Array<string | number>;
  /** 上一次的 props（用于 getDerivedStateFromProps） */
  prevProps: CascaderProps;
}

/**
 * 菜单选择事件处理器类型
 * @param option - 被选中的选项
 * @param level - 选项所在的层级（从 0 开始）
 * @param event - 触发事件
 */
export type MenuSelectHandler = (
  option: CascaderOption,
  level: number,
  event: SyntheticEvent
) => void;

/**
 * 级联选择器组件类
 * 提供多级联动选择功能，支持动态加载、自定义字段、键盘导航等特性
 */
export default class Cascader extends Component<CascaderProps, CascaderState> {
  /**
   * 默认属性值
   */
  static defaultProps: Partial<CascaderProps>;

  /**
   * 从新 props 派生状态的静态方法
   * @param nextProps - 新的属性
   * @param prevState - 上一次的状态
   * @returns 需要更新的状态对象
   */
  static getDerivedStateFromProps(
    nextProps: CascaderProps,
    prevState: CascaderState
  ): Partial<CascaderState> | null;

  /**
   * 触发器组件的引用
   */
  trigger: any;

  /**
   * 默认字段名配置
   */
  defaultFieldNames: Required<FieldNames>;

  /**
   * 设置弹出层的显隐状态
   * @param visible - 是否可见
   */
  setPopupVisible(visible: boolean): void;

  /**
   * 处理选中值变化
   * @param selectedOptions - 选中的选项路径数组
   * @param meta - 元数据（如可见性）
   * @param event - 触发事件
   */
  handleChange(
    selectedOptions: CascaderOption[],
    meta: { visible: boolean },
    event: SyntheticEvent
  ): void;

  /**
   * 处理弹出层显隐变化
   * @param visible - 是否可见
   */
  handlePopupVisibleChange(visible: boolean): void;

  /**
   * 处理菜单项选择
   * @param option - 被选中的选项
   * @param level - 选项所在层级
   * @param event - 触发事件
   */
  handleMenuSelect: MenuSelectHandler;

  /**
   * 处理菜单项双击事件
   */
  handleItemDoubleClick(): void;

  /**
   * 处理键盘按下事件（支持方向键、回车、ESC等导航）
   * @param event - 键盘事件
   */
  handleKeyDown(event: KeyboardEvent): void;

  /**
   * 保存触发器组件引用
   * @param node - 触发器组件实例
   */
  saveTrigger(node: any): void;

  /**
   * 获取弹出层的 DOM 节点
   * @returns 弹出层 DOM 元素
   */
  getPopupDOMNode(): HTMLElement | null;

  /**
   * 根据配置获取实际使用的字段名
   * @param field - 字段类型（'label' | 'value' | 'children'）
   * @returns 实际字段名
   */
  getFieldName(field: keyof FieldNames): string;

  /**
   * 获取完整的字段名配置对象
   * @returns 字段名配置
   */
  getFieldNames(): FieldNames;

  /**
   * 获取当前激活层级的选项列表
   * @returns 当前层级的选项数组
   */
  getCurrentLevelOptions(): CascaderOption[];

  /**
   * 根据值路径获取对应的选项对象数组
   * @param values - 值路径数组
   * @returns 选项对象数组
   */
  getActiveOptions(values: Array<string | number>): CascaderOption[];
}