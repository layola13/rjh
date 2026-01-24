/**
 * 获取对象属性的辅助函数，支持原型链查找
 * 
 * 这是一个 `Reflect.get` 的 polyfill 实现，用于在不支持 Reflect API 的环境中
 * 获取对象属性值，包括从原型链中继承的属性。
 * 
 * @param target - 目标对象
 * @param propertyKey - 要获取的属性键
 * @param receiver - 可选的接收者对象，用作 getter 的 this 值
 * @returns 属性值
 * 
 * @example
 *