/**
 * 图片预览组件模块
 * 提供图片预览功能的默认图标和预览组组件
 * @module ImagePreview
 */

import type { ReactElement, ComponentType } from 'react';
import type { ConfigConsumerProps } from 'antd/lib/config-provider';

/**
 * 预览操作图标集合
 * 包含图片预览时所需的所有控制图标
 */
export interface PreviewIcons {
  /** 向左旋转图标 */
  rotateLeft: ReactElement;
  /** 向右旋转图标 */
  rotateRight: ReactElement;
  /** 放大图标 */
  zoomIn: ReactElement;
  /** 缩小图标 */
  zoomOut: ReactElement;
  /** 关闭图标 */
  close: ReactElement;
  /** 上一张图标 */
  left: ReactElement;
  /** 下一张图标 */
  right: ReactElement;
}

/**
 * 预览组件的配置属性
 */
export interface PreviewGroupProps {
  /** 预览组件的类名前缀，用于自定义样式 */
  previewPrefixCls?: string;
  /** 自定义预览操作图标集合 */
  icons?: Partial<PreviewIcons>;
  /** 预览的图片列表 */
  items?: Array<{
    src: string;
    alt?: string;
    [key: string]: unknown;
  }>;
  /** 当前预览图片的索引 */
  current?: number;
  /** 是否显示预览 */
  visible?: boolean;
  /** 关闭预览的回调函数 */
  onVisibleChange?: (visible: boolean, prevVisible: boolean) => void;
  /** 切换图片的回调函数 */
  onChange?: (current: number, prevCurrent: number) => void;
  /** 图片加载失败时的回调 */
  onError?: () => void;
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * 图片预览组件的默认图标集合
 * 包含所有预览操作所需的图标元素
 * @constant
 */
export const icons: PreviewIcons;

/**
 * 图片预览组组件
 * 用于展示一组图片的预览功能，支持旋转、缩放、切换等操作
 * 
 * @param props - 预览组件的配置属性
 * @returns React组件元素
 * 
 * @example
 *