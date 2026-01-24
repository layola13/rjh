/**
 * React Ref 工具函数集合
 * 提供 ref 的填充、组合、验证等实用功能
 */

import { Ref, RefObject, MutableRefObject, ReactElement, ForwardRefExoticComponent } from 'react';

/**
 * 填充 ref 值
 * 支持函数形式的 ref 和对象形式的 ref
 * @param ref - React ref 对象或回调函数
 * @param value - 要设置的值
 */
export function fillRef<T = any>(
  ref: Ref<T> | undefined | null,
  value: T
): void;

/**
 * 组合多个 ref 为一个
 * 当元素挂载时，会同时更新所有传入的 ref
 * @param refs - 要组合的 ref 列表
 * @returns 组合后的 ref 回调函数
 * @example
 * const combinedRef = composeRef(ref1, ref2, ref3);
 * <div ref={combinedRef} />
 */
export function composeRef<T = any>(
  ...refs: Array<Ref<T> | undefined | null>
): Ref<T>;

/**
 * Hook: 组合多个 ref 为一个（带缓存优化）
 * 使用 useMemo 优化性能，只在 ref 变化时重新创建组合函数
 * @param refs - 要组合的 ref 列表
 * @returns 组合后的 ref 回调函数
 * @example
 * const combinedRef = useComposeRef(ref1, ref2, ref3);
 * <div ref={combinedRef} />
 */
export function useComposeRef<T = any>(
  ...refs: Array<Ref<T> | undefined | null>
): Ref<T>;

/**
 * 检查组件是否支持 ref
 * 验证组件类型是否可以接受 ref 属性
 * @param element - React 元素或组件
 * @returns 如果支持 ref 返回 true，否则返回 false
 */
export function supportRef(
  element: ReactElement | React.ComponentType<any> | null | undefined
): boolean;

/**
 * 检查 React 元素是否支持 DOM 节点 ref
 * 同时验证是否为有效元素且支持 ref
 * @param element - React 元素
 * @returns 如果支持节点 ref 返回 true，否则返回 false
 */
export function supportNodeRef(
  element: ReactElement | null | undefined
): boolean;

/**
 * 从 React 元素中提取 ref
 * 兼容不同 React 版本的 ref 获取方式
 * @param element - React 元素
 * @returns 元素的 ref，如果不存在则返回 null
 */
export function getNodeRef<T = any>(
  element: ReactElement | null | undefined
): Ref<T> | null;