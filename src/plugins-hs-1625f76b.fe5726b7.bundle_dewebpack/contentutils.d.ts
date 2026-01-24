/**
 * ContentUtils - 内容管理工具类
 * 提供内容替换、材质管理、产品实例化等核心功能
 * @module ContentUtils
 */

import type { Vector3 } from '815362';
import type { HSCatalog, HSCore } from '635589';
import type { ContentTypeEnum } from '223720';

/**
 * 搜索结果数据结构
 */
export interface SearchResult {
  /** 房间ID，格式: designId_xxx */
  room_id?: string;
}

/**
 * 搜索上下文
 */
export interface SearchContext {
  /** 搜索结果列表 */
  searchResults: SearchResult[];
  /** 选中的布局索引 */
  selectedLayoutIndex: number;
}

/**
 * SeekId映射结果
 */
export interface SeekIdMaps {
  /** SeekId到内容ID的映射 */
  seekIdMap: Map<string, string>;
  /** SeekId到材质ID的映射 */
  seekIdMaterialMap: Map<string, string>;
}

/**
 * 添加内容信息
 */
export interface AddContentInfo {
  /** 唯一标识符 */
  seekId: string;
  /** 原始标签 */
  originTag?: string;
  /** 子内容列表 */
  children?: AddContentChildInfo[];
  /** 目标内容 */
  targetContent?: ContentTransform;
  /** 内容 */
  content?: ContentTransform;
}

/**
 * 子内容信息
 */
export interface AddContentChildInfo {
  /** 唯一标识符 */
  seekId: string;
  /** 原始标签 */
  originTag?: string;
  /** 目标内容 */
  targetContent?: ContentTransform;
  /** 内容 */
  content?: ContentTransform;
}

/**
 * 内容变换信息
 */
export interface ContentTransform {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** X轴缩放 */
  XScale?: number;
  /** Y轴缩放 */
  YScale?: number;
  /** Z轴缩放 */
  ZScale?: number;
  /** X尺寸 */
  XSize?: number;
  /** Y尺寸 */
  YSize?: number;
  /** Z尺寸 */
  ZSize?: number;
}

/**
 * 产品信息，包含基础属性和元数据
 */
export interface ProductInfo {
  /** 唯一标识符 */
  seekId: string;
  /** 原始标签 */
  originTag?: string;
  /** 基础变换信息 */
  base: ProductBase;
}

/**
 * 产品基础信息
 */
export interface ProductBase extends AddContentInfo {
  /** 位置向量 */
  position: Vector3;
  /** 旋转向量 */
  rotation: Vector3;
  /** 缩放信息 */
  scale: {
    XScale: number;
    YScale: number;
    ZScale: number;
  };
  /** 内容变换 */
  content?: ContentTransform;
}

/**
 * 扩展产品信息（包含元数据）
 */
export interface ExtendedProductInfo extends ProductBase {
  /** 产品元数据 */
  meta: unknown;
}

/**
 * 缩放类型配置
 */
export interface ScaleConfig {
  /**
   * 缩放类型
   * - "inherit": 继承原有缩放
   * - "no-scale": 不缩放（设置为1:1:1）
   * - "same-size": 保持相同尺寸（根据原始尺寸计算缩放比例）
   */
  scaleType: 'inherit' | 'no-scale' | 'same-size';
}

/**
 * 材质初始化瓦片尺寸
 */
export interface MaterialInitTileSize {
  /** X方向瓦片尺寸 */
  initTileSize_x: number;
  /** Y方向瓦片尺寸 */
  initTileSize_y: number;
}

/**
 * 对象边界信息
 */
export interface BoundingInfo {
  /** 对象名称 */
  obj_name: string;
  /** 最大顶点 */
  max_vertex: { x: number; y: number; z: number };
  /** 最小顶点 */
  min_vertex: { x: number; y: number; z: number };
}

/**
 * 对象体积信息
 */
export interface ObjectVolume {
  /** 对象名称 */
  name: string;
  /** 体积大小 */
  volume: number;
}

/**
 * 内容元数据扩展
 */
export interface ContentMetadataExtension {
  /** 对象信息 */
  objInfo?: {
    /** 边界信息列表 */
    bounding?: BoundingInfo[];
  };
}

/**
 * 内容元数据
 */
export interface ContentMetadata {
  /** 扩展信息 */
  extension?: ContentMetadataExtension;
}

/**
 * 带元数据的内容接口
 */
export interface ContentWithMetadata {
  /** 元数据 */
  metadata: ContentMetadata;
  /** 设置材质 */
  setMaterial(objectName: string, material: unknown): void;
}

/**
 * 材质映射数据
 */
export interface MaterialMapData {
  /** 唯一标识符 */
  seekId: string;
  /** 材质ID（可选） */
  id?: string;
  /** X方向瓦片尺寸 */
  initTileSize_x: number;
  /** Y方向瓦片尺寸 */
  initTileSize_y: number;
  /** 元数据 */
  metadata?: unknown;
}

/**
 * 内容与标签对
 */
export interface ContentTagPair {
  /** 内容实例 */
  content: unknown;
  /** 标签 */
  tag?: string;
}

/**
 * 内容管理工具类
 * 提供内容替换、材质管理、产品添加等功能
 */
export declare class ContentUtils {
  /**
   * 替换内容或材质
   * 根据SeekId批量替换产品，支持内容和材质的映射
   * 
   * @param contentList - 包含添加内容信息的列表
   * @param searchContext - 搜索上下文，包含设计ID和布局信息
   * @returns Promise，返回SeekId映射结果
   */
  static replaceContentsOrMaterial(
    contentList: Array<{ addContentInfo: AddContentInfo }>,
    searchContext: SearchContext
  ): Promise<SeekIdMaps>;

  /**
   * 替换主材质
   * 为内容的最大体积对象应用新材质，自动计算瓦片尺寸
   * 
   * @param content - 待替换材质的内容对象
   * @param materialSeekId - 材质SeekId，默认为 "2882f4e5-d0d7-40ad-bb74-71fe4e692ad7"
   * @returns Promise，完成材质替换
   */
  static replaceMainMaterial(
    content: ContentWithMetadata,
    materialSeekId?: string
  ): Promise<void>;

  /**
   * 根据材质映射替换材质
   * 批量从材质映射数据创建材质并应用到内容
   * 
   * @param content - 目标内容对象
   * @param materialMap - 对象名称到材质数据的映射
   * @returns Promise，完成材质映射替换
   */
  static replaceMaterialByMaterialMap(
    content: { materialsMap: Map<string, unknown> },
    materialMap: Record<string, MaterialMapData>
  ): Promise<void>;

  /**
   * 获取材质初始化瓦片尺寸
   * 根据内容边界信息计算材质的UV瓦片大小
   * 
   * @param content - 内容对象
   * @param materialData - 材质数据
   * @param objectName - 对象名称
   * @param useUVSize - 是否使用UV尺寸，默认false
   * @returns 材质瓦片尺寸
   */
  static getMaterialInitTileSize(
    content: ContentWithMetadata,
    materialData: MaterialInitTileSize & { metadata?: unknown },
    objectName: string,
    useUVSize?: boolean
  ): MaterialInitTileSize;

  /**
   * 收集添加产品信息
   * 从内容列表中提取所有待添加的产品信息，包括子内容
   * 
   * @param contentList - 包含添加内容信息的数组
   * @returns 产品信息列表
   */
  static collectAddProductInfos(
    contentList: Array<{ addContentInfo?: AddContentInfo }>
  ): ProductInfo[];

  /**
   * 实例化虚拟内容
   * 根据产品信息批量创建内容实例，支持SeekId映射和缩放配置
   * 
   * @param contentList - 包含添加内容信息的列表
   * @param seekIdMap - SeekId映射表（可选）
   * @param scaleConfig - 缩放配置
   * @returns Promise，返回内容与标签对列表
   */
  static instantiateFakeContents(
    contentList: Array<{ addContentInfo: AddContentInfo }>,
    seekIdMap: Map<string, string> | null | undefined,
    scaleConfig: ScaleConfig
  ): Promise<ContentTagPair[]>;

  /**
   * 添加内容到楼层
   * 根据SeekId列表批量添加产品到场景
   * 
   * @param productList - 产品信息列表
   * @returns Promise，返回添加的内容实例列表
   */
  static addContentsToFloor(
    productList: Array<{ seekId: string } & Partial<ProductBase>>
  ): Promise<unknown[]>;

  /**
   * 获取目标内容
   * 递归收集符合条件的内容对象
   * 
   * @param content - 内容对象或数组或组
   * @param targetList - 目标内容收集列表
   * @param room - 房间对象，用于过滤条件
   */
  static getTargetContent(
    content: unknown | unknown[],
    targetList: unknown[],
    room: unknown
  ): void;

  /**
   * 获取楼层上的目标内容
   * 获取指定楼层上所有符合条件的内容
   * 
   * @param floor - 楼层对象
   * @returns 目标内容列表
   */
  static getTargetContentsOnFloor(floor: unknown): unknown[];

  /**
   * 获取楼层上的所有内容
   * 获取楼层上所有在指定房间内的内容
   * 
   * @param room - 房间对象
   * @returns 所有内容列表
   */
  static getAllContentsOnFloor(room: unknown): unknown[];

  /**
   * 移除楼层上的内容
   * 删除楼层上指定房间内的所有内容
   * 
   * @param room - 房间对象
   */
  static removeContentsOnFloor(room: unknown): void;

  /**
   * 判断是否为目标内容
   * 内部方法，根据多个条件过滤内容
   * 
   * @param content - 内容对象
   * @param room - 房间对象
   * @returns 是否为目标内容
   * @private
   */
  static _isTargetContent(content: unknown, room: unknown): boolean;

  /**
   * 判断内容是否在类别白名单中
   * 验证内容类别是否允许在指定房间类型中使用
   * 
   * @param content - 内容对象
   * @param roomType - 房间类型
   * @returns 是否在白名单中
   */
  static isContentInCategoryWhitelist(
    content: unknown,
    roomType: unknown
  ): boolean;

  /**
   * 判断是否为参数化内容
   * 检查内容是否属于参数化类型（如定制结构、组件、网格等）
   * 
   * @param content - 内容对象
   * @returns 是否为参数化内容
   * @private
   */
  static _isParametricContent(content: unknown): boolean;

  /**
   * 复制内容
   * 根据SeekId克隆内容实例
   * 
   * @param content - 包含SeekId的内容对象
   * @returns Promise，返回新的内容实例
   */
  static copyContent(content: { seekId: string }): Promise<unknown>;
}