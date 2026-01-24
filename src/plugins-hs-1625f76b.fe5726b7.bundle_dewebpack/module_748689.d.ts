/**
 * 物品翻转操作的事务请求类
 * 用于处理3D模型的翻转操作，支持撤销/重做功能
 */
declare class FlipContentRequest extends HSCore.Transaction.Request {
  /**
   * 要翻转的内容对象
   * @private
   */
  private _content: any;

  /**
   * 材质画笔工具类引用
   * @private
   */
  private MaterialBrushUtil: typeof HSApp.PaintPluginHelper.Util.MaterialBrushUtil | undefined;

  /**
   * 翻转前的DIY面材质数据快照
   * @private
   */
  private _diyBefores: any;

  /**
   * 翻转后的DIY面材质数据快照
   * @private
   */
  private _diyAfters: any;

  /**
   * 创建一个翻转内容的请求
   * @param content - 需要翻转的内容对象，可以是普通内容或自定义模型
   */
  constructor(content: any);

  /**
   * 提交翻转操作
   * 执行翻转并保存翻转后的状态
   */
  onCommit(): void;

  /**
   * 撤销翻转操作
   * 恢复到翻转前的状态
   */
  onUndo(): void;

  /**
   * 重做翻转操作
   * 恢复到翻转后的状态
   */
  onRedo(): void;

  /**
   * 获取操作描述
   * @returns 返回操作的中文描述
   */
  getDescription(): string;

  /**
   * 获取操作分类
   * @returns 返回日志分组类型：内容操作
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

export default FlipContentRequest;