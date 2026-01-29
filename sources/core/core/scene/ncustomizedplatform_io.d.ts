/**
 * Module: NCustomizedPlatform_IO
 * 自定义平台模型的IO处理和核心类定义
 */

import type { NCustomizedSketchModel_IO, NCustomizedSketchModel } from './NCustomizedSketchModel';
import type { Entity } from './Entity';
import type { SignalHook } from './SignalHook';
import type { Logger } from './Logger';
import type { Vector2, Vector3, Matrix4, Plane, Tolerance } from './Math';
import type { Shell, Face, Loop } from './Brep';
import type { SketchBrepNameHelper } from './SketchBrepNameHelper';

/**
 * 草图面边界信息接口
 */
export interface SketchFaceBoundInfo {
  /** 草图边界 [x, y, width, height] */
  sketchBound: [number, number, number, number] | null;
  /** Z轴最大值（挤出高度） */
  maxValue: number;
}

/**
 * 草图面拉伸信息
 */
export interface SketchFaceExtrusionData {
  /** 外轮廓离散点集合 */
  outer: Vector2[];
  /** 内孔轮廓离散点集合数组 */
  holes: Vector2[][];
  /** 拉伸高度 */
  height: number;
}

/**
 * 草图面与其拉伸值的映射
 */
export interface SketchFaceValueMapping {
  /** 2D草图面 */
  face2d: Face;
  /** 拉伸值（高度） */
  value: number;
}

/**
 * 壳体草图面映射项
 */
export interface ShellSketchFaceMapping {
  /** 关联的草图面 */
  face: Face;
  /** 拉伸值 */
  value: number;
}

/**
 * 序列化选项
 */
export interface DumpOptions {
  [key: string]: unknown;
}

/**
 * 反序列化选项
 */
export interface LoadOptions {
  [key: string]: unknown;
}

/**
 * 自定义平台模型的IO处理类
 * 负责序列化和反序列化NCustomizedPlatform实例
 */
export declare class NCustomizedPlatform_IO extends NCustomizedSketchModel_IO {
  /**
   * 获取单例实例
   */
  static instance(): NCustomizedPlatform_IO;

  /**
   * 序列化平台模型为JSON对象
   * @param model - 要序列化的模型实例
   * @param postProcessor - 后处理回调函数，可对序列化结果进行额外处理
   * @param includeDefaults - 是否包含默认值
   * @param options - 序列化选项
   * @returns 序列化后的JSON对象
   */
  dump(
    model: NCustomizedPlatform,
    postProcessor?: (json: Record<string, unknown>, model: NCustomizedPlatform) => void,
    includeDefaults?: boolean,
    options?: DumpOptions
  ): Record<string, unknown>;

  /**
   * 从JSON对象反序列化平台模型
   * @param json - JSON数据对象
   * @param target - 目标模型实例
   * @param options - 反序列化选项
   */
  load(
    json: Record<string, unknown>,
    target: NCustomizedPlatform,
    options?: LoadOptions
  ): void;
}

/**
 * 自定义平台模型类
 * 继承自草图模型，提供基于草图的平台化3D建模能力
 */
export declare class NCustomizedPlatform extends NCustomizedSketchModel {
  /**
   * 信号钩子，用于监听和响应模型事件
   */
  readonly signalHook: SignalHook<NCustomizedPlatform>;

  /**
   * 创建自定义平台实例
   * @param id - 模型唯一标识符，默认为空字符串
   * @param config - 配置参数
   */
  constructor(id?: string, config?: unknown);

  /**
   * 当草图发生变化时的回调
   * @param changeType - 变化类型标识
   */
  onSketchDirty(changeType: string): void;

  /**
   * 移动附加内容到新位置
   * @param axis - 移动的轴向 ("x" | "y" | "z" | "sketch")
   * @param offset - 偏移量（可选）
   */
  moveAttachedContents(axis: 'x' | 'y' | 'z' | 'sketch', offset?: number): void;

  /**
   * 根据草图初始化内容位置
   * 计算草图边界并设置平台的位置和尺寸
   */
  initializeContentPositionBySketch(): void;

  /**
   * 获取草图到世界坐标的变换矩阵
   * @returns 4x4变换矩阵
   */
  getSketchTransformMatrix(): Matrix4;

  /**
   * 生成B-Rep（边界表示）几何体
   * @param preview - 是否为预览模式，若为true则不更新实际breps属性
   */
  generateBrep(preview?: boolean): void;

  /**
   * 获取底面投影平面
   * @returns 投影平面对象
   */
  getBottomProjectionPlane(): Plane;

  /**
   * 镜像变换
   * @param mirrorPlane - 镜像平面，包含matrix3变换矩阵
   */
  mirror(mirrorPlane: { matrix3: THREE.Matrix3 }): void;

  /**
   * 获取对应的IO处理器实例
   * @returns IO处理器
   */
  getIO(): NCustomizedPlatform_IO;

  /**
   * 生成草图对应的壳体（Shell）几何
   * @returns 壳体数组
   */
  protected generateSketchShells(): Shell[];

  /**
   * 计算壳体与草图面的映射关系
   * @param shell - 目标壳体
   * @param faceMappings - 草图面与拉伸值的映射数组
   * @returns 壳体草图面映射数组
   */
  protected calcShellSketchFaceMp(
    shell: Shell,
    faceMappings: SketchFaceValueMapping[]
  ): ShellSketchFaceMapping[];

  /**
   * 获取草图面的边界信息
   * @returns 边界信息对象，如果草图不存在则返回null
   */
  protected getSketchFacesBoundInfo(): SketchFaceBoundInfo | null;

  /**
   * 遍历所有内容对象并执行回调
   * @param callback - 对每个内容对象执行的回调函数
   */
  protected forEachContent(callback: (content: { x: number; y: number; z: number }) => void): void;

  /**
   * 根据草图关联更新材质映射
   */
  protected updateMaterialMpBysketchAssoc(): void;

  /**
   * 刷新所有斜接（mitre）
   */
  protected refreshAllMitres(): void;

  /**
   * X轴长度（宽度）
   */
  XLength: number;

  /**
   * Y轴长度（深度）
   */
  YLength: number;

  /**
   * Z轴长度（高度）
   */
  ZLength: number;

  /**
   * Z轴尺寸（可能为负值）
   */
  ZSize: number;

  /**
   * 草图对象
   */
  protected _sketch: unknown;

  /**
   * B-Rep几何体数组
   */
  protected _breps: Shell[];

  /**
   * B-Rep变化信号
   */
  readonly signalBrepChanged: {
    dispatch(): void;
  };

  /**
   * 宿主变化信号
   */
  readonly signalHostChanged: {
    dispatch(): void;
  };

  /**
   * 宿主对象
   */
  host: unknown | null;

  /**
   * 移除模型
   */
  remove(): void;

  /**
   * 草图对象访问器
   */
  get sketch(): unknown;
  set sketch(value: unknown);

  /**
   * B-Rep几何体访问器
   */
  get breps(): Shell[];
  set breps(value: Shell[]);
}

/**
 * 实体注册命名空间
 */
declare namespace Entity {
  /**
   * 注册模型类到实体系统
   * @param modelClass - 模型类标识常量
   * @param constructor - 类构造函数
   */
  function registerClass(
    modelClass: string,
    constructor: typeof NCustomizedPlatform
  ): void;
}

/**
 * 模型类常量定义
 */
declare namespace HSConstants {
  enum ModelClass {
    NCustomizedPlatform = 'NCustomizedPlatform'
  }
}

/**
 * 核心数学和几何工具
 */
declare namespace HSCore.Util.Math {
  /**
   * 判断点是否在带孔的多边形内
   * @param point - 测试点
   * @param outerLoop - 外轮廓点集
   * @param holes - 内孔点集数组
   * @param includeEdge - 是否包含边界点
   * @returns 点是否在多边形内
   */
  function isPointInPolygonWithHoles(
    point: Vec2,
    outerLoop: Vec2[],
    holes: Vec2[][],
    includeEdge: boolean
  ): boolean;

  /**
   * 二维向量类
   */
  class Vec2 {
    constructor(x: number, y: number);
    x: number;
    y: number;
  }
}

/**
 * B-Rep算法模块
 */
declare namespace Brep.alg {
  namespace ShellEdit {
    /**
     * 拉伸或收缩面
     * @param face - 目标面
     * @param offset - 偏移向量
     * @param shells - 关联的壳体数组
     * @returns 操作结果，包含可能的错误信息
     */
    function pullPushFace(
      face: Face,
      offset: Vector3,
      shells: Shell[]
    ): { errorStr?: string };
  }
}