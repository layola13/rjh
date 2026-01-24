/**
 * BaseDwgUtil - 基础DWG工具类
 * 提供DWG数据转换和变换操作的静态工具方法
 */

import { FeatureTypeEnum } from './FeatureTypeEnum';

/**
 * 三维向量接口
 */
export interface Vector3 {
  x: number;
  y: number;
  z: number;
  clone(): Vector3;
  transform(matrix: Matrix4): void;
}

/**
 * 4x4变换矩阵接口
 */
export interface Matrix4 {
  /**
   * 判断是否为单位矩阵
   */
  isIdentity(): boolean;
  
  /**
   * 获取逆矩阵
   */
  inversed(): Matrix4 | null;
}

/**
 * 材质数据接口
 */
export interface MaterialData {
  /**
   * 转换为材质对象
   */
  toMaterialObj(): MaterialObject;
}

/**
 * 材质对象接口
 */
export interface MaterialObject {
  // 材质具体属性根据实际业务定义
  [key: string]: unknown;
}

/**
 * 面组数据 - 包含外轮廓和孔洞
 */
export interface FaceGroup {
  /** 外部轮廓点集 */
  outer: Vector3[];
  /** 内部孔洞点集数组（可选） */
  holes?: Vector3[][];
}

/**
 * 砖块数据 - 包含材质和几何信息
 */
export interface Brick {
  /** 砖块材质 */
  material: MaterialObject;
  /** 外部轮廓 */
  outer: Vector3[];
  /** 内部孔洞（可选） */
  holes?: Vector3[][];
}

/**
 * 循环数据 - 仅包含几何轮廓
 */
export interface Loop {
  /** 外部轮廓 */
  outer: Vector3[];
  /** 内部孔洞（可选） */
  holes?: Vector3[][];
}

/**
 * 块数据 - 包含多个砖块
 */
export interface Block {
  /** 砖块集合 */
  bricks: Brick[];
}

/**
 * 区域数据 - 包含循环、块和类型
 */
export interface Region {
  /** 循环集合 */
  loops: Loop[];
  /** 块集合 */
  blocks: Block[];
  /** 特征类型 */
  type: FeatureTypeEnum;
}

/**
 * 水刀瓷砖数据接口（待扩展）
 */
export interface WaterJetTile {
  // 根据实际业务定义
  [key: string]: unknown;
}

/**
 * DWG数据结构 - 包含区域和水刀瓷砖
 */
export interface DwgData {
  /** 区域集合 */
  regions: Region[];
  /** 水刀瓷砖集合 */
  waterJetTiles: WaterJetTile[];
}

/**
 * BaseDwgUtil - DWG数据处理工具类
 * 提供材质数据转换、面组变换等静态方法
 */
export declare class BaseDwgUtil {
  /**
   * 根据材质数据和面组数据生成DWG数据
   * 
   * @param materialData - 材质数据对象
   * @param faceGroups - 面组数据数组
   * @returns DWG数据对象，如果面组为空则返回undefined
   * 
   * @example
   *