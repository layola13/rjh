/**
 * 监听事件对象接口
 * 用于创建事件监听器的配置结构
 */
export interface ListenEvent<TSignal = unknown, TListener = unknown> {
  /**
   * 获取监听信号的函数
   */
  getListenSignal: TSignal;
  
  /**
   * 监听器函数
   */
  listen: TListener;
}

/**
 * 日志数据对象接口
 * 用于记录和传输日志信息的完整数据结构
 */
export interface LogData<TParams = Record<string, unknown>> {
  /**
   * 日志名称/标识符
   */
  name: string;
  
  /**
   * 日志参数对象
   */
  params: TParams;
  
  /**
   * 是否立即发送日志
   */
  sendNow: boolean;
  
  /**
   * 触发类型标识
   */
  triggerType: string | number;
  
  /**
   * 是否启用注释/备注功能
   */
  enableNotes: boolean;
  
  /**
   * 结束时的参数回调函数
   */
  endParamsCallback: (() => void) | null | undefined;
  
  /**
   * 当前时间戳
   */
  currentTime: number;
  
  /**
   * 性能计时的当前时间
   */
  performanceCurrentTime: number;
}

/**
 * 创建监听事件对象
 * @param getListenSignal - 获取监听信号的函数或值
 * @param listen - 监听器函数或值
 * @returns 监听事件配置对象
 */
export function createListenEvent<TSignal = unknown, TListener = unknown>(
  getListenSignal: TSignal,
  listen: TListener
): ListenEvent<TSignal, TListener>;

/**
 * 创建日志数据对象
 * @param name - 日志名称
 * @param params - 日志参数
 * @param sendNow - 是否立即发送
 * @param triggerType - 触发类型
 * @param enableNotes - 是否启用注释
 * @param endParamsCallback - 结束参数回调函数
 * @param currentTime - 当前时间戳
 * @param performanceCurrentTime - 性能计时时间戳
 * @returns 日志数据对象
 */
export function createLogData<TParams = Record<string, unknown>>(
  name: string,
  params: TParams,
  sendNow: boolean,
  triggerType: string | number,
  enableNotes: boolean,
  endParamsCallback: (() => void) | null | undefined,
  currentTime: number,
  performanceCurrentTime: number
): LogData<TParams>;