/**
 * Iterator.prototype.filter 方法的类型声明
 * 为迭代器添加过滤功能，返回满足条件的元素
 */

/**
 * 过滤迭代器类
 * 包装原始迭代器，仅返回满足predicate条件的元素
 */
interface FilterIterator<T> extends Iterator<T> {
  /** 原始迭代器 */
  iterator: Iterator<T>;
  /** 过滤谓词函数 */
  predicate: (value: T, index: number) => boolean;
  /** 迭代计数器 */
  counter: number;
  /** 迭代是否完成 */
  done: boolean;
  /** 下一个元素的获取方法 */
  next(): IteratorResult<T>;
}

/**
 * Iterator原型扩展
 */
interface Iterator<T> {
  /**
   * 过滤迭代器元素
   * @param predicate - 过滤谓词函数，接收元素和索引，返回布尔值
   * @returns 新的过滤后的迭代器
   * @example
   * const iter = [1, 2, 3, 4, 5].values();
   * const filtered = iter.filter(x => x > 2);
   * // 结果: 3, 4, 5
   */
  filter(predicate: (value: T, index: number) => boolean): Iterator<T>;
}

/**
 * 过滤谓词函数类型
 * @template T - 迭代器元素类型
 */
type FilterPredicate<T> = (value: T, index: number) => boolean;

/**
 * 迭代器配置选项
 */
interface IteratorFilterOptions<T> {
  /** 过滤谓词函数 */
  predicate: FilterPredicate<T>;
}

/**
 * 迭代器结果类型
 */
interface IteratorResult<T> {
  /** 迭代是否完成 */
  done: boolean;
  /** 当前元素值（如果未完成） */
  value?: T;
}

/**
 * 模块导出
 * 为全局Iterator对象添加filter方法的polyfill
 */
declare module 'iterator-filter-polyfill' {
  export function install(): void;
}

/**
 * 全局Iterator接口扩展
 */
declare global {
  interface Iterator<T> {
    filter(predicate: (value: T, index: number) => boolean): Iterator<T>;
  }
}

export {};