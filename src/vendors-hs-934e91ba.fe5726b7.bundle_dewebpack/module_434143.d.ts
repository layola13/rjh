/**
 * 检查给定值是否为 Set 对象
 * 
 * @description
 * 该函数结合了类型检查和对象标签验证，用于准确判断一个值是否为原生 Set 实例。
 * 它不仅验证值的基本类型属性，还通过 Object.prototype.toString 检查其内部 [[Class]] 标记。
 * 
 * @param value - 需要检查的任意值
 * @returns 如果值是 Set 对象则返回 true，否则返回 false
 * 
 * @example
 *