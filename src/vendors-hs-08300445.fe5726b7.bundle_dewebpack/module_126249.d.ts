/**
 * 点击位置坐标接口
 */
interface Point {
  /** 相对于页面的X坐标 */
  pageX?: number;
  /** 相对于页面的Y坐标 */
  pageY?: number;
  /** 相对于视口的X坐标 */
  clientX?: number;
  /** 相对于视口的Y坐标 */
  clientY?: number;
}

/**
 * 元素尺寸信息
 */
interface ElementSize {
  /** 元素宽度（向下取整） */
  width: number;
  /** 元素高度（向下取整） */
  height: number;
}

/**
 * 尺寸变化回调函数类型
 */
type ResizeCallback = (size: ElementSize) => void;

/**
 * 取消监听函数类型
 */
type UnobserveFunction = () => void;

/**
 * 比较两个点是否为同一位置
 * 
 * @param point1 - 第一个点的坐标
 * @param point2 - 第二个点的坐标
 * @returns 如果两个点位置相同则返回true，否则返回false
 * 
 * @remarks
 * 优先比较pageX/pageY，如果不存在则比较clientX/clientY
 */
export function isSamePoint(point1: Point | null | undefined, point2: Point | null | undefined): boolean;

/**
 * 监听元素尺寸变化
 * 
 * @param element - 要监听的DOM元素
 * @param callback - 尺寸变化时的回调函数
 * @returns 返回一个函数，调用后停止监听
 * 
 * @remarks
 * 使用ResizeObserver API实现，仅在元素尺寸真正变化时触发回调
 * 回调在Promise.resolve()后异步执行
 */
export function monitorResize(element: Element | null | undefined, callback: ResizeCallback): UnobserveFunction;

/**
 * 恢复元素焦点
 * 
 * @param element - 需要恢复焦点的元素
 * @param container - 容器元素，用于验证element是否在其内部
 * 
 * @remarks
 * 仅在以下条件全部满足时恢复焦点：
 * - element不是当前活动元素
 * - element在container内部
 * - element具有focus方法
 */
export function restoreFocus(element: HTMLElement, container: Element): void;