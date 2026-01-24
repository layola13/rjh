/**
 * Module: module_get
 * Original ID: get
 * 
 * 单例模式获取器：确保类只有一个实例
 * @returns 返回类的单例实例
 */
declare function get<T extends new () => InstanceType<T>>(
  singletonClass: T & { instance?: InstanceType<T> }
): InstanceType<T>;

export default get;

// 或者如果 s 是具体的类：

/**
 * 单例类实例接口
 */
interface SingletonInstance {
  // 在此添加实例的具体属性和方法
  [key: string]: unknown;
}

/**
 * 单例类构造函数
 */
interface SingletonConstructor {
  new (): SingletonInstance;
  instance?: SingletonInstance;
}

/**
 * 获取单例实例
 * @description 如果实例不存在则创建新实例，否则返回现有实例
 * @returns 单例类的实例
 */
declare function get(): SingletonInstance;

export default get;