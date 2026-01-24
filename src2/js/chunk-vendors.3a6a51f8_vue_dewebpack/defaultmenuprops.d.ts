/**
 * 默认菜单属性配置
 */
export interface DefaultMenuProps {
  /** 点击菜单时是否关闭 */
  closeOnClick: boolean;
  /** 点击菜单内容时是否关闭 */
  closeOnContentClick: boolean;
  /** 是否禁用键盘导航 */
  disableKeys: boolean;
  /** 点击时是否打开菜单 */
  openOnClick: boolean;
  /** 菜单最大高度（像素） */
  maxHeight: number;
}

/**
 * 菜单项数据结构
 */
export interface SelectItem<T = any> {
  /** 菜单项显示文本 */
  text?: string;
  /** 菜单项值 */
  value?: T;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为分组标题 */
  header?: boolean;
  /** 是否为分割线 */
  divider?: boolean;
  /** 其他自定义属性 */
  [key: string]: any;
}

/**
 * VSelect组件属性
 */
export interface VSelectProps<T = any> {
  /** 追加图标名称 */
  appendIcon?: string;
  /** 菜单附加位置，false表示不附加 */
  attach?: boolean | string | Element;
  /** 是否缓存菜单项 */
  cacheItems?: boolean;
  /** 是否以chip形式显示选中项 */
  chips?: boolean;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** chip是否可删除 */
  deletableChips?: boolean;
  /** 是否禁用键盘快速查找 */
  disableLookup?: boolean;
  /** 是否立即渲染菜单内容 */
  eager?: boolean;
  /** 是否隐藏已选中项 */
  hideSelected?: boolean;
  /** 菜单项数据数组 */
  items?: SelectItem<T>[];
  /** 菜单项颜色主题 */
  itemColor?: string;
  /** 指定禁用字段路径或函数 */
  itemDisabled?: string | string[] | ((item: SelectItem<T>) => boolean);
  /** 指定文本字段路径或函数 */
  itemText?: string | string[] | ((item: SelectItem<T>) => string);
  /** 指定值字段路径或函数 */
  itemValue?: string | string[] | ((item: SelectItem<T>) => T);
  /** 菜单属性配置 */
  menuProps?: string | string[] | Partial<DefaultMenuProps>;
  /** 是否多选 */
  multiple?: boolean;
  /** 清除时是否打开菜单 */
  openOnClear?: boolean;
  /** 是否返回完整对象 */
  returnObject?: boolean;
  /** 是否使用小尺寸chip */
  smallChips?: boolean;
}

/**
 * VSelect组件数据状态
 */
export interface VSelectData<T = any> {
  /** 缓存的菜单项 */
  cachedItems: SelectItem<T>[];
  /** 菜单是否已初始化 */
  menuIsBooted: boolean;
  /** 菜单是否激活 */
  isMenuActive: boolean;
  /** 虚拟滚动最后一项索引 */
  lastItem: number;
  /** 内部值 */
  lazyValue: T | T[] | undefined;
  /** 当前选中项索引 */
  selectedIndex: number;
  /** 选中项数组 */
  selectedItems: SelectItem<T>[];
  /** 键盘快速查找前缀 */
  keyboardLookupPrefix: string;
  /** 键盘快速查找最后时间戳 */
  keyboardLookupLastTime: number;
}

/**
 * 列表组件数据配置
 */
export interface ListData<T = any> {
  /** HTML属性 */
  attrs: {
    id: string;
    [key: string]: any;
  };
  /** 组件属性 */
  props: {
    /** 是否显示操作区域 */
    action: boolean;
    /** 颜色主题 */
    color: string;
    /** 是否紧凑模式 */
    dense: boolean;
    /** 是否隐藏已选中项 */
    hideSelected: boolean;
    /** 菜单项数据 */
    items: SelectItem<T>[];
    /** 禁用字段配置 */
    itemDisabled: string | string[] | ((item: SelectItem<T>) => boolean);
    /** 文本字段配置 */
    itemText: string | string[] | ((item: SelectItem<T>) => string);
    /** 值字段配置 */
    itemValue: string | string[] | ((item: SelectItem<T>) => T);
    /** 无数据提示文本 */
    noDataText: string;
    /** 已选中项 */
    selectedItems: SelectItem<T>[];
  };
  /** 事件监听器 */
  on: {
    /** 选择项事件 */
    select: (item: SelectItem<T>) => void;
  };
  /** 作用域插槽 */
  scopedSlots: {
    item?: any;
  };
}

/**
 * 指令配置
 */
export interface ClickOutsideDirective {
  /** 指令名称 */
  name: 'click-outside';
  /** 指令值 */
  value: {
    /** 点击外部处理函数 */
    handler: (event: MouseEvent) => void;
    /** 关闭条件判断函数 */
    closeConditional: (event: MouseEvent) => boolean;
    /** 包含元素获取函数 */
    include: () => Element[];
  };
}

/**
 * VSelect组件计算属性
 */
export interface VSelectComputed<T = any> {
  /** 所有菜单项（合并缓存和当前项） */
  readonly allItems: SelectItem<T>[];
  /** 组件CSS类名 */
  readonly classes: Record<string, boolean>;
  /** 计算后的菜单项 */
  readonly computedItems: SelectItem<T>[];
  /** aria-owns属性值 */
  readonly computedOwns: string;
  /** 计数器值（字符串长度或数组长度） */
  readonly computedCounterValue: number;
  /** 指令配置数组 */
  readonly directives?: ClickOutsideDirective[];
  /** 动态高度 */
  readonly dynamicHeight: string;
  /** 是否有chip */
  readonly hasChips: boolean;
  /** 是否有自定义选择插槽 */
  readonly hasSlot: boolean;
  /** 是否有选中值 */
  readonly isDirty: boolean;
  /** 列表数据配置 */
  readonly listData: ListData<T>;
  /** 静态列表VNode */
  readonly staticList: any;
  /** 虚拟化菜单项（用于性能优化） */
  readonly virtualizedItems: SelectItem<T>[];
  /** 菜单是否可显示 */
  readonly menuCanShow: boolean;
  /** 处理后的菜单属性 */
  readonly $_menuProps: DefaultMenuProps & {
    eager: boolean;
    value: boolean;
    nudgeBottom: number;
  };
}

/**
 * VSelect组件方法
 */
export interface VSelectMethods<T = any> {
  /** 失去焦点 */
  blur(event?: FocusEvent): void;
  
  /** 激活菜单 */
  activateMenu(): void;
  
  /** 清除按钮回调 */
  clearableCallback(): void;
  
  /** 判断是否应关闭菜单 */
  closeConditional(event: MouseEvent): boolean;
  
  /** 过滤重复项 */
  filterDuplicates(items: SelectItem<T>[]): SelectItem<T>[];
  
  /** 查找已存在项的索引 */
  findExistingIndex(item: SelectItem<T>): number;
  
  /** 获取菜单内容元素 */
  getContent(): HTMLElement | undefined;
  
  /** 生成chip选择项 */
  genChipSelection(item: SelectItem<T>, index: number): any;
  
  /** 生成逗号分隔的选择项 */
  genCommaSelection(item: SelectItem<T>, index: number, isLast: boolean): any;
  
  /** 生成默认插槽内容 */
  genDefaultSlot(): any[];
  
  /** 生成图标 */
  genIcon(type: string, callback: Function, node: any): any;
  
  /** 生成输入框 */
  genInput(): any;
  
  /** 生成隐藏输入框 */
  genHiddenInput(): any;
  
  /** 生成输入插槽 */
  genInputSlot(): any;
  
  /** 生成列表 */
  genList(): any;
  
  /** 生成带插槽的列表 */
  genListWithSlot(): any;
  
  /** 生成菜单 */
  genMenu(): any;
  
  /** 生成选择项容器 */
  genSelections(): any[];
  
  /** 生成插槽选择项 */
  genSlotSelection(item: SelectItem<T>, index: number): any;
  
  /** 获取菜单索引 */
  getMenuIndex(): number;
  
  /** 获取项是否禁用 */
  getDisabled(item: SelectItem<T>): boolean;
  
  /** 获取项的文本 */
  getText(item: SelectItem<T>): string;
  
  /** 获取项的值 */
  getValue(item: SelectItem<T>): T;
  
  /** 失焦事件处理 */
  onBlur(event?: FocusEvent): void;
  
  /** chip输入事件处理 */
  onChipInput(item: SelectItem<T>): void;
  
  /** 点击事件处理 */
  onClick(event: MouseEvent): void;
  
  /** Esc键按下处理 */
  onEscDown(event: KeyboardEvent): void;
  
  /** 按键事件处理（键盘快速查找） */
  onKeyPress(event: KeyboardEvent): void;
  
  /** 键盘按下事件处理 */
  onKeyDown(event: KeyboardEvent): void;
  
  /** 菜单激活状态变化处理 */
  onMenuActiveChange(isActive: boolean): void;
  
  /** 鼠标抬起事件处理 */
  onMouseUp(event: MouseEvent): void;
  
  /** 滚动事件处理（虚拟滚动） */
  onScroll(): void;
  
  /** 空格键按下处理 */
  onSpaceDown(event: KeyboardEvent): void;
  
  /** Tab键按下处理 */
  onTabDown(event: KeyboardEvent): void;
  
  /** 上下键按下处理 */
  onUpDown(event: KeyboardEvent): void;
  
  /** 选择项 */
  selectItem(item: SelectItem<T>): void;
  
  /** 设置菜单索引 */
  setMenuIndex(index: number): void;
  
  /** 设置选中项数组 */
  setSelectedItems(): void;
  
  /** 设置值 */
  setValue(value: T | T[] | undefined): void;
  
  /** 判断元素是否在append-inner内 */
  isAppendInner(element: Element): boolean;
}

/**
 * VSelect组件完整类型定义
 */
export interface VSelect<T = any> extends VSelectProps<T>, VSelectData<T>, VSelectComputed<T>, VSelectMethods<T> {
  /** 组件名称 */
  readonly name: 'v-select';
}

/**
 * 默认菜单属性配置实例
 */
export const defaultMenuProps: DefaultMenuProps;

/**
 * VSelect组件默认导出
 */
declare const VSelectComponent: VSelect;
export default VSelectComponent;