/**
 * 计算公式错误消息定义
 * @module FormulaErrorMessages
 */

/**
 * 公式错误消息类型定义
 * 包含各种配置文件公式、玻璃公式、价格公式等的错误提示信息
 */
interface FormulaErrorMessages {
  /** 计算公式存在错误，请先检查计算公式 */
  exist_err: string;
  
  /** 缺少配置文件公式 */
  err_0: string;
  
  /** 配置文件公式缺少公式类型 */
  err_1: string;
  
  /** 配置文件公式的公式类型无效 */
  err_2: string;
  
  /** 配置文件公式缺少计算类型 */
  err_3: string;
  
  /** 配置文件公式的计算类型无效 */
  err_4: string;
  
  /** 配置文件公式缺少配置文件类型 */
  err_5: string;
  
  /** 配置文件公式缺少定量定义 */
  err_6: string;
  
  /** {scriptType} {glassType} {glassSerial} 中缺少宽度公式 */
  err_7: string;
  
  /** 玻璃公式中存在重复的宽度公式 */
  err_8: string;
  
  /** {scriptType} {glassType} {glassSerial} 公式中缺少高度公式 */
  err_9: string;
  
  /** 玻璃公式中存在重复的高度公式 */
  err_10: string;
  
  /** 玻璃公式缺少玻璃类型 */
  err_11: string;
  
  /** 玻璃公式缺少值表达式 */
  err_12: string;
  
  /** 玻璃公式缺少定量定义 */
  err_13: string;
  
  /** {scriptType} {inner} 公式中缺少宽度公式 */
  err_14: string;
  
  /** {scriptType} {inner} 公式中缺少高度公式 */
  err_15: string;
  
  /** {scriptType} 公式中缺少尺寸公式 */
  err_16: string;
  
  /** 公式 {expression} 中缺少 {keywords} */
  err_17: string;
  
  /** 自定义变量 {variable} 中缺少 {keywords} */
  err_18: string;
  
  /** 公式 {expression} 中缺少 {keywords} */
  err_19: string;
  
  /** 错误的表达式 {expression} */
  err_20: string;
  
  /** 错误的表达式 {expression} */
  err_21: string;
  
  /** 自定义变量 {variable} 中的表达式 {expression} 错误 */
  err_22: string;
  
  /** 价格公式的表达式 {expression} 中缺少 {keywords} */
  err_23: string;
  
  /** 价格公式中的表达式 {expression} 错误 */
  err_24: string;
  
  /** 条件 {expression} 不正确 */
  err_25: string;
}

/**
 * 公式错误消息常量
 * 用于在计算公式验证过程中提供用户友好的错误提示
 */
declare const formulaErrorMessages: FormulaErrorMessages;

export default formulaErrorMessages;