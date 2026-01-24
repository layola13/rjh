/**
 * Webpack动态上下文模块 - Moment.js语言包加载器
 * 
 * 此模块提供了一个动态require上下文，用于按需加载moment.js的各种语言包。
 * 它映射了语言代码（如 "zh-cn", "en-us"）到对应的webpack模块ID。
 */

/**
 * 语言包模块ID映射表
 * 键：语言包路径（相对路径，带或不带.js扩展名）
 * 值：webpack模块ID（字符串形式的十六进制数字）
 */
export interface LocaleModuleMap {
  readonly [key: string]: string;
}

/**
 * 动态上下文加载函数
 * 
 * @param localePath - 语言包的相对路径（例如："./zh-cn" 或 "./zh-cn.js"）
 * @returns 加载的语言包模块
 * @throws {Error} 当请求的语言包路径不存在时抛出 MODULE_NOT_FOUND 错误
 * 
 * @example
 *