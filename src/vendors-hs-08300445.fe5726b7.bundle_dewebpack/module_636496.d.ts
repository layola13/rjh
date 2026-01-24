/**
 * React-Redux 高阶组件连接函数
 * 用于将 React 组件连接到 Redux store
 */

import { Component, ComponentType, Context, ForwardRefExoticComponent } from 'react';
import { Store, Dispatch } from 'redux';
import { Subscription } from '../utils/Subscription';

/**
 * 连接配置选项
 */
export interface ConnectAdvancedOptions<TStateProps = unknown, TDispatchProps = unknown> {
  /**
   * 获取包装组件显示名称的函数
   * @param componentName - 原始组件名称
   * @returns 包装后的显示名称
   */
  getDisplayName?: (componentName: string) => string;

  /**
   * 方法名称，用于错误提示
   * @default "connectAdvanced"
   */
  methodName?: string;

  /**
   * 渲染计数属性名，用于调试
   */
  renderCountProp?: string;

  /**
   * 是否处理状态变化
   * @default true
   */
  shouldHandleStateChanges?: boolean;

  /**
   * Store 在 context 中的键名
   * @default "store"
   */
  storeKey?: string;

  /**
   * @deprecated 使用 forwardRef 替代
   */
  withRef?: boolean;

  /**
   * 是否转发 ref 到被包装组件
   * @default false
   */
  forwardRef?: boolean;

  /**
   * 自定义 React Context
   * @default ReactReduxContext
   */
  context?: Context<ReactReduxContextValue>;

  /**
   * 是否使用纯组件优化（React.memo）
   * @default true
   */
  pure?: boolean;
}

/**
 * React-Redux Context 值类型
 */
export interface ReactReduxContextValue<TState = unknown> {
  /** Redux store 实例 */
  store: Store<TState>;
  /** 订阅管理器 */
  subscription: Subscription | null;
}

/**
 * Selector 工厂函数类型
 * @template TState - Redux state 类型
 * @template TOwnProps - 组件自身属性类型
 * @template TFactoryResult - 工厂函数返回的 props 类型
 */
export type SelectorFactory<TState, TOwnProps, TFactoryResult> = (
  dispatch: Dispatch,
  options: ConnectAdvancedOptions
) => (state: TState, ownProps: TOwnProps) => TFactoryResult;

/**
 * 内部包装组件的 props 类型
 */
interface WrapperProps<TOwnProps = unknown> {
  /** Redux store（可选，通常从 context 获取） */
  store?: Store;
  /** 自定义 context */
  context?: Context<ReactReduxContextValue>;
  /** 转发的 ref */
  reactReduxForwardedRef?: React.Ref<unknown>;
  /** 组件自身的 props */
  [key: string]: unknown;
}

/**
 * Reducer 状态类型
 */
interface ReducerState<TError = Error> {
  /** 错误信息 */
  error?: TError;
  [key: string]: unknown;
}

/**
 * Reducer Action 类型
 */
interface ReducerAction<TPayload = unknown> {
  type: 'STORE_UPDATED';
  payload: TPayload;
}

/**
 * 高级连接函数
 * 
 * 创建一个高阶组件，将 React 组件连接到 Redux store。
 * 这是 connect() 的底层实现。
 * 
 * @template TState - Redux state 类型
 * @template TOwnProps - 组件自身属性类型
 * @template TStateProps - 从 state 映射的属性类型
 * @template TDispatchProps - 从 dispatch 映射的属性类型
 * 
 * @param selectorFactory - 创建 selector 的工厂函数
 * @param options - 连接配置选项
 * @returns 高阶组件函数
 * 
 * @example
 *