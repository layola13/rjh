/**
 * HSQueryBase - 查询基类，提供惰性迭代和集合操作功能
 * 用于延迟执行集合操作，支持链式调用和高效的数据处理
 */
export abstract class HSQueryBase<T> {
  /** 标记迭代是否已完成 */
  protected finish: boolean;
  
  /** 内部缓冲区，存储已处理的元素 */
  protected innerBuffer: T[];

  constructor();

  /**
   * 检查集合是否包含指定元素（使用严格相等比较）
   * @param element - 要查找的元素
   * @returns 如果找到返回 true，否则返回 false
   */
  includes(element: T): boolean;

  /**
   * 使用归约函数转换集合为单个值
   * @param reducer - 归约函数，接收累加器和当前值
   * @param initialValue - 初始累加值
   * @returns 归约后的最终值
   */
  convert<U>(reducer: (accumulator: U, current: T) => U, initialValue: U): U;

  /**
   * 过滤集合元素
   * @param predicate - 断言函数，返回 true 保留元素
   * @returns 过滤后的数组
   */
  filter(predicate: (value: T) => boolean): T[];

  /**
   * 查找第一个满足条件的元素
   * @param predicate - 断言函数
   * @returns 找到的元素，未找到返回 undefined
   */
  find(predicate: (value: T) => boolean): T | undefined;

  /**
   * 检查集合是否为空
   * @returns 为空返回 false，否则返回 true
   */
  isEmpty(): boolean;

  /**
   * 将查询结果转换为数组
   * @returns 包含所有元素的新数组
   */
  toArray(): T[];

  /**
   * 检查是否至少有一个元素满足条件
   * @param predicate - 断言函数
   * @returns 有元素满足返回 true，否则返回 false
   */
  some(predicate: (value: T) => boolean): boolean;

  /**
   * 遍历每个元素并执行操作
   * @param callback - 对每个元素执行的回调函数
   */
  forEach(callback: (value: T) => void): void;

  /**
   * 遍历剩余未处理的元素（抽象方法，由子类实现）
   * @param callback - 可选的回调函数，返回 true 时根据 finishOnCallback 决定是否继续
   * @param finishOnCallback - 为 true 时遍历所有元素，为 false 时回调返回 true 立即停止
   */
  protected abstract traverseTheRest(
    callback?: (value: T) => boolean | void,
    finishOnCallback?: boolean
  ): void;
}

/**
 * HSArrayQuery - 基于数组的查询实现
 * 用于已完成的数组集合，无需延迟加载
 */
export class HSArrayQuery<T> extends HSQueryBase<T> {
  /**
   * 创建数组查询实例
   * @param array - 源数组
   */
  constructor(array: T[]);

  /**
   * 数组查询无需遍历剩余元素（所有元素已在构造时加载）
   * @returns 始终返回 false
   */
  protected traverseTheRest(
    callback?: (value: T) => boolean | void,
    finishOnCallback?: boolean
  ): false;
}

/**
 * HSIterableQuery - 基于迭代器的查询实现
 * 支持惰性求值，按需从迭代器中提取元素
 */
export class HSIterableQuery<T> extends HSQueryBase<T> {
  /** 底层迭代器 */
  private _iterator: Iterator<T>;

  /**
   * 创建可迭代查询实例
   * @param iterator - 数据源迭代器
   */
  constructor(iterator: Iterator<T>);

  /**
   * 从迭代器中提取剩余元素
   * @param callback - 可选的回调函数，对每个元素调用
   * @param finishOnCallback - 为 true 时即使回调返回 true 也继续遍历
   */
  protected traverseTheRest(
    callback?: (value: T) => boolean | void,
    finishOnCallback?: boolean
  ): void;
}