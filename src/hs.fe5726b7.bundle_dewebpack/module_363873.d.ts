/**
 * 产品构建器模块
 * 用于将原始产品数据转换为标准化的产品模型
 */

declare module 'product-builder' {
  import { HSCatalog, HSCore } from 'hs-types';

  /**
   * 产品数据处理器函数签名
   * @param processedProduct - 已处理的产品数据
   * @param originalProduct - 原始产品数据
   */
  type ProductDataProcessor = (
    processedProduct: ProductMini,
    originalProduct: Product
  ) => void;

  /**
   * 边界框尺寸信息
   */
  interface BoundingBox {
    /** X轴长度 */
    xLen: number;
    /** Y轴长度 */
    yLen: number;
    /** Z轴长度 */
    zLen: number;
  }

  /**
   * 瓷砖尺寸
   */
  interface TileSize {
    /** X方向尺寸 */
    x: number;
    /** Y方向尺寸 */
    y: number;
  }

  /**
   * 颜色信息
   */
  interface ColorInfo {
    /** 颜色编号 */
    colorNumber?: string;
    /** 颜色组 */
    colorGroup?: string;
    /** 显示名称 */
    displayName?: string;
  }

  /**
   * 价格信息项
   */
  interface PriceItem {
    /** 价格值 */
    price: string;
  }

  /**
   * 其他产品信息
   */
  interface OtherInfo {
    /** 是否可定制 */
    canCustomized?: string;
    /** 多面类型 */
    multifacetType?: string;
  }

  /**
   * 变体信息
   */
  interface Variation {
    /** 变体ID */
    id: string;
    /** 变体名称 */
    name: string;
    /** 变体描述 */
    description?: string;
    /** 变体图片 */
    image: string;
    /** SKU编号 */
    sku?: string;
    /** 边界框 */
    boundingBox?: BoundingBox;
  }

  /**
   * 简化的变体信息
   */
  interface VariationMini {
    /** 变体ID */
    id: string;
    /** 变体名称 */
    name: string;
    /** 变体描述 */
    description?: string;
    /** 变体图片 */
    image: string;
    /** SKU编号 */
    sku?: string;
    /** 边界框 */
    boundingBox?: BoundingBox;
  }

  /**
   * 右键菜单项
   */
  interface ContextMenuItem {
    /** 菜单项ID */
    id: string;
    /** 原始点击处理函数 */
    onclick?: (product: Product) => void;
    /** 包装后的点击处理函数 */
    onclickItem?: (product: Product) => void;
  }

  /**
   * 右键菜单配置
   */
  interface ContextMenu {
    /** 菜单项列表 */
    items?: ContextMenuItem[];
  }

  /**
   * 原始产品数据
   */
  interface Product {
    /** 产品ID */
    id: string;
    /** 产品名称 */
    name: string;
    /** 产品图片 */
    image: string;
    /** 产品图片列表 */
    images?: string[];
    /** 缩略图 */
    thumbnail?: string;
    /** 俯视图 */
    aerialViewImage?: string;
    /** 边界框 */
    boundingBox?: BoundingBox;
    /** 单位 */
    unit?: string;
    /** 内容类型 */
    contentType?: string;
    /** 变体列表 */
    variations?: Variation[];
    /** 颜色信息 */
    color?: ColorInfo;
    /** 瓷砖尺寸 */
    tileSize?: TileSize;
    /** 其他信息 */
    otherInfo?: OtherInfo;
    /** 价格列表 */
    prices?: PriceItem[];
    /** 右键菜单 */
    contextmenu?: ContextMenu;
  }

  /**
   * 处理后的产品数据（精简版）
   */
  interface ProductMini extends Omit<Product, 'aerialViewImage' | 'variations' | 'unit' | 'contentType'> {
    /** 俯视图（重命名） */
    imageAerial?: string;
    /** 产品类型 */
    productType: HSCatalog.ProductTypeEnum;
    /** 内容类型对象 */
    contentType: HSCatalog.ContentType;
    /** 单位（标准化） */
    unit: string;
    /** 简化的变体列表 */
    variations?: VariationMini[];
    /** X轴长度（米） */
    XLength?: number;
    /** Y轴长度（米） */
    YLength?: number;
    /** Z轴长度（米） */
    ZLength?: number;
    /** 颜色值（数字） */
    color?: number;
    /** 颜色样式（十六进制） */
    colorStyle?: string;
    /** 颜色编号 */
    colorNumber?: string;
    /** 颜色组 */
    colorGroup?: string;
    /** 显示名称 */
    displayName?: string;
    /** 瓷砖X方向尺寸（米） */
    tileSize_x?: number;
    /** 瓷砖Y方向尺寸（米） */
    tileSize_y?: number;
    /** 是否多面 */
    multifacet?: boolean;
    /** 是否可定制 */
    canCustomized?: boolean;
  }

  /**
   * 产品构建器类
   * 负责将原始产品数据转换为标准化的产品模型，
   * 支持多种产品类型和数据处理流程
   */
  export default class ProductBuilder {
    /** 静态实例缓存 */
    private static productBuilder?: ProductBuilder;

    /** 数据处理器列表 */
    private processors: ProductDataProcessor[];

    /**
     * 构造函数
     * 初始化空的处理器列表
     */
    constructor();

    /**
     * 获取单例实例
     * @returns 产品构建器实例
     */
    static getInstance(): ProductBuilder;

    /**
     * 构建产品数据
     * 根据产品类型执行不同的数据转换逻辑
     * @param product - 原始产品数据
     * @returns 处理后的产品数据
     */
    build(product: Product): ProductMini;

    /**
     * 添加产品数据处理器
     * 处理器将在build过程中按顺序执行
     * @param processor - 数据处理器函数
     */
    addProcessedDataProcessor(processor: ProductDataProcessor): void;

    /**
     * 执行所有已注册的数据处理器
     * @param processedProduct - 已处理的产品数据
     * @param originalProduct - 原始产品数据
     * @private
     */
    private _executeProcessors(
      processedProduct: ProductMini,
      originalProduct: Product
    ): void;

    /**
     * 处理右键菜单配置
     * 包装菜单项的点击事件，确保传递完整的产品数据
     * @param product - 产品数据
     * @private
     */
    private _handleContextMenu(product: ProductMini): void;

    /**
     * 转换为精简产品数据
     * 重命名字段并标准化数据结构
     * @param product - 原始产品数据
     * @returns 精简产品数据
     * @private
     */
    private _toProductMini(product: Product): ProductMini;

    /**
     * 转换内容类型
     * 将字符串类型转换为ContentType对象，并处理未知类型
     * @param product - 产品数据
     * @returns 内容类型对象
     */
    toContentType(product: Product): HSCatalog.ContentType;

    /**
     * 转换变体列表
     * 提取变体的关键字段
     * @param variations - 原始变体列表
     * @returns 精简的变体列表
     * @private
     */
    private _toVariationMini(variations?: Variation[]): VariationMini[] | undefined;

    /**
     * 标准化单位
     * 如果未指定单位，默认返回"cm"
     * @param unit - 原始单位
     * @returns 标准化的单位
     * @private
     */
    private _toUnit(unit?: string): string;

    /**
     * 转换X轴长度为米
     * @param boundingBox - 边界框数据
     * @param unit - 单位
     * @returns X轴长度（米）
     * @private
     */
    private _toXLength(boundingBox?: BoundingBox, unit?: string): number;

    /**
     * 转换Y轴长度为米
     * @param boundingBox - 边界框数据
     * @param unit - 单位
     * @returns Y轴长度（米）
     * @private
     */
    private _toYLength(boundingBox?: BoundingBox, unit?: string): number;

    /**
     * 转换Z轴长度为米
     * @param boundingBox - 边界框数据
     * @param unit - 单位
     * @returns Z轴长度（米）
     * @private
     */
    private _toZLength(boundingBox?: BoundingBox, unit?: string): number;

    /**
     * 转换瓷砖X方向尺寸为米
     * @param tileSize - 瓷砖尺寸数据
     * @param unit - 单位
     * @returns X方向尺寸（米）
     * @private
     */
    private _toTileSize_x(tileSize?: TileSize, unit?: string): number | undefined;

    /**
     * 转换瓷砖Y方向尺寸为米
     * @param tileSize - 瓷砖尺寸数据
     * @param unit - 单位
     * @returns Y方向尺寸（米）
     * @private
     */
    private _toTileSize_y(tileSize?: TileSize, unit?: string): number | undefined;

    /**
     * 提取价格信息
     * 从价格列表中获取第一个价格并格式化为两位小数
     * @param prices - 价格列表
     * @returns 格式化的价格字符串
     * @private
     */
    private _toPrice(prices?: PriceItem[]): string | undefined;
  }

  /**
   * 产品类型枚举常量
   */
  const PRODUCT_TYPE_ASSEMBLY = 'PAssembly';
  const PRODUCT_TYPE_ASSEMBLY_PACKAGE = 'PAssemblyPackage';
  const PRODUCT_TYPE_MODEL = 'Model';
  const PRODUCT_TYPE_PROFILE = 'Profile';
  const PRODUCT_TYPE_MATERIAL = 'Material';
  const PRODUCT_TYPE_STYLER_TEMPLATE = 'StylerTemplate';
  const PRODUCT_TYPE_FULL_ROOM = 'FullRoom';

  /**
   * 内容类型枚举常量
   */
  const CONTENT_TYPE_PAINT = 'Paint';
  const CONTENT_TYPE_SEAMFILLER = 'ext_all_seamfiller';
  const CONTENT_TYPE_MATERIAL = 'Material';
  const CONTENT_TYPE_UNKNOWN = 'Unknown';
}