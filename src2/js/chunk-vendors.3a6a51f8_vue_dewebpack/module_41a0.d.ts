/**
 * 创建迭代器构造函数的工厂方法
 * 
 * 此函数用于创建符合迭代器协议的构造函数，为给定的类添加迭代器功能。
 * 它会设置构造函数的原型，使其包含 next 方法和 Symbol.iterator。
 * 
 * @template T - 迭代器返回值的类型
 * @param constructor - 要设置为迭代器的构造函数
 * @param name - 迭代器的名称（用于调试和toString）
 * @param nextMethod - next 方法的实现函数
 * 
 * @example
 *