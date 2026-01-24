/**
 * ARMS 用户行为监控模块
 * 提供页面行为追踪、用户交互记录和控制台日志捕获功能
 */

/**
 * 用户行为事件类型
 */
type BehaviorType = 
  | 'ui.click'        // 点击事件
  | 'ui.keypress'     // 键盘输入事件
  | 'navigation'      // 页面导航
  | 'console'         // 控制台日志
  | 'custom';         // 自定义行为

/**
 * 控制台日志级别
 */
type ConsoleLevel = 'debug' | 'info' | 'warn' | 'log' | 'error' | 'assert';

/**
 * 导航行为数据
 */
interface NavigationBehaviorData {
  /** 来源页面 URL */
  from: string;
  /** 目标页面 URL */
  to: string;
}

/**
 * UI 交互行为数据
 */
interface UIBehaviorData {
  /** 交互元素的选择器路径描述 */
  message: string;
}

/**
 * 控制台日志行为数据
 */
interface ConsoleBehaviorData {
  /** 日志级别 */
  level: ConsoleLevel;
  /** 日志内容参数数组 */
  message: unknown[];
}

/**
 * 自定义行为数据
 */
interface CustomBehaviorData {
  /** 行为名称（最大20字符） */
  name: string;
  /** 行为描述信息（最大200字符） */
  message: string;
  [key: string]: unknown;
}

/**
 * 用户行为事件记录
 */
interface BehaviorEvent {
  /** 行为类型 */
  type: BehaviorType;
  /** 行为数据载荷 */
  data: NavigationBehaviorData | UIBehaviorData | ConsoleBehaviorData | CustomBehaviorData | Record<string, unknown>;
  /** 事件发生时间戳（毫秒） */
  timestamp: number;
  /** 事件发生页面路径 */
  page?: string;
}

/**
 * 外部输入的行为事件（用于 addBehavior）
 */
interface InputBehaviorEvent {
  /** 行为类型（可选，自定义事件需提供） */
  type?: BehaviorType;
  /** 行为数据 */
  data?: {
    name?: string;
    message?: string;
    [key: string]: unknown;
  };
  /** 事件时间戳（可选，默认使用当前时间） */
  timestamp?: number;
  /** 页面路径（可选，默认使用当前路径） */
  page?: string;
}

/**
 * ARMS SDK 配置接口（部分）
 */
interface ARMSConfig {
  /** 是否启用行为追踪 */
  behavior?: boolean;
  /** 是否启用控制台捕获 */
  enableConsole?: boolean;
}

/**
 * ARMS SDK 实例接口扩展
 */
interface ARMSInstance {
  /**
   * 获取配置项
   * @param key - 配置项键名
   */
  getConfig<K extends keyof ARMSConfig>(key: K): ARMSConfig[K];

  /**
   * 添加单个用户行为记录
   * @param event - 行为事件对象
   * @returns 是否添加成功
   */
  addBehavior(event: InputBehaviorEvent): void;

  /**
   * 获取当前记录的所有行为数据
   * @returns 行为事件数组（最多保留最近100条）
   */
  getBehavior(): BehaviorEvent[];

  /**
   * 设置/覆盖行为数据队列
   * @param events - 行为事件数组
   * @returns 更新后的行为事件数组
   */
  setBehavior(events?: BehaviorEvent[]): BehaviorEvent[];

  /**
   * 上报已记录的行为数据到服务端
   * @param callback - 上报完成后的回调函数
   */
  reportBehavior(callback?: () => void): void;

  /**
   * 初始化行为监控模块
   * 注册点击、键盘、导航、控制台等监听器
   * @returns 当前实例（支持链式调用）
   */
  initBehavior(): this;

  /**
   * 错误处理器（内部使用）
   * @param event - 错误事件对象
   */
  errorHandler(event: ErrorEvent): void;

  /**
   * 发送行为数据到服务端（内部使用）
   * @param events - 行为事件数组
   */
  behavior(events: BehaviorEvent[]): void;

  /** 是否已初始化行为监控 */
  hasInitBehavior?: boolean;

  /** 行为上报定时器句柄（内部使用） */
  sendBhTimer?: ReturnType<typeof setTimeout>;
}

/**
 * 工具函数接口
 */
interface Utils {
  /**
   * 扩展对象属性
   * @param target - 目标对象
   * @param source - 源对象
   */
  ext(target: object, source: object): void;

  /**
   * HTML 编码字符串
   * @param str - 待编码字符串
   * @returns 编码后的字符串
   */
  encode(str: string): string;

  /**
   * 输出警告日志
   * @param message - 警告信息
   * @param error - 错误对象（可选）
   */
  warn(message: string, error?: Error): void;
}

/**
 * 为 ARMS SDK 原型扩展行为监控功能
 * @param SDKClass - ARMS SDK 构造函数
 * @param windowContext - 全局 window 对象
 */
declare function extendBehaviorModule(
  SDKClass: new (...args: any[]) => ARMSInstance,
  windowContext?: Window
): void;

export = extendBehaviorModule;