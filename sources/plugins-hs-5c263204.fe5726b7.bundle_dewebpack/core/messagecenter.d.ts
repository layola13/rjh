/**
 * 消息中心模块
 * 提供WebSocket连接管理和消息分发功能
 */

/**
 * 消息事件接口
 */
export interface MessageEvent<T = unknown> {
  /** 消息类型 */
  type: string;
  /** 消息数据 */
  data: T;
}

/**
 * 消息监听器函数类型
 */
export type MessageListener<T = unknown> = (data: T, type: string) => void;

/**
 * WebSocket连接状态
 */
export type ConnectionStatus = 'new' | 'opening' | 'opened' | 'closed';

/**
 * WebSocket令牌响应接口
 */
export interface WebSocketTokenResponse {
  /** 认证令牌 */
  token: string | null;
}

/**
 * 用户登录数据接口
 */
export interface UserLoginData {
  /** 是否已登录 */
  isLogin: boolean;
}

/**
 * 用户登录事件接口
 */
export interface UserLoginEvent {
  /** 登录数据 */
  data?: UserLoginData;
}

/**
 * 心跳管理器类
 * 负责维护WebSocket连接的心跳检测
 */
declare class HeartbeatManager {
  /** WebSocket实例 */
  private websocket?: WebSocket;
  
  /** 心跳超时时间（毫秒），默认48秒 */
  private readonly timeout: number;
  
  /** 心跳定时器ID */
  private serverTimeoutObj?: number;

  constructor();

  /**
   * 重置心跳管理器
   * @param websocket - WebSocket实例
   * @returns 当前实例，支持链式调用
   */
  reset(websocket?: WebSocket): this;

  /**
   * 启动心跳检测
   * 定时发送ping消息保持连接活跃
   */
  start(): void;
}

/**
 * 消息中心类
 * 管理WebSocket连接，提供消息订阅和分发机制
 */
export declare class MessageCenter {
  /** WebSocket实例 */
  private socket?: WebSocket;
  
  /** 连接重试计数器 */
  private connectCount: number;
  
  /** 当前连接状态 */
  private status: ConnectionStatus;
  
  /** 消息监听器映射表 */
  private listenMap: Record<string, MessageListener[]>;
  
  /** 心跳管理器实例 */
  private heart: HeartbeatManager;

  constructor();

  /**
   * 关闭WebSocket连接
   * 清理所有事件监听器和心跳定时器
   */
  close(): void;

  /**
   * 注册消息监听器
   * @param eventType - 消息类型
   * @param listener - 监听器回调函数
   */
  listen<T = unknown>(eventType: string, listener: MessageListener<T>): void;

  /**
   * 触发消息事件
   * 通知所有注册的监听器
   * @param event - 消息事件对象
   */
  emit<T = unknown>(event: MessageEvent<T>): void;

  /**
   * 获取WebSocket认证令牌
   * @returns Promise包装的令牌响应
   */
  private getToken(): Promise<WebSocketTokenResponse>;

  /**
   * 建立WebSocket连接
   * @param token - 认证令牌
   */
  private connect(token: string): void;

  /**
   * 重新打开连接
   * 在连接失败时执行重试逻辑，最多重试5次
   */
  private reopen(): void;

  /**
   * 打开WebSocket连接
   * 自动获取令牌并建立连接
   */
  open(): Promise<void>;
}

/**
 * 全局消息中心单例实例
 * 可直接导入使用
 */
export declare const messageCenter: MessageCenter;