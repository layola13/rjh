/**
 * 墙体冻结/解冻事务请求
 * 用于撤销/重做系统中管理墙体的锁定状态
 */

/**
 * 墙体冻结状态数据
 */
interface WallFreezeData {
  /** 墙体是否被冻结/锁定 */
  isWallFreezed: boolean;
}

/**
 * 具有墙体冻结功能的对象接口
 */
interface FreezableWall {
  /** 墙体是否被冻结/锁定 */
  isWallFreezed: boolean;
}

/**
 * 墙体冻结/解冻事务请求类
 * 继承自 HSCore.Transaction.Request，用于实现墙体锁定状态的撤销/重做功能
 */
declare class WallFreezeTransactionRequest extends HSCore.Transaction.Request {
  /** 保存的墙体冻结状态数据（用于重做） */
  private savedData: WallFreezeData;
  
  /** 恢复的墙体冻结状态数据（用于撤销） */
  private restoredData: WallFreezeData;
  
  /** 具有冻结功能的墙体对象引用 */
  private fp: FreezableWall;
  
  /** 当前操作是否为冻结操作（true=冻结，false=解冻） */
  private isFreeze: boolean;

  /**
   * 构造函数
   * @param wall - 要操作的墙体对象
   * @param isFreeze - 是否执行冻结操作（true=冻结，false=解冻）
   */
  constructor(wall: FreezableWall, isFreeze: boolean);

  /**
   * 将当前墙体状态保存到数据对象
   * @param data - 要保存到的数据对象
   */
  private _saveToData(data: WallFreezeData): void;

  /**
   * 从数据对象恢复墙体状态
   * @param data - 包含要恢复状态的数据对象
   */
  private _restoreFromData(data: WallFreezeData): void;

  /**
   * 提交事务，执行冻结/解冻操作
   */
  onCommit(): void;

  /**
   * 设置墙体的冻结状态值
   * @param isFreezed - 是否冻结墙体
   */
  private _setFreezeVal(isFreezed: boolean): void;

  /**
   * 撤销操作，恢复到之前的状态
   */
  onUndo(): void;

  /**
   * 重做操作，重新执行提交
   */
  onRedo(): void;

  /**
   * 获取操作的描述文本
   * @returns 操作描述（"锁定墙体" 或 "解锁墙体"）
   */
  getDescription(): string;

  /**
   * 获取操作的分类
   * @returns 操作分类（墙体操作类型）
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

export default WallFreezeTransactionRequest;