/**
 * B2Data模块 - BOM数据处理核心类
 * 负责生成、组织和过滤BOM清单数据
 */

import { B2Context } from './B2Context';
import { B2Layer } from './B2Layer';
import { B2Room } from './B2Room';
import { B2Content } from './B2Content';
import { B2Material } from './B2Material';
import { B2Design } from './B2Design';
import { B2Molding } from './B2Molding';
import { backendCatalogHelper } from './backendCatalogHelper';
import { MathUtil } from './MathUtil';
import { categoryHandle } from './categoryHandle';
import { elementHandle } from './elementHandle';

/**
 * 分类配置信息
 */
export interface CategoryConfig {
  /** 分类ID */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类昵称 */
  nickName?: string;
}

/**
 * 硬装类型枚举
 */
export type HardloadType = 'material' | 'door' | 'opening' | 'backgroundWall' | 'others';

/**
 * 分类组ID类型
 */
export type CategoryGroupId = 'hardload' | 'appliance' | 'furniture';

/**
 * 过滤选项配置
 */
export interface FilterOptions {
  /** 用户管理系统ID */
  umsId?: string;
  /** 企业ID */
  enterpriseId?: string;
  /** 资源池ID */
  poolId?: string;
  /** 硬装过滤 - 布尔值或具体类型数组 */
  hardload?: boolean | HardloadType[];
  /** 软装家电过滤 */
  appliance?: boolean;
  /** 家具过滤 */
  furniture?: boolean;
  /** 归属类型列表 */
  belongTypes?: string[];
}

/**
 * 构建数据选项
 */
export interface BuildDataOptions {
  /** 语言设置 */
  lang?: string;
  /** 过滤选项 */
  filterOptions?: FilterOptions;
  /** Seek归属查询函数 */
  seekBelong?: (params: SeekBelongParams) => Promise<SeekBelongMap>;
}

/**
 * Seek归属查询参数
 */
export interface SeekBelongParams {
  /** 用户管理系统ID */
  umsId?: string;
  /** JID列表 */
  jidList: string[];
  /** 企业ID */
  enterpriseId?: string;
  /** 资源池ID */
  poolId?: string;
}

/**
 * Seek归属映射表 - SeekID -> 归属类型数组
 */
export type SeekBelongMap = Record<string, string[]>;

/**
 * BOM数据项
 */
export interface BomDataItem {
  /** Seek资源ID */
  seekId: string;
  /** 房间ID */
  roomId?: string;
  /** 位置名称 */
  locationName?: string;
  /** 分类类型ID */
  categoryTypeId?: string;
  /** 分类类型名称 */
  categoryType?: string;
  /** 分类名称 */
  category?: string;
  /** 数量 */
  count: number;
  /** 位置面积 */
  locationFaceArea?: number;
  /** 实际尺寸列表 */
  realSizeList?: number[];
  /** 是否保持整数（内部标记） */
  keepInteger?: boolean;
}

/**
 * 分类数据映射 - 分类组ID -> BOM数据项列表
 */
export type CategoryDataMap = Record<CategoryGroupId, BomDataItem[]>;

/**
 * 层级列表项
 */
export interface LayerItem {
  id: string;
  name: string;
  [key: string]: unknown;
}

/**
 * 房间列表项
 */
export interface RoomItem {
  id: string;
  name: string;
  [key: string]: unknown;
}

/**
 * 设计信息
 */
export interface DesignInfo {
  [key: string]: unknown;
}

/**
 * BOM数据输出结构
 */
export interface BomDataOutput {
  /** 层级列表 */
  layerList: LayerItem[];
  /** 房间列表 */
  roomList: RoomItem[];
  /** 设计信息 */
  designInfo: DesignInfo;
  /** 分类内容信息 */
  contentInfo: CategoryDataMap;
  /** 分类配置 */
  config?: CategoryConfig[];
}

/**
 * 状态响应包装
 */
export interface StatusResponse<T> {
  status: {
    code: number;
    message: string;
  };
  data: T;
}

/**
 * 分类信息
 */
export interface CategoryInfo {
  id: string;
  category: CategoryConfig;
  index?: number;
}

/**
 * 分类组信息
 */
export interface CategoryGroup {
  id: CategoryGroupId;
  name: string;
  [key: string]: unknown;
}

/**
 * 过滤项参数
 */
export interface FilterItemParams {
  /** 待过滤的数据项 */
  item: BomDataItem;
  /** BOM分类信息 */
  bomCategory: CategoryConfig;
  /** 分类组信息 */
  categoryGroup: CategoryGroup;
  /** 过滤选项 */
  filterOptions?: FilterOptions;
  /** Seek归属映射 */
  seekBelong?: SeekBelongMap;
}

/**
 * 目录树节点
 */
export interface CatalogTreeNode {
  [key: string]: unknown;
}

/**
 * B2Data类 - BOM数据处理主类
 * 负责初始化、构建、组织和过滤BOM清单数据
 */
export declare class B2Data {
  /** BOM原始数据 */
  private readonly bomData: unknown;
  
  /** 上下文对象 */
  private readonly context: B2Context;
  
  /** 分类处理器 */
  private readonly categoryHandle: typeof categoryHandle;

  /**
   * 构造函数
   * @param bomData - BOM原始数据
   */
  constructor(bomData: unknown);

  /**
   * 生成BOM2数据
   * @param _unused - 未使用参数（兼容旧API）
   * @param options - 构建选项
   * @returns BOM数据输出结构
   */
  genBom2Data(_unused: unknown, options?: BuildDataOptions): Promise<BomDataOutput>;

  /**
   * 构建BOM数据
   * @param _unused - 未使用参数
   * @param options - 构建选项
   * @returns BOM数据输出结构
   */
  buildData(_unused: string, options?: BuildDataOptions): Promise<BomDataOutput>;

  /**
   * 获取数据
   * @param catalogData - 目录数据
   * @param catalogId - 目录ID
   * @param options - 构建选项
   * @returns BOM数据输出结构
   */
  getData(
    catalogData: CatalogTreeNode,
    catalogId: string,
    options?: BuildDataOptions
  ): Promise<BomDataOutput>;

  /**
   * 生成带状态的BOM2数据
   * @param _unused - 未使用参数
   * @returns 包含状态的BOM数据响应
   */
  genBom2DataWithStus(_unused: unknown): Promise<StatusResponse<BomDataOutput>>;

  /**
   * 初始化分类数据
   * @param options - 构建选项
   * @returns Promise
   */
  initCategoryData(options?: BuildDataOptions): Promise<void>;

  /**
   * 过滤数据项
   * @param params - 过滤参数
   * @returns 是否通过过滤
   */
  filterItem(params: FilterItemParams): boolean;

  /**
   * 获取Seek归属信息
   * @param seekIds - SeekID列表
   * @param filterOptions - 过滤选项
   * @param seekBelongFn - Seek归属查询函数
   * @returns Seek归属映射表
   */
  getSeekBelong(
    seekIds: string[],
    filterOptions?: FilterOptions,
    seekBelongFn?: (params: SeekBelongParams) => Promise<SeekBelongMap>
  ): Promise<SeekBelongMap>;

  /**
   * 组织数据 - 将扁平数据按分类组归类
   * @param items - BOM数据项列表
   * @param options - 构建选项
   * @returns 分类数据映射
   */
  organizeData(
    items: BomDataItem[],
    options?: BuildDataOptions
  ): Promise<CategoryDataMap>;

  /**
   * 内部方法 - 对数据进行分类
   * @param items - BOM数据项列表
   * @param categoryMap - 分类映射表（输出）
   * @param filterOptions - 过滤选项
   * @param seekBelongMap - Seek归属映射
   */
  private _classifyDatas(
    items: BomDataItem[],
    categoryMap: CategoryDataMap,
    filterOptions?: FilterOptions,
    seekBelongMap?: SeekBelongMap
  ): void;

  /**
   * 内部方法 - 生成分类键
   * @param seekId - SeekID
   * @param roomId - 房间ID
   * @param locationName - 位置名称
   * @param extra - 额外标识
   * @returns 唯一分类键
   */
  private _getClassifyKey(
    seekId: string,
    roomId?: string,
    locationName?: string,
    extra?: string
  ): string;
}