/**
 * Vue.Draggable 组件类型定义
 * 基于 Sortable.js 的 Vue 拖拽组件
 */

import Vue, { VNode, CreateElement, VueConstructor } from 'vue';
import Sortable from 'sortablejs';

/** Sortable.js 事件名称 */
type SortableEvent = 'Start' | 'Add' | 'Remove' | 'Update' | 'End';
type SortableUIEvent = 'Choose' | 'Unchoose' | 'Sort' | 'Filter' | 'Clone';
type SortableMoveEvent = 'Move';

/** 拖拽移动事件参数 */
interface DragMoveEvent<T = any> {
  /** 拖拽元素 */
  dragged: HTMLElement;
  /** 相关元素 */
  related: HTMLElement;
  /** 来源容器 */
  from: HTMLElement;
  /** 目标容器 */
  to: HTMLElement;
  /** 是否在元素后插入 */
  willInsertAfter: boolean;
  /** 原始事件 */
  originalEvent: MouseEvent | TouchEvent;
  /** 拖拽上下文 */
  draggedContext: DraggedContext<T>;
  /** 相关上下文 */
  relatedContext: RelatedContext<T>;
}

/** 拖拽元素上下文 */
interface DraggedContext<T = any> {
  /** 元素索引 */
  index: number;
  /** 元素数据 */
  element: T;
  /** 未来索引（预期插入位置） */
  futureIndex: number;
}

/** 相关元素上下文 */
interface RelatedContext<T = any> {
  /** 元素索引 */
  index: number;
  /** 元素数据 */
  element: T;
  /** 数据列表 */
  list: T[];
  /** 组件实例 */
  component: Vue;
}

/** 变更事件载荷 */
interface ChangeEvent<T = any> {
  /** 添加事件 */
  added?: {
    element: T;
    newIndex: number;
  };
  /** 移除事件 */
  removed?: {
    element: T;
    oldIndex: number;
  };
  /** 移动事件 */
  moved?: {
    element: T;
    oldIndex: number;
    newIndex: number;
  };
}

/** 组件数据配置 */
interface ComponentData {
  /** 事件监听器 */
  on?: Record<string, Function>;
  /** 组件属性 */
  props?: Record<string, any>;
  /** HTML 属性 */
  attrs?: Record<string, any>;
}

/** Draggable 组件属性 */
export interface DraggableProps<T = any> {
  /** Sortable.js 配置选项（已废弃，建议直接传递属性） */
  options?: Sortable.Options;
  
  /** 绑定的数组（与 value 互斥） */
  list?: T[];
  
  /** v-model 绑定的数组（与 list 互斥） */
  value?: T[];
  
  /** 拖拽时禁用过渡动画 */
  noTransitionOnDrag?: boolean;
  
  /** 克隆函数，用于创建元素副本 */
  clone?: (original: T) => T;
  
  /** 根元素标签名（已废弃，使用 tag） */
  element?: string;
  
  /** 根元素标签名 */
  tag?: string;
  
  /** 移动前的回调函数，返回 false 可阻止移动 */
  move?: (event: DragMoveEvent<T>, originalEvent: Event) => boolean | void;
  
  /** 组件数据配置（用于自定义组件） */
  componentData?: ComponentData;
}

/** Draggable 组件事件 */
export interface DraggableEvents<T = any> {
  /** 数据变更事件 */
  change: (event: ChangeEvent<T>) => void;
  
  /** 拖拽开始 */
  start: (event: Sortable.SortableEvent) => void;
  
  /** 元素添加 */
  add: (event: Sortable.SortableEvent) => void;
  
  /** 元素移除 */
  remove: (event: Sortable.SortableEvent) => void;
  
  /** 元素更新 */
  update: (event: Sortable.SortableEvent) => void;
  
  /** 拖拽结束 */
  end: (event: Sortable.SortableEvent) => void;
  
  /** 选择元素 */
  choose: (event: Sortable.SortableEvent) => void;
  
  /** 取消选择 */
  unchoose: (event: Sortable.SortableEvent) => void;
  
  /** 排序 */
  sort: (event: Sortable.SortableEvent) => void;
  
  /** 过滤 */
  filter: (event: Sortable.SortableEvent) => void;
  
  /** 克隆 */
  clone: (event: Sortable.SortableEvent) => void;
  
  /** v-model 更新事件 */
  input: (value: T[]) => void;
}

/** Draggable 组件内部数据 */
interface DraggableData {
  /** 是否为过渡模式（transition-group） */
  transitionMode: boolean;
  
  /** 是否为非函数式组件模式 */
  noneFunctionalComponentMode: boolean;
}

/** Draggable 组件实例 */
declare class DraggableComponent<T = any> extends Vue {
  /** 组件属性 */
  options?: Sortable.Options;
  list?: T[];
  value?: T[];
  noTransitionOnDrag: boolean;
  clone: (original: T) => T;
  element: string;
  tag: string | null;
  move: ((event: DragMoveEvent<T>, originalEvent: Event) => boolean | void) | null;
  componentData: ComponentData | null;
  
  /** 内部数据 */
  transitionMode: boolean;
  noneFunctionalComponentMode: boolean;
  
  /** 内部属性 */
  readonly _sortable?: Sortable;
  readonly rootContainer: HTMLElement;
  readonly realList: T[] | null;
  readonly headerOffset: number;
  readonly footerOffset: number;
  readonly visibleIndexes: number[];
  readonly context: DraggedContext<T>;
  
  /** 内部方法 */
  getIsFunctional(): boolean;
  getTag(): string;
  updateOptions(options: Record<string, any>): void;
  getChildrenNodes(): VNode[];
  computeIndexes(): void;
  getUnderlyingVm(element: HTMLElement): { index: number; element: T } | null;
  getUnderlyingPotencialDraggableComponent(element: Vue): Vue;
  emitChanges(event: ChangeEvent<T>): void;
  alterList(callback: (list: T[]) => void): void;
  spliceList(...args: any[]): void;
  updatePosition(oldIndex: number, newIndex: number): void;
  getRelatedContextFromMoveEvent(event: Sortable.MoveEvent): RelatedContext<T>;
  getVmIndex(visibleIndex: number): number;
  getComponent(): Vue;
  resetTransitionData(index: number): void;
  
  /** Sortable 事件处理器 */
  onDragStart(event: Sortable.SortableEvent): void;
  onDragAdd(event: Sortable.SortableEvent): void;
  onDragRemove(event: Sortable.SortableEvent): void;
  onDragUpdate(event: Sortable.SortableEvent): void;
  onDragMove(event: Sortable.MoveEvent, originalEvent: Event): boolean;
  onDragEnd(): void;
}

declare const Draggable: VueConstructor<DraggableComponent>;

export default Draggable;

/**
 * 辅助工具函数类型
 */
export namespace DraggableUtils {
  /** 驼峰转换函数 */
  export function camelize(str: string): string;
  
  /** 控制台对象 */
  export const console: Console;
  
  /** 插入子元素 */
  export function insertNodeAt(parent: HTMLElement, child: HTMLElement, index: number): void;
  
  /** 移除子元素 */
  export function removeNode(node: HTMLElement): void;
}

/**
 * 全局类型扩展
 */
declare module 'vue/types/vue' {
  interface Vue {
    /** Draggable 组件引用 */
    $draggable?: DraggableComponent;
  }
}