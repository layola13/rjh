/**
 * 模块：module_set
 * 原始标识：set
 */

/**
 * 设置种子值的构造函数
 * @param seed - 种子值，用于初始化随机数生成器或其他需要种子的操作
 */
declare function setSeed<T>(seed: T): void;

/**
 * 种子配置接口
 */
interface SeedConfig<T = unknown> {
  /**
   * 是否已设置种子
   */
  hasSeed: boolean;
  
  /**
   * 存储的种子值
   */
  _seed: T;
}

/**
 * 带种子管理功能的类
 */
declare class ModuleSet<T = unknown> implements SeedConfig<T> {
  /**
   * 标识是否已设置种子
   */
  hasSeed: boolean;
  
  /**
   * 私有属性：存储的种子值
   */
  private _seed: T;
  
  /**
   * 构造函数
   * @param seed - 初始化种子值
   */
  constructor(seed: T);
  
  /**
   * 获取当前种子值
   * @returns 当前存储的种子
   */
  getSeed(): T;
}

export { ModuleSet, SeedConfig, setSeed };