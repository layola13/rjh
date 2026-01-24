/**
 * ChangeNCPBackgroundWallBaseAdapter Module
 * 
 * 提供用于修改NCP(Non-Coplanar Panel)背景墙基座的适配器功能
 * 支持型材(PROFILE)和材质(MATERIAL)两种类型的更换操作
 * 
 * @module ChangeNCPBackgroundWallBaseAdapter
 * @since 697917
 */

import type { HSCatalog } from './catalog-types';
import type { HSApp } from './app-types';
import type { MenuBuilder } from './menu-builder';

/**
 * 场景类型枚举
 */
export enum SceneType {
  /** 装饰线条场景 */
  Cornice = 'Cornice',
  /** 材质场景 */
  Material = 'Material',
  /** 精装参数背景型材场景 */
  HardcoverParamsBackdropProfile = 'hardcover_params_backdrop_profile'
}

/**
 * 节点类型枚举
 */
export enum NodeType {
  /** 型材类型 */
  PROFILE = 'PROFILE',
  /** 材质类型 */
  MATERIAL = 'MATERIIAL'
}

/**
 * 装饰线条类别ID常量
 */
export const CATEGORY_IDS = {
  /** 默认装饰线条类别ID */
  DEFAULT_CORNICE: 'e8892a3a-a2d6-3b2e-a6ea-f5bece99a74e',
  /** 材质类别ID */
  DEFAULT_MATERIAL: '07acf354-2510-4b4a-a584-3b6b6bd6d72e',
  /** 材质固定返回ID */
  MATERIAL_RETURN: '20a3b3c7-e75c-4b34-ba02-aa9c0446d2dd'
} as const;

/**
 * 节点数据结构
 */
export interface NodeData {
  /** 节点类型 */
  type: NodeType;
  /** 产品唯一标识符 */
  value: string;
}

/**
 * 场景配置信息
 */
export interface SceneConfig {
  /** 场景类型 */
  sceneType: SceneType | string;
  /** 父级模型ID（可选） */
  parentModelId?: string;
  /** 实体ID（可选） */
  eId?: string;
}

/**
 * 模型搜索过滤器
 */
export interface ModelSearchFilter {
  /** 场景类型 */
  sceneType: SceneType;
}

/**
 * 自定义数据配置
 */
export interface CustomData {
  /** 类别类型数组 */
  types?: HSCatalog.CategoryTypeEnum[];
  /** 模型搜索过滤器 */
  modelSearchFilter?: ModelSearchFilter;
}

/**
 * 查询参数
 */
export interface QueryParams {
  /** 类别ID */
  categoryId: string;
  /** 产品唯一标识 */
  seekId: string;
}

/**
 * 自定义标签页配置
 */
export interface CustomizedTab {
  /** 标签页ID */
  id: string;
  /** 标签页名称 */
  name: string;
  /** 其他配置项 */
  [key: string]: unknown;
}

/**
 * 目录配置选项
 */
export interface CatalogConfig {
  /** 类别类型数组（可选） */
  types?: HSCatalog.CategoryTypeEnum[];
  /** 场景类型 */
  sceneType: SceneType | string;
  /** 自定义数据 */
  mydata?: CustomData;
  /** 客户自定义类别 */
  customerCategories: string[];
  /** 查询参数（可选） */
  query?: QueryParams;
  /** 自定义标签页数据 */
  customizedTabs: CustomizedTab[];
  /** 是否禁用过滤（可选） */
  notFilter?: boolean;
  /** 父级模型ID（可选） */
  parentModelId?: string;
  /** 实体ID（可选） */
  eId?: string;
}

/**
 * 值变更请求数据
 */
export interface ValueChangeRequest {
  /** 目标节点 */
  node: NodeData;
  /** 新的产品标识值 */
  newValue: string;
}

/**
 * 事务管理器接口
 */
export interface TransactionManager {
  /**
   * 创建请求对象
   * @param requestType - 请求类型
   * @param args - 请求参数
   * @returns 请求对象
   */
  createRequest(requestType: string, args: unknown[]): TransactionRequest;
  
  /**
   * 提交事务
   * @param request - 请求对象
   */
  commit(request: TransactionRequest): void;
}

/**
 * 事务请求对象
 */
export interface TransactionRequest {
  /**
   * 接收事件处理
   * @param eventName - 事件名称
   * @param data - 事件数据
   */
  receive(eventName: string, data: unknown): void;
}

/**
 * 产品选择上下文
 */
export interface ProductSelectionContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 产品数据
 */
export interface Product {
  /** 产品唯一标识 */
  seekId: string;
  /** 产品名称（可选） */
  name?: string;
  /** 产品类别（可选） */
  categories?: string[];
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 产品选择处理器
 * 
 * @param product - 选中的产品数据
 * @param context - 产品选择上下文
 * @returns Promise，完成后无返回值
 */
export type ProductSelectedHandler = (
  product: Product,
  context: ProductSelectionContext
) => Promise<void>;

/**
 * 事件处理器配置
 */
export interface EventHandlers {
  /** 产品选择事件处理器 */
  productSelectedHandler: ProductSelectedHandler;
}

/**
 * 适配器返回值类型（型材类型）
 */
export type ProfileAdapterResult = [
  catalogConfig: CatalogConfig,
  eventHandlers: EventHandlers
];

/**
 * 适配器返回值类型（材质类型）
 */
export type MaterialAdapterResult = [
  catalogConfig: CatalogConfig,
  eventHandlers: EventHandlers,
  materialReturnId: string
];

/**
 * 适配器输入参数
 */
export type AdapterInput = [
  appInstance: unknown,
  nodeData: NodeData,
  sceneConfig: SceneConfig
];

/**
 * ChangeNCPBackgroundWallBaseAdapter 主函数
 * 
 * 根据节点类型（型材或材质）生成相应的目录配置和事件处理器
 * 
 * @param input - 包含应用实例、节点数据和场景配置的数组
 * @returns 对于型材类型返回[配置, 处理器]；对于材质类型返回[配置, 处理器, 固定ID]
 * 
 * @example
 *