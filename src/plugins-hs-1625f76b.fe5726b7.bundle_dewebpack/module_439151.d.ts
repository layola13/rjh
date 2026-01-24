/**
 * 删除产品命令
 * 用于删除场景中的内容对象，支持撤销/重做操作
 */

/**
 * 内容对象接口
 * 表示可被删除的场景内容
 */
interface IContent {
  // 内容对象的具体属性由实际实现定义
  [key: string]: any;
}

/**
 * 事务请求接口
 * 用于管理删除操作的事务
 */
interface ITransactionRequest {
  /**
   * 提交事务
   */
  commit(): void;
  
  /**
   * 撤销操作
   */
  onUndo(): void;
  
  /**
   * 重做操作
   */
  onRedo(): void;
}

/**
 * 选择管理器接口
 */
interface ISelectionManager {
  /**
   * 取消选择指定内容
   * @param content - 要取消选择的内容对象
   */
  unselect(content: IContent): void;
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 创建事务请求
   * @param requestType - 请求类型
   * @param params - 请求参数数组
   * @returns 事务请求对象
   */
  createRequest(requestType: string, params: any[]): ITransactionRequest;
}

/**
 * 应用上下文接口
 */
interface IAppContext {
  /**
   * 选择管理器
   */
  selectionManager: ISelectionManager;
}

/**
 * 命令上下文接口
 */
interface ICommandContext {
  /**
   * 应用实例
   */
  app: IAppContext;
  
  /**
   * 事务管理器
   */
  transManager: ITransactionManager;
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  /**
   * 完成命令执行
   * @param command - 已完成的命令
   */
  complete(command: ICommand): void;
}

/**
 * 命令基类接口
 */
interface ICommand {
  /**
   * 命令上下文
   */
  context: ICommandContext;
  
  /**
   * 命令管理器
   */
  mgr?: ICommandManager;
  
  /**
   * 执行命令
   */
  onExecute(): void;
  
  /**
   * 撤销命令
   */
  onUndo(): void;
  
  /**
   * 重做命令
   */
  onRedo(): void;
  
  /**
   * 获取命令描述
   */
  getDescription(): string;
  
  /**
   * 获取命令分类
   */
  getCategory(): string;
}

/**
 * 删除产品命令类
 * 继承自HSApp.Cmd.Command基类，实现内容删除功能
 */
declare class DeleteProductCommand extends HSApp.Cmd.Command implements ICommand {
  /**
   * 要删除的内容对象
   */
  private _content: IContent;
  
  /**
   * 事务请求对象
   */
  private _request: ITransactionRequest;
  
  /**
   * 构造函数
   * @param content - 要删除的内容对象
   */
  constructor(content: IContent);
  
  /**
   * 执行删除操作
   * 1. 取消选择目标内容
   * 2. 创建删除事务请求
   * 3. 提交事务
   * 4. 通知管理器完成
   */
  onExecute(): void;
  
  /**
   * 撤销删除操作
   * 恢复被删除的内容
   */
  onUndo(): void;
  
  /**
   * 重做删除操作
   * 重新执行删除
   */
  onRedo(): void;
  
  /**
   * 获取命令描述
   * @returns 返回"删除物品"
   */
  getDescription(): string;
  
  /**
   * 获取命令分类
   * @returns 返回内容操作类型
   */
  getCategory(): string;
}

/**
 * HSFPConstants 常量命名空间
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /**
     * 删除产品请求类型
     */
    DeleteProduct = "DeleteProduct"
  }
  
  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    /**
     * 内容操作类型
     */
    ContentOperation = "ContentOperation"
  }
}

/**
 * HSApp 应用命名空间
 */
declare namespace HSApp {
  namespace Cmd {
    /**
     * 命令基类
     */
    class Command implements ICommand {
      context: ICommandContext;
      mgr?: ICommandManager;
      
      onExecute(): void;
      onUndo(): void;
      onRedo(): void;
      getDescription(): string;
      getCategory(): string;
    }
  }
}

export default DeleteProductCommand;