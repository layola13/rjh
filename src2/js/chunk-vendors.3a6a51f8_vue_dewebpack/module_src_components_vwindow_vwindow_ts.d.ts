/**
 * VWindow 组件类型定义
 * 一个滑动窗口容器组件，支持触摸手势、箭头导航和过渡动画
 * @module VWindow
 */

import { VNode, VNodeData } from 'vue';
import { BaseItemGroup } from '../VItemGroup/VItemGroup';

/**
 * 触摸事件处理器接口
 */
interface TouchHandlers {
  /** 向左滑动事件处理器 */
  left?: (event: TouchEvent) => void;
  /** 向右滑动事件处理器 */
  right?: (event: TouchEvent) => void;
  /** 触摸开始事件处理器 */
  start?: (event: TouchEvent) => void;
  /** 触摸结束事件处理器 */
  end?: (event: TouchEvent) => void;
  /** 向上滑动事件处理器 */
  up?: (event: TouchEvent) => void;
  /** 向下滑动事件处理器 */
  down?: (event: TouchEvent) => void;
}

/**
 * VWindow 组件的属性接口
 */
interface VWindowProps {
  /**
   * 激活项的CSS类名
   * @default "v-window-item--active"
   */
  activeClass?: string;

  /**
   * 是否启用连续循环模式（到达末尾后可继续到开头）
   * @default false
   */
  continuous?: boolean;

  /**
   * 是否强制至少有一个项处于激活状态
   * @default true
   */
  mandatory?: boolean;

  /**
   * 下一页箭头图标，false 表示不显示
   * @default "$next"
   */
  nextIcon?: boolean | string;

  /**
   * 上一页箭头图标，false 表示不显示
   * @default "$prev"
   */
  prevIcon?: boolean | string;

  /**
   * 是否反转过渡动画方向
   * @default false
   */
  reverse?: boolean;

  /**
   * 是否显示导航箭头
   * @default false
   */
  showArrows?: boolean;

  /**
   * 是否仅在悬停时显示导航箭头
   * @default false
   */
  showArrowsOnHover?: boolean;

  /**
   * 自定义触摸事件处理器配置
   */
  touch?: TouchHandlers;

  /**
   * 是否禁用触摸手势
   * @default false
   */
  touchless?: boolean;

  /**
   * 当前激活项的值（可用于 v-model）
   */
  value?: unknown;

  /**
   * 是否使用垂直方向的过渡动画
   * @default false
   */
  vertical?: boolean;
}

/**
 * VWindow 组件的数据状态接口
 */
interface VWindowData {
  /** 内部高度值（用于动态计算容器高度） */
  internalHeight: string | number | undefined;
  
  /** 过渡动画期间的临时高度 */
  transitionHeight: string | number | undefined;
  
  /** 当前正在进行的过渡动画数量 */
  transitionCount: number;
  
  /** 组件是否已完成初始化挂载 */
  isBooted: boolean;
  
  /** 当前是否处于反向过渡状态 */
  isReverse: boolean;
}

/**
 * VWindow 组件的计算属性接口
 */
interface VWindowComputed {
  /** 是否有过渡动画正在进行 */
  isActive: boolean;
  
  /** 组件的CSS类名对象 */
  classes: Record<string, boolean>;
  
  /** 计算后的过渡动画类名 */
  computedTransition: string;
  
  /** 是否存在未禁用的可激活项 */
  hasActiveItems: boolean;
  
  /** 是否可以导航到下一项 */
  hasNext: boolean;
  
  /** 是否可以导航到上一项 */
  hasPrev: boolean;
  
  /** 当前激活项的索引 */
  internalIndex: number;
  
  /** 根据RTL设置计算的实际反转状态 */
  internalReverse: boolean;
}

/**
 * 窗口项接口
 */
interface WindowItem {
  /** 项是否被禁用 */
  disabled?: boolean;
  /** 项的其他属性 */
  [key: string]: unknown;
}

/**
 * VWindow 组件的方法接口
 */
interface VWindowMethods {
  /**
   * 生成窗口容器的 VNode
   * @returns 容器的虚拟DOM节点
   */
  genContainer(): VNode;

  /**
   * 生成导航图标的 VNode
   * @param direction - 图标方向（'prev' 或 'next'）
   * @param icon - 图标名称或组件
   * @param onClick - 点击事件处理器
   * @returns 图标的虚拟DOM节点
   */
  genIcon(direction: 'prev' | 'next', icon: string, onClick: () => void): VNode;

  /**
   * 生成所有控制图标（上一页/下一页）
   * @returns 图标VNode数组
   */
  genControlIcons(): VNode[];

  /**
   * 获取下一个未禁用项的索引（循环查找）
   * @param currentIndex - 当前索引
   * @returns 下一个可用项的索引
   */
  getNextIndex(currentIndex: number): number;

  /**
   * 获取上一个未禁用项的索引（循环查找）
   * @param currentIndex - 当前索引
   * @returns 上一个可用项的索引
   */
  getPrevIndex(currentIndex: number): number;

  /**
   * 导航到下一项
   */
  next(): void;

  /**
   * 导航到上一项
   */
  prev(): void;

  /**
   * 根据索引变化判断是否需要反转过渡方向
   * @param newIndex - 新索引
   * @param oldIndex - 旧索引
   * @returns 是否应该反转过渡
   */
  updateReverse(newIndex: number, oldIndex: number): boolean;

  /**
   * 获取项的值（用于内部值比较）
   * @param item - 窗口项
   * @param index - 项的索引
   * @returns 项的唯一标识值
   */
  getValue(item: WindowItem, index: number): unknown;
}

/**
 * VWindow 组件提供的注入对象
 */
interface WindowGroupProvide {
  /** 窗口组实例引用 */
  windowGroup: VWindowInstance;
}

/**
 * VWindow 组件实例类型
 * 继承自 BaseItemGroup，添加了窗口特有的功能
 */
export interface VWindowInstance extends BaseItemGroup {
  // Props
  activeClass: string;
  continuous: boolean;
  mandatory: boolean;
  nextIcon: boolean | string;
  prevIcon: boolean | string;
  reverse: boolean;
  showArrows: boolean;
  showArrowsOnHover: boolean;
  touch?: TouchHandlers;
  touchless: boolean;
  value?: unknown;
  vertical: boolean;

  // Data
  internalHeight: string | number | undefined;
  transitionHeight: string | number | undefined;
  transitionCount: number;
  isBooted: boolean;
  isReverse: boolean;

  // Computed
  readonly isActive: boolean;
  readonly classes: Record<string, boolean>;
  readonly computedTransition: string;
  readonly hasActiveItems: boolean;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
  readonly internalIndex: number;
  readonly internalReverse: boolean;

  // Methods
  genContainer(): VNode;
  genIcon(direction: 'prev' | 'next', icon: string, onClick: () => void): VNode;
  genControlIcons(): VNode[];
  getNextIndex(currentIndex: number): number;
  getPrevIndex(currentIndex: number): number;
  next(): void;
  prev(): void;
  updateReverse(newIndex: number, oldIndex: number): boolean;

  // Inherited from BaseItemGroup
  items: WindowItem[];
  internalValue: unknown;
}

/**
 * VWindow 组件构造函数类型
 */
declare const VWindow: {
  new (): VWindowInstance;
};

export default VWindow;