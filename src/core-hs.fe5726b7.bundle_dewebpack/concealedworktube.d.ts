/**
 * ConcealedWorkTube模块
 * 暗装工作管道的图形对象类，负责管道的渲染、网格生成和材质管理
 */

import { Vector3 } from 'somewhere/Vector3';
import { BaseObject } from 'somewhere/BaseObject';
import { TransUtil } from 'somewhere/TransUtil';
import { Model } from 'somewhere/Model';
import { TubeMeshCreator, TubeMeshTypeEnum, elecPathR, waterPathR } from 'somewhere/TubeMeshCreator';
import type { Entity, SignalHook, Context } from 'somewhere/types';
import type * as THREE from 'three';

/**
 * 管道材质颜色枚举
 */
enum TubeMaterialColor {
  /** 强电管道颜色 (RGB: 16735045) */
  strongElec = 16735045,
  /** 弱电管道颜色 (RGB: 3763966) */
  weakElec = 3763966,
  /** 热水管道颜色 (RGB: 4653276) */
  hotWater = 4653276,
  /** 冷水管道颜色 (RGB: 4694913) */
  coldWater = 4694913
}

/**
 * 管道数据接口 - 直线管道
 */
interface StraightTubeData {
  /** 管道直径 */
  dia: number;
  /** 管道两端点坐标 */
  sidePoints: [Vector3, Vector3];
}

/**
 * 管道数据接口 - 其他类型管道
 */
interface ComplexTubeData {
  /** 节点位置 */
  nodePos: Vector3;
  /** 管道直径 */
  dia: number;
  /** 带权重的方向点集合 */
  sidePoints: Vector3[];
}

/**
 * 管道数据联合类型
 */
type TubeData = StraightTubeData | ComplexTubeData;

/**
 * 图形材质接口
 */
interface GraphicsMaterial {
  /** 材质颜色 */
  color: TubeMaterialColor;
}

/**
 * 图形对象接口
 */
interface GraphicsObject {
  /** 实体ID */
  entityId: string;
  /** 图形路径 */
  graphicsPath: string;
  /** 图形对象类型 */
  type: string;
  /** 包围盒数据 */
  bounding: Float32Array;
  /** 材质信息 */
  material: GraphicsMaterial;
  /** 组件信息 */
  component?: unknown;
  /** 父级查找ID */
  parentSeekId: string;
  /** 网格键 */
  mesh: string;
  /** 查找ID */
  seekId: string;
  /** 是否启用实例化数组 */
  instancedArraysEnabled: boolean;
  /** 自定义属性 */
  customAttrs: Record<string, unknown>;
}

/**
 * 网格定义接口
 */
interface MeshDefinition {
  /** 网格键 */
  meshKey: string;
  /** 其他网格属性（来自TubeMeshCreator） */
  [key: string]: unknown;
}

/**
 * 图形数据返回接口
 */
interface GraphicsData {
  /** 图形对象数组 */
  objects: GraphicsObject[];
  /** 网格定义数组 */
  meshDefs: MeshDefinition[];
}

/**
 * 字段变更事件接口
 */
interface FieldChangedEvent {
  data: {
    /** 变更的字段名称 */
    fieldName: string;
  };
}

/**
 * 暗装工作管道类
 * 负责管道的图形表示、网格生成和渲染更新
 */
export declare class ConcealedWorkTube extends BaseObject {
  /** 是否包含弧形管道 */
  hasArcTube: boolean;
  
  /** 本地变换矩阵 */
  protected _matrixLocal: THREE.Matrix4;
  
  /** 几何体脏标记 */
  geometryDirty: boolean;
  
  /** 需要更新矩阵标记 */
  needUpdateMatrix: boolean;
  
  /** 位置脏标记 */
  positionDirty: boolean;
  
  /** 信号钩子 */
  signalHook: SignalHook;
  
  /** 上下文对象 */
  context: Context;

  /**
   * 构造函数
   * @param entity - 实体对象
   * @param context - 上下文对象
   * @param options - 可选配置参数
   */
  constructor(entity: Entity, context: Context, options?: unknown);

  /**
   * 字段变更事件处理
   * 当route字段变更时，标记对象需要更新
   * @param event - 字段变更事件
   */
  OnFieldChanged(event: FieldChangedEvent): void;

  /**
   * 位置更新时的回调
   * 触发矩阵更新
   */
  onUpdatePosition(): void;

  /**
   * 通用更新回调
   * 触发矩阵更新
   */
  onUpdate(): void;

  /**
   * 转换为图形数据（同步版本）
   * @param forceUpdate - 是否强制更新
   * @returns 图形数据对象
   */
  toGraphicsData(forceUpdate?: boolean): GraphicsData;

  /**
   * 转换为图形数据（异步版本）
   * @param context - 上下文参数
   * @returns Promise包装的图形数据对象
   */
  toGraphicsDataAsync(context: unknown): Promise<GraphicsData>;

  /**
   * 生成图形数据
   * 核心方法，根据管道类型生成对应的网格和材质
   * @returns 图形数据对象
   */
  genGraphicData(): GraphicsData;

  /**
   * 获取包围盒
   * @returns 包围盒坐标数组
   */
  getBounding(): number[];

  /**
   * 获取管道材质
   * 根据组件类型返回对应的材质颜色
   * @returns 材质对象
   */
  getTubeMaterial(): GraphicsMaterial;

  /**
   * 更新变换矩阵
   * 根据管道类型计算合适的变换矩阵
   */
  updateMatrix(): void;

  /**
   * 获取管道网格类型
   * 根据节点数量和方向判断管道类型（直线/电气垂直/水暖垂直/其他）
   * @returns 管道网格类型枚举值
   */
  getTubeMeshType(): TubeMeshTypeEnum;

  /**
   * 获取管道数据
   * 根据管道类型返回不同结构的数据
   * @returns 管道数据对象
   */
  getData(): TubeData;

  /**
   * 检查对象是否有效
   * 验证实体存在且未被隐藏或移除
   * @returns 是否有效
   */
  isValid(): boolean;

  /**
   * 获取带权重的方向点集合
   * 计算管道节点的子节点方向，并根据内容半径调整距离
   * @returns 方向点数组
   */
  getDirsWithWeight(): Vector3[];

  /**
   * 获取管道内容半径
   * 根据管道类型（电气/水暖）返回对应的半径值
   * @returns 半径值
   */
  getTubeContentR(): number;

  /**
   * 判断是否需要实例化渲染
   * 某些管道类型（直线、垂直等）支持实例化以提升性能
   * @param meshType - 网格类型
   * @param hasArcTube - 是否包含弧形管道
   * @returns 是否需要实例化
   */
  needInstance(meshType: TubeMeshTypeEnum, hasArcTube: boolean): boolean;

  /**
   * 获取网格键
   * 生成唯一的网格标识符，用于缓存和实例化
   * @param entity - 实体对象
   * @param meshType - 网格类型
   * @param radius - 弧形半径（可选）
   * @param hasArcTube - 是否包含弧形管道
   * @returns 网格键字符串
   */
  getMeshKey(
    entity: Entity,
    meshType: TubeMeshTypeEnum,
    radius: number | undefined,
    hasArcTube: boolean
  ): string;
}