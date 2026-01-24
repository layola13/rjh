/**
 * DOM 元素对齐工具类型定义
 * 提供元素定位、对齐和尺寸计算功能
 */

/**
 * 点坐标接口
 */
export interface Point {
  /** X 坐标（像素） */
  left: number;
  /** Y 坐标（像素） */
  top: number;
}

/**
 * 区域尺寸接口
 */
export interface Region extends Point {
  /** 宽度（像素） */
  width: number;
  /** 高度（像素） */
  height: number;
}

/**
 * 可见矩形区域接口
 */
export interface VisibleRect {
  /** 左边界 */
  left: number;
  /** 右边界 */
  right: number;
  /** 上边界 */
  top: number;
  /** 下边界 */
  bottom: number;
}

/**
 * 溢出调整配置
 */
export interface OverflowConfig {
  /** 是否调整 X 轴位置以防止溢出 */
  adjustX?: boolean;
  /** 是否调整 Y 轴位置以防止溢出 */
  adjustY?: boolean;
  /** 是否根据可视区域调整宽度 */
  resizeWidth?: boolean;
  /** 是否根据可视区域调整高度 */
  resizeHeight?: boolean;
  /** 是否始终基于视口计算溢出 */
  alwaysByViewport?: boolean;
}

/**
 * 对齐配置接口
 */
export interface AlignConfig {
  /**
   * 对齐点配置
   * 格式: [源元素对齐点, 目标元素对齐点]
   * 点位表示法: 
   * - 第一个字符: 't'(top), 'c'(center), 'b'(bottom)
   * - 第二个字符: 'l'(left), 'c'(center), 'r'(right)
   * 例: ['tl', 'bl'] 表示源元素的左上角对齐到目标元素的左下角
   */
  points: [string, string];
  
  /** 源元素相对对齐点的偏移量 [x, y]（像素或百分比） */
  offset?: [number | string, number | string];
  
  /** 目标元素相对对齐点的偏移量 [x, y]（像素或百分比） */
  targetOffset?: [number | string, number | string];
  
  /** 溢出处理配置 */
  overflow?: OverflowConfig;
  
  /** 是否使用 CSS right 属性定位（而非 left） */
  useCssRight?: boolean;
  
  /** 是否使用 CSS bottom 属性定位（而非 top） */
  useCssBottom?: boolean;
  
  /** 是否使用 CSS transform 进行定位 */
  useCssTransform?: boolean;
  
  /** 是否忽略微小抖动（防止循环调整） */
  ignoreShake?: boolean;
  
  /** 目标元素（默认为第二个参数） */
  target?: Element;
  
  /** 源元素（默认为第一个参数） */
  source?: Element;
}

/**
 * 对齐结果接口
 */
export interface AlignResult {
  /** 实际使用的对齐点 */
  points: [string, string];
  /** 实际使用的源元素偏移 */
  offset: [number, number];
  /** 实际使用的目标元素偏移 */
  targetOffset: [number, number];
  /** 溢出调整结果 */
  overflow: {
    /** X 轴是否发生了调整 */
    adjustX: boolean;
    /** Y 轴是否发生了调整 */
    adjustY: boolean;
  };
}

/**
 * 鼠标/触摸事件点位接口
 */
export interface EventPoint {
  /** 页面 X 坐标 */
  pageX?: number;
  /** 页面 Y 坐标 */
  pageY?: number;
  /** 客户区 X 坐标 */
  clientX: number;
  /** 客户区 Y 坐标 */
  clientY: number;
}

/**
 * 将源元素对齐到目标元素
 * @param sourceElement - 要定位的源元素
 * @param targetElement - 目标参考元素
 * @param config - 对齐配置
 * @returns 对齐结果，包含实际使用的对齐参数和溢出信息
 */
export function alignElement(
  sourceElement: Element,
  targetElement: Element,
  config: AlignConfig
): AlignResult;

/**
 * 将元素对齐到指定坐标点
 * @param element - 要定位的元素
 * @param point - 目标坐标点（支持鼠标事件对象）
 * @param config - 对齐配置
 * @returns 对齐结果
 */
export function alignPoint(
  element: Element,
  point: EventPoint,
  config: AlignConfig
): AlignResult;

/**
 * DOM 工具类接口
 */
export interface DomUtils {
  /** 获取窗口对象 */
  getWindow(element: Element | Window | Document): Window;
  
  /** 获取文档对象 */
  getDocument(element: Element | Window | Document): Document;
  
  /** 获取或设置元素偏移位置 */
  offset(element: Element, position?: Point, options?: Partial<AlignConfig>): Point;
  
  /** 判断是否为 Window 对象 */
  isWindow(obj: unknown): obj is Window;
  
  /** 遍历数组或类数组对象 */
  each<T>(array: ArrayLike<T>, callback: (item: T, index: number) => void): void;
  
  /** 获取或设置元素 CSS 样式 */
  css(element: Element, property: string): string;
  css(element: Element, property: string, value: string | number): void;
  css(element: Element, properties: Record<string, string | number>): void;
  
  /** 克隆对象 */
  clone<T extends object>(obj: T): T;
  
  /** 混合对象属性 */
  mix<T extends object, U extends object>(target: T, source: U): T & U;
  
  /** 合并多个对象 */
  merge<T extends object[]>(...objects: T): object;
  
  /** 获取窗口水平滚动距离 */
  getWindowScrollLeft(window: Window): number;
  
  /** 获取窗口垂直滚动距离 */
  getWindowScrollTop(window: Window): number;
  
  /** 获取视口宽度 */
  viewportWidth(window: Window): number;
  
  /** 获取视口高度 */
  viewportHeight(window: Window): number;
  
  /** 获取或设置元素宽度（不含 padding/border） */
  width(element: Element, value?: number): number;
  
  /** 获取或设置元素高度（不含 padding/border） */
  height(element: Element, value?: number): number;
  
  /** 获取元素外部宽度（含 padding/border，可选 margin） */
  outerWidth(element: Element, includeMargin?: boolean): number;
  
  /** 获取元素外部高度（含 padding/border，可选 margin） */
  outerHeight(element: Element, includeMargin?: boolean): number;
  
  /** 获取文档完整宽度 */
  docWidth(document: Document): number;
  
  /** 获取文档完整高度 */
  docHeight(document: Document): number;
  
  /** 获取父元素 */
  getParent(element: Element): Element | null;
}

/**
 * 内部辅助函数：获取定位父元素
 * @internal
 */
export function __getOffsetParent(element: Element): Element | null;

/**
 * 内部辅助函数：获取元素的可见矩形区域
 * @internal
 */
export function __getVisibleRectForElement(
  element: Element,
  alwaysByViewport?: boolean
): VisibleRect | null;

/**
 * 默认导出的对齐函数
 */
declare const alignElementDefault: typeof alignElement & {
  __getOffsetParent: typeof __getOffsetParent;
  __getVisibleRectForElement: typeof __getVisibleRectForElement;
};

export default alignElementDefault;