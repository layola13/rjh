/**
 * 状态栏插件声明文件
 * @module StatusBarPlugin
 */

declare namespace HSApp {
  namespace Plugin {
    /**
     * 插件基类接口
     */
    class IPlugin {
      constructor(config: PluginConfig);
    }

    /**
     * 注册插件到应用程序
     * @param pluginType - 插件类型
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: HSFPConstants.PluginType,
      pluginClass: new () => IPlugin
    ): void;
  }

  /**
   * 应用程序实例接口
   */
  interface App {
    // 应用程序相关属性和方法
    [key: string]: unknown;
  }
}

declare namespace HSFPConstants {
  /**
   * 插件类型枚举
   */
  enum PluginType {
    StatusBar = "StatusBar",
  }
}

/**
 * 插件配置接口
 */
interface PluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  discription: string;
  /** 依赖的其他插件列表 */
  dependencies: string[];
}

/**
 * 状态栏项配置接口
 */
interface StatusBarItemConfig {
  /** 状态栏项的唯一标识符 */
  id: string;
  /** 显示内容 */
  content?: string;
  /** 其他配置项 */
  [key: string]: unknown;
}

/**
 * 状态栏激活参数接口
 */
interface ActivationContext {
  /** 应用程序实例 */
  app: HSApp.App;
  /** 其他上下文属性 */
  [key: string]: unknown;
}

/**
 * 状态栏处理器类
 * 负责状态栏的底层实现和管理
 */
declare class StatusBarHandler {
  /**
   * 初始化状态栏处理器
   * @param app - 应用程序实例
   * @param context - 激活上下文
   */
  init_(app: HSApp.App, context: unknown): void;

  /**
   * 反初始化状态栏处理器，清理资源
   */
  uninit_(): void;

  /**
   * 添加状态栏项
   * @param id - 状态栏项的唯一标识符
   * @param config - 状态栏项配置
   */
  addItem(id: string, config: StatusBarItemConfig): void;

  /**
   * 根据ID获取状态栏项
   * @param id - 状态栏项的唯一标识符
   * @returns 状态栏项实例
   */
  getItemById(id: string): unknown;

  /**
   * 更新状态栏项
   * @param id - 状态栏项的唯一标识符
   * @param key - 要更新的属性键
   * @param value - 新的属性值
   */
  update(id: string, key: string, value: unknown): void;

  /**
   * 显示状态栏项
   * @param id - 状态栏项的唯一标识符
   */
  show(id: string): void;

  /**
   * 隐藏状态栏
   */
  hide(): void;

  /**
   * 清空状态栏的所有项
   */
  clear(): void;

  /**
   * 处理窗口大小调整事件
   */
  handleResize(): void;

  /**
   * 根据类型禁用状态栏
   * @param type - 状态栏类型
   */
  disableStatusBarByType(type: string): void;

  /**
   * 根据类型启用状态栏
   * @param type - 状态栏类型
   */
  enableStatusBarByType(type: string): void;

  /**
   * 检查状态栏是否被禁用
   * @param type - 状态栏类型
   * @returns 是否被禁用
   */
  isDisabled(type: string): boolean;

  /**
   * 显示指定类型的状态栏
   * @param type - 状态栏类型
   * @param visible - 是否可见
   */
  showStatusBar(type: string, visible: boolean): void;
}

/**
 * 状态栏插件类
 * 提供状态栏功能的插件实现，继承自IPlugin
 */
declare class StatusBarPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 内部状态栏处理器实例
   * @private
   */
  private _handler: StatusBarHandler;

  /**
   * 创建状态栏插件实例
   */
  constructor();

  /**
   * 插件激活时调用
   * @param context - 激活上下文，包含应用程序实例
   * @param additionalContext - 额外的上下文参数
   */
  onActive(context: ActivationContext, additionalContext: unknown): void;

  /**
   * 插件停用时调用，清理资源
   */
  onDeactive(): void;

  /**
   * 添加状态栏项
   * @param id - 状态栏项的唯一标识符
   * @param config - 状态栏项配置
   */
  addItem(id: string, config: StatusBarItemConfig): void;

  /**
   * 根据ID获取状态栏项
   * @param id - 状态栏项的唯一标识符
   * @returns 状态栏项实例
   */
  getItemById(id: string): unknown;

  /**
   * 更新状态栏项的属性
   * @param id - 状态栏项的唯一标识符
   * @param key - 要更新的属性键
   * @param value - 新的属性值
   */
  update(id: string, key: string, value: unknown): void;

  /**
   * 显示指定的状态栏项
   * @param id - 状态栏项的唯一标识符
   */
  show(id: string): void;

  /**
   * 隐藏状态栏
   */
  hide(): void;

  /**
   * 清空状态栏的所有项
   */
  clear(): void;

  /**
   * 处理窗口大小调整事件
   */
  handleResize(): void;

  /**
   * 根据类型禁用状态栏
   * @param type - 状态栏类型
   */
  disableStatusBar(type: string): void;

  /**
   * 根据类型启用状态栏
   * @param type - 状态栏类型
   */
  enableStatusBar(type: string): void;

  /**
   * 检查指定类型的状态栏是否被禁用
   * @param type - 状态栏类型
   * @returns 是否被禁用
   */
  isDisabled(type: string): boolean;

  /**
   * 显示或隐藏指定类型的状态栏
   * @param type - 状态栏类型
   * @param visible - 是否可见
   */
  showStatusBar(type: string, visible: boolean): void;
}

export { StatusBarPlugin, StatusBarHandler, StatusBarItemConfig, PluginConfig };