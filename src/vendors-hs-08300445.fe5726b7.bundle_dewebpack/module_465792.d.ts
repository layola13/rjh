/**
 * 从对象中提取符合条件的属性（data-*、aria-*、role、name等），
 * 但排除以 data-__ 开头的属性
 * @param props - 源属性对象
 * @returns 过滤后的属性对象
 */
export default function filterProps<T extends Record<string, unknown>>(
  props: T
): Partial<T> {
  const result: Partial<T> = {};

  Object.keys(props).forEach((key) => {
    const isDataAttr = key.startsWith('data-');
    const isAriaAttr = key.startsWith('aria-');
    const isRoleOrName = key === 'role' || key === 'name';
    const isPrivateData = key.startsWith('data-__');

    if ((isDataAttr || isAriaAttr || isRoleOrName) && !isPrivateData) {
      result[key as keyof T] = props[key];
    }
  });

  return result;
}

/**
 * 从数组中安全地获取指定索引的值
 * @param array - 源数组
 * @param index - 索引位置
 * @returns 数组中的值，如果数组不存在则返回 null
 */
export function getValue<T>(array: T[] | null | undefined, index: number): T | null {
  return array ? array[index] : null;
}

/**
 * 在字符串左侧填充字符，直到达到指定长度
 * @param value - 要填充的值
 * @param targetLength - 目标长度
 * @param padChar - 填充字符，默认为 "0"
 * @returns 填充后的字符串
 */
export function leftPad(
  value: string | number,
  targetLength: number,
  padChar: string = '0'
): string {
  let result = String(value);

  while (result.length < targetLength) {
    result = `${padChar}${result}`;
  }

  return result;
}

/**
 * 将值转换为数组
 * @param value - 输入值
 * @returns 如果是数组则直接返回，否则包装成单元素数组；null/undefined 返回空数组
 */
export function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (value == null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

/**
 * 创建元组类型的辅助函数（保留类型信息）
 * @param args - 任意数量的参数
 * @returns 参数组成的元组
 */
export function tuple<T extends unknown[]>(...args: T): T {
  return args;
}

/**
 * 更新数组中指定索引的值
 * @param array - 源数组（长度为2的元组）
 * @param updater - 新值或更新函数
 * @param index - 要更新的索引（0或1）
 * @returns 更新后的数组，如果两个元素都为空则返回 null
 */
export function updateValues<T>(
  array: [T | null, T | null] | null | undefined,
  updater: T | ((prev: T | null) => T),
  index: number
): [T | null, T | null] | null {
  const values: [T | null, T | null] = [getValue(array, 0), getValue(array, 1)];

  values[index] = typeof updater === 'function' 
    ? (updater as (prev: T | null) => T)(values[index]) 
    : updater;

  if (!values[0] && !values[1]) {
    return null;
  }

  return values;
}