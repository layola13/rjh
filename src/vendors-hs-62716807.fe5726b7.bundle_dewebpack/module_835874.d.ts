/**
 * 状态管理存储库模块
 * 提供创建Redux风格的状态存储和模型绑定功能
 */

import type { Context, ComponentType, ReactElement } from 'react';
import type { Middleware, Store } from 'redux';

/**
 * 模型定义接口
 * 描述状态模型的结构,包括状态、reducers和effects
 */
export interface Model<TState = any> {
  /** 模型命名空间 */
  name?: string;
  /** 初始状态 */
  state?: TState;
  /** 同步状态更新函数 */
  reducers?: Record<string, (state: TState, payload: any) => TState>;
  /** 异步副作用函数 */
  effects?: Record<string, (payload: any, rootState: any) => Promise<any> | void>;
}

/**
 * 插件配置接口
 */
export interface Plugin {
  /** 插件名称 */
  name?: string;
  /** 插件初始化钩子 */
  onInit?: (store: Store) => void;
  /** 模型注册钩子 */
  onModel?: (model: Model) => void;
  /** 中间件 */
  middleware?: Middleware;
}

/**
 * Redux配置选项
 */
export interface ReduxConfig {
  /** Redux中间件数组 */
  middlewares?: Middleware[];
  /** Redux DevTools配置 */
  devtoolOptions?: any;
  /** Redux增强器 */
  enhancers?: any[];
  /** 根Reducer */
  rootReducers?: Record<string, any>;
  /** 组合Reducers配置 */
  combineReducers?: any;
  /** 创建Reducer函数 */
  createReducer?: any;
}

/**
 * 创建存储的配置选项
 */
export interface CreateStoreConfig {
  /** 是否禁用Immer不可变数据处理 (默认false) */
  disableImmer?: boolean;
  /** 是否禁用自动loading状态管理 (默认false) */
  disableLoading?: boolean;
  /** 是否禁用自动error状态管理 (默认false) */
  disableError?: boolean;
  /** 自定义插件数组 */
  plugins?: Plugin[];
  /** Redux相关配置 */
  redux?: ReduxConfig;
}

/**
 * 存储实例接口
 * 提供状态管理的核心API
 */
export interface StoreInstance {
  /** Redux Store实例 */
  store: Store;
  /** React Context实例 */
  context: Context<any>;
  /** Provider组件 */
  Provider: ComponentType<{ children: ReactElement }>;
  /** 获取指定模型的API */
  getModelAPIs: <TModel extends string>(modelName: TModel) => ModelAPIs<TModel>;
  /** 动态注册模型 */
  model: (model: Model) => void;
  /** 分发action */
  dispatch: Store['dispatch'];
  /** 获取当前状态 */
  getState: Store['getState'];
  /** 订阅状态变化 */
  subscribe: Store['subscribe'];
}

/**
 * 模型API接口
 * 提供对特定模型的类型安全访问
 */
export interface ModelAPIs<TModelName extends string> {
  /** 模型状态 */
  [key: string]: any;
  /** dispatch函数 */
  dispatch: Store['dispatch'];
}

/**
 * HOC包装后的组件Props映射函数类型
 */
export type MapModelToProps<TModel extends string, TProps = {}> = 
  (modelAPIs: ModelAPIs<TModel>) => TProps;

/**
 * 创建状态管理存储
 * 
 * @param models - 模型定义对象,key为模型名称,value为模型配置
 * @param config - 存储配置选项
 * @returns 存储实例,包含Provider、dispatch等核心API
 * 
 * @example
 *