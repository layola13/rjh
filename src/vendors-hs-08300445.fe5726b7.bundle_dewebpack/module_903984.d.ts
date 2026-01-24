/**
 * DOM 样式操作工具模块
 * 提供获取和设置元素样式、尺寸、位置等功能
 */

/**
 * 尺寸信息接口
 */
export interface Size {
  /** 宽度（像素） */
  width: number;
  /** 高度（像素） */
  height: number;
}

/**
 * 位置信息接口
 */
export interface Offset {
  /** 相对于文档左侧的偏移量（像素） */
  left: number;
  /** 相对于文档顶部的偏移量（像素） */
  top: number;
}

/**
 * 滚动位置接口
 */
export interface ScrollPosition {
  /** 水平滚动距离（像素） */
  scrollLeft: number;
  /** 垂直滚动距离（像素） */
  scrollTop: number;
}

/**
 * 样式属性值类型
 */
export type StyleValue = string | number;

/**
 * 样式对象类型
 */
export type StyleObject = Partial<Record<keyof CSSStyleDeclaration, StyleValue>>;

/**
 * 获取元素的计算样式值
 * @param element - 目标 DOM 元素
 * @returns 计算后的样式对象
 */
export function get(element: HTMLElement): CSSStyleDeclaration;

/**
 * 获取元素指定属性的计算样式值
 * @param element - 目标 DOM 元素
 * @param propertyName - CSS 属性名称
 * @returns 属性值（数值型属性返回 number，其他返回 string）
 */
export function get(element: HTMLElement, propertyName: string): string | number;

/**
 * 设置元素的单个样式属性
 * @param element - 目标 DOM 元素
 * @param propertyName - CSS 属性名称
 * @param value - 属性值
 * @returns 设置的属性值
 */
export function set(element: HTMLElement, propertyName: string, value: StyleValue): StyleValue;

/**
 * 批量设置元素的样式属性
 * @param element - 目标 DOM 元素
 * @param styles - 样式对象
 * @returns 计算后的样式对象
 */
export function set(element: HTMLElement, styles: StyleObject): CSSStyleDeclaration;

/**
 * 获取浏览器视口尺寸
 * @returns 包含宽度和高度的对象
 */
export function getClientSize(): Size;

/**
 * 获取文档完整尺寸（包含滚动区域）
 * @returns 包含宽度和高度的对象
 */
export function getDocSize(): Size;

/**
 * 获取元素相对于文档的偏移位置
 * @param element - 目标 DOM 元素
 * @returns 包含 left 和 top 坐标的对象
 */
export function getOffset(element: HTMLElement): Offset;

/**
 * 获取元素的外部高度（包含边框）
 * @param element - 目标 DOM 元素（body 元素返回视口高度）
 * @returns 高度值（像素）
 */
export function getOuterHeight(element: HTMLElement): number;

/**
 * 获取元素的外部宽度（包含边框）
 * @param element - 目标 DOM 元素（body 元素返回视口宽度）
 * @returns 宽度值（像素）
 */
export function getOuterWidth(element: HTMLElement): number;

/**
 * 获取文档当前滚动位置
 * @returns 包含水平和垂直滚动距离的对象
 */
export function getScroll(): ScrollPosition;