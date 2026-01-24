/**
 * 用户上传模型后处理器
 * 处理用户上传的装配体模型的后处理状态、缩略图和上下文菜单
 */

import { CatalogPlugin } from './catalog-plugin';
import { ProductData, MiniProductData, ContextMenu } from './product-types';

/**
 * 后处理状态枚举
 */
export enum PostProcessingStatus {
  /** 处理成功 */
  Success = 'value-postProcessingStatus-success',
  /** 处理失败 */
  Failed = 'value-postProcessingStatus-failed',
  /** 处理中或其他状态 */
  Processing = 'value-postProcessingStatus-processing'
}

/**
 * 产品属性接口
 */
interface ProductAttribute {
  /** 属性ID */
  id: string;
  /** 属性值列表 */
  values: Array<{ id: string; [key: string]: unknown }>;
}

/**
 * 目录产品信息接口
 */
interface CatalogProduct {
  /** 产品类型 */
  productType: HSCatalog.ProductTypeEnum;
  /** 是否用户上传 */
  isUserUpload: boolean;
  /** 产品属性列表 */
  attributes?: ProductAttribute[];
  /** 后处理状态 */
  postProcessingStatus?: string;
  /** 产品ID */
  id: string;
  /** 阿里模型ID */
  aliModelId: string;
}

/**
 * 处理结果接口
 */
interface ProcessedProductData extends ProductData {
  /** 后处理状态 */
  postProcessingStatus?: string;
  /** 缩略图URL */
  thumbnail?: string;
  /** 产品状态 */
  status: number;
  /** 上下文菜单配置 */
  contextmenu?: ContextMenu;
}

/**
 * 处理结果（精简版）接口
 */
interface ProcessedMiniProductData extends MiniProductData {
  /** 图片URL */
  image?: string;
  /** 缩略图URL */
  imageResized?: string;
  /** 产品状态 */
  status: number;
  /** 上下文菜单配置 */
  contextmenu?: ContextMenu;
}

/**
 * 模型删除检查结果
 */
interface ModelDeleteCheckResult {
  /** 是否可以删除 */
  result: boolean;
}

/**
 * 用户上传模型后处理器配置
 */
interface UserUploadModelProcessorConfig {
  /** 目录插件实例 */
  catalogPlugin: CatalogPlugin;
  /** 编辑按钮点击回调 */
  onClickEdit?: (product: CatalogProduct) => void;
}

/**
 * 用户上传模型后处理器类
 * 负责处理用户上传的装配体模型的状态、缩略图和上下文菜单
 */
declare class UserUploadModelProcessor {
  private readonly _catalogPlugin: CatalogPlugin;
  private readonly _onClickEdit?: (product: CatalogProduct) => void;
  private _sessionKey?: string;

  constructor(config: UserUploadModelProcessorConfig);

  /**
   * 处理产品数据
   * 为用户上传的装配体添加后处理状态、缩略图和上下文菜单
   * 
   * @param productData - 原始产品数据
   * @param catalogProduct - 目录产品信息
   * @returns 处理后的产品数据
   */
  process(
    productData: ProductData,
    catalogProduct: CatalogProduct
  ): ProcessedProductData;

  /**
   * 精简处理产品数据
   * 仅处理图片和状态信息，用于列表视图等场景
   * 
   * @param miniProductData - 原始精简产品数据
   * @param catalogProduct - 目录产品信息
   * @returns 处理后的精简产品数据
   */
  miniProcess(
    miniProductData: MiniProductData,
    catalogProduct: CatalogProduct
  ): ProcessedMiniProductData;

  /**
   * 删除模型
   * 显示加载提示，调用目录插件删除产品，并显示结果提示
   * 
   * @param productId - 产品ID
   * @private
   */
  private _deleteModel(productId: string): void;

  /**
   * 更新产品的上下文菜单
   * 添加重命名和删除操作
   * 
   * @param productData - 产品数据
   * @param catalogProduct - 目录产品信息
   * @private
   */
  private _updateContextMenu(
    productData: ProductData | MiniProductData,
    catalogProduct: CatalogProduct
  ): void;
}

export default UserUploadModelProcessor;