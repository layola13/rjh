/**
 * 设计信息提取器 - 从BOM数据中提取和分析设计信息
 */

import type { HSApp, HSCore, HSCatalog } from './core-types';

/**
 * 房间内容信息
 */
interface ContentInRoom {
  /** 实体ID */
  entityId: string;
  /** Seek ID */
  seekId: string;
  /** 内容类型字符串 */
  contentType: string;
  /** 分类ID */
  categoryId: number;
}

/**
 * 踢脚线或檐口信息
 */
interface MoldingItem {
  /** Seek ID */
  seekId: string;
  /** 材质信息 */
  material: {
    seekId: string;
  };
}

/**
 * 结构面装饰信息
 */
interface StructureFaceMoldingInfo {
  /** 面ID */
  faceId: string;
  /** 檐口装饰列表 */
  cornice?: MoldingItem[];
  /** 踢脚线装饰列表 */
  baseboard?: MoldingItem[];
}

/**
 * 开口类型信息（门窗等）
 */
interface OpeningCategoryInfo {
  /** 分类ID */
  categoryId: number;
}

/**
 * 墙体信息
 */
interface WallInfo {
  /** 曲线类型，'ac2' 表示弧形墙 */
  curveType: string;
}

/**
 * 结构信息
 */
interface StructureInfo {
  /** 结构名称 */
  name: string;
}

/**
 * 家具信息
 */
interface FurnitureInfo {
  /** 材质映射表 */
  materials: Record<string, unknown>;
}

/**
 * 房间信息（详细）
 */
interface RoomInfoDetailed {
  /** 房间ID */
  id: string;
  /** 房间类型编号 */
  type: number;
  /** 房间名称 */
  name: string;
  /** 面积（平方米） */
  area: number;
  /** 装饰信息 */
  molding_info: StructureFaceMoldingInfo[];
  /** 开口分类信息（门窗等） */
  opening_category_info: OpeningCategoryInfo[];
  /** 墙体信息 */
  wall_info: WallInfo[];
  /** 结构信息 */
  struct_info: StructureInfo[];
  /** 家具信息 */
  furniture_info: FurnitureInfo[];
  /** 吊顶类型：'none' | 'model' | 'customized' */
  ceilingType: string;
  /** 背景墙类型：'none' | 'model' | 'customized' */
  backgroundWallType: string;
  /** 是否有地台 */
  hasPlatform: boolean;
  /** 是否有DIY内容 */
  hasDIY: boolean;
  /** 是否有檐口 */
  hasCornice: boolean;
  /** 是否有踢脚线 */
  hasBaseBoard: boolean;
  /** 是否有定制模型 */
  hasCustomizedModel: boolean;
  /** 地板材质Seek ID */
  floorMaterialSeekId: string;
  /** 地板材质分类ID */
  floorMaterialCategoryId: number;
  /** 地板铺装类型 */
  floorPaveType: string;
  /** 墙面铺装类型 */
  wallPaveType: string;
  /** 墙面材质Seek ID */
  wallMaterialSeekId: string;
  /** 墙面材质分类ID */
  wallMaterialCategoryId: number;
  /** 房间内的内容列表 */
  contents_in_room: ContentInRoom[];
  /** 推断的房间类型 */
  estimatedRoomType: string;
}

/**
 * 梁信息
 */
interface BeamInfo {
  /** 类型 */
  type: 'beam';
  /** 梁ID */
  id: string;
  /** 名称 */
  name: string;
}

/**
 * 室外区域地板信息
 */
interface OutdoorFloorInfo {
  /** 类型 */
  type: 'outdoorFloor';
  /** 地板ID */
  id: string;
}

/**
 * 楼层信息
 */
interface LayerInfo {
  /** 楼层索引 */
  layerIndex: number;
  /** 海拔高度 */
  altitude: number;
  /** 楼层高度 */
  height: number;
  /** 总建筑面积 */
  grossFloorArea: number;
  /** 内部面积 */
  innerArea: number;
  /** 房间ID列表 */
  roomIds: string[];
  /** 内容数量 */
  contentCount: number;
}

/**
 * 设计信息（从BOM提取）
 */
interface DesignInfo {
  /** 房间列表 */
  room: RoomInfoDetailed[];
  /** 总建筑面积 */
  grossFloorArea: number;
  /** 内部面积 */
  innerArea: number;
  /** 梁信息 */
  beamInfo: BeamInfo[];
  /** 室外地板信息 */
  outdoorFloorInfo: OutdoorFloorInfo[];
  /** 楼层信息列表 */
  layers: LayerInfo[];
}

/**
 * 房间元数据（简化）
 */
interface RoomMeta {
  /** 房间ID */
  id: string;
  /** 房间类型编号 */
  type: number;
  /** 房间名称 */
  name: string;
  /** 面积 */
  area: number;
  /** 楼层索引 */
  layerIndex: number;
  /** 是否使用默认地板材质 */
  isDefaultFloorMaterial: boolean;
  /** 地板铺装类型 */
  floorPaveType: string;
  /** 地板材质Seek ID */
  floorMaterialSeekId: string;
  /** 地板材质分类ID */
  floorMaterialCategoryId: number;
  /** 是否使用默认墙面材质 */
  isDefaultWallMaterial: boolean;
  /** 墙面材质分类ID */
  wallMaterialCategoryId: number;
  /** 墙面材质Seek ID */
  wallMaterialSeekId: string;
  /** 墙面铺装类型 */
  wallPaveType: string;
  /** 内容数量 */
  contentCount: number;
  /** 是否有家电 */
  hasAppliance: boolean;
  /** 是否有厨房家电 */
  hasKitchenAppliance: boolean;
  /** 是否有浴室内容 */
  hasBathContent: boolean;
  /** 大型内容类型（如"床, 沙发, 柜架几"） */
  largeContentTypes: string;
  /** 房间内的内容列表 */
  contentsInRoom: ContentInRoom[];
  /** 推断的房间类型 */
  estimatedRoomType: string;
}

/**
 * 设计元数据（汇总）
 */
interface DesignMeta {
  /** 总面积 */
  area: number;
  /** 房间数量 */
  roomCount: number;
  /** 房间元数据列表 */
  rooms: RoomMeta[];
  /** 吊顶类型：'none' | 'model' | 'customized' */
  ceilingType: string;
  /** 背景墙类型：'none' | 'model' | 'customized' */
  backGroundWallType: string;
  /** 是否有地台 */
  hasPlatform: boolean;
  /** 是否有DIY */
  hasDiy: boolean;
  /** 是否有檐口 */
  hasCornice: boolean;
  /** 是否有踢脚线 */
  hasBaseboard: boolean;
  /** 窗户类型列表 */
  windowTypes: string[];
  /** 门类型列表 */
  doorTypes: string[];
  /** 结构类型列表 */
  structureTypes: string[];
  /** 是否有弧形墙 */
  hasArcWall: boolean;
  /** 是否有多层 */
  hasMultilayer: boolean;
  /** 是否有楼梯 */
  hasStairs: boolean;
  /** 是否有定制模型 */
  hasCustomizeModel: boolean;
  /** 楼层信息列表 */
  layers: LayerInfo[];
  /** 内容总数 */
  contentCount: number;
  /** 内容材质替换数量 */
  contentMaterialReplacementsCount: number;
  /** 配饰数量 */
  accessoryCount: number;
  /** 大型内容类型列表 */
  largeContentTypes: string[];
  /** 是否有浴室内容 */
  hasBathContent: boolean;
  /** 是否有厨房家电 */
  hasKitchenAppliance: boolean;
  /** 是否有吊灯 */
  hasChandelier: boolean;
  /** 是否有吸顶灯 */
  hasCeilingLight: boolean;
  /** 是否有射灯 */
  hasSpotlight: boolean;
  /** 是否有家电 */
  hasAppliance: boolean;
  /** 是否有厨房岛台 */
  hasKitchenIsland: boolean;
  /** 是否有阳台 */
  hasBalcony: boolean;
  /** 是否使用智能灯光模板 */
  isIntelligentLightTemplate: boolean;
  /** 智能灯光模板名称 */
  intelligentLightTemplateName: string;
  /** 是否使用手动灯光模板 */
  isManualLightTemplate: boolean;
  /** 手动灯光基础模板名称列表 */
  manualLightBasedTemplateName: string[];
  /** 手动灯光模板数量 */
  manualLightTemplateCount: number;
  /** 是否有物理灯光 */
  hasPhysicalLights: boolean;
  /** 是否修改了IES */
  hasChangedIES: boolean;
  /** 外景名称 */
  outersceneName: string;
}

/**
 * 提取结果
 */
interface ExtractionResult {
  /** 设计元数据 */
  designMeta: DesignMeta;
  /** 设计详细信息 */
  designInfo: DesignInfo;
}

/**
 * 设计信息提取器
 * 从BOM（材料清单）中提取户型设计的各种信息，包括房间、材质、家具、结构等
 */
export declare class DesignInfoExtractor {
  /** 户型图实例 */
  private readonly _floorplan: HSApp.Floorplan;
  
  /** 应用实例 */
  private readonly _app: HSApp.App;
  
  /** 设计详细信息 */
  designInfo?: DesignInfo;
  
  /** 根图层 */
  layer: HSCore.Model.Layer;

  constructor();

  /**
   * 从BOM中提取设计信息
   * @returns 包含房间、面积、结构等详细设计信息
   */
  extractFromBom(): Promise<DesignInfo>;

  /**
   * 从BOM中提取元数据（汇总信息）
   * @returns 包含设计元数据和详细信息
   */
  extractMetaFromBom(): Promise<ExtractionResult>;

  /**
   * 获取楼层信息列表
   * @returns 所有楼层的信息数组
   */
  private _getLayersInfo(): LayerInfo[];

  /**
   * 获取房间的装饰信息（檐口、踢脚线）
   * @param room - 房间实体
   * @returns 结构面装饰信息数组
   */
  private _getMoldingInfo(room: HSCore.Model.Room): StructureFaceMoldingInfo[];

  /**
   * 获取楼层的所有内容
   * @param layer - 楼层实体
   * @returns 内容实体数组
   */
  private _getAllContentsOfLayer(layer: HSCore.Model.Layer): HSCore.Model.Content[];

  /**
   * 获取房间内的内容列表
   * @param room - 房间实体
   * @returns 房间内容信息数组
   */
  private _getContentsInRoom(room: HSCore.Model.Room): ContentInRoom[];

  /**
   * 获取梁信息
   * @returns 梁信息数组
   */
  private _getBeamInfo(): BeamInfo[];

  /**
   * 获取室外区域信息
   * @returns 室外地板信息数组
   */
  private _getOutdoorAreaInfo(): OutdoorFloorInfo[];

  /**
   * 根据房间内容推断房间类型
   * @param contents - 房间内容列表
   * @returns 推断的房间类型字符串
   */
  static determineRoomType(contents: ContentInRoom[]): Promise<string>;
}