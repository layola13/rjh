/**
 * 历史记录状态变化监听模块
 * 用于拦截和监控浏览器 History API 的状态变化
 */

/**
 * 工具函数集合接口
 */
interface UtilityModule {
  /**
   * 移除 URL 中的查询参数
   * @param url - 完整的 URL 字符串
   * @returns 不含查询参数的 URL
   */
  cutUrlSearch(url: string): string;

  /**
   * 输出警告信息
   * @param message - 警告消息内容
   */
  warn(message: string): void;

  /**
   * 扩展对象属性
   * @param target - 目标对象
   * @param source - 源对象
   */
  ext(target: any, source: Record<string, any>): void;

  /**
   * 创建伪装的 toString 方法
   * @param methodName - 方法名称
   * @returns 伪装后的 toString 函数
   */
  createFakeToString(methodName: string): () => string;
}

/**
 * History API 包装接口
 */
interface HistoryWrapper {
  /**
   * 原生 pushState 方法
   */
  pushState?: History['pushState'];

  /**
   * 原生 replaceState 方法
   */
  replaceState?: History['replaceState'];
}

/**
 * 窗口上下文接口
 */
interface WindowContext {
  /**
   * 浏览器历史记录对象
   */
  history?: HistoryWrapper;

  /**
   * 文档对象
   */
  document: Document;

  /**
   * 自定义事件构造函数
   */
  CustomEvent?: typeof CustomEvent;

  /**
   * 派发事件
   * @param event - 事件对象
   */
  dispatchEvent(event: Event): boolean;
}

/**
 * 历史状态监听器类
 */
declare class HistoryStateMonitor {
  /**
   * 标识是否已劫持历史记录状态
   */
  private hasHackedHistoryState?: boolean;

  /**
   * 劫持浏览器 History API，监听状态变化
   * 拦截 pushState 和 replaceState 方法，在 URL 变化时触发自定义事件
   * @returns 当前实例，支持链式调用
   */
  hackHistoryState(): this;
}

/**
 * 模块导出函数
 * @param moduleExports - 模块导出对象
 * @param windowContext - 窗口上下文对象
 */
declare function initHistoryMonitor(
  moduleExports: any,
  windowContext: WindowContext
): void;

export = initHistoryMonitor;