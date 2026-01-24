/**
 * 缓存访问器模块
 * 为DOM节点或对象提供内部缓存机制
 * @module module_cache
 * @originalId cache
 */

/**
 * 获取或创建指定对象的缓存存储
 * 
 * @template T - 目标对象类型，可以是DOM节点或普通对象
 * @param target - 需要获取缓存的目标对象
 * @returns 返回与目标对象关联的缓存对象
 * 
 * @remarks
 * - 对于DOM节点（nodeType存在），直接在对象上设置属性
 * - 对于普通对象，使用Object.defineProperty设置不可枚举的缓存属性
 * - 缓存键名通过this.expando动态指定
 */
declare function getCache<T extends object>(
  target: T
): Record<string, unknown>;

/**
 * 缓存管理器接口
 * 定义了缓存存储的核心属性和方法
 */
declare interface CacheManager {
  /**
   * 缓存属性的唯一标识符
   * 通常为随机生成的字符串，避免属性冲突
   */
  readonly expando: string;

  /**
   * 获取或初始化目标对象的缓存
   * @param target - 目标对象（DOM节点或普通对象）
   * @returns 缓存存储对象
   */
  get<T extends object>(target: T): Record<string, unknown>;
}

/**
 * 检查对象是否可缓存
 * 
 * @param target - 待检查的对象
 * @returns 如果对象支持缓存则返回true
 * 
 * @remarks
 * 通常检查对象是否为Element节点、Document或普通对象
 */
declare function isAcceptable(target: unknown): target is object;