/**
 * Deno 运行时环境检测模块
 * 
 * 用于检测当前代码是否运行在 Deno 环境中。
 * 通过验证全局 Deno 对象及其 version 属性的存在性来判断。
 * 
 * @module DenoDetection
 */

/**
 * 类型检测函数的类型定义
 * 用于获取值的类型字符串（如 "object", "string" 等）
 */
type TypeOfFunction = (value: unknown) => string;

/**
 * Deno 版本信息接口
 */
interface DenoVersion {
  /** Deno 核心版本号 */
  deno: string;
  /** V8 引擎版本号 */
  v8: string;
  /** TypeScript 版本号 */
  typescript: string;
}

/**
 * Deno 全局对象接口（部分定义）
 */
interface DenoNamespace {
  /** Deno 版本信息 */
  version: DenoVersion;
  [key: string]: unknown;
}

/**
 * 全局作用域扩展（用于类型检查）
 */
declare global {
  const Deno: DenoNamespace | undefined;
}

/**
 * 检测当前环境是否为 Deno 运行时
 * 
 * 该函数通过以下条件判断：
 * 1. 全局 Deno 对象存在且类型为 "object"
 * 2. Deno.version 属性存在且类型为 "object"
 * 
 * @returns {boolean} 如果运行在 Deno 环境中返回 true，否则返回 false
 */
declare const isDenoEnvironment: boolean;

export = isDenoEnvironment;