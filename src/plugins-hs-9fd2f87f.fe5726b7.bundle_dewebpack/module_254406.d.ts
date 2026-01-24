/**
 * 编辑自定义模型灯槽命令
 * 用于处理天花板灯槽的编辑操作
 */

/**
 * 编辑自定义模型灯槽的命令类
 * 继承自 HSApp.Cmd.Command，用于管理灯槽的编辑请求和生命周期
 */
export default class EditCustomizedModelLightSlotCommand extends HSApp.Cmd.Command {
  /**
   * 灯槽内容数据
   */
  private _content: unknown;

  /**
   * 灯槽唯一标识符
   */
  private _lightSlotId: string | number;

  /**
   * 请求类型标识
   */
  private _requestType: HSFPConstants.RequestType;

  /**
   * 事务请求对象
   */
  private _request?: TransactionRequest;

  /**
   * 构造函数
   * @param content - 灯槽内容数据
   * @param lightSlotId - 灯槽唯一标识符
   */
  constructor(content: unknown, lightSlotId: string | number);

  /**
   * 提交事务请求
   * 如果存在待处理的请求，则将其提交到事务管理器
   * @private
   */
  private _commitRequest(): void;

  /**
   * 命令完成回调
   * 在命令执行完成时调用，负责提交请求并调用父类的完成逻辑
   */
  onComplete(): void;

  /**
   * 命令执行回调
   * 创建编辑灯槽的事务请求
   */
  onExecute(): void;

  /**
   * 接收事件回调
   * 处理天花板变化相关的事件
   * @param eventType - 事件类型（如 "ceilingchanging"、"ceilingchangeend"）
   * @param eventData - 事件数据
   * @returns 是否继续传递事件到父类
   */
  onReceive(eventType: string, eventData: unknown): boolean;
}

/**
 * 事务请求接口
 */
interface TransactionRequest {
  /**
   * 接收事件
   * @param eventType - 事件类型
   * @param eventData - 事件数据
   */
  receive(eventType: string, eventData: unknown): void;
}

/**
 * HSApp 命令命名空间
 */
declare namespace HSApp.Cmd {
  /**
   * 命令基类
   */
  class Command {
    /**
     * 命令上下文对象
     */
    protected context: CommandContext;

    /**
     * 命令完成回调
     */
    onComplete(): void;

    /**
     * 接收事件回调
     * @param eventType - 事件类型
     * @param eventData - 事件数据
     * @returns 是否处理了该事件
     */
    onReceive(eventType: string, eventData: unknown): boolean;
  }
}

/**
 * 命令上下文接口
 */
interface CommandContext {
  /**
   * 事务管理器
   */
  transManager: TransactionManager;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 创建事务请求
   * @param requestType - 请求类型
   * @param params - 请求参数数组
   * @returns 创建的事务请求对象
   */
  createRequest(requestType: HSFPConstants.RequestType, params: unknown[]): TransactionRequest;

  /**
   * 提交事务请求
   * @param request - 要提交的事务请求
   */
  commit(request: TransactionRequest): void;
}

/**
 * HSFPConstants 常量命名空间
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /**
     * 编辑自定义模型灯槽请求类型
     */
    EditNCustomizedModelLightSlot = "EditNCustomizedModelLightSlot"
  }
}