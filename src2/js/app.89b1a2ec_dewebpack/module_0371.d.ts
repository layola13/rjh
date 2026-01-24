/**
 * 算料公式错误消息配置模块
 * 
 * 该模块定义了算料公式验证过程中可能出现的所有错误消息类型及其对应的文本内容。
 * 用于在公式解析、验证和计算过程中提供统一的错误提示信息。
 */

/**
 * 算料公式错误消息映射接口
 * 
 * 定义了所有可能的错误代码及其对应的错误消息文本。
 * 消息文本中可能包含占位符（如 {scriptType}、{glassType} 等），需要在运行时替换为实际值。
 */
export interface FormulaErrorMessages {
  /** 算料公式存在错误的通用提示 */
  exist_err: string;
  
  /** 缺少型材公式 */
  err_0: string;
  
  /** 型材公式缺少公式类型 */
  err_1: string;
  
  /** 型材公式的公式类型无效 */
  err_2: string;
  
  /** 型材公式缺少计算类型 */
  err_3: string;
  
  /** 型材公式的计算类型无效 */
  err_4: string;
  
  /** 型材公式缺少型材类型 */
  err_5: string;
  
  /** 型材公式缺少数量定义 */
  err_6: string;
  
  /** 玻璃公式缺少宽公式（包含占位符：{scriptType}、{glassType}、{glassSerial}） */
  err_7: string;
  
  /** 玻璃公式中有重复的宽公式 */
  err_8: string;
  
  /** 玻璃公式缺少高公式（包含占位符：{scriptType}、{glassType}、{glassSerial}） */
  err_9: string;
  
  /** 玻璃公式中有重复的高公式 */
  err_10: string;
  
  /** 玻璃公式缺少玻璃类型 */
  err_11: string;
  
  /** 玻璃公式缺少值的表达式 */
  err_12: string;
  
  /** 玻璃公式缺少数量定义 */
  err_13: string;
  
  /** 扇尺寸公式缺少宽公式（包含占位符：{scriptType}、{inner}） */
  err_14: string;
  
  /** 扇尺寸公式缺少高公式（包含占位符：{scriptType}、{inner}） */
  err_15: string;
  
  /** 扇尺寸公式缺少公式（包含占位符：{scriptType}） */
  err_16: string;
  
  /** 公式中缺少关键字（包含占位符：{expression}、{keywords}） */
  err_17: string;
  
  /** 自定义变量中缺少关键字（包含占位符：{variable}、{keywords}） */
  err_18: string;
  
  /** 公式中缺少关键字（包含占位符：{expression}、{keywords}） */
  err_19: string;
  
  /** 公式表达式错误（包含占位符：{expression}） */
  err_20: string;
  
  /** 公式表达式错误（包含占位符：{expression}） */
  err_21: string;
  
  /** 自定义变量表达式错误（包含占位符：{variable}、{expression}） */
  err_22: string;
  
  /** 报价公式表达式中缺少关键字（包含占位符：{expression}、{keywords}） */
  err_23: string;
  
  /** 报价公式表达式错误（包含占位符：{expression}） */
  err_24: string;
  
  /** 有效条件表达式错误（包含占位符：{expression}） */
  err_25: string;
}

/**
 * 算料公式错误消息配置对象
 * 
 * 包含所有预定义的错误消息文本，用于算料公式验证和错误提示。
 */
declare const formulaErrorMessages: FormulaErrorMessages;

export default formulaErrorMessages;