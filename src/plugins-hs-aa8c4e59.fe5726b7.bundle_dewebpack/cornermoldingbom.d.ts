/**
 * 角线装饰条BOM计算模块
 * @module CornerMoldingBom
 */

import { Matrix3, Matrix4, Vector3, Plane, MathAlg } from './geometry-types';
import { HSCore, HSPaveSDK } from './hs-types';

/**
 * 表示一个3D曲线
 */
interface Curve3D {
  /**
   * 获取曲线起点
   */
  getStartPt(): Vector3;
  
  /**
   * 获取曲线终点
   */
  getEndPt(): Vector3;
  
  /**
   * 对曲线应用变换矩阵
   * @param transform - 变换矩阵
   */
  transformed(transform: Matrix4): Curve3D;
}

/**
 * 表示一个2D曲线
 */
interface Curve2D {
  /**
   * 获取曲线起点
   */
  getStartPt(): { x: number; y: number };
  
  /**
   * 获取曲线终点
   */
  getEndPt(): { x: number; y: number };
  
  /**
   * 克隆曲线
   */
  clone(): Curve2D;
  
  /**
   * 对曲线应用变换矩阵
   * @param transform - 2D变换矩阵
   */
  transform(transform: Matrix3): void;
}

/**
 * 表示2D路径结构
 */
interface Path2D {
  /** 外部轮廓曲线数组 */
  outer: Curve2D[];
  
  /** 孔洞数组，每个孔洞是曲线数组 */
  holes: Curve2D[][];
}

/**
 * 表示3D路径结构
 */
interface Path3D {
  /** 外部轮廓曲线数组 */
  outer: Curve3D[];
}

/**
 * 表示铺贴图案
 */
interface PavePattern {
  // 铺贴图案的具体属性
}

/**
 * 表示铺贴区域
 */
interface PaveRegion {
  /** 区域路径 */
  path: Path2D;
  
  /** 区域使用的图案 */
  pattern: PavePattern | unknown;
}

/**
 * 混合铺贴配置
 */
interface MixPave {
  /**
   * 遍历所有普通区域
   * @param callback - 对每个区域执行的回调函数
   */
  forEachRegion(callback: (region: PaveRegion) => void): void;
  
  /**
   * 遍历所有自由区域
   * @param callback - 对每个区域执行的回调函数
   */
  forEachFreeRegion(callback: (region: PaveRegion) => void): void;
}

/**
 * 混合涂料材质配置
 */
interface MixPaint {
  /** 混合铺贴配置 */
  mixPave: MixPave;
}

/**
 * 材质配置
 */
interface Material {
  /** 混合涂料配置（可选） */
  mixpaint?: MixPaint;
}

/**
 * 表面对象
 */
interface SurfaceObject {
  /** 本地坐标系到世界坐标系的变换矩阵 */
  localToWorld: Matrix4;
}

/**
 * 面对象
 */
interface Face {
  /** 面的唯一标识符 */
  id: string;
  
  /** 面的3D原始路径 */
  rawPath: Path3D;
  
  /** 面的2D孔洞路径数组 */
  holesPath2d: Path2D[];
  
  /** 面的表面对象 */
  surfaceObj: SurfaceObject;
  
  /** 面的材质配置 */
  material?: Material;
}

/**
 * 面组偏移信息
 */
interface FaceGroupOffset {
  /** 左侧偏移 */
  left: number;
  
  /** 底部偏移 */
  bottom: number;
}

/**
 * 带长度信息的点
 */
interface PointWithLength {
  /** 投影长度 */
  length: number;
  
  /** 3D点坐标 */
  pt: Vector3;
}

/**
 * 角线装饰条信息
 */
interface CornerMoldingInfo {
  /** 装饰条长度 */
  length: number;
  
  /** 装饰条两端点 */
  line: [Vector3, Vector3];
  
  /** 是否跨两个面 */
  isTwoFace: boolean;
}

/**
 * 角线装饰条BOM计算类
 * 用于计算两个相邻面之间的角线装饰条信息
 */
export declare class CornerMoldingBom {
  /** 第一个面 */
  readonly face1: Face;
  
  /** 第二个面 */
  readonly face2: Face;
  
  /** 两个面的共享边（3D曲线） */
  shareEdge?: Curve3D;
  
  /** 计算得到的角线装饰条数组 */
  corners?: CornerMoldingInfo[];
  
  /**
   * 构造函数
   * @param face1 - 第一个面
   * @param face2 - 第二个面
   */
  constructor(face1: Face, face2: Face);
  
  /**
   * 计算角线装饰条信息
   * 根据两个面的铺贴信息和共享边，计算需要的装饰条
   * @returns 装饰条信息数组
   */
  calcCornerMolding(): CornerMoldingInfo[];
  
  /**
   * 获取单个面的角线装饰条信息
   * @param face - 要处理的面
   * @returns 该面上的装饰条端点数组，每个元素包含两个端点
   */
  private getFaceCornerMolding(face: Face): [Vector3, Vector3][] | undefined;
  
  /**
   * 获取面组的变换矩阵
   * 当面属于混合涂料装饰时，返回相应的偏移变换
   * @param face - 面对象
   * @returns 2D变换矩阵或undefined
   */
  private getGroupFaceTransform(face: Face): Matrix3 | undefined;
  
  /**
   * 获取铺贴区域中与共享边相交的边
   * @param region - 铺贴区域
   * @param holesPath - 孔洞路径数组
   * @param shareEdge2d - 2D共享边
   * @param inverseTransform - 逆变换矩阵
   * @param result - 结果数组，用于存储找到的边
   */
  private getRegionEdge(
    region: PaveRegion,
    holesPath: Path2D[],
    shareEdge2d: Curve2D,
    inverseTransform: Matrix4,
    result: [Vector3, Vector3][]
  ): void;
  
  /**
   * 过滤重复的装饰条段
   * 将装饰条按照沿共享边的投影长度排序并合并重叠部分
   * @param edges - 装饰条端点数组
   * @returns 过滤后的带长度信息的装饰条数组
   */
  private filterRepeat(edges: [Vector3, Vector3][]): [PointWithLength, PointWithLength][];
  
  /**
   * 计算两个面的共享边装饰条
   * 比较两个面的装饰条信息，计算最终需要的装饰条
   * @param face1Edges - 第一个面的装饰条信息
   * @param face2Edges - 第二个面的装饰条信息
   * @returns 最终的装饰条信息数组
   */
  private computeShareEdge(
    face1Edges: [PointWithLength, PointWithLength][],
    face2Edges: [PointWithLength, PointWithLength][]
  ): CornerMoldingInfo[];
}