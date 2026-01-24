/**
 * 图片锚点选择器模块
 * 用于在图片上选择区域并进行裁剪操作
 */

/**
 * 拖拽手柄类型枚举
 */
export enum HandleType {
  /** 顶部边缘 */
  TOP = 0,
  /** 底部边缘 */
  BOTTOM = 1,
  /** 左侧边缘 */
  LEFT = 2,
  /** 右侧边缘 */
  RIGHT = 3,
  /** 左上角 */
  LEFTTOP = 4,
  /** 左下角 */
  LEFTBOTTOM = 5,
  /** 右上角 */
  RIGHTTOP = 6,
  /** 右下角 */
  RIGHTBOTTOM = 7,
  /** 整个框体 */
  BOX = 8
}

/**
 * 二维向量类型
 */
export interface Vector2 {
  x: number;
  y: number;
}

/**
 * 边界框数据
 */
export interface BoundingBox {
  /** 边界框坐标 [x1, y1, x2, y2] */
  box: number[];
  /** 类别标签 */
  category?: string;
}

/**
 * 容器最大尺寸配置
 */
export interface ContainerMaxSize {
  /** 最大宽度 */
  maxWidth: number;
  /** 最大高度 */
  maxHeight: number;
}

/**
 * CSS Transform 中的平移值
 */
export interface TranslateValues {
  /** X轴平移距离 */
  translateX: number;
  /** Y轴平移距离 */
  translateY: number;
}

/**
 * 计算拖拽变换的结果
 */
export interface DragTransformResult {
  /** 平移值 */
  translate: TranslateValues;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 图片锚点选择器类
 * 提供图片区域选择、裁剪框拖拽调整等交互功能
 */
export declare class ImgAnchorPicker {
  /** 图片URL */
  private readonly _imgUrl: string;
  
  /** 边界框列表 */
  private readonly _boxList: BoundingBox[];
  
  /** 容器最大尺寸限制 */
  private readonly _containerMaxSize?: ContainerMaxSize;
  
  /** 拖拽手柄元素映射表 */
  private readonly _handleElementMap: Map<HandleType, HTMLElement>;
  
  /** 图片元素 */
  private _img: HTMLImageElement;
  
  /** 容器元素 */
  container: HTMLDivElement;
  
  /** 是否正在拖拽手柄 */
  private _isDraggingHandle: boolean;
  
  /** 是否正在绘制 */
  private _isDrawing: boolean;
  
  /** 裁剪框是否可见 */
  private _clipBoxVisible: boolean;
  
  /** 裁剪框元素 */
  private _clipBox: HTMLDivElement;
  
  /** 裁剪框内的图片元素 */
  private _boxImg: HTMLImageElement;
  
  /** 最小宽度限制 */
  readonly MIN_WIDTH: number;
  
  /** 最小高度限制 */
  readonly MIN_HEIGHT: number;
  
  /** 图片原始宽度 */
  private _imgOriginWidth: number;
  
  /** 图片原始高度 */
  private _imgOriginHeight: number;
  
  /** Canvas元素，用于图片截取 */
  private _canvas: HTMLCanvasElement;
  
  /** 锚点元素数组 */
  private _anchorPointElements: HTMLDivElement[];
  
  /** 手柄类型到CSS类名的映射 */
  private readonly _handleClassNameMap: Map<HandleType, string>;

  /**
   * 构造函数
   * @param imgUrl - 图片URL地址
   * @param boxList - 预定义的边界框列表
   * @param containerMaxSize - 容器最大尺寸限制（可选）
   */
  constructor(
    imgUrl: string,
    boxList: BoundingBox[],
    containerMaxSize?: ContainerMaxSize
  );

  /**
   * 获取本地坐标系下的边界框列表
   * 根据图片缩放比例转换原始边界框坐标
   */
  private get _localBoxList(): BoundingBox[];

  /**
   * 获取当前裁剪框对应的边界框坐标（原始图片坐标系）
   * @returns 边界框坐标 [x1, y1, x2, y2]，未显示时返回 undefined
   */
  get currentBox(): number[] | undefined;

  /**
   * 绘制图片遮罩层
   */
  drawMask(): void;

  /**
   * 绘制锚点
   * 在预定义的边界框中心位置创建可点击的锚点
   */
  drawAnchorPoints(): void;

  /**
   * 绘制裁剪框及其拖拽手柄
   */
  drawClipBox(): void;

  /**
   * 创建拖拽手柄
   * @param handleType - 手柄类型
   */
  private _createMoveHandle(handleType: HandleType): void;

  /**
   * 设置元素可见性
   * @param element - 目标元素
   * @param visible - 是否可见
   */
  setElementVisible(element: HTMLElement | undefined, visible: boolean): void;

  /**
   * 更新裁剪框的位置和尺寸
   * @param position - 新位置（可选）
   * @param width - 新宽度（可选）
   * @param height - 新高度（可选）
   */
  private _updateClipBox(
    position?: Vector2,
    width?: number,
    height?: number
  ): void;

  /**
   * 通过两点坐标更新裁剪框
   * @param startPoint - 起始点
   * @param endPoint - 结束点
   */
  private _updateClipBoxByPoint(startPoint: Vector2, endPoint: Vector2): void;

  /**
   * 图片加载完成回调（可重写）
   */
  onImgLoad(): void;

  /**
   * 裁剪框绘制完成回调（可重写）
   * @param category - 边界框类别（可选）
   */
  onClipBoxDraw(category?: string): void;

  /**
   * 从CSS transform字符串中提取平移值
   * @param transformString - CSS transform字符串
   * @returns 平移值对象
   */
  private _getTranslateFromCSSString(transformString: string): TranslateValues;

  /**
   * 计算拖拽变换结果
   * @param handleType - 拖拽手柄类型
   * @param offset - 拖拽偏移量
   * @param initialTranslate - 初始平移值（可选）
   * @param initialWidth - 初始宽度（可选）
   * @param initialHeight - 初始高度（可选）
   * @returns 计算后的变换结果
   */
  private _calcTranslate(
    handleType: HandleType,
    offset: Vector2,
    initialTranslate?: TranslateValues,
    initialWidth?: number,
    initialHeight?: number
  ): DragTransformResult;

  /**
   * 处理拖拽和绘制相关的事件监听
   */
  private _handleEventProcess(): void;

  /**
   * 捕获当前裁剪区域的图片
   * @returns Base64格式的图片数据URL，未显示裁剪框时返回 undefined
   */
  captureImage(): string | undefined;

  /**
   * 为元素添加CSS动画类
   * @param element - 目标元素
   * @param animationClass - 动画类名
   */
  private _addAnimation(element: HTMLElement, animationClass: string): void;

  /**
   * 移除元素的CSS动画类
   * @param element - 目标元素
   * @param animationClass - 动画类名
   */
  private _removeAnimation(element: HTMLElement, animationClass: string): void;

  /**
   * 限制数值在指定范围内
   * @param value - 待限制的值
   * @param min - 最小值
   * @param max - 最大值
   * @returns 限制后的值
   */
  private _limitValue(value: number, min: number, max: number): number;
}