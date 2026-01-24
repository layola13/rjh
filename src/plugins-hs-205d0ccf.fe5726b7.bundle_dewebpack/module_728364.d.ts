/**
 * 只读设计插件处理器
 * 负责处理只读设计模式的初始化和清理
 */
declare class ReadOnlyDesignHandler {
  /**
   * 初始化只读设计处理器
   * @param app - HSApp应用实例
   * @param config - 配置参数
   */
  init(app: HSApp.Application, config: unknown): void;

  /**
   * 取消初始化，清理资源
   */
  uninit(): void;
}

/**
 * 插件配置接口
 */
interface IPluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 插件依赖列表 */
  dependencies: string[];
}

/**
 * 只读设计插件
 * 处理只读设计模式的插件实现
 * @extends HSApp.Plugin.IPlugin
 */
declare class ReadOnlyDesignPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 只读设计处理器实例
   * @private
   */
  private _handler: ReadOnlyDesignHandler;

  /**
   * 构造函数
   * 初始化插件配置和处理器
   */
  constructor();

  /**
   * 插件激活时调用
   * @param context - 插件上下文，包含应用实例
   * @param config - 插件配置参数
   */
  onActive(context: { app: HSApp.Application }, config: unknown): void;

  /**
   * 插件停用时调用
   * 清理资源和取消注册
   */
  onDeactive(): void;
}

/**
 * HSApp全局命名空间
 */
declare namespace HSApp {
  /**
   * 应用程序主类
   */
  interface Application {
    // 应用程序相关属性和方法
  }

  /**
   * 插件命名空间
   */
  namespace Plugin {
    /**
     * 插件基类接口
     */
    abstract class IPlugin {
      /**
       * 插件激活时调用
       * @param context - 插件上下文
       * @param config - 配置参数
       */
      abstract onActive(context: { app: Application }, config: unknown): void;

      /**
       * 插件停用时调用
       */
      abstract onDeactive(): void;
    }

    /**
     * 注册插件到系统
     * @param pluginType - 插件类型标识
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: string,
      pluginClass: new () => IPlugin
    ): void;
  }
}

/**
 * HSFPConstants全局常量命名空间
 */
declare namespace HSFPConstants {
  /**
   * 插件类型常量
   */
  namespace PluginType {
    /** 登录插件类型 */
    const SignIn: string;
    /** 只读设计插件类型 */
    const ReadOnlyDesign: string;
  }
}

/**
 * 模块导出
 * 注册只读设计插件到HSApp插件系统
 */
declare module "module_728364" {
  export default ReadOnlyDesignPlugin;
}