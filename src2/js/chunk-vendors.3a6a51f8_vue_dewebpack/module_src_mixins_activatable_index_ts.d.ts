import type { VNode, VNodeData } from 'vue';
import type { Vue } from 'vue/types/vue';

/**
 * Activator 验证类型
 */
type ActivatorType = string | HTMLElement | Vue;

/**
 * 事件监听器映射
 */
interface EventListeners {
  click?: (event: MouseEvent) => void;
  mouseenter?: (event: MouseEvent) => void;
  mouseleave?: (event: MouseEvent) => void;
  focus?: (event: FocusEvent) => void;
}

/**
 * Activator 属性
 */
interface ActivatorAttributes {
  /** ARIA 角色 */
  role: string;
  /** ARIA 弹出提示 */
  'aria-haspopup': boolean;
  /** ARIA 展开状态 */
  'aria-expanded': string;
}

/**
 * 值代理对象，用于双向绑定激活状态
 */
interface ValueProxy {
  /** 获取激活状态 */
  value: boolean;
}

/**
 * Activator 作用域插槽参数
 */
interface ActivatorSlotScope {
  /** 事件监听器 */
  on: EventListeners;
  /** HTML 属性 */
  attrs: ActivatorAttributes;
  /** 值代理 */
  value: boolean;
}

/**
 * Activatable 混入组件的 Props
 */
export interface ActivatableProps {
  /**
   * 激活器元素
   * 可以是选择器字符串、HTMLElement 或 Vue 组件实例
   * @default null
   */
  activator?: ActivatorType | null;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否使用内部激活器
   * @default false
   */
  internalActivator?: boolean;

  /**
   * 是否在鼠标悬停时打开
   * @default false
   */
  openOnHover?: boolean;

  /**
   * 是否在获得焦点时打开
   * @default false
   */
  openOnFocus?: boolean;
}

/**
 * Activatable 混入组件的 Data
 */
export interface ActivatableData {
  /** 激活器 DOM 元素 */
  activatorElement: HTMLElement | null;
  
  /** 激活器虚拟节点数组 */
  activatorNode: VNode[];
  
  /** 支持的事件列表 */
  events: Array<'click' | 'mouseenter' | 'mouseleave' | 'focus'>;
  
  /** 当前绑定的事件监听器 */
  listeners: EventListeners;
}

/**
 * Activatable 混入组件的方法
 */
export interface ActivatableMethods {
  /**
   * 添加激活器事件监听
   */
  addActivatorEvents(): void;

  /**
   * 生成激活器虚拟节点
   * @returns 激活器虚拟节点数组
   */
  genActivator(): VNode[];

  /**
   * 生成激活器 HTML 属性
   * @returns 激活器属性对象
   */
  genActivatorAttributes(): ActivatorAttributes;

  /**
   * 生成激活器事件监听器
   * @returns 事件监听器对象
   */
  genActivatorListeners(): EventListeners;

  /**
   * 获取激活器 DOM 元素
   * @param event - 可选的事件对象，用于获取事件目标
   * @returns 激活器 DOM 元素或 null
   */
  getActivator(event?: Event): HTMLElement | null;

  /**
   * 获取默认插槽内容
   * @returns 插槽虚拟节点数组
   */
  getContentSlot(): VNode[];

  /**
   * 获取值代理对象
   * @returns 值代理对象，提供 isActive 的 getter/setter
   */
  getValueProxy(): ValueProxy;

  /**
   * 移除激活器事件监听
   */
  removeActivatorEvents(): void;

  /**
   * 重置激活器
   * 移除旧的事件监听，重新获取激活器并添加新的事件监听
   */
  resetActivator(): void;

  /**
   * 延迟执行操作（从 Delayable 混入）
   * @param operation - 操作类型（'open' 或 'close'）
   */
  runDelay(operation: 'open' | 'close'): void;
}

/**
 * Activatable 混入组件
 * 
 * 提供激活器功能，支持通过点击、悬停或焦点来控制组件的激活状态。
 * 该混入继承自 Delayable 和 Toggleable。
 * 
 * @example
 *