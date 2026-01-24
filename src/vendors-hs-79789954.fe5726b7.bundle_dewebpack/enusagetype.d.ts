/**
 * 装饰工具模块
 * 提供房间装饰、材质匹配、开口处理等功能
 */

import type { HSCore } from 'HSCore';
import type { HSCatalog } from 'HSCatalog';
import type { EntityType } from './EntityType';
import type { Line2d, Vector2 } from './Geometry';
import type { FakeContent } from './FakeContent';

/**
 * 使用类型枚举
 */
export enum EnUsageType {
  /** 材质类型 */
  Material = 'Material',
  /** 开口类型 */
  Opening = 'Opening',
}

/**
 * 门类型枚举（内部使用）
 */
declare enum DoorType {
  /** 入户门 */
  Entry = 'entry',
  /** 推拉门 */
  Sliding = 'sliding',
  /** 卫生间门 */
  Bathroom = 'bathroom',
  /** 普通门 */
  Normal = 'normal',
}

/**
 * 材质JSON数据结构
 */
export interface MaterialJson {
  /** 材质ID */
  id?: string;
  /** 入口ID */
  entryId?: string;
  /** 混合涂料ID */
  mixpaint?: string;
  /** 子元素ID数组 */
  c?: string[];
  /** 父元素ID数组 */
  p?: string[];
  /** 产品ID列表 */
  products?: string[];
  /** 元素类型列表 */
  elementTypes?: Array<{ categories: string[]; contentType: string }>;
  /** 材质数据 */
  data?: MaterialJson[];
}

/**
 * 墙面材质信息
 */
export interface WallFaceMaterial {
  /** 材质JSON数据 */
  matJson: MaterialJson;
  /** 面积 */
  area: number;
  /** 元素类型列表 */
  elementTypes: Array<{ categories: string[]; contentType: string }>;
}

/**
 * 房间材质数据
 */
export interface RoomMaterialData {
  /** 房间类型 */
  roomType: string;
  /** 地面材质 */
  floor?: MaterialJson;
  /** 天花板材质 */
  ceiling?: MaterialJson;
  /** 墙面材质列表 */
  wallFaces?: WallFaceMaterial[];
  /** 材质列表（通用） */
  materials?: MaterialJson[];
  /** 开口数据 */
  openings?: {
    door?: Record<string, OpeningInfo[]>;
    window?: Record<string, OpeningInfo[]>;
  };
}

/**
 * 开口信息
 */
export interface OpeningInfo {
  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
  /** Z方向尺寸 */
  ZSize: number;
  /** 拱形高度 */
  archHeight?: number;
  /** 序列化数据 */
  dump?: Array<{ seekId?: string }>;
}

/**
 * 匹配结果
 */
export interface MatchResult<T> {
  /** 目标对象 */
  target: T;
  /** 匹配的开口信息 */
  info: OpeningInfo;
}

/**
 * 面材质配置
 */
export interface FaceMaterialConfig {
  /** 面对象数组 */
  faces: HSCore.Model.Face[];
  /** 材质对象 */
  material: HSCore.Material.Material;
  /** 原始信息 */
  info?: WallFaceMaterial;
  /** 是否为主材质 */
  isMain?: boolean;
}

/**
 * 类型权重配置
 */
interface TypeWeightConfig {
  /** 实体类型列表 */
  types: EntityType[];
  /** 权重值 */
  weight: number;
}

/**
 * 门数据统计
 */
interface DoorDataStatistics {
  /** 主入户门 */
  mainEntryDoor?: OpeningInfo;
  /** 主推拉门 */
  mainSlidingDoor?: OpeningInfo;
  /** 主平开门 */
  mainSwingDoor?: OpeningInfo;
  /** 主卫生间推拉门 */
  mainBathroomSlidingDoor?: OpeningInfo;
  /** 主卫生间其他门 */
  mainBathroomOtherDoor?: OpeningInfo;
}

/**
 * 楼层匹配数据结果
 */
export interface FloorMatchResult {
  /** 原始材质数据 */
  origin: RoomMaterialData;
  /** 是否使用主材质 */
  useMainMaterial: boolean;
}

/**
 * 产品元数据映射
 */
type ProductMetaMap = Record<string, HSCatalog.ProductMeta>;

/**
 * 踢脚线/线脚元数据
 */
export interface MoldingMeta {
  /** 材质产品 */
  material: HSCatalog.ProductMeta;
  /** 轮廓产品 */
  profile: HSCatalog.ProductMeta;
}

/**
 * 装饰工具类
 * 提供房间装饰相关的各种工具方法
 */
export declare class DecorationUtil {
  /**
   * 根据楼层获取天花板
   * @param floor - 楼层对象
   * @returns 天花板对象或undefined
   */
  static getCeilingByFloor(
    floor: HSCore.Model.Floor
  ): HSCore.Model.Ceiling | undefined;

  /**
   * 获取楼层的结构面
   * @param floor - 楼层对象
   * @returns 结构面数组
   */
  static getStructureFaces(floor: HSCore.Model.Floor): HSCore.Model.Face[];

  /**
   * 修正材质JSON中的ID
   * 将原有ID替换为新生成的ID
   * @param materialData - 材质数据对象
   */
  static fixMatJsonIds(materialData: {
    entryId: string;
    data: MaterialJson[];
  }): void;

  /**
   * 匹配墙面材质
   * @param floor - 楼层对象
   * @param entities - 实体数组
   * @param materialData - 房间材质数据
   * @param productMetas - 产品元数据映射
   * @param useSimpleMatch - 是否使用简单匹配（默认false）
   * @returns 面材质配置数组
   */
  static matchWallFaceMaterials(
    floor: HSCore.Model.Floor,
    entities: HSCore.Model.Entity[],
    materialData: RoomMaterialData,
    productMetas: ProductMetaMap,
    useSimpleMatch?: boolean
  ): FaceMaterialConfig[];

  /**
   * 获取匹配的开口
   * @param target - 目标开口对象（洞口/门/窗）
   * @param candidates - 候选开口信息数组
   * @returns 最匹配的开口信息或undefined
   */
  static getMatchedOpening(
    target: HSCore.Model.Hole | HSCore.Model.Door | HSCore.Model.Window,
    candidates?: OpeningInfo[]
  ): OpeningInfo | undefined;

  /**
   * 获取所有匹配的开口
   * @param dumps - 序列化数据
   * @param openingDataMap - 开口数据映射表
   * @returns 匹配结果数组
   */
  static getMatchedOpenings(
    dumps: unknown,
    openingDataMap: Record<string, Record<string, OpeningInfo[]>>
  ): MatchResult<HSCore.Model.Opening>[];

  /**
   * 获取所有开口
   * @param dumps - 序列化数据
   * @returns 开口对象数组
   */
  static getAllOpenings(dumps: unknown): HSCore.Model.Opening[];

  /**
   * 获取匹配的楼层数据
   * @param floor - 目标楼层
   * @param materialDataList - 材质数据列表
   * @param usageType - 使用类型（默认Material）
   * @param useDefault - 是否使用默认值（默认true）
   * @param brand - 品牌标识（默认空字符串）
   * @returns 匹配结果或undefined
   */
  static getMatchFloorData(
    floor: HSCore.Model.Floor,
    materialDataList: RoomMaterialData[],
    usageType?: EnUsageType,
    useDefault?: boolean,
    brand?: string
  ): FloorMatchResult | undefined;

  /**
   * 从原始数据中获取主门数据
   * @param origins - 房间材质数据数组
   * @returns 门数据统计结果
   */
  static getMainDoorDataFromOrigins(
    origins: RoomMaterialData[]
  ): DoorDataStatistics;

  /**
   * 获取匹配的门
   * @param floorInfo - 楼层信息对象
   * @param doorData - 门数据统计
   * @returns 门匹配结果数组
   */
  static getMatchDoors(
    floorInfo: { roomType: string; structureFaces: HSCore.Model.Face[] },
    doorData: DoorDataStatistics
  ): MatchResult<HSCore.Model.Door>[];

  /**
   * 获取默认线脚元数据
   * @returns Promise返回线脚元数据
   */
  static getDefaultCorniceMeta(): Promise<MoldingMeta>;

  /**
   * 获取默认踢脚线元数据
   * @returns Promise返回踢脚线元数据
   */
  static getDefaultBaseboardMeta(): Promise<MoldingMeta>;

  /**
   * 检查房间类型是否适合替换线脚
   * @param roomType - 房间类型
   * @returns 是否有效
   */
  static isValidReplaceMoldingRoomType(roomType: string): boolean;

  /**
   * 获取默认窗帘假内容
   * @returns Promise返回假内容数组
   */
  static getDefaultCurtainFakeContents(): Promise<FakeContent[]>;

  /**
   * 获取开口的边界点
   * @param opening - 开口对象
   * @returns 边界点数组
   */
  static getOpeningBoundPts(
    opening: HSCore.Model.Opening
  ): HSCore.Util.Math.Vector3[];

  /**
   * 根据目标楼层获取线脚高度
   * @param floor - 楼层对象
   * @returns 线脚高度（单位：毫米）
   */
  static getCorniceHeightByTargetFloor(floor: HSCore.Model.Floor): number;

  /**
   * 根据目标楼层获取踢脚线高度
   * @param floor - 楼层对象
   * @returns 踢脚线高度（单位：毫米）
   */
  static getBaseboardHeightByTargetFloor(floor: HSCore.Model.Floor): number;
}