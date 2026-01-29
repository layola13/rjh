/**
 * Guide 组件的类型定义文件
 * @module Guide
 */

import React from 'react';

/**
 * 媒体类型枚举
 */
export type MediaType = 'image' | 'video' | 'gif';

/**
 * 弹窗位置枚举
 */
export type PopupPlacement = 
  | 'top' 
  | 'bottom' 
  | 'left' 
  | 'right' 
  | 'top-start' 
  | 'top-end' 
  | 'bottom-start' 
  | 'bottom-end';

/**
 * 引导提示类型
 */
export type TipType = 'popup' | 'tooltip' | 'highlight';

/**
 * 目标元素差异偏移配置
 */
export interface TargetDiff {
  /** 左侧偏移量（像素） */
  left: number;
  /** 顶部偏移量（像素） */
  top: number;
  /** 右侧偏移量（像素） */
  right: number;
  /** 底部偏移量（像素） */
  bottom: number;
}

/**
 * 弹窗信息配置
 */
export interface PopupInfo {
  /** 媒体类型 */
  mediaType: MediaType;
  /** 媒体资源地址 */
  src: string;
  /** 弹窗标题 */
  title: string;
  /** 弹窗描述文本 */
  desc: string;
  /** "了解更多"链接地址 */
  moreUrl?: string;
}

/**
 * 引导提示配置
 */
export interface Tip {
  /** 目标元素（CSS选择器或DOM元素） */
  target: string | HTMLElement;
  /** 提示类型，默认为 'popup' */
  type?: TipType;
  /** 弹窗位置 */
  popupPlacement?: PopupPlacement;
  /** 弹窗信息配置（当 type 为 'popup' 时必填） */
  popupInfo?: PopupInfo;
  /** 目标元素位置差异偏移 */
  targetDiff?: TargetDiff;
  /** 是否监听目标元素变化（尺寸/位置） */
  listenTargetChange?: boolean;
}

/**
 * 元素位置矩形信息
 */
export interface Rect {
  /** 距离视口左侧距离（像素） */
  left: number;
  /** 距离视口顶部距离（像素） */
  top: number;
  /** 元素宽度（像素） */
  width: number;
  /** 元素高度（像素） */
  height: number;
}

/**
 * Guide 组件属性
 */
export interface GuideProps {
  /** 引导提示配置 */
  tip: Tip;
  /** 当前步骤编号（从1开始） */
  stepNumber: number;
  /** 总步骤数 */
  stepTotal: number;
  /** 跳过所有步骤的回调函数 */
  onSkipAll: () => void;
  /** 下一步回调函数 */
  onNext: () => void;
  /** 完成引导回调函数 */
  onFinish: () => void;
  /** 点击"了解更多"回调函数 */
  onLearnMore?: () => void;
}

/**
 * Guide 引导组件
 * 
 * 用于创建用户引导流程，支持高亮目标元素并显示提示信息。
 * 支持监听目标元素尺寸变化和窗口大小变化，自动调整提示位置。
 * 
 * @example
 *