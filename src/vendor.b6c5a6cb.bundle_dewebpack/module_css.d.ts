/**
 * CSS 样式操作模块
 * 提供获取和设置元素 CSS 样式的功能
 * @module module_css
 */

/**
 * CSS 属性值映射对象
 * 用于存储多个 CSS 属性及其对应的值
 */
interface CSSPropertyMap {
  [property: string]: string | number | undefined;
}

/**
 * CSS 样式计算选项
 * 用于控制样式获取时的计算行为
 */
interface CSSComputedOptions {
  /** 是否包含伪元素 */
  includePseudo?: boolean;
  /** 其他计算选项 */
  [key: string]: unknown;
}

/**
 * 获取或设置元素的 CSS 样式
 * 
 * @template T - 目标元素类型，默认为 HTMLElement
 * @param element - 目标 DOM 元素
 * @param property - CSS 属性名或属性名数组
 * @param value - 可选的属性值，传入时表示设置样式
 * @returns 
 *   - 当 property 为数组时：返回属性名到值的映射对象
 *   - 当提供 value 时：执行样式设置操作
 *   - 当仅提供 property 时：返回该属性的计算值
 * 
 * @example
 * // 获取单个样式
 * const color = css(element, 'color');
 * 
 * @example
 * // 获取多个样式
 * const styles = css(element, ['width', 'height']);
 * // 返回: { width: '100px', height: '50px' }
 * 
 * @example
 * // 设置样式
 * css(element, 'display', 'none');
 */
declare function css<T extends Element = HTMLElement>(
  element: T,
  property: string,
  value: string | number
): void;

declare function css<T extends Element = HTMLElement>(
  element: T,
  property: string
): string | undefined;

declare function css<T extends Element = HTMLElement>(
  element: T,
  property: string[]
): CSSPropertyMap;

/**
 * 工具对象 b，包含 CSS 相关的底层操作方法
 */
declare namespace b {
  /**
   * 获取元素的 CSS 属性值
   * 
   * @param element - 目标元素
   * @param property - CSS 属性名
   * @param raw - 是否返回原始值（不进行单位转换）
   * @param computed - 计算样式的选项
   * @returns CSS 属性的计算值
   */
  function css<T extends Element = HTMLElement>(
    element: T,
    property: string,
    raw: boolean,
    computed: CSSComputedOptions
  ): string | number | undefined;

  /**
   * 设置元素的样式属性
   * 
   * @param element - 目标元素
   * @param property - CSS 属性名
   * @param value - CSS 属性值
   */
  function style<T extends Element = HTMLElement>(
    element: T,
    property: string,
    value: string | number
  ): void;
}

/**
 * 获取元素的计算样式选项
 * 内部辅助函数，用于生成样式计算所需的配置
 * 
 * @param element - 目标元素
 * @returns 计算样式的配置对象
 */
declare function Ht<T extends Element = HTMLElement>(
  element: T
): CSSComputedOptions;

/**
 * 高阶函数 Y
 * 用于包装和执行带有上下文的函数
 * 
 * @param context - 执行上下文（通常是 this）
 * @param callback - 要执行的回调函数
 * @returns 回调函数的执行结果
 */
declare function Y<TContext, TArgs extends unknown[], TResult>(
  context: TContext,
  callback: (...args: TArgs) => TResult
): TResult;