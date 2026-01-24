/**
 * 复制粘贴梁构件命令模块
 * @module CmdCopyPasteBeam
 */

/**
 * 命令执行上下文接口
 */
interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 事务请求接口
 */
interface TransactionRequest {
  /** 请求类型 */
  type: string;
  /** 请求参数 */
  params: unknown[];
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 创建事务请求
   * @param requestType 请求类型
   * @param params 请求参数
   * @returns 事务请求对象
   */
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  
  /**
   * 提交事务请求
   * @param request 事务请求
   * @returns 提交结果
   */
  commit(request: TransactionRequest): unknown;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 完成命令执行
   * @param command 已完成的命令
   */
  complete(command: Command): void;
}

/**
 * 梁构件接口
 */
interface Beam {
  /** 构件ID */
  id?: string;
  /** 构件类型 */
  type?: string;
  [key: string]: unknown;
}

/**
 * 命令构造参数接口
 */
interface CmdCopyPasteBeamParams {
  /** 选中的内容列表 */
  selectedContents: Beam[];
}

/**
 * 命令基类
 */
declare abstract class Command {
  /** 命令执行上下文 */
  protected context: CommandContext;
  
  /** 命令管理器 */
  protected mgr: CommandManager;
  
  /** 命令输出结果 */
  protected output: unknown[];
  
  /**
   * 执行命令
   */
  abstract onExecute(): void;
  
  /**
   * 判断命令是否可撤销/重做
   * @returns 是否可撤销/重做
   */
  abstract canUndoRedo(): boolean;
  
  /**
   * 判断命令是否可挂起
   * @returns 是否可挂起
   */
  abstract canSuspend(): boolean;
  
  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  abstract getDescription(): string;
  
  /**
   * 获取命令分类
   * @returns 命令分类标识
   */
  abstract getCategory(): string;
}

/**
 * 复制粘贴梁构件命令
 * 用于复制并粘贴选中的梁结构体
 * @extends Command
 */
export declare class CmdCopyPasteBeam extends Command {
  /** 待复制的梁构件 */
  private beam: Beam;
  
  /** 事务请求对象 */
  private _request?: TransactionRequest;
  
  /**
   * 构造函数
   * @param params 命令参数，包含选中的梁构件
   */
  constructor(params: CmdCopyPasteBeamParams);
  
  /**
   * 执行复制粘贴操作
   * 创建事务请求并提交，将结果保存到输出
   */
  onExecute(): void;
  
  /**
   * 判断命令是否可撤销/重做
   * @returns 始终返回 false，该命令不支持撤销/重做
   */
  canUndoRedo(): boolean;
  
  /**
   * 判断命令是否可挂起
   * @returns 始终返回 false，该命令不支持挂起
   */
  canSuspend(): boolean;
  
  /**
   * 获取命令描述
   * @returns 返回 "复制粘贴结构体"
   */
  getDescription(): string;
  
  /**
   * 获取命令分类
   * @returns 返回内容操作分类标识
   */
  getCategory(): string;
}

/**
 * HSF平台常量
 */
declare namespace HSFPConstants {
  /** 请求类型枚举 */
  enum RequestType {
    /** 复制粘贴梁构件请求 */
    CopyPasteBeam = "CopyPasteBeam"
  }
  
  /** 日志分组类型枚举 */
  enum LogGroupTypes {
    /** 内容操作分组 */
    ContentOperation = "ContentOperation"
  }
}

/**
 * HSApp全局命名空间
 */
declare namespace HSApp {
  namespace Cmd {
    export { Command };
  }
}