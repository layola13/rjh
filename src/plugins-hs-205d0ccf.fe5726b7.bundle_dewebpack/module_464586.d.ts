/**
 * 推荐配件模型插件模块
 * 用于根据锚点内容推荐相关配件
 * @module RecommendAccessoriesPlugin
 */

import { IPlugin } from 'HSApp/Plugin';
import { App } from 'HSApp';
import { CommandManager } from 'HSApp/CommandManager';
import { Signal } from 'HSApp/Signal';

/**
 * 推荐处理器配置选项
 */
interface RecommendHandlerOptions {
  /** 推荐算法参数 */
  algorithmParams?: Record<string, unknown>;
  /** 日志配置 */
  logConfig?: LogConfig;
}

/**
 * 日志配置接口
 */
interface LogConfig {
  /** 是否启用日志 */
  enabled: boolean;
  /** 日志级别 */
  level?: 'info' | 'warn' | 'error';
}

/**
 * 推荐配件命令参数
 */
interface RecommendAccessoriesCommandParams {
  /** 锚点ID */
  anchorId: string;
  /** 推荐数量 */
  count?: number;
  /** 额外参数 */
  metadata?: Record<string, unknown>;
}

/**
 * 推荐配件处理器
 * 负责处理配件推荐的核心逻辑
 */
declare class RecommendAccessoriesHandler {
  /**
   * 推荐配件日志信号
   * 当推荐操作发生时触发
   */
  signalRecommendAccessoriesToLog: Signal<void>;

  /**
   * 构造函数
   * @param app - 应用实例
   * @param options - 处理器配置选项
   */
  constructor(app: App, options?: RecommendHandlerOptions);

  /**
   * 初始化处理器
   * 设置事件监听器和必要的资源
   */
  init(): void;

  /**
   * 开始推荐流程
   * @param params - 推荐参数
   */
  startRecommendProcess(params: RecommendAccessoriesCommandParams): void;
}

/**
 * 添加推荐配件命令
 * 用于执行配件推荐操作
 */
declare class CmdAddRecommendAccessories {
  /**
   * 执行命令
   * @param params - 命令参数
   */
  execute(params: RecommendAccessoriesCommandParams): void;

  /**
   * 撤销命令
   */
  undo(): void;
}

/**
 * 插件上下文接口
 */
interface PluginContext {
  /** 应用实例 */
  app: App;
  /** 命令管理器 */
  cmdManager: CommandManager;
}

/**
 * 推荐配件插件类
 * 选择锚点内容以推荐相关配件
 * @extends IPlugin
 */
declare class RecommendAccessoriesPlugin extends IPlugin {
  /**
   * 推荐配件处理器实例
   */
  private _handler: RecommendAccessoriesHandler;

  /**
   * 推荐配件日志信号
   * 暴露给外部使用的信号
   */
  signalRecommendAccessoriesToLog: Signal<void>;

  /**
   * 构造函数
   * 初始化插件元数据
   */
  constructor();

  /**
   * 插件激活回调
   * 注册命令和初始化处理器
   * @param context - 插件上下文
   * @param options - 处理器配置选项
   */
  onActive(context: PluginContext, options?: RecommendHandlerOptions): void;

  /**
   * 启动推荐流程
   * 触发配件推荐操作
   * @param params - 推荐参数
   */
  startRecommendProcess(params: RecommendAccessoriesCommandParams): void;
}

/**
 * 插件元数据
 */
export const PLUGIN_METADATA: {
  /** 插件名称 */
  readonly name: 'ai recommend accessories model plugin';
  /** 插件描述 */
  readonly description: 'Choose anchor content to recommend correlation accessories';
  /** 依赖的插件列表 */
  readonly dependencies: [];
};

export default RecommendAccessoriesPlugin;