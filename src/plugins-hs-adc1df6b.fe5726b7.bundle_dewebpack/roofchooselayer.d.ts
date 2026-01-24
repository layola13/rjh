/**
 * 屋顶图层选择对话框组件
 * @module RoofChooseLayer
 */

import React from 'react';

/**
 * 屋顶图层选择组件的属性接口
 */
export interface RoofChooseLayerProps {
  /**
   * 关闭对话框时的回调函数
   */
  onClose: () => void;

  /**
   * 确认选择并进入编辑时的回调函数
   * @param selectedLayer - 用户选中的图层编号
   */
  onEnter: (selectedLayer: number) => void;

  /**
   * 是否使用黑色主题
   * @default false
   */
  blackTheme?: boolean;

  /**
   * 可选的图层列表（图层编号数组）
   * @example [1, 2, 3, 4, 5]
   */
  layers: number[];

  /**
   * 当前选中的图层编号
   */
  selectedLayer: number;
}

/**
 * 屋顶图层选择对话框组件
 * 
 * 用于在手动绘制屋顶前选择目标楼层
 * 
 * @param props - 组件属性
 * @returns React函数组件
 * 
 * @example
 *