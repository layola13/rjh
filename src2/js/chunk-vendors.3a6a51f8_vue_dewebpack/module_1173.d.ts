/**
 * 验证构造函数调用的正确性
 * 
 * 此函数用于确保：
 * 1. 对象是通过特定构造函数创建的实例
 * 2. 对象上不存在某个特定的属性（可选检查）
 * 
 * 常用于polyfill或库代码中，防止构造函数被当作普通函数调用
 * 
 * @param instance - 待检查的实例对象
 * @param constructor - 期望的构造函数
 * @param errorMessage - 错误消息前缀
 * @param forbiddenProperty - （可选）不应存在于实例上的属性名
 * @returns 返回原始实例对象（如果验证通过）
 * @throws {TypeError} 当实例不是构造函数的实例，或存在禁止的属性时抛出
 * 
 * @example
 *