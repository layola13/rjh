/**
 * 激活图层命令模块
 * 用于处理多层切换到指定楼层的操作
 */

/**
 * 事务请求接口
 * 表示一个可提交的事务请求对象
 */
interface ITransactionRequest {
  // 事务请求的具体实现由 TransactionManager 管理
}

/**
 * 图层对象接口
 * 表示场景中的一个图层实体
 */
interface ILayer {
  /** 图层的唯一标识符 */
  ID: string | number;
}

/**
 * 事务管理器接口
 * 负责创建和提交事务请求
 */
interface ITransactionManager {
  /**
   * 创建一个新的事务请求
   * @param requestType - 请求类型，来自 HSFPConstants.RequestType
   * @param args - 请求参数数组
   * @returns 创建的事务请求对象
   */
  createRequest(requestType: string | number, args: unknown[]): ITransactionRequest;

  /**
   * 提交事务请求
   * @param request - 要提交的事务请求
   */
  commit(request: ITransactionRequest): void;
}

/**
 * 命令执行上下文接口
 * 提供命令执行所需的环境和管理器
 */
interface ICommandContext {
  /** 事务管理器，用于创建和提交事务 */
  transManager: ITransactionManager;
}

/**
 * 命令管理器接口
 * 负责管理命令的生命周期
 */
interface ICommandManager {
  /**
   * 标记命令执行完成
   * @param command - 已完成的命令实例
   */
  complete(command: HSApp.Cmd.Command): void;
}

/**
 * HSApp 命名空间
 * 包含应用核心的命令系统
 */
declare namespace HSApp {
  namespace Cmd {
    /**
     * 命令基类
     * 所有命令都应继承此抽象类
     */
    abstract class Command {
      /** 命令管理器实例 */
      protected mgr: ICommandManager;

      /**
       * 执行命令的核心逻辑
       * 子类必须实现此方法
       */
      abstract onExecute(): void;

      /**
       * 清理命令占用的资源
       * 在命令完成或取消时调用
       */
      abstract onCleanup(): void;

      /**
       * 判断命令是否支持撤销/重做
       * @returns true 表示支持撤销重做
       */
      abstract canUndoRedo(): boolean;

      /**
       * 获取命令的描述信息
       * 用于日志记录和调试
       * @returns 命令描述字符串
       */
      abstract getDescription(): string;

      /**
       * 判断命令是否需要用户交互
       * @returns true 表示需要用户交互
       */
      abstract isInteractive(): boolean;

      /**
       * 获取命令所属的分类
       * @returns 命令分类标识
       */
      abstract getCategory(): string | number;
    }
  }
}

/**
 * HSFPConstants 命名空间
 * 包含系统常量定义
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举或常量对象
   */
  namespace RequestType {
    /** 激活图层的请求类型 */
    const ActiveLayer: string | number;
  }

  /**
   * 日志分组类型枚举或常量对象
   */
  namespace LogGroupTypes {
    /** 墙体操作相关的日志分组 */
    const WallOperation: string | number;
  }
}

/**
 * 激活图层命令类
 * 
 * 用于将指定的图层设置为当前活动图层，支持多层场景的楼层切换操作。
 * 该命令支持撤销/重做，属于墙体操作类别。
 * 
 * @example
 *