/**
 * 阻止事件冒泡的容器组件
 * 
 * 该组件创建一个div容器，会阻止点击事件向上冒泡，
 * 常用于模态框、下拉菜单等需要隔离事件的场景。
 */

import type { ReactElement, ReactNode, MouseEvent } from 'react';

/**
 * StopPropagationContainer 组件的属性接口
 */
export interface StopPropagationContainerProps {
  /**
   * 应用到容器的CSS类名
   */
  className?: string;

  /**
   * 容器内的子元素
   */
  children?: ReactNode;
}

/**
 * 阻止事件冒泡容器组件
 * 
 * @param props - 组件属性
 * @returns 包裹子元素的div容器，会阻止点击事件冒泡
 * 
 * @example
 *