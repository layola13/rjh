/**
 * 消息中心模块
 * 提供基于WebSocket的实时消息推送服务
 */

/**
 * WebSocket连接状态
 */
export type ConnectionStatus = 'new' | 'opening' | 'opened' | 'closed';

/**
 * 消息事件类型
 */
export interface MessageEvent<T = unknown> {
  /** 消息类型 */
  type: string;
  /** 消息数据 */
  data: T;
}

/**
 * 消息监听器函数
 * @param data 消息数据
 * @param type 消息类型
 */
export type MessageListener<T = unknown> = (data: T, type: string) => void;

/**
 * 消息监听器映射表
 */
export type ListenMap = Record<string, MessageListener[]>;

/**
 * WebSocket令牌响应
 */
export interface WebSocketTokenResponse {
  /** WebSocket连接令牌 */
  token: string | null;
}

/**
 * 连接信号数据
 */
export interface ConnectSignalData {
  /** WebSocket实例 */
  socket: WebSocket;
  /** 消息中心实例 */
  messageCenter: MessageCenter;
}

/**
 * 心跳管理器
 * 负责维持WebSocket连接活跃状态
 */
declare class HeartbeatManager {
  /** WebSocket实例 */
  private websocket?: WebSocket;
  
  /** 心跳间隔时间(毫秒) */
  private readonly timeout: number;
  
  /** 定时器ID */
  private serverTimeoutObj?: number;

  constructor();

  /**
   * 重置心跳管理器
   * @param websocket WebSocket实例
   * @returns 当前实例(支持链式调用)
   */
  reset(websocket?: WebSocket): this;

  /**
   * 启动心跳检测
   */
  start(): void;
}

/**
 * 消息中心类
 * 管理WebSocket连接、消息收发和事件监听
 */
export declare class MessageCenter {
  /** WebSocket连接实例 */
  private socket?: WebSocket;
  
  /** 连接重试次数 */
  private connectCount: number;
  
  /** 当前连接状态 */
  private status: ConnectionStatus;
  
  /** 事件监听器映射表 */
  private listenMap: ListenMap;
  
  /** 心跳管理器 */
  private heart: HeartbeatManager;
  
  /** 连接成功信号 */
  private connectSignal: any; // HSCore.Util.Signal类型

  constructor();

  /**
   * 发送消息到服务器
   * @param message 要发送的消息对象
   */
  send(message: unknown): void;

  /**
   * 关闭WebSocket连接
   */
  close(): void;

  /**
   * 监听指定类型的消息
   * @param eventType 消息类型
   * @param listener 监听器回调函数
   */
  listen<T = unknown>(eventType: string, listener: MessageListener<T>): void;

  /**
   * 移除指定消息监听器
   * @param eventType 消息类型
   * @param listener 要移除的监听器函数
   */
  unlisten<T = unknown>(eventType: string, listener: MessageListener<T>): void;

  /**
   * 触发消息事件
   * @param event 消息事件对象
   */
  emit<T = unknown>(event: MessageEvent<T>): void;

  /**
   * 获取WebSocket连接令牌
   * @returns Promise返回令牌响应对象
   */
  private getToken(): Promise<WebSocketTokenResponse>;

  /**
   * 建立WebSocket连接
   * @param token 连接令牌
   */
  private connect(token: string): void;

  /**
   * 重新打开连接(含延迟重试逻辑)
   */
  private reopen(): void;

  /**
   * 打开WebSocket连接
   */
  open(): Promise<void>;
}

/**
 * 消息中心单例实例
 * 全局唯一的消息中心服务
 */
export declare const messageCenter: MessageCenter;