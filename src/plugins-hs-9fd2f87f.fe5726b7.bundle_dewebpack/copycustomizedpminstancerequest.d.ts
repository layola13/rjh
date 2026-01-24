/**
 * 复制定制化参数化建模（PM）实例的请求类
 * 
 * 该类继承自HSCore.Transaction.Request，用于处理定制化PM实例的复制操作，
 * 并支持撤销/重做功能。
 */
export declare class CopyCustomizedPMInstanceRequest extends HSCore.Transaction.Request {
  /**
   * 要复制的实体列表
   * @private
   */
  private _entities: unknown[];

  /**
   * 移动向量，用于指定复制后实例的位置偏移
   * @private
   */
  private _moveVec: unknown;

  /**
   * 根模型，从第一个实体获取的唯一父级
   * @private
   */
  private _rootModel?: {
    webCADDocument: string;
    openDiyDocument(flag: boolean): Promise<void>;
  };

  /**
   * 操作前的WebCAD文档状态
   * @private
   */
  private _webcadDocBefore: string;

  /**
   * 操作后的WebCAD文档状态
   * @private
   */
  private _webcadDocAfter: string;

  /**
   * 复制操作产生的新实体列表
   * @private
   */
  private _newEntities?: unknown[];

  /**
   * 构造函数
   * 
   * @param entities - 要复制的实体数组
   * @param moveVec - 移动向量，定义复制后的位置偏移
   */
  constructor(entities: unknown[], moveVec: unknown);

  /**
   * 提交操作时执行
   * 
   * 调用CustomizedPMModel工具类复制定制化PM实例，
   * 并保存操作后的文档状态。
   */
  onCommit(): void;

  /**
   * 撤销操作时执行
   * 
   * 恢复到操作前的文档状态，重新打开DIY文档，
   * 并移除所有新创建的实体。
   * 
   * @returns Promise，在文档恢复完成后resolve
   */
  onUndo(): Promise<void>;

  /**
   * 重做操作时执行
   * 
   * 恢复到操作后的文档状态，重新打开DIY文档，
   * 并重新添加之前创建的实体。
   * 
   * @returns Promise，在文档恢复完成后resolve
   */
  onRedo(): Promise<void>;
}

/**
 * 全局类型扩展
 */
declare global {
  namespace HSApp {
    namespace Util {
      namespace CustomizedPMModel {
        /**
         * 复制定制化PM实例
         * 
         * @param entities - 要复制的实体列表
         * @param moveVec - 移动向量
         * @returns Promise，resolve时返回新创建的实体数组
         */
        function copyCustomizedPMInstance(
          entities: unknown[],
          moveVec: unknown
        ): Promise<unknown[]>;

        /**
         * 移除定制化PM实例
         * 
         * @param entity - 要移除的实体
         */
        function removeCustomizedPMInstance(entity: unknown): void;

        /**
         * 添加定制化PM实例
         * 
         * @param options - 配置选项
         * @param options.insModel - 实例模型
         * @param options.rootModel - 根模型
         */
        function addCustomizedPMInstance(options: {
          insModel: unknown;
          rootModel: unknown;
        }): void;
      }
    }
  }

  namespace HSCore {
    namespace Transaction {
      /**
       * 事务请求基类
       */
      abstract class Request {
        /**
         * 提交操作时调用
         */
        abstract onCommit(): void;

        /**
         * 撤销操作时调用
         */
        abstract onUndo(): void | Promise<void>;

        /**
         * 重做操作时调用
         */
        abstract onRedo(): void | Promise<void>;
      }
    }
  }
}