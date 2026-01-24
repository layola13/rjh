/**
 * VSlideGroup 组件类型定义
 * 提供滑动分组功能，支持左右滚动、触摸手势和响应式箭头显示
 */

import Vue, { VNode, VueConstructor } from 'vue';
import { BaseItemGroup } from '../VItemGroup/VItemGroup';

/** 箭头显示策略 */
export type ShowArrowsStrategy = boolean | 'always' | 'desktop' | 'mobile';

/** 滑动方向 */
export type SlideDirection = 'prev' | 'next';

/** 触摸事件处理器 */
export type TouchEventHandler = (event: TouchEvent) => void;

/** 宽度信息 */
export interface WidthInfo {
  /** 内容区域宽度 */
  content: number;
  /** 包装器宽度 */
  wrapper: number;
}

/** 触摸指令配置 */
export interface TouchDirectiveConfig {
  start: TouchEventHandler;
  move: TouchEventHandler;
  end: TouchEventHandler;
}

/** BaseSlideGroup 属性 */
export interface BaseSlideGroupProps {
  /** 激活项的CSS类名 */
  activeClass?: string;
  /** 是否将激活项居中显示 */
  centerActive?: boolean;
  /** 下一页图标 */
  nextIcon?: string;
  /** 上一页图标 */
  prevIcon?: string;
  /** 箭头显示策略 */
  showArrows?: ShowArrowsStrategy;
}

/** BaseSlideGroup 数据 */
export interface BaseSlideGroupData {
  /** 内部子项数量 */
  internalItemsLength: number;
  /** 内容是否溢出 */
  isOverflowing: boolean;
  /** 窗口调整大小的防抖定时器ID */
  resizeTimeout: number;
  /** 触摸开始时的X坐标 */
  startX: number;
  /** 当前滚动偏移量（像素） */
  scrollOffset: number;
  /** 宽度信息 */
  widths: WidthInfo;
}

/** BaseSlideGroup 计算属性 */
export interface BaseSlideGroupComputed {
  /** 生成的下一页过渡元素（缓存） */
  __cachedNext: VNode;
  /** 生成的上一页过渡元素（缓存） */
  __cachedPrev: VNode;
  /** 组件CSS类对象 */
  classes: Record<string, boolean>;
  /** 是否显示左右箭头 */
  hasAffixes: boolean;
  /** 是否可以向下一页滚动 */
  hasNext: boolean;
  /** 是否可以向上一页滚动 */
  hasPrev: boolean;
}

/** BaseSlideGroup 方法 */
export interface BaseSlideGroupMethods {
  /**
   * 生成下一页按钮元素
   */
  genNext(): VNode;

  /**
   * 生成内容容器元素
   */
  genContent(): VNode;

  /**
   * 生成组件数据对象
   */
  genData(): {
    class: Record<string, boolean>;
    directives: Array<{ name: string; value: () => void }>;
  };

  /**
   * 生成箭头图标
   * @param direction - 方向（'prev' 或 'next'）
   */
  genIcon(direction: SlideDirection): VNode | null;

  /**
   * 生成上一页按钮元素
   */
  genPrev(): VNode;

  /**
   * 生成过渡动画包裹的图标
   * @param direction - 方向（'prev' 或 'next'）
   */
  genTransition(direction: SlideDirection): VNode;

  /**
   * 生成滚动包装器元素
   */
  genWrapper(): VNode;

  /**
   * 计算新的滚动偏移量
   * @param direction - 滚动方向
   * @param widths - 宽度信息
   * @param isRtl - 是否为从右到左布局
   * @param currentOffset - 当前偏移量
   * @returns 新的滚动偏移量
   */
  calculateNewOffset(
    direction: SlideDirection,
    widths: WidthInfo,
    isRtl: boolean,
    currentOffset: number
  ): number;

  /**
   * 箭头点击事件处理器
   * @param direction - 点击的箭头方向
   */
  onAffixClick(direction: SlideDirection): void;

  /**
   * 窗口调整大小事件处理器
   */
  onResize(): void;

  /**
   * 触摸开始事件处理器
   * @param event - 触摸事件对象
   */
  onTouchStart(event: TouchEvent & { touchstartX: number }): void;

  /**
   * 触摸移动事件处理器
   * @param event - 触摸事件对象
   */
  onTouchMove(event: TouchEvent & { touchmoveX: number }): void;

  /**
   * 触摸结束事件处理器
   */
  onTouchEnd(): void;

  /**
   * 溢出检查：仅在内容溢出时执行回调
   * @param event - 事件对象
   * @param callback - 回调函数
   */
  overflowCheck(event: Event, callback: (event: Event) => void): void;

  /**
   * 将选中项滚动到可视区域
   */
  scrollIntoView(): void;

  /**
   * 计算更新后的偏移量（确保元素可见）
   * @param element - 目标元素
   * @param widths - 宽度信息
   * @param isRtl - 是否为从右到左布局
   * @param currentOffset - 当前偏移量
   * @returns 更新后的偏移量
   */
  calculateUpdatedOffset(
    element: HTMLElement,
    widths: WidthInfo,
    isRtl: boolean,
    currentOffset: number
  ): number;

  /**
   * 计算居中显示的偏移量
   * @param element - 目标元素
   * @param widths - 宽度信息
   * @param isRtl - 是否为从右到左布局
   * @returns 居中偏移量
   */
  calculateCenteredOffset(
    element: HTMLElement,
    widths: WidthInfo,
    isRtl: boolean
  ): number;

  /**
   * 滚动到指定方向
   * @param direction - 滚动方向
   */
  scrollTo(direction: SlideDirection): void;

  /**
   * 更新内容和包装器的宽度信息
   */
  setWidths(): void;
}

/**
 * BaseSlideGroup 组件
 * 提供可滚动的项目分组，支持触摸滑动和箭头导航
 */
export declare const BaseSlideGroup: VueConstructor<
  Vue &
    BaseSlideGroupProps &
    BaseSlideGroupData &
    BaseSlideGroupComputed &
    BaseSlideGroupMethods & {
      /** 内容元素引用 */
      $refs: {
        content: HTMLElement;
        wrapper: HTMLElement;
      };
    }
>;

/**
 * VSlideGroup 组件（默认导出）
 * 扩展 BaseSlideGroup，提供依赖注入
 */
declare const VSlideGroup: VueConstructor<
  InstanceType<typeof BaseSlideGroup> & {
    /** 提供给子组件的 slideGroup 实例 */
    slideGroup: InstanceType<typeof BaseSlideGroup>;
  }
>;

export default VSlideGroup;