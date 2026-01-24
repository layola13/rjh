/**
 * 导出模型生成器
 * 负责解析WebCC数据并生成3D模型场景
 */

import type { Scene, TransformNode, Mesh, Vector2, Vector3, Vector4, Material, Quaternion, Color3, Color4 } from '@babylonjs/core';

/**
 * 顶层节点数据
 */
export interface TopNodeData {
  /** 场景节点 */
  node: TransformNode;
  /** 关联数据 */
  data?: {
    uid?: number;
    [key: string]: unknown;
  };
  /** 是否反向 */
  reverse: boolean;
}

/**
 * 动画数组集合
 */
export interface AnimationCollections {
  /** 通用动画数组 */
  animationArray: unknown[];
  /** 推拉门动画数组 */
  ptDoorAnimationArray: unknown[];
  /** 移动动画数组 */
  animationMoveArray: unknown[];
  /** 旋转动画数组 */
  animationRotArray: unknown[];
  /** 折叠扇动画数组 */
  animationFoldLeafArray: unknown[];
  /** 爆炸视图动画数组 */
  animationExplosionArray: unknown[];
}

/**
 * WebCC类数据结构
 */
export interface WebCCClassData {
  /** 背景墙数据 */
  bgWall?: unknown;
  /** 框架列表 */
  frames: Frame[];
  /** 角点列表 */
  corners?: Corner[];
  /** 连接器列表 */
  connectors: Connector[];
  /** 墙体列表 */
  walls: Wall[];
  /** 颜色配置 */
  colors?: {
    bar?: string;
    glass?: string;
    hardware?: string;
  };
}

/**
 * 框架数据
 */
export interface Frame {
  id: number;
  seriesId?: number;
  frameType?: string;
  /** 锚点位置（米） */
  anchor: { x: number; y: number };
  /** T型角标记 */
  tCorner?: boolean;
  /** 关闭对象 */
  closeObject?: unknown;
  /** 中梃列表 */
  mullions?: unknown[];
  /** 固定玻璃列表 */
  glasses?: unknown[];
  /** 护栏扇 */
  guardSash?: unknown[];
  /** 玻璃扇 */
  glassLeafs?: unknown[];
  /** 纱窗扇 */
  screenLeafs?: unknown[];
  /** 防盗网 */
  antiTheft?: unknown[];
  /** 侧轨固定件 */
  sideTrackFixeds?: unknown[];
  /** 滑动扇 */
  slides?: unknown[];
  /** 折叠扇 */
  foldLeafs?: unknown[];
  /** 固定转角框 */
  fixedTurningFrames?: unknown[];
  /** 扇转角框 */
  sashTurningFrames?: unknown[];
  /** 面板列表 */
  panels?: unknown[];
  /** 遮阳帘 */
  shade?: unknown;
  /** 标记列表 */
  marks?: unknown[];
}

/**
 * 角点数据
 */
export interface Corner {
  id: number;
  type: string;
  /** 起点坐标（米） */
  startPt: { x: number; y: number };
  /** 终点坐标（米） */
  endPt: { x: number; y: number };
  /** 角度（度） */
  angle: number;
  /** 宿主框架ID */
  hostFrameId?: number;
  /** 角点关联的框架ID列表 */
  cornerFrameIds: number[];
}

/**
 * 连接器数据
 */
export interface Connector {
  id: number;
  /** 起点坐标（米） */
  startPt: { x: number; y: number };
  /** 终点坐标（米） */
  endPt: { x: number; y: number };
}

/**
 * 墙体数据
 */
export interface Wall {
  id: number;
  /** 墙体顶点坐标列表（米） */
  pts: Array<{ x: number; y: number }>;
}

/**
 * 挤出模型配置
 */
export interface ExtrudeModelOptions {
  /** 2D形状路径 */
  shape2d: Vector2[];
  /** 材质 */
  mat?: Material;
  /** 面UV坐标 */
  faceUV?: Vector4[];
  /** 孔洞列表 */
  holes?: Vector2[][];
  /** 面颜色 */
  faceColors?: Color4[];
  /** 面UV数组 */
  faceUVs?: Vector4[];
  /** 2D路径 */
  path2?: Vector2[];
}

/**
 * UV计算模式枚举
 */
export enum ModeCalFaceUVEnum {
  /** 固定UV */
  FixedUV = 0,
  /** 固定U方向 */
  FixedU = 1,
  /** 固定V方向 */
  FixedV = 2,
  /** 自定义 */
  Custom = 3
}

/**
 * 导出模式枚举
 */
export enum ExportModeEnum {
  /** 标准模式 */
  Standard = 0,
  /** OBJ导出模式 */
  OBJ = 1
}

/**
 * 导出模型生成器
 * 提供WebCC数据解析和3D模型生成功能
 */
export default class ExportModelGenerator {
  /** 当前场景实例 */
  static scene: Scene;
  
  /** 动画数组 */
  static animationArray: unknown[];
  
  /** 推拉门动画数组 */
  static ptDoorAnimationArray: unknown[];
  
  /** 移动动画数组 */
  static animationMoveArray: unknown[];
  
  /** 旋转动画数组 */
  static animationRotArray: unknown[];
  
  /** 折叠扇动画数组 */
  static animationFoldLeafArray: unknown[];
  
  /** 爆炸视图动画数组 */
  static animationExplosionArray: unknown[];
  
  /** 玻璃网格数组 */
  static glasses: unknown[];
  
  /** 顶层节点数组 */
  static TopNodeArray: TopNodeData[];

  /**
   * 初始化场景和各个扩展模块
   * @param scene Babylon场景实例
   */
  static Init(scene: Scene): void;

  /**
   * 清理所有顶层节点
   */
  static Clean(): void;

  /**
   * 解析WebCC路径数据
   * @param url 数据URL
   * @param metadata 元数据
   * @returns 解析结果Promise
   */
  static AnalysisWebCCPath(url: string, metadata?: { uid?: number }): Promise<unknown>;

  /**
   * 解析WebCC数据字符串
   * @param jsonData JSON数据字符串
   * @param metadata 元数据
   * @returns 解析结果Promise
   */
  static AnalysisWebCCData(jsonData: string, metadata?: { uid?: number }): Promise<unknown>;

  /**
   * 生成挤出模型（基于起止点）
   * @param startPoint 起点世界坐标（厘米）
   * @param endPoint 终点世界坐标（厘米）
   * @param options 挤出配置
   * @param customAxes 自定义坐标轴 [右向量, 上向量, 前向量]
   * @param uvMode UV计算模式
   * @returns 生成的网格
   */
  static GenExtrudeModel(
    startPoint: Vector3,
    endPoint: Vector3,
    options: ExtrudeModelOptions,
    customAxes?: [Vector3, Vector3, Vector3],
    uvMode?: ModeCalFaceUVEnum
  ): Mesh;

  /**
   * 生成挤出模型（基于2D向量起止点）
   * @param startPoint2D 起点2D坐标
   * @param endPoint2D 终点2D坐标
   * @param options 挤出配置
   * @param customAxes 自定义坐标轴
   * @param uvMode UV计算模式
   * @returns 生成的网格
   */
  static GenExtrudeModel_Vector2(
    startPoint2D: Vector2,
    endPoint2D: Vector2,
    options: ExtrudeModelOptions,
    customAxes?: [Vector3, Vector3, Vector3],
    uvMode?: ModeCalFaceUVEnum
  ): Mesh;

  /**
   * 生成挤出网格（内部方法）
   * @param depth 挤出深度
   * @param options 配置选项
   * @returns 生成的网格
   */
  private static genExtrudeModel(depth: number, options: ExtrudeModelOptions): Mesh;

  /**
   * 计算面UV坐标
   * @param shape2D 2D形状顶点数组
   * @param depth 挤出深度
   * @param mode UV计算模式
   * @returns UV坐标数组 [正面, 侧面, 背面]
   */
  private static calFaceUV(
    shape2D: Vector2[],
    depth: number,
    mode?: ModeCalFaceUVEnum
  ): Vector4[];

  /**
   * 生成路径挤出模型
   * @param startPoint 起点
   * @param endPoint 终点（可选，默认向下）
   * @param options 挤出配置
   * @param customAxes 自定义坐标轴
   * @returns 生成的网格
   */
  static GenExtrudePathModel(
    startPoint: Vector3,
    endPoint: Vector3 | undefined,
    options: ExtrudeModelOptions,
    customAxes?: [Vector3, Vector3, Vector3]
  ): Mesh;

  /**
   * 生成路径挤出网格（内部方法）
   * @param depth 挤出深度（可选）
   * @param options 配置选项
   * @returns 生成的网格
   */
  private static genExtrudePathModel(depth: number | undefined, options: ExtrudeModelOptions): Mesh;

  /**
   * 生成自定义模型（米单位）
   * @param shape 形状顶点（米）
   * @param depth 深度（米）
   * @param options 配置选项
   * @returns 生成的变换节点
   */
  static GenCustomerModelM(
    shape: Vector2[],
    depth: number,
    options: Partial<ExtrudeModelOptions>
  ): TransformNode;

  /**
   * 生成自定义模型（厘米单位）
   * @param shape 形状顶点（厘米）
   * @param depth 深度（厘米）
   * @param options 配置选项
   * @returns 生成的变换节点
   */
  static GenCustomerModel(
    shape: Vector2[],
    depth: number,
    options: Partial<ExtrudeModelOptions>
  ): TransformNode;

  /**
   * 生成挤出多边形模型（带圆角处理）
   * @param shape 形状顶点
   * @param depth 挤出深度
   * @param position 位置
   * @param parent 父节点
   * @param material 材质
   * @returns 生成的网格
   */
  static GenExtrudePolygonModel(
    shape: Vector2[],
    depth: number,
    position?: Vector3,
    parent?: TransformNode,
    material?: Material
  ): Mesh;

  /**
   * 生成旋转体模型
   * @param profile 旋转轮廓顶点
   * @param position 位置
   * @param parent 父节点
   * @param material 材质
   * @returns 生成的网格
   */
  static GenLateModel(
    profile: Vector3[],
    position?: Vector3,
    parent?: TransformNode,
    material?: Material
  ): Mesh;

  /**
   * 获取旋转轮廓宽度
   * @param profile 轮廓顶点
   * @returns 宽度值
   */
  static GetLatheShapreWidth(profile: Vector3[] | null): number;

  /**
   * 获取旋转轮廓高度
   * @param profile 轮廓顶点
   * @returns 高度值
   */
  static GetLatheShapreHeight(profile: Vector3[] | null): number;

  /**
   * 解析服务器路径（提取DXF依赖）
   * @param jsonData JSON数据字符串
   * @param metadata 元数据
   * @returns DXF路径数组Promise
   */
  static AnalysisServerPath(
    jsonData: string,
    metadata?: unknown
  ): Promise<Array<{ dxfpath: string; dxfdata: unknown }>>;

  /**
   * 解析服务器数据（带DXF预加载）
   * @param jsonData JSON数据字符串
   * @param dxfDataArray DXF数据数组
   * @param metadata 元数据
   * @returns 解析结果Promise
   */
  static AnalysisServerData(
    jsonData: string,
    dxfDataArray: Array<{ dxfpath: string; dxfdata: unknown }>,
    metadata?: unknown
  ): Promise<unknown>;
}