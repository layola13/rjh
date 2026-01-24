/**
 * Client Plugin Module
 * 
 * 提供客户端插件功能，继承自HSApp插件系统的IPlugin接口
 * 
 * @module ClientPlugin
 */

/**
 * 插件配置接口
 * 定义插件的基本元数据
 */
interface PluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件描述信息 */
  description: string;
  /** 插件依赖列表 */
  dependencies: string[];
}

/**
 * 插件处理器接口
 * 负责插件初始化和业务逻辑处理
 */
interface PluginHandler {
  /**
   * 初始化处理器
   * @param context - 插件上下文对象
   */
  init(context: unknown): void;
}

/**
 * 客户端插件类
 * 
 * 继承自HSApp.Plugin.IPlugin，实现客户端相关的插件功能
 * 
 * @remarks
 * 该插件在激活时会创建并初始化插件处理器
 */
declare class ClientPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 插件处理器实例
   * 在onActive时被初始化
   */
  handler: PluginHandler | undefined;

  /**
   * 构造函数
   * 初始化插件配置
   */
  constructor();

  /**
   * 插件激活回调
   * 
   * 当插件被激活时调用，负责：
   * 1. 调用父类的onActive方法
   * 2. 创建并初始化PluginHandler实例
   * 
   * @param context - 插件上下文对象
   * @param options - 激活选项参数
   */
  onActive(context: unknown, options: unknown): void;
}

/**
 * HSApp全局命名空间
 */
declare namespace HSApp {
  /**
   * 插件系统命名空间
   */
  namespace Plugin {
    /**
     * 插件基类接口
     * 所有插件必须继承此接口
     */
    abstract class IPlugin {
      /**
       * 插件激活钩子
       * @param context - 插件上下文
       * @param options - 激活选项
       */
      onActive?(context: unknown, options: unknown): void;
    }

    /**
     * 注册插件到插件系统
     * 
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
   * 插件类型枚举
   */
  namespace PluginType {
    /** 客户端插件类型标识 */
    const Client: string;
  }
}

/**
 * 模块导出
 * 自动将ClientPlugin注册到HSApp插件系统
 */
export {};