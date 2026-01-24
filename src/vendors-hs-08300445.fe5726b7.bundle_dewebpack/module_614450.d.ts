/**
 * React组件：ResizeObserver包装器
 * 用于监听子元素的尺寸变化并触发回调
 */

import type { ReactNode, ReactElement, RefObject, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 元素尺寸信息
 */
export interface ResizeObserverSize {
  /** 元素内容区域宽度（不包含边框和滚动条） */
  width: number;
  /** 元素内容区域高度（不包含边框和滚动条） */
  height: number;
  /** 元素偏移宽度（包含边框、内边距和滚动条） */
  offsetWidth: number;
  /** 元素偏移高度（包含边框、内边距和滚动条） */
  offsetHeight: number;
}

/**
 * 尺寸变化回调函数类型
 * @param size - 新的尺寸信息
 * @param element - 被观察的DOM元素
 */
export type ResizeCallback = (size: ResizeObserverSize, element: HTMLElement) => void;

/**
 * 集合上下文回调类型
 * @param size - 尺寸信息
 * @param element - DOM元素
 * @param data - 附加数据
 */
export type CollectionContextCallback = (size: ResizeObserverSize, element: HTMLElement, data?: unknown) => void;

/**
 * 渲染函数类型
 * @param ref - React ref对象
 * @returns 渲染的React元素
 */
export type RenderFunction = (ref: RefObject<HTMLElement>) => ReactNode;

/**
 * ResizeObserver组件属性
 */
export interface ResizeObserverProps {
  /**
   * 子元素内容
   * 可以是React元素或返回React元素的函数
   * 函数形式会接收一个ref参数用于关联DOM元素
   */
  children: ReactElement | RenderFunction;

  /**
   * 是否禁用尺寸监听
   * @default false
   */
  disabled?: boolean;

  /**
   * 尺寸变化时的回调函数
   * 会在下一个微任务中异步执行
   */
  onResize?: ResizeCallback;

  /**
   * 附加数据
   * 会传递给CollectionContext回调
   */
  data?: unknown;
}

/**
 * ResizeObserver组件
 * 
 * 监听子元素的尺寸变化，当尺寸发生改变时触发onResize回调。
 * 支持通过disabled属性暂停监听。
 * 
 * @example
 *