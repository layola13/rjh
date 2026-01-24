/**
 * VVirtualScroll 组件类型定义
 * 虚拟滚动组件，用于高效渲染大量列表项
 */

import Vue, { VNode, CreateElement, VNodeData } from 'vue';

/**
 * 默认插槽作用域参数
 */
export interface VVirtualScrollScopedSlotProps<T = any> {
  /** 当前项在列表中的索引 */
  index: number;
  /** 当前项的数据 */
  item: T;
}

/**
 * 组件数据状态
 */
interface VVirtualScrollData {
  /** 当前视口中第一个可见项的索引 */
  first: number;
  /** 当前视口中最后一个可见项的索引 */
  last: number;
  /** 容器当前滚动距离 */
  scrollTop: number;
}

/**
 * 组件属性定义
 */
interface VVirtualScrollProps<T = any> {
  /** 
   * 预渲染项数量（视口外额外渲染的项数，用于优化滚动体验）
   * @default 0
   */
  bench: number | string;
  
  /** 
   * 每个列表项的高度（像素）
   * @required
   */
  itemHeight: number | string;
  
  /** 
   * 要渲染的数据列表
   * @default []
   */
  items: T[];
  
  /** 
   * 容器高度（继承自 measurable mixin）
   * 可选，未指定时使用元素实际高度
   */
  height?: number | string;
}

/**
 * 计算属性定义
 */
interface VVirtualScrollComputed {
  /** 内部使用的预渲染项数量（已解析为数字） */
  __bench: number;
  
  /** 内部使用的项高度（已解析为数字） */
  __itemHeight: number;
  
  /** 实际渲染的第一项索引（包含预渲染区域） */
  firstToRender: number;
  
  /** 实际渲染的最后一项索引（包含预渲染区域） */
  lastToRender: number;
  
  /** 可测量样式对象（来自 measurable mixin） */
  measurableStyles: Record<string, any>;
}

/**
 * 组件方法定义
 */
interface VVirtualScrollMethods<T = any> {
  /**
   * 生成当前视口中所有子节点的虚拟节点数组
   * @returns 虚拟节点数组
   */
  getChildren(): VNode[];
  
  /**
   * 为单个列表项生成虚拟节点
   * @param item - 列表项数据
   * @param relativeIndex - 在当前渲染切片中的相对索引
   * @returns 包含绝对定位的虚拟节点
   */
  genChild(item: T, relativeIndex: number): VNode;
  
  /**
   * 计算当前视口中第一个可见项的索引
   * @returns 第一个可见项索引
   */
  getFirst(): number;
  
  /**
   * 计算当前视口中最后一个可见项的索引
   * @param firstIndex - 第一个可见项的索引
   * @returns 最后一个可见项索引
   */
  getLast(firstIndex: number): number;
  
  /**
   * 滚动事件处理函数
   * 更新 scrollTop、first、last 状态
   */
  onScroll(): void;
  
  /**
   * 渲染函数
   * @param createElement - Vue 的 createElement 函数
   * @returns 根节点的虚拟节点
   */
  render(createElement: CreateElement): VNode;
}

/**
 * VVirtualScroll 组件实例类型
 */
export type VVirtualScroll<T = any> = Vue & 
  VVirtualScrollProps<T> & 
  VVirtualScrollData & 
  VVirtualScrollComputed & 
  VVirtualScrollMethods<T>;

/**
 * VVirtualScroll 组件构造函数
 */
declare const VVirtualScrollComponent: {
  new <T = any>(): VVirtualScroll<T>;
};

export default VVirtualScrollComponent;