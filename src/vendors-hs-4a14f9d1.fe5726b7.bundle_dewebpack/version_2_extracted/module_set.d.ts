/**
 * Set 数据结构模块
 * 用于存储唯一对象的集合，通过对象的唯一 ID 进行索引
 */

/**
 * 对象标识符计数器
 * 用于生成全局唯一的对象 ID
 */
interface IdCounter {
  /** 当前 ID 计数值 */
  count: number;
}

/**
 * 可被 Set 存储的对象接口
 * 具有唯一标识符属性
 */
interface Identifiable {
  /** 对象的唯一标识符，由 Set 自动分配 */
  __id__?: number;
}

/**
 * Set 内部存储结构
 */
interface SetStorage<T> {
  /** 按 ID 索引的值存储 */
  [key: number]: T;
  
  /** 按 ID 索引的键（对象）存储 */
  __keys__: {
    [key: number]: Identifiable;
  };
}

/**
 * Set 集合类
 * 用于存储唯一对象及其关联值
 * 
 * @template T - 存储的值类型
 */
declare class CustomSet<T> {
  /** 内部存储哈希表 */
  private h: SetStorage<T>;
  
  /**
   * 向 Set 中添加键值对
   * 如果对象没有 __id__ 属性，会自动分配一个唯一 ID
   * 
   * @param key - 要添加的对象（作为键）
   * @param value - 与对象关联的值
   * @returns void
   * 
   * @example
   *