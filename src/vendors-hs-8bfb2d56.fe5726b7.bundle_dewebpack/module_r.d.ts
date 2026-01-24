/**
 * Module: module_r
 * 
 * 执行模块调用的函数，通过给定的模块ID从哈希表中获取模块函数并执行
 * 
 * @param moduleId - 模块标识符，用于从ht哈希表中查找对应的模块函数
 * @param param1 - 第一个参数，会通过lt函数转换后传递给模块函数
 * @param param2 - 第二个参数，会通过dt函数转换后传递给模块函数
 * @param options - 可选配置对象，直接传递给模块函数
 */
declare function moduleR(
    moduleId: string | number,
    param1: unknown,
    param2: unknown,
    options?: unknown
): void;

/**
 * 模块函数类型定义
 * 接收转换后的参数并执行特定逻辑
 */
type ModuleFunction = (
    transformedParam1: unknown,
    transformedParam2: unknown,
    nullValue: null,
    options?: unknown
) => void;

/**
 * 模块哈希表，存储模块ID到模块函数的映射
 */
declare const ht: Record<string | number, ModuleFunction>;

/**
 * 参数转换函数lt
 * 将输入参数转换为模块所需的格式
 */
declare function lt(input: unknown): unknown;

/**
 * 参数转换函数dt
 * 将输入参数转换为模块所需的格式
 */
declare function dt(input: unknown): unknown;