/**
 * React组件类型定义
 * 用于透传子组件的包装器组件
 */

import { Component, ReactNode } from 'react';

/**
 * 组件属性接口
 */
export interface PassThroughComponentProps {
  /** 子组件内容 */
  children?: ReactNode;
}

/**
 * 透传组件类
 * 该组件不做任何处理，直接渲染传入的子组件
 * 
 * @example
 *