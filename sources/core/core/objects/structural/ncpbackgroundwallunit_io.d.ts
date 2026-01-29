/**
 * Module: NCPBackgroundWallUnit_IO
 * 
 * 背景墙单元组件模块，提供背景墙单元的IO序列化和核心逻辑实现
 */

import { Entity } from './Entity';
import { NCPBackgroundWallBase_IO, NCPBackgroundWallBase } from './NCPBackgroundWallBase';
import { NCustomizedModelMolding } from './NCustomizedModelMolding';
import { Coordinate3, Line3d, Vector2, Vector3, Matrix4, MathUtil, Loop } from './Math';
import { Face } from './Face';
import { Floor } from './Floor';
import { NCPBackgroundWallBaseUtil } from './NCPBackgroundWallBaseUtil';

/**
 * 背景墙单元的IO序列化类
 * 负责数据的序列化和反序列化
 */
export declare class NCPBackgroundWallUnit_IO extends NCPBackgroundWallBase_IO {
  /**
   * 获取单例实例
   */
  static instance(): NCPBackgroundWallUnit_IO;
}

/**
 * 自托管装饰线条配置接口
 */
interface SelfMoldingConfig {
  /** 线条类型 (如 'left', 'right') */
  selfMoldingType: string;
  /** 坐标系 */
  coord: Coordinate3;
  /** 路径边缘3D标签 */
  path: Line3d[];
  /** 面标签 */
  faceTag: string;
  /** 轮廓高度 (单位: mm) */
  profileHeight: number;
  /** 轮廓宽度 (单位: mm) */
  profileWidth: number;
  /** 材质数据 */
  materialData: unknown;
  /** 偏移量 (单位: mm) */
  offset: number;
  /** 水平翻转 */
  flipX?: boolean;
  /** 垂直翻转 */
  flipY?: boolean;
  /** 翻转 */
  flip?: boolean;
  /** X轴偏移 */
  offsetX?: number;
  /** Y轴偏移 */
  offsetY?: number;
}

/**
 * 线条元数据接口
 */
interface MoldingMetadata {
  /** 检索ID */
  seekId: string;
  /** 轮廓数据 */
  profile: unknown;
  /** 法线纹理 */
  normalTexture: string;
  /** 高清法线纹理 */
  normalTextureHigh: string;
  /** 小图标URI */
  iconSmallURI: string;
  /** 内容类型 */
  contentType: {
    getTypeString(): string;
  };
}

/**
 * 打开文档额外参数接口
 */
interface OpenDocumentExtra {
  /** 宽度、深度、高度 */
  wdh: { W: number; D: number; H: number };
  /** 单位缩放比例 */
  unitScale: number;
  /** 墙线信息 */
  wallLine: unknown;
  /** 是否不计算位置 */
  dontCalcPosition: boolean;
  /** 是否使用WDH计算位置 */
  calcPosWithWDH: boolean;
  /** 是否使用最小最大值 */
  useMinMax: boolean;
}

/**
 * 目标面信息接口
 */
interface TargetFaceInfo {
  /** 外部面信息 */
  outer?: unknown[];
  /** 宽度、深度、高度信息 */
  wdh: { W: number; D: number; H: number };
  /** 墙线信息 */
  wallLine: unknown;
}

/**
 * 模型数据接口
 */
interface ModelData {
  /** 系统参数 */
  systemParams?: {
    /** 宽度 (单位: mm) */
    W: number;
    /** 深度 (单位: mm) */
    D: number;
    /** 高度 (单位: mm) */
    H: number;
  };
  /** 元数据 */
  meta?: unknown;
}

/**
 * 扫掠路径计算结果接口
 */
interface SweepPathResult {
  /** 依赖者ID */
  relyerId: string;
  /** 路径边缘3D标签集合 */
  pathCoedge3dsTags: Line3d[];
  /** 面标签 */
  faceTag: string;
}

/**
 * 镜像变换接口
 */
interface MirrorTransform {
  /** 4x4变换矩阵 */
  matrix4: Matrix4;
}

/**
 * 背景墙单元核心类
 * 
 * 提供背景墙单元的完整功能，包括：
 * - 几何尺寸管理
 * - 自托管装饰线条的生成和管理
 * - 位置和尺寸更新
 * - 墙面裁切信息计算
 * - 镜像变换
 */
export declare class NCPBackgroundWallUnit extends NCPBackgroundWallBase {
  /**
   * 自托管的装饰线条集合
   */
  selfHostCosmeticMoldings: NCustomizedModelMolding[];

  /**
   * 宿主对象上的信号钩子
   * @private
   */
  private _singleHooKOnHost: HSCore.Util.SignalHook;

  /**
   * 是否使用最小最大值限制
   */
  useMinMax: boolean;

  /**
   * 构造函数
   * @param id - 实体唯一标识符
   * @param parameters - 参数对象
   */
  constructor(id?: string, parameters?: unknown);

  /**
   * 获取打开文档时的额外配置信息
   * @param targetFace - 目标面信息
   * @param useMinMax - 是否使用最小最大值限制
   * @returns 打开文档的额外配置
   */
  getOpenDocumentExtra(targetFace: TargetFaceInfo, useMinMax: boolean): OpenDocumentExtra;

  /**
   * 从数据更新模型
   * @param data - 模型数据
   * @param skipUpdate - 是否跳过更新
   */
  updateModelFromData(data: ModelData, skipUpdate: boolean): void;

  /**
   * 生成自托管装饰线条
   * @param config - 线条配置
   * @param metadata - 线条元数据
   */
  generateSelfMolding(config: SelfMoldingConfig, metadata: MoldingMetadata): void;

  /**
   * 计算自托管线条的扫掠路径
   * @param config - 线条配置
   * @returns 扫掠路径计算结果
   */
  calcSelfMoldingSweepPath(config: SelfMoldingConfig): SweepPathResult;

  /**
   * 根据类型清除自托管线条
   * @param moldingType - 线条类型 (如 'left', 'right')
   */
  clearSelfMoldingByType(moldingType: string): void;

  /**
   * 根据类型查找自托管线条
   * @param moldingType - 线条类型
   * @returns 找到的线条对象，未找到则返回 undefined
   */
  findSelfMoldingByType(moldingType: string): NCustomizedModelMolding | undefined;

  /**
   * 更新自托管线条的位置
   * 根据背景墙单元的尺寸重新计算左右线条的位置和路径
   */
  updateSelfMoldingPosition(): void;

  /**
   * 获取包含装饰线条的轮廓
   * @returns 轮廓顶点数组
   */
  getOutlineIncludeMolding(): Vector2[];

  /**
   * 获取墙面上的闭合循环
   * @returns 墙面循环对象，如果宿主不是有效面则返回 undefined
   */
  getLoopOnWallFace(): Loop | undefined;

  /**
   * 获取IO序列化实例
   * @returns IO序列化对象
   */
  getIO(): NCPBackgroundWallUnit_IO;

  /**
   * 获取踢脚线裁切信息
   * @param targetFace - 目标面对象
   * @returns 踢脚线裁切信息
   */
  getBaseboardCutterInfo(targetFace?: Face): unknown;

  /**
   * 设置宿主对象
   * @param host - 宿主对象
   * @private
   */
  protected _setHost(host: unknown): void;

  /**
   * 监听宿主对象上的信号
   * @param host - 宿主对象
   * @private
   */
  private _listenSignalOnHost(host: unknown): void;

  /**
   * 镜像变换
   * @param transform - 镜像变换参数
   */
  mirror(transform: MirrorTransform): void;

  /**
   * X方向长度 (单位: m)
   */
  XLength: number;

  /**
   * Y方向长度 (单位: m)
   */
  YLength: number;

  /**
   * Z方向长度 (单位: m)
   */
  ZLength: number;

  /**
   * X方向缩放比例
   */
  XScale: number;

  /**
   * Y方向缩放比例
   */
  YScale: number;

  /**
   * Z方向缩放比例
   */
  ZScale: number;

  /**
   * X方向尺寸 (单位: m)
   */
  XSize: number;

  /**
   * Y方向尺寸 (单位: m)
   */
  YSize: number;

  /**
   * Z方向尺寸 (单位: m)
   */
  ZSize: number;

  /**
   * X坐标 (单位: m)
   */
  x: number;

  /**
   * Y坐标 (单位: m)
   */
  y: number;

  /**
   * Z坐标 (单位: m)
   */
  z: number;

  /**
   * 旋转角度 (单位: 度)
   */
  rotation: number;

  /**
   * 唯一标识符
   */
  id: string;

  /**
   * 参数对象
   */
  parameters: {
    targetFaceInfo?: TargetFaceInfo;
    [key: string]: unknown;
  };

  /**
   * 宿主对象
   */
  host: unknown;

  /**
   * 文档对象
   */
  doc: {
    designMetadata: Map<string, unknown>;
  };

  /**
   * 子对象集合
   */
  children: Record<string, unknown>;

  /**
   * 元数据
   */
  metadata: unknown;
}