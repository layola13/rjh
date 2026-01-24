/**
 * 优先队列（最小堆实现）
 * 用于高效地维护按优先级排序的键值对集合
 */
declare class PriorityQueue {
  /**
   * 存储堆元素的数组
   * @private
   */
  private _arr: Array<{ key: string; priority: number }>;

  /**
   * 键到数组索引的映射，用于快速查找
   * @private
   */
  private _keyIndices: Record<string, number>;

  /**
   * 创建一个新的优先队列实例
   */
  constructor();

  /**
   * 返回队列中元素的数量
   * @returns 队列大小
   */
  size(): number;

  /**
   * 获取队列中所有键的数组
   * @returns 所有键的数组
   */
  keys(): string[];

  /**
   * 检查队列是否包含指定的键
   * @param key - 要检查的键
   * @returns 如果键存在则返回true，否则返回false
   */
  has(key: string): boolean;

  /**
   * 获取指定键的优先级
   * @param key - 要查询的键
   * @returns 键的优先级，如果键不存在则返回undefined
   */
  priority(key: string): number | undefined;

  /**
   * 获取具有最小优先级的键（不移除）
   * @returns 最小优先级的键
   * @throws {Error} 当队列为空时抛出"Queue underflow"错误
   */
  min(): string;

  /**
   * 向队列中添加新的键值对
   * @param key - 要添加的键
   * @param priority - 键的优先级（数值越小优先级越高）
   * @returns 如果成功添加则返回true，如果键已存在则返回false
   */
  add(key: string, priority: number): boolean;

  /**
   * 移除并返回具有最小优先级的键
   * @returns 最小优先级的键
   */
  removeMin(): string;

  /**
   * 降低指定键的优先级
   * @param key - 要更新的键
   * @param newPriority - 新的优先级（必须小于当前优先级）
   * @throws {Error} 当新优先级大于当前优先级时抛出错误
   */
  decrease(key: string, newPriority: number): void;

  /**
   * 维护堆的性质（向下调整）
   * @param index - 开始调整的索引位置
   * @private
   */
  private _heapify(index: number): void;

  /**
   * 向上调整堆元素以维护最小堆性质
   * @param index - 要调整的元素索引
   * @private
   */
  private _decrease(index: number): void;

  /**
   * 交换堆中两个位置的元素
   * @param indexA - 第一个元素的索引
   * @param indexB - 第二个元素的索引
   * @private
   */
  private _swap(indexA: number, indexB: number): void;
}

export = PriorityQueue;