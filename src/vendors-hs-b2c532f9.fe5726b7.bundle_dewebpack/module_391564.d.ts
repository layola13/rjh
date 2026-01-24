/**
 * 更新滚动条尺寸和位置的核心模块
 * 负责计算并应用滚动条的各项布局属性
 */

import type { CSSProperties } from './types';

/**
 * 滚动条设置配置
 */
interface ScrollbarSettings {
  /** 最小滚动条长度（像素） */
  minScrollbarLength?: number;
  /** 最大滚动条长度（像素） */
  maxScrollbarLength?: number;
  /** 是否禁用水平滚动条 */
  suppressScrollX?: boolean;
  /** 是否禁用垂直滚动条 */
  suppressScrollY?: boolean;
  /** 水平滚动边距偏移 */
  scrollXMarginOffset: number;
  /** 垂直滚动边距偏移 */
  scrollYMarginOffset: number;
}

/**
 * 滚动条状态数据
 */
interface ScrollbarState {
  /** 容器宽度 */
  containerWidth: number;
  /** 容器高度 */
  containerHeight: number;
  /** 内容总宽度 */
  contentWidth: number;
  /** 内容总高度 */
  contentHeight: number;
  
  /** 水平滚动条轨道元素 */
  scrollbarXRail: HTMLElement;
  /** 垂直滚动条轨道元素 */
  scrollbarYRail: HTMLElement;
  /** 水平滚动条元素 */
  scrollbarX: HTMLElement;
  /** 垂直滚动条元素 */
  scrollbarY: HTMLElement;
  
  /** 水平滚动条是否激活 */
  scrollbarXActive: boolean;
  /** 垂直滚动条是否激活 */
  scrollbarYActive: boolean;
  
  /** 水平轨道宽度 */
  railXWidth: number;
  /** 垂直轨道高度 */
  railYHeight: number;
  /** 水平轨道边距宽度 */
  railXMarginWidth: number;
  /** 垂直轨道边距高度 */
  railYMarginHeight: number;
  /** 水平轨道边框宽度 */
  railBorderXWidth: number;
  /** 垂直轨道边框宽度 */
  railBorderYWidth: number;
  
  /** 水平轨道宽度比率 */
  railXRatio: number;
  /** 垂直轨道高度比率 */
  railYRatio: number;
  
  /** 水平滚动条宽度 */
  scrollbarXWidth: number;
  /** 垂直滚动条高度 */
  scrollbarYHeight: number;
  /** 水平滚动条左侧位置 */
  scrollbarXLeft: number;
  /** 垂直滚动条顶部位置 */
  scrollbarYTop: number;
  
  /** 垂直滚动条外部宽度 */
  scrollbarYOuterWidth: number;
  /** 水平滚动条顶部位置 */
  scrollbarXTop: number;
  /** 水平滚动条底部位置 */
  scrollbarXBottom: number;
  /** 垂直滚动条左侧位置 */
  scrollbarYLeft: number;
  /** 垂直滚动条右侧位置 */
  scrollbarYRight: number;
  
  /** 是否为RTL（从右到左）布局 */
  isRtl: boolean;
  /** RTL模式下的负向滚动调整值 */
  negativeScrollAdjustment: number;
  /** 垂直滚动条是否使用右侧定位 */
  isScrollbarYUsingRight: boolean;
  /** 水平滚动条是否使用底部定位 */
  isScrollbarXUsingBottom: boolean;
  
  /** 滚动条设置 */
  settings: ScrollbarSettings;
}

/**
 * 工具函数模块
 */
interface UtilsModule {
  /** 转换为整数 */
  toInt(value: number): number;
}

/**
 * DOM操作模块
 */
interface DomModule {
  /** 查询子元素 */
  queryChildren(parent: Element, selector: string): Element[];
  /** 移除元素 */
  remove(element: Element): void;
  /** 追加子元素 */
  appendTo(child: HTMLElement, parent: HTMLElement): void;
  /** 设置CSS样式 */
  css(element: HTMLElement, styles: Partial<CSSStyleDeclaration> | CSSProperties): void;
}

/**
 * 状态管理模块
 */
interface StateModule {
  /** 获取元素的滚动条状态 */
  get(element: HTMLElement): ScrollbarState;
}

/**
 * 滚动设置模块
 */
type SetScrollFunction = (element: HTMLElement, axis: 'left' | 'top', value: number) => void;

/**
 * 限制滚动条长度在配置的最小/最大值之间
 * @param state - 滚动条状态对象
 * @param length - 计算出的滚动条长度
 * @returns 限制后的滚动条长度
 */
declare function clampScrollbarLength(state: ScrollbarState, length: number): number;

/**
 * 更新滚动条轨道和滚动条的位置样式
 * @param element - 滚动容器元素
 * @param state - 滚动条状态对象
 */
declare function updateScrollbarPositions(element: HTMLElement, state: ScrollbarState): void;

/**
 * 更新滚动条的尺寸、位置和激活状态
 * @param element - 需要更新滚动条的容器元素
 */
export default function updateScrollbar(element: HTMLElement): void;