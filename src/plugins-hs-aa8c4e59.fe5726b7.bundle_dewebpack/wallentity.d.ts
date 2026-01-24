import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { HSCore } from './HSCore';
import { Utils } from './Utils';

/**
 * 墙体点坐标接口
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 墙体位置信息接口
 */
interface WallLocation {
  from: Point3D;
  to: Point3D;
}

/**
 * 墙体边界接口
 */
interface Bound {
  getTopLeft(): Point3D;
  getBottomRight(): Point3D;
}

/**
 * 父级图层接口
 */
interface ParentLayer {
  id: string;
  height?: number;
}

/**
 * 墙面信息接口
 */
interface Face {
  id: string;
  [key: string]: unknown;
}

/**
 * 墙体原始数据接口
 */
interface WallSourceData {
  /** 墙体唯一标识 */
  id: string;
  /** 墙体类别 */
  Class: string;
  /** 墙体边界 */
  bound: Bound;
  /** 父级图层 */
  parent: ParentLayer;
  /** 墙体长度 */
  length: number;
  /** 墙体宽度（厚度） */
  width: number;
  /** 墙体3D高度 */
  height3d: number;
  /** 旋转角度 */
  rotation: number;
  /** 起点坐标 */
  from: Point3D;
  /** 终点坐标 */
  to: Point3D;
  /** 墙体类型 */
  wallType: string;
  /** 是否承重墙 */
  isLoadBearing: boolean;
  /** 墙体轮廓点集 */
  outline: Point3D[];
  /** 左侧墙面集合 */
  leftFaces: Record<string, Face>;
  /** 右侧墙面集合 */
  rightFaces: Record<string, Face>;
}

/**
 * 墙体几何信息接口
 */
interface WallGeometryInfo {
  /** 内侧起点 */
  innerFrom: Point3D;
  /** 内侧终点 */
  innerTo: Point3D;
  /** 边界路径 */
  borderlinePath: Point3D[];
}

/**
 * 类型设置接口
 */
interface TypeConfig {
  classType: string;
}

/**
 * 墙体实体类
 * 负责处理墙体的数据构建、几何计算和属性判断
 */
export declare class WallEntity extends AcceptEntity {
  /**
   * 构建墙体实体数据
   * @param sourceData - 墙体原始数据
   */
  buildEntityData(sourceData: WallSourceData): void;

  /**
   * 构建子实体（墙体无子实体）
   */
  buildChildren(): void;

  /**
   * 获取墙体实例数据
   * @param sourceData - 墙体原始数据
   * @returns 包含所有墙体参数的实例数据对象
   */
  getInstanceData(sourceData: WallSourceData): InstanceData;

  /**
   * 获取墙体内侧长度
   * @param sourceData - 墙体原始数据
   * @returns 格式化后的内侧长度值
   */
  getWallInnerLength(sourceData: WallSourceData): number;

  /**
   * 获取墙体截面积
   * @param sourceData - 墙体原始数据
   * @returns 格式化后的截面积值
   */
  getWallSectionArea(sourceData: WallSourceData): number;

  /**
   * 判断是否为内墙
   * 通过检查墙体左右两侧是否都有房间来判断
   * @param sourceData - 墙体原始数据
   * @returns true表示内墙，false表示外墙
   */
  isInnerWall(sourceData: WallSourceData): boolean;
}