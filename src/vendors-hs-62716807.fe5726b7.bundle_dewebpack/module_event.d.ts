/**
 * 事件追踪模块
 * 用于记录和上报用户行为事件
 */

/**
 * 事件数据接口
 * 定义了可追踪事件的完整数据结构
 */
interface EventData {
  /** 事件唯一标识键 */
  key: string;
  /** 事件是否成功执行 */
  success?: boolean;
  /** 事件发生时间戳 */
  time?: number;
  /** 自定义参数1 */
  c1?: string;
  /** 自定义参数2 */
  c2?: string;
  /** 自定义参数3 */
  c3?: string;
  /** 其他扩展字段 */
  [key: string]: unknown;
}

/**
 * 标准化后的事件数据
 * success字段被转换为数值类型(0或1)
 */
interface NormalizedEventData {
  key: string;
  success: 0 | 1;
  time?: number;
  c1?: string;
  c2?: string;
  c3?: string;
}

/**
 * 事件追踪选项配置
 */
interface EventOptions {
  /** 是否立即发送 */
  immediate?: boolean;
  /** 自定义回调 */
  callback?: () => void;
  [key: string]: unknown;
}

/**
 * 事件追踪类声明
 */
declare class EventTracker {
  /**
   * 记录事件日志
   * @param eventType - 事件类型标识
   * @param data - 事件数据
   * @param options - 可选配置参数
   */
  private _lg(eventType: string, data: NormalizedEventData, options?: EventOptions): void;

  /**
   * 追踪并上报事件
   * @param eventData - 原始事件数据，必须包含key字段
   * @param options - 可选配置参数
   */
  trackEvent(eventData: EventData, options?: EventOptions): void;
}

export type { EventData, NormalizedEventData, EventOptions };
export { EventTracker };