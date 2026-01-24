/**
 * 分类组枚举模块
 * 提供目录分类管理和查询功能
 */

/**
 * 分类组枚举（国内版本）
 */
export enum CategoryGroupEnum {
  /** 硬装材料 */
  HARD_MATERISL = "HARD_MATERISL",
  /** 家具 */
  FURNITURE = "FURNITURE",
  /** 电器 */
  ELECTRICAL_APPLIANCE = "ELECTRICAL_APPLIANCE",
  /** 排除分类 */
  EXCLUDE_CATEGORY = "EXCLUDE_CATEGORY",
  /** 其他 */
  OTHER = "OTHER"
}

/**
 * 全球分类组枚举（国际版本）
 */
export enum GlobalCategoryGroupEnum {
  /** 室内装饰 */
  HARD_MATERISL = "interior finish",
  /** 家具陈设 */
  FURNITURE = "furnishing",
  /** 电器 */
  ELECTRICAL_APPLIANCE = "electrical",
  /** 排除分类 */
  EXCLUDE_CATEGORY = "EXCLUDE_CATEGORY",
  /** 其他 */
  OTHER = "OTHER"
}

/**
 * 分类目录项接口
 */
export interface CategoryItem {
  /** 分类ID */
  id: number | string;
  /** 分类名称 */
  name: string;
  /** 子分类列表 */
  categories?: CategoryItem[];
}

/**
 * 目录数据接口
 */
export interface CatalogData {
  /** 分类项列表 */
  items?: CategoryItem[];
  /** 兼容直接传入数组的情况 */
  [key: number]: CategoryItem;
}

/**
 * 分类组ID映射类型
 */
export type CategoryGroupIdMap = {
  [K in CategoryGroupEnum | GlobalCategoryGroupEnum]: Array<number | string>;
};

/**
 * 后端目录辅助类
 * 用于管理和查询商品分类目录树
 */
export declare class BackendCatalogHelper {
  /** 分类树路径映射表：分类ID -> 分类路径 */
  private categoryTreeMap: Map<number | string, string>;
  
  /** 分类组ID映射：分组类型 -> ID列表 */
  private iDGroup: Partial<CategoryGroupIdMap>;
  
  /** 硬装材料分类ID列表 */
  private hardMaterialId: Array<number | string>;
  
  /** 家具分类ID列表 */
  private furnitureId: Array<number | string>;
  
  /** 电器分类ID列表 */
  private electricalApplianceId: Array<number | string>;
  
  /** 排除分类ID列表 */
  private excludeCategory: Array<number | string>;
  
  /** 分类类型名称映射表：分类ID -> 类型名称 */
  private categoryTypeMap: Map<number | string, string>;

  constructor();

  /**
   * 设置目录数据
   * @param catalogData - 目录数据
   * @param version - 版本标识（"fp"为国际版）
   */
  setCatalogData(catalogData: CatalogData, version?: string): void;

  /**
   * 初始化分类树映射表
   * @param catalogData - 目录数据
   * @param version - 版本标识
   * @returns 分类ID到路径的映射表
   */
  private initCategoryTreeMap(
    catalogData: CatalogData,
    version?: string
  ): Map<number | string, string>;

  /**
   * 获取有效的分类ID
   * @param categoryIds - 单个分类ID或分类ID数组
   * @returns 第一个有效的分类ID
   */
  getValidCategory(
    categoryIds: number | string | Array<number | string>
  ): number | string | undefined;

  /**
   * 从分类类型字符串中获取有效分类ID
   * @param categoryTypeString - 逗号分隔的分类ID字符串
   * @returns 第一个有效的分类ID
   */
  getValidCategoryType(categoryTypeString?: string): number | string | undefined;

  /**
   * 获取分类树路径
   * @param categoryId - 分类ID
   * @returns 分类路径（如："/123/456"）
   */
  getCategoryTreePath(categoryId: number | string): string | undefined;

  /**
   * 获取分类类型名称
   * @param categoryId - 分类ID
   * @returns 分类类型名称（如："涂料"、"沙发"等）
   */
  getCategoryTypeName(categoryId: number | string): string | undefined;

  /**
   * 获取分组级别类型
   * @param categoryId - 分类ID
   * @param version - 版本标识（"fp"为国际版）
   * @returns 分组枚举值
   */
  getGroupLevelType(
    categoryId: number | string,
    version?: string
  ): CategoryGroupEnum | GlobalCategoryGroupEnum;

  /**
   * 获取分类在分组中的索引位置
   * @param categoryId - 分类ID
   * @param version - 版本标识
   * @returns 索引位置，未找到返回Number.MAX_VALUE
   */
  getGroupLevelIndex(categoryId: number | string, version?: string): number;
}

/**
 * 后端目录辅助类单例实例
 * 全局可用的目录查询工具
 */
export declare const backendCatalogHelper: BackendCatalogHelper;