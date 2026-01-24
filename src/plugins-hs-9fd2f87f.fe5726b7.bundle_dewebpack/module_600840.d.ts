/**
 * 事务请求基类 - 用于处理模型内容的撤销/重做操作
 * 管理模型内容、光照槽位和材质画刷的状态变更
 */
declare abstract class TransactionRequest extends HSCore.Transaction.Request {
  /** 模型内容实例 */
  protected _content: HSCore.Model.BaseModel | HSCore.Model.CustomizedModel;
  
  /** 光照槽位ID */
  protected _lightSlotId: string | number;
  
  /** 操作前的数据快照 */
  protected _beforeData: Record<string, unknown>;
  
  /** 操作后的数据快照 */
  protected _afterData: Record<string, unknown>;
  
  /** 参与事务的实体列表（包含内容和宿主） */
  protected _transEntities: Array<HSCore.Model.BaseModel>;
  
  /** 材质画刷工具类 */
  protected MaterialBrushUtil: typeof HSApp.PaintPluginHelper.Util.MaterialBrushUtil;
  
  /** DIY面材质的操作前转储数据 */
  protected _diyBefores?: unknown;
  
  /** DIY面材质的操作后转储数据 */
  protected _diyAfters?: unknown;

  /**
   * 构造函数
   * @param content - 模型内容对象
   * @param lightSlotId - 光照槽位标识符
   */
  constructor(content: HSCore.Model.BaseModel | HSCore.Model.CustomizedModel, lightSlotId: string | number);

  /**
   * 提交操作 - 应用更改并保存后置状态
   * 自动刷新定制模型的面材质并保存DIY材质转储
   */
  onCommit(): void;

  /**
   * 撤销操作 - 恢复到操作前的状态
   * 重置实体数据、标记光照槽位几何体为脏、恢复DIY材质
   */
  onUndo(): void;

  /**
   * 重做操作 - 恢复到操作后的状态
   * 重置实体数据、标记光照槽位几何体为脏、恢复DIY材质
   */
  onRedo(): void;

  /**
   * 应用具体的业务逻辑（抽象方法）
   * 子类需实现此方法定义实际的变更操作
   */
  protected abstract _apply(): void;
}

export default TransactionRequest;