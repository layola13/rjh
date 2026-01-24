/**
 * Portal组件类型定义
 * 用于将子组件渲染到DOM树中的指定容器节点
 * @module PortalComponent
 */

import { ReactNode, RefObject } from 'react';

/**
 * Portal组件的属性接口
 */
export interface PortalProps {
  /**
   * 当组件更新时触发的回调函数
   * @param props - 当前组件的属性对象
   */
  didUpdate?: (props: PortalProps) => void;

  /**
   * 获取目标容器DOM节点的函数
   * @returns 用于挂载子组件的HTML元素
   */
  getContainer: () => HTMLElement;

  /**
   * 需要通过Portal渲染的子组件
   */
  children: ReactNode;
}

/**
 * Portal组件暴露的方法接口（通过ref访问）
 */
export interface PortalHandle {
  // 当前实现为空对象，预留扩展接口
}

/**
 * Portal组件
 * 
 * 使用React.createPortal将children渲染到getContainer返回的DOM节点中。
 * 支持以下特性：
 * - 在组件卸载时自动清理DOM节点
 * - 如果容器节点被移除，会尝试重新挂载到原父节点
 * - 通过forwardRef支持ref转发
 * 
 * @example
 *