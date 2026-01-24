/**
 * 材质提取器模块
 * 用于从建筑结构中提取地板、天花板和墙面的材质信息
 */

/**
 * 最小边缘长度阈值（米）
 * 用于过滤过短的边缘线段
 */
export const MIN_EDGE_LENGTH = 0.3;

/**
 * 最小相交长度阈值（米）
 * 用于判断两条线段是否有效相交
 */
export const MIN_INTERSECTED_LENGTH = 0.1;

/**
 * 最大线距阈值（米）
 * 用于判断两条线是否足够接近
 */
export const MAX_LINE_DISTANCE = 0.2;

/**
 * 2D点坐标
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 元素类型信息
 */
export interface ElementType {
  /** 内容ID */
  contentId: string;
  /** 分类标签列表 */
  categories: string[];
  /** 内容类型字符串 */
  contentType: string;
}

/**
 * 材质JSON数据结构
 */
export interface MaterialJson {
  /** 产品ID列表（完整GUID） */
  products: string[];
  /** 产品ID列表（36位UUID） */
  productIds: string[];
  /** 生成的产品元数据 */
  generatedProducts: Array<{
    id: string;
    name?: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

/**
 * 墙面材质信息
 */
export interface WallFaceMaterial {
  /** 墙面面积（平方米） */
  area: number;
  /** 材质JSON数据 */
  matJson: MaterialJson | undefined;
  /** 关联的元素类型列表 */
  elementTypes: ElementType[];
}

/**
 * 材质提取结果
 */
export interface MaterialExtractionResult {
  /** 地板材质 */
  floor: MaterialJson | undefined;
  /** 天花板材质 */
  ceiling: MaterialJson | undefined;
  /** 墙面材质列表（按面积降序排列） */
  wallFaces: WallFaceMaterial[];
}

/**
 * 内容元数据
 */
export interface ContentMetadata {
  /** 分类标签 */
  categories?: string[];
  [key: string]: unknown;
}

/**
 * 内容类型
 */
export interface ContentType {
  /**
   * 获取类型字符串
   */
  getTypeString(): string;
}

/**
 * 内容对象（家具、设备等）
 */
export interface Content {
  /** 唯一标识符 */
  id: string;
  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
  /** 旋转角度（弧度） */
  rotation: number;
  /** 元数据 */
  metadata?: ContentMetadata;
  /** 内容类型 */
  contentType?: ContentType;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 材质信息
 */
export interface Material {
  /**
   * 保存为JSON格式
   */
  saveToJSON(): {
    products: Array<{ id: string } | { toJSON(): unknown }>;
    [key: string]: unknown;
  } | undefined;
}

/**
 * 楼层对象
 */
export interface Floor {
  /** 楼层材质 */
  material?: Material;
  [key: string]: unknown;
}

/**
 * 天花板对象
 */
export interface Ceiling {
  /** 天花板材质 */
  material?: Material;
  [key: string]: unknown;
}

/**
 * 面信息
 */
export interface FaceInfo {
  /** 曲线/边缘 */
  curve: Curve2D;
  [key: string]: unknown;
}

/**
 * 结构面对象
 */
export interface StructureFace {
  /** 唯一标识符 */
  id: string;
  /** 面信息 */
  faceInfo?: FaceInfo;
  /** 材质 */
  material?: Material;
  /**
   * 获取面积
   */
  getArea(): number;
}

/**
 * 2D曲线基类
 */
export interface Curve2D {
  /**
   * 获取曲线长度
   */
  getLength(): number;
  /**
   * 判断是否为2D线段
   */
  isLine2d(): boolean;
  /**
   * 获取方向向量
   */
  getDirection(): Direction;
  /**
   * 获取范围
   */
  getRange(): Range;
}

/**
 * 方向向量
 */
export interface Direction {
  /**
   * 判断是否与另一方向相同
   */
  isSameDirection(other: Direction): boolean;
}

/**
 * 范围
 */
export interface Range {
  /**
   * 计算与另一范围的相交区间
   */
  intersected(other: Range): Range[];
  /**
   * 获取范围长度
   */
  getLength(): number;
}

/**
 * 提取位置类型
 * - "centroid": 质心位置
 * - 其他自定义位置类型
 */
export type ExtractPosition = "centroid" | string;

/**
 * 材质提取器
 * 从建筑结构中提取地板、天花板和墙面的材质信息
 */
export declare class MaterialsExtractor {
  /**
   * 当前楼层
   */
  protected floor: Floor;

  /**
   * 提取位置类型
   */
  protected position: ExtractPosition;

  /**
   * 内容对象列表（家具、设备等）
   */
  protected contents: Content[];

  /**
   * 结构面列表（墙、柱等）
   */
  protected structureFaces: StructureFace[];

  /**
   * 创建材质提取器实例
   * @param floor - 楼层对象
   * @param position - 提取位置类型，默认为 "centroid"
   * @param contents - 内容对象列表
   */
  constructor(floor: Floor, position?: ExtractPosition, contents?: Content[]);

  /**
   * 获取材质的JSON表示
   * @param material - 材质对象
   * @returns 材质JSON数据，如果材质无效则返回 undefined
   */
  protected _getMatJson(material?: Material): MaterialJson | undefined;

  /**
   * 生成材质的唯一名称标识
   * 通过拼接所有产品的名称或ID生成唯一标识符
   * @param matJson - 材质JSON数据
   * @returns 唯一名称字符串
   */
  protected _getUniqueName(matJson?: MaterialJson): string | undefined;

  /**
   * 判断两个材质JSON是否相同
   * @param matJson1 - 第一个材质JSON
   * @param matJson2 - 第二个材质JSON
   * @returns 如果材质相同返回 true，否则返回 false
   */
  protected _isSameMatJson(
    matJson1?: MaterialJson,
    matJson2?: MaterialJson
  ): boolean;

  /**
   * 获取内容对象的背面线段
   * 计算内容对象后边缘的2D线段
   * @param content - 内容对象
   * @returns 背面线段
   */
  protected _getBackLine(content: Content): unknown;

  /**
   * 获取所有内容对象的背面线段信息
   * @returns 背面线段信息列表
   */
  protected _getBackLineInfos(): Array<{
    line: unknown;
    content: Content;
  }>;

  /**
   * 获取元素类型信息
   * @param content - 内容对象
   * @returns 元素类型信息
   */
  protected _getElementType(content: Content): ElementType;

  /**
   * 执行材质提取
   * 提取楼层的地板、天花板和墙面材质信息
   * @returns 材质提取结果
   */
  extract(): MaterialExtractionResult;
}