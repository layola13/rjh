/**
 * VTreeview 节点组件的属性定义和类型声明
 * @module VTreeviewNode
 */

/**
 * VTreeviewNode 组件的属性配置
 */
export interface VTreeviewNodeProps {
  /** 是否可激活节点 */
  activatable: boolean;
  
  /** 激活状态的 CSS 类名 */
  activeClass: string;
  
  /** 节点颜色主题 */
  color: string;
  
  /** 展开图标名称 */
  expandIcon: string;
  
  /** 不确定状态图标名称 */
  indeterminateIcon: string;
  
  /** 数据项中子节点的属性名 */
  itemChildren: string;
  
  /** 数据项中禁用状态的属性名 */
  itemDisabled: string;
  
  /** 数据项中唯一键的属性名 */
  itemKey: string;
  
  /** 数据项中显示文本的属性名 */
  itemText: string;
  
  /** 异步加载子节点的函数 */
  loadChildren?: (item: unknown) => Promise<void> | void;
  
  /** 加载中图标名称 */
  loadingIcon: string;
  
  /** 未选中状态图标名称 */
  offIcon: string;
  
  /** 选中状态图标名称 */
  onIcon: string;
  
  /** 点击节点时是否展开/折叠 */
  openOnClick: boolean;
  
  /** 是否使用圆角样式 */
  rounded: boolean;
  
  /** 是否可选择节点 */
  selectable: boolean;
  
  /** 选中状态的颜色主题 */
  selectedColor: string;
  
  /** 是否使用形状样式 */
  shaped: boolean;
  
  /** 是否启用展开/折叠过渡动画 */
  transition: boolean;
  
  /** 选择类型：'leaf' 仅叶子节点可选 | 'independent' 独立选择 */
  selectionType: 'leaf' | 'independent';
}

/**
 * VTreeviewNode 组件的扩展属性（内部使用）
 */
export interface VTreeviewNodeInternalProps extends VTreeviewNodeProps {
  /** 节点层级深度 */
  level: number;
  
  /** 节点数据对象 */
  item: Record<string, unknown>;
  
  /** 父节点是否被禁用 */
  parentIsDisabled: boolean;
}

/**
 * VTreeviewNode 组件的数据状态
 */
export interface VTreeviewNodeData {
  /** 是否已加载子节点 */
  hasLoaded: boolean;
  
  /** 是否处于激活状态 */
  isActive: boolean;
  
  /** 是否处于不确定状态（部分子节点被选中） */
  isIndeterminate: boolean;
  
  /** 是否正在加载中 */
  isLoading: boolean;
  
  /** 是否处于展开状态 */
  isOpen: boolean;
  
  /** 是否被选中 */
  isSelected: boolean;
}

/**
 * 作用域插槽的属性对象
 */
export interface VTreeviewNodeScopedProps {
  /** 当前节点的数据项 */
  item: Record<string, unknown>;
  
  /** 是否为叶子节点（无子节点） */
  leaf: boolean;
  
  /** 是否被选中 */
  selected: boolean;
  
  /** 是否处于不确定状态 */
  indeterminate: boolean;
  
  /** 是否处于激活状态 */
  active: boolean;
  
  /** 是否处于展开状态 */
  open: boolean;
}

/**
 * Treeview 注入的上下文接口
 */
export interface TreeviewContext {
  /** 注册节点 */
  register(node: VTreeviewNodeInstance): void;
  
  /** 注销节点 */
  unregister(node: VTreeviewNodeInstance): void;
  
  /** 更新节点打开状态 */
  updateOpen(key: string | number, isOpen: boolean): void;
  
  /** 更新节点选中状态 */
  updateSelected(key: string | number, isSelected: boolean): void;
  
  /** 更新节点激活状态 */
  updateActive(key: string | number, isActive: boolean): void;
  
  /** 触发 open 事件 */
  emitOpen(): void;
  
  /** 触发 selected 事件 */
  emitSelected(): void;
  
  /** 触发 active 事件 */
  emitActive(): void;
  
  /** 判断节点是否被排除 */
  isExcluded(key: string | number): boolean;
}

/**
 * VTreeviewNode 组件实例接口
 */
export interface VTreeviewNodeInstance {
  /** 节点的唯一键 */
  readonly key: string | number;
  
  /** 是否被禁用 */
  readonly disabled: boolean;
  
  /** 子节点数组 */
  readonly children: Record<string, unknown>[] | null;
  
  /** 节点显示文本 */
  readonly text: string;
  
  /** 是否有子节点 */
  readonly hasChildren: boolean;
  
  /** 检查并加载子节点 */
  checkChildren(): Promise<void>;
  
  /** 切换展开/折叠状态 */
  open(): void;
}

/**
 * VTreeviewNode 组件默认导出
 */
declare const VTreeviewNode: {
  name: 'v-treeview-node';
  props: VTreeviewNodeInternalProps;
  data(): VTreeviewNodeData;
  computed: {
    disabled: boolean;
    key: string | number;
    children: Record<string, unknown>[] | null;
    text: string;
    scopedProps: VTreeviewNodeScopedProps;
    computedIcon: string;
    hasChildren: boolean;
  };
  methods: {
    checkChildren(): Promise<void>;
    open(): void;
    genLabel(): VNode;
    genPrependSlot(): VNode | null;
    genAppendSlot(): VNode | null;
    genContent(): VNode;
    genToggle(): VNode;
    genCheckbox(): VNode;
    genLevel(count: number): VNode[];
    genNode(): VNode;
    genChild(item: Record<string, unknown>, parentDisabled: boolean): VNode;
    genChildrenWrapper(): VNode | null;
    genTransition(): VNode;
  };
};

export default VTreeviewNode;

/**
 * Vue 虚拟节点类型（简化声明）
 */
interface VNode {
  tag?: string;
  data?: Record<string, unknown>;
  children?: VNode[];
  text?: string;
}