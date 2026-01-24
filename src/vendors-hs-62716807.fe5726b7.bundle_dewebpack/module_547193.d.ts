/**
 * 从对象中获取指定属性值并转换为函数类型
 * 
 * @description
 * 该模块用于安全地从对象中提取属性值,并在值不为 null/undefined 时将其转换为函数。
 * 常用于获取对象方法或需要确保返回可调用函数的场景。
 * 
 * @template T - 目标对象的类型
 * @template K - 对象属性键的类型
 * 
 * @param target - 目标对象
 * @param propertyKey - 要获取的属性键名
 * 
 * @returns 如果属性值为 null 或 undefined 则返回 undefined,否则返回转换后的函数
 * 
 * @example
 *