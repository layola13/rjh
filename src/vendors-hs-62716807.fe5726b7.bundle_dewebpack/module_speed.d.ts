/**
 * 速度测量点记录方法类型定义
 * @module module_speed
 * @description 用于记录页面性能关键时间点（s0-s10）
 */

/**
 * 速度测量缓存对象
 */
interface SpeedCache {
  /** 起始时间戳 */
  begin: number;
  /** 页面信息（可选） */
  page?: unknown;
  /** 动态测量点，s0-s10 对应的时间值 */
  [key: `s${number}`]: number;
}

/**
 * 配置获取方法
 */
type GetConfigMethod = (key: string) => unknown;

/**
 * 获取页面信息方法
 */
type GetPageMethod = (includeUrl: boolean) => unknown;

/**
 * 日志记录方法
 */
type LogMethod = (eventType: string, data: SpeedCache | null) => void;

/**
 * 速度测量上下文接口
 */
interface SpeedContext {
  /** 获取配置项 */
  getConfig: GetConfigMethod;
  /** 起始时间（私有） */
  _startTime?: number;
  /** 速度缓存 */
  speedCache?: SpeedCache | null;
  /** 速度计时器 */
  speedTimmer?: ReturnType<typeof setTimeout>;
  /** 获取页面信息 */
  getPage: GetPageMethod;
  /** 日志记录方法（私有） */
  _lg: LogMethod;
}

/**
 * 记录速度测量点
 * 
 * @param point - 测量点标识，格式为 s0-s10
 * @param value - 时间值（毫秒）。如果未提供或为非数字，则使用当前时间；如果大于等于起始时间，则计算差值；否则直接使用该值
 * @param shouldAutoReport - 是否自动上报。默认为 false，5秒后自动上报并包含页面信息
 * @returns 返回当前上下文以支持链式调用
 * 
 * @example
 * recordSpeed('s1', Date.now()); // 记录 s1 时间点
 * recordSpeed('s2'); // 记录 s2 时间点，使用当前时间
 * recordSpeed('s3', 1000, true); // 记录 s3 并立即上报，不等待
 */
declare function recordSpeed(
  this: SpeedContext,
  point: string,
  value?: number,
  shouldAutoReport?: boolean
): SpeedContext;