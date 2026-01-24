/**
 * 定制化背景墙模块
 * 提供背景墙模型的序列化/反序列化及核心业务逻辑
 */

import type { NCustomizedSketchModel, NCustomizedSketchModel_IO } from './NCustomizedSketchModel';
import type { Plane, Matrix3, Line3d } from './Geometry';
import type { Entity } from './Entity';
import type { SignalHook } from './SignalHook';

/**
 * 踢脚线切割信息
 */
export interface BaseboardCutterInfo {
  /** 切割路径，由多条3D线段组成的闭合路径 */
  cutPath: Line3d[];
  /** 补丁线段，用于修复切割后的缝隙 */
  patchLines: Line3d[];
}

/**
 * 面信息，包含曲线数据
 */
export interface FaceInfo {
  /** 面的边界曲线 */
  curve?: Line3d;
}

/**
 * 宿主面对象
 */
export interface HostFace {
  /** 面信息 */
  faceInfo?: FaceInfo;
  /** 表面对象，包含法线和变换信息 */
  surfaceObj: {
    /** 获取面的法线向量 */
    getNormal(): { x: number; y: number; z: number };
    /** 局部坐标到世界坐标的变换矩阵 */
    localToWorld: {
      toArray(): number[];
    };
  };
  /** 线框路径 */
  wirePath: {
    /** 外轮廓线段集合 */
    outer: unknown[];
  };
}

/**
 * 同线面数据结构
 */
interface SameLineFaceData {
  /** 关联的面对象 */
  face: HostFace;
  /** 地面线段（Z=0的水平线段） */
  floorLine?: Line3d;
}

/**
 * 草图数据结构
 */
interface Sketch {
  /** 草图边界 */
  bound: {
    /** 获取边界中心点 */
    center(): { x: number; y: number; z: number };
  };
  /** 3D转换矩阵 */
  convert3dMatrix?: THREE.Matrix4;
  /**
   * 镜像变换
   * @param matrix 镜像变换矩阵
   */
  mirror(matrix: Matrix3): void;
}

/**
 * 定制化背景墙IO类
 * 负责背景墙模型的序列化与反序列化
 */
export declare class NCustomizedBackgroundWall_IO extends NCustomizedSketchModel_IO {
  /**
   * 序列化背景墙模型
   * @param model 要序列化的模型实例
   * @param callback 序列化完成后的回调函数
   * @param includeMetadata 是否包含元数据，默认true
   * @param options 序列化选项
   * @returns 序列化后的数据对象
   */
  dump(
    model: NCustomizedBackgroundWall,
    callback?: (data: unknown, model: NCustomizedBackgroundWall) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): unknown;

  /**
   * 反序列化背景墙模型
   * @param data 序列化的数据
   * @param callback 反序列化完成后的回调函数
   * @param options 反序列化选项
   */
  load(
    data: unknown,
    callback?: (model: NCustomizedBackgroundWall) => void,
    options?: Record<string, unknown>
  ): void;
}

/**
 * 定制化背景墙模型类
 * 继承自草图模型，提供背景墙特有的投影、镜像、踢脚线切割等功能
 */
export declare class NCustomizedBackgroundWall extends NCustomizedSketchModel {
  /** 宿主面上的单一钩子（用于事件监听） */
  private _singleHooKOnHost: SignalHook<NCustomizedBackgroundWall>;

  /** 草图数据 */
  protected sketch: Sketch;

  /** 宿主面对象（背景墙所依附的墙面） */
  host?: HostFace;

  /**
   * 构造函数
   * @param id 模型唯一标识，默认空字符串
   * @param data 初始化数据
   */
  constructor(id?: string, data?: unknown);

  /**
   * 获取前投影平面
   * 返回经过草图变换矩阵变换后的XOY平面
   * @returns 变换后的投影平面
   */
  getFrontProjectionPlane(): Plane;

  /**
   * 镜像变换
   * 根据草图边界中心和Y轴方向进行镜像，并更新3D转换矩阵
   * @param axis 镜像轴参数
   */
  mirror(axis: unknown): void;

  /**
   * 获取同线连接面的变换矩阵
   * 计算与地面线段相交的所有面，并按交点参数排序，返回第一个面的变换矩阵
   * @param faces 同线连接的面对象数组
   * @returns 世界坐标变换矩阵
   */
  private getSameLineFacesMatrix(faces: HostFace[]): THREE.Matrix4;

  /**
   * 获取草图变换矩阵
   * @returns 变换矩阵
   */
  protected getSketchTransformMatrix(): THREE.Matrix4;

  /**
   * 获取IO实例
   * @returns IO类的单例
   */
  getIO(): NCustomizedBackgroundWall_IO;

  /**
   * 获取踢脚线切割信息
   * 根据宿主面的轮廓生成切割路径（矩形闭合路径）
   * @param hostFace 宿主面对象
   * @returns 踢脚线切割信息数组，若宿主面不匹配则返回空数组
   */
  getBaseboardCutterInfo(hostFace?: HostFace): BaseboardCutterInfo[];
}

/**
 * Z坐标误差容差（单位：毫米）
 */
declare const Z_TOLERANCE: 1e-6;

/**
 * 线段延长系数（用于线段延伸计算）
 */
declare const LINE_EXTENSION_FACTOR: 1e6;

/**
 * 默认排序值（用于未找到地面线时的排序）
 */
declare const DEFAULT_SORT_VALUE: 1e6;