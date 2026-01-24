/**
 * 框架标识模块
 * 用于识别和匹配窗框、中梃和窗扇的几何特征
 */

import type { Polygon } from './geometry';
import type { ShapeManager } from './shapeManager';
import type { MullionManager } from './mullionManager';
import type { SashManager } from './sashManager';
import type { FrameManager } from './frameManager';
import type { Segment, Line, Point } from './geometry';

/**
 * 多边形边缘索引标识
 */
export interface PolyId {
  /** 边缘索引 */
  idx: number;
  /** 位置索引，-1 表示原始边缘 */
  pos: number;
}

/**
 * 边缘坐标点信息
 */
export interface EdgePoint {
  /** 投影后的坐标点 */
  pt: Point;
  /** 关联的多边形边缘标识 */
  polyId: PolyId;
}

/**
 * 边缘查找结果
 */
export interface EdgeFindResult {
  /** 线段 */
  seg: Segment;
  /** 线段上的关键点 */
  points: EdgePoint[];
}

/**
 * 多边形标识结果
 */
export interface PolygonIdentityResult {
  /** JSON 序列化的斜率数组 */
  str: string;
  /** 边缘详细信息 */
  frameRet: FrameEdgeInfo[];
}

/**
 * 框架边缘信息
 */
export interface FrameEdgeInfo {
  /** 原始边缘索引 */
  oriIdx: number;
  /** 排序后的索引 */
  idx: number;
  /** 边缘斜率（保留 1 位小数） */
  slope: number;
}

/**
 * 窗扇位置详情
 */
export interface SashPositionDetail {
  /** 关联的框架边缘索引 */
  idx: number;
}

/**
 * 窗扇信息
 */
export interface SashInfo {
  /** 位置标识（JSON 字符串） */
  pos: string;
  /** 窗扇类型 */
  type: string;
  /** 多边形标识 */
  poly: PolygonIdentityResult;
  /** 中梃标识（JSON 字符串） */
  mullion: string;
}

/**
 * 中梃标识信息
 */
export interface MullionIdentityInfo {
  /** 起始端类型标识 */
  st: PolyId;
  /** 终止端类型标识 */
  et: PolyId;
  /** 斜率（保留 1 位小数） */
  slope: number;
  /** 关联的线段 */
  seg: Segment;
  /** 原始斜率 */
  oriSlope: number;
  /** 原始多边形标识 */
  oriPolyId: PolyId;
  /** 边缘索引 */
  idx: number;
}

/**
 * 中梃序列化信息
 */
export interface MullionSerializedInfo {
  /** 起始端类型标识 */
  st: PolyId;
  /** 终止端类型标识 */
  et: PolyId;
  /** 斜率字符串（保留 1 位小数） */
  slope: string;
}

/**
 * 尺寸标注信息
 */
export interface DimensionInfo {
  /** 标注名称 */
  name: string;
  /** 边缘索引 */
  edgeIdx: number;
  /** 是否为框架尺寸 */
  frameDim: boolean;
  /** 中梃尺寸索引（仅非框架尺寸） */
  mulDimIdx?: number;
}

/**
 * 名称映射关系
 */
export interface NameMapping {
  /** 目标名称 */
  dstName: string;
  /** 源名称 */
  srcName: string;
}

/**
 * 尺寸信息匹配结果
 */
export interface DimensionMatchResult {
  /** 框架名称映射 */
  frame: NameMapping[];
  /** 中梃名称映射 */
  mullion: NameMapping[];
}

/**
 * 框架完整标识
 */
export interface FrameIdentityData {
  /** 多边形标识 */
  poly: PolygonIdentityResult;
  /** 中梃标识（JSON 字符串） */
  mul: string;
  /** 窗扇标识（JSON 字符串） */
  sash: string;
}

/**
 * 条形结构（中梃或框架）
 */
export interface Bar {
  /** 多边形边缘标识 */
  polyId: PolyId;
  /** 条形多边形 */
  polygon: {
    /** 分割线 */
    spLine: {
      /** 线对象 */
      line: Line;
    };
  };
}

/**
 * 边缘连接查找结果
 */
export interface EdgeConnectionResult {
  /** 关联的条形结构 */
  bar?: Bar;
}

/**
 * 形状对象
 */
export interface Shape {
  /** 多边形 */
  polygon: Polygon;
  /** 中梃管理器 */
  mulManager: MullionManager;
  /** 窗扇管理器 */
  sashManager: SashManager;
  /** 框架管理器 */
  frameManager: FrameManager;
}

/**
 * 窗扇对象
 */
export interface Sash {
  /** 窗扇类型 */
  type: string;
  /** 窗扇多边形 */
  polygon: Polygon;
  /** 中梃管理器 */
  mulManager: MullionManager;
}

/**
 * 框架标识类
 * 负责提取和匹配窗框系统的几何特征标识
 */
export declare class FrameIdentity {
  /** 形状管理器 */
  private readonly shapeManager: ShapeManager;

  /**
   * 构造函数
   * @param shapeManager - 形状管理器实例
   */
  constructor(shapeManager: ShapeManager);

  /**
   * 获取完整的框架标识信息
   * @returns 返回哈希值、JSON 字符串和结构化数据的三元组，失败返回 undefined
   */
  getFrameIdentity(): [string, string, FrameIdentityData[]] | undefined;

  /**
   * 获取多边形的几何标识
   * @param polygon - 目标多边形
   * @returns 包含斜率序列和边缘信息的标识对象
   */
  getPolygonIdentity(polygon: Polygon): PolygonIdentityResult;

  /**
   * 获取窗扇标识信息
   * @param shape - 形状对象
   * @param frameEdges - 框架边缘信息数组
   * @param sashManager - 窗扇管理器
   * @param mullionIdentities - 中梃标识数组
   * @returns JSON 序列化的窗扇信息数组
   */
  getSashIdentity(
    shape: Shape,
    frameEdges: FrameEdgeInfo[],
    sashManager: SashManager,
    mullionIdentities: MullionIdentityInfo[]
  ): string;

  /**
   * 获取中梃标识信息
   * @param polygon - 目标多边形
   * @param mullionManager - 中梃管理器
   * @returns 返回 JSON 字符串和结构化数据的二元组
   */
  getMullionIdentity(
    polygon: Polygon,
    mullionManager: MullionManager
  ): [string, MullionIdentityInfo[]];

  /**
   * 递归辅助函数：处理多边形分割和标识提取
   * @param depth - 当前递归深度
   * @param currentPolygon - 当前多边形
   * @param originalPolygon - 原始多边形
   * @param bars - 条形结构数组
   * @param edgeMap - 边缘映射表
   * @param accumulated - 累积的标识信息
   * @returns 中梃标识信息数组
   */
  private getIdentityHelper(
    depth: number,
    currentPolygon: Polygon,
    originalPolygon: Polygon,
    bars: Bar[],
    edgeMap: Map<number, PolyId>,
    accumulated?: MullionIdentityInfo[]
  ): MullionIdentityInfo[];

  /**
   * 查找边缘对应的线段和关键点
   * @param polyId - 多边形边缘标识
   * @param dockDataMap - 对接数据映射表
   * @param line - 目标线对象
   * @returns 边缘查找结果，失败返回 undefined
   */
  private findEdge(
    polyId: PolyId,
    dockDataMap: Map<string, EdgePoint[]>,
    line: Line
  ): EdgeFindResult | undefined;

  /**
   * 查找第一个可用的分割线
   * @param depth - 递归深度
   * @param polygon - 目标多边形
   * @param bars - 条形结构数组
   * @param edgeMap - 边缘映射表
   * @returns 中梃标识信息，失败返回 undefined
   */
  private findFirstSpLine(
    depth: number,
    polygon: Polygon,
    bars: Bar[],
    edgeMap: Map<number, PolyId>
  ): MullionIdentityInfo | undefined;

  /**
   * 获取分割后多边形的边缘映射
   * @param partitionedPolygon - 分割后的多边形
   * @param originalPolygon - 原始多边形
   * @param existingIdentities - 已存在的标识信息
   * @returns 边缘映射表，失败返回 undefined
   */
  private getEdgeMap(
    partitionedPolygon: Polygon,
    originalPolygon: Polygon,
    existingIdentities: MullionIdentityInfo[]
  ): Map<number, PolyId> | undefined;

  /**
   * 获取尺寸信息匹配结果
   * @param sourcePolygon - 源多边形
   * @param sourceDimensions - 源尺寸标注数组
   * @param targetPolygon - 目标多边形
   * @param targetDimensions - 目标尺寸标注数组
   * @returns 尺寸匹配结果，失败返回 undefined
   */
  getDimInfoMatch(
    sourcePolygon: Polygon,
    sourceDimensions: DimensionInfo[],
    targetPolygon: Polygon,
    targetDimensions: DimensionInfo[]
  ): DimensionMatchResult | undefined;

  /**
   * 获取框架尺寸名称映射
   * @param sourceStartIdx - 源起始边缘索引
   * @param sourceDimensions - 源尺寸标注数组
   * @param targetStartIdx - 目标起始边缘索引
   * @param targetDimensions - 目标尺寸标注数组
   * @returns 名称映射数组，失败返回 undefined
   */
  private getFrameNameMap(
    sourceStartIdx: number,
    sourceDimensions: DimensionInfo[],
    targetStartIdx: number,
    targetDimensions: DimensionInfo[]
  ): NameMapping[] | undefined;

  /**
   * 获取中梃尺寸名称映射
   * @param sourceStartIdx - 源起始边缘索引
   * @param sourceDimensions - 源尺寸标注数组
   * @param targetStartIdx - 目标起始边缘索引
   * @param targetDimensions - 目标尺寸标注数组
   * @returns 名称映射数组，失败返回 undefined
   */
  private getMullionNameMap(
    sourceStartIdx: number,
    sourceDimensions: DimensionInfo[],
    targetStartIdx: number,
    targetDimensions: DimensionInfo[]
  ): NameMapping[] | undefined;

  /**
   * 从左上角开始按顺时针排列边缘
   * @param edges - 边缘数组
   * @returns 排序后的边缘数组
   */
  private getEdgesFromUpLeft(edges: Segment[]): Segment[];
}