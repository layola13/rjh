/**
 * 推拉门组件类型定义
 * 提供推拉门装配件及其序列化/反序列化功能
 */

import { PAssembly, PAssembly_IO } from './PAssembly';
import { Meta } from './Catalog';

/**
 * 推拉门组件ID映射表接口
 * 定义推拉门各部件的ID与元数据属性名的对应关系
 */
interface ISlidingDoorIdsMap {
  /** 上轨道查找ID */
  upTrackSeekId: string;
  /** 下轨道查找ID */
  downTrackSeekId: string;
  /** 中挺查找ID */
  mullionSeekId: string;
  /** 上横梁查找ID */
  upTransomSeekId: string;
  /** 中横梁查找ID */
  middleTransomSeekId: string;
  /** 下横梁查找ID */
  downTransomSeekId: string;
  /** 推拉门扇查找ID */
  slidingDoorLeafSeekId: string;
  /** 门扇边框材料 */
  doorLeafBorderMaterial: string;
}

/**
 * 轨道槽位配置接口
 */
interface ITrackSlot {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 轨道槽位映射接口
 */
interface ITrackSlotsMap {
  slot1: ITrackSlot;
  slot2: ITrackSlot;
}

/**
 * 轨道元数据接口
 */
interface ITrackMetaData extends Meta {
  /** 型材X方向尺寸 */
  profileSizeX: number;
  /** 型材Y方向尺寸 */
  profileSizeY: number;
  /** 槽位映射 */
  slotsMap?: ITrackSlotsMap;
}

/**
 * 中挺元数据接口
 */
interface IMullionMetaData extends Meta {
  /** 型材X方向尺寸 */
  profileSizeX: number;
}

/**
 * 推拉门Loft元数据集合接口
 */
interface ISlidingDoorLoftMetas {
  upTrackMetaData?: ITrackMetaData;
  downTrackMetaData?: ITrackMetaData;
  mullionMetaData?: IMullionMetaData;
  upTransomMetaData?: Meta;
  middleTransomMetaData?: Meta;
  downTransomMetaData?: Meta;
  slidingDoorLeafMetaData?: Meta;
  doorLeafBorderMaterialMetaData?: Meta;
}

/**
 * 产品映射接口
 */
interface IProductsMap {
  get(id: string): unknown;
}

/**
 * 推拉门装配件序列化/反序列化类
 * 负责推拉门数据的持久化与恢复
 */
export declare class PSlidingDoor_IO extends PAssembly_IO {
  /**
   * 序列化推拉门数据
   * @param entity - 要序列化的推拉门实体
   * @param callback - 序列化完成后的回调函数
   * @param includeMetadata - 是否包含元数据，默认true
   * @param options - 额外的序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: PSlidingDoor,
    callback?: (result: unknown[], entity: PSlidingDoor) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * 反序列化推拉门数据
   * @param entity - 目标推拉门实体
   * @param data - 序列化的数据对象
   * @param context - 反序列化上下文，包含产品映射表
   */
  load(
    entity: PSlidingDoor,
    data: Record<string, unknown>,
    context: { productsMap: IProductsMap }
  ): void;
}

/**
 * 推拉门装配件类
 * 表示一个完整的推拉门组件，包含轨道、横梁、中挺、门扇等部件
 */
export declare class PSlidingDoor extends PAssembly {
  /**
   * 部件ID映射表
   * 定义各部件ID属性名与元数据属性名的对应关系
   */
  readonly idsMap: ISlidingDoorIdsMap;

  /** 上轨道ID */
  upTrackSeekId: string;
  /** 上轨道元数据 */
  upTrackMetaData: Meta | null;

  /** 下轨道ID */
  downTrackSeekId: string;
  /** 下轨道元数据 */
  downTrackMetaData: Meta | null;

  /** 中挺ID */
  mullionSeekId: string;
  /** 中挺元数据 */
  mullionMetaData: Meta | null;

  /** 上横梁ID */
  upTransomSeekId: string;
  /** 上横梁元数据 */
  upTransomMetaData: Meta | null;

  /** 中横梁ID */
  middleTransomSeekId: string;
  /** 中横梁元数据 */
  middleTransomMetaData: Meta | null;

  /** 下横梁ID */
  downTransomSeekId: string;
  /** 下横梁元数据 */
  downTransomMetaData: Meta | null;

  /** 推拉门扇ID */
  slidingDoorLeafSeekId: string;
  /** 推拉门扇元数据 */
  slidingDoorLeafMetaData: Meta | null;

  /** 门扇边框材料ID */
  doorLeafBorderMaterial: string;
  /** 门扇边框材料元数据 */
  doorLeafBorderMaterialMetaData: Meta | null;

  /** 是否已完成加载 */
  hasLoadComplete: boolean;

  /**
   * 构造函数
   * @param id - 推拉门ID，默认为空字符串
   * @param parent - 父实体，默认为undefined
   */
  constructor(id?: string, parent?: unknown);

  /**
   * 工厂方法：创建推拉门实例
   * @param productData - 产品数据
   * @param metaData - 元数据
   * @returns 新创建的推拉门实例
   */
  static create(productData?: unknown, metaData?: Record<string, unknown>): PSlidingDoor;

  /**
   * 通过元数据初始化推拉门
   * @param productData - 产品数据
   * @param metaData - 元数据对象
   */
  initByMeta(productData: { productDataById: Record<string, Meta> }, metaData?: Record<string, unknown>): void;

  /**
   * 获取IO处理器实例
   * @returns PSlidingDoor_IO单例
   */
  getIO(): PSlidingDoor_IO;

  /**
   * 设置材料（当前为空实现）
   * @param material - 材料对象
   */
  setMaterial(material: unknown): void;

  /**
   * Loft元数据变更回调
   * @param newMeta - 新的元数据
   * @param oldValue - 旧值
   * @param propertyName - 属性名
   * @param context - 上下文信息
   */
  onLoftMetaChanged(newMeta: Meta, oldValue: unknown, propertyName: string, context: unknown): void;

  /**
   * 更新Loft状态
   * 根据当前元数据更新所有Loft组件的状态
   */
  updateLoftStates(): void;

  /**
   * 设置Loft元数据
   * 同时更新自身和子组件的Loft元数据
   * @param metas - 元数据集合
   */
  setLoftMetas(metas: Partial<ISlidingDoorLoftMetas>): void;

  /**
   * 设置自身的Loft元数据
   * @param metas - 元数据集合
   */
  setSelfLoftMetas(metas: Partial<ISlidingDoorLoftMetas>): void;

  /**
   * 设置子组件的Loft元数据
   * @param metas - 元数据集合
   */
  setChildrenLoftMetas(metas: Partial<ISlidingDoorLoftMetas>): void;

  /**
   * 从元数据更新Loft状态
   * @param metas - 元数据集合
   * @param shouldCompute - 是否触发计算，默认true
   */
  updateLoftStatesFromMetas(metas: Partial<ISlidingDoorLoftMetas>, shouldCompute?: boolean): void;

  /**
   * 从元数据更新自身Loft状态
   * @param metas - 元数据集合
   * @param shouldCompute - 是否触发计算，默认true
   */
  updateSelfLoftStatesFromMetas(metas: Partial<ISlidingDoorLoftMetas>, shouldCompute?: boolean): void;

  /**
   * 从元数据更新子组件Loft状态
   * @param metas - 元数据集合
   * @param shouldCompute - 是否触发计算，默认true
   */
  updateChildrenLoftStatesFromMetas(metas: Partial<ISlidingDoorLoftMetas>, shouldCompute?: boolean): void;

  /**
   * 从元数据更新上轨道状态
   * @param metaData - 轨道元数据
   * @param shouldCompute - 是否触发计算，默认true
   */
  updateUpTrackStatesFromMeta(metaData: ITrackMetaData, shouldCompute?: boolean): void;

  /**
   * 从元数据更新下轨道状态
   * @param metaData - 轨道元数据
   * @param shouldCompute - 是否触发计算，默认true
   */
  updateDownTracksStatesFromMeta(metaData: ITrackMetaData, shouldCompute?: boolean): void;

  /**
   * 获取所有推拉门扇子组件
   * @returns 推拉门扇数组
   */
  getSlidingDoorLeafs(): PSlidingDoor[];

  /**
   * 获取所有分段Loft组件
   * @returns Loft组件数组
   */
  getSegmentLofts(): unknown[];

  /**
   * 根据内容类型获取Loft组件
   * @param contentType - 内容类型枚举
   * @returns 匹配的Loft组件数组
   */
  getLoftsByContentType(contentType: unknown): unknown[];

  /**
   * 获取关联的元数据列表
   * @returns 元数据数组
   */
  getRelatedMetaDatas(): Meta[];

  /**
   * 获取元数据过滤键
   * @returns 过滤键数组或null
   */
  getMetadataFilterKeys(): string[] | null;
}