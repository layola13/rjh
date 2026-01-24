/**
 * 全局墙宽修改事务请求
 * 用于处理户型图中全局墙体宽度的修改、撤销和重做操作
 */

/**
 * 保存的数据接口
 */
interface SavedData {
  /** 全局墙体宽度 */
  globalWidth: number;
}

/**
 * 全局墙宽修改事务请求类
 * 继承自 HSCore.Transaction.Request，提供墙体宽度修改的事务操作
 */
declare class GlobalWallWidthChangeRequest extends HSCore.Transaction.Request {
  /** 应用实例 */
  private app: HSApp.App;
  
  /** 保存的数据状态 */
  private savedData: SavedData;
  
  /** 恢复的数据状态 */
  private restoredData: SavedData;
  
  /** 新的墙体宽度值 */
  private width: number;

  /**
   * 构造函数
   * @param width - 要设置的新墙体宽度
   */
  constructor(width: number);

  /**
   * 保存数据到指定对象
   * @param data - 要保存数据的目标对象
   * @private
   */
  private _saveToData(data: SavedData): void;

  /**
   * 从数据对象恢复状态
   * @param data - 包含恢复数据的源对象
   * @private
   */
  private _restoreFromData(data: SavedData): void;

  /**
   * 提交事务，应用新的墙体宽度
   */
  onCommit(): void;

  /**
   * 修改墙体宽度的内部方法
   * @param width - 要设置的墙体宽度值
   * @private
   */
  private _changeWidth(width: number): void;

  /**
   * 撤销操作，恢复到之前的墙体宽度
   */
  onUndo(): void;

  /**
   * 重做操作，重新应用新的墙体宽度
   */
  onRedo(): void;

  /**
   * 获取操作描述
   * @returns 操作的中文描述
   */
  getDescription(): string;

  /**
   * 获取操作类别
   * @returns 操作所属的日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * 默认导出：创建全局墙宽修改请求的工厂函数
 * @param baseClass - 基础事务请求类
 * @returns 全局墙宽修改请求类
 */
export default function createGlobalWallWidthChangeRequest(
  baseClass: typeof HSCore.Transaction.Request
): typeof GlobalWallWidthChangeRequest;