/**
 * 获取值的详细类型标签
 * 
 * 此函数增强了基础的类型检测，能够正确识别原生对象类型（如 Map、Set、Promise 等），
 * 即使它们来自不同的 iframe 或 realm。
 * 
 * @param value - 需要检测类型的值
 * @returns 表示值类型的标签字符串，如 "[object Map]", "[object Set]" 等
 * 
 * @example
 *