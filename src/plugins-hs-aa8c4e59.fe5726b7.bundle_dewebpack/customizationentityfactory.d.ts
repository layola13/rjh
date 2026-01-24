/**
 * 自定义实体工厂
 * 用于注册和创建不同类型的自定义实体
 */

/**
 * 实体创建器接口
 * 定义实体创建器必须实现的accept方法
 */
interface EntityCreator<T = unknown, P = unknown> {
  /**
   * 接受参数并初始化实体
   * @param params - 初始化参数
   * @returns 创建的实体实例
   */
  accept(params: P): T;
}

/**
 * 实体创建器构造函数类型
 */
type EntityCreatorConstructor<T = unknown, P = unknown> = new () => EntityCreator<T, P>;

/**
 * 自定义实体工厂类
 * 使用注册模式管理不同类型实体的创建逻辑
 */
export declare class CustomizationEntityFactory {
  /**
   * 实体类型到创建器的映射表
   * @private
   */
  private static _classMap: Map<string, EntityCreatorConstructor>;

  /**
   * 注册实体创建器
   * @param entityType - 实体类型标识符
   * @param creator - 实体创建器构造函数
   * @remarks 重复注册相同类型会在控制台输出警告
   */
  static registerEntityCreator<T = unknown, P = unknown>(
    entityType: string,
    creator: EntityCreatorConstructor<T, P>
  ): void;

  /**
   * 创建指定类型的实体
   * @param entityType - 实体类型标识符
   * @param params - 传递给实体创建器的参数
   * @returns 创建的实体实例，如果类型未注册则返回undefined
   */
  static createEntity<T = unknown, P = unknown>(
    entityType: string,
    params: P
  ): T | undefined;
}