/**
 * Tree 组件的类型定义
 * 基于 rc-tree 的 TypeScript 类型声明
 */

import type { CSSProperties, ReactNode, Key, MouseEvent, DragEvent, KeyboardEvent, FocusEvent } from 'react';

// ==================== 基础类型定义 ====================

/**
 * 树节点的键类型
 */
export type TreeNodeKey = string | number;

/**
 * 树节点位置字符串，格式如 "0-0-1"
 */
export type TreeNodePos = string;

/**
 * 拖拽允许判断函数的选项
 */
export interface AllowDropOptions {
  /** 被拖拽的节点 */
  dragNode: TreeNode;
  /** 放置目标节点 */
  dropNode: TreeNode;
  /** 放置位置：-1(上方)、0(内部)、1(下方) */
  dropPosition: -1 | 0 | 1;
}

/**
 * 树节点数据结构
 */
export interface TreeNodeData {
  /** 节点唯一标识 */
  key: TreeNodeKey;
  /** 节点标题 */
  title?: ReactNode;
  /** 节点图标 */
  icon?: ReactNode;
  /** 子节点列表 */
  children?: TreeNodeData[];
  /** 是否禁用节点 */
  disabled?: boolean;
  /** 是否禁用复选框 */
  disableCheckbox?: boolean;
  /** 是否可选中 */
  selectable?: boolean;
  /** 是否显示复选框 */
  checkable?: boolean;
  /** 是否为叶子节点 */
  isLeaf?: boolean;
  /** 切换器图标 */
  switcherIcon?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

/**
 * 树节点实体，包含节点数据和层级关系信息
 */
export interface TreeNodeEntity {
  /** 节点数据 */
  node: TreeNodeData;
  /** 节点索引 */
  index: number;
  /** 节点位置字符串 */
  pos: TreeNodePos;
  /** 节点键 */
  key: TreeNodeKey;
  /** 父节点实体 */
  parent?: TreeNodeEntity;
  /** 子节点实体列表 */
  children?: TreeNodeEntity[];
  /** 节点层级深度 */
  level: number;
}

/**
 * 键-实体映射表
 */
export interface KeyEntities {
  [key: string]: TreeNodeEntity;
}

/**
 * 选中状态信息
 */
export interface CheckedInfo {
  /** 选中的键列表 */
  checked: TreeNodeKey[];
  /** 半选中的键列表 */
  halfChecked: TreeNodeKey[];
}

// ==================== 事件类型定义 ====================

/**
 * 节点事件数据
 */
export interface EventDataNode extends TreeNodeData {
  /** 节点是否展开 */
  expanded?: boolean;
  /** 节点是否选中 */
  selected?: boolean;
  /** 节点是否勾选 */
  checked?: boolean;
  /** 节点是否加载中 */
  loading?: boolean;
  /** 节点是否已加载 */
  loaded?: boolean;
  /** 节点位置 */
  pos?: TreeNodePos;
  /** 节点是否激活 */
  active?: boolean;
}

/**
 * 节点鼠标事件信息
 */
export interface TreeNodeMouseEvent {
  /** 原生事件对象 */
  event: MouseEvent;
  /** 节点数据 */
  node: EventDataNode;
}

/**
 * 节点展开/收起事件信息
 */
export interface TreeNodeExpandedEvent {
  /** 节点数据 */
  node: EventDataNode;
  /** 是否展开 */
  expanded: boolean;
  /** 原生事件对象 */
  nativeEvent: MouseEvent;
}

/**
 * 节点选中事件信息
 */
export interface TreeNodeSelectedEvent {
  /** 事件类型 */
  event: 'select';
  /** 是否选中 */
  selected: boolean;
  /** 节点数据 */
  node: EventDataNode;
  /** 所有选中的节点列表 */
  selectedNodes: TreeNodeData[];
  /** 原生事件对象 */
  nativeEvent: MouseEvent;
}

/**
 * 节点勾选事件信息
 */
export interface TreeNodeCheckedEvent {
  /** 事件类型 */
  event: 'check';
  /** 节点数据 */
  node: EventDataNode;
  /** 是否勾选 */
  checked: boolean;
  /** 原生事件对象 */
  nativeEvent: MouseEvent;
  /** 所有勾选的节点列表 */
  checkedNodes?: TreeNodeData[];
  /** 所有勾选节点的位置信息 */
  checkedNodesPositions?: Array<{ node: TreeNodeData; pos: TreeNodePos }>;
  /** 半选中的键列表 */
  halfCheckedKeys?: TreeNodeKey[];
}

/**
 * 节点加载事件信息
 */
export interface TreeNodeLoadedEvent {
  /** 事件类型 */
  event: 'load';
  /** 节点数据 */
  node: EventDataNode;
}

/**
 * 节点拖拽开始事件信息
 */
export interface TreeNodeDragStartEvent {
  /** 原生事件对象 */
  event: DragEvent;
  /** 节点数据 */
  node: EventDataNode;
}

/**
 * 节点拖拽进入事件信息
 */
export interface TreeNodeDragEnterEvent {
  /** 原生事件对象 */
  event: DragEvent;
  /** 节点数据 */
  node: EventDataNode;
  /** 展开的键列表 */
  expandedKeys: TreeNodeKey[];
}

/**
 * 节点拖拽经过事件信息
 */
export interface TreeNodeDragOverEvent {
  /** 原生事件对象 */
  event: DragEvent;
  /** 节点数据 */
  node: EventDataNode;
}

/**
 * 节点拖拽离开事件信息
 */
export interface TreeNodeDragLeaveEvent {
  /** 原生事件对象 */
  event: DragEvent;
  /** 节点数据 */
  node: EventDataNode;
}

/**
 * 节点拖拽结束事件信息
 */
export interface TreeNodeDragEndEvent {
  /** 原生事件对象 */
  event: DragEvent;
  /** 节点数据 */
  node: EventDataNode;
}

/**
 * 节点放置事件信息
 */
export interface TreeNodeDropEvent {
  /** 原生事件对象 */
  event: DragEvent;
  /** 目标节点数据 */
  node: EventDataNode;
  /** 被拖拽的节点数据 */
  dragNode: EventDataNode | null;
  /** 被拖拽节点及其子节点的键列表 */
  dragNodesKeys: TreeNodeKey[];
  /** 是否放置到节点间隙 */
  dropToGap: boolean;
  /** 放置位置（相对目标节点的索引偏移） */
  dropPosition: number;
}

// ==================== 组件属性类型定义 ====================

/**
 * Tree 组件的属性接口
 */
export interface TreeProps {
  /** 样式类名前缀 */
  prefixCls?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 树形数据 */
  treeData?: TreeNodeData[];
  /** 子节点（已废弃，请使用 treeData） */
  children?: ReactNode;
  /** 是否显示连接线 */
  showLine?: boolean;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 自定义图标 */
  icon?: ReactNode | ((props: TreeNodeData) => ReactNode);
  /** 自定义切换器图标 */
  switcherIcon?: ReactNode | ((props: TreeNodeData) => ReactNode);
  /** 是否可选中 */
  selectable?: boolean;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否显示复选框 */
  checkable?: boolean;
  /** 复选框是否严格模式（父子节点选中状态不关联） */
  checkStrictly?: boolean;
  /** 是否支持拖拽 */
  draggable?: boolean;
  /** 是否禁用树 */
  disabled?: boolean;
  /** 默认展开所有节点 */
  defaultExpandAll?: boolean;
  /** 默认展开指定的树节点 */
  defaultExpandedKeys?: TreeNodeKey[];
  /** 展开指定的树节点（受控） */
  expandedKeys?: TreeNodeKey[];
  /** 默认展开父节点 */
  defaultExpandParent?: boolean;
  /** 自动展开父节点 */
  autoExpandParent?: boolean;
  /** 默认选中的树节点 */
  defaultSelectedKeys?: TreeNodeKey[];
  /** 选中的树节点（受控） */
  selectedKeys?: TreeNodeKey[];
  /** 默认勾选的树节点 */
  defaultCheckedKeys?: TreeNodeKey[];
  /** 勾选的树节点（受控） */
  checkedKeys?: TreeNodeKey[] | CheckedInfo;
  /** 已加载的节点（受控） */
  loadedKeys?: TreeNodeKey[];
  /** 展开/收起节点时的动画配置 */
  motion?: object;
  /** 设置虚拟滚动容器高度 */
  height?: number;
  /** 设置每个节点的高度（用于虚拟滚动） */
  itemHeight?: number;
  /** 是否开启虚拟滚动 */
  virtual?: boolean;
  /** 是否可聚焦 */
  focusable?: boolean;
  /** Tab 键顺序 */
  tabIndex?: number;
  /** 文本方向 */
  direction?: 'ltr' | 'rtl';
  
  // ==================== 回调函数 ====================
  
  /** 展开/收起节点时触发 */
  onExpand?: (expandedKeys: TreeNodeKey[], info: TreeNodeExpandedEvent) => void;
  /** 点击树节点时触发 */
  onSelect?: (selectedKeys: TreeNodeKey[], info: TreeNodeSelectedEvent) => void;
  /** 勾选树节点时触发 */
  onCheck?: (checked: TreeNodeKey[] | CheckedInfo, info: TreeNodeCheckedEvent) => void;
  /** 异步加载数据 */
  loadData?: (node: EventDataNode) => Promise<void>;
  /** 节点加载完毕时触发 */
  onLoad?: (loadedKeys: TreeNodeKey[], info: TreeNodeLoadedEvent) => void;
  /** 点击树节点时触发 */
  onClick?: (event: MouseEvent, node: EventDataNode) => void;
  /** 双击树节点时触发 */
  onDoubleClick?: (event: MouseEvent, node: EventDataNode) => void;
  /** 鼠标移入节点时触发 */
  onMouseEnter?: (info: TreeNodeMouseEvent) => void;
  /** 鼠标移出节点时触发 */
  onMouseLeave?: (info: TreeNodeMouseEvent) => void;
  /** 右键点击节点时触发 */
  onRightClick?: (info: TreeNodeMouseEvent) => void;
  /** 开始拖拽时触发 */
  onDragStart?: (info: TreeNodeDragStartEvent) => void;
  /** 拖拽进入节点时触发 */
  onDragEnter?: (info: TreeNodeDragEnterEvent) => void;
  /** 拖拽经过节点时触发 */
  onDragOver?: (info: TreeNodeDragOverEvent) => void;
  /** 拖拽离开节点时触发 */
  onDragLeave?: (info: TreeNodeDragLeaveEvent) => void;
  /** 拖拽结束时触发 */
  onDragEnd?: (info: TreeNodeDragEndEvent) => void;
  /** 放置节点时触发 */
  onDrop?: (info: TreeNodeDropEvent) => void;
  /** 判断是否允许放置 */
  allowDrop?: (options: AllowDropOptions) => boolean;
  /** 自定义渲染节点标题 */
  titleRender?: (node: TreeNodeData) => ReactNode;
  /** 自定义渲染拖拽指示器 */
  dropIndicatorRender?: (props: {
    dropPosition: -1 | 0 | 1;
    dropLevelOffset: number;
    indent: number;
    prefixCls: string;
    direction: 'ltr' | 'rtl';
  }) => ReactNode;
  /** 过滤树节点（配合搜索使用） */
  filterTreeNode?: (node: EventDataNode) => boolean;
  /** 键盘按下时触发 */
  onKeyDown?: (event: KeyboardEvent) => void;
  /** 获得焦点时触发 */
  onFocus?: (event: FocusEvent) => void;
  /** 失去焦点时触发 */
  onBlur?: (event: FocusEvent) => void;
  /** 激活节点变化时触发 */
  onActiveChange?: (activeKey: TreeNodeKey | null) => void;
  /** 右键菜单事件 */
  onContextMenu?: (event: MouseEvent) => void;
}

/**
 * Tree 组件内部状态接口
 */
export interface TreeState {
  /** 键-实体映射表 */
  keyEntities: KeyEntities;
  /** 缩进宽度 */
  indent: number | null;
  /** 选中的键列表 */
  selectedKeys: TreeNodeKey[];
  /** 勾选的键列表 */
  checkedKeys: TreeNodeKey[];
  /** 半选中的键列表 */
  halfCheckedKeys: TreeNodeKey[];
  /** 已加载的键列表 */
  loadedKeys: TreeNodeKey[];
  /** 加载中的键列表 */
  loadingKeys: TreeNodeKey[];
  /** 展开的键列表 */
  expandedKeys: TreeNodeKey[];
  /** 是否正在拖拽 */
  dragging: boolean;
  /** 被拖拽节点的子节点键列表 */
  dragChildrenKeys: TreeNodeKey[];
  /** 放置目标节点的键 */
  dropTargetKey: TreeNodeKey | null;
  /** 放置位置 */
  dropPosition: -1 | 0 | 1 | null;
  /** 放置容器节点的键 */
  dropContainerKey: TreeNodeKey | null;
  /** 放置层级偏移 */
  dropLevelOffset: number | null;
  /** 放置目标位置字符串 */
  dropTargetPos: TreeNodePos | null;
  /** 是否允许放置 */
  dropAllowed: boolean;
  /** 拖拽经过的节点键 */
  dragOverNodeKey: TreeNodeKey | null;
  /** 树形数据 */
  treeData: TreeNodeData[];
  /** 扁平化的节点列表 */
  flattenNodes: FlattenNode[];
  /** 是否聚焦 */
  focused: boolean;
  /** 激活的节点键 */
  activeKey: TreeNodeKey | null;
  /** 列表是否正在变化 */
  listChanging: boolean;
  /** 上一次的属性 */
  prevProps: TreeProps | null;
}

/**
 * 扁平化的节点信息
 */
export interface FlattenNode {
  /** 节点数据 */
  data: TreeNodeData;
  /** 节点实体 */
  parent: TreeNodeEntity | null;
  /** 子节点列表 */
  children?: FlattenNode[];
  /** 节点位置 */
  pos: TreeNodePos;
  /** 节点层级 */
  level: number;
}

/**
 * Tree 组件的引用接口
 */
export interface TreeRef {
  /** 滚动到指定节点 */
  scrollTo: (options: { key: TreeNodeKey; align?: 'top' | 'bottom' | 'auto' }) => void;
}

// ==================== 默认导出 ====================

/**
 * rc-tree 树形组件
 * 功能完备的 React 树形控件，支持拖拽、异步加载、虚拟滚动等特性
 */
declare class Tree extends React.Component<TreeProps, TreeState> {
  /** Tree.TreeNode 子组件 */
  static TreeNode: React.ComponentType<TreeNodeData>;
  
  /** 默认属性 */
  static defaultProps: Partial<TreeProps>;
  
  /** 滚动到指定节点 */
  scrollTo(options: { key: TreeNodeKey }): void;
}

export default Tree;