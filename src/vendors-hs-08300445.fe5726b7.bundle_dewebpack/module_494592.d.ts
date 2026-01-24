/**
 * RC Select 组件类型定义
 * 提供下拉选择器的核心类型声明
 */

import type { ReactNode, ReactElement, CSSProperties, FocusEvent, KeyboardEvent, MouseEvent, Ref } from 'react';

/**
 * 选项数据结构
 */
export interface OptionData {
  /** 选项的唯一值 */
  value: RawValueType;
  /** 选项显示的标签 */
  label: ReactNode;
  /** 选项的键值（用于渲染优化） */
  key?: string | number;
  /** 是否禁用该选项 */
  disabled?: boolean;
  /** 选项标题（hover提示） */
  title?: string;
  /** 选项的子选项（用于分组） */
  children?: OptionData[];
  /** 其他自定义属性 */
  [prop: string]: unknown;
}

/**
 * 扁平化后的选项数据
 */
export interface FlattenOptionData extends OptionData {
  /** 分组标签 */
  groupLabel?: ReactNode;
  /** 原始数据引用 */
  data: OptionData;
}

/**
 * 原始值类型
 */
export type RawValueType = string | number;

/**
 * 带标签的值类型（labelInValue模式）
 */
export interface LabeledValue {
  /** 选项的键值 */
  key?: string | number;
  /** 选项的值 */
  value: RawValueType;
  /** 选项的标签 */
  label?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 单选值类型
 */
export type SingleValueType = RawValueType | LabeledValue;

/**
 * 多选值类型
 */
export type MultipleValueType = (RawValueType | LabeledValue)[];

/**
 * 默认值类型
 */
export type DefaultValueType = SingleValueType | MultipleValueType;

/**
 * 选择模式
 */
export type SelectMode = 'multiple' | 'tags' | 'combobox';

/**
 * 过滤函数类型
 */
export type FilterFunc = (inputValue: string, option?: OptionData) => boolean;

/**
 * 排序函数类型
 */
export type FilterSort = (optionA: OptionData, optionB: OptionData) => number;

/**
 * 下拉框对齐配置
 */
export interface DropdownAlign {
  points?: string[];
  offset?: number[];
  overflow?: {
    adjustX?: boolean;
    adjustY?: boolean;
  };
}

/**
 * 标签渲染函数类型
 */
export type TagRender = (props: {
  label: ReactNode;
  value: RawValueType;
  disabled: boolean;
  onClose: (event?: MouseEvent) => void;
  closable: boolean;
}) => ReactElement;

/**
 * 自定义下拉渲染函数
 */
export type DropdownRender = (menu: ReactElement) => ReactElement;

/**
 * 输入元素获取函数
 */
export type GetInputElement = () => ReactElement;

/**
 * 触发动作类型
 */
export type ShowAction = 'focus' | 'click';

/**
 * 内部属性标记
 */
export interface InternalProps {
  /** 内部标记常量 */
  mark?: string;
  /** 跳过触发选择事件 */
  skipTriggerSelect?: boolean;
  /** 跳过触发变化事件 */
  skipTriggerChange?: boolean;
  /** 原始选择回调 */
  onRawSelect?: (value: RawValueType, option: OptionData, source: SelectSource) => void;
  /** 原始取消选择回调 */
  onRawDeselect?: (value: RawValueType, option: OptionData, source: SelectSource) => void;
  /** 清空回调 */
  onClear?: () => void;
}

/**
 * 选择来源
 */
export type SelectSource = 'option' | 'selection' | 'input' | 'clear';

/**
 * Select 组件完整属性
 */
export interface SelectProps<ValueType = DefaultValueType> {
  /** 组件类名前缀 */
  prefixCls?: string;
  /** 自定义类名 */
  className?: string;
  /** 组件ID */
  id?: string;
  /** 是否展开下拉框 */
  open?: boolean;
  /** 默认是否展开 */
  defaultOpen?: boolean;
  /** 选项数据 */
  options?: OptionData[];
  /** 子节点（备用选项定义方式） */
  children?: ReactNode;
  /** 选择模式 */
  mode?: SelectMode;
  /** 当前选中值 */
  value?: ValueType;
  /** 默认选中值 */
  defaultValue?: ValueType;
  /** 是否把选中项的 label 包装到 value 中 */
  labelInValue?: boolean;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 输入框值 */
  inputValue?: string;
  /** 搜索值 */
  searchValue?: string;
  /** 过滤选项函数 */
  filterOption?: boolean | FilterFunc;
  /** 过滤后的选项排序函数 */
  filterSort?: FilterSort;
  /** 搜索时过滤对应的 option 属性 */
  optionFilterProp?: string;
  /** 是否在选中项后清空搜索框（仅多选模式） */
  autoClearSearchValue?: boolean;
  /** 搜索回调 */
  onSearch?: (value: string) => void;
  /** 是否支持清除 */
  allowClear?: boolean;
  /** 清除图标 */
  clearIcon?: ReactNode;
  /** 是否显示下拉箭头 */
  showArrow?: boolean;
  /** 自定义下拉箭头图标 */
  inputIcon?: ReactNode;
  /** 多选时选中项的图标 */
  menuItemSelectedIcon?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否默认高亮第一个选项 */
  defaultActiveFirstOption?: boolean;
  /** 未找到内容时显示的文本 */
  notFoundContent?: ReactNode;
  /** 回填到选择框的 Option 属性 */
  optionLabelProp?: string;
  /** 是否使用键盘选择时自动填充输入框（仅单选combobox模式） */
  backfill?: boolean;
  /** Tab 索引 */
  tabIndex?: number;
  /** 自定义输入元素 */
  getInputElement?: GetInputElement;
  /** 获取原始输入元素 */
  getRawInputElement?: () => ReactElement;
  /** 下拉框挂载的父节点 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** 下拉菜单高度 */
  listHeight?: number;
  /** 下拉菜单项高度 */
  listItemHeight?: number;
  /** 动画名称 */
  animation?: string;
  /** CSS 过渡类名 */
  transitionName?: string;
  /** 是否启用虚拟滚动 */
  virtual?: boolean;
  /** 下拉菜单样式 */
  dropdownStyle?: CSSProperties;
  /** 下拉菜单类名 */
  dropdownClassName?: string;
  /** 下拉菜单和选择器同宽配置 */
  dropdownMatchSelectWidth?: boolean | number;
  /** 自定义下拉框内容 */
  dropdownRender?: DropdownRender;
  /** 下拉框对齐方式 */
  dropdownAlign?: DropdownAlign;
  /** 显示下拉的触发动作 */
  showAction?: ShowAction[];
  /** 文字方向 */
  direction?: 'ltr' | 'rtl';
  /** 自动分词的分隔符（仅tags模式） */
  tokenSeparators?: string[];
  /** 自定义标签渲染 */
  tagRender?: TagRender;
  /** 下拉列表滚动回调 */
  onPopupScroll?: (event: UIEvent) => void;
  /** 下拉框显隐变化回调 */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** 获得焦点回调 */
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  /** 失去焦点回调 */
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  /** 按键抬起回调 */
  onKeyUp?: (event: KeyboardEvent<HTMLDivElement>) => void;
  /** 按键按下回调 */
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  /** 鼠标按下回调 */
  onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
  /** 选中值变化回调 */
  onChange?: (value: ValueType, option: OptionData | OptionData[]) => void;
  /** 选中选项回调 */
  onSelect?: (value: SingleValueType, option: OptionData) => void;
  /** 取消选中回调 */
  onDeselect?: (value: SingleValueType, option: OptionData) => void;
  /** 清除回调 */
  onClear?: () => void;
  /** 内部属性（供高级定制使用） */
  internalProps?: InternalProps;
}

/**
 * Select 组件 Ref 引用类型
 */
export interface SelectRef {
  /** 使组件获得焦点 */
  focus: () => void;
  /** 使组件失去焦点 */
  blur: () => void;
  /** 滚动到指定索引 */
  scrollTo: (index: number) => void;
}

/**
 * 组件配置
 */
export interface SelectComponents {
  /** 选项列表组件 */
  optionList: React.ComponentType<any>;
}

/**
 * 生成 Select 组件的工厂函数参数
 */
export interface SelectGeneratorConfig {
  /** 类名前缀 */
  prefixCls: string;
  /** 子组件配置 */
  components: SelectComponents;
  /** 将子节点转换为数据 */
  convertChildrenToData: (children: ReactNode) => OptionData[];
  /** 扁平化选项 */
  flattenOptions: (options: OptionData[], config?: any) => FlattenOptionData[];
  /** 获取带标签的值 */
  getLabeledValue: (value: RawValueType, config: {
    options: FlattenOptionData[];
    prevValueMap: Map<RawValueType, LabeledValue>;
    labelInValue: boolean;
    optionLabelProp: string;
  }) => LabeledValue;
  /** 过滤选项 */
  filterOptions: (searchValue: string, options: OptionData[], config: {
    optionFilterProp: string;
    filterOption?: boolean | FilterFunc;
  }) => OptionData[];
  /** 判断值是否被禁用 */
  isValueDisabled: (value: RawValueType, options: FlattenOptionData[]) => boolean;
  /** 查找值对应的选项 */
  findValueOption: (values: RawValueType[], options: FlattenOptionData[], config?: {
    prevValueOptions?: OptionData[];
  }) => OptionData[];
  /** 警告属性检查 */
  warningProps?: (props: SelectProps) => void;
  /** 填充缺失值的选项 */
  fillOptionsWithMissingValue: (options: OptionData[], value: DefaultValueType, optionLabelProp: string, labelInValue: boolean) => OptionData[];
  /** 忽略 DOM 属性 */
  omitDOMProps?: (props: SelectProps) => Partial<SelectProps>;
}

/**
 * 忽略的 DOM 属性列表
 */
export type OmitDOMProps = readonly [
  'removeIcon',
  'placeholder',
  'autoFocus',
  'maxTagCount',
  'maxTagTextLength',
  'maxTagPlaceholder',
  'choiceTransitionName',
  'onInputKeyDown',
  'tabIndex'
];

/**
 * Select 组件生成器
 * @param config - 生成配置
 * @returns 带 Ref 的 Select 组件
 */
declare function generateSelector(config: SelectGeneratorConfig): React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<SelectRef>>;

export default generateSelector;