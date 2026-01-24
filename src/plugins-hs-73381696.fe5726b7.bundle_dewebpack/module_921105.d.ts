/**
 * Material Brush Plugin
 * 材质刷插件 - 用于在不同面之间应用和复制材质
 */

declare namespace HSApp.Plugin {
  /**
   * 插件基类接口
   */
  interface IPlugin {
    /**
     * 插件激活时调用
     * @param context - 插件上下文
     * @param dependencies - 依赖的其他插件实例
     */
    onActive(context: PluginContext, dependencies: PluginDependencies): void;

    /**
     * 插件停用时调用
     */
    onDeactive(): void;

    /**
     * 执行插件命令
     * @param command - 命令对象
     */
    execute(command: unknown): void;
  }

  /**
   * 插件上下文
   */
  interface PluginContext {
    /** 应用程序实例 */
    app: HSApp.Application;
  }

  /**
   * 插件依赖集合
   */
  type PluginDependencies = Record<string, IPlugin>;

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

declare namespace HSFPConstants {
  /**
   * 插件类型常量枚举
   */
  enum PluginType {
    /** 上下文工具插件 */
    ContextualTools = "ContextualTools",
    /** 工具栏插件 */
    Toolbar = "Toolbar",
    /** 左侧菜单插件 */
    LeftMenu = "LeftMenu",
    /** 右侧菜单插件 */
    RightMenu = "RightMenu",
    /** NGM混合绘制插件 */
    Ngmmixpaint = "Ngmmixpaint",
    /** 属性栏插件 */
    PropertyBar = "PropertyBar",
    /** 材质刷插件 */
    MaterialBrush = "MaterialBrush"
  }
}

declare namespace HSApp {
  /**
   * 应用程序主类
   */
  interface Application {
    // 应用程序相关属性和方法
  }
}

declare namespace MaterialBrush {
  /**
   * 材质刷处理器配置
   */
  interface HandlerConfig {
    /** 应用程序实例 */
    app: HSApp.Application;
    /** 依赖的插件实例集合 */
    dependencies: HSApp.Plugin.PluginDependencies;
  }

  /**
   * 材质策略接口
   */
  interface Strategy {
    // 策略相关属性
  }

  /**
   * 网格对象接口
   */
  interface Mesh {
    // 网格相关属性
  }

  /**
   * 材质刷核心处理器
   */
  class Handler {
    /**
     * 初始化处理器
     * @param config - 配置对象
     */
    init(config: HandlerConfig): void;

    /**
     * 卸载处理器，清理资源
     */
    uninit(): void;

    /**
     * 执行命令
     * @param command - 命令对象
     */
    execute(command: unknown): void;

    /**
     * 进入材质刷模式
     */
    enterMaterialBrush(): void;

    /**
     * 注册材质应用策略
     * @param strategy - 材质策略对象
     */
    registerStrategy(strategy: Strategy): void;

    /**
     * 注销材质应用策略
     * @param strategy - 材质策略对象
     */
    unregisterStrategy(strategy: Strategy): void;

    /**
     * 从网格中吸取材质
     * @param mesh - 目标网格对象
     * @returns 吸取的材质数据
     */
    suckMaterialFromMesh(mesh: Mesh): unknown;

    /**
     * 获取收益数量（可能用于积分或权益计算）
     * @returns 收益数量
     */
    getBenefitAmount(): number;

    /**
     * 显示市场模态框
     * @returns 模态框操作结果
     */
    showMarketModal(): Promise<unknown> | unknown;
  }
}

/**
 * 材质刷插件类
 * 提供在不同面之间应用材质的功能
 */
declare class MaterialBrushPlugin extends HSApp.Plugin.IPlugin {
  /** 内部处理器实例 */
  private _handler: MaterialBrush.Handler;

  /**
   * 构造函数
   * 初始化插件元数据和依赖关系
   */
  constructor();

  /**
   * 插件激活回调
   * @param context - 插件上下文
   * @param dependencies - 依赖的插件实例
   */
  onActive(
    context: HSApp.Plugin.PluginContext,
    dependencies: HSApp.Plugin.PluginDependencies
  ): void;

  /**
   * 插件停用回调
   * 清理资源和状态
   */
  onDeactive(): void;

  /**
   * 执行插件命令
   * @param command - 命令对象
   */
  execute(command: unknown): void;

  /**
   * 进入材质刷模式
   * 激活材质拾取和应用功能
   */
  enterMaterialBrush(): void;

  /**
   * 注册材质应用策略
   * @param strategy - 自定义材质策略
   */
  registerStrategy(strategy: MaterialBrush.Strategy): void;

  /**
   * 注销材质应用策略
   * @param strategy - 要移除的策略
   */
  unregisterStrategy(strategy: MaterialBrush.Strategy): void;

  /**
   * 从网格中吸取材质
   * @param mesh - 源网格对象
   * @returns 提取的材质数据
   */
  suckMaterialFromMesh(mesh: MaterialBrush.Mesh): unknown;

  /**
   * 获取当前收益数量
   * @returns 收益值
   */
  getBenefitAmount(): number;

  /**
   * 显示材质市场模态框
   * @returns 模态框交互结果
   */
  showMarketModal(): Promise<unknown> | unknown;
}

export = MaterialBrushPlugin;