/**
 * 缓存管理器模块
 * 用于管理网格(Mesh)、元数据(Meta)和材质信息(Material)的缓存
 */

/**
 * 网格数据接口
 */
export interface IMesh {
  // 根据实际使用场景定义网格属性
  [key: string]: unknown;
}

/**
 * 元数据接口
 */
export interface IMeta {
  // 根据实际使用场景定义元数据属性
  [key: string]: unknown;
}

/**
 * 材质信息接口
 */
export interface IMaterialInfo {
  // 根据实际使用场景定义材质属性
  [key: string]: unknown;
}

/**
 * 缓存标识符类型
 * 支持字符串或数字作为缓存键
 */
export type CacheKey = string | number;

/**
 * 缓存管理器类
 * 提供网格、元数据和材质信息的集中缓存管理功能
 */
export declare class CacheManager {
  /**
   * 网格缓存映射表
   * @private
   */
  private _meshMap: Map<string, IMesh>;

  /**
   * 元数据缓存映射表
   * @private
   */
  private _metaMap: Map<string, IMeta>;

  /**
   * 材质信息缓存映射表
   * @private
   */
  private _materialInfoMap: Map<string, IMaterialInfo>;

  /**
   * 构造函数
   * 初始化所有缓存映射表
   */
  constructor();

  /**
   * 获取缓存的网格数据
   * @param key - 网格的唯一标识符
   * @returns 缓存的网格对象，如果不存在则返回undefined
   */
  getMesh(key: CacheKey): IMesh | undefined;

  /**
   * 设置网格数据到缓存
   * 如果键已存在，则不会覆盖原有数据
   * @param key - 网格的唯一标识符
   * @param mesh - 要缓存的网格对象
   */
  setMesh(key: CacheKey, mesh: IMesh): void;

  /**
   * 设置元数据到缓存
   * 会覆盖已存在的元数据
   * @param key - 元数据的唯一标识符
   * @param meta - 要缓存的元数据对象
   */
  setMeta(key: CacheKey, meta: IMeta): void;

  /**
   * 获取缓存的元数据
   * @param key - 元数据的唯一标识符
   * @returns 缓存的元数据对象，如果不存在则返回undefined
   */
  getMeta(key: CacheKey): IMeta | undefined;

  /**
   * 设置网格材质信息到缓存
   * @param key - 材质的唯一标识符
   * @param materialInfo - 要缓存的材质信息对象
   * @returns 当前的材质信息映射表
   */
  setMeshMaterial(key: CacheKey, materialInfo: IMaterialInfo): Map<string, IMaterialInfo>;

  /**
   * 获取缓存的网格材质信息
   * @param key - 材质的唯一标识符
   * @returns 缓存的材质信息对象，如果不存在则返回undefined
   */
  getMeshMaterial(key: CacheKey): IMaterialInfo | undefined;
}

/**
 * 缓存管理器单例实例
 * 全局共享的缓存管理器对象
 */
export declare const cacheManager: CacheManager;