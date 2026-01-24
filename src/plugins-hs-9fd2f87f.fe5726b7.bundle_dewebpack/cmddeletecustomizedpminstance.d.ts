/**
 * 删除自定义参数化建模实例的命令
 * @module CmdDeleteCustomizedPMInstance
 */

/**
 * 自定义参数化建模实例接口
 */
interface ICustomizedPMInstance {
  // 实例的具体属性由实际业务定义
  [key: string]: unknown;
}

/**
 * 事务管理器请求接口
 */
interface ITransactionRequest {
  // 请求的具体属性
  [key: string]: unknown;
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 创建请求
   * @param requestType - 请求类型
   * @param params - 请求参数
   * @returns 创建的请求对象
   */
  createRequest(requestType: string, params: unknown[]): ITransactionRequest;
  
  /**
   * 提交请求
   * @param request - 要提交的请求
   */
  commit(request: ITransactionRequest): void;
}

/**
 * 命令上下文接口
 */
interface ICommandContext {
  /** 事务管理器 */
  transManager: ITransactionManager;
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  /**
   * 完成命令执行
   * @param command - 已完成的命令
   */
  complete(command: unknown): void;
}

/**
 * 命令基类接口
 */
interface ICommand {
  /** 命令上下文 */
  context: ICommandContext;
  /** 命令管理器（可选） */
  mgr?: ICommandManager;
  
  /**
   * 执行命令
   */
  onExecute(): void;
  
  /**
   * 获取命令描述
   */
  getDescription(): string;
  
  /**
   * 获取命令分类
   */
  getCategory(): string;
}

/**
 * 删除自定义参数化建模实例命令类
 * 用于删除用户创建的自由造型模型实例
 * @extends HSApp.Cmd.Command
 */
export declare class CmdDeleteCustomizedPMInstance extends HSApp.Cmd.Command implements ICommand {
  /** 要删除的实例集合 */
  private _instances: ICustomizedPMInstance[];
  
  /** 事务请求对象 */
  private _request?: ITransactionRequest;
  
  /**
   * 构造函数
   * @param instances - 要删除的自定义参数化建模实例数组
   */
  constructor(instances: ICustomizedPMInstance[]);
  
  /**
   * 执行删除操作
   * 创建删除请求并通过事务管理器提交
   */
  onExecute(): void;
  
  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;
  
  /**
   * 获取命令所属分类
   * @returns 日志分组类型（内容操作）
   */
  getCategory(): string;
}

/**
 * HSF参数化建模常量命名空间
 */
declare namespace HSFPConstants {
  /** 请求类型枚举 */
  enum RequestType {
    /** 删除自定义参数化建模实例模型 */
    DeleteCustomizedPMInstanceModel = "DeleteCustomizedPMInstanceModel"
  }
  
  /** 日志分组类型枚举 */
  enum LogGroupTypes {
    /** 内容操作类型 */
    ContentOperation = "ContentOperation"
  }
}

/**
 * HSApp应用命名空间
 */
declare namespace HSApp.Cmd {
  /**
   * 命令基类
   */
  class Command implements ICommand {
    context: ICommandContext;
    mgr?: ICommandManager;
    
    onExecute(): void;
    getDescription(): string;
    getCategory(): string;
  }
}