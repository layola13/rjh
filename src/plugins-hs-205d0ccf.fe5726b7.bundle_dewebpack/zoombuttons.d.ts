/**
 * ZoomButtons 组件的类型定义
 * 用于渲染缩放控制按钮，包括放大、缩小和恢复默认尺寸功能
 * @module ZoomButtons
 */

import { FC } from 'react';

/**
 * ZoomButtons 组件的属性接口
 */
export interface ZoomButtonsProps {
  /**
   * 当前缩放比例
   * @example 1.0 表示100%，1.5表示150%
   */
  currentScale: number;

  /**
   * 最小缩放比例限制
   * @example 0.1 表示最小可缩放到10%
   */
  minScale: number;

  /**
   * 最大缩放比例限制
   * @example 5.0 表示最大可缩放到500%
   */
  maxScale: number;

  /**
   * 点击放大按钮时的回调函数
   */
  onZoomInClick: () => void;

  /**
   * 点击缩小按钮时的回调函数
   */
  onZoomOutClick: () => void;

  /**
   * 缩放到指定比例的回调函数
   * @param scale - 目标缩放比例
   */
  onScaleTo: (scale: number) => void;

  /**
   * 点击恢复默认尺寸按钮时的回调函数
   */
  onRestoreClick: () => void;

  /**
   * 缩放比例的倍率系数
   * @description 用于调整显示百分比的计算方式
   * @example 1.0 表示按原始比例显示，2.0表示按2倍比例计算显示百分比
   */
  scaleRadio: number;
}

/**
 * 缩放按钮组件
 * @description 提供模型/图片查看器的缩放控制界面，包含缩小、放大和恢复默认尺寸三个功能
 * @param props - 组件属性
 * @returns React 函数组件
 * 
 * @example
 *