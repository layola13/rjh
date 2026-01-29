/**
 * 参数化模型FGI解析工具类
 * 用于处理参数化模型的网格键值解析
 */
export declare class ParametricModelFgiParseUtil {
  /**
   * 获取FGI解析器的网格键值
   * 
   * @param baseKey - 基础键值
   * @param entityId - 实体ID，用于从文档管理器中查找对应实体
   * @param meshName - 网格名称
   * @returns 处理后的网格键值。如果实体是特定参数化模型类型且存在变量名，则返回 "baseKey-variableName"，否则返回原始baseKey
   * 
   * @remarks
   * 该方法会检查实体是否为以下类型之一：
   * - NCustomizedParametricBackgroundWall（自定义参数化背景墙）
   * - NCPBackgroundWallUnit（背景墙单元）
   * - ParametricCurtain（参数化窗帘）
   * - ParametricBathroomCabinet（参数化浴室柜）
   * 
   * 对于这些类型的模型，会尝试通过网格名称获取对应的变量名并追加到键值中
   */
  static getFgiParserMeshKey(
    baseKey: string,
    entityId: string,
    meshName: string
  ): string;
}