/**
 * Product catalog search and management type definitions
 * Provides interfaces for product searching, filtering, and catalog operations
 */

/**
 * Product facet filter types
 */
export enum ProductFacetType {
  /** Brand filter identifier */
  Brand = "brandsIds",
  /** Category filter identifier */
  Category = "categoriesIds",
  /** Price range filter identifier */
  PriceRange = "priceRange",
  /** Color block filter identifier */
  ColorBlock = "colorBlock",
  /** Sort assistance identifier */
  SortAssist = "sortAssist"
}

/**
 * User data category types for different model/template categories
 */
export enum UserDataCategoryType {
  Ceiling = "ceiling",
  FeatureWall = "featurewall",
  Platform = "platform",
  FixedFurniture = "fixedfurniture",
  Floor = "floor",
  Furniture = "furniture",
  PersonalizedModel = "personalizedmodel",
  Material = "material",
  Tile = "tile",
  StylerTemplate = "stylertemplate",
  MySingleStylerTemplate = "mystylertemplate",
  MyWholehouseTemplate = "mywholehosuetemplate",
  UploadModel = "uploadmodel",
  MyGroup = "mygroup",
  CustomizedMaterial = "customizedmaterial",
  MixPaintPlan = "paintplan"
}

/**
 * Category tree node structure
 */
export interface CategoryTreeNode {
  id: string;
  name: string;
  categories?: CategoryTreeNode[];
  [key: string]: unknown;
}

/**
 * Category tree query parameters
 */
export interface CategoryTreeParams {
  treeId?: string;
  tenant?: string;
  branch?: string;
  lang?: string;
  app?: string;
  status?: string;
  version?: string;
}

/**
 * Enterprise list item
 */
export interface EnterpriseItem {
  id: string;
  name: string;
  [key: string]: unknown;
}

/**
 * Cabinet enterprise category query parameters
 */
export interface CabinetEnterpriseCategoryParams {
  envType?: string;
  sceneType?: string;
  categoryId?: string;
  categoryIds?: string;
}

/**
 * Product filter configuration
 */
export interface ProductFilters {
  /** Brand IDs */
  brandsIds?: string[];
  /** Category IDs */
  categoriesIds?: string[];
  /** Price range */
  priceRange?: string[];
  /** Color block IDs */
  colorBlock?: string[];
  /** Sort assistance */
  sortAssist?: string[];
  /** Custom attribute filters */
  [key: string]: string[] | undefined;
}

/**
 * Pool search configuration
 */
export interface PoolSearchConfig {
  poolIds?: string[];
  poolType?: string;
  notAllocated?: boolean;
  envType?: string;
  sceneType?: string;
  sortAssist?: string;
  disableAgg?: boolean;
  shopId?: string;
  poolTagId?: string;
  poolId?: string;
}

/**
 * Pool search parameters
 */
export interface PoolSearchParams {
  categoryId?: string;
  keywords?: string;
  offset?: number;
  limit?: number;
  filters?: ProductFilters;
  sort?: string;
  order?: string;
  treeId?: string;
  multiCategoryIds?: string;
  requestId?: string;
  queryConfig: PoolSearchConfig;
}

/**
 * Product search result
 */
export interface ProductSearchResult {
  items: ProductItem[];
  total?: number;
  facets?: FacetResult[];
  [key: string]: unknown;
}

/**
 * Mini product item
 */
export interface ProductItem {
  id: string;
  name: string;
  thumbnail?: string;
  price?: number;
  [key: string]: unknown;
}

/**
 * Facet aggregation result
 */
export interface FacetResult {
  name: string;
  values: FacetValue[];
}

/**
 * Facet value item
 */
export interface FacetValue {
  id: string;
  label: string;
  count: number;
}

/**
 * Image search options
 */
export interface ImageSearchOptions {
  /** Image search URL */
  imgSearchUrl: string;
  /** Image search bounding box coordinates */
  imgSearchLoc?: number[];
  /** Whether to include all items */
  allItems?: boolean;
}

/**
 * Image search parameters
 */
export interface ImageSearchParams {
  categoryId?: string;
  imageSearchOptions: ImageSearchOptions;
  offset?: number;
  limit?: number;
  filters?: ProductFilters;
  facets?: string[];
  sort?: string;
  order?: string;
  requestId?: string;
  queryConfig?: PoolSearchConfig;
}

/**
 * Mini products search parameters (V2)
 */
export interface MiniProductSearchParams {
  categoryId?: string;
  keywords?: string;
  offset?: number;
  limit?: number;
  filters?: ProductFilters;
  facets?: string[];
  sort?: string;
  order?: string;
  treeId?: string;
  modelId?: string;
  designId?: string;
  multiCategoryIds?: string;
  modelIdsSearch?: string;
  queryConfig?: PoolSearchConfig;
  currentRoom?: string;
  requestId?: string;
}

/**
 * Topic search parameters
 */
export interface TopicSearchParams {
  poolId: string;
  categoryId?: string;
  offset?: number;
  limit?: number;
  requestId?: string;
}

/**
 * Customized product DTO
 */
export interface CustomizedProductDTO {
  name: string;
  category: string;
  notParseUrl?: boolean;
  [key: string]: unknown;
}

/**
 * Customized full room DTO
 */
export interface CustomizedFullRoomDTO {
  name: string;
  [key: string]: unknown;
}

/**
 * Model price item
 */
export interface ModelPrice {
  modelId: string;
  price: number;
  currency?: string;
}

/**
 * Catalog API interface
 */
export interface CatalogAPI {
  /** Product facet type enumeration */
  readonly ProductFacetType: typeof ProductFacetType;
  
  /** Product facet type values array */
  readonly ProductFacetTypeValues: string[];
  
  /** User data category type enumeration */
  readonly UserDataCategoryType: typeof UserDataCategoryType;

  /**
   * Get category tree by ID
   * @param params - Query parameters
   * @param version - API version (default: "v3.0")
   */
  getCategoryTree(params?: CategoryTreeParams, version?: string): Promise<CategoryTreeNode[]>;

  /**
   * Get enterprise list
   * @param params - Query parameters
   */
  getEnterpriseList(params?: unknown): Promise<EnterpriseItem[]>;

  /**
   * Get backdrop enterprise list
   * @param params - Query parameters
   */
  getBackdropEnterpriseList(params?: unknown): Promise<EnterpriseItem[]>;

  /**
   * Get model enterprise package list
   */
  getModelEnterprisePackageList(): Promise<unknown[]>;

  /**
   * Get cabinet enterprise categories
   * @param params - Query parameters
   */
  getCabinetEnterpriseCategories(params?: CabinetEnterpriseCategoryParams): Promise<Record<string, unknown>>;

  /**
   * Search products in pool
   * @param params - Search parameters
   */
  poolSearch(params: PoolSearchParams): Promise<ProductSearchResult | undefined>;

  /**
   * Get product by ID
   * @param productId - Product identifier
   * @param disableCache - Whether to disable cache
   */
  getProductById(productId: string, disableCache?: boolean): Promise<ProductItem>;

  /**
   * Get product by external ID
   * @param externalId - External product identifier
   */
  getProductByExternalId(externalId: string): Promise<ProductItem>;

  /**
   * Get content information by IDs
   * @param modelIds - Array of model IDs
   */
  getContentsInfoByIds(modelIds: string[]): Promise<{ items: unknown[] }>;

  /**
   * Get products by multiple IDs
   * @param productIds - Array of product IDs
   * @param chunkSize - Batch size for chunked requests (default: 50)
   */
  getProductsByIds(productIds: string[], chunkSize?: number): Promise<ProductItem[]>;

  /**
   * Get products by chunk of IDs (internal method)
   * @param productIds - Array of product IDs
   */
  getProductsByChunkIds(productIds: string[]): Promise<ProductItem[]>;

  /**
   * Get product variations by SPU ID
   * @param spuId - SPU identifier
   */
  getProductVariation(spuId: string): Promise<ProductItem[]>;

  /**
   * Get products by category ID
   * @param categoryId - Category identifier
   * @param offset - Result offset
   * @param limit - Result limit
   * @param filters - Filter conditions
   * @param facets - Facets to aggregate
   */
  getProductsByCategoryId(
    categoryId: string,
    offset?: number,
    limit?: number,
    filters?: ProductFilters,
    facets?: string[]
  ): Promise<ProductSearchResult>;

  /**
   * Search products
   * @param categoryIds - Category IDs
   * @param tenant - Tenant identifier
   * @param offset - Result offset
   * @param limit - Result limit
   * @param filters - Filter conditions
   * @param facets - Facets to aggregate
   * @param sort - Sort field
   * @param order - Sort order
   * @param treeId - Category tree ID
   * @param version - API version
   */
  searchProducts(
    categoryIds?: string,
    tenant?: string,
    offset?: number,
    limit?: number,
    filters?: ProductFilters,
    facets?: string[],
    sort?: string,
    order?: string,
    treeId?: string,
    version?: string
  ): Promise<ProductSearchResult>;

  /**
   * Search mini products by image
   * @param params - Image search parameters
   */
  searchImageMiniProducts(params: ImageSearchParams): Promise<ProductSearchResult>;

  /**
   * Search mini products (V2)
   * @param params - Search parameters
   */
  searchMiniProductsV2(params: MiniProductSearchParams): Promise<ProductSearchResult>;

  /**
   * Search topic products
   * @param params - Topic search parameters
   */
  searchTopicProducts(params: TopicSearchParams): Promise<ProductSearchResult>;

  /**
   * Search united mini products
   */
  searchUnitedMiniProducts(
    offset?: number,
    limit?: number,
    sort?: string,
    order?: string,
    treeId?: string,
    filters?: ProductFilters,
    facets?: string[],
    keywords?: string,
    categoryIds?: string,
    queryConfig?: PoolSearchConfig,
    requestId?: string
  ): Promise<ProductSearchResult>;

  /**
   * Search new mini products
   */
  searchNewMiniProducts(
    categoryIds?: string,
    tenant?: string,
    offset?: number,
    limit?: number,
    filters?: ProductFilters,
    facets?: string[],
    sort?: string,
    order?: string,
    treeId?: string,
    version?: string
  ): Promise<ProductSearchResult>;

  /**
   * Get products by family IDs
   * @param familyIds - Array of family IDs
   */
  getProductsByFamilyIds(familyIds: string[]): Promise<ProductItem[]>;

  /**
   * Get family tree
   * @param familyId - Family identifier
   */
  getFamilyTree(familyId: string): Promise<CategoryTreeNode>;

  /**
   * Get mini products for current user
   */
  getMiniProductsForMe(
    category: string,
    offset?: number,
    limit?: number,
    filters?: ProductFilters,
    facets?: string[],
    tenant?: string
  ): Promise<ProductSearchResult>;

  /**
   * Get customized products
   */
  getCustomizedProducts(
    category: string,
    offset?: number,
    limit?: number,
    filters?: ProductFilters,
    facets?: string[]
  ): Promise<ProductSearchResult>;

  /**
   * Get customized product by ID
   * @param productId - Product identifier
   */
  getCustomizedProduct(productId: string): Promise<ProductItem>;

  /**
   * Add customized product
   * @param productData - Product data
   */
  addCustomizedProduct(productData: CustomizedProductDTO): Promise<unknown>;

  /**
   * Add wholehouse customized product
   * @param productData - Full room data
   */
  addWholehouseCustomizedProduct(productData: CustomizedFullRoomDTO): Promise<unknown>;

  /**
   * Delete customized product
   * @param sessionId - Session identifier
   * @param productId - Product identifier
   * @param categoryType - Category type
   */
  deleteCustomizedProduct(
    sessionId: string,
    productId: string,
    categoryType?: UserDataCategoryType
  ): Promise<unknown>;

  /**
   * Delete product
   * @param productId - Product identifier
   */
  deleteProduct(productId: string): Promise<unknown>;

  /**
   * Update customized product
   */
  updateCustomizedProduct(
    sessionId: string,
    productId: string,
    updateData: Record<string, unknown>,
    categoryType?: UserDataCategoryType
  ): Promise<unknown>;

  /**
   * Get product attributes
   */
  getAttributes(): Promise<unknown[]>;

  /**
   * Get default products
   */
  getDefaultProducts(): Promise<ProductItem[]>;

  /**
   * Get model prices
   * @param modelIds - Array of model IDs
   * @param poolId - Pool identifier
   */
  getModelPrices(modelIds: string[], poolId?: string): Promise<ModelPrice[]>;

  /**
   * Update product name
   * @param productId - Product identifier
   * @param name - New product name
   */
  updateProductName(productId: string, name: string): Promise<unknown>;

  /**
   * Get parent category aggregation
   * @param categoryIds - Array of category IDs
   */
  getParentCategoryAggr(categoryIds: string[]): Promise<unknown>;
}

/**
 * Create catalog API instance
 * @param httpClient - HTTP client for REST API calls
 */
export default function createCatalogAPI(httpClient: unknown): CatalogAPI;