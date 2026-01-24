/**
 * 波兰语复数形式选择器
 * 根据波兰语语法规则，确定数字对应的复数形式索引
 * 
 * 规则说明：
 * - 数字为 1 时：返回 0（单数形式，例如 "1 plik"）
 * - 数字末位是 2-4 且不在 10-20 范围内：返回 1（少数复数形式，例如 "2 pliki"）
 * - 其他情况：返回 2（多数复数形式，例如 "5 plików"）
 * 
 * @param count - 需要判断复数形式的数字
 * @returns 复数形式索引 (0: 单数, 1: 少数复数, 2: 多数复数)
 * 
 * @example
 * getPolishPluralForm(1);  // 0 - "1 plik"
 * getPolishPluralForm(2);  // 1 - "2 pliki"
 * getPolishPluralForm(5);  // 2 - "5 plików"
 * getPolishPluralForm(12); // 2 - "12 plików"
 * getPolishPluralForm(22); // 1 - "22 pliki"
 */
export function getPolishPluralForm(count: number): 0 | 1 | 2 {
  if (count === 1) {
    return 0;
  }

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  const isLastDigitBetween2And4 = lastDigit >= 2 && lastDigit <= 4;
  const isNotTeens = lastTwoDigits < 10 || lastTwoDigits >= 20;

  if (isLastDigitBetween2And4 && isNotTeens) {
    return 1;
  }

  return 2;
}