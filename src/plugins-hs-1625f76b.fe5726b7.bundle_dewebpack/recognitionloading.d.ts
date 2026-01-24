/**
 * ReCognition Loading Component
 * 图片识别加载组件，显示进度条和取消按钮
 */

import React from 'react';

/**
 * ReCognitionLoading 组件的属性接口
 */
export interface ReCognitionLoadingProps {
  /**
   * 取消按钮点击回调函数
   * 当用户点击取消按钮时触发
   */
  onCancel: () => void;
}

/**
 * 图片识别加载组件
 * 
 * 功能说明：
 * - 自动显示进度条动画（0-99%）
 * - 进度条以约 1.43%/秒 的速度增长（100/7秒达到99%）
 * - 显示等待提示文本
 * - 提供取消操作按钮
 * 
 * @param props - 组件属性
 * @returns React 函数组件
 * 
 * @example
 *