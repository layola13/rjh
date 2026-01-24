import type { CSSProperties, ForwardRefExoticComponent, RefAttributes } from 'react';
import type Cropper from 'cropperjs';

/**
 * 裁剪器拖拽模式
 * - 'crop': 创建新的裁剪框
 * - 'move': 移动画布
 * - 'none': 无操作
 */
export type DragMode = 'crop' | 'move' | 'none';

/**
 * 视图模式
 * - 0: 无限制
 * - 1: 限制裁剪框不超出画布
 * - 2: 限制画布填充容器
 * - 3: 限制画布不超出容器
 */
export type ViewMode = 0 | 1 | 2 | 3;

/**
 * Cropper 就绪事件参数
 */
export interface CropperReadyEvent {
  /** 事件目标元素 */
  currentTarget: HTMLImageElement & { cropper: Cropper };
}

/**
 * Cropper 组件配置选项
 */
export interface CropperOptions {
  /** 视图模式 */
  viewMode?: ViewMode;
  /** 拖拽模式，默认 'crop' */
  dragMode?: DragMode;
  /** 初始宽高比 */
  initialAspectRatio?: number;
  /** 固定宽高比 */
  aspectRatio?: number;
  /** 裁剪框数据 */
  data?: Cropper.Data;
  /** 预览容器选择器 */
  preview?: string | HTMLElement | HTMLElement[];
  /** 是否响应式 */
  responsive?: boolean;
  /** 是否在窗口大小改变时恢复裁剪区域 */
  restore?: boolean;
  /** 是否检查跨域图片 */
  checkCrossOrigin?: boolean;
  /** 是否检查图片方向 */
  checkOrientation?: boolean;
  /** 是否显示模态背景 */
  modal?: boolean;
  /** 是否显示网格背景 */
  guides?: boolean;
  /** 是否显示中心指示器 */
  center?: boolean;
  /** 是否高亮裁剪框 */
  highlight?: boolean;
  /** 背景透明度 */
  background?: boolean;
  /** 是否自动裁剪 */
  autoCrop?: boolean;
  /** 自动裁剪区域比例 */
  autoCropArea?: number;
  /** 是否可移动图片 */
  movable?: boolean;
  /** 是否可旋转图片 */
  rotatable?: boolean;
  /** 是否可缩放图片 */
  scalable?: boolean;
  /** 是否可缩放画布 */
  zoomable?: boolean;
  /** 是否可通过滚轮缩放 */
  zoomOnWheel?: boolean;
  /** 是否可通过触摸缩放 */
  zoomOnTouch?: boolean;
  /** 滚轮缩放比例 */
  wheelZoomRatio?: number;
  /** 是否可移动裁剪框 */
  cropBoxMovable?: boolean;
  /** 是否可调整裁剪框大小 */
  cropBoxResizable?: boolean;
  /** 是否切换拖拽模式 */
  toggleDragModeOnDblclick?: boolean;
  /** 容器最小宽度 */
  minContainerWidth?: number;
  /** 容器最小高度 */
  minContainerHeight?: number;
  /** 画布最小宽度 */
  minCanvasWidth?: number;
  /** 画布最小高度 */
  minCanvasHeight?: number;
  /** 裁剪框最小宽度 */
  minCropBoxWidth?: number;
  /** 裁剪框最小高度 */
  minCropBoxHeight?: number;

  /** 构建完成回调 */
  ready?: (event: CropperReadyEvent) => void;
  /** 开始裁剪回调 */
  cropstart?: (event: Cropper.CropStartEvent) => void;
  /** 裁剪移动回调 */
  cropmove?: (event: Cropper.CropMoveEvent) => void;
  /** 裁剪结束回调 */
  cropend?: (event: Cropper.CropEndEvent) => void;
  /** 裁剪回调 */
  crop?: (event: Cropper.CropEvent) => void;
  /** 缩放回调 */
  zoom?: (event: Cropper.ZoomEvent) => void;
}

/**
 * Cropper 组件属性
 */
export interface CropperProps extends CropperOptions {
  /** 图片地址 */
  src?: string;
  /** 图片替代文本，默认 'picture' */
  alt?: string;
  /** 跨域设置 */
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  /** 容器样式 */
  style?: CSSProperties;
  /** 容器类名 */
  className?: string;
  
  /** 是否启用裁剪器 */
  enable?: boolean;
  /** X轴缩放比例 */
  scaleX?: number;
  /** Y轴缩放比例 */
  scaleY?: number;
  /** 缩放到指定比例 */
  zoomTo?: number;
  /** 旋转到指定角度 */
  rotateTo?: number;
  
  /** 初始化完成回调，返回 Cropper 实例 */
  onInitialized?: (cropper: Cropper) => void;
}

/**
 * 图片裁剪组件
 * 
 * @example
 *