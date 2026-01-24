/**
 * 性能监控与错误上报模块
 * 提供统计、错误追踪、API监控、性能分析等功能
 */

/**
 * 统计数据配置接口
 */
interface StatDataConfig {
  /** 统计键，支持group::key格式 */
  key: string;
  /** 子键 */
  subkey?: string;
  /** 统计值 */
  val?: number;
  /** 开始时间戳 */
  begin?: number;
  /** 分组名称 */
  group?: string;
}

/**
 * 错误信息接口
 */
interface ErrorInfo {
  /** 错误名称 */
  name?: string;
  /** 错误消息 */
  message?: string;
  /** 错误堆栈 */
  stack?: string;
  /** 错误原始消息 */
  msg?: string;
  /** 错误对象 */
  error?: Error;
}

/**
 * 错误上报额外参数
 */
interface ErrorReportOptions {
  /** 文件名 */
  filename?: string;
  /** 行号 */
  lineno?: number;
  /** 列号 */
  colno?: number;
  /** 自定义标签 */
  tag?: string;
  /** 自定义字段1 */
  c1?: string;
  /** 自定义字段2 */
  c2?: string;
  /** 自定义字段3 */
  c3?: string;
}

/**
 * API监控配置接口
 */
interface ApiConfig {
  /** API地址 */
  api: string;
  /** 是否成功 */
  success?: boolean;
  /** 请求耗时(ms) */
  time?: number;
  /** 响应码 */
  code?: string | number;
  /** 响应消息 */
  msg?: string;
  /** 请求开始时间 */
  begin?: number;
  /** 追踪ID */
  traceId?: string;
  /** 页面PV ID */
  pv_id?: string;
  /** API快照(失败时保留) */
  apiSnapshot?: unknown;
  /** 域名 */
  domain?: string;
  /** 标记 */
  flag?: number;
  /** 追踪来源 */
  traceOrigin?: string;
}

/**
 * 性能数据接口
 */
interface PerformanceData {
  /** 是否自动发送 */
  autoSend?: boolean;
  /** 自定义时间点t1-t10 */
  t1?: number;
  t2?: number;
  t3?: number;
  t4?: number;
  t5?: number;
  t6?: number;
  t7?: number;
  t8?: number;
  t9?: number;
  t10?: number;
  /** 首次内容绘制时间 */
  cfpt?: number;
  /** 首次交互时间 */
  ctti?: number;
  /** 页面标识 */
  page?: string;
  /** 开始时间 */
  begin?: number;
}

/**
 * 资源加载数据接口
 */
interface ResourceData {
  /** 开始时间 */
  begin: number;
  /** DOM加载时间 */
  dom: number | string;
  /** 页面完全加载时间 */
  load: number | string;
  /** 资源列表 */
  res: Array<unknown>;
  /** 页面URL */
  dl: string;
}

/**
 * 自定义事件接口
 */
interface EventData {
  /** 事件键 */
  key: string;
  /** 是否成功 */
  success?: boolean;
  /** 耗时 */
  time?: number;
  /** 自定义字段1 */
  c1?: string;
  /** 自定义字段2 */
  c2?: string;
  /** 自定义字段3 */
  c3?: string;
}

/**
 * 忽略规则配置
 */
interface IgnoreConfig {
  /** 忽略的错误列表 */
  ignoreErrors?: Array<string | RegExp>;
  /** 忽略的API列表 */
  ignoreApis?: Array<string | RegExp>;
}

/**
 * 上报配置接口
 */
interface ReporterConfig {
  /** 开始时间 */
  startTime?: number | null;
  /** 是否自动发送性能数据 */
  autoSendPerf?: boolean;
  /** 采样率 */
  sample?: number;
  /** 忽略规则 */
  ignore?: IgnoreConfig;
}

/**
 * 性能监控上报器类
 * 继承自基础上报类，提供完整的监控上报能力
 */
declare class Reporter {
  /** 内部开始时间 */
  private _startTime: number;
  
  /** 性能数据缓存 */
  private perfData?: PerformanceData;
  
  /** 是否已发送性能数据 */
  private hasSendPerf?: boolean;
  
  /** 速度测试缓存 */
  private speedCache?: Record<string, unknown>;
  
  /** 速度测试定时器 */
  private speedTimmer?: NodeJS.Timeout;

  /**
   * 构造函数
   * @param config 配置对象
   */
  constructor(config: ReporterConfig);

  /**
   * 求和统计
   * @param key 统计键或配置对象
   * @param value 统计值
   * @param sample 采样率
   * @returns 当前实例
   */
  sum(key: string | StatDataConfig, value?: number, sample?: number): this;

  /**
   * 平均值统计
   * @param key 统计键或配置对象
   * @param value 统计值
   * @param sample 采样率
   * @returns 当前实例
   */
  avg(key: string | StatDataConfig, value?: number, sample?: number): this;

  /**
   * 百分比统计
   * @param key 统计键
   * @param subkey 子键
   * @param value 统计值
   * @param sample 采样率
   * @returns 当前实例
   */
  percent(key: string, subkey: string, value?: number, sample?: number): this;

  /**
   * 消息上报（限制180字符）
   * @param message 消息内容
   * @param sample 采样率
   * @returns 当前实例
   */
  msg(message: string, sample?: number): this | undefined;

  /**
   * 错误上报
   * @param error 错误对象或错误消息
   * @param options 错误选项
   * @returns 当前实例
   */
  error(error: string | Error | ErrorInfo, options?: ErrorReportOptions): this;

  /**
   * 用户行为上报
   * @param behavior 行为数据或行为描述
   * @returns 当前实例
   */
  behavior(behavior: string | { behavior: string; [key: string]: unknown }): this | undefined;

  /**
   * API请求监控
   * @param api API地址或配置对象
   * @param success 是否成功
   * @param time 耗时
   * @param code 响应码
   * @param msg 响应消息
   * @param begin 开始时间
   * @param traceId 追踪ID
   * @param pv_id 页面PV ID
   * @param apiSnapshot API快照
   * @param domain 域名
   * @param flag 标记
   * @param traceOrigin 追踪来源
   * @returns 当前实例
   */
  api(
    api: string | ApiConfig,
    success?: boolean,
    time?: number,
    code?: string | number,
    msg?: string,
    begin?: number,
    traceId?: string,
    pv_id?: string,
    apiSnapshot?: unknown,
    domain?: string,
    flag?: number,
    traceOrigin?: string
  ): this;

  /**
   * 速度测试（支持s0-s10共11个时间点）
   * @param point 测试点标识(s0-s10)
   * @param value 时间值或相对时间戳
   * @param sample 采样率
   * @returns 当前实例
   */
  speed(point: string, value?: number, sample?: number): this;

  /**
   * 性能数据上报
   * @param data 性能数据
   * @returns 当前实例
   */
  performance(data: PerformanceData): this | undefined;

  /**
   * 资源加载数据上报
   * @param data 资源数据
   * @param sample 采样率
   * @returns 当前实例
   */
  resource(data: ResourceData, sample?: number): this;

  /**
   * 自定义事件上报
   * @param event 事件数据
   * @param sample 采样率
   * @returns 当前实例
   */
  event(event: EventData, sample?: number): this | undefined;

  /**
   * 获取配置项
   * @param key 配置键
   * @returns 配置值
   */
  getConfig<K extends keyof ReporterConfig>(key: K): ReporterConfig[K];

  /**
   * 获取当前页面标识
   * @param normalized 是否规范化
   * @returns 页面标识
   */
  getPage(normalized: boolean): string;

  /**
   * 发送前钩子函数（可被覆盖）
   * @param type 上报类型
   * @param data 上报数据
   */
  beforeSend?(type: string, data: unknown): void;

  /**
   * 内部日志记录方法
   * @param type 日志类型
   * @param data 日志数据
   * @param sample 采样率或立即发送标志
   * @param flag 额外标记
   * @returns 当前实例
   * @private
   */
  private _lg(type: string, data: unknown, sample?: number | boolean, flag?: number): this;

  /**
   * SDK自身错误上报
   * @param type 错误类型
   * @param data 错误数据
   * @param priority 优先级
   * @returns 当前实例
   * @private
   */
  private _self(type: string, data: unknown, priority: number): this;

  /**
   * 自定义数据上报
   * @param data 自定义数据
   * @param sample 采样率
   * @returns 当前实例
   * @private
   */
  private custom(data: { msg: string; [key: string]: unknown }, sample?: number): this;
}

export default Reporter;