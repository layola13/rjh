/**
 * 列表缓存构造函数
 * 初始化一个新的列表缓存实例，用于存储键值对
 * 内部使用数组存储数据，适用于小数据集的缓存场景
 */
declare class ListCache {
  /**
   * 内部数据存储
   * 存储格式为 [key, value] 元组数组
   */
  __data__: Array<[unknown, unknown]>;

  /**
   * 缓存中存储的条目数量
   */
  size: number;

  /**
   * 创建一个新的列表缓存实例
   */
  constructor();
}

export = ListCache;