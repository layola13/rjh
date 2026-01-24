/**
 * 数据库模块类型定义
 * @module module_set
 * @originalId set
 */

/**
 * 事务中心接口 - 管理数据库事务的单例
 */
interface TransactionCenter {
  /**
   * 获取当前活跃的数据库事务
   * @returns 当前事务实例，如果没有活跃事务则返回 null/undefined
   */
  currentTransaction?: Transaction | null;
}

/**
 * 事务接口 - 表示一个数据库事务
 */
interface Transaction {
  /**
   * 通知事务数据库已发生变更
   * @param db - 发生变更的数据库实例
   */
  onDBChanged(db: Database): void;
}

/**
 * 数据库缓存接口 - 用于在事务中临时存储数据
 */
interface DatabaseCache {
  /**
   * 在缓存中设置键值对
   * @param key - 缓存键
   * @param value - 要存储的值
   */
  set<T>(key: string, value: T): void;
}

/**
 * 数据库实例接口
 */
interface Database {
  /**
   * 事务专用缓存，用于隔离事务内的数据变更
   */
  readonly _dbCache: DatabaseCache;

  /**
   * 底层数据库存储，直接持久化数据
   */
  readonly _db: DatabaseCache;
}

/**
 * 模块上下文 - 通常由 Webpack 模块系统提供
 */
interface ModuleContext {
  /**
   * 当前模块关联的数据库实例
   */
  db: Database;
}

/**
 * TransactionCenter 静态工厂
 */
declare namespace TransactionCenter {
  /**
   * 获取 TransactionCenter 单例实例
   * @returns TransactionCenter 单例
   */
  function getInstance(): TransactionCenter;
}

/**
 * 在数据库中设置值的函数
 * 如果存在活跃事务，则将数据写入事务缓存；
 * 否则直接写入数据库持久层
 * 
 * @param this - 模块上下文，包含数据库实例
 * @param key - 要设置的键名
 * @param value - 要存储的值
 * 
 * @remarks
 * - 在事务上下文中，数据先写入 `_dbCache`，事务提交后才持久化
 * - 非事务上下文中，数据直接写入 `_db` 持久层
 * 
 * @example
 *