/**
 * 墙体冻结/解冻命令
 * 用于锁定或解锁墙体的操作命令
 * @module FreezeWallCommand
 */

/**
 * HSFPConstants 常量定义
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /** 冻结/解冻墙体请求 */
    FreezeWall = "FreezeWall"
  }

  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    /** 墙体操作分组 */
    WallOperation = "WallOperation"
  }
}

/**
 * HSApp 全局命名空间
 */
declare namespace HSApp {
  namespace Cmd {
    /**
     * 命令基类
     * 所有命令的基类
     */
    abstract class Command {
      /** 命令执行上下文 */
      protected context: CommandContext;

      /**
       * 执行命令
       * @param params - 执行参数
       */
      abstract onExecute(params: unknown): void;

      /**
       * 获取命令描述
       * @returns 命令的文本描述
       */
      abstract getDescription(): string;

      /**
       * 获取当前命令的参数配置
       * @returns 包含日志和统计相关的参数
       */
      abstract getCurrentParams(): CurrentParamsResult;

      /**
       * 获取命令分类
       * @returns 命令所属的分类标识
       */
      abstract getCategory(): string;
    }
  }
}

/**
 * 命令执行上下文接口
 */
interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 创建请求
   * @param requestType - 请求类型
   * @param params - 请求参数数组
   * @returns 创建的请求对象
   */
  createRequest(requestType: HSFPConstants.RequestType, params: unknown[]): TransactionRequest;

  /**
   * 提交事务请求
   * @param request - 要提交的请求对象
   */
  commit(request: TransactionRequest): void;
}

/**
 * 事务请求接口
 */
interface TransactionRequest {
  /** 请求类型 */
  type: HSFPConstants.RequestType;
  /** 请求参数 */
  params: unknown[];
}

/**
 * 命令参数结果接口
 */
interface CurrentParamsResult {
  /** 活动区块标识 */
  activeSection: string;
  /** 活动区块名称 */
  activeSectionName: string;
  /** 点击统计信息 */
  clicksRatio: ClicksRatioInfo;
}

/**
 * 点击统计信息接口
 */
interface ClicksRatioInfo {
  /** 操作标识符 */
  id: string;
  /** 操作名称 */
  name: string;
}

/**
 * 墙体冻结/解冻命令类
 * 继承自HSApp.Cmd.Command基类
 * 用于执行墙体的锁定和解锁操作
 */
declare class FreezeWallCommand extends HSApp.Cmd.Command {
  /**
   * 墙体标识符
   * @private
   */
  private readonly fp: string;

  /**
   * 锁定状态标识
   * true表示锁定操作,false表示解锁操作
   * @private
   */
  private readonly isLocked: boolean;

  /**
   * 构造函数
   * @param fp - 墙体的唯一标识符
   * @param isLocked - 是否为锁定操作,true为锁定,false为解锁
   */
  constructor(fp: string, isLocked: boolean);

  /**
   * 执行墙体冻结/解冻命令
   * 通过事务管理器创建并提交FreezeWall请求
   * @param params - 执行参数(传递给事务请求的额外参数)
   * @override
   */
  onExecute(params: unknown): void;

  /**
   * 获取命令的描述信息
   * @returns 根据isLocked状态返回"锁定墙体"或"解锁墙体"
   * @override
   */
  getDescription(): string;

  /**
   * 获取当前命令的参数配置
   * 用于日志记录和统计分析
   * @returns 包含操作分组和点击统计的配置对象
   * @override
   */
  getCurrentParams(): CurrentParamsResult;

  /**
   * 获取命令所属的分类
   * @returns 返回墙体操作分类标识
   * @override
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * 默认导出
 */
export default FreezeWallCommand;