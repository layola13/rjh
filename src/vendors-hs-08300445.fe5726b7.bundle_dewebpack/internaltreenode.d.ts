/**
 * 内部树节点组件类型定义
 * @module InternalTreeNode
 */

import type { CSSProperties, ReactNode, DragEvent, MouseEvent } from 'react';

/**
 * 树节点拖拽位置
 */
export type DropPosition = -1 | 0 | 1;

/**
 * 文本方向
 */
export type Direction = 'ltr' | 'rtl';

/**
 * 节点展开状态
 */
export type NodeState = 'open' | 'close' | null;

/**
 * 树节点数据实体
 */
export interface DataEntity<T = any> {
  key: string | number;
  level: number;
  children?: DataEntity<T>[];
  parent?: DataEntity<T>;
  data?: T;
}

/**
 * 键值实体映射
 */
export interface KeyEntities {
  [key: string]: DataEntity;
}

/**
 * 节点事件数据
 */
export interface EventDataNode<T = any> {
  key: string | number;
  title?: ReactNode;
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean;
  loaded?: boolean;
  loading?: boolean;
  halfChecked?: boolean;
  children?: EventDataNode<T>[];
  data?: T;
  pos?: string;
}

/**
 * 拖拽指示器渲染参数
 */
export interface DropIndicatorRenderProps {
  dropPosition: DropPosition;
  dropLevelOffset: number;
  indent: number;
  prefixCls: string;
  direction: Direction;
}

/**
 * 切换器图标渲染函数类型
 */
export type SwitcherIcon = (props: TreeNodeProps) => ReactNode;

/**
 * 树上下文配置
 */
export interface TreeContextProps<T = any> {
  /** CSS 类名前缀 */
  prefixCls: string;
  /** 是否可选择 */
  selectable?: boolean;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 自定义图标 */
  icon?: ReactNode | ((props: TreeNodeProps<T>) => ReactNode);
  /** 是否可拖拽 */
  draggable?: boolean | ((data: T) => boolean);
  /** 是否可勾选 */
  checkable?: boolean | ReactNode;
  /** 是否禁用整棵树 */
  disabled?: boolean;
  /** 键值实体映射 */
  keyEntities: KeyEntities;
  /** 异步加载数据函数 */
  loadData?: (node: EventDataNode<T>) => Promise<void>;
  /** 标题渲染函数 */
  titleRender?: (data: T) => ReactNode;
  /** 切换器图标 */
  switcherIcon?: SwitcherIcon;
  /** 拖拽容器节点键值 */
  dropContainerKey?: string | number | null;
  /** 拖拽目标节点键值 */
  dropTargetKey?: string | number | null;
  /** 拖拽层级偏移 */
  dropLevelOffset?: number;
  /** 拖拽位置 */
  dropPosition?: DropPosition | null;
  /** 拖拽指示器渲染函数 */
  dropIndicatorRender?: (props: DropIndicatorRenderProps) => ReactNode;
  /** 当前拖拽经过的节点键值 */
  dragOverNodeKey?: string | number | null;
  /** 文本方向 */
  direction?: Direction;
  /** 缩进距离 */
  indent?: number;
  /** 过滤树节点函数 */
  filterTreeNode?: (node: EventDataNode<T>) => boolean;

  // 事件回调
  onNodeClick: (e: MouseEvent, node: EventDataNode<T>) => void;
  onNodeDoubleClick: (e: MouseEvent, node: EventDataNode<T>) => void;
  onNodeSelect: (e: MouseEvent, node: EventDataNode<T>) => void;
  onNodeCheck: (e: MouseEvent, node: EventDataNode<T>, checked: boolean) => void;
  onNodeLoad: (node: EventDataNode<T>) => void;
  onNodeMouseEnter: (e: MouseEvent, node: EventDataNode<T>) => void;
  onNodeMouseLeave: (e: MouseEvent, node: EventDataNode<T>) => void;
  onNodeContextMenu: (e: MouseEvent, node: EventDataNode<T>) => void;
  onNodeExpand: (e: MouseEvent, node: EventDataNode<T>) => void;
  onNodeDragStart: (e: DragEvent, node: InternalTreeNode<T>) => void;
  onNodeDragEnter: (e: DragEvent, node: InternalTreeNode<T>) => void;
  onNodeDragOver: (e: DragEvent, node: InternalTreeNode<T>) => void;
  onNodeDragLeave: (e: DragEvent, node: InternalTreeNode<T>) => void;
  onNodeDragEnd: (e: DragEvent, node: InternalTreeNode<T>) => void;
  onNodeDrop: (e: DragEvent, node: InternalTreeNode<T>) => void;
}

/**
 * 树节点属性
 */
export interface TreeNodeProps<T = any> {
  /** 节点唯一键值 */
  eventKey: string | number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 是否拖拽经过 */
  dragOver?: boolean;
  /** 是否拖拽经过上间隙 */
  dragOverGapTop?: boolean;
  /** 是否拖拽经过下间隙 */
  dragOverGapBottom?: boolean;
  /** 是否为叶子节点 */
  isLeaf?: boolean;
  /** 是否为第一个节点 */
  isStart?: boolean[];
  /** 是否为最后一个节点 */
  isEnd?: boolean[];
  /** 是否展开 */
  expanded?: boolean;
  /** 是否选中 */
  selected?: boolean;
  /** 是否勾选 */
  checked?: boolean;
  /** 是否半选 */
  halfChecked?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否已加载 */
  loaded?: boolean;
  /** 是否激活 */
  active?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可选择 */
  selectable?: boolean;
  /** 是否可勾选 */
  checkable?: boolean;
  /** 是否禁用勾选框 */
  disableCheckbox?: boolean;
  /** 节点标题 */
  title?: ReactNode | ((data: T) => ReactNode);
  /** 自定义图标 */
  icon?: ReactNode | ((props: TreeNodeProps<T>) => ReactNode);
  /** 切换器图标 */
  switcherIcon?: SwitcherIcon;
  /** 节点数据 */
  data?: T;
  /** DOM 引用 */
  domRef?: React.Ref<HTMLDivElement>;
  /** 树上下文 */
  context?: TreeContextProps<T>;
  /** 鼠标移动事件 */
  onMouseMove?: (e: MouseEvent) => void;
}

/**
 * 内部树节点组件状态
 */
export interface InternalTreeNodeState {
  /** 拖拽节点高亮状态 */
  dragNodeHighlight: boolean;
}

/**
 * 内部树节点组件类
 */
export declare class InternalTreeNode<T = any> extends React.Component<
  TreeNodeProps<T>,
  InternalTreeNodeState
> {
  /** 选择器句柄 */
  selectHandle?: HTMLSpanElement | null;

  state: InternalTreeNodeState;

  /**
   * 组件挂载时同步加载数据
   */
  componentDidMount(): void;

  /**
   * 组件更新时同步加载数据
   */
  componentDidUpdate(): void;

  /**
   * 选择器点击事件处理
   */
  onSelectorClick(e: MouseEvent): void;

  /**
   * 选择器双击事件处理
   */
  onSelectorDoubleClick(e: MouseEvent): void;

  /**
   * 节点选择事件处理
   */
  onSelect(e: MouseEvent): void;

  /**
   * 节点勾选事件处理
   */
  onCheck(e: MouseEvent): void;

  /**
   * 鼠标进入事件处理
   */
  onMouseEnter(e: MouseEvent): void;

  /**
   * 鼠标离开事件处理
   */
  onMouseLeave(e: MouseEvent): void;

  /**
   * 右键菜单事件处理
   */
  onContextMenu(e: MouseEvent): void;

  /**
   * 拖拽开始事件处理
   */
  onDragStart(e: DragEvent): void;

  /**
   * 拖拽进入事件处理
   */
  onDragEnter(e: DragEvent): void;

  /**
   * 拖拽经过事件处理
   */
  onDragOver(e: DragEvent): void;

  /**
   * 拖拽离开事件处理
   */
  onDragLeave(e: DragEvent): void;

  /**
   * 拖拽结束事件处理
   */
  onDragEnd(e: DragEvent): void;

  /**
   * 拖放事件处理
   */
  onDrop(e: DragEvent): void;

  /**
   * 节点展开/收起事件处理
   */
  onExpand(e: MouseEvent): void;

  /**
   * 设置选择器句柄引用
   */
  setSelectHandle(element: HTMLSpanElement | null): void;

  /**
   * 获取节点展开状态
   * @returns 'open' | 'close' | null
   */
  getNodeState(): NodeState;

  /**
   * 判断节点是否有子节点
   */
  hasChildren(): boolean;

  /**
   * 判断是否为叶子节点
   */
  isLeaf(): boolean;

  /**
   * 判断节点是否禁用
   */
  isDisabled(): boolean;

  /**
   * 判断节点是否可勾选
   */
  isCheckable(): boolean;

  /**
   * 判断节点是否可选择
   */
  isSelectable(): boolean;

  /**
   * 同步加载节点数据
   */
  syncLoadData(props: TreeNodeProps<T>): void;

  /**
   * 渲染切换器图标 DOM
   */
  renderSwitcherIconDom(isLeaf: boolean): ReactNode;

  /**
   * 渲染切换器
   */
  renderSwitcher(): ReactNode;

  /**
   * 渲染勾选框
   */
  renderCheckbox(): ReactNode;

  /**
   * 渲染图标
   */
  renderIcon(): ReactNode;

  /**
   * 渲染选择器
   */
  renderSelector(): ReactNode;

  /**
   * 渲染拖放指示器
   */
  renderDropIndicator(): ReactNode;

  /**
   * 渲染组件
   */
  render(): ReactNode;
}

/**
 * 树节点组件（带上下文消费者包装）
 */
export interface TreeNodeComponent {
  <T = any>(props: TreeNodeProps<T>): JSX.Element;
  /** 组件显示名称 */
  displayName: string;
  /** 默认属性 */
  defaultProps: Partial<TreeNodeProps>;
  /** 树节点标识 */
  isTreeNode: 1;
}

/**
 * 默认导出的树节点组件
 */
declare const TreeNode: TreeNodeComponent;

export default TreeNode;

/**
 * 工具函数：转换节点属性为事件数据
 */
export declare function convertNodePropsToEventData<T = any>(
  props: TreeNodeProps<T>
): EventDataNode<T>;

/**
 * 工具函数：获取数据和 ARIA 属性
 */
export declare function getDataAndAria(
  props: Record<string, any>
): Record<string, any>;