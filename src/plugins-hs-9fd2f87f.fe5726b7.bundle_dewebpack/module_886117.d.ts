/**
 * 自定义模型成型添加事务请求
 * 用于在自定义模型中添加光槽（light slot）成型，支持撤销/重做操作
 */

/**
 * 光槽元数据接口
 */
interface LightSlotMeta {
  /** 光槽标识符 */
  id?: string;
  /** 光槽类型 */
  type?: string;
  /** 光槽参数 */
  parameters?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * 自定义模型接口
 */
interface CustomizedModel {
  /** WebCAD文档对象 */
  webCADDocument: unknown;
  /** 模型标识符 */
  id?: string;
  [key: string]: unknown;
}

/**
 * 光槽对象接口
 */
interface LightSlot {
  /** 光槽唯一标识 */
  id: string;
  /** 光槽元数据 */
  meta: LightSlotMeta;
  [key: string]: unknown;
}

/**
 * 成型规格接口
 */
interface MoldingSpec {
  /** 光槽实例 */
  lightSlot: LightSlot;
  /** 父级自定义模型 */
  parent: CustomizedModel;
}

/**
 * 事务请求基类
 */
declare class TransactionRequest {
  /** 提交事务 */
  onCommit(): void;
  /** 撤销事务 */
  onUndo(): void;
  /** 重做事务 */
  onRedo(): void;
}

/**
 * 添加自定义模型成型的事务请求类
 * 继承自HSCore.Transaction.Request，实现撤销/重做功能
 */
export default class AddCustomizedModelMoldingRequest extends TransactionRequest {
  /** 光槽元数据 */
  private readonly _meta: LightSlotMeta;
  
  /** 父级自定义模型引用 */
  private readonly _parentCustomizedModel: CustomizedModel;
  
  /** 操作前的WebCAD文档序列化字符串 */
  private readonly _webcadDocBefore: string;
  
  /** 操作后的WebCAD文档序列化字符串 */
  private _webcadDocAfter: string;
  
  /** 成型规格（在commit后生成） */
  private _spec?: MoldingSpec;

  /**
   * 构造函数
   * @param meta - 光槽元数据配置
   * @param parentCustomizedModel - 父级自定义模型实例
   */
  constructor(meta: LightSlotMeta, parentCustomizedModel: CustomizedModel);

  /**
   * 提交事务：创建光槽并添加到父模型
   * 保存操作后的文档状态用于重做
   */
  onCommit(): void;

  /**
   * 撤销事务：移除光槽并恢复原始文档状态
   */
  onUndo(): void;

  /**
   * 重做事务：重新添加光槽并恢复操作后的文档状态
   */
  onRedo(): void;
}

/**
 * HSCore命名空间声明（全局类型补充）
 */
declare namespace HSCore {
  namespace Model {
    namespace CustomizedModel {
      /**
       * 序列化WebCAD文档为字符串
       * @param document - WebCAD文档对象
       * @returns 序列化后的JSON字符串
       */
      function stringifyWebCADDocument(document: unknown): string;
      
      /**
       * 解析WebCAD文档字符串
       * @param documentString - 序列化的文档字符串
       * @returns WebCAD文档对象
       */
      function parseWebCADDocument(documentString: string): unknown;
    }
  }

  namespace Util {
    namespace CustomizedModel {
      /**
       * 创建自定义模型光槽实例
       * @param meta - 光槽元数据
       * @returns 光槽对象
       */
      function createCustomizedModelLightSlot(meta: LightSlotMeta): LightSlot;
    }

    namespace Content {
      /**
       * 添加自定义模型成型
       * @param spec - 成型规格
       */
      function addCustomizedModelMolding(spec: MoldingSpec): void;
      
      /**
       * 移除自定义模型成型
       * @param lightSlot - 要移除的光槽对象
       */
      function removeCustomizedModelMolding(lightSlot: LightSlot): void;
    }
  }

  namespace Transaction {
    /**
     * 事务请求基类
     */
    class Request extends TransactionRequest {}
  }
}