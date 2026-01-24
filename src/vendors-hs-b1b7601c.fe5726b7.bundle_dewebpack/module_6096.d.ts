/**
 * 深度比较两个对象是否相等（用于对象/数组的递归比较）
 * 
 * @param source - 源对象
 * @param target - 目标对象
 * @param bitmask - 比较选项的位掩码标志
 *   - 1: 部分比较模式（source的所有属性必须在target中存在且相等）
 *   - 2: 深度比较数组
 * @param customizer - 自定义比较函数，返回boolean或undefined使用默认比较
 * @param equalFunc - 递归相等性比较函数
 * @param stack - 用于检测循环引用的缓存栈（WeakMap）
 * @returns 如果对象相等返回true，否则返回false
 */
declare function baseIsEqualDeep(
  source: any,
  target: any,
  bitmask: number,
  customizer?: ((
    targetValue: any,
    sourceValue: any,
    key: string | number | symbol,
    target: any,
    source: any,
    stack: WeakMap<object, any>
  ) => boolean | undefined) | undefined,
  equalFunc?: (
    sourceValue: any,
    targetValue: any,
    bitmask: number,
    customizer?: Function,
    stack?: WeakMap<object, any>
  ) => boolean,
  stack?: WeakMap<object, any>
): boolean;

export = baseIsEqualDeep;