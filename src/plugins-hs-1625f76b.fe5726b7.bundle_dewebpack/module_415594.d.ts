/**
 * 替换产品命令类
 * 用于在场景中替换现有物品，支持智能替换功能
 */
declare class ReplaceProductCommand extends HSApp.Cmd.Command {
  /**
   * 待替换的实体
   */
  private _toBeReplaced: any;

  /**
   * 新内容的信息
   */
  private _contentInfo: any;

  /**
   * 放置位置
   */
  private _position: Vector3;

  /**
   * 旋转角度
   */
  private _rotation: Rotation;

  /**
   * 被移除的软装布料列表
   */
  private _removedSoftCloth: any[];

  /**
   * 新创建的实体
   */
  newEntity?: any;

  /**
   * 创建替换产品命令
   * @param toBeReplaced - 待替换的实体对象
   * @param contentInfo - 新产品的内容信息
   * @param position - 新产品的放置位置坐标
   * @param rotation - 新产品的旋转信息
   */
  constructor(
    toBeReplaced: any,
    contentInfo: any,
    position: Vector3,
    rotation: Rotation
  );

  /**
   * 执行替换命令
   * 创建替换产品请求并提交到事务管理器
   */
  onExecute(): void;

  /**
   * 获取被移除的软装布料列表
   * @returns 被移除的软装布料数组
   */
  getRemovedSoftCloth(): any[];

  /**
   * 是否支持撤销/重做操作
   * @returns false - 此命令不支持撤销重做
   */
  canUndoRedo(): boolean;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * 三维坐标向量接口
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 旋转信息接口
 */
interface Rotation {
  x?: number;
  y?: number;
  z?: number;
  w?: number;
}

export default ReplaceProductCommand;