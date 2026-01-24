/**
 * 图片查看器组件类型定义
 * 支持缩放、拖拽、手势操作等功能
 * @module ImageViewer
 */

/**
 * 组件 Props 接口
 */
export interface ImageViewerProps {
  /** 图片URL地址 */
  imgs: string;
  /** 背景颜色，支持RGBA格式 */
  background: string;
}

/**
 * 组件数据状态接口
 */
export interface ImageViewerData {
  /** 图片缩放百分比 (80-500) */
  percent: number;
  /** 图片X轴位置偏移量（像素） */
  positionX: number;
  /** 图片Y轴位置偏移量（像素） */
  positionY: number;
  /** 拖拽起始X坐标 */
  startX: number;
  /** 拖拽起始Y坐标 */
  startY: number;
  /** 固定Y轴位置 */
  fixedY: number;
  /** 上次双指触摸距离 */
  lastDistance: number | null;
  /** 双指距离变化量 */
  deltaDistance: number | null;
}

/**
 * 计算属性接口
 */
export interface ImageViewerComputed {
  /** 是否可以继续放大（百分比<500） */
  magnifyAble: boolean;
  /** 是否可以继续缩小（百分比>80） */
  narrowAble: boolean;
  /** 是否为移动设备 */
  isMobileDevice: boolean;
}

/**
 * 触摸点坐标接口
 */
export interface TouchPoint {
  /** 触摸点X坐标 */
  clientX: number;
  /** 触摸点Y坐标 */
  clientY: number;
}

/**
 * 触摸事件接口
 */
export interface TouchEventWithChangedTouches extends TouchEvent {
  /** 变化的触摸点列表 */
  changedTouches: TouchPoint[];
}

/**
 * 鼠标滚轮事件接口
 */
export interface WheelEventWithDelta extends WheelEvent {
  /** 垂直滚动增量 */
  deltaY: number;
}

/**
 * 手势移动事件接口（AlloyFinger）
 */
export interface GestureMoveEvent {
  /** X轴移动增量 */
  deltaX: number;
  /** Y轴移动增量 */
  deltaY: number;
}

/**
 * AlloyFinger 手势库配置接口
 */
export interface AlloyFingerOptions {
  /** 双指缩放事件处理器 */
  pinch?: (event: TouchEvent) => void;
  /** 按压移动事件处理器 */
  pressMove?: (event: GestureMoveEvent) => void;
}

/**
 * AlloyFinger 构造函数类型
 */
declare class AlloyFinger {
  constructor(element: HTMLElement, options: AlloyFingerOptions);
}

declare global {
  interface Window {
    /** AlloyFinger 全局构造函数 */
    AlloyFinger: typeof AlloyFinger;
  }
}

/**
 * 拖拽设备类型枚举
 */
export enum DragDeviceType {
  /** 触摸设备 */
  Touch = 1,
  /** 鼠标设备 */
  Mouse = 2,
}

/**
 * 组件方法接口
 */
export interface ImageViewerMethods {
  /**
   * 查看器点击事件处理
   * 重置缩放和位置，并触发viewerClick事件
   */
  viewerClick(): void;

  /**
   * 缩放图片
   * @param delta - 缩放变化量（正数放大，负数缩小）
   */
  scaleImg(delta: number): void;

  /**
   * 重置图片位置和缩放
   * 恢复到初始状态：100%缩放，居中位置
   */
  resetPosition(): void;

  /**
   * 图片加载完成回调
   * @param event - 图片加载事件
   */
  imgLoaded(event: Event): void;

  /**
   * 阻止外层触摸事件冒泡
   * @param event - 触摸事件
   * @returns 始终返回false
   */
  outerTouch(event: TouchEvent): boolean;

  /**
   * 拖拽开始事件处理
   * @param event - 鼠标或触摸事件
   * @param deviceType - 设备类型（1=触摸，2=鼠标）
   */
  dragStart(event: MouseEvent | TouchEventWithChangedTouches, deviceType: DragDeviceType): void;

  /**
   * 拖拽移动事件处理
   * @param event - 鼠标或触摸事件
   * @param deviceType - 设备类型（1=触摸，2=鼠标）
   */
  dragMove(event: MouseEvent | TouchEventWithChangedTouches, deviceType: DragDeviceType): void;

  /**
   * 鼠标滚轮缩放处理
   * @param event - 滚轮事件
   */
  mousewheel(event: WheelEventWithDelta): void;

  /**
   * 计算双指触摸距离变化
   * @param touches - 触摸点数组
   */
  changeDistance(touches: TouchPoint[]): void;

  /**
   * 双指缩放手势处理
   * @param event - 触摸事件
   */
  pinchHandler(event: TouchEvent): void;

  /**
   * 手势移动处理（AlloyFinger）
   * @param event - 手势移动事件
   */
  moveHandler(event: GestureMoveEvent): void;

  /**
   * 动态加载AlloyFinger脚本
   * @returns Promise，加载完成后初始化手势监听
   */
  loadScript(): Promise<void>;
}

/**
 * Vue Store Getters 接口
 */
export interface StoreGetters {
  /** 是否为移动设备 */
  isMobileDevice: boolean;
}

/**
 * 图片查看器 Vue 组件类型定义
 */
export default interface ImageViewerComponent {
  /** 组件属性 */
  props: ImageViewerProps;
  /** 组件数据 */
  data: () => ImageViewerData;
  /** 计算属性 */
  computed: ImageViewerComputed;
  /** 组件方法 */
  methods: ImageViewerMethods;
  /** 监听器 */
  watch: {
    /** 监听图片URL变化 */
    imgs(newVal: string, oldVal: string): void;
  };
  /** 生命周期：组件挂载后 */
  mounted(): void;
}

/**
 * 组件事件接口
 */
export interface ImageViewerEvents {
  /**
   * 查看器点击事件
   * 当用户点击查看器区域时触发
   */
  viewerClick: () => void;
}