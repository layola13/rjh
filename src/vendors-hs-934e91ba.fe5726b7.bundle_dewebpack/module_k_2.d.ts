/**
 * Module: module_k
 * 
 * 初始化并抛出一个错误实例的工厂函数
 * 注意：此函数会抛出异常，返回语句实际不可达
 * 
 * @module module_k
 */

/**
 * 创建并抛出一个初始化后的错误实例
 * 
 * @template T - 错误对象的类型
 * @template TInit - 初始化参数类型
 * @template TExtra - 额外配置参数类型
 * 
 * @param errorObject - 要初始化并抛出的错误对象
 * @param initParam - 初始化参数
 * @param extraParam - 额外配置参数
 * 
 * @throws {IA} 总是抛出初始化后的错误实例
 * @returns {never} 此函数不会正常返回（总是抛出异常）
 * 
 * @example
 *