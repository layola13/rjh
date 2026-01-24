/**
 * ID生成器类，用于生成和回收唯一标识符
 * 采用ID池机制，优先复用已回收的ID，避免ID无限增长
 */
export declare class IdCreator {
  /**
   * 当前自增ID的值
   * @default 1
   */
  private static id: number;

  /**
   * 已回收的ID池，存储可复用的ID
   */
  private static ids: Set<number>;

  /**
   * 生成一个唯一的ID
   * 
   * 算法逻辑：
   * 1. 如果ID池中存在可复用的ID，优先从池中取出并返回
   * 2. 如果ID池为空，返回自增ID并递增计数器
   * 
   * @returns 唯一的数字ID
   */
  static gen(): number;

  /**
   * 回收不再使用的ID到ID池中
   * 
   * @param id - 需要回收的ID，必须大于0才会被加入池中
   * @remarks 
   * - ID值小于等于0的会被忽略
   * - 回收的ID可在后续gen()调用中被复用
   */
  static recycle(id: number): void;
}