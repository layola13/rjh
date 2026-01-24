/**
 * FaceOperator模块
 * 提供面数据的创建、转换和操作功能
 * @module FaceOperator
 */

import type { MathAlg, TrimmedSurface, Interval } from './math-alg';
import type { ConstraintType } from './constraint-type';
import type { ConstraintUtil } from './constraint-util';
import type { MathUtil } from './math-util';
import type { FinitePlane } from './finite-plane';

/**
 * 面类型标识符
 */
export type FaceType = string;

/**
 * 实体ID
 */
export type EntityId = string;

/**
 * 面ID
 */
export type FaceId = string;

/**
 * 主体ID
 */
export type BodyId = string;

/**
 * 三维坐标点
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * UV坐标
 */
export interface UVCoordinate {
  x: number;
  y: number;
}

/**
 * 面标签数据
 */
export type FaceTags = unknown;

/**
 * 曲线数据
 */
export type Curve = unknown;

/**
 * 实体对象
 */
export interface IEntity {
  id: EntityId;
  getTopParent(): IEntity;
  [key: string]: unknown;
}

/**
 * 表面对象接口
 */
export interface ISurface {
  /**
   * 获取表面原点
   */
  getOrigin(): Point3D;
  
  /**
   * 获取指定点的UV坐标
   */
  getUVAt(point: Point3D): UVCoordinate;
  
  /**
   * 获取坐标系
   */
  getCoord(): unknown;
  
  /**
   * 序列化表面数据
   */
  dump(): unknown;
  
  /**
   * 加载表面数据
   */
  load(data: unknown): void;
  
  /**
   * U方向尺寸
   */
  uSize: number;
  
  /**
   * V方向尺寸
   */
  vSize: number;
}

/**
 * 面数据结构
 */
export interface IFaceData {
  /** 主体ID */
  bodyId: BodyId;
  
  /** 面ID */
  faceId: FaceId;
  
  /** 表面几何数据 */
  surface: FinitePlane;
  
  /** 面类型 */
  type: FaceType;
  
  /** 面标签（可选） */
  faceTags?: FaceTags;
  
  /** 曲线数据（可选） */
  curve?: Curve;
}

/**
 * 面接口（简化版）
 */
export interface IFace {
  bodyId: BodyId;
  faceId: FaceId;
  surface: ISurface;
  type: FaceType;
}

/**
 * 面键值标识
 */
export interface FaceKey {
  faceId: FaceId;
  bodyId: BodyId;
}

/**
 * 约束引用面
 */
export interface ConstraintRefFace {
  bodyId: BodyId;
  faceId: FaceId;
}

/**
 * 约束用户数据
 */
export interface ConstraintUserData {
  dimPos: UVCoordinate;
}

/**
 * 约束定义
 */
export interface IConstraint {
  /** 参考面 */
  refFace: ConstraintRefFace;
  
  /** 约束值（字符串形式） */
  value: string;
  
  /** 约束类型 */
  constraintType: ConstraintType;
  
  /** 用户数据 */
  userData: ConstraintUserData;
}

/**
 * 面信息
 */
export interface FaceInfo {
  entityId: EntityId;
  faceType: FaceType;
  [key: string]: unknown;
}

/**
 * 面操作器类
 * 封装面数据的创建、转换和几何操作
 */
export declare class FaceOperator {
  /**
   * 内部面数据
   */
  private readonly faceData: IFaceData;

  /**
   * 构造函数
   * @param faceData - 面数据
   */
  constructor(faceData: IFaceData);

  /**
   * 从面数据创建面操作器
   * @param faceData - 面数据
   * @returns 面操作器实例
   */
  static create(faceData: IFaceData): FaceOperator;

  /**
   * 从实体和面类型创建面操作器
   * @param entity - 实体对象
   * @param topParent - 顶层父实体
   * @param faceType - 面类型
   * @param bodyId - 主体ID
   * @param faceTags - 面标签（可选）
   * @returns 面操作器实例
   */
  static createFromEntity(
    entity: IEntity,
    topParent: IEntity,
    faceType: FaceType,
    bodyId: BodyId,
    faceTags?: FaceTags
  ): FaceOperator;

  /**
   * 从曲线创建面操作器
   * @param entity - 实体对象
   * @param topParent - 顶层父实体
   * @param index - 索引
   * @param bodyId - 主体ID
   * @param curve - 曲线数据
   * @param faceTags - 面标签
   * @param curveIndex - 曲线索引
   * @returns 面操作器实例
   */
  static createFromCurve(
    entity: IEntity,
    topParent: IEntity,
    index: number,
    bodyId: BodyId,
    curve: Curve,
    faceTags: FaceTags,
    curveIndex: number
  ): FaceOperator;

  /**
   * 从实体数据创建面操作器
   * @param entityData - 实体数据
   * @param topParent - 顶层父实体
   * @param faceType - 面类型
   * @param bodyId - 主体ID
   * @returns 面操作器实例
   */
  static createFromEntityData(
    entityData: IEntity,
    topParent: IEntity,
    faceType: FaceType,
    bodyId: BodyId
  ): FaceOperator;

  /**
   * 从IFace接口创建面操作器
   * @param face - 面接口对象
   * @returns 面操作器实例
   */
  static createFrom(face: IFace): FaceOperator;

  /**
   * 从IFace接口提取面数据结构
   * @param face - 面接口对象
   * @returns 面数据
   */
  static getSchemeFromIFace(face: IFace): IFaceData;

  /**
   * 判断对象是否为面操作器实例
   * @param obj - 待检查对象
   * @returns 是否为面操作器
   */
  static isFaceOperator(obj: unknown): obj is FaceOperator;

  /**
   * 将对象转换为面操作器
   * @param faceOrOperator - 面对象或面操作器
   * @returns 面操作器实例
   */
  static toFaceOperator(faceOrOperator: IFace | FaceOperator): FaceOperator;

  /**
   * 将面操作器转换为IFaceData
   * @param operator - 面操作器
   * @returns 面数据
   */
  static toIFaceData(operator: FaceOperator): IFace;

  /**
   * 创建距离约束
   * @param targetFace - 目标面操作器
   * @param referenceFace - 参考面操作器
   * @param position - 标注位置（可选，默认原点）
   * @returns 约束定义
   */
  static createConstraint(
    targetFace: FaceOperator,
    referenceFace: FaceOperator,
    position?: Point3D
  ): IConstraint;

  /**
   * 计算从面1到面2的有向距离
   * @param face1 - 第一个面操作器
   * @param face2 - 第二个面操作器
   * @returns 有向距离值
   */
  static distanceFromFace1ToFace2(
    face1: FaceOperator,
    face2: FaceOperator
  ): number;

  /**
   * 根据实体ID和面类型生成面ID
   * @param entityId - 实体ID
   * @param faceType - 面类型
   * @returns 面ID
   */
  static getFaceIdByEntityAndFaceType(
    entityId: EntityId,
    faceType: FaceType
  ): FaceId;

  /**
   * 从面ID提取实体ID
   * @param faceId - 面ID
   * @returns 实体ID
   */
  static getEntityIdFromFaceId(faceId: FaceId): EntityId;

  /**
   * 从面ID提取面类型
   * @param faceId - 面ID
   * @returns 面类型
   */
  static getFaceTypeFromFaceId(faceId: FaceId): FaceType;

  /**
   * 从面ID提取完整面信息
   * @param faceId - 面ID
   * @returns 面信息对象
   */
  static getFaceInfoFromFaceId(faceId: FaceId): FaceInfo;

  /**
   * 转换为IFace接口对象
   * @returns 面接口对象
   */
  toIFace(): IFace;

  /**
   * 主体ID
   */
  get bodyId(): BodyId;

  /**
   * 面ID
   */
  get faceId(): FaceId;

  /**
   * 面标签
   */
  get faceTags(): FaceTags | undefined;

  /**
   * 表面几何对象
   */
  get surface(): FinitePlane;

  /**
   * 面类型
   */
  get type(): FaceType;

  /**
   * 关联的实体ID
   */
  get entityId(): EntityId;

  /**
   * 面键值标识
   */
  get faceKey(): FaceKey;

  /**
   * 从IFace接口更新面数据
   * @param face - 面接口对象
   */
  updateFromIFace(face: IFace): void;

  /**
   * 从实体更新面几何数据
   * @param entity - 实体对象
   * @param topParent - 顶层父实体（可选，默认为entity.getTopParent()）
   */
  updateFromEntity(entity: IEntity, topParent?: IEntity): void;

  /**
   * 获取裁剪后的表面（基于UV范围）
   * @returns 裁剪表面对象
   */
  get trimmed(): TrimmedSurface;
}