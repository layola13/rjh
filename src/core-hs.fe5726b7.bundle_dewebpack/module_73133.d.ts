/**
 * 检测特定 Set 方法是否可用且正常工作
 * 
 * 该函数通过创建一个模拟的类 Set 对象来测试指定的 Set 方法是否存在并能正常执行。
 * 常用于检测环境是否支持某些 Set 的高级方法（如 union, intersection 等）。
 * 
 * @param methodName - 要检测的 Set 方法名称
 * @returns 如果方法可用且执行成功返回 true，否则返回 false
 * 
 * @example
 *