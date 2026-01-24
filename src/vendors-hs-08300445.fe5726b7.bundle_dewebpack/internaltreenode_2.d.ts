import type { ReactNode, CSSProperties, MouseEvent, DragEvent } from 'react';

/**
 * 树节点的拖拽位置
 */
export type DropPosition = -1 | 0 | 1;

/**
 * 文本方向
 */
export type Direction = 'ltr' | 'rtl';

/**
 * 树节点的键值类型
 */
export type Key = string | number;

/**
 * 树节点展开状态
 */
export type NodeState = 'open' | 'close' | null;

/**
 * 树节点的基础数据结构
 */
export interface TreeNodeData {
  key: Key;
  title?: ReactNode;
  children?: TreeNodeData[];
  [key: string]: any;
}

/**
 * 树节点实体映射
 */
export interface KeyEntities {
  [key: string]: {
    level: number;
    children?: TreeNodeData[];
  };
}

/**
 * 树节点事件数据
 */
export interface EventData {
  eventKey: Key;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  loaded: boolean;
  loading: boolean;
  halfChecked: boolean;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  pos: string;
  active: boolean;
}

/**
 * 拖拽指示器渲染参数
 */
export interface DropIndicatorRenderParams {
  dropPosition: DropPosition;
  dropLevelOffset: number;
  indent: number;
  prefixCls: string;
  direction: Direction;
}

/**
 * 切换器图标属性
 */
export interface SwitcherIconProps extends InternalTreeNodeProps {
  isLeaf: boolean;
}

/**
 * 树节点上下文
 */
export interface TreeContext {
  prefixCls: string;
  selectable: boolean;
  showIcon: boolean;
  icon?: ReactNode | ((props: InternalTreeNodeProps) => ReactNode);
  switcherIcon?: ReactNode | ((props: SwitcherIconProps) => ReactNode);
  draggable: boolean | ((data: TreeNodeData) => boolean);
  checkable: boolean | ReactNode;
  disabled: boolean;
  keyEntities: KeyEntities;
  dropContainerKey?: Key;
  dropTargetKey?: Key;
  dropPosition?: DropPosition;
  dropLevelOffset?: number;
  indent: number;
  direction: Direction;
  dropIndicatorRender: (params: DropIndicatorRenderParams) => ReactNode;
  dragOverNodeKey?: Key;
  filterTreeNode?: (eventData: EventData) => boolean;
  titleRender?: (data: TreeNodeData) => ReactNode;
  loadData?: (eventData: EventData) => Promise<void>;
  onNodeClick: (event: MouseEvent, eventData: EventData) => void;
  onNodeDoubleClick: (event: MouseEvent, eventData: EventData) => void;
  onNodeSelect: (event: MouseEvent, eventData: EventData) => void;
  onNodeCheck: (event: MouseEvent, eventData: EventData, checked: boolean) => void;
  onNodeLoad: (eventData: EventData) => void;
  onNodeMouseEnter: (event: MouseEvent, eventData: EventData) => void;
  onNodeMouseLeave: (event: MouseEvent, eventData: EventData) => void;
  onNodeContextMenu: (event: MouseEvent, eventData: EventData) => void;
  onNodeDragStart: (event: DragEvent, node: InternalTreeNode) => void;
  onNodeDragEnter: (event: DragEvent, node: InternalTreeNode) => void;
  onNodeDragOver: (event: DragEvent, node: InternalTreeNode) => void;
  onNodeDragLeave: (event: DragEvent, node: InternalTreeNode) => void;
  onNodeDragEnd: (event: DragEvent, node: InternalTreeNode) => void;
  onNodeDrop: (event: DragEvent, node: InternalTreeNode) => void;
  onNodeExpand: (event: MouseEvent, eventData: EventData) => void;
}

/**
 * 内部树节点组件属性
 */
export interface InternalTreeNodeProps {
  eventKey: Key;
  className?: string;
  style?: CSSProperties;
  title?: ReactNode;
  icon?: ReactNode | ((props: InternalTreeNodeProps) => ReactNode);
  switcherIcon?: ReactNode | ((props: SwitcherIconProps) => ReactNode);
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  loaded: boolean;
  loading: boolean;
  halfChecked: boolean;
  children?: ReactNode;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  pos: string;
  domRef?: React.Ref<HTMLDivElement>;
  data: TreeNodeData;
  isStart: boolean[];
  isEnd: boolean[];
  active: boolean;
  selectable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  checkable?: boolean | ReactNode;
  isLeaf?: boolean;
  onMouseMove?: (event: MouseEvent) => void;
  context: TreeContext;
}

/**
 * 内部树节点组件状态
 */
export interface InternalTreeNodeState {
  dragNodeHighlight: boolean;
}

/**
 * 内部树节点类组件
 * 
 * 负责渲染单个树节点，包括：
 * - 展开/收起切换器
 * - 复选框
 * - 图标
 * - 标题内容
 * - 拖拽指示器
 * - 处理各种用户交互事件（点击、双击、拖拽、鼠标事件等）
 */
export declare class InternalTreeNode extends React.Component<
  InternalTreeNodeProps,
  InternalTreeNodeState
> {
  state: InternalTreeNodeState;
  selectHandle: HTMLSpanElement | null;

  /**
   * 处理选择器点击事件
   */
  onSelectorClick: (event: MouseEvent) => void;

  /**
   * 处理选择器双击事件
   */
  onSelectorDoubleClick: (event: MouseEvent) => void;

  /**
   * 处理节点选择
   */
  onSelect: (event: MouseEvent) => void;

  /**
   * 处理节点勾选
   */
  onCheck: (event: MouseEvent) => void;

  /**
   * 处理鼠标进入事件
   */
  onMouseEnter: (event: MouseEvent) => void;

  /**
   * 处理鼠标离开事件
   */
  onMouseLeave: (event: MouseEvent) => void;

  /**
   * 处理右键菜单事件
   */
  onContextMenu: (event: MouseEvent) => void;

  /**
   * 处理拖拽开始事件
   */
  onDragStart: (event: DragEvent) => void;

  /**
   * 处理拖拽进入事件
   */
  onDragEnter: (event: DragEvent) => void;

  /**
   * 处理拖拽经过事件
   */
  onDragOver: (event: DragEvent) => void;

  /**
   * 处理拖拽离开事件
   */
  onDragLeave: (event: DragEvent) => void;

  /**
   * 处理拖拽结束事件
   */
  onDragEnd: (event: DragEvent) => void;

  /**
   * 处理放置事件
   */
  onDrop: (event: DragEvent) => void;

  /**
   * 处理节点展开/收起
   */
  onExpand: (event: MouseEvent) => void;

  /**
   * 设置选择器的DOM引用
   */
  setSelectHandle: (element: HTMLSpanElement | null) => void;

  /**
   * 获取节点状态（展开/收起）
   */
  getNodeState: () => NodeState;

  /**
   * 判断节点是否有子节点
   */
  hasChildren: () => boolean;

  /**
   * 判断节点是否为叶子节点
   */
  isLeaf: () => boolean;

  /**
   * 判断节点是否禁用
   */
  isDisabled: () => boolean;

  /**
   * 判断节点是否可勾选
   */
  isCheckable: () => boolean;

  /**
   * 判断节点是否可选择
   */
  isSelectable: () => boolean;

  /**
   * 同步加载数据
   */
  syncLoadData: (props: InternalTreeNodeProps) => void;

  /**
   * 渲染切换器图标DOM
   */
  renderSwitcherIconDom: (isLeaf: boolean) => ReactNode;

  /**
   * 渲染切换器
   */
  renderSwitcher: () => ReactNode;

  /**
   * 渲染复选框
   */
  renderCheckbox: () => ReactNode;

  /**
   * 渲染图标
   */
  renderIcon: () => ReactNode;

  /**
   * 渲染选择器（包含图标和标题）
   */
  renderSelector: () => ReactNode;

  /**
   * 渲染拖拽放置指示器
   */
  renderDropIndicator: () => ReactNode;

  componentDidMount(): void;
  componentDidUpdate(): void;
  render(): ReactNode;
}

/**
 * 树节点组件（包装器）
 * 
 * 通过Context消费者包装InternalTreeNode，自动注入树的上下文
 */
declare const TreeNode: React.FC<Omit<InternalTreeNodeProps, 'context'>> & {
  displayName: string;
  defaultProps: Partial<InternalTreeNodeProps>;
  isTreeNode: 1;
};

export { TreeNode as default, InternalTreeNode };