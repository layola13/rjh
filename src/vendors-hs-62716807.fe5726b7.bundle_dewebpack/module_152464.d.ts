/**
 * 浏览器端性能监控和错误追踪SDK
 * @module Browser
 */

/**
 * URL路径规则配置
 */
interface UrlHelperRule {
  /** 匹配规则的正则表达式 */
  rule: RegExp;
  /** 替换目标字符串 */
  target: string;
}

/**
 * API路径辅助配置
 */
interface ApiHelperConfig {
  /** 匹配规则的正则表达式 */
  rule: RegExp;
  /** 替换目标字符串 */
  target: string;
}

/**
 * 健康状态统计数据
 */
interface HealthStats {
  /** 错误计数 */
  errcount: number;
  /** API成功调用次数 */
  apisucc: number;
  /** API失败调用次数 */
  apifail: number;
  /** 健康状态标识 (0=不健康, 1=健康) */
  healthy?: 0 | 1;
  /** 统计开始时间戳 */
  begin?: number;
  /** 停留时长(毫秒) */
  stay?: number;
}

/**
 * API响应解析结果
 */
interface ParsedResponse {
  /** 响应消息 */
  msg: string;
  /** 响应状态码 */
  code?: string | number;
  /** 是否成功 */
  success: boolean;
}

/**
 * 浏览器监控SDK配置选项
 */
interface BrowserConfig {
  /** 项目ID (必填) */
  pid: string;
  
  /** 用户ID */
  uid?: string | null;
  
  /** 设置用户名 */
  setUsername?: string | null;
  
  /** 当前页面标识 */
  page?: string | (() => string);
  
  /** 忽略URL路径的规则 */
  ignoreUrlPath?: Array<UrlHelperRule | RegExp> | null;
  
  /** 忽略API路径的规则 */
  ignoreApiPath?: Array<UrlHelperRule | RegExp> | null;
  
  /** URL辅助处理规则 */
  urlHelper?: Array<UrlHelperRule | RegExp>;
  
  /** API辅助处理配置 */
  apiHelper?: ApiHelperConfig;
  
  /** 是否忽略URL大小写 */
  ignoreUrlCase?: boolean;
  
  /** 数据上报的图片URL */
  imgUrl?: string;
  
  /** 是否禁用Hook拦截 */
  disableHook?: boolean;
  
  /** 是否自动发送PV (页面访问) */
  autoSendPv?: boolean;
  
  /** 是否自动发送性能数据 */
  autoSendPerf?: boolean;
  
  /** 是否启用SPA (单页应用) 模式 */
  enableSPA?: boolean;
  
  /** 是否启用链路追踪 */
  enableLinkTrace?: boolean;
  
  /** 链路追踪类型 */
  linkType?: 'arms' | string;
  
  /** 是否启用API跨域 */
  enableApiCors?: boolean;
  
  /** 是否发送资源加载信息 */
  sendResource?: boolean;
  
  /** 是否启用行为追踪 */
  behavior?: boolean;
  
  /** 是否启用控制台日志追踪 */
  enableConsole?: boolean;
  
  /** 是否启用实例自动发送 */
  enableInstanceAutoSend?: boolean;
  
  /**
   * 解析Hash路由
   * @param hash - URL的hash部分
   * @returns 解析后的页面标识
   */
  parseHash?: (hash: string) => string;
  
  /**
   * 解析API响应
   * @param response - API响应对象
   * @returns 解析后的响应信息
   */
  parseResponse?: (response: unknown) => ParsedResponse;
}

/**
 * 数据上报的日志类型
 */
type LogType = 'error' | 'api' | 'speed' | 'sum' | 'avg' | 'percent' | 'custom' | 'msg' | 'health' | 'performance';

/**
 * 日志数据结构
 */
interface LogData {
  /** 日志类型 */
  type?: LogType;
  /** API是否成功 */
  success?: boolean;
  /** 任意扩展字段 */
  [key: string]: unknown;
}

/**
 * 管道命令类型
 */
type PipeCommand = [LogType, ...unknown[]];

/**
 * 浏览器监控SDK实例
 */
declare class Browser {
  /**
   * 构造函数
   * @param config - 监控配置选项
   */
  constructor(config: BrowserConfig);
  
  /** 内部配置对象 */
  private _conf: BrowserConfig;
  
  /** 初始页面标识 */
  private _initialPage: string | null;
  
  /** 是否为爬虫 */
  private _isRobot: boolean;
  
  /** 健康状态统计 */
  private _health: HealthStats;
  
  /** 上一个页面标识 */
  private prevPage?: string;
  
  /** 是否已就绪 */
  private hasReady?: boolean;
  
  /** 发送PV的定时器 */
  private sendPVTimmer?: number;
  
  /** 开始时间戳 */
  private sBegin: number;
  
  /**
   * 发送前的钩子函数
   * @param type - 日志类型
   * @param data - 日志数据
   */
  beforeSend(type: LogType, data: LogData): void;
  
  /**
   * 初始化事件处理器
   */
  initHandler(): void;
  
  /**
   * 初始化拦截钩子
   */
  initHook(): void;
  
  /**
   * 初始化首屏渲染时间观察器
   * @param timeout - 超时时间(毫秒)
   */
  initFmpObserver(timeout: number): void;
  
  /**
   * 初始化行为追踪
   */
  initBehavior?(): void;
  
  /**
   * 页面就绪时执行回调
   * @param callback - 就绪后执行的函数
   */
  onReady(callback: () => void): void;
  
  /**
   * 获取当前页面标识
   * @param useOriginal - 是否使用原始页面标识
   * @returns 页面标识字符串
   */
  getPage(useOriginal?: boolean): string;
  
  /**
   * 设置当前页面标识
   * @param page - 页面标识
   * @param sendPv - 是否发送PV事件
   * @returns 当前实例
   */
  setPage(page: string, sendPv?: boolean): this;
  
  /**
   * 设置配置项
   * @param config - 配置对象
   * @param skipHookUpdate - 是否跳过钩子更新
   */
  setConfig(config: Partial<BrowserConfig>, skipHookUpdate?: boolean): void;
  
  /**
   * 设置图片上报URL
   * @param config - 配置对象
   * @returns 处理后的配置对象
   */
  setImgUrl(config: Partial<BrowserConfig>): Partial<BrowserConfig>;
  
  /**
   * 获取配置项
   * @param key - 配置键名
   * @returns 配置值
   */
  getConfig<K extends keyof BrowserConfig>(key: K): BrowserConfig[K];
  
  /**
   * 发送HTTP请求
   * @param data - 请求数据
   */
  sendRequest(data: Record<string, unknown>): void;
  
  /**
   * POST方式发送数据
   * @param data - 请求数据
   * @param key - POST数据键名
   */
  postData(data: Record<string, unknown>, key: string): void;
  
  /**
   * 通过管道发送数据
   * @param commands - 命令数组或嵌套命令数组
   * @returns 当前实例
   */
  sendPipe(commands: PipeCommand | PipeCommand[]): this;
  
  /**
   * 发送页面访问(PV)事件
   */
  sendPV(): void;
  
  /**
   * 发送健康状态数据
   */
  sendHealth(): void;
  
  /**
   * 重置页面访问统计
   */
  resetPageview(): void;
  
  /**
   * 处理页面卸载事件
   * @param immediately - 是否立即执行
   */
  handleUnload(immediately?: number): void;
  
  /**
   * 移除Hook拦截
   */
  removeHook(): void;
  
  /**
   * 添加Hook拦截
   */
  addHook(): void;
  
  /**
   * 绑定Hash变化监听
   * @param enable - 是否启用
   */
  bindHashChange(enable: boolean): void;
  
  /**
   * 创建新的监控实例
   * @param config - 实例配置
   * @returns 新的Browser实例
   */
  createInstance(config: Partial<BrowserConfig>): Browser;
  
  /**
   * 记录错误
   * @param args - 错误参数
   */
  error(...args: unknown[]): void;
  
  /**
   * 记录API调用
   * @param args - API参数
   */
  api(...args: unknown[]): void;
  
  /**
   * 记录速度指标
   * @param args - 速度参数
   */
  speed(...args: unknown[]): void;
  
  /**
   * 记录求和指标
   * @param args - 求和参数
   */
  sum(...args: unknown[]): void;
  
  /**
   * 记录平均值指标
   * @param args - 平均值参数
   */
  avg(...args: unknown[]): void;
  
  /**
   * 记录百分比指标
   * @param args - 百分比参数
   */
  percent(...args: unknown[]): void;
  
  /**
   * 记录自定义指标
   * @param args - 自定义参数
   */
  custom(...args: unknown[]): void;
  
  /**
   * 记录消息
   * @param args - 消息参数
   */
  msg(...args: unknown[]): void;
  
  /**
   * 记录性能数据
   * @param args - 性能参数
   */
  performance(...args: unknown[]): void;
  
  /**
   * 内部日志记录方法
   * @param type - 日志类型
   * @param data - 日志数据
   * @param level - 日志级别
   */
  private _lg(type: LogType, data: LogData, level?: number): void;
  
  /**
   * 设置管道数据 (通过setter触发)
   */
  set pipe(commands: PipeCommand | PipeCommand[]);
}

/**
 * Browser类的静态属性
 */
declare namespace Browser {
  /** 父类引用 */
  export const _super: unknown;
  
  /** 根配置对象 */
  export const _root: {
    dftCon: BrowserConfig;
  };
}

export default Browser;
export { Browser, BrowserConfig, HealthStats, LogType, LogData, ParsedResponse, PipeCommand };