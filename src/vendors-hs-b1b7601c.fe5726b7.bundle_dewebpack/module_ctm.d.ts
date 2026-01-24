/**
 * SVG元素变换矩阵相关类型定义
 * 模块：module_ctm
 * 原始标识：ctm
 */

/**
 * 表示SVG变换矩阵的类
 */
declare class Matrix {
  /**
   * 构造一个矩阵实例
   * @param domMatrix - 原生DOM矩阵对象
   */
  constructor(domMatrix: DOMMatrix | SVGMatrix);
}

/**
 * 扩展SVG元素的接口，提供获取当前变换矩阵的方法
 */
interface SVGGraphicsElementExtension {
  /**
   * 获取该元素相对于视口的当前变换矩阵（CTM）
   * 
   * @returns 返回封装的Matrix实例，包含当前元素从用户空间到视口坐标的变换信息
   * 
   * @remarks
   * - CTM（Current Transformation Matrix）描述了元素如何从其用户空间映射到视口坐标系
   * - 包括所有父元素的变换累积效果
   * - 调用原生SVGGraphicsElement.getCTM()方法获取底层矩阵
   * 
   * @example
   *