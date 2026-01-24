import type { Loop, Line2d, Box2, Curve } from './geometry';
import type { Extractor } from './Extractor';
import type { Floor } from './Floor';
import type { Opening } from './Opening';

/**
 * 归一化类型
 * - "centroid": 质心归一化
 * - "none": 不进行归一化
 */
export type NormalizeType = "centroid" | "none";

/**
 * 多边形结构
 */
export interface Polygon {
  /** 外环曲线数组 */
  outer: Line2d[];
  /** 内环（孔洞）曲线数组 */
  holes: Line2d[][];
}

/**
 * 内容信息
 */
export interface ContentInfo {
  /** 内容唯一标识 */
  id: string;
  /** 查找标识 */
  seekId: string;
  /** 类别ID数组 */
  categoryIds: string[];
  /** 内容类型 */
  contentType: string;
  /** 样式（可选） */
  style?: string;
  /** 中心点WKT格式 */
  centerWKT: string;
  /** 2D包围盒WKT格式 */
  box2WKT: string;
  /** Z轴旋转角度（度） */
  zRotationInDegree: number;
}

/**
 * 开口信息
 */
export interface OpeningInfo {
  /** 开口类型: "door" | "window" | "feature" */
  openingType: string;
  /** 底部轮廓几何集合WKT */
  bottomProfileGeomCollectionWKT: string;
  /** 中心点几何集合WKT */
  centerPtsGeomCollectionWKT: string;
  /** 中心点多点WKT */
  centerPtsMultiPointWKT: string;
  /** 宿主曲线索引字符串 */
  hostCurveIndexStr: string;
  /** 数量 */
  count: number;
  /** 归一化类型 */
  normalizedType: string;
  /** 宿主信息列表 */
  hostInfos: HostInfo[];
}

/**
 * 宿主信息
 */
export interface HostInfo {
  /** 类型 */
  type?: string;
  /** 特征（可选） */
  feature?: any;
  /** 开口类型 */
  openingType?: string;
  /** 开口地板重叠曲线（可选） */
  openingFloorOverlapCurve?: Curve;
}

/**
 * 分组信息
 */
export interface GroupInfo {
  // 根据实际需求定义分组信息结构
  [key: string]: any;
}

/**
 * 多边形切割掩码
 */
export interface PolygonCutMask {
  /** 循环轮廓 */
  loop: Loop;
  /** SVG样式 */
  style: {
    /** 填充色 */
    fill: string;
    /** 不透明度（可选） */
    opacity?: number;
    /** 填充不透明度（可选） */
    "fill-opacity"?: number;
    /** 描边虚线数组（可选） */
    "stroke-dasharray"?: number;
    /** 描边宽度（可选） */
    "stroke-width"?: number;
    /** 描边颜色（可选） */
    stroke?: string;
  };
}

/**
 * 多边形转储结构
 */
export interface PolygonDump {
  /** 外环曲线转储数组 */
  outer: any[];
  /** 内环曲线转储数组 */
  holes: any[][];
}

/**
 * 房间提取结果
 */
export interface RoomExtractResult {
  /** 外环曲线数量 */
  numOfOuterCurves: number;
  /** 内容凹包多边形WKT格式 */
  contentsConcaveHullPolygonWKT: string;
  /** 地板多边形WKT格式 */
  floorPolygonWKT: string;
  /** 内容包围盒多多边形WKT格式 */
  contentBoxesMultiPolygonWKT: string;
  /** 开口信息 */
  openings: OpeningInfo;
  /** 内容信息数组 */
  contents: ContentInfo[];
  /** 分组信息数组 */
  groups: GroupInfo[];
  /** 切割多边形掩码数组 */
  cutPolygons: PolygonCutMask[];
  /** 区域多边形掩码数组 */
  regionPolygons: PolygonCutMask[];
  /** 世界原始路径2D转储 */
  worldRawPath2dDump: PolygonDump;
  /** 是否包含DIY内容 */
  hasDIY: boolean;
  /** 是否包含参数化模型 */
  hasPM: boolean;
  /** 玻璃幕墙索引 */
  glazedFacadeIndex: number;
  /** 平移向量WKT格式 */
  translateWKT: string;
}

/**
 * 房间提取器选项
 */
export interface RoomExtractorOptions {
  /** 是否生成内容凹包多边形WKT */
  contentsConcaveHullPolygonWKT?: boolean;
  /** 是否生成内容包围盒多多边形WKT */
  contentBoxesMultiPolygonWKT?: boolean;
  /** 是否生成地板多边形WKT */
  floorPolygonWKT?: boolean;
}

/**
 * 分组提取信息
 */
export interface GroupExtractInfo {
  // 根据实际需求定义分组提取信息结构
  [key: string]: any;
}

/**
 * 房间提取器
 * 负责从楼层数据中提取房间信息，支持多种提取策略：
 * - 基于骨架的提取
 * - 基于多骨架的提取
 * - 基于空间划分的提取
 * - 基于多房间的提取
 */
export declare class RoomExtractor extends Extractor {
  /** 分组提取信息列表 */
  groupExtractInfos: GroupExtractInfo[];
  
  /** 剩余地板外环曲线 */
  remainFloorOuterCurves: Curve[];
  
  /** 提取器选项 */
  options: RoomExtractorOptions;
  
  /** 内容提取器 */
  contentsExtractor: any;
  
  /** 开口提取器 */
  openingsExtractor: any;

  /**
   * 构造函数
   * @param floor - 楼层对象
   * @param options - 提取器选项
   * @param normalizeType - 归一化类型，默认为"centroid"
   */
  constructor(floor: Floor, options: RoomExtractorOptions, normalizeType?: NormalizeType);

  /**
   * 更新分组提取信息
   * @param groupExtractInfos - 分组提取信息数组
   * @returns 返回当前实例以支持链式调用
   */
  updateGroupExtractInfos(groupExtractInfos: GroupExtractInfo[]): this;

  /**
   * 根据内容信息获取分组信息
   * @param contentInfos - 内容信息对象
   * @returns 分组信息数组
   */
  _getGroupInfosByContentInfos(contentInfos: any): GroupInfo[];

  /**
   * 提取分组信息
   * @returns 分组信息数组
   */
  extractGroupInfos(): GroupInfo[];

  /**
   * 提取多个房间
   * 使用地板切割器将楼层划分为多个房间
   * @returns 房间提取结果数组
   */
  extractRoomMany(): RoomExtractResult[];

  /**
   * 基于骨架提取房间
   * 使用楼层骨架算法进行房间提取
   * @returns 房间提取结果数组
   */
  extractRoomBySkeleton(): RoomExtractResult[];

  /**
   * 基于空间划分提取房间
   * 通过区域划分算法提取房间
   * @returns 房间提取结果数组
   */
  extractRoomByDivideSpace(): RoomExtractResult[];

  /**
   * 基于多骨架提取房间
   * 使用多次骨架迭代进行房间提取
   * @returns 房间提取结果数组
   */
  extractRoomByMultiSkeleton(): RoomExtractResult[];

  /**
   * 提取房间（默认方法）
   * 使用默认策略提取房间
   * @returns 房间提取结果数组
   */
  extractRoom(): RoomExtractResult[];

  /**
   * 提取多边形切割信息
   * @param polygon - 多边形对象
   * @param openings - 开口信息
   * @param contentBoxes - 内容包围盒数组
   * @returns 包含多边形切割和特征的对象
   */
  extractPolygonCuts(
    polygon: Polygon,
    openings: OpeningInfo,
    contentBoxes: Box2[]
  ): {
    polygonCuts: PolygonCutMask[];
    features: any[];
    featureHostInfos: HostInfo[];
  };

  /**
   * 提取区域多边形
   * @param polygon - 多边形对象
   * @param openings - 开口信息
   * @param contentBoxes - 内容包围盒数组
   * @returns 包含多边形切割的对象
   */
  extractRegionPolygons(
    polygon: Polygon,
    openings: OpeningInfo,
    contentBoxes: Box2[]
  ): {
    polygonCuts: PolygonCutMask[];
  };

  /**
   * 获取地板SVG路径
   * @returns SVG路径字符串
   */
  getFloorSVGPath(): string;

  /**
   * 获取内容包围盒SVG路径
   * @returns SVG路径字符串
   */
  getContentBoxesSVGPath(): string;

  /**
   * 获取内容包围盒凸包SVG路径
   * @returns SVG路径字符串
   */
  getContentBoxHullSVGPath(): string;

  /**
   * 转储多边形数据
   * @param polygon - 多边形对象
   * @returns 多边形转储对象
   */
  _dumpPolygon(polygon: Polygon): PolygonDump;

  /**
   * 判断房间是否包含DIY内容
   * @param curves - 曲线数组
   * @returns 是否包含DIY
   */
  _isRoomHasDIY(curves: Curve[]): boolean;

  /**
   * 合并特征宿主信息组
   * @param group1 - 第一组宿主信息
   * @param group2 - 第二组宿主信息
   * @returns 合并后的开口信息
   */
  _mergeFeatureHostInfoGroup(
    group1?: { hostInfos?: HostInfo[] },
    group2?: { hostInfos?: HostInfo[] }
  ): OpeningInfo;

  /**
   * 获取可合并的特征
   * @param curveInfos - 曲线信息数组
   * @param featureHostInfos - 特征宿主信息数组
   * @param doorHostInfos - 门宿主信息数组
   * @returns 可合并特征数组
   */
  getMergeableFeatures(
    curveInfos: any[],
    featureHostInfos: any[],
    doorHostInfos: HostInfo[]
  ): any[];

  /**
   * 合并外环与特征
   * @param outerCurves - 外环曲线数组
   * @param features - 特征数组
   * @returns 合并后的曲线数组
   */
  mergeOuterWithFeatures(outerCurves: Curve[], features: any[]): Curve[];

  /**
   * 获取玻璃幕墙索引
   * 通过分析门窗开口的位置和类型确定玻璃幕墙所在的墙面索引
   * @param floor - 楼层对象
   * @returns 玻璃幕墙所在墙面的索引
   */
  getGlazedFacadeIndex(floor: Floor): number;
}