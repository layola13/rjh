/**
 * 内部状态存储接口
 * 用于存储对象的私有状态信息
 */
interface InternalState<T = unknown> {
  /** 状态类型标识符 */
  type: string;
  /** 实际存储的状态数据 */
  state?: T;
}

/**
 * 类型检查函数
 * 检查给定值是否为对象类型
 * @param value - 待检查的值
 * @returns 如果值为对象则返回true，否则返回false
 */
declare function c(value: unknown): value is object;

/**
 * 状态获取函数
 * 从对象中提取内部状态
 * @param target - 目标对象
 * @returns 对象关联的内部状态，如果不存在则返回undefined
 */
declare function a<T = unknown>(target: object): InternalState<T> | undefined;

/**
 * 错误构造函数
 * 创建类型错误异常
 * @param message - 错误消息
 * @returns TypeError实例
 */
declare function h(message: string): TypeError;

/**
 * Getter工厂函数
 * 为指定类型创建安全的状态访问器
 * 
 * @template T - 状态数据的类型
 * @param expectedType - 期望的状态类型标识符
 * @returns 返回一个getter函数，该函数：
 *          - 接收目标对象作为参数
 *          - 验证对象类型和状态类型是否匹配
 *          - 匹配则返回内部状态
 *          - 不匹配则抛出TypeError异常
 * 
 * @example
 *