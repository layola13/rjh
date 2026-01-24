/**
 * 户外绘图工具类
 * 提供户外场景中几何元素的删除验证功能
 */
export declare class OutdoorDrawingUtil {
  /**
   * 私有构造函数，该类仅提供静态方法
   */
  private constructor();

  /**
   * 检查是否可以删除指定顶点
   * 
   * @param editor - 编辑器实例
   * @param point - 要检查的顶点坐标点
   * @returns 如果可以删除返回 true，否则返回 false
   * 
   * @remarks
   * 验证规则：
   * - 检查连接到该顶点的所有边是否都是背景边
   * - 如果是三角形背景区域的顶点，则不允许删除
   */
  static couldDeleteVertex(editor: unknown, point: unknown): boolean;

  /**
   * 检查是否可以删除指定面
   * 
   * @param editor - 编辑器实例
   * @param face - 要检查的面对象
   * @returns 如果可以删除返回 true，否则返回 false
   * 
   * @remarks
   * 验证规则：
   * - 检查面的所有边是否被多个面共享
   * - 检查边是否与全局路径（slabBuilder路径）重叠
   * - 如果边完全重叠或部分重叠且起止点都在路径上，则不允许删除
   */
  static couldDeleteFace(editor: unknown, face: unknown): boolean;

  /**
   * 检查是否可以删除户外场景中的面
   * 
   * @param face - 要检查的户外面对象
   * @returns 如果可以删除返回 true，否则返回 false
   * 
   * @remarks
   * 验证规则：
   * - 如果面不在户外图层中，允许删除
   * - 检查面的外轮廓的每条边是否与以下元素重叠：
   *   1. 根图层的 slabBuilder 全局路径
   *   2. 其他户外楼层的外轮廓或孔洞
   * - 如果所有边都与现有路径重叠，则不允许删除
   */
  static couldDeleteOutdoorFace(face: unknown): boolean;
}

/**
 * 默认导出
 */
export default OutdoorDrawingUtil;