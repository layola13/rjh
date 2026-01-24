/**
 * 选择器多选模式的选择区域组件类型定义
 * 用于渲染多选标签、搜索输入框和占位符
 */

/**
 * 自定义标签渲染函数的参数
 */
export interface TagRenderProps {
  /** 标签显示的文本内容 */
  label: React.ReactNode;
  /** 标签对应的值 */
  value: string | number;
  /** 标签是否禁用 */
  disabled?: boolean;
  /** 标签是否可关闭 */
  closable?: boolean;
  /** 关闭标签的回调函数 */
  onClose: (event?: React.MouseEvent) => void;
}

/**
 * 选中项的数据结构
 */
export interface SelectValue {
  /** 唯一标识键 */
  key: string | number;
  /** 显示的标签内容 */
  label: React.ReactNode;
  /** 选项的值 */
  value: string | number;
  /** 是否禁用该选项 */
  disabled?: boolean;
}

/**
 * 选择操作的选项参数
 */
export interface SelectOptions {
  /** 是否为选中状态，false 表示取消选中 */
  selected: boolean;
}

/**
 * 多选选择器组件的属性接口
 */
export interface MultipleSelectionProps {
  /** 组件唯一 ID */
  id?: string;
  
  /** 样式类名前缀 */
  prefixCls: string;
  
  /** 已选中的值列表 */
  values: SelectValue[];
  
  /** 下拉菜单是否展开 */
  open: boolean;
  
  /** 搜索框当前输入的值 */
  searchValue: string;
  
  /** 输入框的 ref 引用 */
  inputRef: React.Ref<HTMLInputElement>;
  
  /** 占位符文本 */
  placeholder?: React.ReactNode;
  
  /** 是否禁用选择器 */
  disabled?: boolean;
  
  /** 选择器模式：tags 支持自定义标签 */
  mode?: 'multiple' | 'tags';
  
  /** 是否显示搜索功能 */
  showSearch?: boolean;
  
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  
  /** 自动完成属性 */
  autoComplete?: string;
  
  /** 无障碍访问索引 */
  accessibilityIndex?: number;
  
  /** Tab 键顺序索引 */
  tabIndex?: number;
  
  /** 自定义删除图标 */
  removeIcon?: React.ReactNode;
  
  /** 最多显示的标签数量 */
  maxTagCount?: number;
  
  /** 单个标签文本的最大长度 */
  maxTagTextLength?: number;
  
  /** 
   * 超出 maxTagCount 时显示的内容
   * @param omittedValues - 被省略的选项数组
   * @returns 显示的占位内容
   */
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: SelectValue[]) => React.ReactNode);
  
  /**
   * 自定义标签渲染函数
   * @param props - 标签渲染所需的属性
   * @returns 渲染的标签元素
   */
  tagRender?: (props: TagRenderProps) => React.ReactElement;
  
  /**
   * 切换下拉菜单展开/收起的回调
   * @param open - 目标展开状态
   */
  onToggleOpen: (open: boolean) => void;
  
  /**
   * 选中或取消选中选项的回调
   * @param value - 选项的值
   * @param options - 选择操作的选项参数
   */
  onSelect: (value: string | number, options: SelectOptions) => void;
  
  /**
   * 输入框内容变化的回调
   * @param event - 输入事件
   */
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * 输入框粘贴事件的回调
   * @param event - 粘贴事件
   */
  onInputPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  
  /**
   * 输入框按键事件的回调
   * @param event - 键盘事件
   */
  onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  
  /**
   * 输入框鼠标按下事件的回调
   * @param event - 鼠标事件
   */
  onInputMouseDown: (event: React.MouseEvent<HTMLInputElement>) => void;
  
  /**
   * 输入法开始输入的回调
   * @param event - 组合输入事件
   */
  onInputCompositionStart: (event: React.CompositionEvent<HTMLInputElement>) => void;
  
  /**
   * 输入法结束输入的回调
   * @param event - 组合输入事件
   */
  onInputCompositionEnd: (event: React.CompositionEvent<HTMLInputElement>) => void;
}

/**
 * 多选选择器组件
 * 渲染已选标签列表、搜索输入框和占位符
 * 支持标签删除、自定义渲染、最大数量限制等功能
 * 
 * @param props - 组件属性
 * @returns 多选选择器的 JSX 元素
 */
declare const MultipleSelection: React.FC<MultipleSelectionProps>;

export default MultipleSelection;