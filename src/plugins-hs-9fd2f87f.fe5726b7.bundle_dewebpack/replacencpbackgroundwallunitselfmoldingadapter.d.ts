/**
 * 模块：ReplaceNCPBackgroundWallUnitSelfMoldingAdapter
 * 原始模块ID: 805360
 * 用途：处理NCP背景墙单元自定义线条替换的适配器
 */

import { HSCatalog } from './catalog-types';
import { HSApp } from './app-types';
import { Line3d, Coordinate3 } from './geometry-types';
import { MenuBuilder } from './menu-builder-types';

/**
 * 线条类型
 */
type MoldingType = 'profile' | 'material';

/**
 * 线条位置类型
 */
type MoldingPosition = 'left' | 'right';

/**
 * 目录查询参数
 */
interface CatalogQuery {
  /** 分类ID */
  categoryId: string;
  /** 搜索ID */
  seekId: string;
}

/**
 * 材质数据接口
 */
interface MaterialData {
  [key: string]: unknown;
}

/**
 * 属性接口
 */
interface Attribute {
  /** 属性ID */
  id: string;
  /** 自由值数组 */
  free: string[];
}

/**
 * 元数据接口
 */
interface Metadata {
  /** 搜索ID */
  seekId: string;
  /** 分类列表 */
  categories: string[];
  /** 属性列表 */
  attributes: Attribute[];
  /** 轮廓高度（Y方向尺寸） */
  profileSizeY?: number;
  /** 轮廓宽度（X方向尺寸） */
  profileSizeX?: number;
}

/**
 * 输入参数接口
 */
interface InputParameters {
  /** 材质数据 */
  materialData: MaterialData;
}

/**
 * 单元数据接口
 */
interface UnitData {
  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
  /** Z方向尺寸 */
  ZSize: number;
}

/**
 * 输入配置接口
 */
interface InputConfig {
  /** 元数据 */
  metadata: Metadata;
  /** 线条ID */
  moldingId: string;
  /** 输入参数 */
  parameters: InputParameters;
}

/**
 * 模型搜索过滤器
 */
interface ModelSearchFilter {
  /** 场景类型 */
  sceneType: string;
}

/**
 * 自定义数据
 */
interface CustomData {
  /** 分类类型列表 */
  types?: HSCatalog.CategoryTypeEnum[];
  /** 模型搜索过滤器 */
  modelSearchFilter: ModelSearchFilter;
}

/**
 * 目录配置接口
 */
interface CatalogConfig {
  /** 分类类型列表 */
  types?: HSCatalog.CategoryTypeEnum[];
  /** 场景类型 */
  sceneType: string;
  /** 自定义数据 */
  mydata: CustomData;
  /** 客户分类 */
  customerCategories: string[];
  /** 查询参数 */
  query?: CatalogQuery;
  /** 自定义标签页 */
  customizedTabs?: unknown;
  /** 不过滤标志 */
  notFilter?: boolean;
}

/**
 * 线条信息接口
 */
interface MoldingInfo {
  /** 坐标系统 */
  coord: Coordinate3;
  /** 面标签 */
  faceTag: string;
  /** 翻转标志 */
  flip: boolean;
  /** X轴翻转 */
  flipX: boolean;
  /** Y轴翻转 */
  flipY: boolean;
  /** X轴偏移 */
  offsetX: number;
  /** Y轴偏移 */
  offsetY: number;
  /** 路径数组 */
  path: Line3d[];
  /** 轮廓高度 */
  profileHeight: number;
  /** 轮廓宽度 */
  profileWidth: number;
  /** 材质数据 */
  materialData: MaterialData;
  /** 自定义线条类型 */
  selfMoldingType: MoldingPosition;
  /** 偏移量 */
  offset: number;
}

/**
 * 线条替换参数
 */
interface MoldingReplaceParams {
  /** 线条信息 */
  moldingInfo: MoldingInfo;
  /** 线条类型 */
  moldingType: MoldingPosition;
  /** 元数据 */
  meta: Metadata | unknown;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /** 创建请求 */
  createRequest(type: string, params: unknown[]): unknown;
  /** 提交事务 */
  commit(request: unknown): void;
}

/**
 * 产品选择上下文
 */
interface ProductSelectionContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 产品选择处理器类型
 */
type ProductSelectedHandler = (
  product: unknown,
  context: ProductSelectionContext
) => Promise<void>;

/**
 * 处理器配置接口
 */
interface HandlerConfig {
  /** 产品选择处理器 */
  productSelectedHandler: ProductSelectedHandler;
}

/**
 * ReplaceNCPBackgroundWallUnitSelfMoldingAdapter 适配器函数
 * 
 * @param params - 包含单元数据、线条类型和配置的参数数组
 * @returns 目录配置、处理器配置，以及可选的材质ID
 * 
 * @example
 * const result = ReplaceNCPBackgroundWallUnitSelfMoldingAdapter([unitData, 'profile', config]);
 */
export declare function ReplaceNCPBackgroundWallUnitSelfMoldingAdapter(
  params: [UnitData, MoldingType, InputConfig]
): [CatalogConfig, HandlerConfig] | [CatalogConfig, HandlerConfig, string];