/**
 * 修改楼板厚度命令模块
 * @module CmdChangeSlabThickness
 */

/**
 * 楼板对象接口
 */
export interface ISlab {
  /** 楼板厚度 */
  thickness: number;
}

/**
 * 应用程序接口
 */
export interface IApp {
  /** 事务管理器 */
  transManager: ITransactionManager;
}

/**
 * 事务管理器接口
 */
export interface ITransactionManager {
  /**
   * 创建请求
   * @param requestType 请求类型
   * @param params 参数数组
   * @returns 请求对象
   */
  createRequest(requestType: string, params: unknown[]): IRequest;
  
  /**
   * 提交请求
   * @param request 要提交的请求
   */
  commit(request: IRequest): void;
}

/**
 * 请求对象接口
 */
export interface IRequest {
  // 请求对象的具体属性根据实际需求定义
}

/**
 * 命令管理器接口
 */
export interface ICommandManager {
  /**
   * 完成命令
   * @param command 要完成的命令
   */
  complete(command: unknown): void;
}

/**
 * 命令基类
 */
export declare class Command {
  /** 命令管理器 */
  protected mgr: ICommandManager;
  
  /**
   * 执行命令
   */
  onExecute(): void;
  
  /**
   * 清理命令资源
   */
  onCleanup(): void;
  
  /**
   * 判断命令是否支持撤销/重做
   * @returns 是否支持撤销重做
   */
  canUndoRedo(): boolean;
}

/**
 * 修改楼板厚度命令类
 * @remarks
 * 该命令用于修改指定楼板的厚度属性，通过事务管理器提交变更请求
 */
export declare class CmdChangeSlabThickness extends Command {
  /** 应用程序实例 */
  private readonly app: IApp;
  
  /** 目标楼板对象 */
  private readonly slab: ISlab;
  
  /** 新的厚度值 */
  private readonly thickness: number;
  
  /** 创建的请求对象 */
  private _request?: IRequest;
  
  /**
   * 构造函数
   * @param app 应用程序实例
   * @param slab 要修改的楼板对象
   * @param thickness 新的厚度值
   */
  constructor(app: IApp, slab: ISlab, thickness: number);
  
  /**
   * 执行修改楼板厚度操作
   * @remarks
   * 仅当新厚度与当前厚度不同时才会创建并提交变更请求
   */
  onExecute(): void;
  
  /**
   * 清理命令资源
   * @remarks
   * 当前实现为空，可在子类中重写以释放资源
   */
  onCleanup(): void;
  
  /**
   * 判断命令是否支持撤销/重做
   * @returns 始终返回 false，表示此命令不支持撤销重做
   */
  canUndoRedo(): boolean;
}