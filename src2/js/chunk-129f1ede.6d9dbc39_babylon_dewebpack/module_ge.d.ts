/**
 * 数值比较函数
 * 检查两个数值的差是否大于某个阈值
 * 
 * @param first - 第一个数值
 * @param second - 第二个数值
 * @returns 如果 first - second > -h 则返回 true，否则返回 false
 * 
 * @remarks
 * 该函数依赖外部变量 h（阈值），通常用于浮点数比较或容差检查
 * 原始模块ID: GE (可能表示 Greater than or Equal 的变体)
 */
declare function compareWithThreshold(
  first: number,
  second: number
): boolean;

export = compareWithThreshold;