/**
 * 集合类型构造器模块
 * 提供 Map/Set 等集合数据结构的内部实现支持
 * @module CollectionFactory
 */

/**
 * 集合节点 - 用于链表结构存储键值对
 */
interface CollectionEntry<K, V> {
  /** 索引键（经过 fastKey 处理后的键） */
  i: string | symbol;
  /** 原始键 */
  k: K;
  /** 值 */
  v: V;
  /** 前一个节点 */
  p: CollectionEntry<K, V> | undefined;
  /** 下一个节点 */
  n: CollectionEntry<K, V> | undefined;
  /** 是否已删除标记 */
  r: boolean;
}

/**
 * 集合实例内部状态
 */
interface CollectionState<K, V> {
  /** 集合类型名称（如 "Map", "Set"） */
  _t: string;
  /** 索引映射表（快速查找） */
  _i: Record<string | symbol, CollectionEntry<K, V>>;
  /** 链表头节点 */
  _f: CollectionEntry<K, V> | undefined;
  /** 链表尾节点 */
  _l: CollectionEntry<K, V> | undefined;
  /** 集合大小（使用字符串 "size" 或符号） */
  [sizeKey: string | symbol]: number;
}

/**
 * 迭代器辅助函数返回值
 */
interface IteratorStep<T> {
  /** 是否完成迭代 */
  done: boolean;
  /** 当前迭代值 */
  value?: T;
}

/**
 * 集合构造器工厂返回值
 */
interface CollectionConstructor<K, V> {
  /**
   * 构造函数
   * @param iterable - 可选的可迭代对象用于初始化集合
   */
  new(iterable?: Iterable<[K, V]> | null): CollectionState<K, V>;
  
  prototype: {
    /**
     * 清空集合中的所有元素
     */
    clear(): void;
    
    /**
     * 删除指定键的元素
     * @param key - 要删除的键
     * @returns 是否成功删除（元素是否存在）
     */
    delete(key: K): boolean;
    
    /**
     * 遍历集合中的所有元素
     * @param callback - 对每个元素执行的回调函数
     * @param thisArg - 回调函数中的 this 上下文
     */
    forEach(
      callback: (value: V, key: K, collection: CollectionState<K, V>) => void,
      thisArg?: unknown
    ): void;
    
    /**
     * 检查集合中是否存在指定键
     * @param key - 要检查的键
     * @returns 是否存在该键
     */
    has(key: K): boolean;
    
    /**
     * 集合中元素的数量（仅在支持 Object.defineProperty 时可用）
     */
    readonly size?: number;
  };
}

/**
 * 集合工厂模块导出
 */
export interface CollectionFactory {
  /**
   * 获取集合构造器
   * @param wrapper - 包装函数，用于创建构造器
   * @param collectionName - 集合类型名称（如 "Map", "Set"）
   * @param isMap - 是否为 Map 类型（true）或 Set 类型（false）
   * @param adderMethodName - 添加元素的方法名（如 "set", "add"）
   * @returns 集合构造器
   */
  getConstructor<K, V>(
    wrapper: (
      constructor: (instance: CollectionState<K, V>, iterable?: Iterable<[K, V]> | null) => void
    ) => CollectionConstructor<K, V>,
    collectionName: string,
    isMap: boolean,
    adderMethodName: string
  ): CollectionConstructor<K, V>;

  /**
   * 定义集合元素（添加或更新）
   * @param collection - 集合实例
   * @param key - 键
   * @param value - 值
   * @returns 集合实例本身
   */
  def<K, V>(
    collection: CollectionState<K, V>,
    key: K,
    value: V
  ): CollectionState<K, V>;

  /**
   * 获取集合中的节点
   * @param collection - 集合实例
   * @param key - 键
   * @returns 对应的节点，若不存在则返回 undefined
   */
  getEntry<K, V>(
    collection: CollectionState<K, V>,
    key: K
  ): CollectionEntry<K, V> | undefined;

  /**
   * 为集合设置强类型迭代器
   * @param constructor - 集合构造器
   * @param collectionName - 集合类型名称
   * @param isMap - 是否为 Map 类型
   */
  setStrong<K, V>(
    constructor: CollectionConstructor<K, V>,
    collectionName: string,
    isMap: boolean
  ): void;
}

declare const collectionFactory: CollectionFactory;
export default collectionFactory;