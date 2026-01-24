/**
 * 调用内置函数获取器的工具模块
 * 
 * 该模块提供了一个实用函数，用于获取 JavaScript 内置方法的绑定版本。
 * 当方法是原型方法时，会自动返回其绑定（curried）版本。
 */

/**
 * 获取内置函数的引用，如果是原型方法则返回绑定后的版本
 * 
 * @param intrinsicName - 内置函数的名称（如 'String.prototype.indexOf'）
 * @param allowMissing - 是否允许函数不存在，默认为 false
 * @returns 如果是原型方法则返回绑定后的函数，否则返回原函数引用
 * 
 * @example
 *