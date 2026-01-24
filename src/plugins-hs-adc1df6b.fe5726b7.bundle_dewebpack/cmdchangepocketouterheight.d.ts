/**
 * 命令模块：改变口袋外部尺寸
 * @module CmdChangePocketOuterHeight
 */

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 创建请求
   * @param requestType - 请求类型
   * @param params - 请求参数
   */
  createRequest(requestType: string, params: any[]): ITransactionRequest;
  
  /**
   * 提交请求
   * @param request - 事务请求对象
   */
  commit(request: ITransactionRequest): void;
}

/**
 * 事务请求接口
 */
interface ITransactionRequest {
  /**
   * 接收变更数据
   * @param action - 操作类型
   * @param data - 变更数据
   */
  receive(action: string, data: any): void;
}

/**
 * 实体接口
 */
interface IEntity {
  /** 实体唯一标识 */
  id?: string;
  /** 实体类型 */
  type?: string;
}

/**
 * 应用程序接口
 */
interface IApp {
  /** 事务管理器 */
  transManager: ITransactionManager;
}

/**
 * 命令基类接口
 */
declare class Command {
  /** 执行命令 */
  onExecute(): void;
  
  /** 接收消息 */
  onReceive(event: string, data: any): boolean;
  
  /** 命令完成 */
  onComplete(result: any): void;
  
  /** 获取命令描述 */
  getDescription(): string;
  
  /** 获取命令分类 */
  getCategory(): string;
}

/**
 * 改变口袋外部高度命令
 * @description 用于改变线条高度的命令类
 */
export declare class CmdChangePocketOuterHeight extends Command {
  /** 目标实体 */
  entity: IEntity;
  
  /** 事务管理器 */
  transMgr: ITransactionManager;
  
  /** 事务请求对象 */
  private _request: ITransactionRequest;
  
  /**
   * 构造函数
   * @param entity - 目标实体对象
   */
  constructor(entity: IEntity);
  
  /**
   * 执行命令
   */
  onExecute(): void;
  
  /**
   * 接收消息事件
   * @param event - 事件名称
   * @param data - 事件数据
   * @returns 是否成功处理事件
   */
  onReceive(event: string, data: any): boolean;
  
  /**
   * 命令完成事件
   * @param result - 执行结果
   */
  onComplete(result: any): void;
  
  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string;
  
  /**
   * 获取命令分类
   * @returns 命令分类标识
   */
  getCategory(): string;
}

/**
 * 改变口袋外部厚度命令
 * @description 用于改变线条宽度的命令类（默认导出）
 */
declare class CmdChangePocketOuterThickness extends Command {
  /** 目标实体 */
  entity: IEntity;
  
  /** 事务管理器 */
  transMgr: ITransactionManager;
  
  /** 事务请求对象 */
  private _request: ITransactionRequest;
  
  /**
   * 构造函数
   * @param entity - 目标实体对象
   */
  constructor(entity: IEntity);
  
  /**
   * 执行命令
   */
  onExecute(): void;
  
  /**
   * 接收消息事件
   * @param event - 事件名称（"changeWidth"触发宽度变更）
   * @param data - 事件数据
   * @returns 是否成功处理事件
   */
  onReceive(event: string, data: any): boolean;
  
  /**
   * 命令完成事件
   * @param result - 执行结果
   */
  onComplete(result: any): void;
  
  /**
   * 获取命令描述
   * @returns 命令描述文本："改变线条宽"
   */
  getDescription(): string;
  
  /**
   * 获取命令分类
   * @returns 命令分类标识
   */
  getCategory(): string;
}

export default CmdChangePocketOuterThickness;