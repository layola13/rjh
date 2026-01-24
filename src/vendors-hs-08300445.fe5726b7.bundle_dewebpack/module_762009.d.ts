/**
 * React组件：简单的容器包装器
 * 用于包裹子元素并应用自定义样式类
 */

import React, { ReactNode } from 'react';

/**
 * 容器组件的属性接口
 */
export interface ContainerProps {
  /**
   * CSS类名，用于自定义样式
   */
  className?: string;

  /**
   * 子元素内容
   */
  children?: ReactNode;
}

/**
 * 默认导出的容器组件
 * 
 * @param props - 组件属性
 * @param props.className - 应用到容器的CSS类名
 * @param props.children - 要渲染的子元素
 * @returns 包含子元素的div容器
 * 
 * @example
 *