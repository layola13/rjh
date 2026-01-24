/**
 * 墙体装饰添加命令
 * 
 * 此模块定义了一个用于向场景中添加墙体装饰的命令类。
 * 该命令继承自HSApp.Cmd.Command基类，实现了添加装饰的完整流程。
 * 
 * @module AddWallMoldingCommand
 */

declare namespace HSApp.Cmd {
  /**
   * 命令基类接口
   */
  export class Command {
    /**
     * 命令的上下文对象
     */
    context: {
      /**
       * 事务管理器，负责处理可撤销/重做的操作
       */
      transManager: TransactionManager;
    };

    /**
     * 命令管理器实例（可选）
     * 用于通知命令的完成状态
     */
    mgr?: CommandManager;
  }

  /**
   * 命令管理器接口
   */
  interface CommandManager {
    /**
     * 标记命令执行完成
     * @param command - 已完成的命令实例
     */
    complete(command: Command): void;
  }

  /**
   * 事务管理器接口
   * 负责创建和提交事务请求
   */
  interface TransactionManager {
    /**
     * 创建一个新的事务请求
     * 
     * @param requestType - 请求类型（来自HSFPConstants.RequestType枚举）
     * @param args - 请求参数数组
     * @returns 事务请求对象
     */
    createRequest(
      requestType: HSFPConstants.RequestType,
      args: unknown[]
    ): TransactionRequest;

    /**
     * 提交事务请求以执行
     * 
     * @param request - 要提交的事务请求
     */
    commit(request: TransactionRequest): void;
  }

  /**
   * 事务请求对象（不透明类型）
   */
  interface TransactionRequest {}
}

declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   * 定义了系统中所有可用的事务请求类型
   */
  enum RequestType {
    /**
     * 添加墙体装饰的请求类型
     */
    AddWallMolding = 'AddWallMolding'
  }
}

/**
 * 产品元数据接口
 * 包含装饰产品的详细信息
 */
interface ProductMeta {
  /** 产品唯一标识符 */
  id: string;
  /** 产品名称 */
  name?: string;
  /** 产品类型 */
  type?: string;
  /** 其他产品属性 */
  [key: string]: unknown;
}

/**
 * 墙面面片接口
 * 表示需要添加装饰的墙体表面
 */
interface WallFace {
  /** 面片唯一标识符 */
  id: string;
  /** 面片法向量（可选） */
  normal?: [number, number, number];
  /** 面片顶点坐标（可选） */
  vertices?: number[][];
  /** 其他面片属性 */
  [key: string]: unknown;
}

/**
 * 装饰类型枚举或字符串
 * 定义装饰的具体类型（如踢脚线、腰线、顶角线等）
 */
type MoldingType = string;

/**
 * 添加墙体装饰命令类
 * 
 * 该命令用于在指定的墙面上添加装饰元素。
 * 
 * @example
 *