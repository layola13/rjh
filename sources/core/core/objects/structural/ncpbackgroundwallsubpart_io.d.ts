/**
 * Module: NCPBackgroundWallSubpart_IO
 * 背景墙子部件的IO处理和模型定义模块
 */

import { Entity } from './Entity';
import { NCPBackgroundWallBase, NCPBackgroundWallBase_IO } from './NCPBackgroundWallBase';
import { PmWallSDK, WallDataOptions, WallDataResult } from './PmWallSDK';
import { NCustomizedFeatureModelUtil } from './NCustomizedFeatureModelUtil';
import { Plane, Vector3 } from './Geometry';

/**
 * 目标面信息
 */
export interface TargetFaceInfo {
  // 目标面标识或相关数据
  [key: string]: unknown;
}

/**
 * 墙体数据：宽度、深度、高度
 */
export interface WallDimensions {
  W: number; // 宽度（毫米）
  D: number; // 深度（毫米）
  H: number; // 高度（毫米）
}

/**
 * 墙线信息
 */
export interface WallLineInfo {
  [key: string]: unknown;
}

/**
 * 顶层实体标识
 */
export interface TopLevelId {
  seekId: string;
  entityId: string;
}

/**
 * 实体ID路径节点
 */
export interface EIdPathNode {
  eId: string;
  idx: number;
}

/**
 * 打开文档时的额外信息
 */
export interface OpenDocumentExtra {
  wdh?: WallDimensions;
  unitScale: number;
  wallLine?: WallLineInfo;
  dontCalcPosition: boolean;
  calcPosWithWDH: boolean;
  eIdPath: EIdPathNode[];
  hideFaces?: string[];
  useMinMax: boolean;
  topLevelId?: TopLevelId;
}

/**
 * 子部件元数据
 */
export interface SubpartMetadata {
  eId: string;
  docFile: string;
  matrix: Matrix4Like;
  params: Record<string, unknown>;
  visible?: boolean;
}

/**
 * 类似THREE.Matrix4的矩阵数据
 */
export interface Matrix4Like {
  toArray(): number[];
}

/**
 * 系统参数
 */
export interface SystemParams {
  W: number; // 宽度（毫米）
  D: number; // 深度（毫米）
  H: number; // 高度（毫米）
}

/**
 * 模型数据
 */
export interface ModelData {
  systemParams?: SystemParams;
  [key: string]: unknown;
}

/**
 * 加载选项
 */
export interface LoadOptions {
  [key: string]: unknown;
}

/**
 * 转储选项
 */
export interface DumpOptions {
  [key: string]: unknown;
}

/**
 * 序列化后的实体数据
 */
export interface SerializedEntity {
  eId?: string;
  [key: string]: unknown;
}

/**
 * 背景墙参数
 */
export interface BackgroundWallParameters {
  targetFaceInfo: TargetFaceInfo;
  [key: string]: unknown;
}

/**
 * 目标面信息结果
 */
export interface TargetFaceResult {
  wdh?: WallDimensions;
  wallLine?: WallLineInfo;
}

/**
 * 背景墙子部件的IO处理类
 * 负责序列化和反序列化背景墙子部件
 */
export declare class NCPBackgroundWallSubpart_IO extends NCPBackgroundWallBase_IO {
  /**
   * 获取单例实例
   */
  static instance(): NCPBackgroundWallSubpart_IO;

  /**
   * 将实体转储为可序列化的数据
   * @param entity - 要转储的实体
   * @param context - 转储上下文（未使用）
   * @param includeChildren - 是否包含子实体
   * @param options - 转储选项
   * @returns 序列化后的实体数组
   */
  dump(
    entity: NCPBackgroundWallSubpart,
    context?: unknown,
    includeChildren?: boolean,
    options?: DumpOptions
  ): SerializedEntity[];

  /**
   * 从序列化数据加载实体
   * @param entity - 目标实体
   * @param data - 序列化的数据
   * @param options - 加载选项
   */
  load(
    entity: NCPBackgroundWallSubpart,
    data: SerializedEntity,
    options?: LoadOptions
  ): void;
}

/**
 * 背景墙子部件模型类
 * 表示背景墙中的一个可定制的子部件
 */
export declare class NCPBackgroundWallSubpart extends NCPBackgroundWallBase {
  /** 实体ID */
  eId?: string;

  /** 文档文件路径 */
  docFile?: string;

  /** 子部件的变换矩阵 */
  subpartMatrix?: Matrix4Like;

  /** 子部件的参数 */
  subpartParams?: Record<string, unknown>;

  /** 是否可见 */
  visible: boolean;

  /** 需要隐藏的面列表 */
  hideFaces?: string[];

  /** X方向长度（米） */
  XLength: number;

  /** Y方向长度（米） */
  YLength: number;

  /** Z方向长度（米） */
  ZLength: number;

  /** X方向缩放 */
  XScale: number;

  /** Y方向缩放 */
  YScale: number;

  /** Z方向缩放 */
  ZScale: number;

  /** X坐标 */
  x: number;

  /** Y坐标 */
  y: number;

  /** Z坐标 */
  z: number;

  /** X轴旋转角度（度） */
  XRotation: number;

  /** Y轴旋转角度（度） */
  YRotation: number;

  /** Z轴旋转角度（度） */
  ZRotation: number;

  /** Y方向尺寸 */
  YSize: number;

  /** 参数配置 */
  parameters: BackgroundWallParameters;

  /** 父实体 */
  parent?: Entity;

  /** 实体元数据 */
  metadata: {
    seekId: string;
    parametricMeta?: string;
  };

  /** 实体ID */
  id: string;

  /**
   * 构造函数
   * @param name - 实体名称（默认为空字符串）
   * @param metadata - 实体元数据
   */
  constructor(name?: string, metadata?: unknown);

  /**
   * 获取墙体数据
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   * @param additionalParams - 额外参数
   * @returns 墙体数据结果
   */
  getWallData(
    param1: unknown,
    param2: unknown,
    additionalParams: Record<string, unknown>
  ): WallDataResult;

  /**
   * 初始化模型文档
   * @param parameters - 参数对象
   * @param param2 - 第二个参数
   * @param shouldSkip - 是否跳过初始化
   */
  initModelDocument(
    parameters: BackgroundWallParameters,
    param2: unknown,
    shouldSkip: boolean
  ): void;

  /**
   * 初始化背景墙文档（继承自父类）
   * @param targetFaceInfo - 目标面信息
   * @param param2 - 第二个参数
   * @param param3 - 第三个参数
   */
  initBackgroundWallDocument(
    targetFaceInfo: TargetFaceInfo,
    param2: unknown,
    param3: unknown
  ): void;

  /**
   * 根据目标面获取信息（继承自父类）
   * @param targetFaceInfo - 目标面信息
   * @returns 目标面结果
   */
  getInfoByTargetFace(targetFaceInfo: TargetFaceInfo): TargetFaceResult;

  /**
   * 获取打开文档时的额外信息
   * @param targetFaceInfo - 目标面信息
   * @returns 打开文档的额外信息
   */
  getOpenDocumentExtra(targetFaceInfo: TargetFaceInfo): OpenDocumentExtra;

  /**
   * 判断内容是否在房间内
   * @param content - 要检查的内容
   * @param strictMode - 是否使用严格模式
   * @returns 是否在房间内
   */
  isContentInRoom(content: unknown, strictMode?: boolean): boolean;

  /**
   * 获取实体ID路径
   * @returns 实体ID路径数组
   */
  getEIdPath(): EIdPathNode[];

  /**
   * 从数据更新模型
   * @param data - 模型数据
   * @param skipSystemParams - 是否跳过系统参数
   */
  updateModelFromData(data: ModelData, skipSystemParams: boolean): void;

  /**
   * 更新子部件元数据
   * @param metadata - 子部件元数据
   * @param hideFaces - 需要隐藏的面列表
   */
  updateSubpartMeta(metadata: SubpartMetadata, hideFaces?: string[]): void;

  /**
   * 获取前投影平面
   * @returns 前投影平面
   */
  getFrontProjectionPlane(): Plane;

  /**
   * 获取顶投影平面
   * @returns 顶投影平面
   */
  getTopProjectionPlane(): Plane;

  /**
   * 更新子部件的位置和旋转
   * 从subpartMatrix中提取变换信息并应用到实体
   */
  updateSubpart(): void;

  /**
   * 获取属性映射
   * @returns 属性键值对的Map
   */
  get properties(): Map<string, unknown>;

  /**
   * 获取文档文件路径
   * @returns 文档文件路径
   */
  getDocFile(): string | undefined;

  /**
   * 获取IO处理器实例
   * @returns IO处理器
   */
  getIO(): NCPBackgroundWallSubpart_IO;
}