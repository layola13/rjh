/**
 * 解除模型组合命令
 * 用于将组合对象拆分为独立成员的命令类
 */
declare module "module_124190" {
  import { Command } from "HSApp.Cmd";

  /**
   * 组合对象接口
   * 表示可以被解除组合的模型组
   */
  interface IGroup {
    /** 组成员列表 */
    members: unknown[];
  }

  /**
   * 选择管理器接口
   * 负责管理对象的选中状态
   */
  interface ISelectionManager {
    /** 取消选中指定对象 */
    unselect(target: unknown): void;
    /** 选中指定对象 */
    select(target: unknown): void;
    /** 检查对象是否已被选中 */
    hasSelected(target: unknown): boolean;
  }

  /**
   * 事务请求接口
   * 表示可撤销/重做的操作请求
   */
  interface ITransactionRequest {
    /** 撤销操作 */
    onUndo(): void;
    /** 重做操作 */
    onRedo(): void;
  }

  /**
   * 事务管理器接口
   * 负责创建和提交事务请求
   */
  interface ITransactionManager {
    /**
     * 创建事务请求
     * @param requestType 请求类型常量
     * @param args 请求参数数组
     */
    createRequest(requestType: number, args: unknown[]): ITransactionRequest;
    /** 提交事务请求 */
    commit(request: ITransactionRequest): void;
  }

  /**
   * 应用上下文接口
   */
  interface IAppContext {
    app: {
      /** 选择管理器实例 */
      selectionManager: ISelectionManager;
    };
    /** 事务管理器实例 */
    transManager: ITransactionManager;
  }

  /**
   * 命令管理器接口
   */
  interface ICommandManager {
    /** 标记命令执行完成 */
    complete(command: UngroupCommand): void;
  }

  /**
   * 解除组合命令类
   * 继承自 HSApp.Cmd.Command，用于将组合模型拆分为独立成员
   */
  export default class UngroupCommand extends Command {
    /** 目标组合对象 */
    private _group: IGroup;
    
    /** 组成员快照（用于撤销操作） */
    private _members: unknown[];
    
    /** 关联的事务请求 */
    private _request?: ITransactionRequest;
    
    /** 应用上下文 */
    protected context: IAppContext;
    
    /** 命令管理器 */
    protected mgr: ICommandManager;

    /**
     * 构造函数
     * @param group 要解除组合的对象
     */
    constructor(group: IGroup);

    /**
     * 执行命令
     * 取消选中组合对象，创建并提交解除组合的事务请求
     */
    onExecute(): void;

    /**
     * 撤销命令
     * 恢复组合状态，如果成员被选中则重新选中组合对象
     */
    onUndo(): void;

    /**
     * 重做命令
     * 重新执行解除组合操作
     */
    onRedo(): void;

    /**
     * 获取命令描述
     * @returns 命令的用户可读描述文本
     */
    getDescription(): string;

    /**
     * 获取命令分类
     * @returns 日志分组类型常量
     */
    getCategory(): number;
  }

  /**
   * 全局常量命名空间
   */
  declare namespace HSFPConstants {
    /** 请求类型枚举 */
    enum RequestType {
      /** 解除组合内容操作 */
      UngroupContents = 0
    }

    /** 日志分组类型枚举 */
    enum LogGroupTypes {
      /** 内容操作分类 */
      ContentOperation = 0
    }
  }

  /**
   * 全局应用命名空间
   */
  declare namespace HSApp.Cmd {
    /**
     * 命令基类
     * 所有可执行命令的抽象基类
     */
    abstract class Command {
      /** 应用上下文 */
      protected context: IAppContext;
      
      /** 命令管理器 */
      protected mgr: ICommandManager;

      /** 执行命令的抽象方法 */
      abstract onExecute(): void;
      
      /** 撤销命令的抽象方法 */
      abstract onUndo(): void;
      
      /** 重做命令的抽象方法 */
      abstract onRedo(): void;
      
      /** 获取命令描述 */
      abstract getDescription(): string;
      
      /** 获取命令分类 */
      abstract getCategory(): number;
    }
  }
}