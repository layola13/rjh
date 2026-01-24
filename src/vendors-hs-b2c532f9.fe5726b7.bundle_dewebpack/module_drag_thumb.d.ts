/**
 * 滚动条拖拽处理模块
 * @module DragThumb
 */

/**
 * 垂直滚动条配置属性
 */
interface VerticalScrollConfig {
  /** 容器高度（像素） */
  containerHeight: number;
  /** 内容总高度（像素） */
  contentHeight: number;
  /** 鼠标Y坐标（相对于页面） */
  pageY: number;
  /** 滚动条轨道高度（像素） */
  railYHeight: number;
  /** 垂直滚动条DOM元素 */
  scrollbarY: HTMLElement;
  /** 垂直滚动条高度（像素） */
  scrollbarYHeight: number;
  /** 当前垂直滚动位置（像素） */
  scrollTop: number;
  /** 滚动条Y轴位置（像素） */
  y: number;
  /** 垂直滚动条轨道DOM元素 */
  scrollbarYRail: HTMLElement;
}

/**
 * 水平滚动条配置属性
 */
interface HorizontalScrollConfig {
  /** 容器宽度（像素） */
  containerWidth: number;
  /** 内容总宽度（像素） */
  contentWidth: number;
  /** 鼠标X坐标（相对于页面） */
  pageX: number;
  /** 滚动条轨道宽度（像素） */
  railXWidth: number;
  /** 水平滚动条DOM元素 */
  scrollbarX: HTMLElement;
  /** 水平滚动条宽度（像素） */
  scrollbarXWidth: number;
  /** 当前水平滚动位置（像素） */
  scrollLeft: number;
  /** 滚动条X轴位置（像素） */
  x: number;
  /** 水平滚动条轨道DOM元素 */
  scrollbarXRail: HTMLElement;
}

/**
 * 滚动条拖拽元素的完整配置
 */
interface DragThumbConfig extends VerticalScrollConfig, HorizontalScrollConfig {}

/**
 * 绑定滚动条拖拽属性到目标元素
 * @param target - 目标元素对象
 * @param properties - 要绑定的属性名称数组
 */
declare function bindScrollProperties<T extends Record<string, unknown>>(
  target: T,
  properties: ReadonlyArray<keyof DragThumbConfig>
): void;

/**
 * 初始化滚动条拖拽功能
 * @param element - 需要应用拖拽功能的元素配置
 */
declare function initializeDragThumb(element: DragThumbConfig): void;

export {
  VerticalScrollConfig,
  HorizontalScrollConfig,
  DragThumbConfig,
  bindScrollProperties,
  initializeDragThumb
};