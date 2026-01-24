/**
 * SVG元素半径属性设置方法
 * 
 * @module module_rx
 * @description 用于设置SVG元素(如圆形)的半径(r)属性
 */

/**
 * 表示具有半径属性的SVG元素接口
 */
interface SVGRadiusElement {
  /**
   * 设置SVG元素的半径属性
   * 
   * @param radius - 半径值，可以是数字或字符串
   *                 - 数字: 表示像素值
   *                 - 字符串: 支持CSS单位(如 "50%", "10px", "2em")
   * @returns 返回当前元素实例，支持链式调用
   * 
   * @example
   *