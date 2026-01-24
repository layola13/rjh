/**
 * 2D曲线基类
 * 
 * 表示二维空间中的曲线抽象接口，提供曲线的基本属性和行为定义。
 * 所有具体的2D曲线类型应继承此基类并实现相应的方法。
 * 
 * @module Curve2d
 */

/**
 * 2D曲线类
 * 
 * @class Curve2d
 * @description 定义二维曲线的基础结构和行为
 */
export class Curve2d {
  /**
   * 判断曲线是否为闭合曲线
   * 
   * @returns {boolean} 如果曲线首尾相连则返回 true，否则返回 false
   * 
   * @example
   *