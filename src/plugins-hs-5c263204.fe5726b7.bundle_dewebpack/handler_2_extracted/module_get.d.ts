/**
 * Module: module_get
 * Original ID: get
 */

/**
 * 检查是否处于自定义引导状态
 * @returns 如果当前在自定义引导中返回 true，否则返回 false
 */
declare function isInCustomGuide(): boolean;

export default isInCustomGuide;

// 或者如果这是某个类的方法：
/**
 * 表示具有自定义引导功能的对象
 */
export interface CustomGuideAware {
  /**
   * 私有字段：自定义引导状态
   * @internal
   */
  _isInCustomGuide: boolean;

  /**
   * 获取当前是否处于自定义引导状态
   * @returns 自定义引导状态
   */
  get(): boolean;
}

declare const moduleGet: CustomGuideAware;
export default moduleGet;