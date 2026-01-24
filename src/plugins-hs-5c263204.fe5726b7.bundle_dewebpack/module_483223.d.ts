/**
 * 删除模型组合命令
 * 用于删除选中的模型组合对象
 */
declare module 'module_483223' {
  import { Command } from 'HSApp.Cmd';

  /**
   * 删除组合命令类
   * 继承自HSApp.Cmd.Command基类，实现模型组合的删除、撤销和重做功能
   */
  export default class DeleteAssemblyCommand extends Command {
    /**
     * 要删除的模型组合对象
     * @private
     */
    private _group: any;

    /**
     * 事务请求对象，用于撤销/重做操作
     * @private
     */
    private _request: any;

    /**
     * 构造函数
     * @param group - 需要删除的模型组合对象
     */
    constructor(group: any);

    /**
     * 执行删除操作
     * 1. 取消选中当前组合
     * 2. 创建删除组合的事务请求
     * 3. 提交事务并完成命令
     */
    onExecute(): void;

    /**
     * 撤销删除操作
     * 调用事务请求的撤销方法恢复删除的组合
     */
    onUndo(): void;

    /**
     * 重做删除操作
     * 调用事务请求的重做方法再次删除组合
     */
    onRedo(): void;

    /**
     * 获取命令描述
     * @returns 命令的中文描述文本
     */
    getDescription(): string;

    /**
     * 获取命令所属分类
     * @returns 命令分类类型（内容操作）
     */
    getCategory(): HSFPConstants.LogGroupTypes;
  }
}

/**
 * HSApp命令命名空间声明
 */
declare namespace HSApp.Cmd {
  /**
   * 命令基类
   * 所有命令需继承此类并实现相关方法
   */
  export class Command {
    /**
     * 命令上下文对象
     * 提供应用程序、事务管理器等核心服务的访问接口
     */
    protected context: {
      /** 应用程序实例 */
      app: {
        /** 选择管理器，用于管理对象的选中状态 */
        selectionManager: {
          /**
           * 取消选中指定对象
           * @param target - 要取消选中的对象
           */
          unselect(target: any): void;
        };
      };
      /** 事务管理器，用于创建和提交可撤销的事务 */
      transManager: {
        /**
         * 创建事务请求
         * @param requestType - 请求类型常量
         * @param args - 请求参数数组
         * @returns 创建的事务请求对象
         */
        createRequest(requestType: string, args: any[]): any;
        /**
         * 提交事务请求
         * @param request - 要提交的事务请求
         */
        commit(request: any): void;
      };
    };

    /**
     * 命令管理器
     * 用于管理命令的生命周期
     */
    protected mgr: {
      /**
       * 标记命令完成
       * @param command - 已完成的命令实例
       */
      complete(command: Command): void;
    };
  }
}

/**
 * HSFP常量命名空间声明
 */
declare namespace HSFPConstants {
  /**
   * 请求类型常量
   */
  export const RequestType: {
    /** 删除组合请求类型 */
    readonly DeleteAssembly: string;
  };

  /**
   * 日志分组类型枚举
   */
  export enum LogGroupTypes {
    /** 内容操作类型 */
    ContentOperation = 'ContentOperation'
  }
}