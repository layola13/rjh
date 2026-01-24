/**
 * 显示隐藏模型命令
 * 用于显示环境中所有被隐藏的模型（内容和墙体）
 * @module ShowHiddenModelsCommand
 */

/**
 * 隐藏模型的请求类型
 */
declare interface HiddenModelRequest {
  /** 请求类型标识 */
  type: string;
  /** 请求参数 */
  params: unknown[];
}

/**
 * 事务管理器接口
 * 负责创建和提交模型显示/隐藏请求
 */
declare interface TransactionManager {
  /**
   * 创建显示内容请求
   * @param type - 请求类型
   * @param params - 参数数组 [model, visibility]
   * @returns 请求对象
   */
  createRequest(type: string, params: unknown[]): HiddenModelRequest;
  
  /**
   * 提交请求
   * @param request - 要提交的请求
   */
  commit(request: HiddenModelRequest): void;
}

/**
 * 工具栏插件接口
 */
declare interface ToolbarPlugin {
  /**
   * 清除所有隐藏模型的记录
   * @param models - 要清除的模型数组
   */
  clearAllHiddenModels(models: unknown[]): void;
}

/**
 * 插件管理器接口
 */
declare interface PluginManager {
  /**
   * 获取指定类型的插件
   * @param pluginType - 插件类型标识
   * @returns 插件实例
   */
  getPlugin(pluginType: string): ToolbarPlugin;
}

/**
 * 应用程序上下文接口
 */
declare interface AppContext {
  /** 应用程序实例 */
  app: {
    /** 插件管理器 */
    pluginManager: PluginManager;
  };
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 命令管理器接口
 */
declare interface CommandManager {
  /**
   * 标记命令完成
   * @param command - 完成的命令实例
   */
  complete(command: ShowHiddenModelsCommand): void;
}

/**
 * 显示隐藏模型命令类
 * 继承自 HSApp.Cmd.Command
 * 
 * @description
 * 该命令用于显示环境中所有被隐藏的模型对象。
 * 执行时会：
 * 1. 获取所有隐藏的模型
 * 2. 创建显示请求
 * 3. 提交事务
 * 4. 清除隐藏记录
 * 
 * @remarks
 * - 此命令不支持撤销/重做操作
 * - 属于视图操作类别
 */
declare class ShowHiddenModelsCommand extends HSApp.Cmd.Command {
  /**
   * 存储隐藏的内容模型
   * @private
   */
  private _invisibleContents: unknown[];

  /**
   * 存储隐藏的墙体模型
   * @private
   */
  private _invisibleWalls: unknown[];

  /**
   * 应用程序上下文
   */
  protected context: AppContext;

  /**
   * 命令管理器
   */
  protected mgr: CommandManager;

  /**
   * 构造函数
   * 初始化隐藏模型数组
   */
  constructor();

  /**
   * 执行命令
   * 显示所有隐藏的模型并清除隐藏记录
   * 
   * @description
   * 执行流程：
   * 1. 通过 HSApp.Util.Design.getHiddenModelsInEnv() 获取隐藏模型列表
   * 2. 为每个隐藏模型创建 DisplayContent 请求
   * 3. 将所有请求组合成复合请求
   * 4. 提交事务
   * 5. 清除工具栏中的隐藏模型记录
   * 6. 标记命令完成
   */
  onExecute(): void;

  /**
   * 判断命令是否支持撤销/重做
   * 
   * @returns 始终返回 false，表示不支持撤销重做
   */
  canUndoRedo(): boolean;

  /**
   * 清除所有隐藏模型的记录
   * 
   * @param models - 需要清除的模型数组
   * @private
   * 
   * @description
   * 通过工具栏插件清除隐藏模型的记录，
   * 确保 UI 状态与实际模型可见性同步
   */
  private _clearAllHiddenModels(models: unknown[]): void;

  /**
   * 获取命令描述
   * 
   * @returns 命令的中文描述："显示隐藏物品"
   */
  getDescription(): string;

  /**
   * 获取命令所属类别
   * 
   * @returns 命令类别：视图操作 (ViewOperation)
   */
  getCategory(): string;
}

/**
 * 默认导出
 */
export default ShowHiddenModelsCommand;