/**
 * 深度比较两个对象的键值是否相等
 * 
 * @param source - 源对象
 * @param target - 目标对象
 * @param bitmask - 比较选项的位掩码标志
 *   - 1: 部分比较模式（允许target包含source中不存在的键）
 *   - 其他位可能用于其他比较选项
 * @param customizer - 自定义比较函数，返回比较结果或undefined使用默认比较
 * @param equalFunc - 递归相等性比较函数
 * @param stack - 用于检测循环引用的WeakMap栈
 * @returns 如果对象相等返回true，否则返回false
 * 
 * @remarks
 * 此函数执行对象的深度相等性检查，支持：
 * - 部分比较（通过bitmask控制）
 * - 循环引用检测
 * - 自定义比较逻辑
 * - 构造函数比较
 */
export default function equalObjects<T extends object, U extends object>(
  source: T,
  target: U,
  bitmask: number,
  customizer: ((
    sourceValue: unknown,
    targetValue: unknown,
    key: string | symbol,
    source: T,
    target: U,
    stack: WeakMap<object, object>
  ) => boolean | undefined) | undefined,
  equalFunc: (
    sourceValue: unknown,
    targetValue: unknown,
    bitmask: number,
    customizer: typeof customizer,
    stack: WeakMap<object, object>
  ) => boolean,
  stack: WeakMap<object, object>
): boolean;

/**
 * 获取对象所有可枚举属性键（包括符号键）的函数类型
 */
declare function getAllKeys(obj: object): Array<string | symbol>;