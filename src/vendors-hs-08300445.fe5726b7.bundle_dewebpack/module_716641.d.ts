/**
 * CSSTransitionGroupChild - 处理CSS过渡动画的React组件
 * 
 * 该组件用于在组件挂载(appear)、进入(enter)和离开(leave)时应用CSS过渡动画。
 * 它通过动态添加/移除CSS类名来触发CSS transition或animation。
 * 
 * @module CSSTransitionGroupChild
 */

import { ReactNode, ReactElement, Component } from 'react';

/**
 * 名称形状 - 定义过渡状态的CSS类名
 */
export interface NameShape {
  /** 初次出现时的基础类名 */
  appear?: string;
  /** 初次出现激活状态的类名 */
  appearActive?: string;
  /** 进入时的基础类名 */
  enter?: string;
  /** 进入激活状态的类名 */
  enterActive?: string;
  /** 离开时的基础类名 */
  leave?: string;
  /** 离开激活状态的类名 */
  leaveActive?: string;
}

/**
 * CSSTransitionGroupChild 组件的属性
 */
export interface CSSTransitionGroupChildProps {
  /** 
   * 过渡动画的名称，可以是字符串或包含各状态类名的对象
   * - 字符串时：自动生成 `${name}-appear`, `${name}-enter` 等类名
   * - 对象时：自定义每个状态的类名
   */
  name: string | NameShape;
  
  /** 
   * 是否在组件首次挂载时执行appear过渡
   * @default false
   */
  appear?: boolean;
  
  /** 
   * 是否在组件进入时执行enter过渡
   * @default true
   */
  enter?: boolean;
  
  /** 
   * 是否在组件离开时执行leave过渡
   * @default true
   */
  leave?: boolean;
  
  /** 
   * appear过渡的超时时间(毫秒)
   * 超时后强制完成过渡，避免动画卡住
   */
  appearTimeout?: number;
  
  /** 
   * enter过渡的超时时间(毫秒)
   */
  enterTimeout?: number;
  
  /** 
   * leave过渡的超时时间(毫秒)
   */
  leaveTimeout?: number;
  
  /** 
   * 子元素，必须是单个React元素
   */
  children: ReactElement;
}

/**
 * 类名和DOM节点的队列项
 * 用于批量更新DOM类名
 */
interface ClassNameAndNodeQueueItem {
  /** 要添加的CSS类名 */
  className: string;
  /** 目标DOM节点 */
  node: Element;
}

/**
 * 过渡状态类型
 */
type TransitionType = 'appear' | 'enter' | 'leave';

/**
 * CSSTransitionGroupChild 组件
 * 
 * 用于React过渡组的子组件，管理CSS过渡动画的生命周期。
 * 通过在不同阶段添加/移除CSS类来触发浏览器的transition或animation。
 * 
 * @example
 *