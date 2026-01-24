/**
 * 灵感图片搜索与识别模块
 * 提供图片识别、分类获取和商品数据检索功能
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * 商品查询参数接口
 */
interface GetDataParams {
  /** 请求ID，用于追踪请求 */
  requestId?: string;
  /** 返回结果数量限制 */
  limit?: number;
  /** 其他查询参数 */
  [key: string]: unknown;
}

/**
 * 图片搜索参数接口
 */
interface ImageSearchParams {
  /** 图片URL地址 */
  imgUrl: string;
  /** 图片分类 */
  category: string;
  /** 边界框字符串，用于指定图片识别区域 */
  boxStr: string;
  /** 请求ID */
  requestId: string;
}

/**
 * MTOP API响应接口
 */
interface MtopResponse<T = unknown> {
  /** 返回状态码数组 */
  ret?: string[];
  /** 响应数据 */
  data?: T;
}

/**
 * MTOP API调用接口
 */
interface MtopApiMethod {
  (params: { data: unknown }, callback?: unknown): Promise<MtopResponse>;
  (): Promise<MtopResponse>;
}

/**
 * 全局HSApp命名空间
 */
declare global {
  const HSApp: {
    Catalog: {
      Manager: {
        getHSCatalogLib(): {
          ProductDatabase: {
            getProducts(
              params: GetDataParams,
              searchFn: typeof inspirationImageSearch,
              builder: (data: unknown) => unknown
            ): Promise<unknown>;
          };
        };
      };
    };
  };

  const NWTK: {
    mtop: {
      Catalog: {
        InspirationImageSearch: MtopApiMethod;
        getInspirationImageRecognizeCategory: MtopApiMethod;
        InspirationImageRecognize: MtopApiMethod;
      };
    };
  };
}

/**
 * 商品构建器类
 * 用于处理和构造商品数据
 */
declare class ProductBuilder {
  productBuilder(data: unknown): unknown;
}

/**
 * 通用MTOP请求包装器
 * @param apiMethod - MTOP API方法
 * @param params - 请求参数（可选）
 * @returns 返回处理后的数据或拒绝的Promise
 */
declare function mtopRequestWrapper<T>(
  apiMethod: MtopApiMethod,
  params?: { data: unknown }
): Promise<T>;

/**
 * 获取商品数据
 * @param params - 查询参数
 * @returns 商品数据Promise
 */
export declare function getData(params: GetDataParams): Promise<unknown>;

/**
 * 灵感图片搜索
 * 根据图片URL、分类和边界框进行商品搜索
 * @param params - 图片搜索参数
 * @returns 搜索结果Promise
 */
export declare function inspirationImageSearch(
  params: ImageSearchParams
): Promise<unknown>;

/**
 * 获取灵感图片识别分类列表
 * @returns 分类数据Promise
 */
export declare function getInspirationImageRecognizeCategory(): Promise<unknown>;

/**
 * 识别图片内容
 * @param imgUrl - 图片URL地址
 * @returns 识别结果Promise
 */
export declare function recognizeImage(imgUrl: string): Promise<unknown>;