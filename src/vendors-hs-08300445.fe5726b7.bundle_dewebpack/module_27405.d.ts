/**
 * 图片预览组上下文类型定义
 */

/**
 * 鼠标位置坐标
 */
export interface MousePosition {
  x: number;
  y: number;
}

/**
 * 预览图标配置
 */
export interface PreviewIcons {
  rotateLeft?: React.ReactNode;
  rotateRight?: React.ReactNode;
  zoomIn?: React.ReactNode;
  zoomOut?: React.ReactNode;
  close?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

/**
 * 图片注册函数返回的清理函数
 */
export type UnregisterImage = () => void;

/**
 * 图片预览上下文接口
 */
export interface ImagePreviewContextValue {
  /** 是否为预览组模式 */
  isPreviewGroup?: boolean;
  /** 预览图片URL映射表，键为图片唯一ID */
  previewUrls: Map<number, string>;
  /** 设置预览URL映射 */
  setPreviewUrls: (urls: Map<number, string> | ((prev: Map<number, string>) => Map<number, string>)) => void;
  /** 当前显示的图片ID */
  current: number | null;
  /** 设置当前显示的图片 */
  setCurrent: (id: number | undefined) => void;
  /** 设置是否显示预览 */
  setShowPreview: (show: boolean) => void;
  /** 设置鼠标位置（用于打开动画） */
  setMousePosition: (position: MousePosition | null) => void;
  /** 注册图片到预览组 */
  registerImage: ((id: number, url: string) => UnregisterImage) | null;
}

/**
 * 图片预览组组件属性
 */
export interface ImagePreviewGroupProps {
  /** 预览组件的CSS类名前缀 */
  previewPrefixCls?: string;
  /** 子组件 */
  children?: React.ReactNode;
  /** 预览工具栏图标配置 */
  icons?: PreviewIcons;
}

/**
 * 图片预览上下文
 */
export const context: React.Context<ImagePreviewContextValue>;

/**
 * 图片预览组组件
 * 用于管理多个图片的预览功能，提供统一的预览弹窗和切换能力
 * 
 * @param props - 组件属性
 * @returns React组件
 * 
 * @example
 *