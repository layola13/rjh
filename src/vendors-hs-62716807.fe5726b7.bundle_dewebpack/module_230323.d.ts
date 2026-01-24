/**
 * Promise 实现模块
 * 提供符合 Promises/A+ 规范的 Promise 实现
 */

/**
 * Promise 状态枚举
 */
declare enum PromiseState {
  /** 待定状态 */
  Pending = 0,
  /** 已完成状态 */
  Fulfilled = 1,
  /** 已拒绝状态 */
  Rejected = 2,
}

/**
 * Promise 拒绝处理状态
 */
declare enum RejectionState {
  /** 未处理 */
  Unhandled = 0,
  /** 已处理 */
  Handled = 1,
  /** 已确认为未处理 */
  ConfirmedUnhandled = 2,
}

/**
 * Promise 内部反应器（回调处理器）
 */
interface PromiseReaction<T = unknown, R = unknown> {
  /** 成功回调 */
  ok: ((value: T) => R) | boolean;
  /** 失败回调 */
  fail: ((reason: unknown) => R) | false;
  /** 解析函数 */
  resolve: (value: R | PromiseLike<R>) => void;
  /** 拒绝函数 */
  reject: (reason: unknown) => void;
  /** 关联的 Promise */
  promise: Promise<R>;
  /** 执行域（用于异步上下文） */
  domain?: Domain;
}

/**
 * Promise 内部状态
 */
interface PromiseInternalState<T = unknown> {
  /** 类型标识 */
  type: "Promise";
  /** 是否已完成（fulfilled 或 rejected） */
  done: boolean;
  /** 是否已通知反应器 */
  notified: boolean;
  /** 父 Promise（用于链式调用） */
  parent: boolean;
  /** 待处理的反应器队列 */
  reactions: ReactionQueue<T>;
  /** 拒绝处理状态 */
  rejection: RejectionState | false;
  /** Promise 当前状态 */
  state: PromiseState;
  /** Promise 的值或拒绝原因 */
  value: T | unknown;
  /** Promise 外观对象 */
  facade?: Promise<T>;
}

/**
 * 反应器队列（存储待执行的回调）
 */
interface ReactionQueue<T = unknown> {
  /** 添加反应器 */
  add(reaction: PromiseReaction<T>): void;
  /** 获取下一个反应器 */
  get(): PromiseReaction<T> | undefined;
}

/**
 * Promise 解析器（Deferred 对象）
 */
interface PromiseCapability<T = unknown> {
  /** 关联的 Promise 实例 */
  promise: Promise<T>;
  /** 解析函数 */
  resolve: (value: T | PromiseLike<T>) => void;
  /** 拒绝函数 */
  reject: (reason: unknown) => void;
}

/**
 * Promise 拒绝事件
 */
interface PromiseRejectionEvent {
  /** 被拒绝的 Promise */
  promise: Promise<unknown>;
  /** 拒绝原因 */
  reason: unknown;
  /** 事件类型（仅浏览器环境） */
  type?: string;
  /** 初始化事件（仅浏览器环境） */
  initEvent?(type: string, bubbles: boolean, cancelable: boolean): void;
}

/**
 * 域对象（用于异步上下文跟踪）
 */
interface Domain {
  /** 进入域 */
  enter(): void;
  /** 退出域 */
  exit(): void;
}

/**
 * 检查对象是否为 thenable（类 Promise 对象）
 * @param value - 待检查的值
 * @returns then 方法或 false
 */
declare function isThenable(value: unknown): ((
  onFulfilled?: (value: unknown) => unknown,
  onRejected?: (reason: unknown) => unknown
) => unknown) | false;

/**
 * 执行 Promise 反应器
 * @param reaction - 反应器对象
 * @param state - Promise 内部状态
 */
declare function executeReaction<T, R>(
  reaction: PromiseReaction<T, R>,
  state: PromiseInternalState<T>
): void;

/**
 * 通知所有反应器并执行
 * @param state - Promise 内部状态
 * @param isRejection - 是否为拒绝通知
 */
declare function notifyReactions<T>(
  state: PromiseInternalState<T>,
  isRejection: boolean
): void;

/**
 * 触发 Promise 拒绝事件
 * @param eventType - 事件类型（"unhandledrejection" 或 "rejectionhandled"）
 * @param promise - Promise 实例
 * @param reason - 拒绝原因
 */
declare function dispatchRejectionEvent(
  eventType: "unhandledrejection" | "rejectionhandled",
  promise: Promise<unknown>,
  reason: unknown
): void;

/**
 * 处理未处理的拒绝
 * @param state - Promise 内部状态
 */
declare function handleUnhandledRejection<T>(state: PromiseInternalState<T>): void;

/**
 * 检查 Promise 是否有未处理的拒绝
 * @param state - Promise 内部状态
 * @returns 是否为未处理的拒绝
 */
declare function isUnhandledRejection<T>(state: PromiseInternalState<T>): boolean;

/**
 * 触发拒绝已处理事件
 * @param state - Promise 内部状态
 */
declare function handleRejectionHandled<T>(state: PromiseInternalState<T>): void;

/**
 * 创建内部拒绝处理器
 * @param internalState - Promise 内部状态
 * @param reason - 拒绝原因
 * @param parentState - 父 Promise 状态
 */
declare function internalReject<T>(
  internalState: PromiseInternalState<T>,
  reason: unknown,
  parentState?: PromiseInternalState<unknown>
): void;

/**
 * 创建内部解析处理器
 * @param internalState - Promise 内部状态
 * @param value - 解析值
 * @param parentState - 父 Promise 状态
 */
declare function internalResolve<T>(
  internalState: PromiseInternalState<T>,
  value: T | PromiseLike<T>,
  parentState?: PromiseInternalState<unknown>
): void;

/**
 * 创建 Promise Capability
 * @param Constructor - Promise 构造函数
 * @returns Promise capability 对象
 */
declare function newPromiseCapability<T>(
  Constructor: PromiseConstructor | undefined
): PromiseCapability<T>;

/**
 * Promise 构造函数配置
 */
interface PromiseConfig {
  /** 是否使用构造函数模式 */
  CONSTRUCTOR: boolean;
  /** 是否支持拒绝事件 */
  REJECTION_EVENT: boolean;
  /** 是否支持子类化 */
  SUBCLASSING: boolean;
}

/**
 * 全局 Promise 实现
 * 完整实现 Promises/A+ 规范
 */
declare global {
  interface Promise<T> {
    /**
     * 添加成功和失败回调
     * @param onfulfilled - 成功时的回调
     * @param onrejected - 失败时的回调
     * @returns 新的 Promise
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined,
      onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null | undefined
    ): Promise<TResult1 | TResult2>;
  }

  interface PromiseConstructor {
    /**
     * 创建新的 Promise
     * @param executor - 执行器函数
     */
    new <T>(
      executor: (
        resolve: (value: T | PromiseLike<T>) => void,
        reject: (reason?: unknown) => void
      ) => void
    ): Promise<T>;

    readonly prototype: Promise<unknown>;
  }

  var Promise: PromiseConstructor;
}

/**
 * 模块导出
 */
export type { 
  PromiseState,
  RejectionState,
  PromiseReaction,
  PromiseInternalState,
  ReactionQueue,
  PromiseCapability,
  PromiseRejectionEvent,
  PromiseConfig,
  Domain
};

export {
  isThenable,
  executeReaction,
  notifyReactions,
  dispatchRejectionEvent,
  handleUnhandledRejection,
  isUnhandledRejection,
  handleRejectionHandled,
  internalReject,
  internalResolve,
  newPromiseCapability
};