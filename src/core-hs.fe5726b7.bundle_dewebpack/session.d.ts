/**
 * Session管理类 - 负责撤销/重做操作和事务管理
 * @module Session
 */

import { BatchRequest } from './BatchRequest';
import { EntityTransactionType } from './EntityTransactionType';

/**
 * 请求过滤器函数类型
 * @param request - 要过滤的请求对象
 * @returns 是否保留该请求
 */
export type RequestFilter = (request: Request) => boolean;

/**
 * 请求映射器函数类型
 * @template T - 映射后的类型
 * @param request - 要映射的请求对象
 * @returns 映射后的结果
 */
export type RequestMapper<T> = (request: Request) => T;

/**
 * Session配置选项
 */
export interface SessionOptions {
  /**
   * 最大撤销步数
   * @default undefined - 使用TransactionManager的默认值
   */
  maxUndoStep?: number;

  /**
   * 将请求转换为可序列化格式时的过滤器
   */
  toRequestFilter?: RequestFilter;
}

/**
 * 事务选项
 */
export interface TransactionOptions {
  [key: string]: unknown;
}

/**
 * 请求接口 - 表示可撤销/重做的操作
 */
export interface Request {
  /**
   * 是否已提交
   */
  readonly isCommitted: boolean;

  /**
   * 撤销操作
   */
  undo(): void;

  /**
   * 重做操作
   */
  redo(): void;

  /**
   * 中止操作
   */
  abort(): void;

  /**
   * 同步提交操作
   * @returns 提交结果（可选）
   */
  commit(): unknown;

  /**
   * 异步提交操作
   * @returns 提交结果的Promise
   */
  commitAsync(): Promise<unknown>;

  /**
   * 判断是否可以与另一个请求合并
   * @param other - 另一个请求
   * @returns 是否成功合并
   */
  compose(other: Request): boolean;

  /**
   * 判断当前是否可以执行事务
   */
  canTransact(): boolean;

  /**
   * 执行事务操作
   * @param callback - 事务回调函数
   * @param description - 事务描述
   * @param type - 事务类型
   * @param options - 事务选项
   */
  transact(
    callback: () => void,
    description: string,
    type: EntityTransactionType,
    options: TransactionOptions
  ): void;

  /**
   * 获取活动的子请求（用于嵌套请求）
   */
  getActiveRequest?(): Request;
}

/**
 * 事务管理器接口
 */
export interface TransactionManager {
  /**
   * 默认最大撤销步数
   */
  readonly maxUndoStep: number;

  /**
   * 创建新请求
   * @param type - 请求类型
   * @param args - 创建参数
   * @returns 创建的请求对象
   */
  createRequest(type: string, args: unknown[]): Request;
}

/**
 * Session类 - 管理撤销/重做栈和事务生命周期
 */
export declare class Session {
  private _undoStack: Request[];
  private _redoStack: Request[];
  private _activeRequest?: Request;
  private readonly _transMgr: TransactionManager;
  private readonly _maxUndoStep?: number;
  private readonly _toRequestFilter?: RequestFilter;

  /**
   * 创建Session实例
   * @param transactionManager - 事务管理器
   * @param options - 配置选项
   */
  constructor(transactionManager: TransactionManager, options?: SessionOptions);

  /**
   * 获取当前活动的请求
   */
  get activeRequest(): Request | undefined;

  /**
   * 设置当前活动的请求
   */
  set activeRequest(value: Request | undefined);

  /**
   * 检查是否可以撤销
   * @returns 撤销栈是否非空
   */
  canUndo(): boolean;

  /**
   * 检查是否可以重做
   * @returns 重做栈是否非空
   */
  canRedo(): boolean;

  /**
   * 查看下一个撤销请求（不执行）
   * @returns 撤销栈顶部的请求，如果栈为空则返回undefined
   */
  peekNextUndoRequest(): Request | undefined;

  /**
   * 查看下一个重做请求（不执行）
   * @returns 重做栈顶部的请求，如果栈为空则返回undefined
   */
  peekNextRedoRequest(): Request | undefined;

  /**
   * 执行撤销操作
   * 将撤销栈顶部的请求弹出并执行其undo()方法，然后推入重做栈
   */
  undo(): void;

  /**
   * 执行重做操作
   * 将重做栈顶部的请求弹出并执行其redo()方法，然后推入撤销栈
   */
  redo(): void;

  /**
   * 中止指定请求
   * @param request - 要中止的请求
   */
  abort(request: Request): void;

  /**
   * 在请求提交后进行后处理
   * @param request - 已提交的请求
   * @param mergeWithPrevious - 是否与前一个请求合并
   */
  postCommit(request: Request, mergeWithPrevious?: boolean): void;

  /**
   * 同步提交请求
   * @param request - 要提交的请求
   * @param mergeWithPrevious - 是否与前一个请求合并
   * @returns 提交结果
   */
  commit(request: Request, mergeWithPrevious?: boolean): unknown;

  /**
   * 异步提交请求
   * @param request - 要提交的请求
   * @param mergeWithPrevious - 是否与前一个请求合并
   * @returns 提交结果的Promise
   */
  commitAsync(request: Request, mergeWithPrevious?: boolean): Promise<unknown>;

  /**
   * 在当前活动请求中执行事务
   * @param callback - 事务回调函数
   * @param description - 事务描述
   * @param type - 事务类型
   * @param options - 事务选项
   */
  transact(
    callback: () => void,
    description?: string,
    type?: EntityTransactionType,
    options?: TransactionOptions
  ): void;

  /**
   * 将撤销栈转换为单个合并的请求
   * @returns 合并后的请求，如果栈为空则返回null
   */
  toRequest(): Request | null;

  /**
   * 获取过滤后的撤销栈请求数组
   * @returns 过滤后的请求数组
   */
  toRequests(): Request[];

  /**
   * 将多个请求合并为一个
   * @param requests - 要合并的请求数组
   * @returns 合并后的请求
   */
  composeRequests(requests: Request[]): Request;

  /**
   * 重置Session状态
   * 清空撤销栈、重做栈和活动请求
   */
  reset(): void;

  /**
   * 获取映射后的撤销栈
   * @template T - 映射结果类型
   * @param mapper - 映射函数
   * @returns 映射后的数组
   */
  getUndoStack<T>(mapper: RequestMapper<T>): T[];

  /**
   * 获取映射后的重做栈
   * @template T - 映射结果类型
   * @param mapper - 映射函数
   * @returns 映射后的数组
   */
  getRedoStack<T>(mapper: RequestMapper<T>): T[];
}