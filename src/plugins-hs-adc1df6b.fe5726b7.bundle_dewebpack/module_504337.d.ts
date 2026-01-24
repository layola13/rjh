/**
 * 结束屋顶预览命令
 * 用于结束参数化屋顶的预览模式
 */
declare module 'module_504337' {
  import { Command } from 'HSApp.Cmd';
  
  /**
   * 屋顶对象接口
   */
  interface Roof {
    // 屋顶相关属性
    [key: string]: unknown;
  }

  /**
   * 事务请求接口
   */
  interface TransactionRequest {
    /** 请求结果 */
    result: unknown;
  }

  /**
   * 事务管理器接口
   */
  interface TransactionManager {
    /**
     * 创建事务请求
     * @param requestType 请求类型
     * @param args 请求参数
     * @returns 创建的请求对象
     */
    createRequest(requestType: string, args: unknown[]): TransactionRequest;
    
    /**
     * 提交事务
     * @param request 要提交的请求
     */
    commit(request: TransactionRequest): void;
  }

  /**
   * 应用实例接口
   */
  interface AppInstance {
    /** 事务管理器 */
    transManager: TransactionManager;
    /** 命令管理器 */
    cmdManager: {
      /** 当前命令 */
      current?: {
        /** 命令类型 */
        type?: string;
        /** 命令管理器 */
        mgr: {
          /**
           * 完成命令
           * @param command 要完成的命令
           */
          complete(command: unknown): void;
        };
      };
    };
  }

  /**
   * 结束屋顶预览命令类
   * 继承自 HSApp.Cmd.Command
   */
  export default class EndRoofPreviewCommand extends Command {
    /** 屋顶对象引用 */
    private _roof: Roof;
    
    /** 事务请求对象 */
    private _request?: TransactionRequest;

    /**
     * 构造函数
     * @param roof 要结束预览的屋顶对象
     */
    constructor(roof: Roof);

    /**
     * 执行命令
     * 结束屋顶预览模式并提交事务
     * @returns 执行结果
     */
    onExecute(): unknown;

    /**
     * 获取命令描述
     * @returns 命令的中文描述
     */
    getDescription(): string;

    /**
     * 获取命令类别
     * @returns 日志分组类型（硬操作）
     */
    getCategory(): string;
  }
}

/**
 * 全局命名空间扩展
 */
declare namespace HSApp {
  namespace Cmd {
    /**
     * 命令基类
     */
    class Command {
      /**
       * 执行命令的抽象方法
       */
      onExecute(): unknown;
      
      /**
       * 获取命令描述
       */
      getDescription(): string;
      
      /**
       * 获取命令类别
       */
      getCategory(): string;
    }
  }

  namespace App {
    /**
     * 获取应用实例
     * @returns 应用实例
     */
    function getApp(): import('module_504337').AppInstance;
  }
}

/**
 * 全局常量命名空间
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  namespace RequestType {
    /** 结束屋顶预览请求类型 */
    const EndRoofPreview: string;
  }

  /**
   * 命令类型枚举
   */
  namespace CommandType {
    /** 结束屋顶预览命令类型 */
    const EndRoofPreview: string;
  }

  /**
   * 日志分组类型枚举
   */
  namespace LogGroupTypes {
    /** 硬操作类型 */
    const HardOperation: string;
  }
}