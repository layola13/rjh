/**
 * 图层清理请求类
 * 用于清除图层中的所有墙体及相关设计元素
 */
declare class CleanupLayerRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 目标图层对象
   * @private
   */
  private _layer: unknown;

  /**
   * 操作前的数据快照，用于撤销/重做
   * @private
   */
  private _beforeData: Record<string, unknown>;

  /**
   * 构造函数
   * @param layer - 需要清理的图层对象
   */
  constructor(layer: unknown);

  /**
   * 执行清理请求
   * 遍历图层并移除所有墙体、开口、梁、结构、内容等元素
   * @returns void
   */
  doRequest(): void;

  /**
   * 提交事务时的回调
   * 执行清理操作并标记图层信息为脏数据
   * @returns void
   */
  onCommit(): void;

  /**
   * 判断字段是否可以参与事务处理
   * @returns 始终返回 true
   */
  canTransactField(): boolean;

  /**
   * 撤销操作时的回调
   * 恢复图层状态并标记图层信息为脏数据
   * @returns void
   */
  onUndo(): void;

  /**
   * 重做操作时的回调
   * 重新执行清理并标记图层信息为脏数据
   * @returns void
   */
  onRedo(): void;

  /**
   * 获取操作描述信息
   * @returns 操作的中文描述字符串
   */
  getDescription(): string;

  /**
   * 获取操作分类
   * @returns 返回墙体操作类型常量
   */
  getCategory(): unknown;
}

export { CleanupLayerRequest };