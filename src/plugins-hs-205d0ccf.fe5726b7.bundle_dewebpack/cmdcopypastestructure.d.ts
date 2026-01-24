/**
 * 复制粘贴结构体命令
 * 用于处理结构体的复制和粘贴操作
 */

/**
 * 命令选项接口
 */
interface CmdCopyPasteStructureOptions {
  /** 选中的内容数组，第一个元素为要复制的结构体 */
  selectedContents: unknown[];
}

/**
 * 事务请求接口
 */
interface TransactionRequest {
  /** 请求类型标识 */
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
   * @param request 待提交的请求
   * @returns 提交结果
   */
  commit(request: TransactionRequest): unknown;
}

/**
 * 命令上下文接口
 */
interface CommandContext {
  /** 事务管理器实例 */
  transManager: TransactionManager;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 标记命令完成
   * @param command 已完成的命令实例
   */
  complete(command: unknown): void;
}

/**
 * 命令基类接口
 */
interface Command {
  /** 命令执行上下文 */
  context: CommandContext;
  /** 命令管理器 */
  mgr: CommandManager;
  /** 命令输出结果 */
  output?: unknown[];
  
  /**
   * 执行命令
   */
  onExecute(): void;
  
  /**
   * 命令完成回调
   */
  onComplete(): void;
  
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
 * 复制粘贴结构体命令类
 * 继承自HSApp.Cmd.Command基类，用于执行结构体的复制粘贴操作
 */
declare class CmdCopyPasteStructure extends HSApp.Cmd.Command implements Command {
  /** 要复制的结构体对象 */
  private structure: unknown;
  
  /** 事务管理器实例 */
  private transManager: TransactionManager;
  
  /** 事务请求对象 */
  private _request: TransactionRequest;
  
  /**
   * 构造函数
   * @param options 命令选项，包含选中的结构体内容
   */
  constructor(options: CmdCopyPasteStructureOptions);
  
  /**
   * 执行命令
   * 创建复制粘贴结构体的事务请求并标记命令完成
   */
  onExecute(): void;
  
  /**
   * 命令完成回调
   * 提交事务请求并将结果存储到output中
   */
  onComplete(): void;
  
  /**
   * 获取命令描述
   * @returns 返回"复制粘贴结构体"
   */
  getDescription(): string;
  
  /**
   * 获取命令分类
   * @returns 返回内容操作日志分组类型
   */
  getCategory(): string;
}

/**
 * 导出命令类
 */
export { CmdCopyPasteStructure };