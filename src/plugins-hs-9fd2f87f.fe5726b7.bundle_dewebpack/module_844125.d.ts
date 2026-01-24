/**
 * 添加自定义模型装饰操作的事务请求
 * 
 * 该类用于封装添加自定义模型装饰（molding）的操作，支持撤销/重做功能。
 * 继承自 HSCore.Transaction.Request 基类。
 */
declare class AddCustomizedModelMoldingRequest extends HSCore.Transaction.Request {
  /**
   * 装饰元数据，包含创建装饰所需的配置信息
   */
  private _meta: unknown;

  /**
   * 父级自定义模型实例
   */
  private _parentCustomizedModel: HSCore.Model.CustomizedModel;

  /**
   * 操作前的 WebCAD 文档序列化字符串
   */
  private _webcadDocBefore: string;

  /**
   * 操作后的 WebCAD 文档序列化字符串
   */
  private _webcadDocAfter: string;

  /**
   * 装饰规格，包含创建的装饰对象及其父级模型的引用
   */
  private _spec?: {
    /** 创建的装饰对象 */
    molding: unknown;
    /** 父级自定义模型 */
    parent: HSCore.Model.CustomizedModel;
  };

  /**
   * 构造函数
   * 
   * @param meta - 装饰元数据配置
   * @param parentCustomizedModel - 父级自定义模型实例
   */
  constructor(meta: unknown, parentCustomizedModel: HSCore.Model.CustomizedModel);

  /**
   * 提交操作：创建并添加装饰到自定义模型
   * 
   * 该方法会：
   * 1. 根据元数据创建装饰对象
   * 2. 将装饰添加到父级模型
   * 3. 保存操作后的文档状态用于重做
   */
  onCommit(): void;

  /**
   * 撤销操作：移除装饰并恢复到操作前的文档状态
   */
  onUndo(): void;

  /**
   * 重做操作：重新添加装饰并恢复到操作后的文档状态
   */
  onRedo(): void;
}

/**
 * 工厂函数：创建 AddCustomizedModelMoldingRequest 类
 * 
 * @param baseClass - 基类 HSCore.Transaction.Request
 * @returns 继承自基类的 AddCustomizedModelMoldingRequest 类
 */
export default function createAddCustomizedModelMoldingRequest(
  baseClass: typeof HSCore.Transaction.Request
): typeof AddCustomizedModelMoldingRequest;