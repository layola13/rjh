/**
 * 窗帘插件模块
 * 提供窗帘相关的设计和配置功能
 */

/**
 * 窗帘插件依赖的其他插件类型
 */
type CurtainPluginDependencies = [
  HSFPConstants.PluginType.ContextualTools,
  HSFPConstants.PluginType.PropertyBar,
  HSFPConstants.PluginType.Catalog,
  HSFPConstants.PluginType.Toolbar,
  HSFPConstants.PluginType.ResizeWidget
];

/**
 * 插件元数据配置
 */
interface PluginMetadata {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 插件依赖列表 */
  dependencies: CurtainPluginDependencies;
}

/**
 * 插件激活时的事件参数
 */
interface PluginActivationEvent {
  /** 应用程序实例 */
  app: HSApp.Application;
}

/**
 * 窗帘处理器接口
 * 负责窗帘插件的核心业务逻辑
 */
interface ICurtainHandler {
  /**
   * 初始化窗帘处理器
   * @param app - 应用程序实例
   * @param context - 插件上下文
   */
  init(app: HSApp.Application, context: unknown): void;

  /**
   * 卸载窗帘处理器，清理资源
   */
  uninit(): void;
}

/**
 * 窗帘插件类
 * 继承自 HSApp.Plugin.IPlugin，提供窗帘设计功能
 */
declare class CurtainPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 窗帘业务逻辑处理器
   * @private
   */
  private _handler: ICurtainHandler;

  /**
   * 构造函数
   * 初始化插件元数据和处理器实例
   */
  constructor();

  /**
   * 插件激活回调
   * 当插件被激活时调用，初始化处理器
   * @param event - 激活事件对象，包含应用程序实例
   * @param context - 插件运行上下文
   */
  onActive(event: PluginActivationEvent, context: unknown): void;

  /**
   * 插件停用回调
   * 当插件被停用时调用，清理资源
   */
  onDeactive(): void;
}

/**
 * 全局命名空间扩展
 */
declare global {
  namespace HSApp {
    /** 应用程序主类 */
    interface Application {}

    namespace Plugin {
      /**
       * 插件基类接口
       */
      interface IPlugin {
        /**
         * 插件激活回调
         * @param event - 激活事件
         * @param context - 上下文
         */
        onActive?(event: PluginActivationEvent, context: unknown): void;

        /**
         * 插件停用回调
         */
        onDeactive?(): void;
      }

      /**
       * 注册插件到系统
       * @param pluginType - 插件类型标识
       * @param pluginClass - 插件类构造函数
       */
      function registerPlugin(
        pluginType: HSFPConstants.PluginType.Curtain,
        pluginClass: typeof CurtainPlugin
      ): void;
    }
  }

  namespace HSFPConstants {
    /**
     * 插件类型枚举
     */
    enum PluginType {
      /** 窗帘插件 */
      Curtain = 'Curtain',
      /** 上下文工具插件 */
      ContextualTools = 'ContextualTools',
      /** 属性栏插件 */
      PropertyBar = 'PropertyBar',
      /** 目录插件 */
      Catalog = 'Catalog',
      /** 工具栏插件 */
      Toolbar = 'Toolbar',
      /** 调整大小组件插件 */
      ResizeWidget = 'ResizeWidget'
    }
  }
}

export {};