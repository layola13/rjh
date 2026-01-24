/**
 * 对象到数组转换工具模块
 * 
 * 该模块提供了一个函数，用于处理类数组对象和字符串到数组的转换。
 * 主要解决某些环境下字符串索引属性不可枚举的问题。
 * 
 * @module ObjectToIndexedConverter
 */

/**
 * 类型分类函数的返回值类型
 * 可能的值包括：'String', 'Number', 'Boolean', 'Object', 'Array', 'Function', 'Date', 'RegExp', 'Null', 'Undefined'
 */
type ClassificationResult = string;

/**
 * 类型分类函数接口
 * 用于获取值的精确类型字符串表示
 */
interface ClassifyFunction {
  (value: unknown): ClassificationResult;
}

/**
 * 输入值类型：可以是字符串或任何可转换为对象的值
 */
type ConvertibleValue = string | object | null | undefined;

/**
 * 将值转换为索引对象（数组或对象）
 * 
 * 此函数检查环境是否支持字符串索引的可枚举属性。
 * 如果不支持（如某些旧版浏览器），则对字符串进行特殊处理，
 * 将其拆分为字符数组；否则使用标准的 Object() 转换。
 * 
 * @param value - 要转换的值，通常是字符串或类数组对象
 * @returns 如果输入是字符串且环境不支持索引枚举，返回字符数组；否则返回对象包装的值
 * 
 * @example
 *