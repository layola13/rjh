/**
 * Module: module_hide
 * Original ID: hide
 * 
 * 隐藏UI组件并清理相关的事件监听器和可调整大小的小部件
 */

/**
 * jQuery选择器辅助方法的类型定义
 * 用于在当前作用域内查找DOM元素
 */
interface ScopedQuerySelector {
  /**
   * 在当前作用域内查找匹配的元素
   * @param selector - CSS选择器字符串
   * @returns jQuery对象或元素集合
   */
  (selector: string): JQuery | HTMLElement[];
}

/**
 * 窗口调整大小事件处理器类型
 */
type WindowResizeHandler = () => void;

/**
 * 信号对象接口 - 用于事件订阅/取消订阅
 */
interface Signal {
  /**
   * 取消监听事件
   * @param handler - 要移除的处理函数
   * @param context - 处理函数的上下文对象
   */
  unlisten(handler: WindowResizeHandler, context: unknown): void;
}

/**
 * Site全局对象接口
 */
interface Site {
  /**
   * 窗口调整大小结束信号
   */
  signalWindowResizeEnd: Signal;
}

/**
 * 默认模块导出接口
 */
interface DefaultModule {
  /**
   * 隐藏模块或组件
   */
  hide(): void;
}

/**
 * 模块隐藏功能的上下文接口
 * 包含清理UI和移除事件监听器的完整功能
 */
interface ModuleHideContext {
  /**
   * 作用域内的jQuery选择器方法
   */
  _$: ScopedQuerySelector;
  
  /**
   * 窗口调整大小事件处理器实例
   */
  windowResizeHandler: WindowResizeHandler;
  
  /**
   * 销毁所有可调整大小的小部件
   * 清理与小部件相关的事件监听器和DOM引用
   */
  destroyResizableWidgets(): void;
  
  /**
   * 隐藏模块的主方法
   * 执行以下操作:
   * 1. 销毁所有可调整大小的小部件
   * 2. 隐藏快照可调整大小的元素
   * 3. 隐藏装饰线元素
   * 4. 移除窗口调整大小结束事件的监听器
   * 5. 隐藏默认模块
   */
  hide(): void;
}

/**
 * 全局site对象声明
 */
declare const site: Site;

/**
 * 默认模块声明
 */
declare const a: {
  default: DefaultModule;
};

/**
 * 模块隐藏功能实现
 * 
 * @remarks
 * 该函数执行以下清理操作:
 * - 销毁可调整大小的小部件实例
 * - 隐藏快照可调整大小的UI元素
 * - 隐藏装饰线UI元素
 * - 移除窗口调整大小事件监听器
 * - 调用默认模块的隐藏方法
 * 
 * @this {ModuleHideContext} - 方法执行的上下文对象
 */
declare function hide(this: ModuleHideContext): void;