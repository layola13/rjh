/**
 * 用于唯一标识对象的ID计数器
 * 每个添加到集合中的对象都会被分配一个唯一的ID
 */
interface IdCounter {
  count: number;
}

/**
 * 可被添加到集合中的对象类型
 * 该对象可以拥有一个唯一的ID标识符
 */
interface Identifiable {
  /**
   * 对象的唯一标识符
   * 如果不存在，会在首次添加到集合时自动分配
   */
  __id__?: number;
}

/**
 * 集合内部存储结构
 * 使用对象ID作为键来存储值和原始键的引用
 */
interface SetStorage<T> {
  /**
   * 存储键值对映射，使用对象ID作为索引
   */
  [id: number]: T;
  
  /**
   * 存储ID到原始键对象的映射
   * 用于维护对原始键的引用
   */
  __keys__: {
    [id: number]: Identifiable;
  };
}

/**
 * 自定义Set实现类
 * 支持使用对象作为键，通过为每个对象分配唯一ID来实现
 */
declare class ModuleSet<T = unknown> {
  /**
   * 内部存储容器
   * 使用对象ID作为键，存储值和原始键的引用
   */
  private h: SetStorage<T>;
  
  /**
   * 向集合中添加元素
   * 
   * @param key - 用作键的对象，会被自动分配唯一ID（如果尚未分配）
   * @param value - 要存储的值
   * 
   * @remarks
   * - 如果键对象没有 __id__ 属性，会自动分配一个递增的唯一ID
   * - 相同的键对象会覆盖之前存储的值
   * - 键对象的引用会被保存在 __keys__ 中，防止被垃圾回收
   */
  set(key: Identifiable, value: T): void;
}

/**
 * 全局ID计数器
 * 用于为集合中的对象分配唯一标识符
 */
declare const p: IdCounter;