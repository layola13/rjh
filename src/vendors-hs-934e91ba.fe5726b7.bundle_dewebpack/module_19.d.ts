/**
 * 波兰语复数形式判断函数
 * 
 * 根据数字确定波兰语中应使用的复数形式索引。
 * 波兰语有4种复数形式：
 * - 形式0: 单数 (1)
 * - 形式1: 少数 (2-4, 22-24, 32-34, ..., 但不包括12-14)
 * - 形式2: 多数 (0, 11-19, 21, 25-31, ...)
 * - 形式3: 其他情况
 * 
 * @param count - 需要判断复数形式的数字
 * @returns 复数形式索引 (0-3)
 * 
 * @example
 * getPluralForm(1)   // 0 - "1 kot" (1只猫)
 * getPluralForm(2)   // 1 - "2 koty" (2只猫)
 * getPluralForm(5)   // 2 - "5 kotów" (5只猫)
 * getPluralForm(13)  // 2 - "13 kotów" (13只猫)
 * getPluralForm(22)  // 1 - "22 koty" (22只猫)
 */
declare function getPluralForm(count: number): 0 | 1 | 2 | 3;

export default getPluralForm;