/**
 * 图像变换和缩放工具模块
 * 提供坐标计算、尺寸处理、缩放约束等功能
 */

/**
 * 二维坐标点接口
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * 尺寸接口
 */
export interface Dimensions {
  width: number;
  height: number;
}

/**
 * 变换参数接口
 */
export interface Transform {
  /** 顶部偏移量 */
  top: number;
  /** 左侧偏移量 */
  left: number;
  /** 缩放比例 */
  scale: number;
}

/**
 * 最小缩放配置接口
 */
export interface MinScaleConfig {
  containerDimensions: Dimensions;
  imageDimensions: Dimensions;
  minScale: number | 'auto';
}

/**
 * React Ref类型
 */
export type RefCallback<T> = (instance: T | null) => void;
export type RefObject<T> = { current: T | null };
export type Ref<T> = RefCallback<T> | RefObject<T> | null;

/**
 * 将数值限制在指定范围内
 * @param minValue - 最小值
 * @param maxValue - 最大值
 * @param value - 待约束的值
 * @returns 约束后的值，保证在 [minValue, maxValue] 范围内
 */
export function constrain(minValue: number, maxValue: number, value: number): number;

/**
 * 取相反数
 * @param value - 输入值
 * @returns -1 * value
 */
export function negate(value: number): number;

/**
 * 吸附到目标值（当距离小于阈值时）
 * @param currentValue - 当前值
 * @param targetValue - 目标值
 * @param threshold - 吸附阈值
 * @returns 如果当前值与目标值的距离小于阈值，返回目标值；否则返回当前值
 */
export function snapToTarget(currentValue: number, targetValue: number, threshold: number): number;

/**
 * 设置React Ref的值
 * @param ref - React ref对象或回调函数
 * @param value - 要设置的值
 */
export function setRef<T>(ref: Ref<T>, value: T | null): void;

/**
 * 获取鼠标事件相对于容器的位置
 * @param event - 鼠标事件对象
 * @param container - 容器元素
 * @returns 相对坐标点
 */
export function getRelativePosition(event: MouseEvent, container: HTMLElement): Point;

/**
 * 比较两个尺寸对象是否相等
 * @param dimensions1 - 第一个尺寸对象
 * @param dimensions2 - 第二个尺寸对象
 * @returns 如果两个尺寸相等（或都为undefined）返回true
 */
export function isEqualDimensions(
  dimensions1: Dimensions | undefined,
  dimensions2: Dimensions | undefined
): boolean;

/**
 * 获取元素的尺寸
 * @param element - HTML元素
 * @returns 元素的宽度和高度，如果元素为undefined则返回undefined
 */
export function getDimensions(element: HTMLElement | undefined): Dimensions | undefined;

/**
 * 获取容器的父节点尺寸
 * @param element - 子元素
 * @returns 父容器的宽度和高度
 */
export function getContainerDimensions(element: HTMLElement): Dimensions;

/**
 * 比较两个变换对象是否相等（精度：5位小数）
 * @param transform1 - 第一个变换对象
 * @param transform2 - 第二个变换对象
 * @returns 如果两个变换相等（或都为undefined）返回true
 */
export function isEqualTransform(
  transform1: Transform | undefined,
  transform2: Transform | undefined
): boolean;

/**
 * 计算自动适配缩放比例
 * 根据容器尺寸和图像尺寸计算合适的缩放比例，确保图像完整显示在容器内
 * @param containerDimensions - 容器尺寸
 * @param imageDimensions - 图像尺寸（可选）
 * @returns 自动适配的缩放比例（不超过1）
 */
export function getAutofitScale(
  containerDimensions: Dimensions,
  imageDimensions?: Dimensions
): number;

/**
 * 获取最小缩放比例（Memoized Selector）
 * 根据配置返回最小允许的缩放比例
 * - 如果minScale为'auto'，则自动计算适配比例
 * - 否则返回指定的minScale值（默认为1）
 */
export const getMinScale: (config: MinScaleConfig) => number;

/**
 * 尝试取消事件的默认行为
 * @param event - 事件对象
 * @returns 如果成功取消返回true，否则返回false
 */
export function tryCancelEvent(event: Event): boolean;