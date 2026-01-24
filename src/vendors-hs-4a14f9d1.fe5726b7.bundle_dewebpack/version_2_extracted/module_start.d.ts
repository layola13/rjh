/**
 * 获取起始位置/值
 * @module module_start
 * @returns 返回内部存储的起始值
 */
declare function getStart<T = unknown>(): T;

/**
 * 或者如果这是类方法的声明：
 */
declare class ModuleStart<T = unknown> {
  /**
   * 私有属性：存储起始值
   */
  private _start: T;

  /**
   * 获取起始位置/值
   * @returns 返回内部存储的起始值
   */
  start(): T;
}