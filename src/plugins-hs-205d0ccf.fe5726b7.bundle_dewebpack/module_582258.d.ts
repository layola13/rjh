/**
 * 推荐关联模型插件模块
 * 
 * 该模块实现了一个用于推荐关联模型的插件，依赖于上下文工具和目录插件。
 * 提供模型推荐、产品获取、对话框控制等功能。
 */

/**
 * 推荐模型处理器接口
 * 负责实际的推荐逻辑处理
 */
interface IRecommendHandler {
  /**
   * 初始化处理器
   */
  init(): void;

  /**
   * 反初始化，清理资源
   */
  _uninit(): void;

  /**
   * 更新推荐内容
   * @param options - 更新选项
   * @param force - 是否强制更新
   */
  updateRecommend(options: Record<string, unknown>, force: boolean): void;

  /**
   * 获取推荐产品列表
   * @param param1 - 查询参数1
   * @param param2 - 查询参数2
   * @param param3 - 查询参数3
   * @returns 推荐的产品列表
   */
  getRecommendationProducts(
    param1: unknown,
    param2: unknown,
    param3: unknown
  ): unknown;

  /**
   * 设置是否不显示对话框
   * @param noShow - true表示不显示，false表示显示
   */
  setNoShowDialog(noShow: boolean): void;

  /**
   * 获取当前对话框显示状态
   * @returns 是否不显示对话框
   */
  getNoShowDialog(): boolean;
}

/**
 * 插件激活时的应用上下文
 */
interface IPluginContext {
  /** 应用实例 */
  app: unknown;
}

/**
 * 插件配置选项
 */
interface IPluginOptions {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 插件依赖项列表 */
  dependencies: string[];
}

/**
 * 推荐关联模型插件类
 * 
 * 继承自HSApp.Plugin.IPlugin，实现了模型推荐功能。
 * 支持动态更新推荐、获取推荐产品、控制提示对话框等操作。
 */
declare class RecommendModelsPlugin extends HSApp.Plugin.IPlugin {
  /** 推荐处理器实例 */
  private _handler: IRecommendHandler;

  /**
   * 构造函数
   * 初始化插件配置信息
   */
  constructor();

  /**
   * 插件激活时的回调
   * @param context - 插件上下文，包含应用实例等信息
   * @param options - 插件配置选项
   */
  onActive(context: IPluginContext, options: unknown): void;

  /**
   * 插件停用时的回调
   * 清理资源，释放处理器
   */
  onDeactive(): void;

  /**
   * 手动触发更新推荐内容
   * 强制刷新推荐模型列表
   */
  updateRecommend(): void;

  /**
   * 获取推荐的产品列表
   * @param criteria - 筛选条件
   * @param limit - 返回数量限制
   * @param offset - 偏移量
   * @returns 推荐的产品数据
   */
  getRecommendationProducts(
    criteria: unknown,
    limit: unknown,
    offset: unknown
  ): unknown;

  /**
   * 设置是否不再显示推荐对话框
   * @param noShow - true表示不显示，false表示显示
   */
  setNoShowDialog(noShow: boolean): void;

  /**
   * 获取当前对话框显示设置
   * @returns 是否不显示对话框
   */
  getNoShowDialog(): boolean;
}

/**
 * 全局命名空间声明
 */
declare namespace HSApp {
  namespace Plugin {
    /**
     * 插件基类接口
     */
    abstract class IPlugin {
      constructor(options: IPluginOptions);
      abstract onActive(context: IPluginContext, options: unknown): void;
      abstract onDeactive(): void;
    }

    /**
     * 注册插件到插件系统
     * @param pluginType - 插件类型标识
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: string,
      pluginClass: typeof IPlugin
    ): void;
  }
}

declare namespace HSFPConstants {
  /**
   * 插件类型常量枚举
   */
  enum PluginType {
    /** 上下文工具插件 */
    ContextualTools = 'ContextualTools',
    /** 目录插件 */
    Catalog = 'Catalog',
    /** 推荐模型插件 */
    RecommendModels = 'RecommendModels',
  }
}

/**
 * 模块导出
 * 将推荐模型插件注册到HSApp插件系统中
 */
export {};