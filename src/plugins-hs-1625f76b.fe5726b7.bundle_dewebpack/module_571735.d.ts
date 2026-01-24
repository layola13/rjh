/**
 * 页面尺寸调整 Action Creator
 * 用于在页面大小变化时分发 Redux action
 */

import { Dispatch } from 'redux';
import { ActionCreator } from './types/action-creator';
import { ActionTypes } from './constants/action-types';
import { getPageSize } from './utils/page-utils';

/**
 * 页面尺寸数据接口
 */
interface PageSizePayload {
  /** 当前页面尺寸 */
  pageSize: PageSize;
}

/**
 * 页面尺寸类型定义
 */
interface PageSize {
  width: number;
  height: number;
}

/**
 * 调整页面长度的 Action 接口
 */
interface ResizePageLengthAction {
  type: typeof ActionTypes.RESIZE_PAGE_LENGTH;
  payload: PageSizePayload;
}

/**
 * Redux Action 分发函数类型
 */
type AppDispatch = Dispatch<ResizePageLengthAction>;

/**
 * 创建调整页面尺寸的 action
 */
declare const createResizePageLengthAction: ActionCreator<
  PageSizePayload,
  ResizePageLengthAction
>;

/**
 * 页面尺寸调整的 thunk action creator
 * 
 * @returns 返回一个 thunk 函数，用于获取当前页面尺寸并分发相应的 action
 * 
 * @example
 *