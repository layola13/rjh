/**
 * 阿拉伯语复数规则函数
 * 根据数字返回对应的复数形式索引（用于国际化/本地化）
 * 
 * @param count - 要判断的数字
 * @returns 复数形式索引 (0-5)
 * 
 * @remarks
 * 阿拉伯语复数规则（Arabic Plural Rules）：
 * - 0: 零（zero）
 * - 1: 单数（one）
 * - 2: 双数（two）
 * - 3: 少数（few, 3-10）
 * - 4: 多数（many, 11-99）
 * - 5: 其他（other, 100+）
 * 
 * @example
 *