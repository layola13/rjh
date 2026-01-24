/**
 * 关闭处理函数
 * 停止事件传播并重置状态
 * 
 * @module module_onClose
 * @remarks
 * - 阻止事件冒泡
 * - 调用 re 函数设置状态为 false
 * - 当 J 为 falsy 时，调用 fe 函数并传入 null
 */
declare function onClose(event: Event): void;

/**
 * 状态设置函数（推测）
 */
declare function re(state: boolean): void;

/**
 * 清理/重置函数（推测）
 */
declare function fe(value: null): void;

/**
 * 条件标志（推测）
 */
declare const J: boolean | undefined | null;