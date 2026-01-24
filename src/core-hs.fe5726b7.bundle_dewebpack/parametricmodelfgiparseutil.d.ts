/**
 * 参数化模型FGI解析工具类
 * 提供参数化模型网格键值解析功能
 */
export declare class ParametricModelFgiParseUtil {
  /**
   * 获取FGI解析器的网格键值
   * 根据实体ID和网格名称生成唯一的网格标识符
   * 对于特定类型的参数化模型（背景墙、浴室柜、窗帘等），会附加变量名称作为后缀
   * 
   * @param baseKey - 基础键值字符串
   * @param entityId - 文档中实体的唯一标识符
   * @param meshName - 网格对象的名称
   * @returns 生成的网格键值，格式为 `baseKey` 或 `baseKey-variableName`
   * 
   * @example
   *