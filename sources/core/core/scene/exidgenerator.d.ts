/**
 * ExIdGenerator - 唯一ID生成器管理类
 * 用于管理和生成不同类型的唯一标识符
 */

/**
 * ID生成器类型枚举
 */
declare enum IDGeneratorType {
  ExSketch = "ExSketch"
}

/**
 * ID生成器基础类
 * 负责实际的ID生成逻辑
 */
declare class IDGenerator {
  /**
   * 生成唯一标识符
   * @param prefix - ID前缀
   */
  generate(prefix: string): string;

  /**
   * 注册ID生成器工厂函数
   * @param instance - 生成器实例
   * @param factory - 工厂函数，根据类型返回对应的生成器
   */
  static register(
    instance: unknown,
    factory: (type: IDGeneratorType) => IDGenerator
  ): void;
}

/**
 * HSCore工具命名空间
 */
declare namespace HSCore.Util {
  export { IDGenerator, IDGeneratorType };
}

/**
 * ExIdGenerator - 扩展ID生成器（单例模式）
 * 管理多种类型的ID生成器实例，提供统一的ID生成接口
 */
export declare class ExIdGenerator {
  /**
   * 单例实例
   */
  private static _instance: ExIdGenerator | undefined;

  /**
   * ID生成器映射表
   * 存储不同类型的ID生成器实例
   */
  private readonly _idGenerators: Record<IDGeneratorType, IDGenerator>;

  /**
   * 私有构造函数（单例模式）
   * 初始化各类型的ID生成器并注册到HSCore
   */
  private constructor();

  /**
   * 生成唯一标识符
   * @param prefix - ID前缀，用于标识ID的用途或来源
   * @returns 生成的唯一ID字符串
   */
  generateId(prefix: string): string;

  /**
   * 获取ExIdGenerator单例实例
   * @returns ExIdGenerator的唯一实例
   */
  static getInstance(): ExIdGenerator;
}