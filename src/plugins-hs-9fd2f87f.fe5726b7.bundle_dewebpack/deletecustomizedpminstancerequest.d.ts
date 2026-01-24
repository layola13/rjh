/**
 * 删除自定义参数化模型实例的请求类
 * @module DeleteCustomizedPMInstanceRequest
 */

/**
 * 自定义参数化模型实例接口
 */
interface ICustomizedPMInstance {
  /**
   * 获取唯一父模型
   */
  getUniqueParent(): IRootModel | undefined;
}

/**
 * 根模型接口
 */
interface IRootModel {
  /**
   * WebCAD文档内容
   */
  webCADDocument: string;
  
  /**
   * 打开DIY文档
   * @param reset - 是否重置
   */
  openDiyDocument(reset: boolean): Promise<void>;
}

/**
 * 删除规格信息接口
 */
interface IDeleteSpec {
  /**
   * 实例模型列表
   */
  insModels: ICustomizedPMInstance[];
  
  /**
   * 根模型
   */
  rootModel: IRootModel;
}

/**
 * 自定义参数化模型工具类接口
 */
interface ICustomizedPMModelUtil {
  /**
   * 移除自定义参数化模型实例
   * @param instances - 实例数组
   * @returns 删除规格信息
   */
  removeCustomizedPMInstance(instances: ICustomizedPMInstance[]): IDeleteSpec;
  
  /**
   * 添加自定义参数化模型实例
   * @param options - 配置选项
   */
  addCustomizedPMInstance(options: {
    insModel: ICustomizedPMInstance;
    rootModel: IRootModel;
  }): void;
}

/**
 * 事务请求基类
 */
declare class TransactionRequest {
  constructor();
}

/**
 * 删除自定义参数化模型实例的请求类
 * 继承自HSCore.Transaction.Request，用于处理删除操作的事务管理
 */
export declare class DeleteCustomizedPMInstanceRequest extends TransactionRequest {
  /**
   * 待删除的实例列表
   */
  private _instances: ICustomizedPMInstance[];
  
  /**
   * 根模型
   */
  private _rootModel?: IRootModel;
  
  /**
   * 操作前的WebCAD文档内容
   */
  private _webcadDocBefore?: string;
  
  /**
   * 操作后的WebCAD文档内容
   */
  private _webcadDocAfter: string;
  
  /**
   * 删除规格信息
   */
  private _spec?: IDeleteSpec;

  /**
   * 构造函数
   * @param instances - 要删除的自定义参数化模型实例数组
   */
  constructor(instances: ICustomizedPMInstance[]);

  /**
   * 提交操作时执行
   * 移除实例并保存操作后的文档状态
   */
  onCommit(): void;

  /**
   * 撤销操作时执行
   * 恢复文档状态并重新添加已删除的实例
   */
  onUndo(): Promise<void>;

  /**
   * 重做操作时执行
   * 恢复删除操作后的文档状态并再次移除实例
   */
  onRedo(): Promise<void>;
}

/**
 * 全局HSApp命名空间声明
 */
declare global {
  namespace HSApp {
    namespace Util {
      const CustomizedPMModel: ICustomizedPMModelUtil;
    }
  }
  
  namespace HSCore {
    namespace Transaction {
      class Request extends TransactionRequest {}
    }
  }
}