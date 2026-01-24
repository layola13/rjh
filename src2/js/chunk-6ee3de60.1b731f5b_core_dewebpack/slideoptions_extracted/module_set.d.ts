/**
 * Module: module_set
 * Original ID: set
 * 
 * 设置锁定方向的方法
 * @param direction - 要锁定的方向值
 */
declare function setLockDirection(direction: unknown): void;

/**
 * 或者如果这是某个类的方法：
 */
declare class SomeClass {
  /**
   * 私有属性：存储锁定的方向
   */
  private _lockDirection: unknown;

  /**
   * 设置锁定方向
   * @param direction - 要锁定的方向值，可能是字符串、数字或特定的方向枚举
   */
  setLockDirection(direction: unknown): void;
}

/**
 * 如果方向有特定的类型，建议定义为：
 */
type Direction = 'horizontal' | 'vertical' | 'both' | 'none';

declare class ImprovedClass {
  private _lockDirection: Direction;
  
  /**
   * 设置锁定方向
   * @param direction - 锁定方向：水平、垂直、双向或无锁定
   */
  setLockDirection(direction: Direction): void;
}