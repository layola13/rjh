/**
 * 改变线条宽度命令
 * 用于修改实体的线条宽度属性
 */
declare module 'module_495690' {
  import { Command } from 'HSApp.Cmd';
  
  /**
   * 实体类型 - 支持改变宽度操作的实体
   */
  interface IEntity {
    /** 实体唯一标识 */
    id?: string;
    /** 实体类型 */
    type?: string;
    [key: string]: unknown;
  }

  /**
   * 事务管理器 - 负责管理命令的执行和提交
   */
  interface ITransactionManager {
    /**
     * 开始一个新的事务会话
     * @returns 事务会话对象
     */
    startSession(): ITransactionSession;
    
    /**
     * 创建一个事务请求
     * @param requestType - 请求类型（如改变成型尺寸）
     * @param params - 请求参数数组
     * @returns 事务请求对象
     */
    createRequest(requestType: string, params: unknown[]): ITransactionRequest;
    
    /**
     * 提交事务请求
     * @param request - 要提交的事务请求
     */
    commit(request: ITransactionRequest): void;
  }

  /**
   * 事务会话 - 表示一组相关的事务操作
   */
  interface ITransactionSession {
    /**
     * 提交当前会话中的所有事务
     */
    commit(): void;
    
    /**
     * 回滚当前会话中的所有事务
     */
    rollback?(): void;
  }

  /**
   * 事务请求 - 表示单个事务操作
   */
  interface ITransactionRequest {
    /**
     * 接收事务数据
     * @param eventName - 事件名称
     * @param data - 事件数据
     */
    receive(eventName: string, data: unknown): void;
  }

  /**
   * 改变线条宽度命令
   * 继承自 HSApp.Cmd.Command 基类
   * 
   * @example
   *