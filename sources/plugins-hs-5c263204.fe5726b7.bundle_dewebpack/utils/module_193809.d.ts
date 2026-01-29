/**
 * GuideLoading 组件 - 显示引导加载动画
 * Module ID: 193809
 */

import React from 'react';

/**
 * GuideLoading 组件的属性接口
 */
export interface GuideLoadingProps {
  /**
   * 是否显示引导加载动画
   * @default false
   */
  showGuideLoading: boolean;
}

/**
 * GuideLoading 组件的状态接口
 */
export interface GuideLoadingState {
  /**
   * 是否显示引导加载动画
   */
  showGuideLoading: boolean;
}

/**
 * GuideLoading 组件类
 * 
 * 用于显示或隐藏引导加载动画的 React 组件。
 * 当 showGuideLoading 为 true 时，显示加载动画；否则隐藏。
 * 
 * @example
 *