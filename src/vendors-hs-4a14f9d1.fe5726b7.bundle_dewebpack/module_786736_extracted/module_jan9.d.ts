/**
 * 全局对象获取模块
 * 
 * 该模块用于安全地获取全局对象的引用，兼容多种JavaScript运行环境：
 * - 浏览器环境：返回 window
 * - Node.js环境：返回 global
 * - Web Workers：返回 self
 * - 其他环境：尝试返回 this 或通过 Function 构造函数获取
 * 
 * @module GlobalObjectResolver
 */

/**
 * 获取当前JavaScript运行环境的全局对象
 * 
 * 优先级策略：
 * 1. 尝试直接获取函数上下文中的 this（非严格模式）
 * 2. 使用 Function 构造函数创建函数并执行以获取全局对象
 * 3. 回退到浏览器环境的 window 对象
 * 
 * @returns {typeof globalThis} 全局对象引用
 * 
 * @example
 *