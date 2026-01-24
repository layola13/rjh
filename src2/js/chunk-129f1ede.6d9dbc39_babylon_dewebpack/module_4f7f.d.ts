/**
 * ES6 Set集合的Polyfill实现
 * 提供基本的Set数据结构支持，用于存储唯一值的集合
 * @module Set
 */

/**
 * Set集合构造函数类型
 * 用于创建一个新的Set实例，可以接受可迭代对象作为初始值
 */
interface SetConstructor {
  /**
   * 创建新的Set实例
   * @param iterable - 可选的可迭代对象，其元素将被添加到新Set中
   */
  new <T = any>(iterable?: Iterable<T> | null): Set<T>;
  
  /**
   * Set构造函数的原型
   */
  readonly prototype: Set<any>;
}

/**
 * Set集合接口
 * 表示一个值的集合，其中每个值必须是唯一的
 * @template T - 集合中存储的元素类型
 */
interface Set<T> {
  /**
   * 向Set集合中添加一个元素
   * 如果元素已存在，则不会重复添加
   * 特殊处理：将-0和+0视为相同的值（都标准化为0）
   * 
   * @param value - 要添加到集合中的值
   * @returns 返回Set对象本身，支持链式调用
   * 
   * @example
   *