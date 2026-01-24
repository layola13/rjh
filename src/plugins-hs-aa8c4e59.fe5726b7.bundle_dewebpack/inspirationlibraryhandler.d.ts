/**
 * 灵感库处理器 - 负责从模板房间中提取和创建3D模型、定制产品和自由造型
 */

import type { HSApp } from './types/HSApp';
import type { HSCore } from './types/HSCore';
import type { HSCatalog } from './types/HSCatalog';

/**
 * 3D 坐标
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 3D 旋转角度（欧拉角）
 */
export interface Rotation3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 3D 缩放比例
 */
export interface Scale3D {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/**
 * 材质映射表
 */
export type MaterialMap = Map<string, unknown>;

/**
 * 产品元数据（从目录管理器获取）
 */
export interface ProductMeta {
  id: string;
  [key: string]: unknown;
}

/**
 * 构建的产品数据
 */
export interface BuiltProductData {
  /** 产品元数据 */
  meta?: ProductMeta | Record<string, unknown>;
  /** 位置坐标 */
  position: Position3D;
  /** 旋转角度 */
  rotation: Rotation3D;
  /** 缩放比例 */
  scale: Scale3D;
  /** 实体 ID */
  entityId: string;
  /** 子成员（用于组合模型） */
  members?: BuiltProductData[];
  /** 材质映射 */
  materialMap?: MaterialMap;
}

/**
 * 模板数据中的房间信息
 */
export interface TemplateRoom {
  id: string;
  /** 家具信息列表 */
  furniture_info?: TemplateFurniture[];
  /** 装饰信息列表 */
  decorate_info?: TemplateFurniture[];
  /** 吊顶信息 */
  ceiling_info?: {
    model_ceiling_info?: CeilingModel[];
  };
  /** 自由造型信息 */
  diy_info?: DIYModel[];
  /** 定制产品信息 */
  customizedProducts_info?: {
    dModelIds?: string[][];
  };
}

/**
 * 家具/装饰项
 */
export interface TemplateFurniture {
  entityId: string;
  id: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  /** 是否为自定义模型 */
  isCustomModel?: boolean;
  /** 组合模型的子成员 */
  members?: TemplateFurniture[];
}

/**
 * 吊顶模型
 */
export interface CeilingModel {
  id: string;
  seekId: string;
  pos: {
    x: number;
    y: number;
    z: number;
  };
}

/**
 * DIY2 自由造型模型
 */
export interface DIYModel {
  id: string;
  [key: string]: unknown;
}

/**
 * 模板导入数据
 */
export interface TemplateImportData {
  templateData: {
    /** 组合模型元数据 */
    groupmetadatum?: Record<string, ProductMeta>;
    /** 材质数据 */
    materials?: {
      contentMaterials?: Record<string, Record<string, unknown>>;
    };
    /** 房间列表（用于材质应用） */
    roomList?: RoomListItem[];
  };
}

/**
 * 房间列表项（包含材质信息）
 */
export interface RoomListItem {
  roomId: string;
  roomInfo: {
    ceiling?: {
      faceID?: string;
    };
  };
  materials: {
    floor?: {
      materialDumps?: unknown;
    };
    ceiling?: {
      materialDumps?: unknown;
    };
    wall?: {
      wallMaterials?: Array<Record<string, unknown>>;
    };
  };
}

/**
 * 模板数据
 */
export interface TemplateData {
  room: TemplateRoom[];
}

/**
 * 定制产品导入数据项 [productId, resourceData]
 */
export type CustomizedProductImportItem = [string, Record<string, unknown>];

/**
 * DIY 导入数据项
 */
export interface DIYImportDataItem {
  entityId: string;
  proxyId: string;
  [key: string]: unknown;
}

/**
 * 策略数据版本缓存
 */
export interface StrategyData {
  templateData?: TemplateData;
  templateDataUrl?: string;
  templateImportData?: TemplateImportData;
  customizedProductsImportData?: CustomizedProductImportItem[];
  diyImportData?: DIYImportDataItem[];
}

/**
 * 添加内容的参数
 */
export interface AddContentsParams {
  /** 软装模型数据 */
  softModelData: BuiltProductData[];
  /** 定制产品代理数据 */
  customizeProxyData: Array<Record<string, unknown> & { id: string }>;
  /** DIY 代理数据 */
  diyProxyData: Array<Record<string, unknown>>;
}

/**
 * ID 映射项
 */
export interface IdMapItem {
  ids?: {
    instanceid: string;
  };
}

/**
 * 合并后的 ID 映射
 */
export type MergedIdMap = Record<string, string[]>;

/**
 * 灵感库处理器
 * 
 * 核心功能：
 * - 从模板房间提取实例并创建可拾取的模型
 * - 支持 3D 模型、定制产品、自由造型三种类型
 * - 处理组合模型、材质映射、2D 材质应用
 */
export declare class InspirationLibraryHandler {
  private readonly _app: typeof HSApp.App;
  private readonly _strategyManager: StrategyManager;

  constructor();

  /**
   * 按房间 ID 拾取所有模型
   * @param roomId - 房间 ID
   * @param version - 模板版本号
   */
  createPickIpModelByRoomId(roomId: string, version: string): Promise<void>;

  /**
   * 创建拾取模型
   * @param instanceIds - 实例 ID 列表
   * @param version - 模板版本号
   */
  createPickupModel(instanceIds: string[], version: string): Promise<void>;

  /**
   * 获取策略管理器
   */
  getStrategyManager(): StrategyManager;

  /**
   * 合并相同 ID 的实例映射
   * @param idMapItems - ID 映射项数组
   * @returns 合并后的 ID 映射表
   */
  mergeSameIdsForIdMap(idMapItems: IdMapItem[]): MergedIdMap;

  /**
   * 构建模型数据（内部方法）
   */
  private _buildModelData(params: {
    instanceIds: string[];
    templateData: TemplateData;
    templateImportData: TemplateImportData;
  }): Promise<BuiltProductData[]>;

  /**
   * 构建定制产品数据（内部方法）
   */
  private _buildCustomizeData(params: {
    instanceIds: string[];
    templateData: TemplateData;
    templateDataUrl: string;
    version: string;
  }): Promise<Array<Record<string, unknown> & { id: string }>>;

  /**
   * 构建 DIY2 数据（内部方法）
   */
  private _buildDiy2Data(params: {
    instanceIds: string[];
    templateData: TemplateData;
    templateDataUrl: string;
    version: string;
  }): Promise<Array<Record<string, unknown>>>;

  /**
   * 从模板数据中提取产品信息（内部方法）
   */
  private _getProducts(params: {
    templateData: TemplateData;
    entityIds: string[];
  }): TemplateFurniture[];

  /**
   * 从模板数据中提取 DIY2 信息（内部方法）
   */
  private _getDIY2s(params: {
    templateData: TemplateData;
    entityIds: string[];
  }): DIYModel[];

  /**
   * 递归提取所有 SeekID（内部方法）
   */
  private _getSeekId(products: TemplateFurniture[]): string[];

  /**
   * 构建产品数据结构（内部方法）
   */
  private _buildProductsData(
    products: TemplateFurniture[],
    metaData: Record<string, ProductMeta>,
    groupMetaData?: Record<string, ProductMeta>,
    materialData?: Record<string, Record<string, unknown>>
  ): BuiltProductData[];

  /**
   * 获取定制产品数据（内部方法）
   */
  private _getCustomizeData(
    instanceIds: string[],
    templateData: TemplateData,
    templateDataUrl: string,
    version: string
  ): Promise<Array<Record<string, unknown> & { id: string }> | undefined>;

  /**
   * 从目录管理器获取产品元数据（内部方法）
   */
  private _getMetaData(seekIds: string[]): Promise<Record<string, ProductMeta>>;

  /**
   * 获取组合模型元数据（内部方法）
   */
  private _getGroupMetaData(importData: TemplateImportData): Record<string, ProductMeta> | undefined;

  /**
   * 获取材质数据（内部方法）
   */
  private _getMaterialData(importData: TemplateImportData): Record<string, Record<string, unknown>>;

  /**
   * 添加内容到场景（内部方法）
   */
  private _addContents(params: AddContentsParams): void;

  /**
   * 用户行为追踪日志（内部方法）
   */
  private _userTrackLogger(params: AddContentsParams): void;

  /**
   * 应用面材质（当无法创建3D模型时的降级处理）（内部方法）
   */
  private _applyFaceMaterial(entityId: string, importData: TemplateImportData): void;
}

/**
 * 策略管理器 - 管理不同版本的模板数据缓存
 */
declare class StrategyManager {
  /**
   * 获取指定版本的策略数据
   */
  getData(version: string): StrategyData;
}