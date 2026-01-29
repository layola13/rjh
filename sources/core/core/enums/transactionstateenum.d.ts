/**
 * 事务状态枚举
 * 用于表示操作的不同状态（默认、撤销、重做）
 */
export enum TransactionStateEnum {
  /**
   * 默认状态
   */
  default = 0,

  /**
   * 撤销状态
   */
  undo = 1,

  /**
   * 重做状态
   */
  redo = 2
}