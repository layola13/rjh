/**
 * 表示可以被规范化和反规范化的任意对象
 */
interface NormalizableObject {
  [key: string]: unknown;
}

/**
 * 规范化上下文,包含规范化过程所需的元数据
 */
interface NormalizationContext {
  [key: string]: unknown;
}

/**
 * 反规范化上下文,包含反规范化过程所需的元数据
 */
interface DenormalizationContext {
  [key: string]: unknown;
}

/**
 * 数据规范化器基类
 * 提供对象数据的规范化(normalize)和反规范化(denormalize)能力
 * 
 * @description
 * 该类继承自某个基础规范化类,实现了对对象属性的遍历处理:
 * - normalize: 将原始数据转换为规范化格式
 * - denormalize: 将规范化数据还原为原始格式
 * 
 * @example
 *