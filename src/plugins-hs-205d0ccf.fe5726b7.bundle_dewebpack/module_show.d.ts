/**
 * 显示模块的类型声明
 * @module ModuleShow
 */

/**
 * 显示组件的配置选项
 */
interface ShowModuleOptions {
  /** 初始化参数 */
  [key: string]: unknown;
}

/**
 * 窗口大小调整处理器的上下文类型
 */
interface WindowResizeContext {
  /** 窗口调整大小的处理方法 */
  windowResizeHandler: (event?: Event) => void;
}

/**
 * 站点全局信号管理器
 */
interface SiteSignals {
  /** 窗口调整大小结束信号 */
  signalWindowResizeEnd: {
    /** 监听信号事件 */
    listen(handler: (event?: Event) => void, context: unknown): void;
  };
}

/**
 * 全局站点对象
 */
declare const site: SiteSignals;

/**
 * 显示模块主类
 */
declare class ShowModule {
  /**
   * 初始化可调整大小的小部件
   * @param options - 初始化选项
   */
  initResizableWidgets(options: ShowModuleOptions): void;

  /**
   * jQuery选择器包装方法（内部使用）
   * @param selector - CSS选择器字符串
   * @returns jQuery对象
   */
  private _$(selector: string): JQuery;

  /**
   * 设置显示比例
   * @param options - 比例配置选项
   */
  setRatio(options: ShowModuleOptions): void;

  /**
   * 窗口调整大小事件处理器
   * @param event - 窗口事件对象
   */
  windowResizeHandler(event?: Event): void;

  /**
   * 显示模块的主方法
   * 执行以下操作：
   * 1. 初始化可调整大小的小部件
   * 2. 显示快照可调整大小元素
   * 3. 显示装饰线
   * 4. 设置显示比例
   * 5. 监听窗口调整大小结束事件
   * 6. 调用默认显示方法
   * 
   * @param options - 显示配置选项
   */
  show(options: ShowModuleOptions): void;
}

/**
 * jQuery对象类型扩展
 */
interface JQuery {
  /** 显示元素 */
  show(): JQuery;
}

export { ShowModule, ShowModuleOptions, SiteSignals, WindowResizeContext };