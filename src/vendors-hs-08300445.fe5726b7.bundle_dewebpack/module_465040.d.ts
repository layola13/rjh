import { Component, CSSProperties } from 'react';
import Cropper from 'cropperjs';

/**
 * 裁剪框数据接口
 */
export interface CropBoxData {
  /** 裁剪框距离容器左边的距离 */
  left?: number;
  /** 裁剪框距离容器顶部的距离 */
  top?: number;
  /** 裁剪框的宽度 */
  width?: number;
  /** 裁剪框的高度 */
  height?: number;
}

/**
 * 画布数据接口
 */
export interface CanvasData {
  /** 画布距离容器左边的距离 */
  left?: number;
  /** 画布距离容器顶部的距离 */
  top?: number;
  /** 画布的宽度 */
  width?: number;
  /** 画布的高度 */
  height?: number;
}

/**
 * 裁剪数据接口
 */
export interface CropData {
  /** 裁剪区域的 X 坐标 */
  x?: number;
  /** 裁剪区域的 Y 坐标 */
  y?: number;
  /** 裁剪区域的宽度 */
  width?: number;
  /** 裁剪区域的高度 */
  height?: number;
  /** 旋转角度 */
  rotate?: number;
  /** 水平缩放比例 */
  scaleX?: number;
  /** 垂直缩放比例 */
  scaleY?: number;
}

/**
 * 图像数据接口
 */
export interface ImageData {
  /** 图像的左偏移 */
  left: number;
  /** 图像的顶部偏移 */
  top: number;
  /** 图像的宽度 */
  width: number;
  /** 图像的高度 */
  height: number;
  /** 图像的自然宽度 */
  naturalWidth: number;
  /** 图像的自然高度 */
  naturalHeight: number;
  /** 图像的宽高比 */
  aspectRatio: number;
  /** 图像的旋转角度 */
  rotate: number;
  /** 图像的水平缩放 */
  scaleX: number;
  /** 图像的垂直缩放 */
  scaleY: number;
}

/**
 * 容器数据接口
 */
export interface ContainerData {
  /** 容器的宽度 */
  width: number;
  /** 容器的高度 */
  height: number;
}

/**
 * 拖拽模式类型
 */
export type DragMode = 'crop' | 'move' | 'none';

/**
 * 视图模式类型
 */
export type ViewMode = 0 | 1 | 2 | 3;

/**
 * 获取裁剪画布的选项
 */
export interface GetCroppedCanvasOptions {
  /** 输出画布的宽度 */
  width?: number;
  /** 输出画布的高度 */
  height?: number;
  /** 输出画布的最小宽度 */
  minWidth?: number;
  /** 输出画布的最小高度 */
  minHeight?: number;
  /** 输出画布的最大宽度 */
  maxWidth?: number;
  /** 输出画布的最大高度 */
  maxHeight?: number;
  /** 输出画布的填充颜色 */
  fillColor?: string;
  /** 是否启用图像平滑 */
  imageSmoothingEnabled?: boolean;
  /** 图像平滑质量 */
  imageSmoothingQuality?: 'low' | 'medium' | 'high';
}

/**
 * ReactCropper 组件的属性接口
 */
export interface ReactCropperProps {
  /** 容器样式 */
  style?: CSSProperties;
  /** 容器类名 */
  className?: string;
  /** 跨域设置 */
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  /** 图像源地址 */
  src?: string | null;
  /** 图像的替代文本 */
  alt?: string;
  
  // Cropper.js 配置选项
  /** 宽高比 */
  aspectRatio?: number;
  /** 拖拽模式 */
  dragMode?: DragMode;
  /** 初始裁剪数据 */
  data?: CropData | null;
  /** 视图模式 */
  viewMode?: ViewMode;
  /** 预览容器的选择器 */
  preview?: string;
  /** 是否响应容器大小变化 */
  responsive?: boolean;
  /** 是否在调整窗口大小后恢复裁剪区域 */
  restore?: boolean;
  /** 是否检查跨域图像 */
  checkCrossOrigin?: boolean;
  /** 是否检查图像的 Orientation 信息 */
  checkOrientation?: boolean;
  /** 是否显示遮罩层 */
  modal?: boolean;
  /** 是否显示辅助线 */
  guides?: boolean;
  /** 是否显示中心指示器 */
  center?: boolean;
  /** 是否高亮显示裁剪框 */
  highlight?: boolean;
  /** 是否显示网格背景 */
  background?: boolean;
  /** 是否在初始化时自动裁剪 */
  autoCrop?: boolean;
  /** 自动裁剪区域的大小（0-1之间） */
  autoCropArea?: number;
  /** 是否允许移动图像 */
  movable?: boolean;
  /** 是否允许旋转图像 */
  rotatable?: boolean;
  /** 是否允许缩放图像 */
  scalable?: boolean;
  /** 是否允许缩放图像 */
  zoomable?: boolean;
  /** 是否允许触摸缩放 */
  zoomOnTouch?: boolean;
  /** 是否允许滚轮缩放 */
  zoomOnWheel?: boolean;
  /** 滚轮缩放比率 */
  wheelZoomRation?: number;
  /** 是否允许移动裁剪框 */
  cropBoxMovable?: boolean;
  /** 是否允许调整裁剪框大小 */
  cropBoxResizable?: boolean;
  /** 是否在双击时切换拖拽模式 */
  toggleDragModeOnDblclick?: boolean;
  /** 容器的最小宽度 */
  minContainerWidth?: number;
  /** 容器的最小高度 */
  minContainerHeight?: number;
  /** 画布的最小宽度 */
  minCanvasWidth?: number;
  /** 画布的最小高度 */
  minCanvasHeight?: number;
  /** 裁剪框的最小宽度 */
  minCropBoxWidth?: number;
  /** 裁剪框的最小高度 */
  minCropBoxHeight?: number;
  
  // 事件回调
  /** 裁剪器准备完成时的回调 */
  ready?: () => void;
  /** 开始裁剪时的回调 */
  cropstart?: (event: Cropper.CropStartEvent) => void;
  /** 裁剪移动时的回调 */
  cropmove?: (event: Cropper.CropMoveEvent) => void;
  /** 裁剪结束时的回调 */
  cropend?: (event: Cropper.CropEndEvent) => void;
  /** 裁剪时的回调 */
  crop?: (event: Cropper.CropEvent) => void;
  /** 缩放时的回调 */
  zoom?: (event: Cropper.ZoomEvent) => void;
  
  // 动态控制属性
  /** 水平缩放比例 */
  scaleX?: number;
  /** 垂直缩放比例 */
  scaleY?: number;
  /** 是否启用裁剪器 */
  enable?: boolean;
  /** 裁剪框数据 */
  cropBoxData?: CropBoxData;
  /** 画布数据 */
  canvasData?: CanvasData;
  /** 缩放到指定比例 */
  zoomTo?: number;
  /** 移动到指定位置 [x, y] */
  moveTo?: number[];
  /** 旋转到指定角度 */
  rotateTo?: number;
}

/**
 * React Cropper 组件
 * 基于 cropperjs 的 React 封装组件，用于图像裁剪
 */
export default class ReactCropper extends Component<ReactCropperProps> {
  /** Cropper.js 实例 */
  private cropper?: Cropper;
  /** 图像元素引用 */
  private img?: HTMLImageElement;

  /**
   * 设置拖拽模式
   * @param mode - 拖拽模式
   */
  setDragMode(mode: DragMode): void;

  /**
   * 设置宽高比
   * @param aspectRatio - 宽高比值
   */
  setAspectRatio(aspectRatio: number): void;

  /**
   * 获取裁剪后的画布
   * @param options - 画布选项
   * @returns 裁剪后的 Canvas 元素
   */
  getCroppedCanvas(options?: GetCroppedCanvasOptions): HTMLCanvasElement;

  /**
   * 设置裁剪框数据
   * @param data - 裁剪框数据
   */
  setCropBoxData(data: CropBoxData): void;

  /**
   * 获取裁剪框数据
   * @returns 裁剪框数据
   */
  getCropBoxData(): CropBoxData;

  /**
   * 设置画布数据
   * @param data - 画布数据
   */
  setCanvasData(data: CanvasData): void;

  /**
   * 获取画布数据
   * @returns 画布数据
   */
  getCanvasData(): CanvasData;

  /**
   * 获取图像数据
   * @returns 图像数据
   */
  getImageData(): ImageData;

  /**
   * 获取容器数据
   * @returns 容器数据
   */
  getContainerData(): ContainerData;

  /**
   * 设置裁剪数据
   * @param data - 裁剪数据
   */
  setData(data: CropData): void;

  /**
   * 获取裁剪数据
   * @param rounded - 是否四舍五入数据
   * @returns 裁剪数据
   */
  getData(rounded?: boolean): CropData;

  /**
   * 显示裁剪框
   */
  crop(): void;

  /**
   * 相对移动图像
   * @param offsetX - X 轴偏移量
   * @param offsetY - Y 轴偏移量（可选）
   */
  move(offsetX: number, offsetY?: number): void;

  /**
   * 移动图像到指定位置
   * @param x - X 坐标
   * @param y - Y 坐标（可选）
   */
  moveTo(x: number, y?: number): void;

  /**
   * 相对缩放图像
   * @param ratio - 缩放比率
   */
  zoom(ratio: number): void;

  /**
   * 缩放图像到指定比例
   * @param ratio - 缩放比例
   */
  zoomTo(ratio: number): void;

  /**
   * 相对旋转图像
   * @param degree - 旋转角度
   */
  rotate(degree: number): void;

  /**
   * 旋转图像到指定角度
   * @param degree - 目标角度
   */
  rotateTo(degree: number): void;

  /**
   * 启用裁剪器
   */
  enable(): void;

  /**
   * 禁用裁剪器
   */
  disable(): void;

  /**
   * 重置裁剪器
   */
  reset(): void;

  /**
   * 清除裁剪区域
   */
  clear(): void;

  /**
   * 替换图像源
   * @param url - 新的图像 URL
   * @param hasSameSize - 新图像是否与旧图像大小相同
   */
  replace(url: string, hasSameSize?: boolean): void;

  /**
   * 缩放图像
   * @param scaleX - 水平缩放比例
   * @param scaleY - 垂直缩放比例（可选）
   */
  scale(scaleX: number, scaleY?: number): void;

  /**
   * 水平缩放图像
   * @param scaleX - 水平缩放比例
   */
  scaleX(scaleX: number): void;

  /**
   * 垂直缩放图像
   * @param scaleY - 垂直缩放比例
   */
  scaleY(scaleY: number): void;
}