/**
 * 自定义参数化吊顶模块
 * 提供参数化吊顶模型的输入输出操作和核心业务逻辑
 */

import type { Loop, Vector2, Vector3, Matrix4, Plane } from 'geometry-library';
import type { Entity } from 'entity-system';
import type { Face2d } from 'model-system';
import type { NCustomizedParametricModel_IO, NCustomizedParametricModel } from 'parametric-model';

/**
 * 属性面板项类型枚举
 */
export enum EN_PROPERTY_PANEL_ITEM_TYPE {
  // 具体枚举值需要从源模块导入
}

/**
 * 输入数据接口
 * 用于描述参数化吊顶的初始化数据
 */
export interface IInputData {
  // 具体属性需要从源模块导入
}

/**
 * 属性面板数据接口
 * 用于描述吊顶属性面板的配置信息
 */
export interface IPropertyPanelData {
  // 具体属性需要从源模块导入
}

/**
 * 吊顶类型
 */
type CeilingType = 'CascadeCeiling' | 'PlaneCeiling' | string;

/**
 * 线脚数据接口
 */
interface MoldingData {
  /** 查找ID */
  seekId: string;
  /** 唯一键 */
  uniqueKey: string;
}

/**
 * 吊顶参数接口
 */
interface CeilingParameters {
  /** 文档唯一标识符 */
  uuid?: string;
  /** 房间轮廓循环 */
  roomLoop?: Loop;
  /** 房间高度（毫米） */
  roomHeight?: number;
  /** 属性树 */
  propertytree?: unknown;
  /** 旋转角度 */
  rotation?: number;
  /** 参数化吊顶类型 */
  parametricCeilingType?: CeilingType;
}

/**
 * 获取参数返回值接口
 */
interface ParametersResult {
  /** 参数化吊顶类型 */
  parametricCeilingType?: CeilingType;
  /** 是否为矩形主体部分 */
  isRectMainPart: boolean;
  /** 最小尺寸限制 */
  minSizeLimited: boolean;
  /** 线脚列表 */
  moldings: MoldingData[];
  [key: string]: unknown;
}

/**
 * 构造选项接口
 */
interface ConstructOptions {
  /** 需要重置的线脚ID列表 */
  resetMoldingIds?: string[];
}

/**
 * 元数据接口
 */
interface CeilingMetadata {
  /** X方向长度 */
  XLength: number;
  /** Y方向长度 */
  YLength: number;
  /** 参数化元数据JSON字符串 */
  parametricMeta?: string;
  /** 位置信息 */
  position: {
    x: number;
    y: number;
    z: number;
  };
  /** 用户自由数据 */
  userFreeData: {
    parametricMeta?: string;
    [key: string]: unknown;
  };
}

/**
 * 自定义参数化吊顶输入输出类
 * 负责吊顶模型的序列化和反序列化
 */
export declare class NCustomizedParametricCeiling_IO extends NCustomizedParametricModel_IO {
  /**
   * 导出吊顶数据
   * @param entity - 实体对象
   * @param target - 目标对象
   * @param recursive - 是否递归导出，默认true
   * @param options - 导出选项
   * @returns 导出的数据
   */
  dump(entity: unknown, target: unknown, recursive?: boolean, options?: Record<string, unknown>): unknown;

  /**
   * 加载吊顶数据
   * @param entity - 实体对象
   * @param source - 源数据
   * @param options - 加载选项
   */
  load(entity: unknown, source: unknown, options?: Record<string, unknown>): void;
}

/**
 * 自定义参数化吊顶模型类
 * 核心业务逻辑类，处理吊顶的创建、更新和渲染
 */
export declare class NCustomizedParametricCeiling extends NCustomizedParametricModel {
  /** 吊顶参数配置 */
  parameters: CeilingParameters;
  
  /** 自托管灯槽列表 */
  selfHostLightSlots: unknown[];
  
  /** 自托管线脚列表 */
  selfHostMoldings: unknown[];

  /** 元数据 */
  metadata: CeilingMetadata;

  /** X坐标（米） */
  x: number;
  
  /** Y坐标（米） */
  y: number;
  
  /** Z坐标（米） */
  z: number;
  
  /** X轴缩放 */
  XScale: number;
  
  /** Y轴缩放 */
  YScale: number;
  
  /** Z轴缩放 */
  ZScale: number;
  
  /** 旋转角度 */
  rotation: number;

  /** 实体ID */
  id: string;

  /** 属性映射 */
  properties: Map<string, unknown>;

  /**
   * 构造函数
   * @param id - 实体ID，默认为空字符串
   * @param options - 初始化选项
   */
  constructor(id?: string, options?: unknown);

  /**
   * 获取吊顶参数
   * @returns 参数对象，包含吊顶类型、线脚信息等
   */
  getParameters(): ParametersResult;

  /**
   * 通过参数初始化吊顶
   * @param params - 初始化参数
   * @param roomLoop - 房间轮廓循环
   */
  initByParameters(params: unknown, roomLoop: Loop): void;

  /**
   * 通过元数据初始化吊顶
   * @param metadata - 元数据对象
   * @param options - 初始化选项
   * @param forceReconstruct - 是否强制重建，默认false
   */
  initByMeta(metadata: CeilingMetadata, options?: unknown, forceReconstruct?: boolean): void;

  /**
   * 获取房间轮廓循环
   * @param input - 输入数据，可以是Face2d或坐标点数组
   * @returns 房间轮廓循环对象
   */
  getRoomLoop(input?: Face2d | Array<{ x: number; y: number }>): Loop;

  /**
   * 初始化吊顶
   * @param input - 输入数据
   * @param forceReconstruct - 是否强制重建
   */
  initCeiling(input?: unknown, forceReconstruct?: boolean): void;

  /**
   * 初始化模型文档
   * @param data - 包含房间轮廓的数据对象
   * @param forceReconstruct - 是否强制重建
   * @param updatePosition - 是否更新位置，默认false
   */
  initModelDocument(data: { roomLoop: Loop }, forceReconstruct?: boolean, updatePosition?: boolean): void;

  /**
   * 初始化吊顶文档
   * @param roomLoop - 房间轮廓循环
   * @param forceReconstruct - 是否强制重建
   * @param updatePosition - 是否更新位置
   */
  initCeilingDocument(roomLoop: Loop, forceReconstruct?: boolean, updatePosition?: boolean): void;

  /**
   * 生成属性面板数据
   * @param propertyMap - 属性映射表
   * @returns 属性面板数据对象
   */
  generatePropertyPanelDatas(propertyMap: Map<string, unknown>): IPropertyPanelData | undefined;

  /**
   * 设置旋转角度
   * @param rotation - 旋转角度（弧度）
   */
  setRotation(rotation: number): void;

  /**
   * 获取模型数据
   * @param params - 参数记录
   * @returns 吊顶数据对象
   */
  getModelData(params: Record<string, unknown>): unknown;

  /**
   * 从元数据更新位置
   * @param metadata - 元数据对象
   * @param skipUpdate - 是否跳过更新，默认false
   */
  updatePositionFromMeta(metadata: CeilingMetadata, skipUpdate?: boolean): void;

  /**
   * 判断是否为底面
   * @param face - 面对象
   * @returns 如果是底面返回true
   */
  isBottomFace(face: unknown): boolean;

  /**
   * 获取图形选项
   * @param options - 选项对象
   * @param includeChildren - 是否包含子对象，默认true
   * @returns 图形选项对象
   */
  getGraphicsOption(options: unknown, includeChildren?: boolean): { isCeiling: boolean; [key: string]: unknown };

  /**
   * 获取面投影平面
   * @param face - 面对象
   * @param params - 参数对象
   * @returns 投影平面对象
   */
  getFaceProjectionPlane(face: unknown, params: unknown): { xRay: Vector3; [key: string]: unknown } | undefined;

  /**
   * 获取父级房间对象
   * @returns 房间对象
   */
  getParentRoom(): { ceilingHeight3d: number } | undefined;

  /**
   * 构造边界表示（B-Rep）
   * @param params - 构造参数
   * @param forceReconstruct - 是否强制重建
   * @param updatePosition - 是否更新位置
   */
  constructBrep(params?: unknown, forceReconstruct?: boolean, updatePosition?: boolean): void;

  /**
   * 获取所有参数化自托管线脚
   * @returns 线脚对象数组
   */
  getAllParametricSelfMoldings(): Array<{ parameters: { seekId: string }; moldingId: string }>;

  /**
   * 清除扫掠缓存
   * @param entityIds - 实体ID列表
   */
  clearSweeperCachesByEids(entityIds?: string[]): void;

  /**
   * 标记子模型为脏数据
   * @param dirty - 是否脏数据
   */
  dirtyChildModels(dirty: boolean): void;

  /**
   * 标记几何体为脏数据
   */
  dirtyGeometry(): void;

  /**
   * 标记对象为脏数据
   */
  dirty(): void;

  /**
   * 重新排序曲线
   * @param curves - 曲线数组
   * @returns 排序后的曲线数组
   */
  protected resortCurves(curves: unknown[]): unknown[];

  /**
   * 判断曲线是否顺时针
   * @param curves - 曲线数组
   * @returns 如果顺时针返回true
   */
  protected judgeClockWise(curves: unknown[]): boolean;

  /**
   * 将Map转换为Record对象
   * @param map - Map对象
   * @returns Record对象
   */
  protected map2record(map: Map<string, unknown>): Record<string, unknown>;
}

/**
 * 吊顶SDK命名空间
 * 提供吊顶参数变更回调和文档操作
 */
declare namespace CeilingSDK {
  /**
   * 参数变更回调函数
   * @param params - 参数对象
   * @param entityId - 实体ID
   * @param constructParams - 构造参数
   * @param options - 选项，包含需要重置的线脚ID
   * @returns 如果处理成功返回true
   */
  let onParamsChangedCallback: (
    params: unknown,
    entityId: string,
    constructParams: unknown,
    options?: ConstructOptions
  ) => boolean;

  /**
   * 打开吊顶文档
   * @param metaJson - 元数据JSON字符串
   * @param entityId - 实体ID
   * @param roomLoop - 房间轮廓循环
   * @param roomHeight - 房间高度（毫米）
   * @param tolerance - 容差，默认0.001
   * @param rotation - 旋转角度，默认0
   * @returns 文档UUID，失败返回null
   */
  function openDocument(
    metaJson: string,
    entityId: string,
    roomLoop: Loop,
    roomHeight: number,
    tolerance: number,
    rotation: number
  ): string | null;

  /**
   * 获取吊顶数据
   * @param uuid - 文档UUID
   * @param entityId - 实体ID
   * @param params - 参数记录
   * @returns 吊顶数据对象
   */
  function getCeilingData(
    uuid: string,
    entityId: string,
    params: Record<string, unknown>
  ): { propertyPanelData: IPropertyPanelData; [key: string]: unknown } | null;
}