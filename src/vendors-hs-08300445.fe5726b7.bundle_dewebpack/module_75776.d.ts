/**
 * TransitionGroup 组件类型定义
 * 用于管理子组件的进入、离开和出现动画过渡效果
 */

import * as React from 'react';

/**
 * 子组件映射类型
 * 键为字符串（通常是 React key），值为 React 元素
 */
export interface ChildMapping {
  [key: string]: React.ReactElement | null | undefined;
}

/**
 * 过渡生命周期回调函数类型
 * @param callback - 动画完成后的回调函数
 */
export type TransitionCallback = (callback: () => void) => void;

/**
 * 具有过渡生命周期方法的组件接口
 */
export interface TransitionComponent {
  /**
   * 组件即将出现时调用
   * @param callback - 出现动画完成后需要调用的回调
   */
  componentWillAppear?: TransitionCallback;
  
  /**
   * 组件完成出现动画后调用
   */
  componentDidAppear?: () => void;
  
  /**
   * 组件即将进入时调用
   * @param callback - 进入动画完成后需要调用的回调
   */
  componentWillEnter?: TransitionCallback;
  
  /**
   * 组件完成进入动画后调用
   */
  componentDidEnter?: () => void;
  
  /**
   * 组件即将离开时调用
   * @param callback - 离开动画完成后需要调用的回调
   */
  componentWillLeave?: TransitionCallback;
  
  /**
   * 组件完成离开动画后调用
   */
  componentDidLeave?: () => void;
}

/**
 * TransitionGroup 组件的属性接口
 */
export interface TransitionGroupProps {
  /**
   * 子元素（React 节点）
   */
  children?: React.ReactNode;
  
  /**
   * 容器组件类型，默认为 'span'
   * @default 'span'
   */
  component?: React.ElementType;
  
  /**
   * 子元素工厂函数，用于在渲染前转换子元素
   * @param child - 原始子元素
   * @returns 转换后的子元素
   * @default (child) => child
   */
  childFactory?: (child: React.ReactElement) => React.ReactElement;
  
  /**
   * 是否启用过渡离开动画
   */
  transitionLeave?: boolean;
  
  /**
   * 过渡名称（用于 CSS 类名）
   */
  transitionName?: string | {
    enter?: string;
    leave?: string;
    appear?: string;
  };
  
  /**
   * 是否启用首次挂载时的出现动画
   */
  transitionAppear?: boolean;
  
  /**
   * 是否启用进入动画
   */
  transitionEnter?: boolean;
  
  /**
   * 离开动画超时时间（毫秒）
   */
  transitionLeaveTimeout?: number;
  
  /**
   * 进入动画超时时间（毫秒）
   */
  transitionEnterTimeout?: number;
  
  /**
   * 出现动画超时时间（毫秒）
   */
  transitionAppearTimeout?: number;
}

/**
 * TransitionGroup 组件的状态接口
 */
export interface TransitionGroupState {
  /**
   * 当前子元素映射
   */
  children: ChildMapping;
}

/**
 * TransitionGroup 组件类
 * 管理一组子组件的动画过渡效果，包括进入、离开和首次出现
 */
export default class TransitionGroup extends React.Component<TransitionGroupProps, TransitionGroupState> {
  /**
   * 组件显示名称
   */
  static displayName: string;
  
  /**
   * 默认属性
   */
  static defaultProps: Partial<TransitionGroupProps>;
  
  /**
   * 属性类型验证
   */
  static propTypes: Record<string, unknown>;
  
  /**
   * 子组件引用集合
   */
  childRefs: Record<string, TransitionComponent | null>;
  
  /**
   * 当前正在执行过渡的键集合
   */
  currentlyTransitioningKeys: Record<string, boolean>;
  
  /**
   * 等待进入的键队列
   */
  keysToEnter: string[];
  
  /**
   * 等待离开的键队列
   */
  keysToLeave: string[];
  
  /**
   * 执行出现动画
   * @param key - 子元素的键
   * @param component - 子组件实例
   */
  performAppear(key: string, component: TransitionComponent): void;
  
  /**
   * 处理出现动画完成
   * @param key - 子元素的键
   * @param component - 子组件实例
   */
  _handleDoneAppearing(key: string, component: TransitionComponent): void;
  
  /**
   * 执行进入动画
   * @param key - 子元素的键
   * @param component - 子组件实例
   */
  performEnter(key: string, component: TransitionComponent): void;
  
  /**
   * 处理进入动画完成
   * @param key - 子元素的键
   * @param component - 子组件实例
   */
  _handleDoneEntering(key: string, component: TransitionComponent): void;
  
  /**
   * 执行离开动画
   * @param key - 子元素的键
   * @param component - 子组件实例
   */
  performLeave(key: string, component: TransitionComponent): void;
  
  /**
   * 处理离开动画完成
   * @param key - 子元素的键
   * @param component - 子组件实例
   */
  _handleDoneLeaving(key: string, component: TransitionComponent): void;
}