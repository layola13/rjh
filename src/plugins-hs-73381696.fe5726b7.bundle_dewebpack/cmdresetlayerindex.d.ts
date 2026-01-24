/**
 * 重置图层索引命令
 * 用于拖动调整楼层顺序的命令类
 */

import { HSApp } from './HSApp';

declare namespace HSFPConstants {
  enum RequestType {
    RemoveConcealedWork = 'RemoveConcealedWork',
    ResetLayerIndex = 'ResetLayerIndex'
  }
  
  enum LogGroupTypes {
    LayerOperation = 'LayerOperation'
  }
}

/**
 * 事务会话接口
 */
interface ITransactionSession {
  /**
   * 提交会话
   * @param options - 提交选项
   */
  commit(options: { mergeRequest: boolean }): void;
}

/**
 * 事务请求接口
 */
interface ITransactionRequest {
  // 事务请求的具体属性根据实际需要定义
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 开始一个新的事务会话
   * @returns 事务会话对象
   */
  startSession(): ITransactionSession;
  
  /**
   * 创建事务请求
   * @param requestType - 请求类型
   * @param params - 请求参数
   * @returns 事务请求对象
   */
  createRequest(requestType: HSFPConstants.RequestType, params: unknown[]): ITransactionRequest;
  
  /**
   * 提交事务请求
   * @param request - 要提交的请求
   */
  commit(request: ITransactionRequest): void;
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  /**
   * 完成命令执行
   * @param command - 已完成的命令
   */
  complete(command: HSApp.Cmd.Command): void;
}

/**
 * 应用上下文接口
 */
interface IAppContext {
  /** 事务管理器 */
  transManager: ITransactionManager;
  
  /** 应用实例 */
  app: {
    /** 命令管理器 */
    cmdManager: ICommandManager;
  };
}

/**
 * 图层对象类型
 */
type Layer = unknown;

declare namespace HSApp.Cmd {
  /**
   * 命令基类
   */
  class Command {
    /** 命令执行上下文 */
    protected context: IAppContext;
    
    /**
     * 执行命令
     */
    onExecute(): void;
    
    /**
     * 获取命令分类
     * @returns 命令分类标识
     */
    getCategory(): HSFPConstants.LogGroupTypes;
    
    /**
     * 获取命令描述
     * @returns 命令的可读描述
     */
    getDescription(): string;
  }
}

/**
 * 重置图层索引命令类
 * 用于改变楼层在图层列表中的顺序
 */
export declare class CmdResetLayerIndex extends HSApp.Cmd.Command {
  /** 目标图层 */
  private targetLayer: Layer;
  
  /** 新的前一个图层 */
  private newPreLayer: Layer | null;
  
  /** 新的后一个图层 */
  private newNextLayer: Layer | null;
  
  /** 事务请求对象 */
  private _request?: ITransactionRequest;
  
  /** 事务会话对象 */
  private _session?: ITransactionSession;
  
  /**
   * 构造函数
   * @param targetLayer - 要移动的目标图层
   * @param newPreLayer - 移动后的前一个图层（null表示移到最前）
   * @param newNextLayer - 移动后的后一个图层（null表示移到最后）
   */
  constructor(targetLayer: Layer, newPreLayer: Layer | null, newNextLayer: Layer | null);
  
  /**
   * 执行命令
   * 创建并提交重置图层索引的事务
   */
  onExecute(): void;
  
  /**
   * 获取命令分类
   * @returns 图层操作分类
   */
  getCategory(): HSFPConstants.LogGroupTypes.LayerOperation;
  
  /**
   * 获取命令描述
   * @returns "拖动楼层顺序"
   */
  getDescription(): string;
}