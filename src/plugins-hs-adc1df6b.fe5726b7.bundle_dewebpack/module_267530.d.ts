/**
 * 标签输入框组件类型定义
 * Module: module_267530
 */

/**
 * 复选框配置选项
 */
export interface CheckboxOptions {
  /** 复选框标签文本 */
  label?: string;
  /** 复选框选中状态 */
  checked?: boolean;
  /** 复选框禁用状态 */
  disabled?: boolean;
  /** 复选框状态变更回调 */
  onChange?: (value: string) => void;
}

/**
 * 标签输入框组件数据属性
 */
export interface LabelInputData {
  /** 组件自定义类名 */
  className?: string;
  /** 标签文本 */
  label?: string;
  /** 输入框占位符 */
  placeholder?: string;
  /** 复选框配置选项 */
  checkboxOptions?: CheckboxOptions;
  /** 工具提示文本 */
  tooltip?: string;
  /** 是否禁用输入变更 */
  disableChange?: boolean;
  /** 输入框当前值 */
  value?: string;
  /** 最大输入长度 */
  maxLength?: number;
  /** 输入框类型：'input' | 'textarea' */
  type?: 'input' | 'textarea';
  /** 失焦事件回调 */
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** 聚焦事件回调 */
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** 输入结束回调（失焦时触发，传递当前值） */
  onChangeEnd?: (value: string) => void;
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 标签输入框组件属性
 */
export interface LabelInputProps {
  /** 组件数据配置 */
  data: LabelInputData;
}

/**
 * 标签输入框组件
 * 
 * 支持普通输入框和多行文本域两种模式，可选配置复选框和工具提示
 * 
 * @param props - 组件属性
 * @returns React 元素
 * 
 * @example
 *