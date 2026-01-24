/**
 * 参数化楼梯属性修改命令
 * 用于修改参数化楼梯的属性值，支持事务管理和命令历史记录
 */

/**
 * 楼梯对象接口
 */
interface IStair {
  // 楼梯的唯一标识
  id: string;
  // 楼梯属性集合
  properties: Record<string, unknown>;
}

/**
 * 事务请求接口
 */
interface ITransactionRequest {
  // 请求类型
  type: string;
  // 请求参数
  params: unknown[];
  // 请求执行结果
  result: boolean;
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 创建事务请求
   * @param requestType - 请求类型
   * @param params - 请求参数数组
   * @returns 事务请求对象
   */
  createRequest(requestType: string, params: unknown[]): ITransactionRequest;
  
  /**
   * 提交事务请求
   * @param request - 待提交的请求
   */
  commit(request: ITransactionRequest): void;
}

/**
 * 命令基类接口
 */
interface ICommand {
  // 命令类型
  type?: string;
  // 命令管理器
  mgr?: ICommandManager;
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  // 当前执行的命令
  current: ICommand | null;
  
  /**
   * 完成命令执行
   * @param command - 待完成的命令
   */
  complete(command: ICommand): void;
}

/**
 * 应用程序接口
 */
interface IApplication {
  // 事务管理器
  transManager: ITransactionManager;
  // 命令管理器
  cmdManager: ICommandManager;
}

/**
 * 全局应用命名空间
 */
declare namespace HSApp {
  export namespace App {
    /**
     * 获取应用程序实例
     */
    export function getApp(): IApplication;
  }
  
  export namespace Cmd {
    /**
     * 命令基类
     */
    export class Command implements ICommand {
      type?: string;
      mgr?: ICommandManager;
    }
  }
}

/**
 * 全局常量命名空间
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  export enum RequestType {
    ChangeParametricStairProperty = 'ChangeParametricStairProperty'
  }
  
  /**
   * 命令类型枚举
   */
  export enum CommandType {
    ChangeParametricStairProperty = 'ChangeParametricStairProperty'
  }
  
  /**
   * 日志分组类型枚举
   */
  export enum LogGroupTypes {
    HardOperation = 'HardOperation'
  }
}

/**
 * 参数化楼梯属性修改命令类
 * 继承自 HSApp.Cmd.Command，用于执行楼梯属性的修改操作
 */
export declare class ChangeParametricStairPropertyCmd extends HSApp.Cmd.Command {
  /**
   * 事务请求对象
   */
  private _request: ITransactionRequest | undefined;
  
  /**
   * 目标楼梯对象
   */
  private _stair: IStair;
  
  /**
   * 要修改的属性名称
   */
  private _propertyName: string;
  
  /**
   * 属性的新值
   */
  private _propertyValue: unknown;
  
  /**
   * 构造函数
   * @param stair - 目标楼梯对象
   * @param propertyName - 要修改的属性名称
   * @param propertyValue - 属性的新值
   */
  constructor(stair: IStair, propertyName: string, propertyValue: unknown);
  
  /**
   * 执行命令
   * 创建并提交事务请求，修改楼梯属性
   * @returns 执行结果，true表示成功，false表示失败
   */
  onExecute(): boolean;
  
  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;
  
  /**
   * 获取命令分类
   * @returns 命令所属的日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}