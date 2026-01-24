/**
 * 型材计算公式错误消息定义
 * Module: module_efae
 * Original ID: efae
 */

/**
 * 公式错误消息类型定义
 * 包含型材、玻璃、尺寸等各类计算公式的错误提示信息
 */
interface FormulaErrorMessages {
  /** 计算公式存在错误，请先检查计算公式 */
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
  
  /** 型材公式缺少定量定义 */
  err_6: string;
  
  /** 
   * {scriptType} {glassType} {glassSerial} 中缺少宽度公式
   * @template scriptType - 脚本类型
   * @template glassType - 玻璃类型
   * @template glassSerial - 玻璃序号
   */
  err_7: string;
  
  /** 玻璃公式中存在重复的宽度公式 */
  err_8: string;
  
  /** 
   * {scriptType} {glassType} {glassSerial} 公式中缺少高度公式
   * @template scriptType - 脚本类型
   * @template glassType - 玻璃类型
   * @template glassSerial - 玻璃序号
   */
  err_9: string;
  
  /** 玻璃公式中存在重复的高度公式 */
  err_10: string;
  
  /** 玻璃公式缺少玻璃类型 */
  err_11: string;
  
  /** 玻璃公式缺少取值表达式 */
  err_12: string;
  
  /** 玻璃公式缺少定量定义 */
  err_13: string;
  
  /** 
   * {scriptType} {inner} 公式中缺少宽度公式
   * @template scriptType - 脚本类型
   * @template inner - 内部标识
   */
  err_14: string;
  
  /** 
   * {scriptType} {inner} 公式中缺少高度公式
   * @template scriptType - 脚本类型
   * @template inner - 内部标识
   */
  err_15: string;
  
  /** 
   * {scriptType} 公式中缺少尺寸公式
   * @template scriptType - 脚本类型
   */
  err_16: string;
  
  /** 
   * 公式 {expression} 中缺少 {keywords}
   * @template keywords - 缺失的关键字
   * @template expression - 公式表达式
   */
  err_17: string;
  
  /** 
   * 自定义变量 {variable} 中缺少 {keywords}
   * @template keywords - 缺失的关键字
   * @template variable - 变量名称
   */
  err_18: string;
  
  /** 
   * 公式 {expression} 中缺少 {keywords}
   * @template keywords - 缺失的关键字
   * @template expression - 公式表达式
   */
  err_19: string;
  
  /** 
   * 错误的表达式 {expression}
   * @template expression - 错误的表达式
   */
  err_20: string;
  
  /** 
   * 错误的表达式 {expression}
   * @template expression - 错误的表达式
   */
  err_21: string;
  
  /** 
   * 自定义变量 {variable} 中的表达式 {expression} 错误
   * @template variable - 变量名称
   * @template expression - 表达式内容
   */
  err_22: string;
  
  /** 
   * 价格公式的表达式 {expression} 中缺少 {keywords}
   * @template keywords - 缺失的关键字
   * @template expression - 表达式内容
   */
  err_23: string;
  
  /** 
   * 价格公式中的表达式 {expression} 错误
   * @template expression - 表达式内容
   */
  err_24: string;
  
  /** 
   * 条件 {expression} 不正确
   * @template expression - 条件表达式
   */
  err_25: string;
}

/**
 * 导出公式错误消息常量对象
 */
declare const formulaErrorMessages: FormulaErrorMessages;

export default formulaErrorMessages;