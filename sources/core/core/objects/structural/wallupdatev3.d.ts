/**
 * WallUpdateV3 模块
 * 用于处理墙面更新和迁移相关逻辑，特别是开口面和孔洞面的材质混合铺贴处理
 */

import { MathUtil, Vector2, Vector3, Plane, Line3d } from 'math-library';
import { PavingOptionApi } from 'paving-api';

/**
 * 墙面材质信息接口
 */
interface Material {
  /** 混合涂料配置 */
  mixpaint?: MixPaint;
}

/**
 * 混合涂料配置接口
 */
interface MixPaint {
  /** 混合铺贴配置 */
  mixPave?: MixPave;
}

/**
 * 混合铺贴配置接口
 */
interface MixPave {
  /** 边界盒 */
  BBox: BoundingBox;
  /** 区域列表 */
  regions: Region[];
}

/**
 * 边界盒接口
 */
interface BoundingBox {
  /** 最小坐标点 */
  min: Vector2;
  /** 最大坐标点 */
  max: Vector2;
  /** 检查边界盒是否有效 */
  isValid(): boolean;
}

/**
 * 区域配置接口
 */
interface Region {
  /** 铺贴图案配置 */
  pattern: Pattern;
  /** 路径信息 */
  path: {
    /** 路径边界盒 */
    BBox: BoundingBox;
  };
}

/**
 * 图案配置接口
 */
interface Pattern {
  /** 铺贴选项 */
  pavingOption: PavingOption;
}

/**
 * 铺贴选项接口
 */
interface PavingOption {
  /** 旋转角度（度） */
  rotation: number;
  /** 参考点坐标 */
  point: Vector2;
  /** X轴偏移滑块值 */
  sliderOffsetX: number;
  /** Y轴偏移滑块值 */
  sliderOffsetY: number;
}

/**
 * 表面对象接口
 */
interface SurfaceObject {
  /** 表面几何体 */
  surface: Surface;
  /** 方向是否与表面一致 */
  sameDirWithSurface?: boolean;
  /** 获取表面法向量 */
  getNormal(): Vector3;
  /** 获取表面坐标系 */
  getCoord(): Coordinate;
  /** 将3D曲线转换为2D曲线 */
  getCurve2ds(curves: Line3d[]): Curve2d[];
}

/**
 * 表面几何体接口
 */
interface Surface {
  /** 判断表面是否为平面 */
  isPlane(): boolean;
  /** 获取表面坐标系 */
  getCoord(): Coordinate;
}

/**
 * 坐标系接口
 */
interface Coordinate {
  /** 获取坐标系原点 */
  getOrigin(): Vector3;
  /** 获取局部到世界的变换矩阵 */
  getLocalToWorldMatrix(): Matrix4x4;
}

/**
 * 2D曲线接口
 */
interface Curve2d {
  /** 获取曲线起点 */
  getStartPt(): Vector2;
  /** 获取曲线终点 */
  getEndPt(): Vector2;
}

/**
 * 4x4变换矩阵类型（占位符）
 */
type Matrix4x4 = unknown;

/**
 * 墙面面对象接口
 */
interface WallFace {
  /** 面的材质信息 */
  material?: Material;
  /** 表面对象 */
  surfaceObj: SurfaceObject;
}

/**
 * 墙面实体数据接口
 */
interface WallEntity {
  /** Z轴旋转角度（度） */
  ZRotation?: number;
  /** 所有面的字典 */
  faces: Record<string, WallFace>;
  /** 底部面列表 */
  bottomFaces: WallFace[];
}

/**
 * WallUpdateV3 类
 * 负责墙面V3版本的数据迁移和更新逻辑
 */
export declare class WallUpdateV3 {
  /**
   * 迁移墙面开口面数据
   * 遍历墙面的所有面，对符合条件的面进行孔洞面迁移处理
   * 
   * @param wallEntity - 墙面实体数据
   */
  migrationOpeningFaces(wallEntity: WallEntity): void;

  /**
   * 迁移单个孔洞面的混合铺贴数据
   * 根据墙面旋转角度重新计算铺贴图案的位置和旋转角度
   * 
   * @param face - 需要迁移的墙面面对象
   * @param zRotation - 墙面Z轴旋转角度（度）
   */
  migrationHoleFace(face: WallFace, zRotation: number): void;
}