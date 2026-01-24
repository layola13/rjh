/**
 * Perfect Scrollbar - 鼠标滚轮事件处理模块
 * 
 * 该模块负责处理自定义滚动条的鼠标滚轮交互，包括：
 * - 标准化不同浏览器的滚轮事件
 * - 处理水平和垂直滚动轴
 * - 防止嵌套滚动容器的事件冒泡
 * - 支持双轴滚动模式
 * 
 * @module MouseWheelHandler
 */

/**
 * Perfect Scrollbar 实例配置
 */
interface PerfectScrollbarInstance {
  /** 滚动条设置 */
  settings: ScrollbarSettings;
  /** 垂直滚动条是否激活 */
  scrollbarYActive: boolean;
  /** 水平滚动条是否激活 */
  scrollbarXActive: boolean;
  /** 内容总高度 */
  contentHeight: number;
  /** 容器可视高度 */
  containerHeight: number;
  /** 内容总宽度 */
  contentWidth: number;
  /** 容器可视宽度 */
  containerWidth: number;
  /** 事件绑定工具 */
  event: EventBinding;
}

/**
 * 滚动条配置选项
 */
interface ScrollbarSettings {
  /** 滚轮速度倍数 */
  wheelSpeed: number;
  /** 是否允许滚轮事件向父元素传播 */
  wheelPropagation: boolean;
  /** 是否同时使用两个滚轮轴（当只有一个滚动条激活时） */
  useBothWheelAxes: boolean;
}

/**
 * 事件绑定工具接口
 */
interface EventBinding {
  /**
   * 绑定事件监听器
   * @param element - 目标元素
   * @param eventName - 事件名称
   * @param handler - 事件处理函数
   */
  bind(element: HTMLElement, eventName: string, handler: EventListener): void;
}

/**
 * 标准化的滚轮事件对象
 */
interface NormalizedWheelEvent extends WheelEvent {
  /** X轴滚动增量 */
  deltaX?: number;
  /** Y轴滚动增量 */
  deltaY?: number;
  /** 滚动模式（0=像素，1=行，2=页） */
  deltaMode?: number;
  /** 旧版IE的X轴滚轮增量 */
  wheelDeltaX?: number;
  /** 旧版IE的Y轴滚轮增量 */
  wheelDeltaY?: number;
  /** 旧版通用滚轮增量 */
  wheelDelta?: number;
  /** 是否按下Shift键 */
  shiftKey: boolean;
}

/**
 * 标准化滚轮事件的增量值
 * 
 * 处理不同浏览器和事件API的差异：
 * - 现代浏览器：deltaX/deltaY
 * - 旧版浏览器：wheelDeltaX/wheelDeltaY/wheelDelta
 * - 行模式（deltaMode=1）：乘以10转换为像素
 * 
 * @param event - 原始滚轮事件
 * @returns [水平增量, 垂直增量]
 */
declare function normalizeWheelDelta(event: NormalizedWheelEvent): [number, number];

/**
 * 检查是否应该阻止滚动事件传播
 * 
 * 判断鼠标悬停的元素（textarea、多选select、子滚动容器）是否：
 * 1. 自身可滚动（overflow: scroll/auto）
 * 2. 尚未滚动到边界
 * 
 * @param container - 滚动容器元素
 * @param deltaX - 水平滚动增量
 * @param deltaY - 垂直滚动增量
 * @returns true表示应该让子元素处理滚动，false表示应该由Perfect Scrollbar处理
 */
declare function shouldPreventPropagation(
  container: HTMLElement,
  deltaX: number,
  deltaY: number
): boolean;

/**
 * 检查滚动是否到达边界
 * 
 * 判断是否应该阻止事件传播的核心逻辑：
 * - 垂直方向：已到顶部且向上滚，或已到底部且向下滚
 * - 水平方向：已到左侧且向左滚，或已到右侧且向右滚
 * 
 * @param instance - Perfect Scrollbar实例
 * @param container - 滚动容器元素
 * @param deltaX - 水平滚动增量
 * @param deltaY - 垂直滚动增量
 * @returns true表示未到边界可以继续滚动，false表示到达边界应传播事件
 */
declare function isScrollable(
  instance: PerfectScrollbarInstance,
  container: HTMLElement,
  deltaX: number,
  deltaY: number
): boolean;

/**
 * 更新滚动位置（假设的工具函数）
 * 
 * @param element - 目标元素
 * @param axis - 滚动轴（'top' | 'left'）
 * @param value - 新的滚动位置
 */
declare function updateScroll(
  element: HTMLElement,
  axis: 'top' | 'left',
  value: number
): void;

/**
 * 更新滚动条状态（假设的工具函数）
 * 
 * @param element - 滚动容器元素
 */
declare function updateScrollbarState(element: HTMLElement): void;

/**
 * 获取Perfect Scrollbar实例（假设的工具函数）
 * 
 * @param element - 滚动容器元素
 * @returns Perfect Scrollbar实例
 */
declare function getInstance(element: HTMLElement): PerfectScrollbarInstance;

/**
 * 初始化滚轮事件处理器
 * 
 * 为Perfect Scrollbar容器绑定滚轮事件，支持：
 * - 自动检测浏览器支持的事件类型（wheel/mousewheel）
 * - 双轴滚动模式（useBothWheelAxes）
 * - 智能事件传播控制
 * 
 * @param container - 滚动容器元素
 * @param instance - Perfect Scrollbar实例
 */
declare function initializeWheelHandler(
  container: HTMLElement,
  instance: PerfectScrollbarInstance
): void;

/**
 * 默认导出：初始化滚轮处理器的便捷函数
 * 
 * @param element - 滚动容器元素
 * @example
 *