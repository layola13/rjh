/**
 * ARMS (Application Real-Time Monitoring Service) SDK 工具模块
 * 提供日志上报、错误监控、性能监测等核心功能的工具函数
 */

/**
 * 区域映射配置类型
 */
interface RegionMap {
  /** 中国区域 */
  cn: string;
  /** 新加坡区域 */
  sg: string;
  /** 新加坡区域2 (Lazada) */
  sg_2: string;
  /** 日常环境 */
  daily: string;
  /** 日常环境2 (HTTPS) */
  daily_2: string;
  /** 美国西部区域 */
  us: string;
  /** 台湾区域 */
  tw: string;
  /** 台湾新加坡区域 */
  tw_sg: string;
  /** 杭州金融云区域 */
  hz_finance: string;
}

/**
 * 过滤规则类型
 */
type FilterRule = string | RegExp | ((input: string) => string) | Array<string | RegExp | ((input: string) => string)> | {
  rule: RegExp;
  target?: string;
};

/**
 * 忽略规则类型
 */
type IgnoreRule = string | RegExp | ((input: string) => boolean);

/**
 * 配置对象类型
 */
interface Config {
  /** 采样率：1-100之间的整数，或百分比字符串 */
  sample?: number | string;
  [key: string]: unknown;
}

/**
 * Fetch 快照数据结构
 */
interface FetchSnapshot {
  /** 原始API地址 */
  originApi: string;
  /** 请求方法 */
  method: string;
  /** 请求参数 */
  params: string | Record<string, string>;
  /** 响应内容 */
  response: string;
  /** 请求头 */
  reqHeaders: Record<string, string>;
  /** 响应头 */
  resHeaders: Record<string, string>;
}

/**
 * XHR 快照数据结构
 */
interface XhrSnapshot {
  /** 原始API地址 */
  originApi: string;
  /** 请求方法 */
  method: string;
  /** 请求参数 */
  params: Record<string, string>;
  /** 响应内容 */
  response: string | Document;
  /** 请求头 */
  reqHeaders: Record<string, unknown>;
  /** 响应头 */
  resHeaders: Record<string, string>;
}

/**
 * 日志参数类型
 */
interface LogParam {
  /** 日志键名 */
  key: string;
  /** 日志值 */
  val?: unknown;
  /** 日志值（别名） */
  value?: unknown;
  /** 开始时间戳 */
  begin: number;
  [key: string]: unknown;
}

/**
 * SDK错误对象类型
 */
interface SDKError {
  /** 错误消息 */
  msg: string;
  /** 错误标识 */
  message: string;
}

/**
 * ARMS SDK 工具类
 */
export interface ARMSUtils {
  /** 空函数 */
  readonly noop: () => void;

  /** 警告函数 */
  readonly warn: (...args: unknown[]) => void;

  /** 内部存储键名 */
  readonly key: string;

  /** SDK自身错误键名 */
  readonly selfErrKey: string;

  /** SDK错误页面标识 */
  readonly selfErrPage: string;

  /** 窗口对象引用 */
  readonly win: Window | undefined;

  /** 区域映射配置 */
  readonly regionMap: RegionMap;

  /** 默认图片上报URL */
  readonly defaultImgUrl: string;

  /**
   * 创建对象（兼容旧浏览器的 Object.create）
   * @param proto 原型对象
   * @returns 新创建的对象
   */
  createObject<T extends object>(proto: T): T;

  /**
   * 遍历数组或对象
   * @param collection 要遍历的集合
   * @param callback 回调函数，返回 false 时中断遍历
   * @returns 原集合
   */
  each<T>(
    collection: T[] | Record<string, T>,
    callback: (value: T, index: number | string) => boolean | void
  ): T[] | Record<string, T>;

  /**
   * 安全调用函数
   * @param fn 要调用的函数
   * @param args 参数数组
   * @param defaultValue 出错时的默认返回值
   * @returns 函数执行结果或默认值
   */
  safetyCall<T, R>(fn: ((...args: T[]) => R) | unknown, args: T[], defaultValue: R): R;

  /**
   * 类型检查
   * @param value 要检查的值
   * @param typeName 类型名称（可选）
   * @returns 如果提供类型名则返回是否匹配，否则返回类型名
   */
  T(value: unknown, typeName?: string): boolean | string;

  /**
   * 根据规则过滤字符串
   * @param input 输入字符串
   * @param rule 过滤规则
   * @returns 过滤后的字符串
   */
  filterByRule(input: string, rule: FilterRule): string;

  /**
   * 根据规则判断是否忽略
   * @param input 输入字符串
   * @param rules 忽略规则数组
   * @returns 是否应该忽略
   */
  ignoreByRule(input: string, rules: IgnoreRule[]): boolean;

  /**
   * 安全解析JSON字符串
   * @param jsonString JSON字符串
   * @returns 解析后的对象，失败返回 null
   */
  J<T = unknown>(jsonString: string): T | null;

  /**
   * 采样判断（按概率返回 true）
   * @param rate 采样率（1/rate 的概率返回 true）
   * @returns 是否命中采样
   */
  pick(rate: number): boolean;

  /**
   * 验证并修正配置对象
   * @param config 配置对象
   * @returns 修正后的配置对象
   */
  verifyConfig<T extends Config>(config: T): T;

  /**
   * 添加事件监听器（兼容IE）
   * @param element 目标元素
   * @param eventName 事件名称
   * @param handler 事件处理函数
   * @param once 是否只执行一次
   * @param useCapture 是否使用捕获阶段
   * @returns 工具对象本身
   */
  on(
    element: EventTarget,
    eventName: string,
    handler: EventListener,
    once?: boolean,
    useCapture?: boolean
  ): this;

  /**
   * 移除事件监听器
   * @param element 目标元素
   * @param eventName 事件名称
   * @param handler 事件处理函数
   * @returns 工具对象本身
   */
  off(element: EventTarget, eventName: string, handler?: EventListener): this;

  /**
   * 延迟执行函数
   * @param fn 要执行的函数
   * @param delay 延迟时间（毫秒），-1 表示立即执行
   * @returns 定时器ID，立即执行时返回 null
   */
  delay(fn: () => void, delay: number): number | null;

  /**
   * 扩展对象（浅拷贝合并）
   * @param target 目标对象
   * @param sources 源对象列表
   * @returns 扩展后的目标对象
   */
  ext<T extends object>(target: T, ...sources: Partial<T>[]): T;

  /**
   * 从对象中提取指定键
   * @param source 源对象
   * @param keys 要提取的键数组
   * @returns 包含指定键的新对象
   */
  sub<T extends object>(source: T, keys: Array<keyof T>): Partial<T>;

  /**
   * 生成唯一UUID
   * @returns 36进制UUID字符串
   */
  uu(): string;

  /**
   * 生成递增序列号
   * @returns 36进制序列号
   */
  seq(): string;

  /**
   * URL解码（安全处理异常）
   * @param encoded 编码的字符串
   * @returns 解码后的字符串
   */
  decode(encoded: string): string;

  /**
   * URL编码
   * @param raw 原始字符串
   * @param isMessage 是否为消息内容（会额外编码括号）
   * @returns 编码后的字符串
   */
  encode(raw: string, isMessage?: boolean): string;

  /**
   * 序列化对象为查询字符串
   * @param params 参数对象
   * @returns 序列化后的查询字符串
   */
  serialize(params: Record<string, unknown>): string;

  /**
   * 检查是否为ARMS API地址
   * @param url URL地址
   * @param allowCDN 是否允许CDN地址
   * @returns 是否为有效的API地址
   */
  checkAPI(url: string, allowCDN?: boolean): boolean;

  /**
   * 检查是否为自动捕获的错误（排除fetch失败等）
   * @param error 错误对象
   * @returns 是否应该自动上报
   */
  checkAutoError(error: { message?: string }): boolean;

  /**
   * 截取URL并移除查询参数和协议
   * @param url 完整URL
   * @returns 截取后的URL
   */
  cutUrlSearch(url: string): string;

  /**
   * 移除URL中的查询参数
   * @param url 完整URL
   * @returns 不含查询参数的URL
   */
  removeUrlSearch(url: string): string;

  /**
   * 创建伪造的 toString 函数（模拟原生代码）
   * @param fnName 函数名称
   * @returns toString 函数
   */
  createFakeToString(fnName: string): () => string;

  /**
   * 检查两个URL是否同源
   * @param url1 URL1
   * @param url2 URL2
   * @returns 是否同源
   */
  checkSameOrigin(url1: string, url2: string): boolean;

  /**
   * 生成随机IP地址（16进制格式）
   * @returns 随机IP字符串
   */
  getRandIP(): string;

  /**
   * 获取排序数字（1000-9999范围）
   * @param num 输入数字
   * @returns 处理后的数字
   */
  getSortNum(num?: number): number;

  /**
   * 从字符串中提取随机数（取后5位）
   * @param str 输入字符串
   * @returns 5位随机数
   */
  getRandNum(str?: string): string;

  /**
   * 生成指定长度的随机16进制数
   * @param length 长度
   * @returns 随机16进制字符串
   */
  getNum(length: number): string;

  /**
   * 获取当前域名
   * @returns 当前域名字符串
   */
  getCurDomain(): string;

  /**
   * 解析Fetch API的Headers对象
   * @param headers Headers对象
   * @returns 普通对象
   */
  parseFetchHeaders(headers: Headers | Record<string, string>): Record<string, string>;

  /**
   * 解析XHR的响应头字符串
   * @param headerString 响应头字符串
   * @returns 普通对象
   */
  parseXhrHeaders(headerString: string): Record<string, string>;

  /**
   * 从URL中提取查询参数
   * @param url 完整URL
   * @returns 查询参数对象
   */
  getQuerys(url: string): Record<string, string>;

  /**
   * 生成Fetch请求快照（用于日志上报）
   * @param args Fetch参数
   * @param response 响应内容
   * @param headers 响应头
   * @returns 编码后的快照JSON字符串
   */
  getFetchSnapshot(
    args: [string | Request, RequestInit?],
    response: string,
    headers: Headers
  ): string;

  /**
   * 生成XHR请求快照（用于日志上报）
   * @param url 请求URL
   * @param method 请求方法
   * @param xhr XHR对象
   * @returns 编码后的快照JSON字符串
   */
  getXhrSnapshot(url: string, method: string, xhr: XMLHttpRequest): string;

  /**
   * 检查是否为搜索引擎爬虫
   * @returns 是否为爬虫
   */
  isRobot(): boolean;

  /**
   * 检查是否为函数
   * @param value 要检查的值
   * @returns 是否为函数
   */
  isFunction(value: unknown): value is Function;

  /**
   * 检查是否为纯对象（Plain Object）
   * @param value 要检查的值
   * @returns 是否为纯对象
   */
  isPlainObject(value: unknown): value is Record<string, unknown>;

  /**
   * 检查是否为字符串
   * @param value 要检查的值
   * @returns 是否为字符串
   */
  isString(value: unknown): value is string;

  /**
   * 检查是否为数组
   * @param value 要检查的值
   * @returns 是否为数组
   */
  isArray(value: unknown): value is unknown[];

  /**
   * 合并多个正则表达式为一个（使用 | 连接）
   * @param patterns 正则表达式或字符串数组
   * @returns 合并后的正则表达式
   */
  joinRegExp(patterns: Array<string | RegExp>): RegExp;

  /**
   * 重写对象的方法（用于AOP拦截）
   * @param target 目标对象
   * @param methodName 方法名
   * @param wrapper 包装函数
   */
  reWriteMethod<T extends object, K extends keyof T>(
    target: T | null,
    methodName: K,
    wrapper: (original: T[K]) => T[K]
  ): void;

  /**
   * 检查是否为SDK自身错误
   * @param message 错误消息
   * @param url 错误URL
   * @returns 是否为SDK错误
   */
  checkSDKError(message?: string, url?: string): boolean;

  /**
   * 创建SDK错误对象
   * @param message 错误消息
   * @returns SDK错误对象
   */
  sdkError(message: string): SDKError;

  /**
   * 处理日志参数（标准化参数格式）
   * @param key 日志键或参数对象
   * @param value 日志值
   * @param defaultValue 默认值
   * @returns 标准化的日志参数对象
   */
  dealParam(
    key: string | Partial<LogParam>,
    value?: unknown,
    defaultValue?: unknown
  ): LogParam;
}

declare const utils: ARMSUtils;

export default utils;