/**
 * 将对象转换为原始值的类型转换函数
 * 
 * 这是ECMAScript规范中ToPrimitive抽象操作的实现，用于将对象转换为原始值。
 * 该函数会尝试调用对象的[Symbol.toPrimitive]方法，如果不存在则使用默认的原始值转换逻辑。
 * 
 * @module ToPrimitive
 * @see https://tc39.es/ecma262/#sec-toprimitive
 */

/**
 * 原始值类型提示
 * - 'string': 优先转换为字符串
 * - 'number': 优先转换为数字
 * - 'default': 默认转换行为（通常等同于'number'）
 */
type PreferredType = 'string' | 'number' | 'default';

/**
 * JavaScript原始值类型联合
 */
type PrimitiveValue = string | number | boolean | symbol | bigint | null | undefined;

/**
 * 将对象转换为原始值
 * 
 * 转换流程：
 * 1. 如果输入已经是原始值或Symbol，直接返回
 * 2. 尝试获取对象的[Symbol.toPrimitive]方法
 * 3. 如果存在该方法，调用它并传入hint参数
 * 4. 如果方法返回非对象值，返回该值；否则抛出TypeError
 * 5. 如果不存在[Symbol.toPrimitive]，使用OrdinaryToPrimitive转换
 * 
 * @param input - 待转换的输入值（可以是任意类型）
 * @param preferredType - 期望的转换类型提示，默认为'number'
 * @returns 转换后的原始值
 * @throws {TypeError} 当无法将对象转换为原始值时抛出
 * 
 * @example
 *