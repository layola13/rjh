import type React from 'react';

/**
 * 选项数据结构
 */
export interface OptionData {
  /** 选项的唯一标识 */
  value: string | number;
  /** 选项显示的标签 */
  label: React.ReactNode;
  /** 是否禁用该选项 */
  disabled?: boolean;
  /** 选项的自定义类名 */
  className?: string;
  /** 选项的自定义样式 */
  style?: React.CSSProperties;
  /** 选项的标题（hover提示） */
  title?: string;
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * 选项组数据结构
 */
export interface OptionGroupData {
  /** 选项组标签 */
  label: React.ReactNode;
  /** 选项组包含的选项列表 */
  options: OptionData[];
  /** 选项组的唯一标识 */
  key?: string | number;
}

/**
 * 标签化的值结构
 */
export interface LabeledValue {
  /** 选项值 */
  value: string | number;
  /** 选项标签 */
  label: React.ReactNode;
  /** 选项的其他属性 */
  [key: string]: unknown;
}

/**
 * Select组件的Props
 */
export interface SelectProps<ValueType = unknown> {
  /** 组件类名前缀 */
  prefixCls?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 选中的值 */
  value?: ValueType;
  /** 默认选中的值 */
  defaultValue?: ValueType;
  /** 值变化时的回调 */
  onChange?: (value: ValueType, option: OptionData | OptionData[]) => void;
  /** 选项数据 */
  options?: (OptionData | OptionGroupData)[];
  /** 子元素（Option或OptGroup组件） */
  children?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否支持多选 */
  mode?: 'multiple' | 'tags';
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 搜索过滤函数 */
  filterOption?: boolean | ((inputValue: string, option: OptionData) => boolean);
  /** 下拉菜单的类名 */
  dropdownClassName?: string;
  /** 下拉菜单的样式 */
  dropdownStyle?: React.CSSProperties;
  /** 占位符文本 */
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * Option组件的Props
 */
export interface OptionProps {
  /** 选项的唯一值 */
  value: string | number;
  /** 选项显示的内容 */
  children?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 选项标题 */
  title?: string;
}

/**
 * OptGroup组件的Props
 */
export interface OptGroupProps {
  /** 选项组标签 */
  label: React.ReactNode;
  /** 选项组的子选项 */
  children?: React.ReactNode;
  /** 唯一标识 */
  key?: string | number;
  /** 自定义类名 */
  className?: string;
}

/**
 * Select组件实例方法
 */
export interface SelectInstance {
  /** 使选择框获得焦点 */
  focus(): void;
  /** 使选择框失去焦点 */
  blur(): void;
}

/**
 * Option组件
 */
export declare class Option extends React.Component<OptionProps> {}

/**
 * OptGroup组件
 */
export declare class OptGroup extends React.Component<OptGroupProps> {}

/**
 * Select下拉选择组件
 * 用于在一组选项中进行单选或多选
 */
export default class Select extends React.Component<SelectProps> implements SelectInstance {
  /** Option子组件 */
  static Option: typeof Option;
  /** OptGroup子组件 */
  static OptGroup: typeof OptGroup;

  /**
   * 使选择框获得焦点
   */
  focus(): void;

  /**
   * 使选择框失去焦点
   */
  blur(): void;
}

/**
 * 将子元素转换为选项数据
 * @param children - React子元素
 * @returns 转换后的选项数据数组
 */
export declare function convertChildrenToData(
  children: React.ReactNode
): OptionData[];

/**
 * 扁平化选项列表（展开选项组）
 * @param options - 选项或选项组数组
 * @returns 扁平化后的选项数组
 */
export declare function flattenOptions(
  options: (OptionData | OptionGroupData)[]
): OptionData[];

/**
 * 获取标签化的值
 * @param value - 原始值
 * @param options - 选项列表
 * @returns 包含标签的值对象
 */
export declare function getLabeledValue<T = unknown>(
  value: T,
  options: OptionData[]
): LabeledValue | LabeledValue[];

/**
 * 过滤选项
 * @param searchValue - 搜索关键词
 * @param options - 选项列表
 * @param filterOption - 过滤函数或布尔值
 * @returns 过滤后的选项数组
 */
export declare function filterOptions(
  searchValue: string,
  options: OptionData[],
  filterOption?: boolean | ((inputValue: string, option: OptionData) => boolean)
): OptionData[];

/**
 * 判断值是否被禁用
 * @param value - 要检查的值
 * @param options - 选项列表
 * @returns 是否禁用
 */
export declare function isValueDisabled(
  value: string | number,
  options: OptionData[]
): boolean;

/**
 * 根据值查找对应的选项
 * @param value - 要查找的值
 * @param options - 选项列表
 * @returns 找到的选项对象，未找到则返回undefined
 */
export declare function findValueOption(
  value: string | number,
  options: OptionData[]
): OptionData | undefined;

/**
 * 用缺失的值填充选项列表
 * @param options - 原始选项列表
 * @param value - 当前值
 * @returns 填充后的选项列表
 */
export declare function fillOptionsWithMissingValue(
  options: OptionData[],
  value: unknown
): OptionData[];