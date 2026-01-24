/**
 * Handler模块 - 处理应用生命周期和命令注册
 * @module Handler
 * @originalId 165404
 */

/**
 * 应用实例接口
 */
interface IApp {
  /** 命令管理器 */
  cmdManager: ICommandManager;
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  /**
   * 注册命令
   * @param commands - 命令类型和实现类的映射数组
   */
  register(commands: Array<[string, new () => unknown]>): void;
}

/**
 * 插件上下文接口
 */
interface IPluginContext {
  /** 应用实例 */
  app: IApp;
}

/**
 * 动作管理器接口
 */
interface IActionManager {
  /**
   * 执行动作
   * @param actionType - 动作类型
   * @param params - 动作参数
   */
  execute(actionType: string, params?: unknown): void;

  /**
   * 完成当前动作
   */
  complete(): void;

  /**
   * 取消当前动作
   */
  cancel(): void;
}

/**
 * 主处理器类 - 负责应用的生命周期管理、命令注册和动作执行
 */
export declare class Handler {
  /** 应用实例引用 */
  private _app?: IApp;

  /** 动作管理器实例 */
  private _actionManger?: IActionManager;

  /**
   * 插件激活时的回调
   * @param context - 插件上下文对象
   * @param options - 激活选项
   */
  onActive(context: IPluginContext, options?: unknown): void;

  /**
   * 插件停用时的回调
   * @param context - 插件上下文对象
   */
  onDeactive(context: IPluginContext): void;

  /**
   * 注册命令到应用的命令管理器
   * @private
   */
  private _registeCommands(): void;

  /**
   * 执行指定的动作
   * @param actionType - 动作类型标识
   * @param params - 动作执行参数
   */
  executeAction(actionType: string, params?: unknown): void;

  /**
   * 完成当前正在执行的动作
   */
  completeAction(): void;

  /**
   * 取消当前正在执行的动作
   */
  cancelAction(): void;
}