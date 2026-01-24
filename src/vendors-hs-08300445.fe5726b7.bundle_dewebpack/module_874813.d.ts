/**
 * 动画树节点组件类型定义
 * 用于在树形组件中实现节点的展开/收起动画效果
 */

import type React from 'react';
import type { CSSMotionProps } from 'rc-motion';

/**
 * 树节点必需的属性集合
 * 包含树节点渲染和交互所需的所有基础属性
 */
export interface TreeNodeRequiredProps {
  /** 节点展开状态 */
  expanded?: boolean;
  /** 节点选中状态 */
  selected?: boolean;
  /** 节点选中的键集合 */
  selectedKeys?: React.Key[];
  /** 加载中的键集合 */
  loadedKeys?: React.Key[];
  /** 加载数据的键集合 */
  loadingKeys?: React.Key[];
  /** 展开的键集合 */
  expandedKeys?: React.Key[];
  /** 半选中的键集合 */
  checkedKeys?: React.Key[];
  /** 半选中状态的键集合 */
  halfCheckedKeys?: React.Key[];
  /** 节点点击事件 */
  onNodeClick?: (e: React.MouseEvent, node: any) => void;
  /** 节点双击事件 */
  onNodeDoubleClick?: (e: React.MouseEvent, node: any) => void;
  /** 节点展开事件 */
  onNodeExpand?: (e: React.MouseEvent, node: any) => void;
  /** 节点选中事件 */
  onNodeSelect?: (e: React.MouseEvent, node: any) => void;
  /** 节点勾选事件 */
  onNodeCheck?: (e: React.MouseEvent, node: any, checked: boolean) => void;
  /** 节点加载事件 */
  onNodeLoad?: (node: any) => Promise<void>;
  /** 节点鼠标进入事件 */
  onNodeMouseEnter?: (e: React.MouseEvent, node: any) => void;
  /** 节点鼠标离开事件 */
  onNodeMouseLeave?: (e: React.MouseEvent, node: any) => void;
  /** 节点右键菜单事件 */
  onNodeContextMenu?: (e: React.MouseEvent, node: any) => void;
  /** 节点拖拽开始事件 */
  onNodeDragStart?: (e: React.DragEvent, node: any) => void;
  /** 节点拖拽进入事件 */
  onNodeDragEnter?: (e: React.DragEvent, node: any) => void;
  /** 节点拖拽经过事件 */
  onNodeDragOver?: (e: React.DragEvent, node: any) => void;
  /** 节点拖拽离开事件 */
  onNodeDragLeave?: (e: React.DragEvent, node: any) => void;
  /** 节点放置事件 */
  onNodeDrop?: (e: React.DragEvent, node: any) => void;
  /** 节点拖拽结束事件 */
  onNodeDragEnd?: (e: React.DragEvent, node: any) => void;
}

/**
 * 动画节点数据结构
 * 描述参与动画的单个树节点信息
 */
export interface MotionNodeData {
  /** 节点唯一标识 */
  key: React.Key;
  /** 节点数据 */
  data: {
    key: React.Key;
    title?: React.ReactNode;
    children?: MotionNodeData[];
    [key: string]: unknown;
  };
  /** 是否为动画起始节点 */
  isStart?: boolean;
  /** 是否为动画结束节点 */
  isEnd?: boolean;
}

/**
 * 动画类型枚举
 */
export type MotionType = 'show' | 'hide';

/**
 * 动画树节点组件属性
 */
export interface MotionTreeNodeProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** CSSMotion 动画配置 */
  motion?: Omit<CSSMotionProps, 'visible' | 'motionAppear' | 'onAppearEnd' | 'onLeaveEnd'>;
  /** 参与动画的节点列表 */
  motionNodes?: MotionNodeData[];
  /** 动画类型：显示或隐藏 */
  motionType?: MotionType;
  /** 动画开始回调 */
  onMotionStart?: () => void;
  /** 动画结束回调 */
  onMotionEnd?: () => void;
  /** 节点是否处于激活状态 */
  active?: boolean;
  /** 树节点必需属性 */
  treeNodeRequiredProps?: TreeNodeRequiredProps;
  /** 节点数据 */
  data?: {
    key: React.Key;
    [key: string]: unknown;
  };
  /** 是否为动画起始节点 */
  isStart?: boolean;
  /** 是否为动画结束节点 */
  isEnd?: boolean;
  /** DOM引用（不使用motion时） */
  domRef?: React.Ref<HTMLDivElement>;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 动画树节点组件
 * 
 * 用于在树形结构中实现节点的展开/收起动画效果。
 * 支持两种渲染模式：
 * 1. 动画模式：当提供 motionNodes 时，使用 CSSMotion 包装并渲染多个节点的动画
 * 2. 普通模式：直接渲染单个树节点
 * 
 * @example
 *