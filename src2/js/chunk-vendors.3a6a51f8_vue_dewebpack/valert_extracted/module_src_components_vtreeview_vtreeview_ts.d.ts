/**
 * VTreeview 组件类型定义
 * 树形视图组件，支持单选/多选、展开/折叠、搜索过滤等功能
 */

import Vue from 'vue';
import { VNode } from 'vue/types/vnode';

/**
 * 树节点的内部状态
 */
interface TreeNode<T = any> {
  /** 虚拟节点实例引用 */
  vnode: any | null;
  /** 父节点的唯一标识 */
  parent: string | null;
  /** 子节点的唯一标识数组 */
  children: string[];
  /** 原始数据项 */
  item: T;
  /** 节点是否被选中 */
  isSelected: boolean;
  /** 节点是否处于不确定状态（部分子节点选中） */
  isIndeterminate: boolean;
  /** 节点是否处于激活状态 */
  isActive: boolean;
  /** 节点是否展开 */
  isOpen: boolean;
}

/**
 * 节点状态计算结果
 */
interface NodeState {
  /** 是否选中 */
  isSelected: boolean;
  /** 是否不确定状态 */
  isIndeterminate: boolean;
}

/**
 * 树形过滤函数类型
 */
type TreeFilterFunction = (
  item: any,
  search: string,
  textKey: string
) => boolean;

/**
 * 选择模式类型
 * - independent: 独立选择，节点间无关联
 * - leaf: 仅叶子节点可选
 * - 默认: 级联选择，父子节点联动
 */
type SelectionType = 'independent' | 'leaf' | undefined;

/**
 * VTreeview 组件属性
 */
interface VTreeviewProps<T = any> {
  /** 激活的节点数组（高亮显示） */
  active?: T[];
  /** 紧凑模式，减少节点间距 */
  dense?: boolean;
  /** 自定义过滤函数 */
  filter?: TreeFilterFunction;
  /** 鼠标悬停时显示背景色 */
  hoverable?: boolean;
  /** 树形数据源 */
  items?: T[];
  /** 是否允许多个节点同时激活 */
  multipleActive?: boolean;
  /** 展开的节点数组 */
  open?: T[];
  /** 是否展开所有节点 */
  openAll?: boolean;
  /** 是否返回完整对象（false时返回itemKey对应的值） */
  returnObject?: boolean;
  /** 搜索关键词 */
  search?: string;
  /** 选中的节点数组（v-model） */
  value?: T[];
  /** 节点唯一标识的属性名 */
  itemKey?: string;
  /** 节点文本的属性名 */
  itemText?: string;
  /** 子节点数组的属性名 */
  itemChildren?: string;
  /** 节点禁用状态的属性名 */
  itemDisabled?: string;
  /** 选择类型 */
  selectionType?: SelectionType;
}

/**
 * VTreeview 组件数据
 */
interface VTreeviewData {
  /** 当前层级（根节点为-1） */
  level: number;
  /** 激活节点的缓存集合 */
  activeCache: Set<string>;
  /** 节点映射表，key为节点唯一标识 */
  nodes: Record<string, TreeNode>;
  /** 展开节点的缓存集合 */
  openCache: Set<string>;
  /** 选中节点的缓存集合 */
  selectedCache: Set<string>;
}

/**
 * VTreeview 组件计算属性
 */
interface VTreeviewComputed {
  /** 被搜索过滤排除的节点集合 */
  excludedItems: Set<string>;
}

/**
 * VTreeview 组件方法
 */
interface VTreeviewMethods<T = any> {
  /**
   * 更新所有节点的展开状态
   * @param isOpen - 是否展开
   */
  updateAll(isOpen: boolean): void;

  /**
   * 获取所有节点的唯一标识数组
   * @param items - 节点数组
   * @param keys - 累积的标识数组
   * @returns 所有节点的唯一标识数组
   */
  getKeys(items: T[], keys?: string[]): string[];

  /**
   * 构建树形结构的内部节点映射
   * @param items - 节点数组
   * @param parent - 父节点标识
   */
  buildTree(items: T[], parent?: string | null): void;

  /**
   * 计算节点的选中状态（基于子节点）
   * @param key - 节点唯一标识
   * @param nodes - 节点映射表
   * @returns 节点状态
   */
  calculateState(key: string, nodes: Record<string, TreeNode>): NodeState;

  /**
   * 触发 update:open 事件
   */
  emitOpen(): void;

  /**
   * 触发 input 事件（v-model）
   */
  emitSelected(): void;

  /**
   * 触发 update:active 事件
   */
  emitActive(): void;

  /**
   * 触发节点缓存相关的事件
   * @param eventName - 事件名称
   * @param cache - 节点缓存集合
   */
  emitNodeCache(eventName: string, cache: Set<string>): void;

  /**
   * 处理节点缓存的监听器逻辑
   * @param value - 新值
   * @param cache - 缓存集合
   * @param updateFn - 更新函数
   * @param emitFn - 触发事件函数
   */
  handleNodeCacheWatcher(
    value: T[],
    cache: Set<string>,
    updateFn: (key: string, state: boolean) => void,
    emitFn: () => void
  ): void;

  /**
   * 获取节点的所有后代节点标识
   * @param key - 节点唯一标识
   * @param descendants - 累积的后代数组
   * @returns 后代节点标识数组
   */
  getDescendants(key: string, descendants?: string[]): string[];

  /**
   * 获取节点的所有祖先节点标识
   * @param key - 节点唯一标识
   * @returns 祖先节点标识数组（从父到根）
   */
  getParents(key: string): string[];

  /**
   * 注册节点的虚拟节点实例
   * @param vnode - 虚拟节点实例
   */
  register(vnode: any): void;

  /**
   * 注销节点的虚拟节点实例
   * @param vnode - 虚拟节点实例
   */
  unregister(vnode: any): void;

  /**
   * 判断节点是否为父节点（有子节点）
   * @param key - 节点唯一标识
   * @returns 是否为父节点
   */
  isParent(key: string): boolean;

  /**
   * 更新节点的激活状态
   * @param key - 节点唯一标识
   * @param isActive - 是否激活
   */
  updateActive(key: string, isActive: boolean): void;

  /**
   * 更新节点的选中状态
   * @param key - 节点唯一标识
   * @param isSelected - 是否选中
   * @param ignoreDisabled - 是否忽略禁用状态
   */
  updateSelected(key: string, isSelected: boolean, ignoreDisabled?: boolean): void;

  /**
   * 更新节点的展开状态
   * @param key - 节点唯一标识
   * @param isOpen - 是否展开
   */
  updateOpen(key: string, isOpen: boolean): void | Promise<void>;

  /**
   * 更新虚拟节点的状态
   * @param key - 节点唯一标识
   */
  updateVnodeState(key: string): void;

  /**
   * 判断节点是否被搜索过滤排除
   * @param key - 节点唯一标识
   * @returns 是否被排除
   */
  isExcluded(key: string): boolean;
}

/**
 * VTreeview 组件类型定义
 */
declare const VTreeview: Vue.ExtendedVue<
  Vue,
  VTreeviewData,
  VTreeviewMethods,
  VTreeviewComputed,
  VTreeviewProps
> & {
  /** 组件名称 */
  name: 'v-treeview';
  /** 提供给子组件的依赖注入 */
  provide(): { treeview: VTreeview };
};

export default VTreeview;

/**
 * 事件定义
 */
export interface VTreeviewEvents<T = any> {
  /**
   * 选中值变化事件（v-model）
   * @param value - 选中的节点数组
   */
  input: (value: T[]) => void;

  /**
   * 激活节点变化事件
   * @param active - 激活的节点数组
   */
  'update:active': (active: T[]) => void;

  /**
   * 展开节点变化事件
   * @param open - 展开的节点数组
   */
  'update:open': (open: T[]) => void;
}