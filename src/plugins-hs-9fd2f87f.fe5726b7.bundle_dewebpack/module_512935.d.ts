/**
 * Corner Window Plugin Module
 * 
 * 该模块定义了角窗口插件,用于在应用中提供上下文工具、目录、工具栏、
 * 调整大小控件和属性栏等功能的集成支持。
 */

declare namespace HSApp {
  namespace Plugin {
    /**
     * 插件基类接口
     * 所有插件必须继承此接口以实现插件生命周期管理
     */
    class IPlugin {
      /**
       * 插件激活时调用
       * @param app - 应用实例引用
       * @param config - 插件配置对象
       */
      onActive(app: unknown, config: unknown): void;

      /**
       * 插件停用时调用
       * 用于清理资源和重置状态
       */
      onDeactive(): void;
    }

    /**
     * 注册插件到应用系统
     * @param pluginType - 插件类型标识符
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: string,
      pluginClass: new () => IPlugin
    ): void;
  }
}

declare namespace HSFPConstants {
  /**
   * 插件类型枚举
   * 定义系统支持的所有插件类型标识符
   */
  enum PluginType {
    /** 上下文工具插件 */
    ContextualTools = "ContextualTools",
    /** 目录插件 */
    Catalog = "Catalog",
    /** 工具栏插件 */
    Toolbar = "Toolbar",
    /** 调整大小控件插件 */
    ResizeWidget = "ResizeWidget",
    /** 属性栏插件 */
    PropertyBar = "PropertyBar",
    /** 角窗口插件 */
    CornerWindow = "CornerWindow"
  }
}

declare namespace HSCatalog {
  namespace Builder {
    /**
     * 添加元数据处理器
     * @param processor - 用于处理目录元数据的处理函数
     */
    function addMetaProcessor(processor: (data: unknown) => unknown): void;
  }
}

/**
 * 插件配置接口
 * 定义插件的基本元信息和依赖关系
 */
interface PluginConfig {
  /** 插件显示名称 */
  name: string;
  /** 插件功能描述 */
  description: string;
  /** 插件依赖的其他插件类型列表 */
  dependencies: string[];
}

/**
 * 角窗口处理器接口
 * 负责角窗口插件的核心业务逻辑
 */
interface CornerWindowHandler {
  /**
   * 初始化处理器
   * @param app - 应用实例
   * @param config - 配置对象
   */
  init_(app: unknown, config: unknown): void;
}

/**
 * 元数据处理器接口
 * 提供目录元数据的静态处理方法
 */
interface MetaProcessor {
  /**
   * 处理元数据
   * @param data - 待处理的元数据
   * @returns 处理后的元数据
   */
  process(data: unknown): unknown;
}

/**
 * 角窗口插件类
 * 
 * 继承自 IPlugin,提供角窗口功能。
 * 该插件依赖于上下文工具、目录、工具栏、调整大小控件和属性栏插件。
 * 
 * @example
 *