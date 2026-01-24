/**
 * 自定义建模灯带删除命令模块
 * @module CustomizedModelingCommand
 */

/**
 * 命令执行上下文接口
 */
export interface ICommandContext {
  /** 事务管理器 */
  transManager: ITransactionManager;
}

/**
 * 事务请求接口
 */
export interface ITransactionRequest {
  /** 请求类型 */
  type: string;
  /** 请求参数 */
  params: unknown[];
}

/**
 * 事务管理器接口
 */
export interface ITransactionManager {
  /**
   * 创建事务请求
   * @param type 请求类型
   * @param params 请求参数
   * @returns 事务请求对象
   */
  createRequest(type: string, params: unknown[]): ITransactionRequest;
  
  /**
   * 提交事务请求
   * @param request 待提交的请求
   */
  commit(request: ITransactionRequest): void;
}

/**
 * 灯带对象接口
 */
export interface ILightBand {
  /** 灯带ID */
  id?: string;
  /** 灯带属性 */
  [key: string]: unknown;
}

/**
 * 命令管理器接口
 */
export interface ICommandManager {
  /**
   * 标记命令完成
   * @param command 已完成的命令实例
   */
  complete(command: unknown): void;
}

/**
 * 命令基类接口
 */
export interface ICommand {
  /** 命令执行上下文 */
  context: ICommandContext;
  /** 命令管理器 */
  mgr?: ICommandManager;
  
  /**
   * 执行命令
   */
  onExecute(): void;
}

/**
 * 删除自定义建模灯带命令
 * 用于删除自定义建模中的指定灯带对象
 * 
 * @class CmdDeleteCustomizedModelLightBand
 * @extends HSApp.Cmd.Command
 */
export class CmdDeleteCustomizedModelLightBand implements ICommand {
  /** 待删除的灯带对象 */
  private readonly _lightBand: ILightBand;
  
  /** 事务请求对象 */
  private _request?: ITransactionRequest;
  
  /** 命令执行上下文 */
  context!: ICommandContext;
  
  /** 命令管理器（可选） */
  mgr?: ICommandManager;

  /**
   * 构造函数
   * @param lightBand 待删除的灯带对象
   */
  constructor(lightBand: ILightBand);

  /**
   * 执行删除灯带命令
   * 创建删除请求并通过事务管理器提交，完成后通知命令管理器
   */
  onExecute(): void;
}

/**
 * 命令命名空间
 */
declare namespace HSW.Plugin.CustomizedModeling.Cmd {
  export { CmdDeleteCustomizedModelLightBand };
}

export default CmdDeleteCustomizedModelLightBand;