/**
 * React元素克隆和替换工具函数
 * 提供对React元素的验证、克隆和替换功能
 */

import type { ReactElement, ReactNode } from 'react';

/**
 * React元素属性类型
 */
export type ElementProps = Record<string, any>;

/**
 * 属性转换函数类型
 * @param props - 原始元素的属性对象
 * @returns 新的属性对象
 */
export type PropsTransformer = (props: ElementProps) => ElementProps;

/**
 * 验证是否为有效的React元素
 * 从React库重新导出
 */
export const isValidElement: (value: any) => value is ReactElement;

/**
 * 克隆React元素并应用新属性
 * @param element - 要克隆的React元素
 * @param props - 新属性对象或属性转换函数
 * @returns 克隆后的React元素
 */
export function cloneElement<P = ElementProps>(
  element: ReactElement<P>,
  props: Partial<P> | PropsTransformer
): ReactElement<P>;

/**
 * 替换React元素或返回后备元素
 * @param element - 要替换的React元素
 * @param fallback - 当element无效时返回的后备元素
 * @param props - 新属性对象或属性转换函数
 * @returns 替换后的React元素或后备元素
 */
export function replaceElement<P = ElementProps>(
  element: ReactNode,
  fallback: ReactNode,
  props?: Partial<P> | PropsTransformer
): ReactNode;