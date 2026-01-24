/**
 * 基础匹配器函数 - 检查目标对象是否匹配给定的属性条件
 * 
 * @param target - 待检查的目标对象
 * @param source - 源对象（用于自定义比较器）
 * @param props - 属性匹配规则数组，每项为 [key, value, isStrict?]
 * @param customizer - 可选的自定义比较函数
 * @returns 如果所有属性都匹配则返回 true，否则返回 false
 * 
 * @remarks
 * 该函数用于深度比较对象属性，支持严格模式和自定义比较逻辑。
 * 常用于 lodash 等工具库的内部实现中。
 */
declare function baseIsMatch<T extends object, S extends object>(
  target: T | null | undefined,
  source: S,
  props: ReadonlyArray<readonly [PropertyKey, unknown, boolean?]>,
  customizer?: Customizer<T, S>
): boolean;

/**
 * 自定义比较器函数类型
 * 
 * @param targetValue - 目标对象的属性值
 * @param sourceValue - 源对象的属性值
 * @param key - 当前比较的属性键
 * @param target - 完整的目标对象
 * @param source - 完整的源对象
 * @param stack - 用于处理循环引用的栈结构
 * @returns 比较结果，undefined 表示使用默认比较逻辑
 */
type Customizer<T, S> = (
  targetValue: unknown,
  sourceValue: unknown,
  key: PropertyKey,
  target: T,
  source: S,
  stack: Stack
) => boolean | undefined;

/**
 * 栈结构接口 - 用于追踪对象比较过程中的循环引用
 */
interface Stack {
  clear(): void;
  delete(key: unknown): boolean;
  get(key: unknown): unknown;
  has(key: unknown): boolean;
  set(key: unknown, value: unknown): this;
}

export = baseIsMatch;