/**
 * Module: SpaceAssembly_IO
 * Original ID: 71153
 * Exports: SpaceAssembly, SpaceAssembly_IO
 */

import type { Entity, Entity_IO } from './Entity';
import type { Box3 } from './Box3';
import type { BrepBound } from './BrepBound';
import type { SignalHook } from './SignalHook';

/**
 * 3D坐标点接口
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 3D尺寸接口
 */
interface Size3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 资产信息接口
 */
interface Asset {
  [key: string]: unknown;
}

/**
 * 空间装配体元数据接口
 */
interface SpaceAssemblyMetadata {
  /** Seek唯一标识符 */
  id: string;
  /** Seek唯一标识符 */
  seekId: string;
  /** X轴尺寸 */
  xSize: number;
  /** Y轴尺寸 */
  ySize: number;
  /** Z轴尺寸 */
  zSize: number;
  /** 原始空间X轴长度 */
  originalSpaceXLength: number;
  /** 原始空间Y轴长度 */
  originalSpaceYLength: number;
  /** 原始空间Z轴长度 */
  originalSpaceZLength: number;
  /** 关联的资产列表 */
  assets?: Asset[];
}

/**
 * 实体转储数据接口
 */
interface EntityDumpData {
  /** Seek标识符 */
  seekId?: string;
  /** 关联实体的ID列表 */
  associatedIds?: string[];
  [key: string]: unknown;
}

/**
 * 加载选项接口
 */
interface LoadOptions {
  /** 产品映射表，用于根据seekId查找元数据 */
  productsMap?: Map<string, SpaceAssemblyMetadata>;
  [key: string]: unknown;
}

/**
 * 字段变更信号数据接口
 */
interface FieldChangedSignalData {
  /** 变更的字段名称 */
  fieldName: string;
  [key: string]: unknown;
}

/**
 * 空间装配体IO处理类
 * 负责SpaceAssembly实体的序列化和反序列化
 */
export declare class SpaceAssembly_IO extends Entity_IO {
  /**
   * 将SpaceAssembly实例转储为数据对象
   * @param entity - 要转储的SpaceAssembly实例
   * @param callback - 转储完成后的回调函数
   * @param options - 转储选项
   * @param context - 转储上下文
   * @returns 转储后的数据数组
   */
  dump(
    entity: SpaceAssembly,
    callback?: ((dumpData: EntityDumpData[], entity: SpaceAssembly) => void) | undefined,
    options?: unknown,
    context?: unknown
  ): EntityDumpData[];

  /**
   * 从转储数据加载SpaceAssembly实例
   * @param entity - 要加载数据的SpaceAssembly实例
   * @param dumpData - 转储的数据对象
   * @param options - 加载选项，包含productsMap等
   */
  load(entity: SpaceAssembly, dumpData: EntityDumpData, options: LoadOptions): void;

  /**
   * 获取SpaceAssembly_IO的单例实例
   */
  static instance(): SpaceAssembly_IO;
}

/**
 * 空间装配体类
 * 表示一个由多个关联实体组成的3D空间装配体
 */
export declare class SpaceAssembly extends Entity {
  /** 监听的字段名称列表 */
  private readonly _watchedFiledName: string[];
  
  /** Seek唯一标识符 */
  private _seekId: string;
  
  /** 关联实体的ID列表 */
  private _associatedIds: string[];
  
  /** 原始空间包围盒 */
  private _originalSpaceBox3: Box3;
  
  /** 关联的实体内容列表（内部使用） */
  private _associatedContents: Entity[];
  
  /** 缓存的位置信息 */
  private _position?: Point3D;
  
  /** 缓存的尺寸信息 */
  private _size?: Size3D;
  
  /** 元数据 */
  private _metadata?: SpaceAssemblyMetadata;
  
  /** 信号钩子，用于监听关联实体的字段变化 */
  private _signalHook: SignalHook;

  /**
   * 构造函数
   * @param id - 实体唯一标识符，默认为空字符串
   * @param options - 构造选项
   */
  constructor(id?: string, options?: unknown);

  /**
   * 创建SpaceAssembly实例的工厂方法
   * @param metadata - 可选的元数据，用于初始化实例
   * @returns 新创建的SpaceAssembly实例
   */
  static create(metadata?: SpaceAssemblyMetadata): SpaceAssembly;

  /**
   * Seek唯一标识符（装饰器字段）
   * 如果未设置，则从metadata中获取
   */
  seekId: string;

  /**
   * 关联的实体内容列表（装饰器字段）
   * 设置时会自动更新内部状态和事件监听
   */
  associatedContents: Entity[];

  /**
   * 获取关联实体的ID列表
   */
  get associatedIds(): string[];

  /**
   * 获取装配体的3D位置
   * 如果未缓存，会自动刷新尺寸和位置
   */
  get position(): Point3D;

  /** 获取X轴坐标 */
  get x(): number;

  /** 获取Y轴坐标 */
  get y(): number;

  /** 获取Z轴坐标 */
  get z(): number;

  /**
   * 获取装配体的3D尺寸
   * 如果未缓存，会自动刷新尺寸和位置
   */
  get size(): Size3D;

  /** 获取X轴尺寸 */
  get xSize(): number;

  /** 获取Y轴尺寸 */
  get ySize(): number;

  /** 获取Z轴尺寸 */
  get zSize(): number;

  /**
   * 获取装配体的元数据
   */
  get metadata(): SpaceAssemblyMetadata | undefined;

  /**
   * 获取装配体的资产列表
   * 如果元数据不存在或没有资产，返回空数组
   */
  get assets(): Asset[];

  /**
   * 获取原始空间包围盒
   */
  get originalSpaceBox3(): Box3;

  /**
   * 使用元数据初始化装配体
   * @param metadata - 空间装配体元数据
   */
  initByMeta(metadata: SpaceAssemblyMetadata): void;

  /**
   * 刷新内部包围盒
   * 遍历所有关联实体，合并它们的包围盒，并更新尺寸和位置
   */
  refreshBoundInternal(): void;

  /**
   * 更新关联的实体内容
   * 解除旧实体的事件监听，添加新实体的事件监听，并刷新包围盒
   * @param contents - 新的关联实体列表
   */
  private _updateContents(contents: Entity[]): void;

  /**
   * 关联实体字段变更的回调函数
   * 当监听的字段发生变化时，刷新包围盒
   * @param event - 字段变更事件对象
   */
  private onContentsFieldChanged(event: { data: FieldChangedSignalData }): void;

  /**
   * 刷新尺寸和位置信息
   * 根据关联实体的包围盒计算整体尺寸和位置
   */
  private _refreshSizeAndPosition(): void;

  /**
   * 获取IO处理器实例
   * @returns SpaceAssembly_IO的单例实例
   */
  getIO(): SpaceAssembly_IO;
}