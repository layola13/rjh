/**
 * 窗帘数据模块
 * 提供窗帘尺寸和ID的查询功能
 */

/**
 * 三维尺寸接口
 */
interface Size3D {
  /** X轴尺寸（宽度，单位：毫米） */
  x: number;
  /** Y轴尺寸（高度，单位：毫米） */
  y: number;
  /** Z轴尺寸（深度，单位：毫米） */
  z: number;
}

/**
 * 窗帘配置接口
 */
interface CurtainConfig {
  /** 窗帘唯一标识符（UUID格式） */
  id: string;
  /** 窗帘三维尺寸 */
  size: Size3D;
}

/**
 * 窗帘数据管理类
 * 负责管理预定义窗帘配置并提供查询功能
 */
export declare class CurtainData {
  /**
   * 预定义的窗帘配置列表
   * 按X轴尺寸从小到大排序：1732mm, 2276mm, 2648mm, 3590mm, 4550mm
   * @private
   * @readonly
   */
  private static readonly _defaultCurtains: CurtainConfig[];

  /**
   * 根据X轴尺寸查找最匹配的窗帘ID
   * 通过计算差值找到尺寸最接近的窗帘配置
   * 
   * @param xSize - 目标X轴尺寸（宽度，单位：毫米）
   * @returns 最接近目标尺寸的窗帘ID（UUID格式）
   * 
   * @example
   *