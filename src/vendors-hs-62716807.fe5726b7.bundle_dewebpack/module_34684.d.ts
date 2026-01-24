/**
 * Cropper.js v1.0.0-rc.3
 * TypeScript type definitions
 * https://github.com/fengyuanchen/cropperjs
 * 
 * Copyright (c) 2017 Fengyuan Chen
 * Released under the MIT license
 */

declare module 'cropperjs' {
  /**
   * Cropper配置选项
   */
  export interface CropperOptions {
    /** 视图模式 (0-3) */
    viewMode?: 0 | 1 | 2 | 3;
    /** 拖拽模式: 'crop' | 'move' | 'none' */
    dragMode?: 'crop' | 'move' | 'none';
    /** 裁剪框宽高比 */
    aspectRatio?: number;
    /** 初始化裁剪数据 */
    data?: CropperData | null;
    /** 预览元素选择器 */
    preview?: string | Element | Element[];
    /** 是否响应式调整 */
    responsive?: boolean;
    /** 是否在调整窗口大小后恢复裁剪区域 */
    restore?: boolean;
    /** 是否检查跨域图片 */
    checkCrossOrigin?: boolean;
    /** 是否检查图片方向(EXIF) */
    checkOrientation?: boolean;
    /** 是否显示遮罩层 */
    modal?: boolean;
    /** 是否显示辅助线 */
    guides?: boolean;
    /** 是否显示中心指示器 */
    center?: boolean;
    /** 是否高亮裁剪区域 */
    highlight?: boolean;
    /** 是否显示网格背景 */
    background?: boolean;
    /** 是否自动裁剪 */
    autoCrop?: boolean;
    /** 自动裁剪区域比例 (0-1) */
    autoCropArea?: number;
    /** 是否可移动图片 */
    movable?: boolean;
    /** 是否可旋转图片 */
    rotatable?: boolean;
    /** 是否可缩放图片 */
    scalable?: boolean;
    /** 是否可缩放图片 */
    zoomable?: boolean;
    /** 触摸时是否可缩放 */
    zoomOnTouch?: boolean;
    /** 滚轮时是否可缩放 */
    zoomOnWheel?: boolean;
    /** 滚轮缩放比例 */
    wheelZoomRatio?: number;
    /** 裁剪框是否可移动 */
    cropBoxMovable?: boolean;
    /** 裁剪框是否可调整大小 */
    cropBoxResizable?: boolean;
    /** 双击是否切换拖拽模式 */
    toggleDragModeOnDblclick?: boolean;
    /** 画布最小宽度 */
    minCanvasWidth?: number;
    /** 画布最小高度 */
    minCanvasHeight?: number;
    /** 裁剪框最小宽度 */
    minCropBoxWidth?: number;
    /** 裁剪框最小高度 */
    minCropBoxHeight?: number;
    /** 容器最小宽度 */
    minContainerWidth?: number;
    /** 容器最小高度 */
    minContainerHeight?: number;
    /** 准备就绪回调 */
    ready?: ((event: CustomEvent) => void) | null;
    /** 开始裁剪回调 */
    cropstart?: ((event: CustomEvent) => void) | null;
    /** 裁剪移动回调 */
    cropmove?: ((event: CustomEvent) => void) | null;
    /** 裁剪结束回调 */
    cropend?: ((event: CustomEvent) => void) | null;
    /** 裁剪回调 */
    crop?: ((event: CustomEvent) => void) | null;
    /** 缩放回调 */
    zoom?: ((event: CustomEvent) => void) | null;
  }

  /**
   * 裁剪数据
   */
  export interface CropperData {
    /** X轴偏移量 */
    x: number;
    /** Y轴偏移量 */
    y: number;
    /** 裁剪区域宽度 */
    width: number;
    /** 裁剪区域高度 */
    height: number;
    /** 旋转角度 */
    rotate?: number;
    /** X轴缩放比例 */
    scaleX?: number;
    /** Y轴缩放比例 */
    scaleY?: number;
  }

  /**
   * 容器数据
   */
  export interface ContainerData {
    /** 容器宽度 */
    width: number;
    /** 容器高度 */
    height: number;
  }

  /**
   * 图片数据
   */
  export interface ImageData {
    /** 左侧偏移 */
    left: number;
    /** 顶部偏移 */
    top: number;
    /** 图片宽度 */
    width: number;
    /** 图片高度 */
    height: number;
    /** 图片原始宽度 */
    naturalWidth: number;
    /** 图片原始高度 */
    naturalHeight: number;
    /** 图片宽高比 */
    aspectRatio: number;
    /** 旋转角度 */
    rotate: number;
    /** X轴缩放 */
    scaleX: number;
    /** Y轴缩放 */
    scaleY: number;
  }

  /**
   * 画布数据
   */
  export interface CanvasData {
    /** 左侧偏移 */
    left: number;
    /** 顶部偏移 */
    top: number;
    /** 画布宽度 */
    width: number;
    /** 画布高度 */
    height: number;
    /** 原始宽度 */
    naturalWidth?: number;
    /** 原始高度 */
    naturalHeight?: number;
  }

  /**
   * 裁剪框数据
   */
  export interface CropBoxData {
    /** 左侧偏移 */
    left: number;
    /** 顶部偏移 */
    top: number;
    /** 裁剪框宽度 */
    width: number;
    /** 裁剪框高度 */
    height: number;
  }

  /**
   * 获取裁剪后的画布选项
   */
  export interface GetCroppedCanvasOptions {
    /** 目标宽度 */
    width?: number;
    /** 目标高度 */
    height?: number;
    /** 最小宽度 */
    minWidth?: number;
    /** 最小高度 */
    minHeight?: number;
    /** 最大宽度 */
    maxWidth?: number;
    /** 最大高度 */
    maxHeight?: number;
    /** 填充颜色 */
    fillColor?: string;
    /** 是否启用图像平滑 */
    imageSmoothingEnabled?: boolean;
    /** 图像平滑质量 */
    imageSmoothingQuality?: 'low' | 'medium' | 'high';
  }

  /**
   * Cropper类
   */
  export default class Cropper {
    /**
     * 构造函数
     * @param element 图片元素或canvas元素
     * @param options 配置选项
     */
    constructor(element: HTMLImageElement | HTMLCanvasElement, options?: CropperOptions);

    /**
     * 显示裁剪框
     */
    crop(): Cropper;

    /**
     * 重置为初始状态
     */
    reset(): Cropper;

    /**
     * 清除裁剪框
     */
    clear(): Cropper;

    /**
     * 替换图片源
     * @param url 新图片URL
     * @param hasSameSize 是否同尺寸
     */
    replace(url: string, hasSameSize?: boolean): Cropper;

    /**
     * 启用裁剪器
     */
    enable(): Cropper;

    /**
     * 禁用裁剪器
     */
    disable(): Cropper;

    /**
     * 销毁裁剪器并移除实例
     */
    destroy(): Cropper;

    /**
     * 相对移动画布
     * @param offsetX X轴偏移量
     * @param offsetY Y轴偏移量
     */
    move(offsetX: number, offsetY?: number): Cropper;

    /**
     * 移动画布到绝对位置
     * @param x X坐标
     * @param y Y坐标
     */
    moveTo(x: number, y?: number): Cropper;

    /**
     * 相对缩放画布
     * @param ratio 缩放比例
     * @param pivot 缩放中心点
     */
    zoom(ratio: number, pivot?: Event): Cropper;

    /**
     * 缩放画布到绝对比例
     * @param ratio 目标比例
     * @param pivot 缩放中心点
     */
    zoomTo(ratio: number, pivot?: Event): Cropper;

    /**
     * 相对旋转图片
     * @param degree 旋转角度
     */
    rotate(degree: number): Cropper;

    /**
     * 旋转图片到绝对角度
     * @param degree 目标角度
     */
    rotateTo(degree: number): Cropper;

    /**
     * 缩放图片
     * @param scaleX X轴缩放
     * @param scaleY Y轴缩放
     */
    scale(scaleX: number, scaleY?: number): Cropper;

    /**
     * X轴缩放
     * @param scaleX X轴缩放比例
     */
    scaleX(scaleX: number): Cropper;

    /**
     * Y轴缩放
     * @param scaleY Y轴缩放比例
     */
    scaleY(scaleY: number): Cropper;

    /**
     * 获取裁剪数据
     * @param rounded 是否四舍五入
     */
    getData(rounded?: boolean): CropperData;

    /**
     * 设置裁剪数据
     * @param data 裁剪数据
     */
    setData(data: Partial<CropperData>): Cropper;

    /**
     * 获取容器数据
     */
    getContainerData(): ContainerData;

    /**
     * 获取图片数据
     */
    getImageData(): ImageData;

    /**
     * 获取画布数据
     */
    getCanvasData(): CanvasData;

    /**
     * 设置画布数据
     * @param data 画布数据
     */
    setCanvasData(data: Partial<CanvasData>): Cropper;

    /**
     * 获取裁剪框数据
     */
    getCropBoxData(): CropBoxData;

    /**
     * 设置裁剪框数据
     * @param data 裁剪框数据
     */
    setCropBoxData(data: Partial<CropBoxData>): Cropper;

    /**
     * 获取裁剪后的canvas
     * @param options 选项
     */
    getCroppedCanvas(options?: GetCroppedCanvasOptions): HTMLCanvasElement | null;

    /**
     * 设置宽高比
     * @param aspectRatio 宽高比
     */
    setAspectRatio(aspectRatio: number): Cropper;

    /**
     * 设置拖拽模式
     * @param mode 拖拽模式
     */
    setDragMode(mode: 'crop' | 'move' | 'none'): Cropper;

    /**
     * 恢复到无冲突模式
     */
    static noConflict(): typeof Cropper;

    /**
     * 设置默认选项
     * @param options 默认选项
     */
    static setDefaults(options: Partial<CropperOptions>): void;
  }
}