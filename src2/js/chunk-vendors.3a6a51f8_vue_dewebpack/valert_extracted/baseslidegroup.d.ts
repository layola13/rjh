import type { VNode, VNodeData, CreateElement } from 'vue';
import type { PropValidator } from 'vue/types/options';

/**
 * 箭头显示模式类型
 * - 'always': 始终显示箭头
 * - 'desktop': 仅在桌面端显示
 * - 'mobile': 仅在移动端显示
 * - boolean: true 表示溢出时显示
 */
export type ShowArrowsType = boolean | 'always' | 'desktop' | 'mobile';

/**
 * 触摸事件处理器
 */
export interface TouchHandlers {
  /** 触摸开始事件 */
  start: (event: TouchEvent & { touchstartX: number }) => void;
  /** 触摸移动事件 */
  move: (event: TouchEvent & { touchmoveX: number }) => void;
  /** 触摸结束事件 */
  end: (event: TouchEvent) => void;
}

/**
 * 宽度配置对象
 */
export interface WidthConfig {
  /** 内容区域宽度 */
  content: number;
  /** 包装器宽度 */
  wrapper: number;
}

/**
 * 滑动方向类型
 */
export type SlideDirection = 'next' | 'prev';

/**
 * 选中项元素接口
 */
export interface SelectedItem {
  /** DOM 元素引用 */
  $el: HTMLElement;
}

/**
 * BaseSlideGroup 组件属性
 */
export interface BaseSlideGroupProps {
  /**
   * 激活项的 CSS 类名
   * @default 'v-slide-item--active'
   */
  activeClass: string;

  /**
   * 是否将激活项居中显示
   * @default false
   */
  centerActive: boolean;

  /**
   * 下一页图标名称
   * @default '$next'
   */
  nextIcon: string;

  /**
   * 上一页图标名称
   * @default '$prev'
   */
  prevIcon: string;

  /**
   * 控制箭头显示的策略
   * @default undefined
   */
  showArrows: ShowArrowsType;
}

/**
 * BaseSlideGroup 组件数据
 */
export interface BaseSlideGroupData {
  /** 内部子项数量 */
  internalItemsLength: number;
  /** 是否溢出（内容超出容器） */
  isOverflowing: boolean;
  /** resize 事件的防抖定时器 ID */
  resizeTimeout: number;
  /** 触摸开始时的 X 坐标 */
  startX: number;
  /** 当前滚动偏移量（像素） */
  scrollOffset: number;
  /** 容器和内容的宽度信息 */
  widths: WidthConfig;
}

/**
 * BaseSlideGroup 计算属性
 */
export interface BaseSlideGroupComputed {
  /** 缓存的下一页过渡组件 */
  __cachedNext: VNode;
  /** 缓存的上一页过渡组件 */
  __cachedPrev: VNode;
  /** 组件的 CSS 类对象 */
  classes: Record<string, boolean>;
  /** 是否显示前后缀（箭头） */
  hasAffixes: boolean;
  /** 是否有下一页 */
  hasNext: boolean;
  /** 是否有上一页 */
  hasPrev: boolean;
  /** 当前选中项 */
  selectedItem?: SelectedItem;
  /** 当前选中索引 */
  selectedIndex: number;
  /** 是否为移动端 */
  isMobile: boolean;
}

/**
 * BaseSlideGroup 方法
 */
export interface BaseSlideGroupMethods {
  /**
   * 生成下一页按钮
   * @returns VNode
   */
  genNext(): VNode;

  /**
   * 生成内容容器
   * @returns VNode
   */
  genContent(): VNode;

  /**
   * 生成组件数据对象
   * @returns VNodeData
   */
  genData(): VNodeData;

  /**
   * 生成图标组件
   * @param direction - 方向（'next' 或 'prev'）
   * @returns VNode 或 null
   */
  genIcon(direction: SlideDirection): VNode | null;

  /**
   * 生成上一页按钮
   * @returns VNode
   */
  genPrev(): VNode;

  /**
   * 生成过渡动画
   * @param direction - 方向（'next' 或 'prev'）
   * @returns VNode
   */
  genTransition(direction: SlideDirection): VNode;

  /**
   * 生成包装器容器
   * @returns VNode
   */
  genWrapper(): VNode;

  /**
   * 计算新的滚动偏移量
   * @param direction - 滑动方向
   * @param widths - 宽度配置
   * @param isRtl - 是否为 RTL 布局
   * @param currentOffset - 当前偏移量
   * @returns 新的偏移量
   */
  calculateNewOffset(
    direction: SlideDirection,
    widths: WidthConfig,
    isRtl: boolean,
    currentOffset: number
  ): number;

  /**
   * 处理前后缀（箭头）点击事件
   * @param direction - 点击的方向
   */
  onAffixClick(direction: SlideDirection): void;

  /**
   * 处理窗口 resize 事件
   */
  onResize(): void;

  /**
   * 处理触摸开始事件
   * @param event - 触摸事件对象
   */
  onTouchStart(event: TouchEvent & { touchstartX: number }): void;

  /**
   * 处理触摸移动事件
   * @param event - 触摸事件对象
   */
  onTouchMove(event: TouchEvent & { touchmoveX: number }): void;

  /**
   * 处理触摸结束事件
   */
  onTouchEnd(): void;

  /**
   * 溢出检查，仅在溢出时执行回调
   * @param event - 事件对象
   * @param callback - 回调函数
   */
  overflowCheck(event: Event, callback: (event: Event) => void): void;

  /**
   * 将选中项滚动到可视区域
   */
  scrollIntoView(): void;

  /**
   * 计算更新后的偏移量（保持选中项可见）
   * @param element - 目标元素
   * @param widths - 宽度配置
   * @param isRtl - 是否为 RTL 布局
   * @param currentOffset - 当前偏移量
   * @returns 新的偏移量
   */
  calculateUpdatedOffset(
    element: HTMLElement,
    widths: WidthConfig,
    isRtl: boolean,
    currentOffset: number
  ): number;

  /**
   * 计算居中偏移量（将元素居中显示）
   * @param element - 目标元素
   * @param widths - 宽度配置
   * @param isRtl - 是否为 RTL 布局
   * @returns 居中偏移量
   */
  calculateCenteredOffset(
    element: HTMLElement,
    widths: WidthConfig,
    isRtl: boolean
  ): number;

  /**
   * 滚动到指定方向
   * @param direction - 滚动方向
   */
  scrollTo(direction: SlideDirection): void;

  /**
   * 设置容器和内容的宽度信息
   */
  setWidths(): void;

  /**
   * 渲染函数
   * @param h - createElement 函数
   * @returns VNode
   */
  render(h: CreateElement): VNode;
}

/**
 * BaseSlideGroup 组件实例类型
 */
export interface BaseSlideGroup
  extends BaseSlideGroupProps,
    BaseSlideGroupData,
    BaseSlideGroupComputed,
    BaseSlideGroupMethods {
  /** Vue 实例引用 */
  $refs: {
    content: HTMLElement;
    wrapper: HTMLElement;
  };
  /** Vue 插槽 */
  $slots: {
    default?: VNode[];
    next?: VNode[];
    prev?: VNode[];
  };
  /** Vue 作用域插槽 */
  $scopedSlots: {
    next?: () => VNode;
    prev?: () => VNode;
  };
  /** Vuetify 实例 */
  $vuetify: {
    rtl: boolean;
  };
  /** 子组件数组 */
  $children: unknown[];
  /** 组件是否已销毁 */
  _isDestroyed: boolean;
}

/**
 * VSlideGroup 组件（继承自 BaseSlideGroup）
 */
export interface VSlideGroup extends BaseSlideGroup {
  /** 提供给子组件的 slideGroup 实例 */
  provide(): {
    slideGroup: VSlideGroup;
  };
}

/**
 * 导出 BaseSlideGroup 组件定义
 */
export declare const BaseSlideGroup: BaseSlideGroup;

/**
 * 导出默认 VSlideGroup 组件定义
 */
declare const VSlideGroupComponent: VSlideGroup;
export default VSlideGroupComponent;