/**
 * 检查给定值是否为类数组对象
 * 
 * 类数组对象是指具有 length 属性（数字类型）但本身不是函数的对象。
 * 常见的类数组对象包括：
 * - arguments 对象
 * - DOM NodeList
 * - jQuery 对象
 * - 字符串
 * - 普通数组
 * 
 * @param value - 需要检查的值
 * @returns 如果是类数组对象返回 true，否则返回 false
 * 
 * @example
 *