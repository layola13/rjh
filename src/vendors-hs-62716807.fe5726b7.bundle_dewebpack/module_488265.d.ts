/**
 * Image 组件模块
 * 基于 rc-image 封装的 Ant Design Image 组件
 */

import React from 'react';

/**
 * 预览图标配置
 */
export interface PreviewIcons {
  /** 关闭图标 */
  close?: React.ReactNode;
  /** 放大图标 */
  zoomIn?: React.ReactNode;
  /** 缩小图标 */
  zoomOut?: React.ReactNode;
  /** 向左旋转图标 */
  rotateLeft?: React.ReactNode;
  /** 向右旋转图标 */
  rotateRight?: React.ReactNode;
  /** 翻转图标 */
  flipX?: React.ReactNode;
  /** 上下翻转图标 */
  flipY?: React.ReactNode;
}

/**
 * 图片预览配置
 */
export interface ImagePreviewType {
  /** 预览遮罩层内容 */
  mask?: React.ReactNode;
  /** 是否可见 */
  visible?: boolean;
  /** 图片地址(用于预览) */
  src?: string;
  /** 预览图标配置 */
  icons?: PreviewIcons;
  /** 关闭预览的回调 */
  onVisibleChange?: (visible: boolean, prevVisible: boolean) => void;
  /** 获取预览容器 */
  getContainer?: false | HTMLElement | (() => HTMLElement);
  /** 自定义预览底部额外节点 */
  toolbarRender?: (
    originalNode: React.ReactElement,
    info: {
      transform: {
        x: number;
        y: number;
        rotate: number;
        scale: number;
      };
      actions: {
        onFlipY: () => void;
        onFlipX: () => void;
        onRotateLeft: () => void;
        onRotateRight: () => void;
        onZoomOut: () => void;
        onZoomIn: () => void;
        onClose: () => void;
      };
    }
  ) => React.ReactNode;
  /** 图像描述 */
  imageRender?: (originalNode: React.ReactElement, info: { transform: { x: number; y: number; rotate: number; scale: number } }) => React.ReactNode;
  /** 自定义缩放倍数 */
  scaleStep?: number;
  /** 最小缩放倍数 */
  minScale?: number;
  /** 最大缩放倍数 */
  maxScale?: number;
  /** 关闭图标 */
  closeIcon?: React.ReactNode;
  /** 预览图切换回调 */
  onChange?: (current: number, prevCurrent: number) => void;
  /** 当前预览图片的索引 */
  current?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 遮罩层是否可关闭 */
  maskClosable?: boolean;
  /** 左右切换图片按钮 */
  showArrows?: boolean;
}

/**
 * 图片组件属性
 */
export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder' | 'onClick'> {
  /** 图片地址 */
  src?: string;
  /** 图片描述 */
  alt?: string;
  /** 加载失败容错地址 */
  fallback?: string;
  /** 加载占位, 为 true 时使用默认占位 */
  placeholder?: React.ReactNode | boolean;
  /** 预览配置，disabled 时禁用预览 */
  preview?: boolean | ImagePreviewType;
  /** 自定义类名前缀 */
  prefixCls?: string;
  /** 点击回调 */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** 图片加载完成回调 */
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  /** 图片加载错误回调 */
  onError?: React.ReactEventHandler<HTMLImageElement>;
  /** 图片宽度 */
  width?: string | number;
  /** 图片高度 */
  height?: string | number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 根元素自定义类名 */
  rootClassName?: string;
}

/**
 * 图片预览组属性
 */
export interface ImagePreviewGroupProps {
  /** 预览配置 */
  preview?: boolean | Omit<ImagePreviewType, 'src'>;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名前缀 */
  prefixCls?: string;
  /** 预览图切换回调 */
  onChange?: (current: number, prevCurrent: number) => void;
  /** 当前预览图片的索引 */
  current?: number;
  /** 要预览的图片列表 */
  items?: string[];
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 图片组件
 * 可预览的图片组件
 */
export interface ImageComponent extends React.FC<ImageProps> {
  /**
   * 图片预览组
   * 用于多图预览场景
   */
  PreviewGroup: React.FC<ImagePreviewGroupProps>;
}

/**
 * 图片组件默认导出
 */
declare const Image: ImageComponent;

export default Image;