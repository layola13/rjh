/**
 * 命令管理器接口
 * 负责创建和执行各种命令操作
 */
interface ICommandManager {
  /**
   * 创建命令实例
   * @param commandType - 命令类型枚举值
   * @param args - 命令参数数组
   * @returns 返回创建的命令对象
   */
  createCommand<T = unknown>(
    commandType: HSFPConstants.CommandType,
    args: unknown[]
  ): ICommand<T>;

  /**
   * 执行指定的命令
   * @param command - 要执行的命令对象
   */
  execute<T = unknown>(command: ICommand<T>): void;
}

/**
 * 命令对象接口
 * 表示一个可执行的命令实例
 */
interface ICommand<T = unknown> {
  /** 命令类型 */
  readonly type: HSFPConstants.CommandType;
  /** 命令参数 */
  readonly args: unknown[];
  /** 命令执行结果（可选） */
  result?: T;
}

/**
 * 应用程序主对象接口
 */
interface IApp {
  /** 命令管理器实例 */
  readonly cmdManager: ICommandManager;
}

/**
 * 应用程序上下文接口
 */
interface IAppContext {
  /** 应用程序实例 */
  readonly _app: IApp;
}

/**
 * HSFP 常量命名空间
 * 包含应用程序中使用的各种常量定义
 */
declare namespace HSFPConstants {
  /**
   * 命令类型枚举
   * 定义了系统支持的所有命令类型
   */
  enum CommandType {
    /** 分割非承重墙命令 */
    SplitNGWall = 'SplitNGWall',
    // 其他命令类型可以在此扩展
  }
}

/**
 * 点击事件处理模块
 * 原始模块 ID: onclick
 */
declare module 'module_onclick' {
  /**
   * 墙体分割点击事件处理函数
   * 
   * 该函数创建并执行一个墙体分割命令
   * 
   * @param this - 应用程序上下文对象，包含 _app 属性
   * @param element - 要分割的墙体元素
   * 
   * @example
   *