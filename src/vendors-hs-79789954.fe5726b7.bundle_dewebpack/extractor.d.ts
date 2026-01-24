/**
 * 导入几何计算相关类型
 * 来自几何库模块 (815362)
 */
import { Loop, Vector2, Polygon, BoundingBox } from './geometry-lib';

/**
 * 标准化类型：定义坐标系原点的位置
 * - "none": 不进行标准化
 * - "center": 以边界框中心为原点
 * - "centroid": 以多边形质心为原点
 * - "topLeft": 以边界框左上角为原点
 */
export type NormalizeType = "none" | "center" | "centroid" | "topLeft";

/**
 * 楼层接口定义
 */
export interface Floor {
  /** 楼层所属的楼层平面图 */
  _floorplan: FloorPlan;
  
  /** 楼层的世界坐标系2D路径（外轮廓） */
  worldRawPath2d: {
    outer: Array<{ x: number; y: number }>;
  };
}

/**
 * 楼层平面图接口定义
 */
export interface FloorPlan {
  // 楼层平面图相关属性
  [key: string]: unknown;
}

/**
 * 可标准化的几何对象接口
 */
export interface Normalizable {
  /**
   * 平移变换方法
   * @param translation - 平移向量
   * @returns 变换后的对象
   */
  translate(translation: Vector2): this;
}

/**
 * 提取器类：用于楼层几何数据的坐标标准化处理
 * 
 * 该类负责将楼层的几何数据转换到统一的坐标系统中，
 * 支持多种标准化方式（中心点、质心、左上角等）
 */
export declare class Extractor {
  /** 楼层平面图引用 */
  readonly floorPlan: FloorPlan;
  
  /** 楼层对象引用 */
  readonly floor: Floor;
  
  /** 标准化类型 */
  readonly normalizeType: NormalizeType;
  
  /** 用于标准化的平移向量 */
  readonly translate2D: Vector2;

  /**
   * 创建提取器实例
   * @param floor - 楼层对象
   * @param normalizeType - 标准化类型，默认为"center"（中心点）
   */
  constructor(floor: Floor, normalizeType?: NormalizeType);

  /**
   * 标准化几何对象的坐标
   * @param element - 需要标准化的几何对象
   * @returns 标准化后的几何对象
   */
  normalize<T extends Normalizable>(element: T): T;

  /**
   * 判断是否需要进行标准化
   * @returns 当标准化类型不为"none"时返回true
   */
  get needNormalize(): boolean;

  /**
   * 根据标准化类型计算平移向量
   * @param loop - 楼层外轮廓环路
   * @returns 计算得到的平移向量
   * @private
   */
  private _getTranslate2D(loop: Loop): Vector2;
}