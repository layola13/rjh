/**
 * SVG.js Lines Module
 * 用于获取文本元素中的所有行（<tspan>元素）
 */

/**
 * SVG元素基础接口
 */
interface SVGElement extends Element {
  childNodes: NodeListOf<Node>;
}

/**
 * SVG.js采纳的元素包装器
 * 提供链式API和增强功能
 */
interface SVGAdoptedElement {
  node: SVGElement;
}

/**
 * SVG.js集合类
 * 用于管理多个SVG元素的集合
 */
declare class Set<T = SVGAdoptedElement> {
  constructor(elements: T[]);
}

/**
 * 文本路径接口
 * 表示SVG <textPath> 元素
 */
interface TextPath {
  node: SVGElement;
}

/**
 * SVG.js工具函数命名空间
 */
declare namespace utils {
  /**
   * 过滤出SVG元素（排除文本节点、注释等）
   * @param nodes - DOM节点列表
   * @returns 过滤后的SVG元素数组
   */
  function filterSVGElements(nodes: NodeListOf<Node>): SVGElement[];

  /**
   * 映射数组元素
   * @param array - 源数组
   * @param callback - 转换函数
   * @returns 转换后的新数组
   */
  function map<T, R>(array: T[], callback: (item: T) => R): R[];
}

/**
 * SVG.js核心命名空间
 */
declare namespace n {
  export { utils };

  /**
   * 将原生SVG元素包装为SVG.js增强元素
   * @param element - 原生SVG DOM元素
   * @returns SVG.js包装后的元素
   */
  export function adopt(element: SVGElement): SVGAdoptedElement;

  export { Set };
}

/**
 * 文本元素接口
 * 支持textPath和lines方法
 */
interface SVGTextElement {
  node: SVGElement;
  
  /**
   * 获取文本路径元素（如果存在）
   * @returns 文本路径对象或undefined
   */
  textPath?(): TextPath | undefined;
  
  /**
   * 获取文本中的所有行元素
   * 返回包含所有<tspan>子元素的集合
   * @returns SVG.js元素集合
   */
  lines(): Set<SVGAdoptedElement>;
}

/**
 * Lines模块实现
 * 获取文本或文本路径中的所有行（tspan元素）
 * 
 * @this {SVGTextElement} - 文本元素实例
 * @returns {Set<SVGAdoptedElement>} 包含所有行元素的集合
 * 
 * @example
 * const text = SVG('text').text('Line 1\nLine 2');
 * const lines = text.lines(); // 返回包含2个tspan元素的Set
 */
declare function lines(this: SVGTextElement): Set<SVGAdoptedElement>;