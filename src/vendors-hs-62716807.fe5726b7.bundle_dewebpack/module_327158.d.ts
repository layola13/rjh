/**
 * Object.fromEntries polyfill module
 * 将键值对列表转换为对象
 * 
 * @module ObjectFromEntriesPolyfill
 */

/**
 * 迭代回调函数类型
 * @template T - 目标对象类型
 */
type IteratorCallback<T> = (target: T, key: PropertyKey, value: unknown) => void;

/**
 * 迭代选项配置
 */
interface IterationOptions {
  /**
   * 是否将输入作为键值对条目处理
   * 当设置为 true 时,输入将被解析为 [key, value] 形式的条目数组
   */
  AS_ENTRIES: boolean;
}

/**
 * 表示可迭代的键值对条目
 * 第一个元素为键,第二个元素为值
 */
type Entry<K extends PropertyKey = PropertyKey, V = unknown> = readonly [K, V];

/**
 * 可迭代的条目集合类型
 */
type Entries<K extends PropertyKey = PropertyKey, V = unknown> = 
  | Iterable<Entry<K, V>>
  | ArrayLike<Entry<K, V>>;

/**
 * 从键值对条目数组创建对象
 * 
 * @template K - 对象键的类型,必须是 PropertyKey(string | number | symbol)
 * @template V - 对象值的类型
 * @param entries - 可迭代的键值对条目集合
 * @returns 由条目构造的新对象
 * 
 * @example
 *