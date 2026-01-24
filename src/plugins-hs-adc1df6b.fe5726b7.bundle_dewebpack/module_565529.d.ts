/**
 * 屋顶参数修改信息接口
 * 用于描述屋顶的参数配置信息
 */
interface RoofParameterInfo {
  [key: string]: unknown;
}

/**
 * 事务请求接口
 * 封装了对事务管理器的请求操作
 */
interface TransactionRequest<TResult = unknown> {
  /** 请求执行后的结果 */
  readonly result: TResult;
}

/**
 * 事务管理器接口
 * 负责创建和提交事务请求
 */
interface TransactionManager {
  /**
   * 创建一个新的事务请求
   * @param requestType 请求类型
   * @param args 请求参数数组
   */
  createRequest<TResult = unknown>(
    requestType: HSFPConstants.RequestType,
    args: unknown[]
  ): TransactionRequest<TResult>;

  /**
   * 提交事务请求
   * @param request 要提交的请求对象
   */
  commit(request: TransactionRequest): void;
}

/**
 * 命令管理器接口
 * 负责管理和执行命令
 */
interface CommandManager {
  /** 当前正在执行的命令 */
  current?: Command;

  /**
   * 完成指定的命令
   * @param command 要完成的命令
   */
  complete(command: Command): void;
}

/**
 * 应用程序实例接口
 */
interface AppInstance {
  /** 事务管理器 */
  readonly transManager: TransactionManager;
  
  /** 命令管理器 */
  readonly cmdManager: CommandManager;
}

/**
 * HSApp命名空间
 */
declare namespace HSApp {
  namespace App {
    /**
     * 获取应用程序单例实例
     */
    function getApp(): AppInstance;
  }

  namespace Cmd {
    /**
     * 命令基类
     * 所有命令都应继承此类
     */
    class Command {
      /** 命令执行的上下文环境 */
      protected context: {
        transManager: TransactionManager;
      };

      /** 命令类型标识 */
      type?: HSFPConstants.CommandType;

      /** 命令管理器引用 */
      mgr?: CommandManager;

      /**
       * 执行命令
       * @returns 命令执行结果
       */
      onExecute(): unknown;

      /**
       * 完成命令
       */
      onComplete(): void;

      /**
       * 获取命令描述
       */
      getDescription(): string;

      /**
       * 获取命令所属分类
       */
      getCategory(): HSFPConstants.LogGroupTypes;
    }
  }
}

/**
 * HSFPConstants命名空间
 * 包含所有常量定义
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /** 修改屋顶参数 */
    ChangeRoofParam = 'ChangeRoofParam',
  }

  /**
   * 命令类型枚举
   */
  enum CommandType {
    /** 修改屋顶参数命令 */
    ChangeRoofParam = 'ChangeRoofParam',
  }

  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    /** 硬性操作(不可撤销的重要操作) */
    HardOperation = 'HardOperation',
  }
}

/**
 * 剪辑任务集成工具类
 * 单例模式,用于处理剪辑任务相关操作
 */
declare class ClipTaskIntegration {
  /**
   * 获取剪辑任务集成单例实例
   */
  static getInstance(): ClipTaskIntegration;

  /**
   * 监听剪辑任务信号
   */
  listenClipTaskSignal(): void;

  /**
   * 延迟运行剪辑任务
   * @param callback 任务回调函数
   * @param shouldShowUI 是否需要显示UI界面
   */
  runClipTaskDefer(callback: () => void, shouldShowUI: boolean): void;

  /**
   * 判断是否需要显示UI界面
   * @param roof 屋顶对象
   * @returns 是否需要显示UI
   */
  isNeedShowUI(roof: unknown): boolean;
}

/**
 * 修改屋顶参数命令类
 * 用于修改屋顶的参数配置,支持事务管理和剪辑任务集成
 */
declare class ChangeRoofParamCommand extends HSApp.Cmd.Command {
  /** 要修改的屋顶对象 */
  private _roof: unknown;

  /** 事务请求对象 */
  private _request?: TransactionRequest;

  /** 屋顶参数信息 */
  private _infos: RoofParameterInfo;

  /**
   * 构造函数
   * @param roof 要修改参数的屋顶对象
   * @param infos 新的屋顶参数信息
   */
  constructor(roof: unknown, infos: RoofParameterInfo);

  /**
   * 执行命令
   * 创建事务请求并返回执行结果
   * @returns 命令执行结果
   */
  onExecute(): unknown;

  /**
   * 提交事务请求
   * 将挂起的事务请求提交到事务管理器
   * @private
   */
  private _commitRequest(): void;

  /**
   * 完成命令
   * 集成剪辑任务处理,根据需要显示UI
   */
  onComplete(): void;

  /**
   * 获取命令的可读描述
   * @returns 命令描述字符串
   */
  getDescription(): string;

  /**
   * 获取命令所属的日志分类
   * @returns 日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

export default ChangeRoofParamCommand;