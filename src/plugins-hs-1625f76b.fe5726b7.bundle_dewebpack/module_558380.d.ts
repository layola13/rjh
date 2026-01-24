/**
 * 模拟内容事务请求
 * 用于管理实体模拟内容的修改、撤销和重做操作
 */

/**
 * 实体接口 - 定义可进行模拟内容操作的实体
 */
interface ISimulatableEntity {
  /** 当前模拟内容 */
  simulatedContent: unknown;
  
  /**
   * 设置模拟内容
   * @param meta - 元数据信息
   */
  setSimulationContent(meta: unknown): void;
  
  /**
   * 获取当前宿主
   * @returns 宿主对象或undefined
   */
  getHost(): unknown;
  
  /**
   * 分配到指定宿主
   * @param host - 目标宿主
   */
  assignTo(host: unknown): void;
}

/**
 * 模拟内容事务请求类
 * 继承自HSCore.Transaction.Request，用于管理实体模拟内容的变更历史
 */
export default class SimulationContentTransactionRequest extends HSCore.Transaction.Request {
  /** 操作的实体对象 */
  private entity: ISimulatableEntity;
  
  /** 元数据信息 */
  private meta: unknown;
  
  /** 目标宿主 */
  private host?: unknown;
  
  /** 修改前的模拟内容快照 */
  private beforeSimulatedContent: unknown;
  
  /** 修改后的模拟内容快照 */
  private afterSimulatedContent?: unknown;
  
  /** 修改前的宿主 */
  private beforeHost: unknown;

  /**
   * 创建模拟内容事务请求
   * @param entity - 要操作的实体
   * @param meta - 元数据信息
   * @param host - 可选的目标宿主
   */
  constructor(entity: ISimulatableEntity, meta: unknown, host?: unknown);

  /**
   * 提交事务
   * 应用模拟内容变更并分配到新宿主（如果指定）
   */
  onCommit(): void;

  /**
   * 撤销事务
   * 恢复到修改前的模拟内容和宿主
   */
  onUndo(): void;

  /**
   * 重做事务
   * 重新应用模拟内容变更和宿主分配
   */
  onRedo(): void;
}

/**
 * 全局HSCore命名空间扩展
 */
declare global {
  namespace HSCore {
    namespace Transaction {
      /**
       * 事务请求基类
       */
      class Request {
        /** 提交事务时调用 */
        onCommit?(): void;
        /** 撤销事务时调用 */
        onUndo?(): void;
        /** 重做事务时调用 */
        onRedo?(): void;
      }
    }
  }
}