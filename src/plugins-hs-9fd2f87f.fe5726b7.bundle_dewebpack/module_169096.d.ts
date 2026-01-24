/**
 * 品牌枚举类型
 */
declare enum BrandIdEnum {
  Zhibang = "zhibang"
}

/**
 * 搜索查询参数接口
 */
interface SearchQueryParams {
  tenant: string;
  lang: string;
  sort: string;
  order: "asc" | "desc";
  offset: number;
  limit: number;
  status: number;
  attributeIds?: string;
  brandsIds?: string;
  treeId?: string;
  env?: string;
}

/**
 * API 响应基础结构
 */
interface ApiResponse<T = unknown> {
  ret: string[];
  data: T;
}

/**
 * 产品分类项
 */
interface CategoryItem {
  id: string;
  rank?: number;
  cabinetDetail?: Product;
  [key: string]: unknown;
}

/**
 * 分类列表响应数据
 */
interface CategoriesData {
  items: CategoryItem[];
  total?: number;
  [key: string]: unknown;
}

/**
 * 产品详情
 */
interface Product {
  id: string;
  seekId: string;
  name?: string;
  [key: string]: unknown;
}

/**
 * 产品字典映射（seekId -> Product）
 */
interface ProductsMap {
  [seekId: string]: Product;
}

/**
 * 分类与产品组合数据
 */
interface CategoriesWithProducts {
  categories: CategoriesData;
  products: string[];
}

/**
 * 样式元数据项
 */
interface StyleItem {
  categoryId?: string;
  value: string;
  meta?: Product;
  [key: string]: unknown;
}

/**
 * 删除操作请求参数
 */
interface DeleteParams {
  productId: string;
}

/**
 * 删除操作响应数据
 */
interface DeleteResult {
  result: boolean;
  [key: string]: unknown;
}

/**
 * 全局 HSApp 应用接口
 */
declare namespace HSApp {
  namespace Util {
    namespace Url {
      function getQueryStrings(): Record<string, string>;
    }
  }

  namespace App {
    interface CatalogManager {
      getProductBySeekId(seekId: string): Promise<Product>;
      getProductsBySeekIds(seekIds: string[], extended?: boolean): Promise<ProductsMap>;
    }

    interface AppInstance {
      catalogManager: CatalogManager;
    }

    function getApp(): AppInstance;
  }
}

/**
 * 全局 HSCatalog 目录管理接口
 */
declare namespace HSCatalog {
  namespace Manager {
    interface ManagerInstance {
      getProductBySeekId(seekId: string): Promise<Product>;
      getProductsBySeekIds(seekIds: string[], extended?: boolean): Promise<ProductsMap>;
    }

    function instance(): ManagerInstance;
  }
}

/**
 * 全局 NWTK 网络请求接口
 */
declare namespace NWTK {
  namespace mtop {
    namespace Search {
      function searchModel(options: { data: SearchQueryParams }): Promise<ApiResponse<CategoriesData>>;
    }

    namespace Catalog {
      function delete(options: { data: DeleteParams }): Promise<ApiResponse<DeleteResult>>;
    }
  }

  namespace api {
    namespace catalog {
      function getMiniProductsForMe(
        categoryId: string,
        offset: number,
        limit: number
      ): Promise<CategoriesData>;
    }
  }
}

/**
 * 橱柜样式管理服务
 * 提供橱柜分类、产品查询、用户样式管理等功能
 */
declare interface CabinetStyleService {
  /**
   * 根据品牌获取橱柜分类列表
   * @param brandId - 品牌标识
   * @returns 分类数据的 Promise
   */
  getCategories(brandId: BrandIdEnum): Promise<CategoriesData>;

  /**
   * 根据 seekId 获取单个产品详情
   * @param seekId - 产品唯一标识
   * @returns 产品详情的 Promise
   */
  getProduct(seekId: string): Promise<Product>;

  /**
   * 获取当前用户的橱柜分类列表
   * @returns 用户分类数据的 Promise
   */
  getUserCategories(): Promise<CategoriesData>;

  /**
   * 获取样板橱柜的详细信息（含产品详情）
   * @param brandId - 品牌标识
   * @returns 包含橱柜详情的分类数据 Promise
   */
  getSampleCabinetsInDetail(brandId: BrandIdEnum): Promise<CategoriesData>;

  /**
   * 获取用户橱柜的详细信息（含产品详情）
   * @returns 包含橱柜详情的用户分类数据 Promise
   */
  getUserCabinetsInDetail(): Promise<CategoriesData>;

  /**
   * 删除用户的某个样式
   * @param productId - 产品 ID
   * @returns 删除结果的 Promise
   */
  delUserStyle(productId: string): Promise<boolean>;

  /**
   * 批量获取样式元数据
   * @param styles - 样式项数组
   * @returns 填充了 meta 属性后的 Promise
   */
  getStylesBySeekIds(styles: StyleItem[]): Promise<void>;

  /**
   * 获取用户默认品牌
   * @param userId - 用户 ID
   * @returns 品牌标识的 Promise
   */
  getUserDefaultBrand(userId: string): Promise<string>;

  /**
   * 设置用户默认品牌
   * @param userId - 用户 ID
   * @param brandId - 品牌标识
   * @returns 设置结果的 Promise
   */
  setUserDefaultBrand(userId: string, brandId: string): Promise<boolean>;

  /**
   * 根据标签获取产品列表
   * @param tagId - 标签 ID
   * @returns 产品分类数据的 Promise
   */
  getProductsByTag(tagId: string): Promise<CategoriesData>;
}

/**
 * 橱柜样式服务单例
 */
declare const cabinetStyleService: CabinetStyleService;

export default cabinetStyleService;