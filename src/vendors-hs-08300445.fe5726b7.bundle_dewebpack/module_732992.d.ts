/**
 * OptionList 组件类型定义
 * 用于 TreeSelect 组件的下拉选项列表
 */

import type { ReactNode, Key, CSSProperties, RefObject } from 'react';
import type { TreeProps } from 'rc-tree';

/**
 * 树节点数据结构
 */
export interface TreeNodeData {
  /** 节点唯一标识 */
  key: Key;
  /** 节点显示值 */
  value: any;
  /** 节点标题 */
  title?: ReactNode;
  /** 是否可选 */
  selectable?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为叶子节点 */
  isLeaf?: boolean;
  /** 子节点 */
  children?: TreeNodeData[];
  /** 其他自定义属性 */
  [key: string]: any;
}

/**
 * 扁平化后的选项数据
 */
export interface FlattenOptionData extends TreeNodeData {
  /** 节点层级 */
  level: number;
  /** 父节点 key */
  parent?: Key;
}

/**
 * 选择事件回调参数
 */
export interface SelectInfo {
  /** 节点对象 */
  node: { key: Key };
  /** 是否选中 */
  selected: boolean;
}

/**
 * OptionList 组件属性
 */
export interface OptionListProps {
  /** 样式类名前缀 */
  prefixCls: string;
  /** 下拉菜单高度 */
  height: number;
  /** 每项高度 */
  itemHeight: number;
  /** 是否启用虚拟滚动 */
  virtual: boolean;
  /** 原始选项数据 */
  options: TreeNodeData[];
  /** 扁平化的选项数据 */
  flattenOptions: FlattenOptionData[];
  /** 是否多选 */
  multiple: boolean;
  /** 搜索关键词 */
  searchValue: string;
  /** 选择回调 */
  onSelect: (value: any, option: { selected: boolean }) => void;
  /** 切换展开状态回调 */
  onToggleOpen: (open: boolean) => void;
  /** 是否展开 */
  open: boolean;
  /** 空数据时的内容 */
  notFoundContent?: ReactNode;
  /** 鼠标进入事件 */
  onMouseEnter?: (e: React.MouseEvent) => void;
}

/**
 * Select 上下文数据
 */
export interface SelectContextData {
  /** 是否显示复选框 */
  checkable: boolean;
  /** 已选中的节点 key */
  checkedKeys: Key[];
  /** 半选中的节点 key */
  halfCheckedKeys: Key[];
  /** 展开的树节点 key */
  treeExpandedKeys?: Key[];
  /** 默认全部展开 */
  treeDefaultExpandAll?: boolean;
  /** 默认展开的节点 key */
  treeDefaultExpandedKeys?: Key[];
  /** 树展开事件 */
  onTreeExpand?: (expandedKeys: Key[]) => void;
  /** 树节点图标 */
  treeIcon?: ReactNode | ((props: any) => ReactNode);
  /** 是否显示树图标 */
  showTreeIcon?: boolean;
  /** 切换器图标 */
  switcherIcon?: ReactNode | ((props: any) => ReactNode);
  /** 树连接线 */
  treeLine?: boolean | { showLeafIcon: boolean };
  /** 过滤属性名 */
  treeNodeFilterProp: string;
  /** 异步加载数据函数 */
  loadData?: (node: TreeNodeData) => Promise<void>;
  /** 已加载的节点 key */
  treeLoadedKeys?: Key[];
  /** 树动画配置 */
  treeMotion?: any;
  /** 树加载事件 */
  onTreeLoad?: (loadedKeys: Key[]) => void;
}

/**
 * OptionList 组件实例方法
 */
export interface OptionListRef {
  /** 滚动到指定位置 */
  scrollTo: (config: { key: Key } | { index: number }) => void;
  /** 键盘按下事件处理 */
  onKeyDown: (event: React.KeyboardEvent) => void;
  /** 键盘抬起事件处理 */
  onKeyUp: () => void;
}

/**
 * 树选择配置
 */
export interface TreeCheckConfig {
  /** 选中的节点 */
  checked: Key[];
  /** 半选中的节点 */
  halfChecked: Key[];
}

/**
 * OptionList 组件
 * 展示树形选项列表，支持虚拟滚动、搜索过滤、异步加载等功能
 */
declare const OptionList: React.ForwardRefExoticComponent<
  OptionListProps & React.RefAttributes<OptionListRef>
>;

export default OptionList;