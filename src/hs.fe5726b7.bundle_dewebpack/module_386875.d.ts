/**
 * 隐藏工作事务类型常量定义
 * Module: module_386875
 * Original ID: 386875
 */

/**
 * 隐藏工作事务类型枚举
 * 定义了与隐藏工作相关的事务操作类型
 */
interface ConcealedWorkTransactionTypes {
  /**
   * 镜像隐藏工作事务类型
   * 用于执行隐藏工作的镜像操作
   */
  readonly MirrorCW: "hsw.transaction.concealedWorkV2.MirrorCW";
  
  /**
   * 移除隐藏工作事务类型
   * 用于执行隐藏工作的移除操作
   */
  readonly RemoveConcealedWork: "hsw.transaction.concealedWorkV2.RemoveConcealedWork";
}

/**
 * 隐藏工作事务类型常量对象
 * 冻结对象确保运行时不可变
 */
declare const concealedWorkTransactionTypes: Readonly<ConcealedWorkTransactionTypes>;

export default concealedWorkTransactionTypes;