/**
 * 室外绘图事务管理类
 * 用于管理室外绘图过程中的撤销/重做会话
 * @module OutdoorDrawingTransaction
 */

/**
 * 事务会话接口
 * 代表一个可撤销/重做的操作会话
 */
interface ITransactionSession {
  /** 提交会话，保存所有更改 */
  commit(): void;
  /** 结束会话，不保存更改 */
  end(): void;
  /** 中止会话，取消所有操作 */
  abort(): void;
}

/**
 * 会话配置选项
 */
interface ISessionOptions {
  /** 最大撤销步数 */
  maxUndoStep: number;
  /** 请求过滤函数，用于决定哪些操作可以被记录 */
  toRequestFilter: (request: unknown) => boolean;
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /** 启动一个新的事务会话 */
  startSession(options: ISessionOptions): ITransactionSession;
  /** 检查是否可以执行撤销操作 */
  canUndo(): boolean;
}

/**
 * 应用程序接口
 */
interface IApp {
  /** 事务管理器实例 */
  transManager: ITransactionManager;
}

/**
 * HSApp全局命名空间
 */
declare namespace HSApp {
  class App {
    /** 获取应用程序单例实例 */
    static getApp(): IApp;
  }
}

/**
 * 室外绘图事务类
 * 管理室外绘图操作的事务生命周期，支持撤销/重做功能
 */
export declare class OutdoorDrawingTransaction {
  /**
   * 内部事务会话实例
   * @private
   */
  private _internalSession: ITransactionSession | undefined;

  /**
   * 进入事务，开启一个新的撤销/重做会话
   * 设置最大撤销步数为100
   */
  enter(): void;

  /**
   * 恢复事务
   * 中止当前会话并重新进入一个新会话
   */
  recover(): void;

  /**
   * 中止事务
   * 取消当前会话中的所有操作
   */
  abort(): void;

  /**
   * 退出事务
   * 如果存在可撤销操作则提交会话，否则直接结束会话
   */
  exit(): void;

  /**
   * 会话请求过滤器
   * 用于决定哪些操作应该被记录到撤销/重做历史中
   * @param request - 待过滤的请求对象
   * @returns 返回true表示接受该请求，false表示拒绝
   * @private
   */
  private _sessionToRequestFilter(request: unknown): boolean;
}