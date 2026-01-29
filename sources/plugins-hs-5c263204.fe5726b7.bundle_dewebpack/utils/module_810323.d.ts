/**
 * 热键模型插件模块
 * 
 * 该模块定义了热键模型插件的类型声明，用于管理应用中的热键模态框显示和隐藏。
 * 插件依赖于 PageHeader 插件，并在环境激活时自动关闭模态框。
 * 
 * @module HotkeyModelPlugin
 */

declare namespace HSApp.Plugin {
  /**
   * 热键模型插件类
   * 
   * 负责处理热键触发的模态框显示逻辑，集成到应用的插件系统中。
   * 该插件会监听环境变化并自动管理模态框状态。
   */
  class HotkeyModelPlugin extends IPlugin {
    /**
     * 模态框处理器实例
     * 
     * 封装了模态框的具体显示和隐藏逻辑
     */
    private handle: HotkeyModelHandle;

    /**
     * 构造函数
     * 
     * 初始化插件依赖配置并绑定方法上下文
     */
    constructor();

    /**
     * 插件激活生命周期钩子
     * 
     * 当插件被激活时调用，执行以下操作：
     * - 初始化热键处理器
     * - 注册环境激活事件监听器，在环境切换时自动关闭模态框
     */
    onActive(): void;

    /**
     * 插件停用生命周期钩子
     * 
     * 当插件被停用时调用，用于清理资源
     */
    onDeactive(): void;

    /**
     * 初始化热键处理器
     * 
     * 调用内部 handle 实例的初始化方法
     */
    init(): void;

    /**
     * 显示模态框
     * 
     * @param content - 模态框内容数据
     * @param options - 显示选项配置
     */
    showModel(content: unknown, options: unknown): void;

    /**
     * 关闭模态框
     * 
     * 隐藏当前显示的热键模态框
     */
    closeModel(): void;
  }
}

/**
 * 热键模态框处理器类
 * 
 * 封装模态框的核心业务逻辑
 */
declare class HotkeyModelHandle {
  /**
   * 初始化处理器
   */
  init(): void;

  /**
   * 显示模态框
   * 
   * @param content - 要显示的内容
   * @param options - 显示配置选项
   */
  showModel(content: unknown, options: unknown): void;

  /**
   * 关闭模态框
   */
  closeModel(): void;
}

/**
 * 插件注册声明
 * 
 * 将热键模型插件注册到全局插件系统中
 */
declare module HSFPConstants {
  enum PluginType {
    /** 页面头部插件类型 */
    PageHeader = 'PageHeader',
    /** 热键模型插件类型 */
    hotkeyModel = 'hotkeyModel'
  }
}

declare namespace HSApp {
  namespace App {
    /**
     * 获取应用实例
     */
    function getApp(): {
      /** 环境管理器 */
      environmentManager: {
        /** 环境激活信号 */
        signalEnvironmentActivated: {
          /**
           * 监听环境激活事件
           * @param callback - 激活时的回调函数
           */
          listen(callback: () => void): void;
        };
      };
    };
  }

  namespace Plugin {
    /**
     * 插件基类接口
     */
    class IPlugin {
      /**
       * 构造函数
       * @param config - 插件配置，包含依赖项等
       */
      constructor(config: { dependencies: string[] });

      /** 插件激活时调用 */
      onActive?(): void;

      /** 插件停用时调用 */
      onDeactive?(): void;
    }

    /**
     * 注册插件到系统
     * 
     * @param pluginType - 插件类型标识符
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: string,
      pluginClass: new () => IPlugin
    ): void;
  }
}