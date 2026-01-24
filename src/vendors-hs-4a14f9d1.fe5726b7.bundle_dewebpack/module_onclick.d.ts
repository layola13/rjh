/**
 * onClick 模块
 * 处理点击事件的回调函数
 * 
 * @module module_onClick
 */

/**
 * 点击事件处理器
 * 
 * @param event - 事件对象或事件相关数据
 * @returns 处理后的结果
 */
export declare function onClick<T = MouseEvent>(event: T): unknown;

/**
 * 如果这是一个高阶函数，可能的声明：
 */
// export declare function onClick<T, R>(event: T): R;

/**
 * 如果 A 是配置对象，可能的声明：
 */
// export declare function onClick<T>(
//   event: T,
//   config?: ClickHandlerConfig
// ): void | Promise<void>;

// interface ClickHandlerConfig {
//   preventDefault?: boolean;
//   stopPropagation?: boolean;
//   [key: string]: unknown;
// }