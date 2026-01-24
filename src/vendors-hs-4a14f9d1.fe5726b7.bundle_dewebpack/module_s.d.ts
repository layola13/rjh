/**
 * 模块 module_s 的类型声明
 * @module module_s
 */

/**
 * 执行函数调用
 * @remarks
 * 此函数调用 g 方法并将 A 作为上下文（this）
 * 需要更多上下文来确定准确的类型签名
 */
declare function unknownFunction(): void;

/**
 * 全局函数或方法 g
 * @remarks
 * 具体类型取决于实际实现
 */
declare let g: Function;

/**
 * 上下文对象 A
 * @remarks
 * 具体类型取决于实际实现
 */
declare let A: unknown;