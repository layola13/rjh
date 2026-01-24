/**
 * 在全局对象上定义属性的工具函数
 * 尝试使用 Object.defineProperty 定义可配置、可写的属性，失败时回退到直接赋值
 */

/**
 * 在全局对象上安全地定义一个属性
 * @param propertyName - 要定义的属性名称
 * @param propertyValue - 要设置的属性值
 * @returns 返回设置的属性值
 * @template T - 属性值的类型
 */
export function defineGlobalProperty<T>(
  propertyName: string,
  propertyValue: T
): T;

/**
 * 全局对象的类型定义
 * 通常是 window (浏览器) 或 global (Node.js)
 */
declare const globalObject: Record<string, unknown>;