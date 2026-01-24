/**
 * 检查值是否为类数组对象
 * 
 * 类数组对象是指具有 length 属性且 length 为有效数字，但不是函数的对象。
 * 常见的类数组对象包括：arguments 对象、DOM NodeList、jQuery 对象等。
 * 
 * @param value - 要检查的值
 * @returns 如果值是类数组对象则返回 true，否则返回 false
 * 
 * @example
 *