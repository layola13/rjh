/**
 * 添加结构体请求模块
 * 用于在场景中创建和管理各种结构体实体（柱子、烟道、立管、插座等）
 */

import { HSCore, HSCatalog, HSConstants } from './global-types';

/**
 * 三维位置坐标
 */
export interface Position3D {
  /** X轴坐标 */
  x: number;
  /** Y轴坐标 */
  y: number;
  /** Z轴坐标（高度） */
  z: number;
}

/**
 * 三维旋转角度
 */
export interface Rotation3D {
  /** 绕X轴旋转角度 */
  x: number;
  /** 绕Y轴旋转角度 */
  y: number;
  /** 绕Z轴旋转角度 */
  z: number;
}

/**
 * 三维缩放比例
 */
export interface Scale3D {
  /** X轴缩放比例 */
  XScale: number;
  /** Y轴缩放比例 */
  YScale: number;
  /** Z轴缩放比例 */
  ZScale: number;
}

/**
 * X轴缩放比例类型
 */
export type XScale = number;

/**
 * Y轴缩放比例类型
 */
export type YScale = number;

/**
 * Z轴缩放比例类型
 */
export type ZScale = number;

/**
 * 绕X轴旋转角度类型
 */
export type XRotation = number;

/**
 * Y轴旋转角度类型
 */
export type YRotation = number;

/**
 * Z轴旋转角度类型
 */
export type ZRotation = number;

/**
 * 结构体元数据接口
 */
export interface StructureMetadata {
  /** 默认高度 */
  defaultHeight?: number;
  /** 内容类型 */
  contentType?: HSCatalog.ContentType;
  /** Z轴长度 */
  ZLength?: number;
}

/**
 * 材质映射类型
 */
export type MaterialMap = Map<string, unknown>;

/**
 * 添加结构体请求类
 * 负责在场景中创建和初始化结构体实体
 * @extends HSCore.Transaction.Common.StateRequest
 */
export declare class AddStructureRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 结构体类名与内容类型的映射关系
   * @private
   */
  private static readonly _STRUCTURE_CLASSNAME_BY_CONTENT_TYPE: Map<
    HSCatalog.ContentTypeEnum,
    HSConstants.ModelClass
  >;

  /** 结构体元数据 */
  meta: StructureMetadata;

  /** 所属图层 */
  layer: HSCore.Model.Layer;

  /** 三维位置 */
  position: Position3D;

  /** 旋转角度（可以是单个Z轴角度或三维旋转） */
  rotation: number | Rotation3D;

  /** 宿主对象 */
  host: unknown;

  /** 缩放比例 */
  scale?: Scale3D;

  /** 翻转标志 */
  flip: number;

  /** 材质映射表 */
  materialMap: MaterialMap;

  /** 是否为墙体部件 */
  wallpart: boolean;

  /** 规格参数 */
  spec?: unknown;

  /**
   * 构造函数
   * @param meta - 结构体元数据
   * @param position - 三维位置坐标
   * @param rotation - 旋转角度
   * @param scale - 缩放比例
   * @param host - 宿主对象
   * @param flip - 翻转标志
   * @param materialMap - 材质映射表
   * @param layer - 所属图层（可选，默认为活动图层）
   * @param wallpart - 是否为墙体部件（默认为true）
   */
  constructor(
    meta: StructureMetadata,
    position?: Position3D,
    rotation?: number | Rotation3D,
    scale?: Scale3D,
    host?: unknown,
    flip?: number,
    materialMap?: MaterialMap,
    layer?: HSCore.Model.Layer,
    wallpart?: boolean
  );

  /**
   * 判断字段是否可以参与事务处理
   * @returns 始终返回true
   */
  canTransactField(): boolean;

  /**
   * 提交请求时执行的回调
   * @returns 创建的结构体实例
   */
  onCommit(): HSCore.Model.Entity.Structure;

  /**
   * 创建结构体实例
   * @returns 创建的结构体，如果无法确定类型则返回undefined
   */
  createStructure(): HSCore.Model.Entity.Structure | undefined;

  /**
   * 根据元数据获取对应的结构体类
   * @param meta - 结构体元数据
   * @returns 结构体类构造函数，未找到则返回undefined
   * @private
   */
  private _getContentClass(meta: StructureMetadata): typeof HSCore.Model.Entity.Structure | undefined;
}