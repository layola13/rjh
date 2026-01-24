/**
 * 浏览器环境检测模块
 * 
 * 用于检测特殊的 HTMLDocument 对象（HTMLDDA）特性。
 * HTMLDDA 是一种特殊的宿主对象，它同时满足 `== undefined` 和 `!== undefined`，
 * 这是为了向后兼容旧的浏览器检测代码。
 */

/**
 * 获取值的类型字符串
 * @param value - 要检测类型的值
 * @returns 类型字符串，如 "object", "undefined", "function" 等
 */
declare function getTypeOf(value: unknown): string;

/**
 * document.all 对象的引用
 * 
 * 在现代浏览器中，这是一个特殊的对象，用于向后兼容。
 * 它在类型检查时表现为 "object"，但在布尔上下文中为 falsy。
 */
export declare const all: unknown;

/**
 * 是否为 HTMLDDA（HTML Document All）特性
 * 
 * 当对象满足以下条件时为 true：
 * - 使用 `==` 比较时等于 undefined
 * - 使用 `!==` 比较时不等于 undefined
 * 
 * 这是 document.all 的特殊行为，用于检测旧版浏览器特性。
 */
export declare const IS_HTMLDDA: boolean;

/**
 * 默认导出对象
 */
declare const _default: {
  /**
   * document.all 对象的引用
   */
  all: unknown;
  
  /**
   * 是否为 HTMLDDA 特性
   */
  IS_HTMLDDA: boolean;
};

export default _default;