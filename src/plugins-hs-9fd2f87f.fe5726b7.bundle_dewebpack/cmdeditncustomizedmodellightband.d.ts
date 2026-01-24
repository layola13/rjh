/**
 * 编辑自定义模型灯带命令
 * 用于处理灯带的翻转、轮廓宽度、尺寸重置等编辑操作
 */
export declare class CmdEditNCustomizedModelLightBand extends HSApp.Cmd.Command {
  /**
   * 灯带内容数据
   * @private
   */
  private _content: unknown;

  /**
   * 请求类型标识
   * @private
   */
  private _requestType: HSFPConstants.RequestType;

  /**
   * 事务请求对象
   * @private
   */
  private _request: TransactionRequest | undefined;

  /**
   * 灯带唯一标识符
   * @private
   */
  private _lightBandId: string | number;

  /**
   * 构造函数
   * @param content - 灯带内容数据
   * @param lightBandId - 灯带ID
   */
  constructor(content: unknown, lightBandId: string | number);

  /**
   * 提交事务请求
   * 将当前编辑操作提交到事务管理器
   * @private
   */
  private _commitRequest(): void;

  /**
   * 命令完成时的回调
   * 提交请求并调用父类的完成逻辑
   */
  onComplete(): void;

  /**
   * 执行命令
   * 创建编辑灯带的事务请求
   */
  onExecute(): void;

  /**
   * 接收命令消息
   * @param message - 消息类型（flip: 翻转, profileWidth: 轮廓宽度, sizeReset: 尺寸重置）
   * @param data - 消息数据
   * @returns 是否成功处理消息
   */
  onReceive(message: 'flip' | 'profileWidth' | 'sizeReset' | string, data: unknown): boolean;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;
}

/**
 * 事务请求接口
 * @private
 */
interface TransactionRequest {
  /**
   * 接收并处理消息
   * @param message - 消息类型
   * @param data - 消息数据
   */
  receive(message: string, data: unknown): void;
}

/**
 * HSFPConstants 命名空间
 * @private
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /**
     * 编辑自定义模型灯带请求类型
     */
    EditNCustomizedModelLightBand = 'EditNCustomizedModelLightBand'
  }
}

/**
 * HSApp 全局命名空间
 * @private
 */
declare namespace HSApp {
  namespace App {
    /**
     * 获取应用实例
     */
    function getApp(): AppInstance;
  }

  namespace Cmd {
    /**
     * 命令基类
     */
    class Command {
      /**
       * 命令完成回调
       */
      onComplete(args: unknown[]): void;

      /**
       * 接收消息回调
       */
      onReceive(message: string, data: unknown): boolean;
    }
  }
}

/**
 * 应用实例接口
 * @private
 */
interface AppInstance {
  /**
   * 事务管理器
   */
  transManager: TransactionManager;
}

/**
 * 事务管理器接口
 * @private
 */
interface TransactionManager {
  /**
   * 创建事务请求
   * @param requestType - 请求类型
   * @param params - 请求参数
   * @returns 事务请求对象
   */
  createRequest(requestType: HSFPConstants.RequestType, params: unknown[]): TransactionRequest;

  /**
   * 提交事务请求
   * @param request - 待提交的请求
   */
  commit(request: TransactionRequest): void;
}