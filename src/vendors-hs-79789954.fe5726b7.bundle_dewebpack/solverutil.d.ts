/**
 * 求解器工具类
 * 提供3D模型实体操作、面类型判断、边界框计算等核心功能
 * @module SolverUtil
 */

import type * as THREE from 'three';
import type { Matrix4, Vector3 } from 'three';
import type { HSCore } from '../core';
import type { EN_TYPE } from '../enums';
import type { EntityObject } from '../entity';
import type { HSBox3 } from '../math';

/**
 * 实体面信息
 */
export interface EntityFaceInfo {
  /** 实体对象 */
  entity: EntityObject;
  /** 根实体 */
  root: EntityObject;
  /** 面类型 */
  face: EN_TYPE;
}

/**
 * 有效拾取信息
 */
export interface ValidPickedInfo {
  /** 第一个实体面信息 */
  ef1: EntityFaceInfo & {
    /** 是否可移动 */
    moveable: boolean;
  };
  /** 第二个实体面信息 */
  ef2: EntityFaceInfo & {
    /** 是否可移动 */
    moveable: boolean;
  };
}

/**
 * 实体位置变更信息
 */
export interface EntityPositionChange {
  /** 变更的实体 */
  entity: EntityObject;
  /** 新位置 */
  position: Vector3;
}

/**
 * 面信息
 */
export interface FaceInfo {
  /** 面ID */
  faceId: string;
  /** 表面信息 */
  surface: unknown;
}

/**
 * 物体信息
 */
export interface BodyInfo {
  /** 物体ID */
  id: string;
  /** 
   * 遍历物体的所有面
   * @param callback 回调函数，返回true时停止遍历
   */
  forEachFace(callback: (face: FaceInfo) => boolean): boolean;
  /**
   * 获取边界框
   * @param transform 变换矩阵
   */
  getBoundingBox(transform: Matrix4): HSBox3;
}

/**
 * 实体基础属性
 */
export interface EntityBase {
  /** 实体ID */
  id: string;
  /** X轴长度 */
  XLength: number;
  /** Y轴长度 */
  YLength: number;
  /** Z轴长度 */
  ZLength: number;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /**
   * 获取唯一父级
   */
  getUniqueParent(): EntityObject | null;
}

/**
 * 求解器工具类
 * 提供3D场景中实体的空间关系计算、面类型判断、碰撞检测等功能
 */
export declare class SolverUtil {
  /**
   * 遍历对象的所有属性
   * @param obj 要遍历的对象
   * @param callback 回调函数，返回true时停止遍历
   */
  static forEachIn<T extends Record<string, unknown>>(
    obj: T,
    callback: (key: string, value: unknown) => boolean
  ): void;

  /**
   * 获取扁平化的实体集合
   * @param entities 实体数组或映射
   * @returns 扁平化后的实体映射表
   */
  static getFlatEntities(entities: unknown): Map<string, EntityObject>;

  /**
   * 获取有效的拾取信息
   * 验证两个拾取对象是否可以进行操作，并返回它们的面信息
   * @param picked1 第一个拾取对象
   * @param picked2 第二个拾取对象
   * @param spaceAxis 空间坐标轴索引(0=X, 1=Y, 2=Z)
   * @returns 有效的拾取信息，如果无效则返回undefined或false
   */
  static getValidPickedInfo(
    picked1: EntityObject | EntityFaceInfo,
    picked2: EntityObject | EntityFaceInfo,
    spaceAxis: number
  ): ValidPickedInfo | false | undefined;

  /**
   * 提取模型变更的属性
   * 比较物体数组和实体映射，找出位置发生变化的实体
   * @param bodies 物体数组
   * @param entityMap 实体映射表
   * @param rootEntity 根实体
   * @returns 位置发生变化的实体数组
   */
  static extractModelChangedProperties(
    bodies: BodyInfo[],
    entityMap: Map<string, EntityBase>,
    rootEntity: EntityObject
  ): EntityPositionChange[];

  /**
   * 获取相对的面类型
   * 例如: LEFT -> RIGHT, TOP -> BOTTOM
   * @param faceType 面类型
   * @returns 相对的面类型
   */
  static getOppositeFaceType(faceType: EN_TYPE): EN_TYPE | undefined;

  /**
   * 获取发生变化的物体
   * @param bodies 物体数组
   * @param rootEntity 根实体
   * @param flatEntities 可选的扁平实体映射
   * @returns 发生变化的物体数组
   */
  static getChangedBodys(
    bodies: BodyInfo[],
    rootEntity: EntityObject,
    flatEntities?: Map<string, EntityObject>
  ): BodyInfo[];

  /**
   * 判断物体是否发生变化
   * @param body 物体信息
   * @param rootEntity 根实体
   * @param flatEntities 扁平实体映射
   * @returns 是否发生变化
   */
  static isBodyChanged(
    body: BodyInfo,
    rootEntity: EntityObject,
    flatEntities: Map<string, EntityObject>
  ): boolean;

  /**
   * 判断面是否发生变化
   * @param face 面信息
   * @param rootEntity 根实体
   * @param flatEntities 扁平实体映射
   * @returns 是否发生变化
   */
  static isFaceChanged(
    face: FaceInfo,
    rootEntity: EntityObject,
    flatEntities: Map<string, EntityObject>
  ): boolean;

  /**
   * 获取物体的边界框
   * @param body 物体信息
   * @param transform 变换矩阵
   * @returns 边界框
   */
  static getBodyBox(body: BodyInfo, transform: Matrix4): HSBox3;

  /**
   * 获取实体的边界框(基于原点)
   * @param entity 实体对象
   * @param transform 可选的变换矩阵
   * @returns 边界框
   */
  static getEntityBox(entity: EntityBase, transform?: Matrix4): HSBox3;

  /**
   * 获取实体的边界框(基于中心点)
   * @param entity 实体对象
   * @param transform 可选的变换矩阵
   * @returns 基于中心点的边界框
   */
  static getEntityBoxBasedOnCenter(entity: EntityBase, transform?: Matrix4): HSBox3;

  /**
   * 获取实体在空间中的面类型
   * 根据空间方向判断实体的哪个面朝向该方向
   * @param picked 拾取的对象
   * @param rootEntity 根实体
   * @param axisIndex 坐标轴索引(0=X, 1=Y, 2=Z)
   * @param direction 方向(1或-1)
   * @returns 实体面信息，如果不是EntityObject则直接返回
   */
  static getEntityFaceTypeInSpace(
    picked: EntityObject | EntityFaceInfo,
    rootEntity: EntityObject,
    axisIndex: number,
    direction: 1 | -1
  ): EntityFaceInfo | null | EntityFaceInfo;
}