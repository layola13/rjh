/**
 * Module: module_show
 * Original ID: show
 */

/**
 * SVG元素或DOM元素的接口
 */
interface Element {
  /**
   * 设置或获取元素的"show"属性
   * @param value - 要设置的属性值
   * @param namespace - XML命名空间（如xlink）
   * @returns 返回当前元素实例以支持链式调用
   */
  show(value: string | number | boolean): this;
}

/**
 * 通用属性设置方法
 * @param attributeName - 属性名称
 * @param value - 属性值
 * @param namespace - 可选的XML命名空间
 * @returns 返回当前实例
 */
declare function attr(
  attributeName: string,
  value: string | number | boolean,
  namespace?: string
): Element;