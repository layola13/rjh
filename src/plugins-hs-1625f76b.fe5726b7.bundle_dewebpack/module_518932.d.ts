/**
 * 产品数据转换模块
 * @module ProductMiniTransformer
 */

/**
 * 产品变体信息
 */
interface ProductVariation {
  /** 变体ID */
  id: string;
  /** 变体名称 */
  name: string;
  /** 其他变体属性 */
  [key: string]: unknown;
}

/**
 * 图片尺寸信息
 */
interface ImageResized {
  /** 图片URL */
  url: string;
  /** 图片宽度 */
  width: number;
  /** 图片高度 */
  height: number;
}

/**
 * 产品其他信息
 */
interface ProductOtherInfo {
  /** 是否可定制 */
  canCustomized?: string;
  /** 其他额外信息 */
  [key: string]: unknown;
}

/**
 * 产品包围盒尺寸
 */
interface BoundingBox {
  /** 长度 */
  length: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 产品分类信息
 */
interface ProductCategory {
  /** 分类ID */
  id: string;
  /** 分类名称 */
  name: string;
}

/**
 * 产品单位信息
 */
interface ProductUnit {
  /** 单位名称 */
  name: string;
  /** 单位符号 */
  symbol: string;
}

/**
 * 完整产品数据（输入）
 */
interface FullProductData {
  /** 模型ID */
  modelId: string;
  /** 产品名称 */
  name: string;
  /** 产品描述 */
  description: string;
  /** 调整尺寸后的图片列表 */
  imagesResize?: ImageResized[];
  /** 渲染图片URL */
  renderImage?: string;
  /** 产品SKU */
  sku: string;
  /** 产品变体列表 */
  variations?: ProductVariation[];
  /** 产品状态 */
  status: string;
  /** 产品包围盒 */
  boundingBox?: BoundingBox;
  /** 后处理状态 */
  postProcessingStatus: string;
  /** 品牌ID */
  brandId: string;
  /** 品牌Logo URL */
  brandLogo: string;
  /** 供应商名称 */
  vendor: string;
  /** 内容类型 */
  contentType: string;
  /** 单位信息 */
  unit?: ProductUnit;
  /** 是否用户上传 */
  isUserUpload: boolean;
  /** 其他信息 */
  otherInfo?: ProductOtherInfo;
  /** 产品分类列表 */
  categories?: ProductCategory[];
}

/**
 * 精简产品数据（输出）
 */
interface ProductMiniData {
  /** 产品ID */
  id: string;
  /** 产品名称 */
  name: string;
  /** 产品描述 */
  description: string;
  /** 大图URL */
  image: string;
  /** 调整尺寸后的图片 */
  imageResized?: ImageResized;
  /** 渲染图片URL */
  renderImage?: string;
  /** 产品SKU */
  sku: string;
  /** 精简变体列表 */
  variations: unknown[];
  /** 产品状态 */
  status: string;
  /** 产品包围盒 */
  boundingBox?: BoundingBox;
  /** 后处理状态 */
  postProcessingStatus: string;
  /** 供应商ID */
  vendorId: string;
  /** 供应商URL */
  vendorUrl: string;
  /** 供应商名称 */
  vendor: string;
  /** 产品类型枚举值 */
  productType: number;
  /** 内容类型对象 */
  contentType: HSCatalog.ContentType;
  /** 单位信息 */
  unit?: ProductUnit;
  /** 是否为精简产品标识 */
  isMiniProduct: true;
  /** 是否用户数据 */
  isUserData: boolean;
  /** 是否可定制 */
  canCustomized: boolean;
  /** 产品分类列表 */
  categories?: ProductCategory[];
  /** 是否显示收藏 */
  showfavorite: true;
  /** 唯一标识UUID */
  uuid: string;
}

/**
 * HSCatalog命名空间声明
 */
declare namespace HSCatalog {
  /**
   * 内容类型枚举
   */
  enum ContentTypeEnum {
    /** 未知类型 */
    Unknown = 0,
    /** 材质类型 */
    Material = 1,
  }

  /**
   * 产品类型枚举
   */
  enum ProductTypeEnum {
    /** 材质类型产品 */
    Material = 1,
  }

  /**
   * 内容类型类
   */
  class ContentType {
    /**
     * 构造函数
     * @param type - 内容类型字符串或枚举值
     */
    constructor(type: string | ContentTypeEnum);

    /**
     * 判断是否为指定类型
     * @param typeEnum - 内容类型枚举值
     * @returns 是否匹配
     */
    isTypeOf(typeEnum: ContentTypeEnum): boolean;
  }

  /**
   * 工具类
   */
  class Util {
    /**
     * 获取产品类型
     * @param product - 产品数据
     * @param contentType - 内容类型对象
     * @returns 产品类型枚举值
     */
    static getProductType(
      product: FullProductData,
      contentType: ContentType
    ): ProductTypeEnum;
  }
}

/**
 * UUID工具类
 */
declare class UUIDUtil {
  /**
   * 生成UUID
   * @returns 唯一标识字符串
   */
  static uuid(): string;
}

/**
 * 基础转换器抽象类
 */
declare abstract class BaseTransformer {
  /**
   * 转换单位信息
   * @param unit - 单位数据
   * @returns 转换后的单位对象
   */
  protected _toUnit(unit?: ProductUnit): ProductUnit | undefined;

  /**
   * 转换变体为精简格式
   * @param variations - 变体列表
   * @returns 精简变体列表
   */
  protected _toVariationMini(variations?: ProductVariation[]): unknown[];
}

/**
 * 产品精简数据转换器
 * 用于将完整产品数据转换为精简格式，适用于列表展示等场景
 */
export default class ProductMiniTransformer extends BaseTransformer {
  /**
   * 将完整产品数据转换为精简格式
   * @param product - 完整产品数据
   * @returns 精简产品数据对象
   * @description
   * 该方法执行以下转换：
   * 1. 判断产品是否可定制
   * 2. 解析内容类型和产品类型
   * 3. 对未知类型的材质产品进行类型修正
   * 4. 提取和转换核心字段
   * 5. 生成唯一UUID标识
   */
  protected _toProductMini(product: FullProductData): ProductMiniData;

  /**
   * 将调整尺寸后的图片列表转换为大图URL
   * @param imagesResize - 图片列表
   * @returns 大图URL，如果输入为空则返回空字符串
   * @description
   * 从第一张图片URL中移除"resized"路径段，并替换为"iso.jpg"
   */
  protected _toLargeImage(imagesResize?: ImageResized[]): string;
}