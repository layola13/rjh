/**
 * 下拉列表属性栏组件的类型定义
 * @module PropertyBarDropdownList
 */

/**
 * 图标配置接口
 */
export interface IconConfig {
  /** 图标类型标识符 */
  type: string;
  /** 图标位置：左侧或右侧 */
  iconPosition?: 'left' | 'right';
  /** 图标颜色，支持任何有效的 CSS 颜色值 */
  iconColor?: string;
}

/**
 * 下拉选项接口
 */
export interface DropdownOption {
  /** 选项唯一标识符 */
  id: string;
  /** 选项显示文本 */
  label: string;
  /** 选项图标 URL（可选） */
  icon?: string;
}

/**
 * 下拉列表数据配置接口
 */
export interface DropdownListData {
  /** 默认选中的键值 */
  defaultKey: string | string[];
  /** 标题文本 */
  title?: string;
  /** 下拉选项列表 */
  options?: DropdownOption[];
  /** 弹出框宽度 */
  popWidth?: number | string;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 提示文本（tooltip） */
  tooltip?: string;
  /** 获得焦点时的回调函数 */
  onFocus?: (event: React.FocusEvent) => void;
  /** 失去焦点时的回调函数 */
  onBlur?: (event: React.FocusEvent) => void;
  /** 组件尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 值变化时的回调函数 */
  onChange?: (value: string | string[]) => void;
  /** 选择模式：单选或多选 */
  mode?: 'single' | 'multiple';
  /** 是否隐藏当前选中项 */
  hideCurrent?: boolean;
  /** 是否绑定自身 */
  bindSelf?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 下拉框自定义 CSS 类名 */
  dropdownClassName?: string;
  /** 关闭时的回调函数 */
  onClose?: (value: any) => void;
  /** 占位符文本 */
  placeholder?: string;
  /** 标题图标配置 */
  icon?: IconConfig;
}

/**
 * 属性栏下拉列表组件的 Props 接口
 */
export interface PropertyBarDropdownListProps {
  /** 组件数据配置 */
  data: DropdownListData;
}

/**
 * 属性栏下拉列表组件
 * @description 提供带标题、图标和提示的下拉选择功能，支持单选和多选模式
 * @param props - 组件属性
 * @returns React 元素
 */
declare function PropertyBarDropdownList(
  props: PropertyBarDropdownListProps
): React.ReactElement;

export default PropertyBarDropdownList;