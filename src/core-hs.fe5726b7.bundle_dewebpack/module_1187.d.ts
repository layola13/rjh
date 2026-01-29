/**
 * WebKit 版本检测模块
 * 
 * 该模块用于检测当前浏览器是否使用 WebKit 引擎，并提取其版本号。
 * 通过解析 User-Agent 字符串中的 "AppleWebKit/[版本]." 模式来实现检测。
 * 
 * @module WebKitVersionDetector
 * @example
 * ```typescript
 * const webkitVersion = detectWebKitVersion();
 * 
 * if (webkitVersion) {
 *   console.log(`WebKit version: ${webkitVersion}`);
 *   // Example output: "WebKit version: 537.36"
 * } else {
 *   console.log('Not a WebKit-based browser');
 * }
 * 
 * // User-Agent example: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
 * // Extracted version: "537.36"
 * ```
 */

/**
 * 检测当前浏览器的 WebKit 版本号
 * 
 * @returns WebKit 版本号字符串，如果不是 WebKit 浏览器则返回 null
 */
declare function detectWebKitVersion(): string | null;

export default detectWebKitVersion;