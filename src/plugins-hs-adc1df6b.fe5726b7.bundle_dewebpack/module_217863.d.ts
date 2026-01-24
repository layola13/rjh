/**
 * 改变模型高度命令
 * 用于修改实体对象的高度属性
 */
declare class ChangeMoldingHeightCommand extends HSApp.Cmd.Command {
  /**
   * 需要修改高度的实体对象列表
   */
  private entities: unknown[];

  /**
   * 事务管理器实例
   */
  private transMgr: TransactionManager;

  /**
   * 当前事务会话
   */
  private session: TransactionSession;

  /**
   * 请求队列
   */
  private requests: TransactionRequest[];

  /**
   * 构造函数
   * @param entities - 单个实体对象或实体对象数组
   */
  constructor(entities: unknown | unknown[]);

  /**
   * 执行命令时的回调
   * 为每个实体创建修改高度的请求并加入队列
   */
  protected onExecute(): void;

  /**
   * 接收命令消息的回调
   * @param eventType - 事件类型，特殊处理 "changeHeight" 事件
   * @param data - 事件数据，传递给请求的新高度值
   * @returns 是否成功处理该消息
   */
  protected onReceive(eventType: string, data: unknown): boolean;

  /**
   * 命令完成时的回调
   * 提交所有请求并清理会话
   * @param result - 命令执行结果
   */
  protected onComplete(result: unknown): void;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  public getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令所属的日志分组类型（面操作）
   */
  public getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 开始一个新的事务会话
   */
  startSession(): TransactionSession;

  /**
   * 创建事务请求
   * @param requestType - 请求类型
   * @param params - 请求参数
   */
  createRequest(requestType: HSFPConstants.RequestType, params: unknown[]): TransactionRequest;

  /**
   * 提交事务请求
   * @param request - 要提交的请求
   */
  commit(request: TransactionRequest): void;
}

/**
 * 事务会话接口
 */
interface TransactionSession {
  /**
   * 提交会话
   */
  commit(): void;
}

/**
 * 事务请求接口
 */
interface TransactionRequest {
  /**
   * 接收事件数据
   * @param eventType - 事件类型
   * @param data - 事件数据
   */
  receive(eventType: string, data: unknown): void;
}

/**
 * 全局命名空间：HSFPConstants
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    ChangeMoldingSize = 'ChangeMoldingSize'
  }

  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    FaceOperation = 'FaceOperation'
  }
}

/**
 * 全局命名空间：HSApp
 */
declare namespace HSApp {
  namespace App {
    /**
     * 获取应用程序实例
     */
    function getApp(): AppInstance;
  }

  namespace Cmd {
    /**
     * 命令基类
     */
    class Command {
      protected onExecute(): void;
      protected onReceive(eventType: string, data: unknown): boolean;
      protected onComplete(result: unknown): void;
      public getDescription(): string;
      public getCategory(): unknown;
    }
  }
}

/**
 * 应用程序实例接口
 */
interface AppInstance {
  /**
   * 事务管理器
   */
  transManager: TransactionManager;
}

export default ChangeMoldingHeightCommand;