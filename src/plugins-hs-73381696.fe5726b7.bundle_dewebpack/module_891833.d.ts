/**
 * 用户行为追踪管理器类型定义
 * 负责监听和收集应用内的用户操作事件
 */

import type { HSCore } from './hs-core';

/**
 * 应用实例接口
 */
export interface App {
  // 根据实际使用情况补充属性
  [key: string]: unknown;
}

/**
 * 信号对象接口
 */
export interface Signal<T = unknown> {
  /** 信号名称 */
  name: string;
  /** 信号数据 */
  data?: T;
  [key: string]: unknown;
}

/**
 * 用户操作日志记录
 */
export interface UserOperationLog {
  /** 事件类型 */
  eventType: string;
  /** 事件时间戳 */
  timestamp: number;
  /** 事件数据 */
  data?: Record<string, unknown>;
  /** 用户ID（可选） */
  userId?: string;
  [key: string]: unknown;
}

/**
 * 追踪模块接口
 * 各个功能模块需实现此接口以接入追踪系统
 */
export interface TrackingModule {
  /**
   * 获取模块需要监听的信号
   * @param app - 应用实例
   * @returns 返回需要监听的信号对象，如不需要监听则返回 null
   */
  getListenSignal?(app: App): Signal | null;

  /**
   * 信号触发时的处理函数
   * @param signalData - 信号携带的数据
   * @param tracker - 追踪器实例
   * @returns 返回日志记录对象，如不需要记录则返回 null/undefined
   */
  listen(
    signalData: unknown,
    tracker: UserOperationTracker
  ): Promise<UserOperationLog | null | undefined>;
}

/**
 * 用户操作追踪器
 * 协调多个模块的事件监听和日志收集
 */
export default class UserOperationTracker {
  /** 应用实例引用 */
  readonly app: App;

  /** 注册的追踪模块列表 */
  readonly modules: ReadonlyArray<TrackingModule>;

  /** 信号钩子管理器 */
  readonly signalHook: HSCore.Util.SignalHook;

  /** 用户操作事件信号（私有） */
  private _signalUserOperationEvent?: Signal;

  /** 追踪参数缓存 */
  readonly utrackArgs: Map<string, unknown>;

  /**
   * 构造函数
   * @param app - 应用实例
   * @param modules - 追踪模块数组
   */
  constructor(app: App, modules: TrackingModule[]);

  /**
   * 初始化追踪器
   * 遍历所有模块，注册信号监听器
   */
  init(): void;

  /**
   * 推送日志记录
   * @param log - 用户操作日志对象
   */
  pushLog(log: UserOperationLog): void;
}