import React from 'react';

/**
 * 大视图组件的数据属性接口
 */
export interface CeilingLargeViewData {
  /** 图片 URL */
  img: string;
  /** 标签文本 */
  label: string;
  /** 图标顶部位置（像素值或CSS值） */
  iconTop: number | string;
  /** 是否隐藏组件 */
  hide: boolean;
}

/**
 * CeilingLargeView 组件的 Props 接口
 */
export interface CeilingLargeViewProps {
  /** 组件数据 */
  data?: CeilingLargeViewData;
}

/**
 * CeilingLargeView 组件的 State 接口
 */
export interface CeilingLargeViewState {
  /** 图片 URL */
  img: string;
  /** 标签文本 */
  label: string;
  /** 图标顶部位置 */
  iconTop: number | string;
  /** 是否隐藏组件 */
  hide: boolean;
}

/**
 * 天花板大视图组件
 * 
 * 用于显示一个可悬停的大视图弹窗，包含图片和标签信息。
 * 当鼠标移出后会延迟1秒自动隐藏。
 * 
 * @example
 *