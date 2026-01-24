/**
 * React Observer 组件模块
 * 用于监听和观察 DOM 元素的变化
 * 
 * @module ResizeObserver
 */

import * as React from 'react';

/**
 * 子元素渲染函数类型
 */
type ChildrenRenderFunction = () => React.ReactNode;

/**
 * Observer 组件的属性接口
 */
export interface ObserverProps {
  /**
   * 子元素,可以是 React 节点或渲染函数
   */
  children: React.ReactNode | ChildrenRenderFunction | Array<React.ReactNode | ChildrenRenderFunction>;
  
  /**
   * 其他可选属性(从实际 Observer 组件继承)
   */
  [key: string]: unknown;
}

/**
 * Collection 组件类型
 * 用于批量观察多个元素
 */
export interface CollectionComponent extends React.FC<ObserverProps> {
  displayName?: string;
}

/**
 * Observer 组件类型定义
 * 支持 forwardRef 和 Collection 静态属性
 */
export interface ObserverComponent extends React.ForwardRefExoticComponent<ObserverProps & React.RefAttributes<unknown>> {
  /**
   * Collection 静态组件
   * 用于观察一组元素的集合
   */
  Collection: CollectionComponent;
}

/**
 * 从其他模块导出的 _rs 对象
 * (具体用途需要查看源模块 21739)
 */
export const _rs: unknown;

/**
 * 默认导出的 Observer 组件
 * 
 * @remarks
 * - 使用 React.forwardRef 包装
 * - 自动为每个子元素生成唯一的 key
 * - 支持函数式子元素
 * - 只有第一个子元素会接收 ref
 * 
 * @example
 *