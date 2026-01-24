/**
 * 解除模型组合事务请求
 * 用于撤销/重做功能中处理模型分组的解除操作
 */

/**
 * 模型分组规范接口
 */
interface IGroupSpec {
  /** 分组对象引用 */
  group: unknown;
  /** 其他分组相关属性 */
  [key: string]: unknown;
}

/**
 * 内容工具类型定义
 */
interface IContentUtil {
  /**
   * 移除模型分组
   * @param group - 要移除的分组对象
   * @returns 分组规范对象
   */
  removeGroup(group: unknown): IGroupSpec;
  
  /**
   * 添加模型分组
   * @param spec - 分组规范对象
   */
  addGroup(spec: IGroupSpec): void;
}

/**
 * 全局HSCore命名空间
 */
declare global {
  namespace HSCore {
    namespace Util {
      const Content: IContentUtil;
    }
    
    namespace Transaction {
      /**
       * 事务请求基类
       */
      class Request {
        /**
         * 提交事务时调用
         */
        onCommit(): void;
        
        /**
         * 撤销事务时调用
         */
        onUndo(): void;
        
        /**
         * 重做事务时调用
         */
        onRedo(): void;
        
        /**
         * 获取事务描述
         */
        getDescription(): string;
        
        /**
         * 获取事务分类
         */
        getCategory(): string;
      }
    }
  }
  
  namespace HSFPConstants {
    /**
     * 日志分组类型枚举
     */
    enum LogGroupTypes {
      /** 内容操作类型 */
      ContentOperation = 'ContentOperation'
    }
  }
}

/**
 * 解除模型组合事务请求类
 * 继承自HSCore.Transaction.Request，实现模型分组的解除、撤销和重做功能
 */
declare class UngroupTransactionRequest extends HSCore.Transaction.Request {
  /**
   * 存储的分组规范对象，用于撤销操作
   */
  private _spec: IGroupSpec;
  
  /**
   * 要解除的分组对象
   */
  private readonly _group: unknown;
  
  /**
   * 构造函数
   * @param group - 要解除的模型分组对象
   */
  constructor(group: unknown);
  
  /**
   * 提交事务：执行解除分组操作
   * 调用HSCore.Util.Content.removeGroup移除指定分组
   */
  onCommit(): void;
  
  /**
   * 撤销事务：恢复已解除的分组
   * 调用HSCore.Util.Content.addGroup重新添加分组
   */
  onUndo(): void;
  
  /**
   * 重做事务：再次执行解除分组操作
   * 使用存储的分组规范重新移除分组
   */
  onRedo(): void;
  
  /**
   * 获取事务操作描述
   * @returns 返回"解除模型组合"
   */
  getDescription(): string;
  
  /**
   * 获取事务分类
   * @returns 返回内容操作类型
   */
  getCategory(): string;
}

export default UngroupTransactionRequest;