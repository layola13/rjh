/**
 * Redux Store Configuration Module
 * 
 * 该模块创建并导出一个配置好的 Redux store 实例。
 * Store 使用了 Redux middleware 来增强功能。
 * 
 * @module ReduxStoreConfig
 */

import type { Store, Middleware, AnyAction } from 'redux';

/**
 * Redux store 中间件类型
 * 从模块 439118 导入
 */
declare const middleware: Middleware;

/**
 * 根 reducer 类型
 * 从模块 785300 导入，定义了应用的状态结构
 */
declare const rootReducer: import('redux').Reducer<unknown, AnyAction>;

/**
 * 配置好的 Redux store 实例
 * 
 * 该 store 实例通过以下方式创建：
 * - 使用根 reducer 管理状态
 * - 应用了中间件来处理异步操作和副作用
 * - 可选的预加载状态（初始状态）
 * 
 * @example
 *