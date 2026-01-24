/**
 * 可拖拽的产品缩略图弹窗组件
 * 支持鼠标拖拽移动和滚轮缩放功能
 */

import React from 'react';

/**
 * 产品缩略图弹窗组件的属性接口
 */
export interface ProductThumbnailPopupProps {
  /**
   * 图片源地址
   */
  imgSrc: string;
  
  /**
   * 关闭弹窗时的回调函数
   */
  onClose: () => void;
}

/**
 * 产品缩略图弹窗组件的状态接口
 */
export interface ProductThumbnailPopupState {
  /**
   * 弹窗是否可见
   */
  visible: boolean;
}

/**
 * 可拖拽的产品缩略图弹窗组件类
 * 
 * 功能特性：
 * - 支持鼠标拖拽移动弹窗
 * - 支持鼠标滚轮缩放图片
 * - 提供关闭按钮和确认按钮
 * 
 * @example
 *