/**
 * Cropper.js 类型定义文件
 * 
 * 该模块将 Cropper 类暴露到全局 window 对象
 * 用于图像裁剪和操作功能
 */

/**
 * Cropper 图像裁剪器类
 * 提供图像裁剪、缩放、旋转等功能
 */
declare class Cropper {
  /**
   * 创建一个新的 Cropper 实例
   * @param element - 要应用裁剪器的图像元素
   * @param options - 裁剪器配置选项
   */
  constructor(element: HTMLImageElement | HTMLCanvasElement, options?: Cropper.Options);

  /**
   * 销毁 Cropper 实例并移除相关事件监听器
   * @returns Cropper 实例
   */
  destroy(): Cropper;

  /**
   * 替换图像的 src 并重新构建裁剪器
   * @param url - 新图像的 URL
   * @param hasSameSize - 新图像是否与旧图像大小相同
   * @returns Cropper 实例
   */
  replace(url: string, hasSameSize?: boolean): Cropper;

  /**
   * 获取裁剪框的位置和大小数据
   * @param rounded - 是否对返回值四舍五入
   * @returns 裁剪框数据对象
   */
  getData(rounded?: boolean): Cropper.Data;

  /**
   * 设置裁剪框的位置和大小
   * @param data - 要设置的数据
   * @returns Cropper 实例
   */
  setData(data: Partial<Cropper.Data>): Cropper;

  /**
   * 获取容器的大小数据
   * @returns 容器数据对象
   */
  getContainerData(): Cropper.ContainerData;

  /**
   * 获取图像的位置、大小和其他相关数据
   * @returns 图像数据对象
   */
  getImageData(): Cropper.ImageData;

  /**
   * 获取画布（图像包装器）的位置和大小数据
   * @returns 画布数据对象
   */
  getCanvasData(): Cropper.CanvasData;

  /**
   * 设置画布的位置和大小
   * @param data - 要设置的画布数据
   * @returns Cropper 实例
   */
  setCanvasData(data: Partial<Cropper.SetCanvasData>): Cropper;

  /**
   * 获取裁剪框的位置和大小数据
   * @returns 裁剪框数据对象
   */
  getCropBoxData(): Cropper.CropBoxData;

  /**
   * 设置裁剪框的位置和大小
   * @param data - 要设置的裁剪框数据
   * @returns Cropper 实例
   */
  setCropBoxData(data: Partial<Cropper.CropBoxData>): Cropper;

  /**
   * 获取裁剪后的画布
   * @param options - 画布配置选项
   * @returns 裁剪后的 HTMLCanvasElement
   */
  getCroppedCanvas(options?: Cropper.GetCroppedCanvasOptions): HTMLCanvasElement;

  /**
   * 将裁剪框重置为初始大小
   * @returns Cropper 实例
   */
  reset(): Cropper;

  /**
   * 清除裁剪框
   * @returns Cropper 实例
   */
  clear(): Cropper;

  /**
   * 启用（解冻）裁剪器
   * @returns Cropper 实例
   */
  enable(): Cropper;

  /**
   * 禁用（冻结）裁剪器
   * @returns Cropper 实例
   */
  disable(): Cropper;

  /**
   * 相对于图像移动画布
   * @param offsetX - X 轴偏移量
   * @param offsetY - Y 轴偏移量（可选）
   * @returns Cropper 实例
   */
  move(offsetX: number, offsetY?: number): Cropper;

  /**
   * 将画布移动到绝对位置
   * @param x - X 轴位置
   * @param y - Y 轴位置（可选）
   * @returns Cropper 实例
   */
  moveTo(x: number, y?: number): Cropper;

  /**
   * 缩放画布
   * @param ratio - 缩放比例
   * @returns Cropper 实例
   */
  zoom(ratio: number): Cropper;

  /**
   * 将画布缩放到绝对比例
   * @param ratio - 绝对缩放比例
   * @returns Cropper 实例
   */
  zoomTo(ratio: number): Cropper;

  /**
   * 旋转图像
   * @param degree - 旋转角度
   * @returns Cropper 实例
   */
  rotate(degree: number): Cropper;

  /**
   * 将图像旋转到绝对角度
   * @param degree - 绝对旋转角度
   * @returns Cropper 实例
   */
  rotateTo(degree: number): Cropper;

  /**
   * 水平翻转图像
   * @param scaleX - 水平缩放因子
   * @returns Cropper 实例
   */
  scaleX(scaleX: number): Cropper;

  /**
   * 垂直翻转图像
   * @param scaleY - 垂直缩放因子
   * @returns Cropper 实例
   */
  scaleY(scaleY: number): Cropper;

  /**
   * 同时水平和垂直缩放图像
   * @param scaleX - 水平缩放因子
   * @param scaleY - 垂直缩放因子
   * @returns Cropper 实例
   */
  scale(scaleX: number, scaleY?: number): Cropper;

  /**
   * 设置裁剪框的宽高比
   * @param aspectRatio - 新的宽高比
   * @returns Cropper 实例
   */
  setAspectRatio(aspectRatio: number): Cropper;

  /**
   * 设置拖拽模式
   * @param mode - 拖拽模式：'none' | 'crop' | 'move'
   * @returns Cropper 实例
   */
  setDragMode(mode: Cropper.DragMode): Cropper;
}

declare namespace Cropper {
  /**
   * 拖拽模式类型
   */
  type DragMode = 'none' | 'crop' | 'move';

  /**
   * 视图模式类型
   * - 0: 无限制
   * - 1: 限制裁剪框不超出画布
   * - 2: 限制画布不小于容器，裁剪框限制在画布内
   * - 3: 限制画布填充适应容器
   */
  type ViewMode = 0 | 1 | 2 | 3;

  /**
   * Cropper 配置选项
   */
  interface Options {
    /** 视图模式 */
    viewMode?: ViewMode;
    
    /** 拖拽模式 */
    dragMode?: DragMode;
    
    /** 初始宽高比 */
    aspectRatio?: number;
    
    /** 自动裁剪区域 */
    autoCrop?: boolean;
    
    /** 自动裁剪区域的百分比（0-1） */
    autoCropArea?: number;
    
    /** 是否可移动 */
    movable?: boolean;
    
    /** 是否可旋转 */
    rotatable?: boolean;
    
    /** 是否可缩放 */
    scalable?: boolean;
    
    /** 是否可通过滚轮缩放 */
    zoomable?: boolean;
    
    /** 是否可通过触摸缩放 */
    zoomOnTouch?: boolean;
    
    /** 是否可通过滚轮缩放 */
    zoomOnWheel?: boolean;
    
    /** 滚轮缩放比例 */
    wheelZoomRatio?: number;
    
    /** 裁剪框是否可移动 */
    cropBoxMovable?: boolean;
    
    /** 裁剪框是否可调整大小 */
    cropBoxResizable?: boolean;
    
    /** 是否显示切换拖拽模式的按钮 */
    toggleDragModeOnDblclick?: boolean;
    
    /** 最小容器宽度 */
    minContainerWidth?: number;
    
    /** 最小容器高度 */
    minContainerHeight?: number;
    
    /** 最小画布宽度 */
    minCanvasWidth?: number;
    
    /** 最小画布高度 */
    minCanvasHeight?: number;
    
    /** 最小裁剪框宽度 */
    minCropBoxWidth?: number;
    
    /** 最小裁剪框高度 */
    minCropBoxHeight?: number;
    
    /** 构建完成时的回调 */
    ready?: (event: CustomEvent) => void;
    
    /** 开始裁剪时的回调 */
    cropstart?: (event: CustomEvent) => void;
    
    /** 裁剪时的回调 */
    cropmove?: (event: CustomEvent) => void;
    
    /** 结束裁剪时的回调 */
    cropend?: (event: CustomEvent) => void;
    
    /** 裁剪时的回调 */
    crop?: (event: CustomEvent) => void;
    
    /** 缩放时的回调 */
    zoom?: (event: CustomEvent) => void;
  }

  /**
   * 裁剪数据接口
   */
  interface Data {
    /** X 轴坐标 */
    x: number;
    
    /** Y 轴坐标 */
    y: number;
    
    /** 宽度 */
    width: number;
    
    /** 高度 */
    height: number;
    
    /** 旋转角度 */
    rotate: number;
    
    /** 水平缩放因子 */
    scaleX: number;
    
    /** 垂直缩放因子 */
    scaleY: number;
  }

  /**
   * 容器数据接口
   */
  interface ContainerData {
    /** 容器宽度 */
    width: number;
    
    /** 容器高度 */
    height: number;
  }

  /**
   * 图像数据接口
   */
  interface ImageData {
    /** 图像左侧位置 */
    left: number;
    
    /** 图像顶部位置 */
    top: number;
    
    /** 图像宽度 */
    width: number;
    
    /** 图像高度 */
    height: number;
    
    /** 图像自然宽度 */
    naturalWidth: number;
    
    /** 图像自然高度 */
    naturalHeight: number;
    
    /** 图像宽高比 */
    aspectRatio: number;
    
    /** 旋转角度 */
    rotate: number;
    
    /** 水平缩放因子 */
    scaleX: number;
    
    /** 垂直缩放因子 */
    scaleY: number;
  }

  /**
   * 画布数据接口
   */
  interface CanvasData {
    /** 画布左侧位置 */
    left: number;
    
    /** 画布顶部位置 */
    top: number;
    
    /** 画布宽度 */
    width: number;
    
    /** 画布高度 */
    height: number;
    
    /** 画布自然宽度 */
    naturalWidth: number;
    
    /** 画布自然高度 */
    naturalHeight: number;
  }

  /**
   * 设置画布数据接口
   */
  interface SetCanvasData {
    /** 画布左侧位置 */
    left: number;
    
    /** 画布顶部位置 */
    top: number;
    
    /** 画布宽度 */
    width: number;
    
    /** 画布高度 */
    height: number;
  }

  /**
   * 裁剪框数据接口
   */
  interface CropBoxData {
    /** 裁剪框左侧位置 */
    left: number;
    
    /** 裁剪框顶部位置 */
    top: number;
    
    /** 裁剪框宽度 */
    width: number;
    
    /** 裁剪框高度 */
    height: number;
  }

  /**
   * 获取裁剪画布的选项
   */
  interface GetCroppedCanvasOptions {
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
    
    /** 是否包含图像平滑 */
    imageSmoothingEnabled?: boolean;
    
    /** 图像平滑质量 */
    imageSmoothingQuality?: 'low' | 'medium' | 'high';
  }
}

/**
 * 扩展 Window 接口，添加 Cropper 全局变量
 */
declare global {
  interface Window {
    /**
     * Cropper 图像裁剪器构造函数
     */
    Cropper: typeof Cropper;
  }
}

export default Cropper;