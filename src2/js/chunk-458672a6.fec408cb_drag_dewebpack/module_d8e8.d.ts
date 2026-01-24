/**
 * 验证并返回函数类型的值
 * 
 * 此工具函数用于运行时类型检查，确保传入的值是一个函数。
 * 如果验证失败，会抛出带有描述性信息的 TypeError。
 * 
 * @template T - 函数类型参数
 * @param fn - 需要验证的值
 * @returns 验证通过后返回原函数
 * @throws {TypeError} 当传入的值不是函数时抛出
 * 
 * @example
 *