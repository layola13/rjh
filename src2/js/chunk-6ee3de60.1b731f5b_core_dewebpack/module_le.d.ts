/**
 * Module: module_LE (Less than or Equal)
 * 检查两个数值的差是否小于阈值
 */

/**
 * 比较两个数值差值是否小于指定阈值
 * @param e - 被减数
 * @param t - 减数
 * @returns 如果 e - t < threshold 返回 true，否则返回 false
 */
declare function isWithinThreshold(e: number, t: number): boolean;

export default isWithinThreshold;