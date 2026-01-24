/**
 * B3Context - BIM数据上下文管理器
 * 
 * 用于组织和管理BOM（物料清单）数据中的各类建筑业务实体，
 * 包括楼层、房间、墙体、楼板、开口、内容物、定制模型等。
 * 提供按层级和房间分组的数据访问能力。
 */

import { BomDateBase, groupByStringKey } from './BomDateBase';
import {
  TypePredicate,
  ConcealedWorkPredicate,
  LayerPredicate,
  RoomPredicate,
  FacePredicate,
  WallPredicate,
  SlabPredicate,
  OpeningPredicate,
  ParametricWindowPredicate,
  ParametricOpeningPredicate,
  ContentPredicate,
  NormalMoldingPredicate,
  CustomizedMoldingPredicate,
  NCustomizedMoldingPredicate,
  PavePredicate
} from './Predicates';
import { ParameterNames } from './ParameterNames';

/**
 * 业务实体接口 - 表示BOM中的基本实体单元
 */
export interface IBusinessEntity {
  /** 实体实例，包含参数访问方法 */
  instance: {
    getParameterValue(paramName: string): string | number | boolean | null;
  };
}

/**
 * BOM数据源接口
 */
export interface IBomData {
  /**
   * 获取指定类型的业务实体集合
   * @param options - 查询选项
   */
  getBusinessEntities(options: { type: string }): IBusinessEntity[];
}

/**
 * 按字符串键分组后的实体映射
 */
export type EntityGroupMap<T = IBusinessEntity> = Record<string, T[]>;

/**
 * B3Context - BIM业务上下文类
 * 
 * 负责初始化和管理BOM数据中的各类建筑实体，
 * 并按层级（layerId）和房间（roomId）进行分组索引。
 */
export declare class B3Context {
  /** 原始BOM数据源 */
  readonly bomData: IBomData;

  /** 数据库API实例，用于查询实体 */
  dbApi: BomDateBase;

  // ========== 楼层平面相关实体 ==========
  
  /** 所有图层实体 */
  layers: IBusinessEntity[];

  /** 所有墙体实体 */
  walls: IBusinessEntity[];

  /** 所有楼板实体 */
  slabs: IBusinessEntity[];

  /** 楼板孔洞实体（type为"slabHole"的开口） */
  slabHoles: IBusinessEntity[];

  /** 按layerId分组的房间映射 */
  layerRooms: EntityGroupMap;

  /** 按roomId分组的面（Face）映射 */
  roomFaces: EntityGroupMap;

  /** 按layerId分组的墙体映射 */
  layerWalls: EntityGroupMap;

  /** 按layerId分组的开口映射（门窗等，不含楼板孔洞） */
  layerOpenings: EntityGroupMap;

  /** 按layerId分组的内容物映射 */
  layerContents: EntityGroupMap;

  /** 按layerId分组的定制参数化模型映射 */
  layerCustomizedPMModels: EntityGroupMap;

  // ========== 房间相关实体 ==========
  
  /** 按roomId分组的内容物映射 */
  roomContents: EntityGroupMap;

  /** 按roomId分组的装饰线条映射 */
  roomMoldings: EntityGroupMap;

  /** 按roomId分组的定制化配置映射 */
  roomCustomizations: EntityGroupMap;

  /** 按roomId分组的定制模型映射 */
  roomCustomizedModels: EntityGroupMap;

  // ========== 其他实体 ==========
  
  /** 所有装饰线条实体（含普通和定制） */
  moldings: IBusinessEntity[];

  /** 所有铺装实体 */
  paves: IBusinessEntity[];

  /** 设计信息实体 */
  designEntity: IBusinessEntity | null;

  /** 按layerId分组的隐蔽工程映射 */
  concealWork: EntityGroupMap;

  /**
   * 构造函数
   * @param bomData - BOM数据源对象
   */
  constructor(bomData: IBomData);

  /**
   * 初始化上下文，加载并组织所有业务实体数据
   */
  init(): void;

  /**
   * 获取设计信息
   * 从BOM中查找类型为"Design"的实体并存储到designEntity
   */
  getDesignInfo(): void;

  /**
   * 获取隐蔽工程数据
   * 查找所有隐蔽工程实体并按layerId分组
   */
  getConcealedWork(): void;

  /**
   * 获取楼层平面相关的业务实体
   * 包括图层、房间、面、墙体、楼板、开口、内容物、定制模型、装饰线条等
   */
  getFloorPlanBusinessEntities(): void;

  /**
   * 获取铺装业务实体
   * 查找所有类型为"Pave"的实体
   */
  getPaveBusinessEntities(): void;
}