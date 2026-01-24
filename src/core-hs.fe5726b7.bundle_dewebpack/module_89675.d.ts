/**
 * V8 JavaScript 引擎版本检测模块
 * 
 * 该模块用于检测当前运行环境中 V8 引擎的版本号。
 * 支持 Node.js、Deno 和浏览器环境（通过 User-Agent 检测 Chrome/Edge）。
 * 
 * @module V8VersionDetector
 */

/**
 * 进程信息接口（Node.js 环境）
 */
interface Process {
  versions?: {
    v8?: string;
    [key: string]: string | undefined;
  };
}

/**
 * Deno 运行时信息接口
 */
interface DenoNamespace {
  version?: {
    v8?: string;
    [key: string]: string | undefined;
  };
}

/**
 * 全局运行时环境接口
 */
interface RuntimeEnvironment {
  process?: Process;
  Deno?: DenoNamespace;
}

/**
 * 当前运行环境的 V8 引擎版本号
 * 
 * 版本号计算规则：
 * - V8 主版本为 1-3：返回 1
 * - V8 主版本 >= 4：返回主版本号和次版本号的组合（例如：91 表示 9.1）
 * - 浏览器环境：从 User-Agent 的 Chrome 版本号推断
 * - 无法检测时：返回 0 或 undefined
 * 
 * @example
 * // Node.js 环境，V8 9.1.269
 * v8Version // 91
 * 
 * @example
 * // Chrome 浏览器版本 96
 * v8Version // 96
 */
declare const v8Version: number | undefined;

export default v8Version;