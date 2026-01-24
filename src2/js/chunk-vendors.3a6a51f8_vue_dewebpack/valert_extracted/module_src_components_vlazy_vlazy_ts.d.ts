import { VNode, VNodeData } from 'vue';
import { PropType } from 'vue';

/**
 * Intersection Observer 配置选项
 */
export interface IntersectionObserverOptions {
  /** 指定根元素，用于检查目标的可见性 */
  root?: Element | null;
  /** 根元素的外边距 */
  rootMargin?: string;
  /** 触发回调的可见比例阈值 */
  threshold?: number | number[];
}

/**
 * Intersect 指令的值配置
 */
export interface IntersectDirectiveValue {
  /** 交叉状态变化时的处理函数 */
  handler: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
    isIntersecting: boolean
  ) => void;
  /** Intersection Observer 配置选项 */
  options?: IntersectionObserverOptions;
}

/**
 * VLazy 组件的属性接口
 */
export interface VLazyProps {
  /** Intersection Observer 配置选项 */
  options?: IntersectionObserverOptions;
  /** 渲染的 HTML 标签名 */
  tag?: string;
  /** 过渡动画名称 */
  transition?: string;
  /** 最小高度 */
  minHeight?: string | number;
  /** 最小宽度 */
  minWidth?: string | number;
  /** 最大高度 */
  maxHeight?: string | number;
  /** 最大宽度 */
  maxWidth?: string | number;
  /** 高度 */
  height?: string | number;
  /** 宽度 */
  width?: string | number;
}

/**
 * VLazy 组件
 * 
 * 懒加载组件，使用 Intersection Observer API 实现内容的延迟渲染。
 * 当组件进入视口时才渲染其子内容，适用于性能优化场景。
 * 
 * @example
 *