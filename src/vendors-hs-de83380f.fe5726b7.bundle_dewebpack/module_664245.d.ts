/**
 * 创建一个辅助函数用于正确处理类的继承，特别是在使用 Reflect.construct 时
 * 这个函数确保派生类的构造函数能够正确调用父类构造函数
 * 
 * @template T - 构造函数类型
 * @param BaseClass - 要继承的基类构造函数
 * @returns 返回一个包装函数，用于在派生类构造函数中调用
 */
declare function createInheritanceHelper<T extends new (...args: any[]) => any>(
  BaseClass: T
): () => InstanceType<T>;

export default createInheritanceHelper;

/**
 * 检测当前环境是否支持 Reflect.construct
 * 用于判断是否可以使用现代化的类继承方式
 * 
 * @returns 如果环境支持 Reflect.construct 则返回 true，否则返回 false
 */
declare function isReflectConstructSupported(): boolean;

/**
 * 构造函数类型定义
 * 表示一个可以被实例化的类构造函数
 */
type Constructor<T = any> = new (...args: any[]) => T;

/**
 * 获取类的原型对象
 * 从 module 388795 导入的工具函数
 * 
 * @param target - 目标类或实例
 * @returns 返回目标的原型对象
 */
declare function getPrototypeOf(target: any): any;

/**
 * 处理可能的构造函数返回值
 * 从 module 566813 导入的工具函数
 * 确保返回正确的实例对象
 * 
 * @param context - 当前上下文（this）
 * @param constructResult - 构造函数的返回结果
 * @returns 返回最终的实例对象
 */
declare function possibleConstructorReturn(
  context: any,
  constructResult: any
): any;