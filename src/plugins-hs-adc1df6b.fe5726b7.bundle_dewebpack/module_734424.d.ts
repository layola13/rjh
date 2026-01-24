import React from 'react';

/**
 * 单个设置项配置
 */
export interface SettingItem {
  /** 提示文本 */
  tooltip?: string;
  /** 自定义样式类名 */
  className?: string;
  /** 显示标签 */
  label: string;
  /** 选项值 */
  value: string | number;
}

/**
 * 输入框数据配置
 */
export interface InputData {
  /** 输入框的值 */
  value: string | number;
  [key: string]: unknown;
}

/**
 * 下拉框数据配置
 */
export interface DropdownData {
  [key: string]: unknown;
}

/**
 * 标签单选输入组件的数据配置
 */
export interface LabelRadioInputData {
  /** 组件标签文本 */
  label?: string;
  /** 是否禁用整个组件 */
  disabled?: boolean;
  /** 自定义样式类名 */
  className?: string;
  /** 单选按钮组配置项数组 */
  setting: SettingItem[];
  /** 是否禁用单选按钮组 */
  disableRadio?: boolean;
  /** 当前选中的值 */
  value?: string | number;
  /** 输入框数据配置 */
  inputData: InputData;
  /** 下拉框数据配置（可选，与inputData二选一） */
  dropdownData?: DropdownData;
  /** 
   * 值变更回调函数
   * @param value - 新选中的值
   * @param inputValue - 输入框的值
   */
  onChange?: (value: string | number, inputValue: string | number) => void;
}

/**
 * 标签单选输入组件的属性
 */
export interface LabelRadioInputProps {
  /** 组件唯一标识 */
  id?: string;
  /** 组件数据配置 */
  data: LabelRadioInputData;
}

/**
 * 标签单选输入组件的状态
 */
export interface LabelRadioInputState {
  /** 当前选中的值 */
  selected: string | number;
}

/**
 * 标签单选输入组件
 * 
 * 该组件结合了单选按钮组和输入框/下拉框，用于属性栏中的复合输入场景。
 * 
 * @example
 *