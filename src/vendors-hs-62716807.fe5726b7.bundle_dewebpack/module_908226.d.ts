/**
 * Affix 固定定位组件类型声明
 * 用于将元素固定在视口的特定位置
 */

import type { Component, ReactNode, CSSProperties } from 'react';

/**
 * 组件内部状态枚举
 * 用于标识当前的测量状态
 */
export enum AffixStatus {
  /** 无状态 */
  None = 0,
  /** 准备测量 */
  Prepare = 1
}

/**
 * 固定样式接口
 * 描述元素固定时的CSS样式
 */
export interface AffixStyle {
  /** 定位方式 */
  position: 'fixed';
  /** 距离顶部的距离(像素) */
  top?: number;
  /** 距离底部的距离(像素) */
  bottom?: number;
  /** 宽度(像素) */
  width: number;
  /** 高度(像素) */
  height: number;
}

/**
 * 占位符样式接口
 * 用于保持原始空间占位
 */
export interface PlaceholderStyle {
  /** 宽度(像素) */
  width: number;
  /** 高度(像素) */
  height: number;
}

/**
 * 目标容器函数类型
 * 返回固定定位的参考容器
 * @returns 目标HTML元素或null
 */
export type TargetFunc = () => HTMLElement | Window | null;

/**
 * Affix组件属性接口
 */
export interface AffixProps {
  /** 
   * 自定义CSS类名前缀
   * @default 'affix'
   */
  prefixCls?: string;

  /** 
   * 距离窗口顶部达到指定偏移量后触发固定
   * @example offsetTop={100}
   */
  offsetTop?: number;

  /** 
   * 距离窗口底部达到指定偏移量后触发固定
   * @example offsetBottom={50}
   */
  offsetBottom?: number;

  /** 
   * 设置Affix需要监听其滚动事件的元素
   * 默认为window
   * @example target={() => document.getElementById('container')}
   */
  target?: TargetFunc;

  /** 
   * 固定状态改变时的回调函数
   * @param affixed - 是否固定
   * @example onChange={(affixed) => console.log('Fixed:', affixed)}
   */
  onChange?: (affixed: boolean) => void;

  /** 
   * 子元素内容
   */
  children?: ReactNode;

  /** 
   * 自定义样式
   */
  style?: CSSProperties;

  /** 
   * 自定义类名
   */
  className?: string;
}

/**
 * Affix组件内部状态接口
 */
export interface AffixState {
  /** 当前组件状态 */
  status: AffixStatus;

  /** 上一次的固定状态 */
  lastAffix: boolean;

  /** 上一次的目标元素 */
  prevTarget: HTMLElement | Window | null;

  /** 固定时的样式 */
  affixStyle?: AffixStyle;

  /** 占位符样式 */
  placeholderStyle?: PlaceholderStyle;
}

/**
 * 目标矩形信息接口
 * 描述DOM元素的位置和尺寸信息
 */
export interface TargetRect {
  /** 上边界距离视口顶部的距离 */
  top: number;
  /** 下边界距离视口顶部的距离 */
  bottom: number;
  /** 左边界距离视口左侧的距离 */
  left: number;
  /** 右边界距离视口左侧的距离 */
  right: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 工具函数：获取目标元素的矩形信息
 * @param target - 目标元素或窗口对象
 * @returns 矩形信息对象
 */
export function getTargetRect(target: HTMLElement | Window): TargetRect;

/**
 * 工具函数：计算固定在顶部时的位置
 * @param placeholderRect - 占位符元素的矩形信息
 * @param targetRect - 目标容器的矩形信息
 * @param offsetTop - 顶部偏移量
 * @returns 固定位置的top值,如果不应固定则返回undefined
 */
export function getFixedTop(
  placeholderRect: TargetRect,
  targetRect: TargetRect,
  offsetTop?: number
): number | undefined;

/**
 * 工具函数：计算固定在底部时的位置
 * @param placeholderRect - 占位符元素的矩形信息
 * @param targetRect - 目标容器的矩形信息
 * @param offsetBottom - 底部偏移量
 * @returns 固定位置的bottom值,如果不应固定则返回undefined
 */
export function getFixedBottom(
  placeholderRect: TargetRect,
  targetRect: TargetRect,
  offsetBottom?: number
): number | undefined;

/**
 * 工具函数：添加观察目标
 * 将目标元素添加到滚动监听列表
 * @param target - 目标元素
 * @param affix - Affix组件实例
 */
export function addObserveTarget(target: HTMLElement | Window, affix: Affix): void;

/**
 * 工具函数：移除观察目标
 * 从滚动监听列表中移除Affix组件
 * @param affix - Affix组件实例
 */
export function removeObserveTarget(affix: Affix): void;

/**
 * 装饰器：通过requestAnimationFrame节流函数调用
 * 用于优化高频率触发的函数(如滚动事件处理)
 */
export function throttleByAnimationFrameDecorator(): MethodDecorator;

/**
 * Affix 固定定位组件
 * 
 * @description
 * 将元素固定在视口的特定位置,常用于固定头部、侧边栏等
 * 支持固定在顶部或底部,并可自定义偏移量
 * 
 * @example
 *