/**
 * MeshLight模块 - 网格灯光实体及其序列化类
 * 用于处理基于网格路径的区域光源
 */

import { Light, Light_IO, LightTypeEnum } from './Light';
import { Entity } from './Entity';
import { SignalHook } from './SignalHook';
import { EntityField } from './decorators';
import { Loop } from './Loop';

// ==================== 常量定义 ====================

/** 浮点数比较精度阈值 */
const EPSILON = 0.01;

/** 默认光照强度 */
const DEFAULT_MESH_LIGHT_INTENSITY = 500;

// ==================== 类型定义 ====================

/** 二维坐标点 */
interface Point2D {
  x: number;
  y: number;
}

/** 路径段 - 包含起点和终点 */
interface PathSegment {
  startPoint: Point2D;
  endPoint: Point2D;
}

/** 路径集合 - 包含多个路径段 */
interface PathCollection {
  /** 路径段数组 */
  paths: PathSegment[];
  /** 路径周长 */
  perimeter: number;
  /** 距离参数 */
  distance?: number;
  /** 元素ID */
  eleId?: number;
  /** 轮廓数据（可选） */
  contours?: unknown[];
}

/** 光照渲染参数 */
interface MeshLightRenderParameters {
  /** 色温 */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** 关联的实体ID */
  entityId?: string;
  /** 是否闭合 */
  close?: boolean;
  /** RGB颜色值 */
  rgb?: [number, number, number];
}

/** 序列化数据格式 */
interface MeshLightSerializedData {
  /** 关联内容ID */
  contentID?: string;
  /** 路径数据 */
  paths?: PathCollection[];
  /** 光带索引 */
  bandIndex?: number;
  /** 版本信息 */
  version?: string;
}

// ==================== 序列化类 ====================

/**
 * MeshLight序列化输入输出类
 * 负责网格灯光实体的序列化与反序列化
 */
export declare class MeshLight_IO extends Light_IO {
  /**
   * 序列化MeshLight实体
   * @param entity - 待序列化的网格灯光实体
   * @param callback - 序列化后的回调函数
   * @param includeChildren - 是否包含子实体
   * @param context - 序列化上下文
   * @returns 序列化后的数据数组
   */
  dump(
    entity: MeshLight,
    callback?: (data: unknown[], entity: MeshLight) => void,
    includeChildren?: boolean,
    context?: Record<string, unknown>
  ): unknown[];

  /**
   * 反序列化为MeshLight实体
   * @param entity - 目标实体对象
   * @param data - 序列化的数据
   * @param context - 反序列化上下文
   */
  load(
    entity: MeshLight,
    data: MeshLightSerializedData,
    context?: Record<string, unknown>
  ): void;

  /**
   * 反序列化后的后处理
   * @param entity - 已加载的实体
   * @param data - 序列化的数据
   */
  postLoad(entity: MeshLight, data: MeshLightSerializedData): void;

  /**
   * 获取单例实例
   */
  static instance(): MeshLight_IO;
}

// ==================== 网格灯光实体类 ====================

/**
 * 网格灯光实体
 * 基于自定义网格路径的区域光源，支持沿路径分布的光带效果
 */
export declare class MeshLight extends Light {
  /** 光源类型 - 网格光 */
  readonly type: LightTypeEnum.MeshLight;

  /** 关联的宿主内容ID */
  contentID?: string;

  /** 路径数据集合 */
  paths?: PathCollection[];

  /** 光带索引（-1表示未选中） */
  @EntityField()
  bandIndex: number;

  /** 边界轮廓点（4个顶点） */
  protected outline: [Point2D, Point2D, Point2D, Point2D];

  /** 路径变化信号钩子 */
  private _pathsSignalHook: SignalHook;

  /**
   * 构造函数
   * @param id - 实体唯一标识
   * @param parent - 父实体
   */
  constructor(id?: string, parent?: Entity);

  /**
   * 创建默认的MeshLight实例
   */
  static create(): MeshLight;

  /**
   * 获取默认光照强度
   */
  static get defaultIntensity(): number;

  /**
   * 是否为虚拟光源
   * @returns 始终返回false（实体光源）
   */
  isVirtual(): false;

  /**
   * 是否具有区域尺寸
   * @returns 始终返回true（区域光源）
   */
  hasAreaSize(): true;

  /**
   * 重置实体到初始状态
   */
  reset(): void;

  /**
   * 获取序列化处理器
   */
  getIO(): MeshLight_IO;

  /**
   * 刷新内部包围盒
   * 根据路径计算边界并更新轮廓顶点
   */
  protected refreshBoundInternal(): void;

  /**
   * 获取宿主实体
   * @returns 关联的自定义模型或参数化模型
   */
  getHost(): HSCore.Model.CustomizedModel | HSCore.Model.NCustomizedFeatureModel | undefined;

  /**
   * 获取世界坐标系下的路径集合
   * @returns 转换后的路径段数组（双层数组结构）
   */
  getPaths(): Point2D[][][];

  /**
   * 计算路径总长度
   * @returns 所有路径的周长总和
   */
  getLength(): number | undefined;

  /**
   * 标记实体为已移除状态
   * 清空路径并解除信号监听
   */
  setRemoved(): void;

  /**
   * 根据新路径数据更新实体
   * @param newPaths - 新的路径集合
   */
  updateByPaths(newPaths: PathCollection[]): void;

  /**
   * 路径变化事件处理器
   * 当宿主实体的路径发生变化时触发
   */
  protected onPathsChanged(): void;

  /**
   * 设置宿主实体ID
   * @param hostId - 宿主内容ID
   * @param skipUpdate - 是否跳过路径更新
   */
  setHostId(hostId: string, skipUpdate?: boolean): void;

  /**
   * 销毁实体并释放资源
   */
  destroy(): void;

  /**
   * 获取渲染参数
   * @returns 包含色温、强度、颜色等渲染所需参数
   */
  getRenderParameters(): MeshLightRenderParameters;
}

// ==================== 全局声明扩展 ====================

declare global {
  namespace HSCore.Model {
    /** 自定义模型基类 */
    interface CustomizedModel {
      getLightBandBottomProjection(): PathCollection[];
      signalWebCADDocChanged: unknown;
    }

    /** 参数化特征模型 */
    interface NCustomizedFeatureModel extends CustomizedModel {}

    /** 参数化模型实例 */
    interface CustomizedPMInstanceModel extends CustomizedModel {
      isDiyDocOpened(): boolean;
    }

    /** 自定义吊顶模型 */
    interface NCustomizedCeilingModel extends CustomizedModel {}

    /** 参数化吊顶 */
    interface NCustomizedParametricCeiling extends CustomizedModel {}

    /** 背景墙模型 */
    interface NCustomizedBackgroundWall extends CustomizedModel {}

    /** 实体标志枚举 */
    enum EntityFlagEnum {
      removed = 'removed'
    }
  }

  namespace HSCore.Util.Math {
    class Vec2 {
      constructor(x: number, y: number);
      rotate(radians: number): void;
      add(other: Vec2): void;
    }

    function toRadians(degrees: number): number;
    function isSamePoint(p1: Point2D, p2: Point2D, epsilon: number): boolean;
    function nearlyEquals(a: number, b: number, epsilon: number): boolean;
  }

  namespace HSCore.Util.Version {
    function isEarlierThan(version1: string, version2: string): boolean;
  }

  namespace HSConstants {
    enum ModelClass {
      NgMeshLight = 'NgMeshLight'
    }
  }
}