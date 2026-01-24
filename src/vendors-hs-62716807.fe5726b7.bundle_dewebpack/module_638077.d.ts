/**
 * V8 引擎版本检测模块
 * 
 * 该模块用于检测当前运行环境的 V8 引擎版本号。
 * 支持 Node.js、Deno 和浏览器环境（通过 User Agent 检测）。
 * 
 * @module V8EngineVersion
 */

/**
 * 全局进程对象（Node.js 环境）
 */
interface Process {
  versions?: {
    v8?: string;
    [key: string]: string | undefined;
  };
}

/**
 * Deno 全局对象
 */
interface DenoNamespace {
  version?: {
    v8?: string;
    [key: string]: string | undefined;
  };
}

/**
 * 全局对象扩展（用于环境检测）
 */
interface Global {
  process?: Process;
  Deno?: DenoNamespace;
}

/**
 * 获取当前环境的 V8 引擎版本号
 * 
 * 版本号计算规则：
 * - V8 版本格式为 "major.minor.build.patch"
 * - 当 major > 0 且 major < 4 时，返回 1
 * - 否则返回 major 和 minor 拼接的数字（如 "9.1" -> 91）
 * - 如果无法从进程信息获取，则尝试从 User Agent 中解析 Chrome/Edge 版本
 * 
 * @returns V8 引擎版本号，如果无法检测则返回 undefined
 * 
 * @example
 * // Node.js 环境，V8 版本 9.1.269.38
 * // 返回: 91
 * 
 * @example
 * // 浏览器环境，Chrome 96
 * // 返回: 96
 */
declare const v8EngineVersion: number | undefined;

export = v8EngineVersion;