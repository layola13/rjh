import { Component, ReactNode } from 'react';

/**
 * 透传组件属性接口
 * @description 定义组件接收的props类型
 */
interface PassthroughProps {
  /** 子元素节点 */
  children?: ReactNode;
}

/**
 * 透传组件类
 * @description 简单的包装组件，直接渲染children而不做任何处理
 * @example
 *