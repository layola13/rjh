/**
 * 对数组进行归约操作，将每个元素应用于累加器函数
 * 
 * @template T - 数组元素的类型
 * @template R - 归约结果对象的类型
 * 
 * @param array - 要处理的输入数组
 * @param reducer - 归约函数，接收累加器和当前元素，返回新的累加器值
 * @returns 归约后的结果对象
 * 
 * @example
 *