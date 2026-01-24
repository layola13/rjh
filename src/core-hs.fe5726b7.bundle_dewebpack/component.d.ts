/**
 * Component 基类
 * 提供组件的基础功能，包括引用对象管理、类型识别、克隆和序列化
 * @module Component
 */

/**
 * 组件基类
 * 所有组件的抽象基类，定义了组件的核心接口和行为
 */
export declare class Component {
  /**
   * 内部引用对象
   * @private
   */
  private _referObject?: unknown;

  /**
   * 组件类型标识符
   * @static
   */
  static readonly Type: string;

  /**
   * 构造函数
   * 创建一个新的组件实例
   */
  constructor();

  /**
   * 设置引用对象
   * @param value - 要设置的引用对象
   */
  set referObject(value: unknown);

  /**
   * 获取组件类型
   * @returns 组件的类型标识符
   */
  get type(): string;

  /**
   * 获取组件的引用集合
   * @returns 引用对象集合（具体类型由子类实现决定）
   */
  refs(): void;

  /**
   * 克隆当前组件
   * 创建当前组件的深拷贝
   * @returns 新的组件实例
   */
  clone(): Component;

  /**
   * 序列化组件数据
   * 将组件转换为可序列化的对象格式
   * @returns 包含组件类型的序列化对象
   */
  dump(): {
    /** 组件类型标识 */
    tp: string;
  };
}