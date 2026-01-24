/**
 * 房间关闭检查任务
 * 用于在执行某些操作前验证房间是否已关闭
 */

/**
 * 任务执行的上下文参数
 */
interface TaskContext {
  /** 是否需要执行房间关闭检查 */
  doRoomClosedCheck: boolean;
  [key: string]: unknown;
}

/**
 * 任务执行成功的响应
 */
interface TaskSuccessResponse {
  /** 执行状态 */
  status: "success";
  /** 响应数据 */
  data: {
    /** 是否执行了房间关闭检查 */
    doRoomClosedCheck: boolean;
  };
}

/**
 * 任务执行错误的响应
 */
interface TaskErrorResponse {
  /** 执行状态 */
  status: "error";
  /** 错误信息 */
  message: string;
}

/**
 * 任务取消的响应
 */
interface TaskCancelResponse {
  /** 执行状态 */
  status: "cancel";
}

/**
 * 任务执行结果的联合类型
 */
type TaskResponse = TaskSuccessResponse | TaskErrorResponse | TaskCancelResponse;

/**
 * 持久化插件接口
 */
interface PersistencePlugin {
  /**
   * 检查房间是否已关闭
   * @param showHint - 是否显示提示信息
   * @returns 房间是否已关闭
   */
  checkRoomClosed(showHint: boolean): boolean;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取指定名称的插件
   * @param pluginName - 插件名称
   * @returns 插件实例或null
   */
  getPlugin(pluginName: string): PersistencePlugin | null;
}

/**
 * 应用实例接口
 */
interface App {
  /** 插件管理器 */
  pluginManager: PluginManager;
}

/**
 * HSApp全局对象
 */
declare namespace HSApp {
  namespace App {
    /**
     * 获取应用实例
     * @returns 应用实例
     */
    function getApp(): App;
  }
}

/**
 * 资源管理器全局对象
 */
declare namespace ResourceManager {
  /**
   * 获取国际化字符串资源
   * @param key - 资源键
   * @returns 本地化字符串
   */
  function getString(key: string): string;
}

/**
 * 实时提示配置选项
 */
interface LiveHintOptions {
  /** 是否可以关闭提示 */
  canclose: boolean;
  [key: string]: unknown;
}

/**
 * 实时提示全局对象
 */
declare namespace LiveHint {
  /**
   * 显示实时提示消息
   * @param message - 提示消息内容
   * @param duration - 显示时长（毫秒）
   * @param position - 显示位置（可选）
   * @param options - 额外配置选项
   */
  function show(
    message: string,
    duration: number,
    position: unknown,
    options: LiveHintOptions
  ): void;
}

/**
 * 房间关闭检查任务
 * 在执行关键操作前验证房间状态，确保房间未关闭
 */
export declare class RoomClosedCheckTask {
  /**
   * 创建房间关闭检查任务实例
   */
  constructor();

  /**
   * 执行房间关闭检查
   * @param context - 任务上下文，包含检查配置
   * @param additionalParam - 额外参数（未使用）
   * @returns Promise，成功时返回成功响应，失败时返回错误或取消响应
   * 
   * @remarks
   * - 如果 context.doRoomClosedCheck 为 false，直接返回成功
   * - 如果持久化插件不存在，返回错误
   * - 如果房间已关闭，显示提示并返回取消状态
   * - 如果房间未关闭，返回成功
   */
  execute(context: TaskContext, additionalParam: unknown): Promise<TaskResponse>;
}