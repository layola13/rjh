/**
 * 将源对象的所有可枚举自有属性复制到目标对象
 * 
 * @template T - 目标对象类型
 * @template U - 源对象类型
 * 
 * @param target - 目标对象,如果为 falsy 值则不执行复制操作
 * @param source - 源对象,提供要复制的属性
 * @returns 返回修改后的目标对象,如果目标对象为 falsy 则返回 undefined
 * 
 * @remarks
 * 此函数依赖于两个内部工具:
 * - copyObject (模块 524104): 执行实际的属性复制操作
 * - keys (模块 178264): 获取源对象的所有可枚举自有属性键名
 * 
 * @example
 *