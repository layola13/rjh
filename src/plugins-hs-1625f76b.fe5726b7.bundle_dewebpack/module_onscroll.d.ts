/**
 * Module: module_onScroll
 * Original ID: onScroll
 * 
 * 该模块用于监听和处理鼠标滚动事件。
 * 通过调用 BaseApiManager 的事件管理器来处理事件。
 */

/**
 * 鼠标事件接口
 * 扩展了标准的 MouseEvent，包含滚动相关的属性
 */
interface ScrollMouseEvent extends MouseEvent {
  /** 滚动的水平偏移量 */
  readonly deltaX?: number;
  /** 滚动的垂直偏移量 */
  readonly deltaY?: number;
  /** 滚动的深度偏移量（用于3D滚动） */
  readonly deltaZ?: number;
  /** 滚动模式（DOM_DELTA_PIXEL/DOM_DELTA_LINE/DOM_DELTA_PAGE） */
  readonly deltaMode?: number;
}

/**
 * 事件管理器接口
 * 负责管理和分发各种用户交互事件
 */
interface EventsManager {
  /**
   * 监听鼠标事件
   * @param event - 鼠标事件对象
   * @returns void
   */
  listenMouseEvent(event: ScrollMouseEvent | MouseEvent): void;
}

/**
 * 基础 API 管理器接口
 * 单例模式，管理应用的核心 API 和事件系统
 */
interface BaseApiManager {
  /** 事件管理器实例 */
  readonly eventsManager: EventsManager;
}

/**
 * 基础 API 管理器类接口（包含静态方法）
 */
interface BaseApiManagerConstructor {
  /**
   * 获取 BaseApiManager 的单例实例
   * @returns BaseApiManager 实例
   */
  getInstance(): BaseApiManager;
}

/**
 * Catalog 命名空间接口
 */
interface Catalog {
  /** 基础 API 管理器构造器 */
  readonly BaseApiManager: BaseApiManagerConstructor;
}

/**
 * HSApp 全局命名空间接口
 */
interface HSApp {
  /** Catalog 模块 */
  readonly Catalog: Catalog;
}

/**
 * 全局 HSApp 对象声明
 */
declare global {
  const HSApp: HSApp;
}

/**
 * 滚动事件处理函数
 * 
 * 当页面发生滚动时被调用，将事件传递给事件管理器进行处理
 * 
 * @param event - 鼠标事件对象（通常是 WheelEvent 或 ScrollEvent）
 * @returns void
 * 
 * @example
 *