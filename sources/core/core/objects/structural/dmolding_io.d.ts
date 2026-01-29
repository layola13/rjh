/**
 * DMolding模块 - 定制成型产品类型定义
 * @module DMolding_IO
 */

import type { Content, Content_IO } from './Content';
import type { Entity } from './Entity';
import type { Material } from './Material';
import type { Face } from './Face';
import type { Vec2 } from './Math';

/**
 * 序列化上下文配置
 */
export interface ISerializationContext {
  /** 产品映射表 */
  productsMap?: Map<string, IProductMetadata>;
  [key: string]: unknown;
}

/**
 * 产品元数据接口
 */
export interface IProductMetadata {
  /** 产品唯一标识 */
  seekId?: string;
  [key: string]: unknown;
}

/**
 * 定制内容类型枚举
 */
export type CustomizationContentType = string[];

/**
 * 路径点集合（二维坐标数组的数组）
 */
export type MoldingPaths = Vec2[][];

/**
 * 序列化数据结构
 */
export interface IDMoldingDumpData {
  /** 产品搜索ID */
  seekId?: string;
  /** 本地唯一ID */
  localId?: string;
  /** 实体名称 */
  name?: string;
  /** 定制内容类型列表 */
  customizationContentType?: CustomizationContentType;
  /** 是否为功能组件 */
  isFunctionComponent?: boolean;
  /** IModel父级ID */
  imodelParentId?: string;
  /** 固定系数K */
  fixK?: number;
  /** 固定系数S */
  fixS?: number;
  /** X方向尺寸 */
  XSize?: number;
  /** Y方向尺寸 */
  YSize?: number;
  /** 路径数据 */
  paths?: MoldingPaths;
  /** 主ID */
  masterId?: string;
  /** 材质引用 */
  material?: string | number;
  [key: string]: unknown;
}

/**
 * 更新参数接口
 */
export interface IDMoldingUpdateParams {
  /** 新的路径数据 */
  paths?: MoldingPaths;
  /** 新的材质 */
  material?: Material;
}

/**
 * 序列化回调函数类型
 */
export type DumpCallback = (
  dumpData: IDMoldingDumpData[],
  entity: DMolding
) => void;

/**
 * DMolding序列化/反序列化处理器
 * 负责DMolding实体的持久化与恢复
 */
export declare class DMolding_IO extends Content_IO {
  /**
   * 获取单例实例
   */
  static instance(): DMolding_IO;

  /**
   * 序列化DMolding实体
   * @param entity - 要序列化的实体
   * @param callback - 序列化后的回调函数
   * @param includeMetadata - 是否包含元数据（默认true）
   * @param options - 额外的序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: DMolding,
    callback?: DumpCallback,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): IDMoldingDumpData[];

  /**
   * 反序列化DMolding实体
   * @param entity - 目标实体实例
   * @param data - 序列化数据
   * @param context - 反序列化上下文
   */
  load(
    entity: DMolding,
    data: IDMoldingDumpData,
    context: ISerializationContext
  ): void;
}

/**
 * DMolding实体类 - 表示定制成型产品
 * 支持路径定义、材质配置、空间验证等功能
 */
export declare class DMolding extends Content {
  /**
   * 构造函数
   * @param id - 实体ID（可选）
   * @param parent - 父级实体（可选）
   */
  constructor(id?: string, parent?: Entity | undefined);

  /**
   * 创建DMolding实例的工厂方法
   * @param metadata - 产品元数据
   * @returns 新创建的DMolding实例
   */
  static create(metadata: IProductMetadata): DMolding;

  // ==================== 属性 ====================

  /**
   * 产品搜索ID
   */
  seekId: string;

  /**
   * 本地唯一标识符
   */
  localId: string;

  /**
   * 产品元数据
   */
  metadata: IProductMetadata;

  /**
   * 路径数据集合（二维坐标数组）
   */
  paths: MoldingPaths;

  /**
   * 主模板ID
   */
  masterId: string;

  /**
   * 定制内容类型列表
   */
  customizationContentType: CustomizationContentType;

  /**
   * 是否为功能组件
   */
  isFunctionComponent: boolean;

  /**
   * IModel父级实体ID
   */
  imodelParentId: string;

  /**
   * 固定系数K（用于尺寸计算）
   */
  fixK: number;

  /**
   * 固定系数S（用于尺寸计算）
   */
  fixS: number;

  /**
   * X方向尺寸（宽度）
   */
  XSize: number;

  /**
   * Y方向尺寸（高度）
   */
  YSize: number;

  /**
   * 材质对象
   * @remarks 获取时自动创建默认材质（如果不存在）
   */
  material: Material;

  // ==================== 方法 ====================

  /**
   * 获取路径的深拷贝副本（路径点顺序反转）
   * @returns 反转后的路径数据
   */
  getPaths(): MoldingPaths;

  /**
   * 验证实体数据有效性
   * @returns 验证是否通过
   */
  verify(): boolean;

  /**
   * 获取IO处理器实例
   * @returns DMolding_IO单例
   */
  getIO(): DMolding_IO;

  /**
   * 更新实体属性
   * @param params - 更新参数对象
   */
  update(params: IDMoldingUpdateParams): void;

  /**
   * 刷新内部边界盒
   * @remarks 根据世界坐标系中的包围盒更新轮廓点
   */
  refreshBoundInternal(): void;

  /**
   * 遍历子内容（当前实现为空）
   * @param callback - 遍历回调函数
   * @param context - 遍历上下文
   */
  forEachContent(callback: unknown, context: unknown): void;

  /**
   * 判断是否位于指定房间内
   * @param face - 房间面对象
   * @param strictMode - 是否使用严格模式（默认false）
   * @returns 是否在房间内
   */
  isContentInRoom(face: Face, strictMode?: boolean): boolean;

  /**
   * 判断是否位于指定循环路径内
   * @param face - 面对象
   * @param strictMode - 是否使用严格模式（默认false）
   * @returns 是否在循环内
   */
  isContentInLoop(face: Face, strictMode?: boolean): boolean;

  /**
   * 判断是否与另一个成型产品相同
   * @param other - 另一个DMolding实例
   * @returns 是否相同（比较seekId、材质、尺寸）
   */
  isSameMolding(other: DMolding): boolean;

  /**
   * 判断内容是否有效
   * @returns 实体未隐藏且未删除时返回true
   */
  isContentValid(): boolean;

  /**
   * 是否可以处理字段事务
   * @returns 始终返回false
   */
  canTransactField(): boolean;

  /**
   * 获取唯一父级实体
   * @remarks 如果存在多父级数据问题会尝试修复
   * @returns 父级实体或undefined
   */
  getUniqueParent(): Entity | undefined;

  /**
   * 获取代理对象ID
   * @returns 代理类型枚举值
   */
  getProxyId(): number;

  /**
   * 获取代理对象实例
   * @returns 代理对象或undefined
   */
  getProxyObject(): unknown | undefined;

  /**
   * 设置材质
   * @param material - 材质对象
   */
  setMaterial(material: Material): void;
}