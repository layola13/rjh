/**
 * Module: module_pre
 * Original ID: pre
 * 
 * 异步预处理模块，用于执行异步操作并返回处理结果
 */

/**
 * 执行预处理操作
 * 
 * @param event - 事件对象，包含需要处理的下一步操作信息
 * @returns Promise，解析为布尔值，指示操作是否成功
 */
declare function pre(event: PreEvent): Promise<boolean>;

/**
 * 预处理事件接口
 */
interface PreEvent {
  /** 下一步操作的引用或标识符 */
  next: unknown;
}

/**
 * 调度下一步操作
 * 
 * @param next - 下一步操作的引用
 */
declare function scheduleNext(next: unknown): void;

/**
 * 延迟指定毫秒数
 * 
 * @param milliseconds - 延迟时长（毫秒）
 * @returns Promise，在指定时间后解析
 */
declare function delay(milliseconds: number): Promise<void>;

export { pre as default, PreEvent, scheduleNext, delay };