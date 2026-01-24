/**
 * Module: module_use
 * 创建并添加一个 <use> 元素到 SVG 容器中
 * 
 * @param element - 要引用的元素或元素ID
 * @param file - 可选的外部SVG文件路径
 * @returns 返回包含新创建的 use 元素的容器，支持链式调用
 */
declare function use(
  element: string | Element,
  file?: string
): Use;

/**
 * Use 元素类
 * 表示 SVG <use> 元素，用于复用其他元素
 */
declare class Use {
  /**
   * 设置要引用的元素
   * @param element - 元素引用或ID
   * @param file - 可选的外部文件路径
   */
  element(element: string | Element, file?: string): this;
}

/**
 * 容器接口扩展
 * 为 SVG 容器类添加 use 方法
 */
interface Container {
  /**
   * 创建一个 use 元素
   * @param element - 要引用的元素或元素ID
   * @param file - 可选的外部SVG文件路径
   */
  use(element: string | Element, file?: string): Use;
  
  /**
   * 添加元素到容器
   * @internal
   */
  put(element: Use): Use;
}