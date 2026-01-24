/**
 * 门洞石材对齐请求模块
 * 用于处理门洞/垭口石材对齐方向的切换操作
 */

/**
 * 门洞石材对齐状态请求
 * 继承自 HSCore.Transaction.Common.StateRequest
 * 负责管理门洞石材对齐的事务状态（提交、撤销、重做）
 */
export declare class ChangeDoorStoneAlignRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 关联的门洞对象
   * @private
   */
  private _opening: HSCore.Model.Opening;

  /**
   * 受影响的楼层集合，用于标记需要重新计算几何的楼层
   * @private
   */
  private _dirtyFloors: Set<HSCore.Model.Floor>;

  /**
   * 构造函数
   * @param opening - 需要切换石材对齐方向的门洞对象
   */
  constructor(opening: HSCore.Model.Opening);

  /**
   * 提交事务时的回调
   * 切换门洞石材对齐方向，收集受影响的楼层并标记为脏数据
   */
  onCommit(): void;

  /**
   * 撤销操作时的回调
   * 标记受影响的楼层需要重新计算几何
   */
  onUndo(): void;

  /**
   * 重做操作时的回调
   * 标记受影响的楼层需要重新计算几何
   */
  onRedo(): void;

  /**
   * 判断是否可以作为字段事务处理
   * @returns 始终返回 true
   */
  canTransactField(): boolean;
}

/**
 * 切换门洞石材对齐命令
 * 继承自 HSApp.Cmd.Command
 * 封装用户操作，创建并执行 ChangeDoorStoneAlignRequest 请求
 */
export default class ChangeDoorStoneAlignCommand extends HSApp.Cmd.Command {
  /**
   * 关联的门洞对象
   */
  opening: HSCore.Model.Opening;

  /**
   * 构造函数
   * @param opening - 需要切换石材对齐方向的门洞对象
   */
  constructor(opening: HSCore.Model.Opening);

  /**
   * 执行命令
   * 创建 ChangeDoorStoneAlignRequest 请求并提交到事务管理器
   */
  onExecute(): void;

  /**
   * 判断命令是否支持撤销/重做
   * @returns 始终返回 false（命令本身不支持，由内部 Request 处理）
   */
  canUndoRedo(): boolean;

  /**
   * 获取命令描述文本
   * @returns 命令的可读描述："切换垭口材质"
   */
  getDescription(): string;

  /**
   * 获取命令所属的日志分类
   * @returns 返回内容操作类型（ContentOperation）
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}