/**
 * Module: module_enforce
 * 
 * Enforces某种规则或约束的模块
 * 根据输入条件执行不同的处理逻辑
 */

/**
 * 主要的enforce函数
 * 
 * @param e - 输入参数，需要被enforce处理的对象或值
 * @returns 处理后的结果
 * 
 * @remarks
 * 该函数会先通过条件检查（r函数）判断输入，
 * 如果满足条件则执行n处理，否则执行i处理
 */
declare function enforce<T = unknown>(e: T): unknown;

/**
 * 条件检查函数
 * @param value - 待检查的值
 * @returns 是否满足特定条件
 */
declare function r<T>(value: T): boolean;

/**
 * 满足条件时的处理函数
 * @param value - 输入值
 * @returns 处理结果
 */
declare function n<T>(value: T): unknown;

/**
 * 不满足条件时的处理函数
 * @param value - 输入值
 * @param options - 配置选项（当前为空对象）
 * @returns 处理结果
 */
declare function i<T>(value: T, options: Record<string, never>): unknown;

export default enforce;
export { enforce, r as isValid, n as processValid, i as processInvalid };