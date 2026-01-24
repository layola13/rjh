/**
 * 元数据工具模块
 * 提供产品元数据的获取、解析和处理功能
 */

/**
 * 产品类型枚举
 */
export enum ProductTypeEnum {
  /** 装配包 */
  PAssemblyPackage = 'PAssemblyPackage',
  /** 设计装配 */
  DAssembly = 'DAssembly'
}

/**
 * 原始元数据创建者类型
 */
export enum OriginalMetaCreatorType {
  TPZZ = 'TPZZ'
}

/**
 * 元数据创建者类型
 */
export enum MetaCreatorType {
  TPZZ = 'TPZZ'
}

/**
 * 材质ID枚举
 */
export enum MaterialIdEnum {
  /** 生成的材质ID */
  generated = 'generated'
}

/**
 * 模型类枚举
 */
export enum ModelClass {
  NgMaterial = 'NgMaterial',
  Polygon = 'Polygon',
  Region = 'Region',
  MixBlock = 'MixBlock',
  WaterJetTile = 'WaterJetTile',
  Boundary = 'Boundary'
}

/**
 * 材质数据接口
 */
export interface MaterialData {
  /** 材质ID */
  id?: string;
  /** SeekID */
  seekId?: string;
}

/**
 * 网格多边形接口
 */
export interface GridPolygon {
  /** 材质 */
  material?: MaterialData;
  /** 原始材质 */
  originalMaterial?: MaterialData;
}

/**
 * 网格接口
 */
export interface Grid {
  /** 网格多边形数组 */
  gridPolygons?: GridPolygon[];
}

/**
 * 图案接口
 */
export interface Pattern {
  /** SeekID */
  seekId?: string;
}

/**
 * 腰线多边形接口
 */
export interface WaistlinePolygon {
  /** 材质 */
  material?: MaterialData;
  /** 网格 */
  grid?: Grid;
  /** 图案 */
  pattern?: Pattern | string;
}

/**
 * 腰线接口
 */
export interface Waistline {
  /** 腰线多边形数组 */
  waistlinePolygons?: WaistlinePolygon[];
}

/**
 * 墙面多边形接口
 */
export interface WallPolygon {
  /** 材质 */
  material?: MaterialData;
}

/**
 * 墙角接口
 */
export interface WallCorner {
  /** 材质 */
  material?: MaterialData;
}

/**
 * 边界接口
 */
export interface BoundaryData {
  /** 墙面多边形数组 */
  wallPolygons: WallPolygon[];
  /** 墙角数组 */
  wallCorners: WallCorner[];
}

/**
 * 绘制数据接口
 */
export interface PaintData {
  /** 材质 */
  material?: MaterialData;
  /** 网格 */
  grid?: Grid;
  /** 图案 */
  pattern?: Pattern | string;
  /** 腰线 */
  waistline?: Waistline;
  /** 背景材质 */
  backgroundMaterial?: MaterialData;
  /** 绘制数组 */
  paints?: PaintData[];
  /** 类型 */
  type?: string;
  /** 边界数组 */
  boundaries?: BoundaryData[];
}

/**
 * 混合绘制接口
 */
export interface MixPaint {
  /** 绘制数据 */
  data?: PaintData;
}

/**
 * 绘制数据容器接口
 */
export interface PaintDataContainer {
  /** 混合绘制 */
  mixpaint?: MixPaint;
}

/**
 * 模板信息接口
 */
export interface TemplateInfo {
  /** 材质映射 */
  materials?: Record<string, MaterialData>;
}

/**
 * 实体数据接口
 */
export interface EntityData {
  /** 长名称类 */
  l?: string;
  /** 类名 */
  Class?: string;
  /** SeekID */
  seekId?: string;
  /** 材质 */
  material?: MaterialData;
  /** 绘制数据 */
  paintData?: PaintDataContainer;
  /** 混合绘制 */
  mixpaint?: boolean;
  /** 模板信息 */
  templateInfo?: TemplateInfo;
  /** 边界材质 */
  boundaryMaterial?: MaterialData;
  /** 转角材质 */
  cornerMaterial?: MaterialData;
}

/**
 * 元数据接口
 */
export interface MetaData {
  /** 版本号 */
  version: string;
}

/**
 * 内容数据接口
 */
export interface ContentData {
  /** 元数据 */
  meta: MetaData;
  /** 实体数据数组 */
  data?: EntityData[];
  /** 产品数组 */
  products?: ProductInfo[];
}

/**
 * 产品信息接口
 */
export interface ProductInfo {
  /** 产品ID */
  id?: string;
  /** SeekID */
  seekId?: string;
  /** 产品类型 */
  productType?: ProductTypeEnum;
}

/**
 * 产品详情接口
 */
export interface ProductDetail extends ProductInfo {
  /** 其他产品属性 */
  [key: string]: unknown;
}

/**
 * 设计产品元数据上下文接口
 */
export interface DesignProductMetaContext {
  /** 产品数据 */
  data: ProductInfo;
  /** 版本号 */
  version?: string;
}

/**
 * 元数据工具类
 * 提供元数据的解析、产品信息获取和材质ID收集等功能
 */
export declare const MetaUtil: {
  /**
   * 获取需要刷新的材质SeekID列表
   * @param content - 内容数据
   * @returns SeekID数组
   */
  getRefreshMaterialSeekIds(content: ContentData): string[];

  /**
   * 获取需要刷新的产品ID列表
   * @param content - 内容数据
   * @returns 产品ID数组
   */
  getFreshIds(content: ContentData): string[];

  /**
   * 根据SeekID列表获取产品映射
   * @param seekIds - SeekID数组
   * @returns Promise返回产品映射Map
   */
  getProductsMap(seekIds: string[]): Promise<Map<string, ProductDetail>>;

  /**
   * 从加密的设计内容中获取产品映射
   * @param encryptedContent - 加密的内容字符串
   * @param decryptKey - 解密密钥
   * @returns Promise返回产品映射Map
   */
  getDesignProductsMap(
    encryptedContent: string,
    decryptKey?: string
  ): Promise<Map<string, ProductDetail>>;

  /**
   * 收集铺贴相关的材质和图案ID
   * @param content - 内容数据
   * @param ids - 用于收集ID的数组（会被修改）
   */
  collectPaveIds(content: ContentData, ids: string[]): void;

  /**
   * 从绘制数据中收集材质和图案ID
   * @param paintData - 绘制数据
   * @param ids - 用于收集ID的数组（会被修改）
   */
  collectPaintDataIds(paintData: PaintData, ids: string[]): void;

  /**
   * 从生成的材质创建铺贴元数据
   * @param material - 材质数据
   * @returns 产品详情对象
   */
  createPaveMetaFromGeneratedMaterial(material: MaterialData): ProductDetail;
};