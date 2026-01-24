/**
 * 结构信息类
 * 用于管理和计算建筑结构的几何信息、表面积等属性
 * @module StructureInfo
 * @original-id 127752
 */

import { HSCore, HSConstants } from './HSCore';

/**
 * 结构尺寸信息接口
 */
interface StructureSize {
  /** X轴尺寸 */
  XSize: number;
  /** Y轴尺寸 */
  YSize: number;
  /** Z轴尺寸 */
  ZSize: number;
}

/**
 * 结构实体接口
 */
interface StructureEntity {
  /** 实体ID */
  id: string | number;
  /** 实体类型 */
  Class: string;
  /** X轴尺寸 */
  XSize: number;
  /** Y轴尺寸 */
  YSize: number;
  /** Z轴尺寸 */
  ZSize: number;
  /** 面列表 */
  faceList: Face[];
  /** 3D高度 */
  height3d: number;
  
  /**
   * 获取唯一父级实体
   */
  getUniqueParent(): StructureParent;
  
  /**
   * 判断是否为指定类型的实例
   * @param modelClass 模型类型
   */
  instanceOf(modelClass: string): boolean;
}

/**
 * 结构父级实体接口
 */
interface StructureParent {
  /** 父级高度 */
  height: number;
}

/**
 * 面信息接口
 */
interface Face {
  /** 真实的2D路径 */
  realPath2d: Path2D;
}

/**
 * 2D路径类型
 */
type Path2D = unknown;

/**
 * 结构信息类
 * 封装建筑结构的ID、实体、轮廓、面积等核心属性
 */
export declare class StructureInfo {
  /** 结构ID */
  id: string | number;
  
  /** 结构实体对象 */
  entity: StructureEntity;
  
  /** 结构轮廓 */
  outline: unknown;
  
  /** 是否为移除/添加操作 */
  isRemoveAdd: boolean;
  
  /** 表面积（平方单位） */
  area: number;
  
  /** 类型分类 */
  classType: string;
  
  /** 结构尺寸信息 */
  size: StructureSize;

  /**
   * 构造函数
   * @param entity 结构实体对象
   */
  constructor(entity: StructureEntity);

  /**
   * 更改移除/添加状态
   * @param status 新的状态值
   */
  changeRemoveAddStatus(status: boolean): void;

  /**
   * 计算结构的表面积
   * @param entity 结构实体
   * @returns 总表面积
   */
  getSurfaceAreaForStructure(entity: StructureEntity): number;

  /**
   * 获取去重后的面列表
   * 过滤掉底面（除非是自定义梁）和顶面（当父级高度大于实体高度时）
   * @param entity 结构实体
   * @returns 去重后的面数组
   */
  getDeduplicationFaces(entity: StructureEntity): Face[];
}