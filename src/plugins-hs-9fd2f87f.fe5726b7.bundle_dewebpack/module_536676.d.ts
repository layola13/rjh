/**
 * 自定义模型缩放请求事务类型定义
 * 用于处理 3D 模型的尺寸调整操作，支持撤销/重做功能
 */

/**
 * 材质画刷工具接口
 * 用于处理自定义模型的材质信息导出和导入
 */
interface MaterialBrushUtil {
  /**
   * 获取 DIY 面材质数据的转储
   * @param content - 自定义模型实例
   * @returns 材质数据快照
   */
  getDiyFaceMaterialDump(content: HSCore.Model.CustomizedModel): unknown;

  /**
   * 设置 DIY 面材质数据
   * @param content - 自定义模型实例
   * @param dump - 材质数据快照
   */
  setDiyFaceMaterialDump(content: HSCore.Model.CustomizedModel, dump: unknown): void;
}

/**
 * 缩放规格接口
 * 定义模型在 X、Y、Z 三个轴向的长度
 */
interface ResizeSpec {
  /** X 轴长度（宽度） */
  XLength: number;
  /** Y 轴长度（高度） */
  YLength: number;
  /** Z 轴长度（深度） */
  ZLength: number;
}

/**
 * 缩放参数接口
 * 定义模型在 X、Y、Z 三个轴向的缩放比例
 */
interface ScaleParams {
  /** X 轴缩放比例 */
  XScale?: number;
  /** Y 轴缩放比例 */
  YScale?: number;
  /** Z 轴缩放比例 */
  ZScale?: number;
}

/**
 * 自定义模型缩放请求类
 * 继承自 HSCore.Transaction.Request，实现模型尺寸调整的事务操作
 * 
 * @example
 *