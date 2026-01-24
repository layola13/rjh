/**
 * Avatar 组件类型定义
 * 用于显示用户头像，支持图片、图标、字符等多种形态
 */

import * as React from 'react';

/**
 * 响应式尺寸配置
 * 可根据屏幕断点设置不同的头像尺寸
 */
export interface AvatarSize {
  /** 超小屏幕 (<576px) */
  xs?: number;
  /** 小屏幕 (≥576px) */
  sm?: number;
  /** 中等屏幕 (≥768px) */
  md?: number;
  /** 大屏幕 (≥992px) */
  lg?: number;
  /** 超大屏幕 (≥1200px) */
  xl?: number;
  /** 超超大屏幕 (≥1600px) */
  xxl?: number;
}

/**
 * Avatar 组件属性
 */
export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onError'> {
  /** 自定义类名前缀 */
  prefixCls?: string;

  /** 头像形状 */
  shape?: 'circle' | 'square';

  /** 
   * 头像尺寸
   * @default 'default'
   */
  size?: 'large' | 'small' | 'default' | number | AvatarSize;

  /** 图片类头像的资源地址 */
  src?: string;

  /** 图片类头像的 srcSet 属性 */
  srcSet?: string;

  /** 图标类头像的图标元素 */
  icon?: React.ReactNode;

  /** 自定义类名 */
  className?: string;

  /** 图像无法显示时的替代文本 */
  alt?: string;

  /** 图片是否允许拖动 */
  draggable?: boolean;

  /** 
   * 字符类型距离左右两侧边界的像素距离
   * @default 4
   */
  gap?: number;

  /** 
   * 图片加载失败的事件处理函数
   * @returns 返回 false 会阻止组件默认的 fallback 行为
   */
  onError?: () => boolean | void;

  /** 字符类型的头像内容 */
  children?: React.ReactNode;

  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * Avatar 头像组件
 * 
 * @example
 *