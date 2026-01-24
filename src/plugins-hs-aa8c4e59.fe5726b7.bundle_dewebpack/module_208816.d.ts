/**
 * BOM (Bill of Materials) 数据生成和管理模块
 * 提供注册提供者、收集数据、生成 BOM 数据和 SeekMate 映射的功能
 */

import { BomData } from './BomData';
import { BomConfig } from './BomConfig';

/**
 * 业务类型标识
 */
export interface BusinessType {
  /** 主类型 */
  type: string;
  /** 子类型 */
  subType: string;
}

/**
 * 实体数据接口
 */
export interface Entity {
  [key: string]: unknown;
}

/**
 * BOM 数据提供者接口
 */
export interface BomDataProvider {
  /**
   * 收集实体数据
   * @param context - 上下文对象
   * @returns 实体数组或 Promise
   */
  collectEntity(context: unknown): Entity[] | Promise<Entity[]>;

  /**
   * 收集 Seek ID（可选）
   * @param data - 输入数据
   * @returns Seek ID 数组
   */
  collectSeekIds?(data: unknown): string[];
}

/**
 * 业务实体集合
 */
export interface BusinessEntities {
  /** 业务类型 */
  businessType: BusinessType;
  /** 实体列表 */
  entities: Entity[];
}

/**
 * SeekMate 数据处理器类型
 */
export type SeekMateDataHandler = (seekIds: string[]) => Promise<Map<string, unknown>>;

/**
 * 组合提供者配置
 */
interface CombineProvider {
  /** 业务类型 */
  businessType: BusinessType;
  /** 数据提供者 */
  provider: BomDataProvider;
}

/**
 * BOM 管理器类
 * 负责注册和管理 BOM 数据提供者
 */
declare class BomManager {
  /** 已注册的提供者列表 */
  private combineProviders: CombineProvider[];
  
  /** SeekMate 数据处理器 */
  private getSeekMateHandler?: SeekMateDataHandler;

  /**
   * 注册 BOM 数据提供者
   * @param businessType - 业务类型
   * @param provider - 数据提供者实例
   */
  registerProvider(businessType: BusinessType, provider: BomDataProvider): void;

  /**
   * 注册 SeekMate 数据处理器
   * @param handler - 数据处理函数
   */
  registerSeekMateDataHandle(handler: SeekMateDataHandler): void;

  /**
   * 收集所有已注册提供者的数据
   * @param context - 上下文对象
   * @returns Promise 返回业务实体集合数组
   */
  private collectData(context: unknown): Promise<BusinessEntities[]>;

  /**
   * 生成 SeekMate 映射
   * @param data - 输入数据
   * @returns Promise 返回 SeekMate 映射
   */
  generateSeekMateMap(data: unknown): Promise<Map<string, unknown>>;

  /**
   * 生成 BOM 数据对象
   * @param context - 上下文对象
   * @returns Promise 返回 BomData 实例
   */
  generateBomData(context: unknown): Promise<BomData>;
}

/**
 * 生成 BOM 数据
 * @param context - 上下文对象
 * @returns Promise 返回 BomData 实例
 */
export declare function generateBomData(context: unknown): Promise<BomData>;

/**
 * 生成 SeekMate 映射
 * @param data - 输入数据
 * @returns Promise 返回 SeekMate 映射
 */
export declare function generateSeekMateMap(data: unknown): Promise<Map<string, unknown>>;

/**
 * 注册 BOM 数据提供者
 * @param businessType - 业务类型标识
 * @param provider - 数据提供者实例
 */
export declare function registerProvider(
  businessType: BusinessType,
  provider: BomDataProvider
): void;

/**
 * 注册 SeekMate 数据处理器
 * @param handler - 数据处理函数
 */
export declare function registerSeekMateDataHandle(handler: SeekMateDataHandler): void;