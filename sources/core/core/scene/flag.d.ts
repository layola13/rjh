/**
 * Flag 位运算工具模块
 * 提供标志位的检查和设置功能
 */

/**
 * 标志位操作工具对象
 */
export interface Flag {
  /**
   * 检查指定标志位是否开启
   * @param flags - 当前标志位集合
   * @param targetFlag - 要检查的目标标志位
   * @returns 如果目标标志位开启返回 true，否则返回 false
   * @example
   *