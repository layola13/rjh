/**
 * 内容删除事务类的类型定义
 * @module DeleteContentTransaction
 */

/**
 * 内容对象接口，表示可以从场景中删除的实体
 */
interface IContent {
  /** 内容的宿主对象 */
  host?: IContent;
  
  /**
   * 获取内容的宿主对象
   * @returns 宿主内容对象
   */
  getHost(): IContent | null;
  
  /**
   * 获取代理对象
   * @returns 代理对象实例
   */
  getProxyObject(): IProxyObject | null;
  
  /**
   * 将内容分配给新的宿主
   * @param host - 新的宿主内容对象
   */
  assignTo(host: IContent): void;
}

/**
 * 代理对象接口，处理内容在场景中的实际操作
 */
interface IProxyObject {
  /**
   * 从平面图中移除内容
   * @param content - 要移除的内容对象
   */
  removeFromFloorplan(content: IContent): void;
  
  /**
   * 更新台面
   * @param content - 要更新的内容对象
   */
  updateCounterTop(content: IContent): void;
}

/**
 * 内容规格信息，包含删除操作的详细信息
 */
interface IContentSpec {
  [key: string]: unknown;
}

/**
 * 状态请求基类接口
 */
interface IStateRequest {
  /**
   * 提交事务
   * @returns 事务执行结果
   */
  onCommit(): unknown;
  
  /**
   * 撤销事务
   */
  onUndo(): void;
  
  /**
   * 检查字段是否可事务化
   * @returns 是否可事务化
   */
  canTransactField(): boolean;
  
  /**
   * 获取事务描述
   * @returns 事务的文本描述
   */
  getDescription(): string;
  
  /**
   * 获取事务分类
   * @returns 事务所属的日志组类型
   */
  getCategory(): string;
}

/**
 * 日志组类型常量
 */
declare namespace HSFPConstants {
  enum LogGroupTypes {
    /** 内容操作类型 */
    ContentOperation = "ContentOperation"
  }
}

/**
 * 核心工具类命名空间
 */
declare namespace HSCore {
  namespace Util {
    namespace Content {
      /**
       * 移除内容的工具方法
       * @param content - 要移除的内容对象
       * @returns 移除操作的规格信息
       */
      function removeContent(content: IContent): IContentSpec;
    }
  }
  
  namespace Model {
    /**
     * 内容模型类
     */
    class Content {
      /** 内容的宿主对象 */
      host?: Content;
    }
  }
  
  namespace Transaction {
    namespace Common {
      /**
       * 状态请求基类
       */
      class StateRequest implements IStateRequest {
        onCommit(): unknown;
        onUndo(): void;
        canTransactField(): boolean;
        getDescription(): string;
        getCategory(): string;
        
        /**
         * 尝试创建实体代理的撤销重做对象
         * @param content - 内容对象
         */
        protected tryCreateEntityProxyUndoRedoObject(content: IContent): void;
      }
    }
  }
}

/**
 * 应用工具类命名空间
 */
declare namespace HSApp {
  namespace Util {
    namespace Content {
      /**
       * 检查内容是否为自定义模型
       * @param content - 要检查的内容对象
       * @returns 是否为自定义模型
       */
      function isCustomModel(content: IContent): boolean;
    }
  }
}

/**
 * 删除内容事务类
 * 负责处理内容删除操作的撤销和重做功能
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 * 
 * @example
 *