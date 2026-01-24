/**
 * 自定义滚动条拖拽交互模块
 * 提供水平和垂直滚动条的鼠标拖拽功能
 */

import type { CSSProperties } from 'react';

/**
 * 滚动条事件管理器接口
 */
interface ScrollbarEventManager {
  /**
   * 绑定事件监听器
   * @param element - 目标元素
   * @param eventName - 事件名称
   * @param handler - 事件处理函数
   */
  bind(element: Element | Document, eventName: string, handler: EventListener): void;

  /**
   * 解绑事件监听器
   * @param element - 目标元素
   * @param eventName - 事件名称
   * @param handler - 事件处理函数
   */
  unbind(element: Element | Document, eventName: string, handler: EventListener): void;

  /**
   * 绑定一次性事件监听器
   * @param element - 目标元素
   * @param eventName - 事件名称
   * @param handler - 事件处理函数
   */
  once(element: Element | Document, eventName: string, handler: EventListener): void;
}

/**
 * 滚动条实例状态接口
 */
interface ScrollbarInstance {
  /** 水平滚动条元素 */
  scrollbarX: HTMLElement;
  
  /** 垂直滚动条元素 */
  scrollbarY: HTMLElement;
  
  /** 水平滚动条轨道元素 */
  scrollbarXRail: HTMLElement;
  
  /** 垂直滚动条轨道元素 */
  scrollbarYRail: HTMLElement;
  
  /** 滚动条所属文档 */
  ownerDocument: Document;
  
  /** 事件管理器 */
  event: ScrollbarEventManager;
  
  /** 水平滚动条左侧位置 */
  scrollbarXLeft: number;
  
  /** 垂直滚动条顶部位置 */
  scrollbarYTop: number;
  
  /** 水平轨道比例系数 */
  railXRatio: number;
  
  /** 垂直轨道比例系数 */
  railYRatio: number;
  
  /** 水平轨道宽度 */
  railXWidth: number;
  
  /** 垂直轨道高度 */
  railYHeight: number;
  
  /** 水平滚动条宽度 */
  scrollbarXWidth: number;
  
  /** 垂直滚动条高度 */
  scrollbarYHeight: number;
  
  /** 内容区域宽度 */
  contentWidth: number;
  
  /** 内容区域高度 */
  contentHeight: number;
  
  /** 容器宽度 */
  containerWidth: number;
  
  /** 容器高度 */
  containerHeight: number;
  
  /** 负向滚动调整值 */
  negativeScrollAdjustment: number;
}

/**
 * 初始化水平滚动条拖拽功能
 * @param element - 滚动容器元素
 * @param instance - 滚动条实例状态
 */
declare function initializeHorizontalScrollbarDrag(
  element: HTMLElement,
  instance: ScrollbarInstance
): void;

/**
 * 初始化垂直滚动条拖拽功能
 * @param element - 滚动容器元素
 * @param instance - 滚动条实例状态
 */
declare function initializeVerticalScrollbarDrag(
  element: HTMLElement,
  instance: ScrollbarInstance
): void;

/**
 * 初始化滚动条拖拽交互
 * @param element - 滚动容器元素
 * @remarks
 * 该函数会同时初始化水平和垂直滚动条的拖拽功能，
 * 允许用户通过鼠标拖拽滚动条来滚动内容
 */
export default function initializeScrollbarDragInteraction(element: HTMLElement): void;

/**
 * 工具函数：将值转换为整数
 * @param value - 待转换的值
 * @returns 转换后的整数
 */
declare function toInt(value: string | number): number;

/**
 * 工具函数：开始滚动状态
 * @param element - 滚动容器元素
 * @param axis - 滚动轴向 ('x' | 'y')
 */
declare function startScrolling(element: HTMLElement, axis: 'x' | 'y'): void;

/**
 * 工具函数：停止滚动状态
 * @param element - 滚动容器元素
 * @param axis - 滚动轴向 ('x' | 'y')
 */
declare function stopScrolling(element: HTMLElement, axis: 'x' | 'y'): void;

/**
 * 工具函数：获取CSS属性值
 * @param element - 目标元素
 * @param property - CSS属性名
 * @returns CSS属性值
 */
declare function css(element: HTMLElement, property: keyof CSSProperties): string;

/**
 * 工具函数：设置元素滚动位置
 * @param element - 滚动容器元素
 * @param direction - 滚动方向 ('left' | 'top')
 * @param position - 目标滚动位置
 */
declare function setScrollPosition(
  element: HTMLElement,
  direction: 'left' | 'top',
  position: number
): void;

/**
 * 工具函数：获取滚动条实例
 * @param element - 滚动容器元素
 * @returns 滚动条实例状态
 */
declare function getScrollbarInstance(element: HTMLElement): ScrollbarInstance;

/**
 * 工具函数：更新滚动条UI状态
 * @param element - 滚动容器元素
 */
declare function updateScrollbarUI(element: HTMLElement): void;