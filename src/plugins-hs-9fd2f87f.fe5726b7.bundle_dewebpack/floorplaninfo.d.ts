/**
 * Module: FloorplanInfo
 * 楼层平面图信息管理模块，用于解析和比对楼层平面图的墙体、开口和结构信息
 */

import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';
import { DiffToolUtil } from './DiffToolUtil';
import { WallInfo } from './WallInfo';
import { WallOpeningInfo } from './WallOpeningInfo';
import { StructureInfo } from './StructureInfo';
import { DiffShareWallRegionInfo } from './DiffShareWallRegionInfo';
import { DiffCWNotTubeType } from './DiffCWNotTubeType';

/**
 * 楼层信息数据结构
 * 存储单个楼层的墙体、开口和结构信息
 */
declare class LayerInfo {
  /** 楼层索引 */
  layerIndex?: number;
  
  /** 墙体信息集合 */
  wallInfos: WallInfo[];
  
  /** 墙体开口信息集合 */
  wallOpeningInfos: WallOpeningInfo[];
  
  /** 结构信息集合 */
  structureInfos: StructureInfo[];
  
  constructor();
}

/**
 * 内容类型映射表类型
 * 用于按内容类型和组件类型分类存储内容实体
 */
type ContentTypeMap = Map<
  string | number, // 组件类型（如 CWStrongElecComp.Type）
  Map<
    string | number, // 内容类型（如 ContentTypeEnum.DistributionBox）
    HSCore.Model.Content[] // 内容实体数组
  >
>;

/**
 * 楼层平面图信息管理类
 * 负责解析楼层平面图数据，提供墙体、开口、结构的差异比对功能
 */
export declare class FloorplanInfo {
  /** 楼层平面图实体 */
  private readonly _floorplan: HSCore.Model.Floorplan;
  
  /** 所有楼层信息数组 */
  private readonly _layerInfoArr: LayerInfo[];
  
  /** 已修改的墙体开口信息 */
  private _modifiedWallOpenings: WallOpeningInfo[];
  
  /** 共享墙体区域差异信息映射表 (wallId -> DiffShareWallRegionInfo) */
  private readonly _diffShareWallRegion: Map<string, DiffShareWallRegionInfo>;
  
  /** 所有开口和参数化开口的实体数组 */
  private readonly _allOpeningAndParametricOpeningsArr: Array<
    HSCore.Model.Opening | HSCore.Model.ParametricOpening
  >;
  
  /** 各楼层的水电内容分类映射表 (layerId -> ContentTypeMap) */
  private readonly _cwContents: Map<string, ContentTypeMap>;

  /**
   * 构造函数
   * @param floorplan - 楼层平面图实体
   */
  constructor(floorplan: HSCore.Model.Floorplan);

  /**
   * 初始化方法
   * 遍历所有楼层，解析墙体、开口和结构信息
   */
  initialize(): void;

  /**
   * 解析楼层中的结构信息
   * @param layer - 楼层实体
   * @returns 结构信息数组
   */
  parseLayerStructures(layer: HSCore.Model.Layer): StructureInfo[];

  /**
   * 解析楼层中的开口信息
   * @param layer - 楼层实体
   * @returns 墙体开口信息数组
   */
  parseLayerOpenings(layer: HSCore.Model.Layer): WallOpeningInfo[];

  /**
   * 解析楼层中的墙体信息
   * @param layer - 楼层实体
   * @returns 墙体信息数组
   */
  parseLayer(layer: HSCore.Model.Layer): WallInfo[];

  /**
   * 获取指定楼层的墙体信息
   * @param layerIndex - 楼层索引
   * @returns 墙体信息数组，若未找到则返回空数组
   */
  getLayerWallInfos(layerIndex: number): WallInfo[];

  /**
   * 计算墙体差异
   * 比对两个楼层平面图的墙体信息，标记差异区域
   * @param otherFloorplanInfo - 待比对的楼层平面图信息
   * @param layerIndex - 楼层索引
   */
  computeWallDiff(otherFloorplanInfo: FloorplanInfo, layerIndex: number): void;

  /**
   * 计算结构差异
   * 比对两个楼层平面图的结构信息，标记新增/删除状态
   * @param otherFloorplanInfo - 待比对的楼层平面图信息
   * @param layerIndex - 楼层索引
   */
  computeStructureDiff(otherFloorplanInfo: FloorplanInfo, layerIndex: number): void;

  /**
   * 获取指定楼层的结构信息
   * @param layerIndex - 楼层索引
   * @returns 结构信息数组，若未找到则返回空数组
   */
  getLayerStructureInfos(layerIndex: number): StructureInfo[];

  /**
   * 根据ID获取墙体信息
   * @param wallId - 墙体ID
   * @returns 墙体信息对象，若未找到则返回undefined
   */
  getWallInfoById(wallId: string): WallInfo | undefined;

  /**
   * 根据ID获取开口路径
   * @param openingId - 开口ID
   * @returns 原始开口实体数组，若未找到则返回空数组
   */
  getOpeningPathById(openingId: string): Array<HSCore.Model.Opening | HSCore.Model.ParametricOpening>;

  /**
   * 添加共享墙体区域信息
   * @param wallInfo - 墙体信息
   * @param diffInfo - 差异信息（具体类型由业务定义）
   * @param regionType - 区域类型标识
   */
  addShareWallRegionInfo(wallInfo: WallInfo, diffInfo: unknown, regionType: unknown): void;

  /**
   * 判断墙体区域是否属于指定墙体
   * @param wallInfo - 墙体信息
   * @param wallId - 墙体ID
   * @returns 是否属于该墙体
   */
  isWallRegionBelong(wallInfo: WallInfo, wallId: string): boolean;

  /**
   * 判断两个墙体是否为相同的共享墙
   * 通过比对关联墙体ID列表判断
   * @param wallInfoA - 墙体信息A
   * @param wallInfoB - 墙体信息B
   * @returns 是否为相同共享墙
   */
  isSameShareWall(wallInfoA: WallInfo, wallInfoB: WallInfo): boolean;

  /**
   * 计算开口差异
   * 比对两个楼层平面图的开口信息，标记修改区域
   * @param otherFloorplanInfo - 待比对的楼层平面图信息
   * @param layerIndex - 楼层索引
   */
  computeOpeningDiff(otherFloorplanInfo: FloorplanInfo, layerIndex: number): void;

  /**
   * 获取指定楼层的墙体开口信息
   * @param layerIndex - 楼层索引
   * @returns 墙体开口信息数组，若未找到则返回空数组
   */
  getWallOpeningInfos(layerIndex: number): WallOpeningInfo[];

  /**
   * 判断开口所在墙体段是否已被修改
   * @param content - 内容实体（开口）
   * @returns 是否已修改
   */
  isHostWallSegmentModified(content: HSCore.Model.Content): boolean;

  /**
   * 获取所有已修改的开口信息
   * @returns 已修改的墙体开口信息数组
   */
  getModifiedOpeningInfos(): WallOpeningInfo[];

  /**
   * 根据属性查找匹配的内容实体
   * @param targetContent - 目标内容实体
   * @returns 匹配的内容实体，若未找到则返回undefined
   */
  findContentByProperties(targetContent: HSCore.Model.Content): HSCore.Model.Content | undefined;

  /**
   * 根据属性查找匹配的开口实体
   * @param targetOpening - 目标开口实体
   * @returns 匹配的开口实体，若未找到则返回undefined
   */
  findOpeningByProperties(
    targetOpening: HSCore.Model.Opening | HSCore.Model.ParametricOpening
  ): HSCore.Model.Opening | HSCore.Model.ParametricOpening | undefined;

  /**
   * 解析楼层中的水电内容
   * 按内容类型（配电箱、弱电箱、燃气表等）分类存储
   * @param layer - 楼层实体
   */
  private _parseCWDiffConents(layer: HSCore.Model.Layer): void;

  /**
   * 获取指定楼层的水电内容分类映射表
   * @param layer - 楼层实体
   * @returns 内容类型映射表，若未找到则返回undefined
   */
  getCWContents(layer: HSCore.Model.Layer): ContentTypeMap | undefined;
}