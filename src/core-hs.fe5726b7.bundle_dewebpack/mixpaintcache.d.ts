/**
 * 混合绘制缓存管理器
 * 用于缓存和管理混合绘制数据，提供基于时间的自动过期机制
 */
export declare class MixPaintCache {
  /**
   * 混合绘制数据缓存映射
   * @private
   */
  private _mixPaintCache: Map<string, CacheEntry>;

  /**
   * 上次清理缓存的时间戳
   * @private
   */
  private _lastClearTime: Date;

  /**
   * 构造函数
   * 初始化缓存映射和清理时间戳
   */
  constructor();

  /**
   * 获取缓存数据
   * @param mixData - 混合数据对象
   * @param faceId - 面组ID
   * @returns 缓存的数据，如果不存在或已过期则返回null
   * @description
   * - 检查缓存是否存在且未过期（5秒内有效）
   * - 验证数据版本是否匹配
   * - 检查所有面组ID是否已处理完成
   */
  getCacheData<T>(mixData: MixData, faceId: string): T | null;

  /**
   * 设置缓存数据
   * @param mixData - 混合数据对象
   * @param data - 要缓存的数据
   * @param currentFaceId - 当前处理的面组ID
   * @description
   * - 解析面组ID列表
   * - 创建ID映射表标记处理状态
   * - 存储带有时间戳和版本信息的缓存条目
   */
  setCacheData<T>(mixData: MixData, data: T, currentFaceId: string): void;

  /**
   * 清理过期缓存
   * @private
   * @description
   * - 每5分钟执行一次清理
   * - 移除超过5秒的缓存条目
   */
  private _clearCache(): void;

  /**
   * 移除指定的缓存数据
   * @param mixData - 要移除的混合数据对象
   * @description 根据mixData的ID从缓存中删除对应条目
   */
  removeCacheData(mixData: MixData): void;
}

/**
 * 混合数据接口
 * 描述需要缓存的混合绘制数据结构
 */
interface MixData {
  /**
   * 唯一标识符
   */
  id: string;

  /**
   * 面组ID列表，使用分号分隔
   * @example "face1;face2;face3"
   */
  faceGroupId: string;

  /**
   * 数据版本号，用于验证缓存有效性
   */
  dataVersion: number | string;
}

/**
 * 缓存条目接口
 * 描述缓存映射中存储的条目结构
 */
interface CacheEntry {
  /**
   * 原始混合数据对象
   */
  mixData: MixData;

  /**
   * 缓存的实际数据
   */
  data: unknown;

  /**
   * 面组ID映射表
   * @description
   * - key: 面组ID
   * - value: 是否已处理（true表示已处理）
   */
  idMap: Map<string, boolean>;

  /**
   * 缓存创建时间
   */
  time: Date;

  /**
   * 数据版本号快照
   */
  dataVersion: number | string;
}