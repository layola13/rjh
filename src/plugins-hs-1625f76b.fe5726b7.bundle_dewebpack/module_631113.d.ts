import { List } from 'immutable';
import { Action } from 'redux-actions';

/**
 * 产品数据的Payload类型
 * 表示收集产品成功时的载荷数据
 */
export interface ProductsPayload {
  [key: string]: unknown;
}

/**
 * Redux Action类型
 * 当产品收集操作成功时触发
 */
export interface CollectProductsSucceededAction extends Action<ProductsPayload> {
  type: string;
  payload: ProductsPayload;
}

/**
 * 产品列表的状态类型
 * 使用Immutable.js的List来管理产品数据
 */
export type ProductsState = List<unknown>;

/**
 * 产品Reducer
 * 
 * 处理产品收集相关的状态更新
 * 
 * @remarks
 * 这个reducer使用redux-actions的handleActions创建，
 * 监听COLLECT_PRODUCTS_SUCCEEDED动作，
 * 将payload转换为不可变的List并更新状态
 * 
 * @default 初始状态为空的Immutable List
 */
declare const productsReducer: import('redux').Reducer<ProductsState, CollectProductsSucceededAction>;

export default productsReducer;