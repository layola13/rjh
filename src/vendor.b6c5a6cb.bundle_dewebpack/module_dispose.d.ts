/**
 * Module: dispose
 * 资源销毁管理模块
 * 
 * 提供资源清理和销毁功能，用于管理对象生命周期和防止内存泄漏
 */

/**
 * 可销毁资源的接口
 * 实现此接口的对象可以被统一管理和清理
 */
export interface Disposable {
  /**
   * 销毁资源，释放内存
   * 调用后对象应该不再可用
   */
  dispose(): void;
}

/**
 * 销毁管理器配置选项
 */
export interface DisposableOptions {
  /**
   * 是否在销毁时自动清理所有引用
   * @default true
   */
  autoCleanup?: boolean;
  
  /**
   * 销毁时的错误处理策略
   * @default 'log'
   */
  errorHandling?: 'throw' | 'log' | 'ignore';
}

/**
 * 销毁管理器
 * 用于批量管理和销毁资源
 */
export class DisposableStore implements Disposable {
  /**
   * 添加需要管理的可销毁资源
   * @param disposable - 可销毁的资源对象
   * @returns 返回传入的资源对象，方便链式调用
   */
  add<T extends Disposable>(disposable: T): T;
  
  /**
   * 销毁所有已注册的资源
   */
  dispose(): void;
  
  /**
   * 清空所有资源但不销毁
   */
  clear(): void;
  
  /**
   * 获取当前管理的资源数量
   */
  readonly size: number;
}

/**
 * 创建一个组合的可销毁对象
 * @param disposables - 多个可销毁资源
 * @returns 组合后的可销毁对象
 */
export function combinedDisposable(...disposables: Disposable[]): Disposable;

/**
 * 安全地销毁资源，捕获并处理可能的错误
 * @param disposable - 需要销毁的资源
 */
export function safeDispose(disposable: Disposable | null | undefined): void;

export {};