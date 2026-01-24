/**
 * 自动推荐插件模块
 * 为用户推荐内容的插件，依赖于目录插件和加载反馈插件
 */

/**
 * 推荐模型日志信号类型
 */
export type RecommendModelSignal = unknown;

/**
 * 推荐来源类型
 */
export type RecommendSource = string | number;

/**
 * 应用实例接口
 */
export interface IApp {
  /** 命令管理器 */
  cmdManager: ICommandManager;
}

/**
 * 命令管理器接口
 */
export interface ICommandManager {
  /**
   * 注册命令
   * @param commands - 命令类型和处理器的映射数组
   */
  register(commands: Array<[string, unknown]>): void;
}

/**
 * 插件激活参数接口
 */
export interface IPluginActivationParams {
  /** 应用实例 */
  app: IApp;
}

/**
 * 插件依赖项类型
 */
export type PluginDependencies = Record<string, unknown>;

/**
 * 推荐处理器初始化配置
 */
export interface IRecommendHandlerConfig {
  /** 应用实例 */
  app: IApp;
  /** 依赖的插件实例 */
  dependencies: PluginDependencies;
}

/**
 * 推荐处理器接口
 */
export interface IRecommendHandler {
  /**
   * 初始化处理器
   * @param config - 初始化配置
   */
  init(config: IRecommendHandlerConfig): void;

  /**
   * 释放资源
   */
  dispose(): void;

  /**
   * 推荐模型日志信号
   */
  signalRecommendModelToLog: RecommendModelSignal;

  /**
   * 从工具栏启动推荐
   * @param source - 推荐来源
   */
  startRecommendFromToolbar(source: RecommendSource): void;

  /**
   * 从推荐弹窗启动推荐
   * @param source - 推荐来源
   * @param options - 额外选项
   */
  startRecommendFromRecommendPopup(source: RecommendSource, options: unknown): void;
}

/**
 * 基础插件接口
 */
export interface IPlugin {
  /**
   * 插件激活时调用
   * @param params - 激活参数
   * @param dependencies - 依赖的插件实例
   */
  onActive(params: IPluginActivationParams, dependencies: PluginDependencies): void;

  /**
   * 插件停用时调用
   */
  onDeactive(): void;
}

/**
 * 自动推荐插件类
 * 负责管理内容推荐功能，包括从工具栏和推荐弹窗触发推荐
 */
export declare class AutoRecommendPlugin extends IPlugin {
  /**
   * 推荐处理器实例
   * @private
   */
  private _handler: IRecommendHandler;

  /**
   * 推荐模型日志信号
   * 用于记录推荐模型的运行状态
   */
  signalRecommendModelToLog: RecommendModelSignal;

  /**
   * 构造函数
   * 初始化插件名称、描述和依赖项
   */
  constructor();

  /**
   * 插件激活回调
   * 初始化推荐处理器并注册相关命令
   * @param params - 包含应用实例的激活参数
   * @param dependencies - 依赖的其他插件实例（目录插件和加载反馈插件）
   */
  onActive(params: IPluginActivationParams, dependencies: PluginDependencies): void;

  /**
   * 插件停用回调
   * 释放推荐处理器资源
   */
  onDeactive(): void;

  /**
   * 获取推荐处理器实例
   * @returns 当前的推荐处理器
   */
  handler(): IRecommendHandler;

  /**
   * 从工具栏启动推荐流程
   * @param source - 推荐触发来源标识
   */
  startRecommendFromToolbar(source: RecommendSource): void;

  /**
   * 从推荐弹窗启动推荐流程
   * @param source - 推荐触发来源标识
   * @param options - 推荐选项参数
   */
  startRecommendFromRecommendPopup(source: RecommendSource, options: unknown): void;
}

/**
 * 插件注册声明
 * 将自动推荐插件注册到HSApp插件系统
 */
export {};