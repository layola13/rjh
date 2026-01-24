/**
 * 参数化屋顶方向更新请求类型
 */
interface UpdateRoofDirectionRequest {
  /** 请求结果 */
  result: boolean;
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
  createRequest(
    requestType: HSFPConstants.RequestType,
    params: [roof: unknown, curve: unknown]
  ): UpdateRoofDirectionRequest;

  /**
   * 提交请求
   * @param request - 要提交的请求对象
   */
  commit(request: UpdateRoofDirectionRequest): void;
}

/**
 * 应用程序实例接口
 */
interface AppInstance {
  /** 事务管理器 */
  transManager: TransactionManager;
  /** 命令管理器 */
  cmdManager: {
    /** 当前命令 */
    current?: {
      /** 命令类型 */
      type?: HSFPConstants.CommandType;
      /** 命令管理器 */
      mgr: {
        /**
         * 完成命令
         * @param command - 要完成的命令
         */
        complete(command: unknown): void;
      };
    };
  };
}

/**
 * HSApp全局对象接口
 */
declare namespace HSApp {
  namespace App {
    /**
     * 获取应用程序实例
     * @returns 应用程序实例
     */
    function getApp(): AppInstance;
  }

  namespace Cmd {
    /**
     * 命令基类
     */
    class Command {
      /** 命令上下文 */
      protected context: {
        /** 事务管理器 */
        transManager: TransactionManager;
      };

      /**
       * 执行命令时调用
       */
      protected onExecute(): void;

      /**
       * 完成命令时调用
       */
      protected onComplete(): void;

      /**
       * 获取命令描述
       * @returns 命令描述文本
       */
      getDescription(): string;

      /**
       * 获取命令分类
       * @returns 命令分类常量
       */
      getCategory(): HSFPConstants.LogGroupTypes;
    }
  }
}

/**
 * 全局常量定义
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /** 更新屋顶方向 */
    UpdateRoofDirection = "UpdateRoofDirection"
  }

  /**
   * 命令类型枚举
   */
  enum CommandType {
    /** 更新屋顶方向 */
    UpdateRoofDirection = "UpdateRoofDirection"
  }

  /**
   * 日志组类型枚举
   */
  enum LogGroupTypes {
    /** 硬操作（重要操作） */
    HardOperation = "HardOperation"
  }
}

/**
 * 裁剪任务集成单例类
 */
declare class ClipTaskIntegration {
  /**
   * 获取单例实例
   * @returns ClipTaskIntegration实例
   */
  static getInstance(): ClipTaskIntegration;

  /**
   * 监听裁剪任务信号
   */
  listenClipTaskSignal(): void;

  /**
   * 延迟运行裁剪任务
   * @param callback - 要延迟执行的回调函数
   * @param showUI - 是否显示UI
   */
  runClipTaskDefer(callback: () => void, showUI: boolean): void;

  /**
   * 判断是否需要显示UI
   * @param roof - 屋顶对象
   * @returns 是否需要显示UI
   */
  isNeedShowUI(roof: unknown): boolean;
}

declare namespace ClipTaskIntergration {
  export { ClipTaskIntegration as ClipTaskIntergration };
}

/**
 * 更新参数化屋顶方向命令类
 * 
 * @remarks
 * 该命令用于修改参数化屋顶的方向，继承自HSApp.Cmd.Command基类。
 * 执行时会创建一个UpdateRoofDirection类型的请求，并在完成时提交该请求。
 * 
 * @example
 *